import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "Không có dữ liệu" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("laptop-shop");

    const objectIds = ids.map((id: string) => new ObjectId(id));

    const result = await db.collection("products").deleteMany({
      _id: { $in: objectIds },
    });

    return NextResponse.json({
      message: "Xóa thành công",
      deletedCount: result.deletedCount,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: String(error) },
      { status: 500 }
    );
  }
}