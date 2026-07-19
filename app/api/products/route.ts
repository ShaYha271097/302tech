// ddrduongqua1027_db_user
// jl4DFbBmPmRRzEuZ
import clientPromise from "@/lib/mongodb" // chỉnh đúng path của bạn
import { NextResponse, NextRequest } from "next/server"

import { ObjectId } from "mongodb"
import { requireAdmin } from "@/lib/auth"
import { getProducts } from "@/lib/getProduct";
import { CloudinaryImage } from "@/types/image";

type Variant = {
  cpu: string;
  ram: string;
  ssd: string;
  gpu: string; 
  price: number;
  screenSize: string;
  resolution: string;
  refreshRate: string;
};

type Product = {
  brandId: ObjectId;
  name: string;
  slug: string;
 mainImage: CloudinaryImage;
  gallery: CloudinaryImage[];
  variants: Variant[];
  createdAt: Date;
  isHot: boolean;
  isNew: boolean;
  isActive: boolean; 
};

export async function POST(req: Request) {
  requireAdmin(req);

  const body = await req.json();

  // NAME
  if (!body.name || body.name.trim().length < 5) {
    return Response.json(
      { error: "Tên không hợp lệ" },
      { status: 400 }
    );
  }

  // BRAND
  if (!body.brandId) {
    return Response.json(
      { error: "Thiếu thương hiệu" },
      { status: 400 }
    );
  }

  // SLUG
  if (!body.slug || !body.slug.trim()) {
    return Response.json(
      { error: "Thiếu slug" },
      { status: 400 }
    );
  }

  // MAIN IMAGE
  if (!body.mainImage) {
    return Response.json(
      { error: "Thiếu ảnh chính" },
      { status: 400 }
    );
  }

  // GALLERY
  if (!Array.isArray(body.gallery)) {
    return Response.json(
      { error: "Gallery không hợp lệ" },
      { status: 400 }
    );
  }

  if (body.gallery.length < 2) {
    return Response.json(
      { error: "Cần ít nhất 2 ảnh phụ" },
      { status: 400 }
    );
  }

  if (body.gallery.length > 6) {
    return Response.json(
      { error: "Tối đa 6 ảnh phụ" },
      { status: 400 }
    );
  }

  // VARIANTS
  if (
    !Array.isArray(body.variants) ||
    body.variants.length === 0
  ) {
    return Response.json(
      { error: "Phải có ít nhất 1 cấu hình" },
      { status: 400 }
    );
  }

  if (
    body.variants.some(
      (v: any) =>
        !v.cpu ||
        !v.gpu ||
        v.price <= 0
    )
  ) {
    return Response.json(
      { error: "Cấu hình không hợp lệ" },
      { status: 400 }
    );
  }

  const product: Product = {
    brandId: new ObjectId(body.brandId),

    name: body.name.trim(),

    // frontend gửi slug lên
    slug: body.slug.trim(),

     mainImage: {
      url: body.mainImage.url,
      publicId: body.mainImage.publicId,
    },

    gallery: (body.gallery || []).map((img: any) => ({
      url: img.url,
      publicId: img.publicId,
    })),

    variants: body.variants,

    createdAt: new Date(),

    isHot: body.isHot ?? false,

    isNew: body.isNew ?? true,

    // trạng thái bán
    isActive: body.isActive ?? true,
  };

  const client = await clientPromise;

  const db = client.db("laptop-shop");

  const result = await db
    .collection<Product>("products")
    .insertOne(product);

  return Response.json(result);
}




export async function GET(req: NextRequest) {
  try {


    const { searchParams } = new URL(req.url);
   const result = await getProducts({
      page: Number(searchParams.get("page") || 1),
      limit: Number(searchParams.get("limit") || 5),

      category:
        searchParams.get("category") || "laptop",

      brand:
        searchParams.get("brand") || "",

      search:
        searchParams.get("search") || "",

      isHot:
        searchParams.get("isHot") === "true",

      price: searchParams.getAll("price"),
      ram: searchParams.getAll("ram"),
      ssd: searchParams.getAll("ssd"),
        // sort
      sort : searchParams.get("sort") || "date_desc"
    });
   return NextResponse.json(result);

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

