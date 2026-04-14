// ddrduongqua1027_db_user
// jl4DFbBmPmRRzEuZ
import clientPromise from "@/lib/mongodb" // chỉnh đúng path của bạn
import { NextResponse ,NextRequest} from "next/server"

import { ObjectId } from "mongodb"

type Variant = {
    cpu: string
    ram: string
    ssd: string
    price: number
}
type Product = {
    brandId: ObjectId
    name: string
    slug: string // 👈 thêm cái này
    mainImage: string
    gallery: string[]
    variants: Variant[]
    createdAt: Date
}
export async function POST(req: Request) {
    const body = await req.json()
    if (!body.variants || body.variants.length === 0) {
        return Response.json({ error: "Phải có ít nhất 1 cấu hình" }, { status: 400 })
    }
    if (!body.mainImage) {
    return Response.json({ error: "Thiếu ảnh chính" }, { status: 400 })
}
    const product: Product = {
        brandId: new ObjectId(body.brandId), // convert
        name: body.name,
         slug: body.slug, 
        mainImage: body.mainImage,   // 👈 thêm
        gallery: body.gallery,       // 👈 thêm
        variants: body.variants,
        createdAt: new Date(),
    }

    const client = await clientPromise
    const db = client.db("laptop-shop")

    const result = await db.collection<Product>("products").insertOne(product)

    return Response.json(result)
}



export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("laptop-shop");

    // 👉 query params
    const { searchParams } = new URL(req.url);

    let page = Number(searchParams.get("page")) || 1;
    let limit = Number(searchParams.get("limit")) || 5;
    const brandParam = searchParams.get("brand"); // vd: "dell" hoặc "dell,hp"

    // 👉 validate
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    if (limit > 50) limit = 50;

    const skip = (page - 1) * limit;

    // 👉 xử lý multi brand
    const brandSlugs = brandParam
      ? brandParam.split(",").map((b) => b.trim())
      : [];

    // 👉 pipeline chung
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

    // 👉 filter brand nếu có
    if (brandSlugs.length > 0) {
      pipeline.push({
        $match: {
          "brand.slug": { $in: brandSlugs },
        },
      });
    }

    // 👉 clone pipeline để count
    const countPipeline = [
      ...pipeline,
      { $count: "total" },
    ];

    // 👉 thêm sort + pagination
    pipeline.push(
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    );

    // 👉 chạy query
    const [products, totalResult] = await Promise.all([
      db.collection("products").aggregate(pipeline).toArray(),
      db.collection("products").aggregate(countPipeline).toArray(),
    ]);

    const total = totalResult[0]?.total || 0;
    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: String(error) },
      { status: 500 }
    );
  }
}


