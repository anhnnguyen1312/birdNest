import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { signAccessToken, signRefreshToken } from "@/lib/auth/token";
import { Users } from "@/models/Users.model";
import sequelize from "@/lib/sequelize";
import jwt from "jsonwebtoken";
const SESSION_COOKIE_OPTION = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
export async function POST(req: Request) {
  // 1. Lấy NextAuth JWT (xác thực OAuth)
  const nextAuthToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("create-oauth-token ne", nextAuthToken);

  if (!nextAuthToken?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cookieStore = cookies();
  // 2. Idempotent: nếu đã có access_token thì không tạo lại
  const existAccessToken = (await cookieStore).get("access_token");
  console.log("existAccessToken", existAccessToken);

  if (existAccessToken) {
    return NextResponse.json({ ok: true });
  }

  console.log("chưa có access");

  await sequelize.authenticate();
  const userData = {
    id: nextAuthToken.id!,
    username: nextAuthToken.name,
    role: nextAuthToken.role,
  };
  const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa"; // Nên đặt trong biến môi trường
  const refreshTokenPayload = {
    id: nextAuthToken.id,
    username: nextAuthToken.name,
    tokenType: "refresh",
    role: nextAuthToken.role,
  };
  const refreshToken = jwt.sign(refreshTokenPayload, JWT_SECRET, {
    expiresIn: "1d",
  });
  // Tạo payload cho JWT - chỉ nên chứa thông tin cơ bản

  const tokenPayload = {
    id: nextAuthToken.id,
    username: nextAuthToken.name,
    tokenType: "access",
    role: nextAuthToken.role,
    // thời gian token được tạo, bạn có thể tuỳ ý thêm các claim khác
  };
  // Tạo JWT, không đặt expiresIn để token không tự động hết hạn
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "2m" });

  // Tạo JWT, token hết hạn sau 7 ngày (configurable)
  // const token = jwt.sign(tokenPayload, JWT_SECRET, {
  //   expiresIn: "7d",
  // });

  // Set cookie cho client
  console.log("access token mới vừa create ne", token);

  const res = NextResponse.json({
    error: 0,
    message: "Đăng nhập thành công tại create-oauth-token",
    user: userData,
  });
  res.cookies.set("access_token", token, {
    ...SESSION_COOKIE_OPTION,
    maxAge: 15 * 60, // 1 phút
  });
  res.cookies.set("refresh_token", refreshToken, {
    ...SESSION_COOKIE_OPTION,
    httpOnly: true,
    maxAge: 24 * 60 * 60, // 30d in seconds
    path: "/", // optional, you can customize
  });
  return res;
}
