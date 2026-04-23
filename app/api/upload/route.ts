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
    const type = formData.get("type"); // 👈 thêm dòng này

    if (!(file instanceof File)) {
      return Response.json({ error: "Không có file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🎯 chọn transformation theo type
    let transformation: any = [];

    switch (type) {
      case "product":
        transformation: [
        {
          width: 800,
          height: 800,
          crop: "fill",
        }
      ]
        break;

      case "slider":
        transformation = [
          {
          width: 1200,
          height: 450,
        crop: "crop",
    gravity: "center",
          
          },
        ];
        break;

      case "banner":
        transformation = [
          {
            width: 400,
            height: 250,
            crop: "fill",
          },
        ];
        break;

      default:
        transformation = [];
    }

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "uploads",
            transformation,
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