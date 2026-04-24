import jwt from "jsonwebtoken";

export function verifyAdmin(req: Request) {
  const cookie = req.headers.get("cookie");

  if (!cookie) return false;

  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("admin_token="))
    ?.split("=")[1];

  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}


// 👉 helper gọn hơn
export function requireAdmin(req: Request) {
  if (!verifyAdmin(req)) {
    throw new Error("Unauthorized");
  }
}