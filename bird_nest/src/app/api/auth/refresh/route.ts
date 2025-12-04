import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SESSION_COOKIE_OPTION = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa"; // Nên đặt trong biến môi trường

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    // Verify refresh token
    const payload = jwt.verify(
      refreshToken,
      JWT_SECRET!
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;

    // payload có thể gồm userId, role, etc.
    console.log("payload server check", payload);

    // Tạo access token mới

    const tokenPayload = {
      id: payload.id,
      username: payload.username,
      tokenType: "access",
      // thời gian token được tạo, bạn có thể tuỳ ý thêm các claim khác
    };
    const newAccessToken = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "15m",
    });
    console.log("newAccessToken server check", newAccessToken);

    // Set cookie access token mới
    const res = NextResponse.json({ message: "Token refreshed" });
    res.cookies.set("access_token", newAccessToken, {
      ...SESSION_COOKIE_OPTION,
      maxAge: 30 * 60, // 15 phút
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
