import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const productId = searchParams.get("productId");
  const price = Number(searchParams.get("price"));

  if (!productId || !price) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const product = await db.collection("products").findOne({
    _id: new ObjectId(productId),
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const similarProducts = await db.collection("products").aggregate([
    {
      $match: {
        _id: { $ne: product._id },
        brandId: product.brandId, // 🔥 cùng hãng
        "variants.price": {
          $gte: price * 0.8,
          $lte: price * 1.2,
        },
      },
    },
    { $sample: { size: 8 } }, // 🔥 random cho đỡ trùng
  ]).toArray();

  return NextResponse.json(similarProducts);
}