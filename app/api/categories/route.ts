
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getCategories } from "@/lib/categories";


type Category = {
  _id?: string;
  name: string;
  image: string | null;
  slug: string;
  description?: string;
  isActive?: boolean;
  sortOrder?: number;
  createdAt?: Date;
};

async function generateUniqueSlug(db: any, baseSlug: string) {
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const exist = await db.collection("categories").findOne({ slug });

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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const data = await getCategories({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "date_asc",
  });

  return Response.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, image, description, sortOrder } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { message: "Thiếu tên danh mục" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("laptop-shop");

    const baseSlug = toSlug(name.trim());

    if (!baseSlug) {
      return NextResponse.json(
        { message: "Tên danh mục không hợp lệ" },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(db, baseSlug);

    const newCategory = {
      name: name.trim(),
      slug,
      image: image || null,
    //   description: description || "",
    //   sortOrder: Number.isFinite(Number(sortOrder))
    //     ? Number(sortOrder)
    //     : 0,
      isActive: false,
      createdAt: new Date(),
    };

    const result = await db
      .collection("categories")
      .insertOne(newCategory);

    return NextResponse.json(
      {
        message: "Tạo danh mục thành công",
        data: { ...newCategory, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/categories error:", error);

    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}
