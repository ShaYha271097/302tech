import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getBrands } from "@/lib/brands";

type Brand = {
  _id?: string;
  name: string;
  image:string;
  slug:string
  createdAt?: Date;
};
async function generateUniqueSlug(db: any, baseSlug: string) {
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const exist = await db.collection("brands").findOne({ slug });

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
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const data = await getBrands({
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
    const { name, image } = body; // 👈 thêm image

    if (!name) {
      return NextResponse.json(
        { message: "Thiếu tên thương hiệu" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("laptop-shop");

    const baseSlug = toSlug(name);
    const slug = await generateUniqueSlug(db, baseSlug);

    const newBrand = {
      name,
      slug,
      image: image || "", // 👈 thêm dòng này
      createdAt: new Date(),
    };

    const result = await db.collection("brands").insertOne(newBrand);

    return NextResponse.json(
      {
        message: "Tạo thành công",
        data: { ...newBrand, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error },
      { status: 500 }
    );
  }
}