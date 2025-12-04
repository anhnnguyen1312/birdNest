import React from "react";
import jwt from "jsonwebtoken";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
// import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa";

async function jwtVerify(cookies: {
  (): Promise<ReadonlyRequestCookies>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (): any;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
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
        return true;
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
