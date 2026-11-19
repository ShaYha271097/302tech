export function optimizeCloudinaryUrl(
  url?: string,
  width?: number
) {
  if (!url) return "";

  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace(
    "/image/upload/",
    `/image/upload/f_auto,q_auto${width ? `,w_${width}` : ""}/`
  );
}