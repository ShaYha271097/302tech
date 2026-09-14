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
  const products = await db.collection("products").findOne({
    _id: new ObjectId(id),
  });
  if (!products) {
    return NextResponse.json(
      {
        message: "products not found",
      },
      {
        status: 404,
      }
    );
  }

  const newStatus = !products.isActive;

  await db.collection("products").updateOne(
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