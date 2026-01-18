import React from "react";
import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa";
import { jwtVerify } from "jose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function verifyRole(accessToken: any) {
  if (!accessToken) {
    return false;
  } else {
    try {
      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(JWT_SECRET)
      );

      // payload có thể gồm userId, role, etc.
      console.log("payload verifyRole check role", payload);

      if (payload.id) {
        return payload;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default verifyRole;
