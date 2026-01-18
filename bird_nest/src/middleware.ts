// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import refreshAccessToken from "./helper/refreshAccessToken";
const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa";
import { SignJWT } from "jose";
import joseVerify from "./helper/joseVerify";
import { routeModule } from "next/dist/build/templates/pages";
const SESSION_COOKIE_OPTION = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("access_token")?.value;
//   if (!token)
//     return NextResponse.json({ error: "Not logged in" }, { status: 401 });

//   try {
//     const parts = token.split(".");
//     if (parts.length === 3) {
//       try {
//         const decodedPayload = JSON.parse(
//           Buffer.from(parts[1], "base64").toString("utf8")
//         );
//         console.log(
//           "Decoded refresh_token payload (no verify)",
//           decodedPayload
//         );
//         return NextResponse.next();
//       } catch (e) {
//         console.warn("Failed to decode refresh_token payload", e);
//       }
//     } else {
//       return NextResponse.json(
//         { error: " access Token expired " },
//         { status: 401 }
//       );
//     }
//   } catch (err) {
//     return NextResponse.json(
//       { error: " access Token expired rồi" },
//       { status: 401 }
//     );
//   }
// }

// matcher chỉ định route nào cần áp dụng middleware
export async function middleware(req: NextRequest) {
  // Skip middleware cho OAuth landing page và API để tránh race condition
  if (
    req.nextUrl.pathname === "/oauth/landingPage" ||
    req.nextUrl.pathname === "/api/auth/oauth/landing"
  ) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get("refresh_token")?.value;
  const accessToken = req.cookies.get("access_token")?.value;

  if (!refreshToken) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const parts = refreshToken.split(".");
    if (parts.length === 3) {
      try {
        const decodedPayload = JSON.parse(
          Buffer.from(parts[1], "base64").toString("utf8")
        );
        console.log(
          "Decoded refresh_token payload (no verify)",
          decodedPayload
        );
        if (decodedPayload.id) {
          //return NextResponse.next();

          // cách 1
          if (!accessToken) {
            const tokenPayload = {
              id: decodedPayload.id,
              username: decodedPayload.username,
              tokenType: "access",
              role: decodedPayload.role,
              // thời gian token được tạo, bạn có thể tuỳ ý thêm các claim khác
            };
            const newAccessToken = await new SignJWT(tokenPayload)
              .setProtectedHeader({ alg: "HS256" })
              .setExpirationTime("15m") // token expire 15 phút
              .sign(new TextEncoder().encode(JWT_SECRET));

            console.log("newAccessToken jose created", newAccessToken);
            const response = NextResponse.redirect(req.nextUrl);
            response.cookies.set("access_token", newAccessToken, {
              ...SESSION_COOKIE_OPTION,

              maxAge: 15 * 60,
            });
            return response;
          } else {
            return NextResponse.next();
            // const userId = await joseVerify(accessToken);
            // if (userId === decodedPayload.id) {
            //   return NextResponse.next();
            // } else {
            //   return NextResponse.redirect(new URL("/login", req.url));
            // }
          }

          // if (accessToken) {
          //   console.log("middleware.ts accessToken is not expire!");
          //   return NextResponse.next();
          // } else {
          //   //const newToken = await refreshAccessToken(refreshToken);
          //   console.log("middleware.ts newToken hết hạn => chuẩn bị refresh");
          //   const newToken = await fetch(
          //     "http://localhost:3000/api/auth/refresh",
          //     {
          //       method: "POST",
          //       credentials: "include", // gửi cookie refresh token
          //     }
          //   );

          //   console.log(
          //     "middleware.ts newToken refresh! => set cookies",
          //     newToken
          //   );
          //   if (!newToken) {
          //     return NextResponse.redirect(new URL("/login", req.url));
          //   }

          //   // Create a response (NextResponse) and set the new access_token cookie
          //   const response = NextResponse.next();
          //   // response.cookies.set("access_token", newToken, {
          //   //   httpOnly: true,
          //   //   secure: true,
          //   //   path: "/",
          //   //   maxAge: 2 * 60,
          //   // });
          //   return response;
          // }
        } else {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      } catch (e) {
        console.error("Failed to decode refresh_token payload", e);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/api/protected/:path*",
    "/payment",
    "/checkout/:path*",
    "/orders",
    "/api/cart",
    "/api/orders/user/:id",
    "/api/orders/:id",
    "/api/orders/create-order",
    "/chat",
    // "/api/checkout-sessions",

    "/dashboard/:path*", // hoặc frontend route /dashboard/*
  ],
};
