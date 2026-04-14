import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type Brand = {
  _id?: string;
  name: string;
  createdAt?: Date;
};


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
export async function GET() {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const brands = await db.collection("brands").find().toArray();

  return NextResponse.json(brands);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Thiếu tên thương hiệu" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("laptop-shop");

    const slug = toSlug(name); // 👈 tạo slug

    // check trùng theo slug (chuẩn hơn name)
    const exist = await db.collection("brands").findOne({ slug });

    if (exist) {
      return NextResponse.json(
        { message: "Thương hiệu đã tồn tại" },
        { status: 400 }
      );
    }

    const newBrand = {
      name,
      slug, // 👈 thêm slug
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