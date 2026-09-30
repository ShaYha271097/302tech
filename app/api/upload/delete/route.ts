import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.publicId) {
      return NextResponse.json(
        { error: "Thiếu publicId" },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(body.publicId, {
      resource_type: "image",
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Cloudinary delete error:", error);

    return NextResponse.json(
      { error: "Xóa ảnh thất bại" },
      { status: 500 }
    );
  }
}