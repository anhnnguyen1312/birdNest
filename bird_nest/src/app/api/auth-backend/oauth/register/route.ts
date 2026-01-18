import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/models/Users.model";
import { OAuthAccounts, OAuthProvider } from "@/models/OAuthAccounts";
import sequelize from "@/lib/sequelize";
export async function POST(req: NextRequest) {
  try {
    await sequelize.authenticate();
    const { email, name, providerAccountId, provider } = await req.json();
    console.log("oauth register:", {
      email,
      name,
      providerAccountId,
      provider,
    });

    if (!provider || !providerAccountId) {
      return NextResponse.json(
        { error: 1, message: "Thiếu thông tin đăng nhập." },
        { status: 400 }
      );
    }

    // Validate provider
    if (!Object.values(OAuthProvider).includes(provider as OAuthProvider)) {
      return NextResponse.json(
        { error: 1, message: "Provider không hợp lệ." },
        { status: 400 }
      );
    }

    // Check if OAuth account already exists
    const existingOAuthAccount = await OAuthAccounts.findOne({
      where: {
        provider: provider as OAuthProvider,
        providerId: providerAccountId,
      },
    });

    if (existingOAuthAccount) {
      return NextResponse.json({
        error: 0,
        message: "Tài khoản đã tồn tại.",
        userId: existingOAuthAccount.userId,
      });
    }

    // Determine username based on provider
    let username;
    if (provider === OAuthProvider.GOOGLE) {
      username = email;
    } else if (provider === OAuthProvider.FACEBOOK) {
      username = name || email;
    }

    if (!username) {
      return NextResponse.json(
        { error: 1, message: "Không thể tạo username." },
        { status: 400 }
      );
    }

    // Find or create user
    // let user = await Users.findOne({
    //   where: { username },
    //   attributes: ["id", "username", "role"],
    // });

    // if (!user) {
    const user = await Users.create({
      username,
      role: "user",
    });
    // }

    // Create OAuth account
    await OAuthAccounts.create({
      provider: provider as OAuthProvider,
      providerId: providerAccountId,
      userId: user.id,
    });

    return NextResponse.json({
      error: 0,
      message: "Đăng nhập thành công.",
      userId: user.id,
    });
  } catch (err) {
    console.error("OAuth register error:", err);
    return NextResponse.json(
      { error: 1, message: "Lỗi máy chủ. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
