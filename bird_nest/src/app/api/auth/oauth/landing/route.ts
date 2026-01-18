import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ExtendedSession {
  user: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
  };
}

const SESSION_COOKIE_OPTION = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function GET(req: NextRequest) {
  try {
    // 1. Kiểm tra NextAuth session
    const session = (await getServerSession(
      authOptions
    )) as ExtendedSession | null;
    console.log(session, "session");
    if (!session?.user) {
      console.log("No OAuth session found, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    console.log("OAuth landing API - session found:", session.user);

    // 2. Kiểm tra xem đã có access_token chưa
    const cookieStore = await cookies();
    const existingAccessToken = cookieStore.get("access_token");

    if (existingAccessToken) {
      console.log("Access token already exists, redirecting home");
      return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("Creating new tokens for user:", session.user.id);

    // 3. Tạo user data từ session
    const userData = {
      id: session.user.id,
      username: (session.user as { name?: string; email?: string }).name,
      role: session.user.role || "user",
    };

    const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa";

    // 4. Tạo refresh token
    const refreshTokenPayload = {
      id: userData.id,
      username: userData.username,
      tokenType: "refresh",
      role: userData.role,
    };
    const refreshToken = jwt.sign(refreshTokenPayload, JWT_SECRET, {
      expiresIn: "1d", // 7 ngày
    });

    // 5. Tạo access token
    const tokenPayload = {
      id: userData.id,
      username: userData.username,
      tokenType: "access",
      role: userData.role,
    };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "15m", // 15 phút
    });

    console.log("Created OAuth tokens for user:", userData.id);

    // 6. Set cookies and redirect home
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("access_token", accessToken, {
      ...SESSION_COOKIE_OPTION,
      maxAge: 15 * 60, // 15 phút
    });
    response.cookies.set("refresh_token", refreshToken, {
      ...SESSION_COOKIE_OPTION,
      maxAge: 7 * 24 * 60 * 60, // 7 ngày
    });

    return response;
  } catch (error) {
    console.error("OAuth landing API error:", error);
    return NextResponse.redirect(new URL("/login?error=oauth_error", req.url));
  }
}
