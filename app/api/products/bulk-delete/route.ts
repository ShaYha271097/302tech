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

    const objectIds = ids.map((id: string) => new ObjectId(id));

    // 👉 Lấy toàn bộ product trước khi xóa
    const products = await db
      .collection("products")
      .find({
        _id: { $in: objectIds },
      })
      .toArray();

    // 👉 Xóa Mongo
    const result = await db.collection("products").deleteMany({
      _id: { $in: objectIds },
    });

    // 👉 Nếu xóa Mongo thành công thì xóa Cloudinary
    if (result.deletedCount > 0) {
      const publicIds: string[] = [];

      products.forEach((product: any) => {
        // Main Image
        if (product.mainImage?.publicId) {
          publicIds.push(product.mainImage.publicId);
        }

        // Gallery
        product.gallery?.forEach((img: any) => {
          if (img.publicId) {
            publicIds.push(img.publicId);
          }
        });
      });

      await Promise.all(
        publicIds.map(async (publicId) => {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.error("Cloudinary:", publicId, err);
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
      {
        message: "Lỗi server",
        error: String(error),
      },
      { status: 500 }
    );
  }
}