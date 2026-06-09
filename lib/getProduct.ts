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

type GetProductsParams = {
  page?: number;
  limit?: number;

  category?: string;
  brand?: string;
  search?: string;

  isHot?: boolean;

  price?: string | string[];
  ram?: string | string[];
  ssd?: string | string[];
};

export async function getProducts({
  page = 1,
  limit = 5,

  category = "laptop",
  brand = "",
  search = "",

  isHot = false,

  price,
  ram,
  ssd,
}: GetProductsParams) {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const priceParams = Array.isArray(price)
    ? price
    : price
      ? [price]
      : [];

  const ramParams = Array.isArray(ram)
    ? ram
    : ram
      ? [ram]
      : [];

  const ssdParams = Array.isArray(ssd)
    ? ssd
    : ssd
      ? [ssd]
      : [];
  // 👉 params
  // 👉 validate
  if (page < 1) page = 1;
  if (limit < 1) limit = 5;
  if (limit > 50) limit = 50;

  const skip = (page - 1) * limit;

  // 👉 parse brand multi
  const brandSlugs = brand
    ? brand.split(",").map((b) => b.trim())
    : [];




  // =========================
  // PIPELINE BASE
  // =========================
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

  // =========================
  // FILTER: BRAND
  // =========================
  if (brandSlugs.length > 0) {
    pipeline.push({
      $match: {
        "brand.slug": { $in: brandSlugs },
      },
    });
  }

  // =========================
  // FILTER: SEARCH
  // =========================
  console.log("no có nhận ko xx",search)
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            "brand.name": {
              $regex: search,
              $options: "i",
            },
          },
        ],
      },
    });
  }


  // =========================
  // FILTER: PRICE
  // =========================
  if (priceParams.length > 0) {
    pipeline.push({
      $match: {
        variants: {
          $elemMatch: {
            $or: priceParams.map((p) => {
              const [min, max] = p.split("-").map(Number);

              return {
                price: {
                  $gte: min,
                  $lte: max,
                },
              };
            }),
          },
        },
      },
    });
  }

  // =========================
  // FILTER: RAM
  // =========================
  if (ramParams.length > 0) {
    pipeline.push({
      $match: {
        "variants.ram": { $in: ramParams }
      }
    });
  }
  // =========================
  // FILTER: SSD
  // =========================
  if (ssdParams.length > 0) {
    pipeline.push({
      $match: {
        "variants.ssd": { $in: ssdParams }
      }
    });
  }
  // =========================
  // FILTER: ISHOT
  // =========================
  if (isHot === true) {
    pipeline.push({
      $match: {
        isHot: true,
      },
    });
  }
  // =========================
  // COUNT PIPELINE
  // =========================
  const countPipeline = [...pipeline, { $count: "total" }];

  // =========================
  // PAGINATION + SORT
  // =========================
  pipeline.push(
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  );

  // =========================
  // EXECUTE
  // =========================
  const [products, totalResult] = await Promise.all([
    db.collection("products").aggregate(pipeline).toArray(),
    db.collection("products").aggregate(countPipeline).toArray(),
  ]);

  const total = totalResult[0]?.total || 0;

  if (category !== "laptop") {
    return {
      products: [],
      total: 0,
      page: 1,
      limit: 5,
      totalPages: 0,
    };
  }

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(
      total / limit
    ),
  };;


}