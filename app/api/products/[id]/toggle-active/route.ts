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

  const product = await db.collection("products").findOne({
    _id: new ObjectId(id),
  });

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  const newStatus = !product.isActive;

  await db.collection("products").updateOne(
    { _id: new ObjectId(id) },
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