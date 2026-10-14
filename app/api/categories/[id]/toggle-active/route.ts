
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID danh mục không hợp lệ" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("laptop-shop");

    const category = await db.collection("categories").findOne({
      _id: new ObjectId(id),
    });

    if (!category) {
      return NextResponse.json(
        { message: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    const newStatus = !category.isActive;

    await db.collection("categories").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isActive: newStatus,
        },
      }
    );

    return NextResponse.json({
      success: true,
      isActive: newStatus,
    });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái danh mục:", error);

    return NextResponse.json(
      { message: "Lỗi server khi cập nhật danh mục" },
      { status: 500 }
    );
  }
}
