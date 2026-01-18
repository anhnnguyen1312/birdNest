import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Users } from "@/models/Users.model";
import sequelize from "@/lib/sequelize";

const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa";

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    console.log("accesstoken api/auth/me", accessToken);
    if (!accessToken) {
      return NextResponse.json(
        { error: 1, message: "Không có token" },
        { status: 401 }
      );
    }

    try {
      const payload = jwt.verify(accessToken, JWT_SECRET) as {
        id: number;
        username: string;
      };

      // Lấy thông tin user từ database
      const user = await Users.findOne({
        where: { id: payload.id },
        attributes: ["id", "username", "role", "createdAt", "updatedAt"],
      });

      if (!user) {
        return NextResponse.json(
          { error: 1, message: "User không tồn tại" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        error: 0,
        message: "Lấy thông tin user thành công",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error("JWT verify error:", error);
      return NextResponse.json(
        { error: 1, message: "Token không hợp lệ hoặc đã hết hạn" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { error: 1, message: "Lỗi máy chủ" },
      { status: 500 }
    );
  }
}
