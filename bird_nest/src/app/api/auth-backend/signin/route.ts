import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/models/Users.model";
import sequelize from "@/lib/sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// NOTE: In a production-grade app, you should use httpOnly secure cookies, JWTs, or session stores.
// For demo: we'll use a signed cookie for the session (stateless JWT can also be used).

const SESSION_COOKIE_NAME = "bn_session";
const SESSION_COOKIE_OPTION = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
interface UserSession {
  id: number;
  username: string;
  role: string;
}
async function createSession(user: UserSession) {
  // Only encode non-sensitive info (e.g., id, username)
  // You can use JWT here for stronger security
  return {
    id: user.id,
    username: user.username,
    role: user.role || "user",
  };
}

export async function POST(req: NextRequest) {
  try {
    await sequelize.authenticate();
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json(
        { error: 1, message: "Thiếu thông tin đăng nhập." },
        { status: 400 }
      );
    }

    // Tìm người dùng theo username (case-insensitive)
    // Chỉ lấy các thuộc tính: id, password, username từ Users
    // Tìm người dùng theo username (case-insensitive, chỉ lấy trường cần)
    const user = await Users.findOne({
      where: { username },
      attributes: ["id", "password", "username", "role"],
    });

    if (!user) {
      return NextResponse.json(
        { error: 1, message: "Tài khoản không tồn tại." },
        { status: 401 }
      );
    }
    console.log("user kìa", user.username);

    // So sánh mật khẩu đã hash
    const passwordValid = await bcrypt.compare(password, user.password);
    console.log("passwordValid", passwordValid);

    if (!passwordValid) {
      return NextResponse.json(
        { error: 1, message: "Sai mật khẩu." },
        { status: 401 }
      );
    }

    // Khởi tạo session
    // Extract data from Sequelize model instance to match UserSession type
    const userData: UserSession = {
      id: user.id!,
      username: user.username,
      role: user.role,
    };
    const sessionData = await createSession(userData);

    // Tạo session token (ở đây: encode as JSON base64, production nên xài JWT hoặc libs chuyên dụng)
    // const sessionStr = Buffer.from(JSON.stringify(sessionData)).toString(
    //   "base64"
    // );
    // Tạo session token bằng JWT
    // Lưu ý: Đảm bảo bạn đã cài đặt thư viện 'jsonwebtoken'
    // Tạo refresh token bổ sung (ví dụ hết hạn sau 30 ngày, chỉ chứa user id)

    const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa"; // Nên đặt trong biến môi trường
    const refreshTokenPayload = {
      id: userData.id,
      username: userData.username,
      tokenType: "refresh",
      role: userData.role,
    };
    const refreshToken = jwt.sign(refreshTokenPayload, JWT_SECRET, {
      expiresIn: "1d",
    });
    // Tạo payload cho JWT - chỉ nên chứa thông tin cơ bản
    const tokenPayload = {
      role: userData.role,

      id: userData.id,
      username: userData.username,
      tokenType: "access",
      // thời gian token được tạo, bạn có thể tuỳ ý thêm các claim khác
    };
    // Tạo JWT, không đặt expiresIn để token không tự động hết hạn
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "2m" });

    // Tạo JWT, token hết hạn sau 7 ngày (configurable)
    // const token = jwt.sign(tokenPayload, JWT_SECRET, {
    //   expiresIn: "7d",
    // });

    // Set cookie cho client
    const res = NextResponse.json({
      error: 0,
      message: "Đăng nhập thành công.",
      user: sessionData,
    });
    res.cookies.set("access_token", token, {
      ...SESSION_COOKIE_OPTION,
      maxAge: 15 * 60, // 1 phút
    });
    res.cookies.set("refresh_token", refreshToken, {
      ...SESSION_COOKIE_OPTION,
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 30d in seconds
      path: "/", // optional, you can customize
    });
    res.cookies.delete("cart_id");

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: 1, message: "Lỗi máy chủ. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
