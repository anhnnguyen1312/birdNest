import { NextRequest, NextResponse } from "next/server";
import { Cart } from "@/models/Cart.model";
import { CartItems } from "@/models/CartItems.model";
import { Products } from "@/models/Products.model";
import { ProductVariant } from "@/models/ProductVarient.model";

import {
  CheckoutSessions,
  CheckoutSource,
  CheckoutStatus,
} from "@/models/CheckoutSessions.model";
import { CheckoutItems } from "@/models/CheckoutItems.model";
import sequelize from "@/lib/sequelize";
import { cookies } from "next/headers";
import { checkUserAuthentication } from "@/helper/cartHelpers";
import { corsHeaders } from "@/helper/corsHandle";

interface CartItemWithAssociations extends CartItems {
  Product?: Products;
  ProductVariant?: ProductVariant;
}

interface CheckoutItemWithAssociations extends CheckoutItems {
  Product?: Products;
  ProductVariant?: ProductVariant;
}
// interface ProductWithAssociations extends Products{
//   ProductVariant?: ProductVariant;

// }
interface ProductWithAssociations extends ProductVariant {
  Products?: Products;
}
/**
 * POST /api/checkout
 * Tạo checkout session từ cart
 * Body: { source: "cart" }
 */
export async function POST(req: NextRequest) {
  try {
    console.log("POST");

    await sequelize.authenticate();

    const body = await req.json();
    const { source, productId, quantity, variantId } = body;
    // Validate input
    if (!source || (source !== "cart" && source !== "buy_now")) {
      return NextResponse.json(
        {
          error: 1,
          message: "data unavailable",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }
    if (source === "buy_now") {
      if (!productId || !quantity) {
        return NextResponse.json(
          {
            error: 1,
            message: "Thiếu ProductId và quantity",
          },
          {
            status: 400,
            headers: corsHeaders(),
          }
        );
      }
    }
    // Lấy cookie store
    const cookieStore = await cookies();

    // Kiểm tra user đã đăng nhập hay chưa
    const userId = await checkUserAuthentication(cookieStore);
    console.log("userId", userId);

    if (!userId) {
      return NextResponse.json(
        {
          error: 1,
          message: "Vui lòng đăng nhập để thanh toán",
        },
        {
          status: 401,
          headers: corsHeaders(),
        }
      );
    }

    // Tìm cart theo userId
    if (source === "cart") {
      const cart = await Cart.findOne({
        where: { userId },
      });

      if (!cart) {
        return NextResponse.json(
          {
            error: 1,
            message: "Giỏ hàng trống",
          },
          {
            status: 404,
            headers: corsHeaders(),
          }
        );
      }
      // Lấy tất cả cart items với products và variants
      const cartItems = await CartItems.findAll({
        where: { cartId: cart.id },
        include: [
          {
            model: Products,
            as: "Product",
            attributes: ["id", "name", "price", "discountPrice"],
          },
          {
            model: ProductVariant,
            as: "ProductVariant",
            attributes: ["id", "variantName", "price", "discountPrice"],
          },
        ],
      });

      if (!cartItems || cartItems.length === 0) {
        return NextResponse.json(
          {
            error: 1,
            message: "Giỏ hàng trống",
          },
          {
            status: 400,
            headers: corsHeaders(),
          }
        );
      }
      console.log("cartItems", cartItems);
      // Tính toán giá cho từng item và tổng giá
      let subtotal = 0;
      const checkoutItemsData: Array<{
        productId: number;
        variantId: number | null;
        quantity: number;
        priceSnapshot: number;
        totalprice: number;
      }> = [];

      for (const item of cartItems as CartItemWithAssociations[]) {
        let itemPrice = 0;
        let variantId: number | null = null;

        // Nếu có variant, dùng giá variant
        if (item.varientId && item.ProductVariant) {
          variantId = item.varientId;
          const variant = item.ProductVariant;
          // Giá sau khi giảm = price - discountPrice (nếu có)
          itemPrice =
            variant.discountPrice && variant.discountPrice > 0
              ? variant.price - variant.discountPrice
              : variant.price;
        } else if (item.Product) {
          // Nếu không có variant, dùng giá product
          const product = item.Product;
          itemPrice =
            product.discountPrice && product.discountPrice > 0
              ? product.price - product.discountPrice
              : product.price;
        }

        const itemTotal = itemPrice * item.quantity;
        subtotal += itemTotal;

        checkoutItemsData.push({
          productId: item.productId,
          variantId: variantId,
          quantity: item.quantity,
          priceSnapshot: itemPrice,
          totalprice: itemTotal,
        });
      }

      // Tính shipping fee (ví dụ: miễn phí ship nếu > 500k, ngược lại 30k)
      const shippingFee = subtotal >= 2000000 ? 0 : 40000;

      // Discount (có thể tính từ coupon, hiện tại = 0)
      const discount = 0;

      // Total price
      const totalPrice = subtotal + shippingFee - discount;

      // Tạo checkout session với expiresAt = 30 phút từ bây giờ
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      const checkoutSession = await CheckoutSessions.create({
        userId,
        source: CheckoutSource.CART,
        status: CheckoutStatus.ACTIVE,
        subtotal: subtotal,
        shippingFee: shippingFee,
        discount: discount,
        totalPrice: totalPrice,
        expiresAt: expiresAt,
      });

      // Tạo checkout items
      const createdCheckoutItems = await Promise.all(
        checkoutItemsData.map((itemData) =>
          CheckoutItems.create({
            checkoutId: checkoutSession.id,
            productId: itemData.productId,
            variantId: itemData.variantId,
            quantity: itemData.quantity,
            priceSnapshot: itemData.priceSnapshot,
            totalprice: itemData.totalprice,
          })
        )
      );

      return NextResponse.json(
        {
          error: 0,
          message: "Tạo checkout session thành công!",
          checkoutSession: {
            id: checkoutSession.id,
            // userId: checkoutSession.userId,
            // source: checkoutSession.source,
            // status: checkoutSession.status,
            // subtotal: Number(checkoutSession.subtotal),
            // shippingFee: Number(checkoutSession.shippingFee),
            // discount: Number(checkoutSession.discount),
            // totalPrice: Number(checkoutSession.totalPrice),
            // expiresAt: checkoutSession.expiresAt,
            // items: createdCheckoutItems.map((item) => ({
            //   id: item.id,
            //   productId: item.productId,
            //   variantId: item.variantId,
            //   quantity: item.quantity,
            //   priceSnapshot: Number(item.priceSnapshot),
            //   totalprice: Number(item.totalprice),
            // })),
          },
        },
        {
          status: 201,
          headers: corsHeaders(),
        }
      );
    } else if (source === "buy_now") {
      /// query Product where productId
      // cal subtotal
      //query create checkout session + checkout items

      // code from here
      /// stage 1: query Product where productId
      let dataProduct: Products | ProductVariant | null;
      let subtotal = 0;
      let shippingFee = 0;
      let totalPrice = 0;
      let discount = 0;
      const calSubtotalBuyNow = (dataProduct: ProductWithAssociations) => {
        let itemPrice = 0;

        // Nếu có variant, dùng giá variant
        if (dataProduct) {
          const variant = dataProduct;
          // Giá sau khi giảm = price - discountPrice (nếu có)
          itemPrice =
            variant.discountPrice && variant.discountPrice > 0
              ? variant.price - variant.discountPrice
              : variant.price;
        } else {
          // Nếu không có variant, dùng giá product
          // const product = dataProduct.Products
          // itemPrice =
          //   product.discountPrice && product.discountPrice > 0
          //     ? product.price - product.discountPrice
          //     : product.price;
          itemPrice = 0;
        }

        subtotal = itemPrice * quantity;
        shippingFee = subtotal >= 2000000 ? 0 : 40000;
        console.log("subtotal w variant", subtotal);
        // Discount (có thể tính từ coupon, hiện tại = 0)
        discount = 0;

        // Total price
        totalPrice = subtotal + shippingFee - discount;
      };
      if (variantId) {
        dataProduct = await ProductVariant.findOne({
          where: { id: variantId, productId: productId },
          include: [{ model: Products }],
        });
        console.log("dataProduct variant", dataProduct);
        // cal
        if (dataProduct) {
          calSubtotalBuyNow(dataProduct);
        } else {
          return NextResponse.json({
            error: 1,
            message: "không có dữ liệu sản phẩm",
          });
        }
        // cal subtotal

        // return NextResponse.json({
        //   error: 0,
        //   dataProduct,
        // });
      } else {
        dataProduct = await Products.findOne({
          where: { id: productId },
        });
        console.log("dataProduct no variant", dataProduct);
        //cal
        const calSubtotalNoVariant = () => {
          let itemPrice = 0;
          if (dataProduct) {
            itemPrice = dataProduct.discountPrice
              ? dataProduct.price - dataProduct.discountPrice
              : dataProduct.price;
            subtotal = itemPrice * quantity;
            shippingFee = subtotal >= 2000000 ? 0 : 40000;
            // Discount (có thể tính từ coupon, hiện tại = 0)
            discount = 0;

            // Total price
            totalPrice = subtotal + shippingFee - discount;
          }
        };
        calSubtotalNoVariant();
        console.log("subtotal no variant", subtotal);
        //query create checkout session + checkout items
      }
      // cal subtotal
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      const checkoutSession = await CheckoutSessions.create({
        userId,
        source: CheckoutSource.BUY_NOW,
        status: CheckoutStatus.ACTIVE,
        subtotal: subtotal,
        shippingFee: shippingFee,
        discount: discount,
        totalPrice: subtotal,
        expiresAt: expiresAt,
      });

      // Tạo checkout items
      const createdCheckoutItems = await CheckoutItems.create({
        checkoutId: checkoutSession.id,
        productId: productId,
        variantId: variantId,
        quantity: quantity,
        priceSnapshot: totalPrice,
        totalprice: totalPrice,
      });

      return NextResponse.json({
        error: 0,
        message: "Tạo checkout session thành công!",
        checkoutSession: {
          id: checkoutSession.id,
        },
      });
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Lỗi khi tạo checkout session";
    return NextResponse.json(
      {
        error: 1,
        message: errorMessage,
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

/**
 * GET /api/checkout-sessions?id=<session_id>
 * Lấy thông tin của một checkout session dựa vào id
 */
export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("id");
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    console.log("accessToken ở route check session", accessToken);

    // Kiểm tra user đã đăng nhập hay chưa
    console.log("sessionId", sessionId);

    const userId = await checkUserAuthentication(cookieStore);
    console.log("userId ở route checkout-session ne", userId);

    if (!sessionId) {
      return NextResponse.json(
        {
          error: 1,
          message: "Missing checkout session ID",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // Lấy checkout session từ DB
    if (!userId) {
      return NextResponse.json(
        {
          error: 1,
          message: "Chưa đăng nhập",
        },
        {
          status: 401,
          headers: corsHeaders(),
        }
      );
    }
    console.log("chuẩn bị chạy hàm checkoutsession");
    const checkoutSession = await CheckoutSessions.findOne({
      where: { id: sessionId, userId: userId },
    });
    // Kiểm tra xem session đã hết hạn chưa (expireAt < now)
    // Kiểm tra userId của checkoutSession có đúng với userId trong cookies không

    if (checkoutSession && checkoutSession.userId !== userId) {
      return NextResponse.json(
        {
          error: 1,
          message: "Bạn không có quyền truy cập vào phiên checkout này",
        },
        {
          status: 403,
          headers: corsHeaders(),
        }
      );
    }

    if (!checkoutSession) {
      return NextResponse.json(
        {
          error: 1,
          message: "Checkout session not found",
        },
        {
          status: 404,
          headers: corsHeaders(),
        }
      );
    }

    if (checkoutSession && checkoutSession.expiresAt) {
      const expiresAtTime = new Date(checkoutSession.expiresAt).getTime();
      const now = Date.now();

      if (expiresAtTime < now) {
        return NextResponse.json(
          {
            error: 1,
            message: "Checkout session has expired",
          },
          {
            status: 410,
            headers: corsHeaders(),
          }
        );
      }
    }
    console.log("data checkoutsession", checkoutSession?.id);

    // Lấy tất cả checkout items với product và variant info
    const checkoutItems = await CheckoutItems.findAll({
      where: { checkoutId: checkoutSession.id },
      include: [
        {
          model: Products,
          as: "Product",
          attributes: ["id", "name", "price", "discountPrice", "imageUrlThumb"],
        },
        {
          model: ProductVariant,
          as: "ProductVariant",
          attributes: ["id", "variantName", "price", "discountPrice"],
        },
      ],
    });

    // Map items with populated product / variant info
    const items = (checkoutItems as CheckoutItemWithAssociations[]).map(
      (item) => ({
        id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        priceSnapshot: Number(item.priceSnapshot),
        totalprice: Number(item.totalprice),
        Product: item.Product
          ? {
              id: item.Product.id,
              name: item.Product.name,
              price: Number(item.Product.price),
              discountPrice: Number(item.Product.discountPrice),
              imageUrlThumb: item.Product.imageUrlThumb,
            }
          : null,
        ProductVariant: item.ProductVariant
          ? {
              id: item.ProductVariant.id,
              variantName: item.ProductVariant.variantName,
              price: Number(item.ProductVariant.price),
              discountPrice: Number(item.ProductVariant.discountPrice),
            }
          : null,
      })
    );

    return NextResponse.json(
      {
        error: 0,
        message: "Lấy thông tin checkout session thành công",
        checkoutSession: {
          id: checkoutSession.id,
          userId: checkoutSession.userId,
          source: checkoutSession.source,
          status: checkoutSession.status,
          subtotal: Number(checkoutSession.subtotal),
          shippingFee: Number(checkoutSession.shippingFee),
          discount: Number(checkoutSession.discount),
          totalPrice: Number(checkoutSession.totalPrice),
          expiresAt: checkoutSession.expiresAt,
          items: items,
        },
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error("Error fetching checkout session:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Lỗi khi lấy checkout session";
    return NextResponse.json(
      {
        error: 1,
        message: errorMessage,
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// API fetch function để gọi từ server component

// Handle OPTIONS for CORS
// export async function OPTIONS() {
//   return NextResponse.json({}, { headers: corsHeaders() });
// }
