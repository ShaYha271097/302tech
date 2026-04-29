import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getProductById(id: string) {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const product = await db.collection("products").aggregate([
    {
      $match: { _id: new ObjectId(id) }
    },
    {
      $lookup: {
        from: "brands",
        localField: "brandId",
        foreignField: "_id",
        as: "brand"
      }
    },
    {
      $unwind: "$brand"
    }
  ]).toArray();

  return product[0];
}