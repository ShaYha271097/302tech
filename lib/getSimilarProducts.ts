import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getSimilarProducts(
  productId: string,
  price: number
) {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const product = await db.collection("products").findOne(
    {
      _id: new ObjectId(productId),
    },
    {
      projection: {
        brandId: 1,
      },
    }
  );

  if (!product) {
    return [];
  }

  return db
    .collection("products")
    .aggregate([
      {
        $match: {
          _id: {
            $ne: product._id,
          },

          brandId: product.brandId,

          "variants.price": {
            $gte: price * 0.8,
            $lte: price * 1.2,
          },

          isActive: true,
        },
      },

      {
        $limit: 4,
      },
    ])
    .toArray();
}