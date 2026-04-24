import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";

  // ❌ chưa login
  if (!token) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    console.log("có vào đây ko ",isLoginPage)
    // ✅ đã login mà vào login
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/login", "/dashboard/:path*"],
};