
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

async function generateUniqueSlug(db: any, baseSlug: string, excludeId?: string) {
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const exist = await db.collection("brands").findOne({
      slug,
      ...(excludeId && { _id: { $ne: excludeId } }), // 👈 loại chính nó
    });

    if (!exist) break;

    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD") // bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-"); // space -> -
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "ID không hợp lệ" },
      { status: 400 }
    );
  }

    const { name, image } = await req.json(); // 👈 thêm image

    if (!name) {
      return NextResponse.json(
        { message: "Thiếu tên thương hiệu" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("laptop-shop");

    const brand = await db.collection("brands").findOne({
      _id: new ObjectId(id),
    });

    if (!brand) {
      return NextResponse.json(
        { message: "Không tìm thấy brand" },
        { status: 404 }
      );
    }

    // 🔥 xử lý slug
    let slug = brand.slug;

    if (brand.name !== name) {
      const baseSlug = toSlug(name);
      slug = await generateUniqueSlug(db, baseSlug, id);
    }

    // 🔥 build update data
    const updateData: any = {
      name,
      slug,
    };

    // 👇 chỉ update image khi có gửi lên
    if (image !== undefined) {
      updateData.image = image;
    }

    await db.collection("brands").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updateData,
      }
    );

    if (
      image &&
      brand.image?.publicId &&
      image.publicId !== brand.image.publicId
    ) {
      try {
        await cloudinary.uploader.destroy(brand.image.publicId);
      } catch (err) {
        console.error("Xóa ảnh Cloudinary thất bại:", err);
      }
    }

    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error },
      { status: 500 }
    );
  }
}