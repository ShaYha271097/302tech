import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("laptop-shop");

    // 👉 FIX QUAN TRỌNG
    const { id } = await params;

    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    if (!product) {navigation
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isHot: !product.isHot,
        },
      }
    );

    return NextResponse.json({
      message: "Toggle HOT success",
      isHot: !product.isHot,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}