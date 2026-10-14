
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

async function generateUniqueSlug(
  db: any,
  baseSlug: string,
  excludeId?: ObjectId
) {
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const exist = await db.collection("categories").findOne({
      slug,
      ...(excludeId && { _id: { $ne: excludeId } }),
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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
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

    const body = await req.json();
    const { name, image, description, isActive, sortOrder } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { message: "Thiếu tên danh mục" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("laptop-shop");
    const categoryId = new ObjectId(id);

    const category = await db.collection("categories").findOne({
      _id: categoryId,
    });

    if (!category) {
      return NextResponse.json(
        { message: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    const normalizedName = name.trim();
    let slug = category.slug;

    if (category.name !== normalizedName) {
      const baseSlug = toSlug(normalizedName);

      if (!baseSlug) {
        return NextResponse.json(
          { message: "Tên danh mục không hợp lệ" },
          { status: 400 }
        );
      }

      slug = await generateUniqueSlug(db, baseSlug, categoryId);
    }

    const updateData: any = {
      name: normalizedName,
      slug,
    };

    if (image !== undefined) {
      updateData.image = image;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (typeof isActive === "boolean") {
      updateData.isActive = isActive;
    }

    if (
      sortOrder !== undefined &&
      Number.isFinite(Number(sortOrder))
    ) {
      updateData.sortOrder = Number(sortOrder);
    }

    await db.collection("categories").updateOne(
      { _id: categoryId },
      { $set: updateData }
    );

    if (
      image &&
      category.image?.publicId &&
      image.publicId !== category.image.publicId
    ) {
      try {
        await cloudinary.uploader.destroy(category.image.publicId);
      } catch (err) {
        console.error("Xóa ảnh Cloudinary thất bại:", err);
      }
    }

    return NextResponse.json({
      message: "Cập nhật danh mục thành công",
    });
  } catch (error) {
    console.error("PUT /api/categories/[id] error:", error);

    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}
