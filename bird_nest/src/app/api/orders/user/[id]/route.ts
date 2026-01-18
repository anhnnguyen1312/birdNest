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
import { Products } from "@/models/Products.model";
import { CustomOrderTypeFull } from "@/types";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const order: CustomOrderTypeFull[] = [];
  // {
  //   id: 0,
  //   userId: 0,
  //   email: "",
  //   phone: "",
  //   address: "",
  //   paymentMethod: "",
  //   totalPrice: 0,
  //   totalQuantity: 0,
  //   OrderItems: [],
  //   status: "",
  //   createdAt: "",
  //   updatedAt: "",
  // };
  try {
    await sequelize.authenticate();

    // Lấy orderId từ query params
    // const orderId = req.nextUrl.searchParams.get("orderId");
    const userClientId = (await context.params).id;
    console.log(userClientId, "userClientId");
    if (!userClientId) {
      return NextResponse.json(
        { error: 1, message: "Thiếu userClientId" },
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

    // Tìm order theo orderId
    const data = await Orders.findAll({
      where: { userId: parseInt(userClientId) },
      include: [
        {
          model: OrderItems,
          attributes: [
            "id",
            "orderId",
            "productId",
            "variantId",
            "quantity",
            "price",
            "total",
          ],
          include: [
            {
              model: Products,
              as: "product", // Include thông tin product
              attributes: ["id", "name", "gift", "imageUrlThumb"], // chọn các trường muốn
            },
          ],
        },
      ],
    });
    console.log("data", data);
    if (data && data.length > 0) {
      // order = {
      //   ...data.toJSON(),
      // } as CustomOrderTypeFull;
      return NextResponse.json({
        error: 0,
        message: "Lấy đơn hàng thành công",
        // order: {
        //   ...data.toJSON(),
        // } as CustomOrderTypeFull,
        order: [...data.map((item) => item.toJSON() as CustomOrderTypeFull)],
      });
    } else {
      return NextResponse.json(
        { error: 0, message: "Chưa có đơn hàng", order: null },
        { status: 200 }
      );
    }

    // return order;
  } catch (err) {
    console.error("Get order error:", err);
    return NextResponse.json(
      { error: 1, message: "Có lỗi xảy ra khi lấy đơn hàng" },
      { status: 500 }
    );
  }
}
