import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const client = await clientPromise;

  const db = client.db("laptop-shop");

  const brand = await db.collection("brands").findOne({
    _id: new ObjectId(id),
  });

  if (!brand) {
    return NextResponse.json(
      {
        message: "Brand not found",
      },
      {
        status: 404,
      }
    );
  }
  const newStatus = !brand.isActive;

  await db.collection("brands").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        isActive: newStatus,
      },
    }
  );

  return NextResponse.json({
    success: true,
    isActive: newStatus,
  });
}