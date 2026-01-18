import { NextResponse } from "next/server";

const SESSION_COOKIE_OPTION = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: 200 }
  );

  // Xóa access token
  response.cookies.set("access_token", "", {
    ...SESSION_COOKIE_OPTION,
    maxAge: 0,
  });

  // Xóa refresh token
  response.cookies.set("refresh_token", "", {
    ...SESSION_COOKIE_OPTION,
    maxAge: 0,
  });

  return response;
}
