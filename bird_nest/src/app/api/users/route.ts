import { NextResponse } from "next/server";
import { Users } from "@/models/Users.model";
import sequelize from "@/lib/sequelize";

export async function GET() {
  // Xử lý logic ở đây, ví dụ trả về JSON

  try {
    // Thêm user mẫu để test
    // const newUser = await Users.create({
    //   name: 'Nguyễn Văn A',
    //   email: 'vana@example.com',
    // });
    await sequelize.authenticate();

    const users = await Users.findAll({});
    return NextResponse.json({ message: "Get User success", user: users });
  } catch (error) {
    console.log("k thể sync db ", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
