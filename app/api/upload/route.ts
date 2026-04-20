import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return Response.json({ error: "Không có file" }, { status: 400 });
  }

  // 🔥 CHECK TYPE
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "File không phải ảnh" }, { status: 400 });
  }

  // 🔥 CHECK SIZE (5MB)
  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "Ảnh vượt quá 5MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "products", // 👈 nên thêm
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      )
      .end(buffer);
  });

  return Response.json({ url: result.secure_url });
}