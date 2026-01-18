import React from "react";
import jwt from "jsonwebtoken";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
// import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function jwtVerify(accessToken: any) {
  if (!accessToken) {
    return false;
  } else {
    try {
      const payload = jwt.verify(
        accessToken,
        JWT_SECRET!
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;

      // payload có thể gồm userId, role, etc.
      console.log("payload accessToken check", payload);

      if (payload.id) {
        return payload.id;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default jwtVerify;
