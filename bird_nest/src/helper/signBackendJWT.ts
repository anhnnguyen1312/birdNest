import jwt from "jsonwebtoken";

export function signBackendJWT(payload: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(
    {
      sub: payload.id,
      email: payload.email,
      role: payload.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",

      //   issuer: 'your-backend',
    }
  );
}
