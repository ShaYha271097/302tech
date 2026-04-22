import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const product = await db.collection("products").findOne({
    _id: new ObjectId(params.id),
  });

  if (!product) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  await db.collection("products").updateOne(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        isNew: !product.isNew,
      },
    }
  );

  return NextResponse.json({
    success: true,
    isNew: !product.isNew,
  });
}