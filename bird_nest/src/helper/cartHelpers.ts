import { Cart } from "@/models/Cart.model";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

/**
 * Tạo UUID mới cho cartID
 * @returns UUID string (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
 */
export function generateCartId(): string {
  // Sử dụng crypto.randomUUID() (built-in Node.js 14.17.0+)
  // Next.js 16+ sử dụng Node.js 18+, nên crypto.randomUUID() luôn có sẵn
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch (error) {
    console.warn("crypto.randomUUID not available, using fallback");
  }

  // Fallback: tạo UUID v4 format thủ công
  // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  const chars = "0123456789abcdef";
  const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

  return template.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return chars[v];
  });
}

/**
 * Lấy cartID từ cookie
 * @param cookieStore - Cookie store từ next/headers
 * @returns cartID nếu có, null nếu không có
 */
export async function getCartIdFromCookie(
  cookieStore: ReadonlyRequestCookies
): Promise<string | null> {
  console.log("cart_id cookie", cookieStore.get("cart_id"));
  const cartIdCookie = cookieStore.get("cart_id");
  return cartIdCookie?.value || null;
}

/**
 * Kiểm tra user đã đăng nhập hay chưa
 * @param cookieStore - Cookie store từ next/headers
 * @returns userId nếu đã login, null nếu chưa login
 */
export async function checkUserAuthentication(
  cookieStore: ReadonlyRequestCookies
): Promise<number | null> {
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const jwt = await import("jsonwebtoken");
    const JWT_SECRET = process.env.JWT_SECRET || "yentinhhoa";
    const payload = jwt.verify(accessToken, JWT_SECRET) as { id?: number };
    console.log("payload checkUserAuthentication", payload);
    return payload.id || null;
  } catch (error) {
    console.log("JWT verify error:", error);
    return null;
  }
}

/**
 * Tìm hoặc tạo Cart cho guest user (dựa trên cartId từ cookie - UUID)
 * @param cartId - CartID từ cookie (UUID string)
 * @returns Cart instance
 */
export async function getOrCreateGuestCart(cartId: string): Promise<Cart> {
  // Tìm Cart có guestCartId tương ứng
  let cart = await Cart.findOne({
    where: {
      guestCartId: cartId,
      userId: null,
    },
  });

  // Nếu không tìm thấy, tạo Cart mới với guestCartId
  if (!cart) {
    cart = await Cart.create({
      userId: null,
      guestCartId: cartId,
    });
  }

  return cart;
}

/**
 * Tìm hoặc tạo Cart cho logged-in user
 * @param userId - User ID
 * @returns Cart instance
 */
export async function getOrCreateUserCart(userId: number): Promise<Cart> {
  const [cart, created] = await Cart.findOrCreate({
    where: {
      userId: userId,
    },
    defaults: {
      userId: userId,
      guestCartId: null,
    },
  });

  return cart;
}
