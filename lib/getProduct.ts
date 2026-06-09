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

export async function getProducts({
  brand = "",
  page = 1,
  limit = 5,
  search = "",
  priceParams = [],
  ramParams = [],
  ssdParams = [],
}: any) {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const skip = (page - 1) * limit;

  const brandSlugs = brand
    ? brand.split(",").map((b: string) => b.trim())
    : [];

  const pipeline: any[] = [
    {
      $lookup: {
        from: "brands",
        localField: "brandId",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $unwind: {
        path: "$brand",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  // copy toàn bộ phần filter của bạn sang đây

  const countPipeline = [
    ...pipeline,
    { $count: "total" },
  ];

  pipeline.push(
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  );

  const [products, totalResult] =
    await Promise.all([
      db.collection("products")
        .aggregate(pipeline)
        .toArray(),

      db.collection("products")
        .aggregate(countPipeline)
        .toArray(),
    ]);

  const total =
    totalResult[0]?.total || 0;

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
  };
}