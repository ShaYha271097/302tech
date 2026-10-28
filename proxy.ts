
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // BẢO TRÌ WEBSITE
  const maintenanceMode =
    process.env.MAINTENANCE_MODE === "true";

  if (maintenanceMode) {
    // Cho phép trang bảo trì và tài nguyên cần thiết
    if (
      pathname === "/maintenance" ||
      pathname.startsWith("/_next") ||
      pathname === "/favicon.ico" ||
      pathname === "/icon.png"
    ) {
      return NextResponse.next();
    }

    // Giữ khu vực admin hoạt động
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/dashboard")
    ) {
      // Tiếp tục chạy logic xác thực admin bên dưới
    } else {
      return NextResponse.rewrite(
        new URL("/maintenance", req.url)
      );
    }
  }

  // XÁC THỰC ADMIN — giữ logic hiện tại
  const token = req.cookies.get("admin_token")?.value;

  const isLoginPage = pathname === "/admin/login";

  if (!token) {
    if (!isLoginPage) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }

    return NextResponse.next();
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);

    if (isLoginPage) {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }
}

export const config = {
  matcher: ["/admin/login", "/dashboard/:path*"],
};