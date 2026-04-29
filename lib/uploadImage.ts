// lib/uploadImage.ts

export const getImageRatio = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const ratio = img.width / img.height;
      URL.revokeObjectURL(url);
      resolve(ratio);
    };

    img.src = url;
  });
};

export const uploadImage = async (
  file: File,
  type: "product" | "slider" | "banner" | "brand"
) => {
  const ratio = await getImageRatio(file);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("ratio", String(ratio)); // 👈 gửi lên backend

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();
  return data.url;
};