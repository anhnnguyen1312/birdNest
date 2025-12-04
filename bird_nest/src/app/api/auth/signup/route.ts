import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/models/Users.model";
import sequelize from "@/lib/sequelize";
import bcrypt from "bcryptjs";

// Giả sử Bạn chỉ cho phép các trường: username, password. Còn các thông tin khác hãy mở rộng sau.

export async function POST(req: NextRequest) {
  try {
    await sequelize.authenticate();

    const { username, password } = await req.json();

    // Validate input
    if (
      !username ||
      typeof username !== "string" ||
      username.trim().length < 3
    ) {
      return NextResponse.json(
        { error: 1, message: "Tên đăng nhập tối thiểu 3 ký tự." },
        { status: 400 }
      );
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: 1, message: "Mật khẩu tối thiểu 6 ký tự." },
        { status: 400 }
      );
    }

    const sanitizedUsername = username.trim();

    // Check existed user (case insensitive)
    const existed = await Users.findOne({
      where: sequelize.where(
        sequelize.fn("lower", sequelize.col("username")),
        sanitizedUsername.toLowerCase()
      ),
      attributes: ["id"],
    });

    if (existed) {
      return NextResponse.json(
        { error: 1, message: "Tên đăng nhập đã được sử dụng." },
        { status: 409 }
      );
    }

    // Hash password (bcrypt)
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    // Note: createdAt và updatedAt được Sequelize tự động xử lý khi timestamps: true
    const user = await Users.create({
      username: sanitizedUsername,
      password: hashPassword,

      // role: "user" // nếu có
    });

    // Trả về thông tin user đã đăng ký (ẩn password)
    return NextResponse.json({
      error: 0,
      message: "Đăng ký thành công.",
      user: {
        id: user.id,
        username: user.username,

        // role: user.role || "user",
        // Các trường khác nếu có
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: 1, message: "Không thể đăng ký. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
