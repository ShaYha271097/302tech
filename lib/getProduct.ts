import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getProductById(id: string) {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const product = await db.collection("products").findOne({
    _id: new ObjectId(id),
  });

  return product;
}