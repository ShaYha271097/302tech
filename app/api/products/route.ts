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

    const { searchParams } = new URL(req.url);

    // 👉 params
    let page = Number(searchParams.get("page")) || 1;
    let limit = Number(searchParams.get("limit")) || 5;
    const brandParam = searchParams.get("brand") || "";
    const search = searchParams.get("search") || "";

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


export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("co vo day ko")
    const client = await clientPromise;
    const db = client.db("laptop-shop");

    const id = params.id;

    // 👉 validate id
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const {
      name,
      brandId,
      mainImage,
      gallery,
      variants,
    } = body;

    // 👉 validate
    if (!name || name.trim().length < 5) {
      return NextResponse.json(
        { message: "Tên không hợp lệ" },
        { status: 400 }
      );
    }

    if (!brandId) {
      return NextResponse.json(
        { message: "Thiếu brand" },
        { status: 400 }
      );
    }

    if (!variants || !variants.length) {
      return NextResponse.json(
        { message: "Chưa có cấu hình" },
        { status: 400 }
      );
    }

    // 👉 update data
    const updateData = {
      name,
      brandId: new ObjectId(brandId),
      mainImage,
      gallery,
      variants,
      updatedAt: new Date(),
    };

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Cập nhật thành công",
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: String(error) },
      { status: 500 }
    );
  }
}