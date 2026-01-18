// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { signBackendJWT } from "@/helper/signBackendJWT";
// next-auth.d.ts

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    /**
     * 1. Chạy sau khi OAuth thành công
     * Dùng để tạo hoặc cập nhật USER trong DB
     */
    async signIn({ user, account }) {
      //  if (!account || !user) return false;
      console.log("user nè", account?.provider, user);
      try {
        const response = await fetch(
          `${process.env.API_BASE_URL}/api/auth-backend/oauth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email || "",
              name: user.name,
              provider: account?.provider,
              providerAccountId: account?.providerAccountId,
            }),
          }
        );
        console.log("response /api/auth-backend/oauth/register", response);

        if (!response.ok) {
          // Nếu backend trả về lỗi thì chặn login
          return false;
        }
        // Có thể xử lý data nhận được nếu cần thiết, ví dụ: const backendUser = await response.json();
        // Nếu không cần gì thêm, chỉ cần return true để NextAuth tiếp tục flow bình thường
      } catch (error) {
        // Nếu có lỗi network/api thì chặn login

        return false;
      }

      return true;
    },

    /**
     * 2. JWT callback
     * - Lần đầu login: gắn backend access_token
     * - Những lần sau: reuse token cũ cho đến khi expire
     */
    async jwt({ token, user, account }) {
      // Lần đầu sau khi signIn
      if (user && account) {
        // const dbUser = await prisma.user.findUnique({
        //   where: { email: user.email },
        // })

        // if (dbUser) {
        //   token.userId = dbUser.id
        //   token.role = dbUser.role

        //   token.backendAccessToken = signBackendJWT({
        //     userId: dbUser.id,
        //     email: dbUser.email,
        //     role: dbUser.role,
        //   })
        // }
        try {
          const response = await fetch(
            `${process.env.API_BASE_URL}/api/auth-backend/oauth/create-token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
                user: user,
                account: account,
              }),
            }
          );

          if (!response.ok) {
            // Nếu backend trả về lỗi thì chặn login
            return false;
          }
          if (response.ok) {
            const data = await response.json();
            console.log(
              "response /api/auth-backend/oauth/create-token",
              data.token
            );
            return data.token;
          }

          // Có thể xử lý data nhận được nếu cần thiết, ví dụ: const backendUser = await response.json();
          // Nếu không cần gì thêm, chỉ cần return true để NextAuth tiếp tục flow bình thường
        } catch (error) {
          // Nếu có lỗi network/api thì chặn login

          return false;
        }
      }

      return token;
    },

    /**
     * 3. Session callback
     * Chỉ expose dữ liệu cần thiết ra client
     * KHÔNG expose backend JWT nếu không cần
     */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      console.log("session và token ở file config nextauth", session, token);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Sau OAuth login
      console.log("url session", url, baseUrl);
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/oauth/landingPage`;
      }
      return url;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
