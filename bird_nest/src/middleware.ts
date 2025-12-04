// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  if (!token)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      try {
        const decodedPayload = JSON.parse(
          Buffer.from(parts[1], "base64").toString("utf8")
        );
        console.log(
          "Decoded refresh_token payload (no verify)",
          decodedPayload
        );
        return NextResponse.next();
      } catch (e) {
        console.warn("Failed to decode refresh_token payload", e);
      }
    } else {
      return NextResponse.json(
        { error: " access Token expired " },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: " access Token expired rồi" },
      { status: 401 }
    );
  }
}

// matcher chỉ định route nào cần áp dụng middleware
export const config = {
  matcher: [
    "/api/protected/:path*",
    "/api/products/hot_products/:path*",
    "/dashboard/:path*", // hoặc frontend route /dashboard/*
  ],
};
