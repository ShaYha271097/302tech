import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

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

    if (!ids.every((id: string) => ObjectId.isValid(id))) {
      return NextResponse.json(
        { message: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    const objectIds = ids.map((id: string) => new ObjectId(id));

    const brands = await db
      .collection("brands")
      .find({
        _id: { $in: objectIds },
      })
      .toArray();

    const result = await db.collection("brands").deleteMany({
      _id: { $in: objectIds },
    });
    if (result.deletedCount > 0) {
      await Promise.all(
      brands.map(async (brand) => {
        if (brand.image?.publicId) {
          try {
            await cloudinary.uploader.destroy(
              brand.image.publicId
            );
          } catch (err) {
            console.error(err);
          }
        }
      })
);
    }


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