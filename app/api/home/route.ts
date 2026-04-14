import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const limit = 8;

  // 1. lấy brands trước
  const brands = await db.collection("brands").find({}).toArray();

  // convert sang map cho dễ dùng
  const brandMap = Object.fromEntries(
    brands.map((b) => [b.slug, b])
  );

  // 2. query products theo brandId
  const [hp, dell, lenovo, apple] = await Promise.all([
    db.collection("products")
      .find({ brandId: brandMap.hp?._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray(),

    db.collection("products")
      .find({ brandId: brandMap.dell?._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray(),

    db.collection("products")
      .find({ brandId: brandMap.lenovo?._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray(),

    db.collection("products")
      .find({ brandId: brandMap.apple?._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray(),
  ]);

  return Response.json({
    hp: { products: hp },
    dell: { products: dell },
    lenovo: { products: lenovo },
    apple: { products: apple },
  });
}