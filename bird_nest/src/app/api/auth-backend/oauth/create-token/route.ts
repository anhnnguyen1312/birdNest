import { NextRequest, NextResponse } from "next/server";
import { OAuthAccounts, OAuthProvider } from "@/models/OAuthAccounts";
import sequelize from "@/lib/sequelize";
import { signBackendJWT } from "@/helper/signBackendJWT";

export async function POST(req: NextRequest) {
  try {
    await sequelize.authenticate();
    const { token, user, account } = await req.json();

    if (!token || !account) {
      return NextResponse.json(
        { error: 1, message: "Thiếu thông tin đăng nhập." },
        { status: 400 }
      );
    }

    console.log("oauth create-token:", { token, user, account });

    // Find OAuth account to get user
    const oauthAccount = await OAuthAccounts.findOne({
      where: {
        provider: account.provider as OAuthProvider,
        providerId: account.providerAccountId,
      },
      include: [
        {
          model: (await import("@/models/Users.model")).Users,
          as: "user",
          attributes: ["id", "username", "role"],
        },
      ],
    });
    console.log(" find oauth account", oauthAccount);
    if (!oauthAccount || !oauthAccount.user) {
      return NextResponse.json(
        { error: 1, message: "Tài khoản OAuth không tồn tại." },
        { status: 401 }
      );
    }

    const userData = oauthAccount.user;

    // Add user info to NextAuth token
    token.id = userData.id;
    token.role = userData.role;

    token.backendAccessToken = signBackendJWT({
      id: userData.id,
      email: userData.username,
      role: userData.role,
    });

    const res = NextResponse.json({
      error: 0,
      token: token,
    });
    return res;
  } catch (err) {
    console.error("OAuth create-token error:", err);
    return NextResponse.json(
      { error: 1, message: "Lỗi máy chủ. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
