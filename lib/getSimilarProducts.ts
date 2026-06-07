// lib/getSimilarProducts.ts

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getSimilarProducts(
  productId: string,
  price: number
) {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const product = await db.collection("products").findOne({
    _id: new ObjectId(productId),
  });

  if (!product) {
    return [];
  }

  return await db
    .collection("products")
    .aggregate([
      {
        $match: {
          _id: { $ne: product._id },

          // cùng hãng
          brandId: product.brandId,

          // giá ±20%
          "variants.price": {
            $gte: price * 0.8,
            $lte: price * 1.2,
          },
        },
      },

      // random 8 sản phẩm
      {
        $sample: {
          size: 8,
        },
      },
    ])
    .toArray();
}