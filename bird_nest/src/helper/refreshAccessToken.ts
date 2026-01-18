import React from "react";
import jwt from "jsonwebtoken";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
// import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAcessToken(refreshToken: any) {
  if (!refreshToken) {
    return null;
  } else {
    try {
      console.log("refreshToken", refreshToken);
      const payload = jwt.verify(
        refreshToken,
        JWT_SECRET!
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;

      // payload có thể gồm userId, role, etc.

      // Set cookie access token mới

      if (payload.id) {
        const tokenPayload = {
          id: payload.id,
          username: payload.username,
          tokenType: "access",
          // thời gian token được tạo, bạn có thể tuỳ ý thêm các claim khác
        };
        const newAccessToken = jwt.sign(tokenPayload, JWT_SECRET, {
          expiresIn: "2m",
        });
        console.log("newAccessToken server check", newAccessToken);

        return newAccessToken;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default refreshAcessToken;
