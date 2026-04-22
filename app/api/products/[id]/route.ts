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

export async function PUT(
  req: NextRequest,
 context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("laptop-shop");


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

