import { NextRequest, NextResponse } from "next/server";
import { Cart } from "@/models/Cart.model";
import sequelize from "@/lib/sequelize";
import { cookies } from "next/headers";
import { CartItems } from "@/models/CartItems.model";
import { Products } from "@/models/Products.model";
import { ProductVariant } from "@/models/ProductVarient.model";
import {
  checkUserAuthentication,
  getCartIdFromCookie,
  generateCartId,
  getOrCreateGuestCart,
  getOrCreateUserCart,
} from "@/helper/cartHelpers";

/**
 * POST /api/cart
 * Thêm sản phẩm vào giỏ hàng
 * Hỗ trợ cả user đã đăng nhập và guest (chưa đăng nhập)
 */
export async function POST(req: NextRequest) {
  try {
    // Kết nối database
    await sequelize.authenticate();

    // Lấy dữ liệu từ request body
    const body = await req.json();
    const { productId, varientId, quantity } = body;

    // Validate input
    if (!productId || !quantity || quantity <= 0) {
      return NextResponse.json(
        {
          error: 1,
          message:
            "Thiếu thông tin: productId, varientId, và quantity là bắt buộc",
        },
        { status: 400 }
      );
    }

    // Lấy cookie store
    const cookieStore = await cookies();

    // Kiểm tra user đã đăng nhập hay chưa
    const userId = await checkUserAuthentication(cookieStore);

    let cart: Cart;
    let cartId: string | null = null;
    let shouldSetCookie = false;

    if (userId) {
      // User đã đăng nhập: tìm hoặc tạo Cart theo userId
      cart = await getOrCreateUserCart(userId);
    } else {
      // User chưa đăng nhập: xử lý guest cart
      // Lấy cartID từ cookie
      cartId = await getCartIdFromCookie(cookieStore);

      // Nếu chưa có cartID trong cookie, tạo mới
      if (!cartId) {
        cartId = generateCartId();
        shouldSetCookie = true;
      }

      // Tìm hoặc tạo Cart với guestCartId
      cart = await getOrCreateGuestCart(cartId);
    }

    // Kiểm tra sản phẩm và variant có tồn tại không
    const product = await Products.findByPk(productId);
    if (!product) {
      return NextResponse.json(
        {
          error: 1,
          message: "Sản phẩm không tồn tại",
        },
        { status: 404 }
      );
    }

    // const variant = await ProductVariant.findByPk(varientId);
    // if (!variant) {
    //   return NextResponse.json(
    //     {
    //       error: 1,
    //       message: "Biến thể sản phẩm không tồn tại",
    //     },
    //     { status: 404 }
    //   );
    // }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingCartItem = await CartItems.findOne({
      where: {
        cartId: cart.id,
        productId: productId,
        varientId: varientId ?? null,
      },
    });

    let cartItem: CartItems;

    if (existingCartItem) {
      // Nếu đã có, cập nhật quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      cartItem = existingCartItem;
    } else {
      // Nếu chưa có, tạo mới
      cartItem = await CartItems.create({
        cartId: cart.id,
        productId: productId,
        varientId: varientId ?? null,
        quantity: quantity,
      });
      console.log("cartItem", cartItem);
    }

    // Tạo response
    const response = NextResponse.json(
      {
        error: 0,
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        cartItem: {
          id: cartItem.id,
          cartId: cartItem.cartId,
          productId: cartItem.productId,
          varientId: cartItem.varientId,
          quantity: cartItem.quantity,
        },
      },
      { status: 200 }
    );

    // Nếu là guest và cần set cookie, thêm cookie vào response
    if (shouldSetCookie && cartId) {
      const maxAge = 60 * 60 * 24 * 30; // 30 ngày
      response.cookies.set("cart_id", cartId, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: maxAge,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      {
        error: 1,
        message: "Lỗi máy chủ khi thêm sản phẩm vào giỏ hàng",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cart
 * Lấy danh sách sản phẩm trong giỏ hàng
 * Hỗ trợ cả user đã đăng nhập và guest (chưa đăng nhập)
 */
export async function GET() {
  try {
    // Kết nối database
    await sequelize.authenticate();

    // Lấy cookie store
    const cookieStore = await cookies();

    // Kiểm tra user đã đăng nhập hay chưa
    const userId = await checkUserAuthentication(cookieStore);

    let cart: Cart | null = null;

    if (userId) {
      // User đã đăng nhập: tìm Cart theo userId
      cart = await Cart.findOne({
        where: { userId: userId },
      });
    } else {
      // User chưa đăng nhập: tìm Cart theo guestCartId từ cookie
      const cartId = await getCartIdFromCookie(cookieStore);

      if (cartId) {
        cart = await Cart.findOne({
          where: {
            guestCartId: cartId,
            userId: null,
          },
        });
      }
    }

    // Nếu không tìm thấy cart, trả về giỏ hàng rỗng
    if (!cart) {
      return NextResponse.json({
        message: "Get cart success",
        cartItems: [],
        error: 0,
      });
    }

    // Lấy danh sách cart items
    const cartItems = await CartItems.findAll({
      where: { cartId: cart.id },
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

    return NextResponse.json({
      message: "Get cart success",
      cartItems: cartItems,
      error: 0,
    });
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: 1,
      },
      { status: 500 }
    );
  }
}
