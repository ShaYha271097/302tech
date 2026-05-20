// ddrduongqua1027_db_user
// jl4DFbBmPmRRzEuZ
import clientPromise from "@/lib/mongodb" // chỉnh đúng path của bạn
import { NextResponse, NextRequest } from "next/server"

import { ObjectId } from "mongodb"
import { requireAdmin } from "@/lib/auth"

type Variant = {
  cpu: string;
  ram: string;
  ssd: string;
  gpu: string; 
  price: number;
  screenSize: string;
  resolution: string;
  refreshRate: string;
};

type Product = {
  brandId: ObjectId;
  name: string;
  slug: string;
  mainImage: string;
  gallery: string[];
  variants: Variant[];
  createdAt: Date;
  isHot: boolean;
  isNew: boolean;
  isActive: boolean; 
};

export async function POST(req: Request) {
  requireAdmin(req);

  const body = await req.json();

  // NAME
  if (!body.name || body.name.trim().length < 5) {
    return Response.json(
      { error: "Tên không hợp lệ" },
      { status: 400 }
    );
  }

  // BRAND
  if (!body.brandId) {
    return Response.json(
      { error: "Thiếu thương hiệu" },
      { status: 400 }
    );
  }

  // SLUG
  if (!body.slug || !body.slug.trim()) {
    return Response.json(
      { error: "Thiếu slug" },
      { status: 400 }
    );
  }

  // MAIN IMAGE
  if (!body.mainImage) {
    return Response.json(
      { error: "Thiếu ảnh chính" },
      { status: 400 }
    );
  }

  // GALLERY
  if (!Array.isArray(body.gallery)) {
    return Response.json(
      { error: "Gallery không hợp lệ" },
      { status: 400 }
    );
  }

  if (body.gallery.length < 2) {
    return Response.json(
      { error: "Cần ít nhất 2 ảnh phụ" },
      { status: 400 }
    );
  }

  if (body.gallery.length > 6) {
    return Response.json(
      { error: "Tối đa 6 ảnh phụ" },
      { status: 400 }
    );
  }

  // VARIANTS
  if (
    !Array.isArray(body.variants) ||
    body.variants.length === 0
  ) {
    return Response.json(
      { error: "Phải có ít nhất 1 cấu hình" },
      { status: 400 }
    );
  }

  if (
    body.variants.some(
      (v: any) =>
        !v.cpu ||
        !v.gpu ||
        v.price <= 0
    )
  ) {
    return Response.json(
      { error: "Cấu hình không hợp lệ" },
      { status: 400 }
    );
  }

  const product: Product = {
    brandId: new ObjectId(body.brandId),

    name: body.name.trim(),

    // frontend gửi slug lên
    slug: body.slug.trim(),

    mainImage: body.mainImage,

    gallery: body.gallery || [],

    variants: body.variants,

    createdAt: new Date(),

    isHot: body.isHot ?? false,

    isNew: body.isNew ?? true,

    // trạng thái bán
    isActive: body.isActive ?? true,
  };

  const client = await clientPromise;

  const db = client.db("laptop-shop");

  const result = await db
    .collection<Product>("products")
    .insertOne(product);

  return Response.json(result);
}




export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("laptop-shop");

    const { searchParams } = new URL(req.url);
    const priceParams = searchParams.getAll("price"); // 👈 nhiều giá

    const ramParams = searchParams.getAll("ram");
    const ssdParams = searchParams.getAll("ssd");
    // 👉 params
    let page = Number(searchParams.get("page")) || 1;
    let limit = Number(searchParams.get("limit")) || 5;
    const brandParam = searchParams.get("brand") || "";

    const category = searchParams.get("category") || "laptop";

    const search = searchParams.get("search") || "";
    const isHot = searchParams.get("isHot");
    // 👉 validate
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    if (limit > 50) limit = 50;

    const skip = (page - 1) * limit;

    // 👉 parse brand multi
    const brandSlugs = brandParam
      ? brandParam.split(",").map((b) => b.trim())
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
    if (isHot === "true") {
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
      return NextResponse.json({
        products: [],
        total: 0,
        page: 1,
        limit: 5,
        totalPages: 0,
      });
    }
    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi server",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

