import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const data = await db.collection("homepage_banner").findOne({ key: "main" });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("laptop-shop");

  const result = await db.collection("homepage_banner").updateOne(
    { key: "main" },
    {
      $set: {
        slider: body.slider,
        banners: body.banners,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  return NextResponse.json({
    success: true,
    result,
  });
}