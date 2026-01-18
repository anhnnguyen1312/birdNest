import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth/next";

interface ExtendedSession {
  user: {
    id?: string;
    name?: string;
    email?: string;
    userId?: string;
    role?: string;
  };
}

const SESSION_COOKIE_OPTION = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export default async function OAuthLanding() {
  try {
    // 1. Kiểm tra NextAuth session
    const session = (await getServerSession()) as ExtendedSession | null;

    if (!session?.user) {
      console.log("No OAuth session found, redirecting to login");
      redirect("/login");
    }

    console.log("OAuth landing page - session found:", session.user.userId);

    // 2. Kiểm tra xem đã có access_token chưa
    const cookieStore = await cookies();
    const existingAccessToken = cookieStore.get("access_token");

    if (existingAccessToken) {
      console.log(
        "Access token already exists, clearing oauth_processing flag"
      );
      // Clear OAuth processing flag
      const response = NextResponse.redirect(
        new URL("/", process.env.API_BASE_URL || "http://localhost:3000")
      );
      response.cookies.set("oauth_processing", "", { maxAge: 0 });
      return response;
    }

    console.log("Creating new tokens for user:", session.user.userId);

    // 3. Tạo user data từ session
    const userData = {
      id: session.user.userId || session.user.id || "",
      username: (session.user as any).name || (session.user as any).email || "",
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
      expiresIn: "7d", // 7 ngày
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

    // 6. Set cookies and clear OAuth processing flag
    const response = NextResponse.redirect(
      new URL("/", process.env.API_BASE_URL || "http://localhost:3000")
    );
    response.cookies.set("access_token", accessToken, {
      ...SESSION_COOKIE_OPTION,
      maxAge: 15 * 60, // 15 phút
    });
    response.cookies.set("refresh_token", refreshToken, {
      ...SESSION_COOKIE_OPTION,
      maxAge: 7 * 24 * 60 * 60, // 7 ngày
    });
    // Clear OAuth processing flag
    response.cookies.set("oauth_processing", "", { maxAge: 0 });

    return response;
  } catch (error) {
    console.error("OAuth landing page error:", error);
    // Clear flag on error
    redirect("/login?error=oauth_error");
  }
}
