import Order from "@/component/Checkout/Order";
import React from "react";
import { CustomOrderTypeFull } from "@/types";
import sequelize from "@/lib/sequelize";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwtVerify from "@/helper/jwtVerify";
import refreshAcessToken from "@/helper/refreshAccessToken";
import { Orders } from "@/models/Orders.model";
import { OrderItems } from "@/models/OrderItems.model";
import { Products } from "@/models/Products.model";
import joseVerify from "@/helper/joseVerify";

interface PageProps {
  params: {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

async function page({ params }: { params: Promise<{ id: string }> }) {
  let order: CustomOrderTypeFull = {
    id: 0,
    userId: 0,
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
    totalPrice: 0,
    totalQuantity: 0,
    OrderItems: [],
    status: "",
    createdAt: "",
    updatedAt: "",
  };
  //   const { id } = params;
  const fetchOrder = async () => {
    try {
      await sequelize.authenticate();
      const id = (await params).id;
      if (!id) {
        redirect("/login");
      }
      const cookieStore = await cookies();

      const accessToken = cookieStore.get("access_token")?.value;

      //const userId = await jwtVerify(accessToken);
      const userId = await joseVerify(accessToken);
      console.log("userId", userId);
      if (!accessToken || !userId) {
        redirect("/login");
      }
      //     console.log("???");

      //     const newAccessToken = await refreshAcessToken(refreshToken as string);
      //     if (!newAccessToken) {
      //       redirect("/login");
      //     }
      //     console.log("newAccessToken nè", newAccessToken);

      //     cookieStore.set("access_token", newAccessToken, {
      //       httpOnly: true,
      //       secure: true,
      //       sameSite: "lax",
      //       maxAge: 2 * 60,
      //     });
      //   }
      //   const orderData = await Orders.findOne({
      //     where: { id: parseInt(id) },
      //   });

      //   if (!orderData) {
      //     return <div>Không có kết quả</div>;
      //   }
      //   console.log("orderData", orderData);

      //   // Kiểm tra order thuộc về user đã đăng nhập
      //   if (orderData.userId !== userId) {
      //     return <div>Không có kết quả</div>;
      //   }

      // Lấy order items
      //   const orderItems = await OrderItems.findAll({
      //     where: { orderId: orderData.id },
      //   });

      //   console.log("orderItems", orderItems);
      const data = await Orders.findOne({
        where: { id: parseInt(id) },
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
      if (data && data.id) {
        order = {
          ...data.toJSON(),
        } as CustomOrderTypeFull;
      } else {
        return false;
      }

      return order;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const a = await fetchOrder();
  return <Order order={order} />;
}

export default page;
