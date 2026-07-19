import cloudinary from "@/lib/cloudinary";


export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const type = formData.get("type") as string;
    const ratio = Number(formData.get("ratio")); // 👈 nhận từ FE

    if (!(file instanceof File)) {
      return Response.json({ error: "Không có file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // =========================
    // 🎯 HELPER chọn crop
    // =========================
    const getTransform = (
      width: number,
      height: number
    ) => {
      const targetRatio = width / height;

      if (ratio) {
        const diff = Math.abs(ratio - targetRatio);

        // 👉 gần giống → fill (đẹp)
        if (diff < 0.2) {
          return {
            width,
            height,
            crop: "fill",
            gravity: "center",
          };
        }
      }

      // 👉 khác nhiều → fit (an toàn)
      return {
        width,
        height,
        crop: "fit",
        background: "white",
      };
    };

    // =========================
    // 🎯 chọn transformation
    // =========================
    let transformation: any[] = [];

    switch (type) {
      case "product":
          transformation = [];
        // transformation = [
        //   {
        //     width: 800,
        //     height: 800,
        //     crop: "fill",
        //   },
        // ];
        break;

      case "slider":
        transformation = [];
        break;

      case "banner":
        // transformation = [getTransform(400, 250)];
         transformation = [];
        break;

      case "brand":
        transformation = [
          {
            width: 300,
            height: 300,
            crop: "fit",
            background: "white",
          },
        ];
        break;
      default:
        transformation = [];
    }

    // =========================
    // 🚀 upload cloudinary
    // =========================
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `uploads/${type || "other"}`, // 👈 chia folder luôn
            transformation,
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    return Response.json({
      url: result.secure_url,
     publicId: result.public_id,
    });

  } catch (err: any) {
    console.error(err);
    return Response.json(
      {
        error: "Upload failed",
        detail: err.message,
      },
      { status: 500 }
    );
  }
}