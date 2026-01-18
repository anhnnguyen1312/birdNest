import { NextRequest, NextResponse } from "next/server";
import { Orders } from "@/models/Orders.model";
import { OrderItems } from "@/models/OrderItems.model";
import { Users } from "@/models/Users.model";
import sequelize from "@/lib/sequelize";
import { cookies } from "next/headers";
import jwtVerify from "@/helper/jwtVerify";
import refreshAcessToken from "@/helper/refreshAccessToken";
import { redirect } from "next/navigation";
import { checkUserAuthentication } from "@/helper/cartHelpers";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await sequelize.authenticate();
    console.log("alo");

    // Lấy orderId từ query params
    // const orderId = req.nextUrl.searchParams.get("orderId");
    const orderId = (await context.params).id;
    console.log(orderId, "orderId");
    if (!orderId) {
      return NextResponse.json(
        { error: 1, message: "Thiếu orderId" },
        { status: 400 }
      );
    }

    // Xác thực access token
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("access_token")?.value;

    // if (!accessToken) {
    //   return NextResponse.json(
    //     { error: 1, message: "Không có token" },
    //     { status: 401 }
    //   );
    // }
    const cookieStore = await cookies();

    // const userId = await jwtVerify(accessToken);
    const userId = await checkUserAuthentication(cookieStore);
    if (!userId) {
      return NextResponse.json(
        { error: 1, message: "token expirated!" },
        { status: 401 }
      );
    }

    console.log("trước queery order");

    // Tìm order theo orderId
    const order = await Orders.findOne({
      where: { id: parseInt(orderId) },
    });

    if (!order) {
      return NextResponse.json(
        { error: 1, message: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }
    console.log("order", order);

    // Kiểm tra order thuộc về user đã đăng nhập
    if (order.userId !== userId) {
      return NextResponse.json(
        { error: 1, message: "Bạn không có quyền xem đơn hàng này" },
        { status: 403 }
      );
    }

    // Lấy order items
    const orderItems = await OrderItems.findAll({
      where: { orderId: order.id },
    });

    console.log("orderItems", orderItems);

    return NextResponse.json({
      error: 0,
      message: "Lấy đơn hàng thành công",
      order: {
        ...order.toJSON(),
        items: orderItems,
      },
    });
  } catch (err) {
    console.error("Get order error:", err);
    return NextResponse.json(
      { error: 1, message: "Có lỗi xảy ra khi lấy đơn hàng" },
      { status: 500 }
    );
  }
}
