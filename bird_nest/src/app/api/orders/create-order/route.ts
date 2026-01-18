import { NextRequest, NextResponse } from "next/server";
import { Orders } from "@/models/Orders.model";
import { OrderItems } from "@/models/OrderItems.model";
import sequelize from "@/lib/sequelize";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { CustomOrderTypeFull } from "@/types";
import { Products } from "@/models/Products.model";
import gmailHtmlTemplate from "@/helper/gmailHtmlTemplate";
import { cookies } from "next/headers";
import jwtVerify from "@/helper/jwtVerify";
import refreshAcessToken from "@/helper/refreshAccessToken";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
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
  try {
    await sequelize.authenticate();

    const body = await req.json();

    const {
      name,
      userId,
      email,
      phone,
      address,
      paymentMethod,
      totalPrice,
      totalQuantity,
      items,
    } = body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !userId ||
      !email ||
      !phone ||
      !address ||
      !paymentMethod ||
      !totalPrice ||
      !totalQuantity ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: 1, message: "Thiếu thông tin đơn hàng" },
        { status: 400 }
      );
    }
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const user_Id = await jwtVerify(accessToken);

    if (!user_Id) {
      return NextResponse.json(
        { error: 1, message: "accessToken expired!" },
        { status: 401 }
      );
    }
    // (Tuỳ chọn) Tìm user theo email, nếu hệ thống support guest order có thể bỏ qua đoạn này
    // let user: Users | null = null;
    // if (email) {
    //   user = await Users.findOne({ where: { email } });
    // }

    // Tạo order mới

    const createdOrder = await Orders.create({
      userId: userId,
      email,
      phone,
      address,
      paymentMethod,
      totalPrice,
      totalQuantity,
      status: "pending", // default status
    });

    if (createdOrder) {
      order = {
        ...createdOrder.toJSON(),
        items: [],
      } as CustomOrderTypeFull;
    }

    // Tạo các order item
    for (const item of items) {
      const itemCreate = await OrderItems.create({
        orderId: createdOrder.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      });
      const data = await OrderItems.findOne({
        where: { id: itemCreate.id },
        include: [
          {
            model: Products,
            as: "product",
            attributes: ["id", "name", "gift", "imageUrlThumb"],
          },
        ],
      });
      if (!order.OrderItems) {
        order.OrderItems = [];
      }
      data && order.OrderItems.push(data.toJSON());
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailData = await transporter.sendMail({
      from: `"Yến Sào Nhà Thảo" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Xác nhận đơn hàng",
      html: gmailHtmlTemplate({ order, name }),
    });
    return NextResponse.json({
      error: 0,
      message: "Tạo đơn hàng thành công",
      orderId: createdOrder.id,
    });
  } catch (err) {
    console.error("Order create error:", err);
    return NextResponse.json(
      { error: 1, message: "Có lỗi xảy ra khi tạo đơn hàng" },
      { status: 500 }
    );
  }
}
