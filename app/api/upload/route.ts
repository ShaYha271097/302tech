import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "Không có file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "products",
            transformation: [
              {
                width: 800,
                height: 800,
                crop: "fill",
              },
            ],
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    return Response.json({ url: result.secure_url });

  } catch (err: any) {
    console.error(err);
    return Response.json(
      { error: "Upload failed", detail: err.message },
      { status: 500 }
    );
  }
}