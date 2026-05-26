import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  
  try {
    const { username, password } = await req.json();

    // ❌ thiếu input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Thiếu thông tin" },
        { status: 400 }
      );
    }
    // ❌ sai username
    if (username !== process.env.ADMIN_USERNAME) {
      return NextResponse.json(
        { error: "Sai tài khoản hoặc mật khẩu" },
        { status: 400 }
      );
    }
   console.log("=>>>>>>>>>>>>>SSS",username,password,process.env.ADMIN_PASSWORD_HASH!)
    // ✅ check password hash
//     const isMatch = await bcrypt.compare(
//       password,
//       process.env.ADMIN_PASSWORD_HASH!
//     );
//  console.log("qua day ko=>>>>",isMatch)
//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Sai tài khoản hoặc mật khẩu" },
//         { status: 400 }
//       );
//     }

    // ✅ tạo token
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ✅ set cookie
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: "Lỗi server", detail: err.message },
      { status: 500 }
    );
  }
}