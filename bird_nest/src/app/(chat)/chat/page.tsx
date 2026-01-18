import sequelize from "@/lib/sequelize";
import joseVerify from "@/helper/joseVerify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import verifyRole from "@/helper/verifyRole";
import UserChat from "@/component/Chat/UserChat";
import AdminChat from "@/component/Chat/AdminChat";
async function Page() {
  await sequelize.authenticate();

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const userInfo = await verifyRole(accessToken);
  console.log("userId", userInfo);
  if (!accessToken || !userInfo || !userInfo.id) {
    redirect("/login");
  }

  return (
    <>
      {userInfo && userInfo.role === "admin" && <AdminChat />}
      {userInfo && userInfo.role === "user" && <UserChat />}
    </>
  );
}

export default Page;
