import { NextRequest, NextResponse } from "next/server";
// import { Cart } from "@/models/Cart.model";
import sequelize from "@/lib/sequelize";
// import { cookies } from "next/headers";
import { CartItems } from "@/models/CartItems.model";
import { Products } from "@/models/Products.model";
import { ProductVariant } from "@/models/ProductVarient.model";
// import {
//   checkUserAuthentication,
//   getCartIdFromCookie,
//   generateCartId,
//   getOrCreateGuestCart,
//   getOrCreateUserCart,
// } from "@/helper/cartHelpers";

export async function POST(req: NextRequest) {
  try {
    // Kết nối database
    await sequelize.authenticate();

    // Lấy dữ liệu từ request body
    const body = await req.json();
    const { quantity, productId, varientId, cartId } = body;

    // Validate input
    if (!productId || !varientId || !cartId || !quantity) {
      console.log("productId", productId, varientId, cartId, quantity);
      return NextResponse.json(
        {
          error: 1,
          message: "Thiếu thông tin của sản phẩm",
        },
        { status: 400 }
      );
    }

    const cartItem = await CartItems.findOne({
      where: { cartId, productId, varientId },
    });

    if (!cartItem) {
      return NextResponse.json({ message: "Product not found in cart" });
    }

    // 2️⃣ update item
    const existingCartItem = await CartItems.findOne({
      where: {
        cartId: cartId,
        productId: productId,
        varientId: varientId,
      },
    });

    let cartItemUpdated = {};
    if (existingCartItem) {
      // Nếu đã có, cập nhật quantity
      existingCartItem.quantity = quantity;
      cartItemUpdated = await existingCartItem.save();
    }
    const allProducts = await CartItems.findAll({
      where: { cartId },
      include: [
        {
          model: Products,
          as: "Product",
          attributes: ["id", "name", "price", "imageUrlThumb", "discountPrice"],
        },
        {
          model: ProductVariant,
          as: "ProductVariant",
          attributes: ["id", "variantName", "discountPrice", "price", "stock"],
        },
      ],
    });
    console.log("cartItemUpdated", cartItemUpdated);

    // Tạo response
    const response = NextResponse.json(
      {
        error: 0,
        message: "cập nhật sản phẩm thành công",
        cartItems: allProducts,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error("Error delete to cart:", error);
    return NextResponse.json(
      {
        error: 1,
        message: "Lỗi máy chủ khi xóa sản phẩm",
      },
      { status: 500 }
    );
  }
}
