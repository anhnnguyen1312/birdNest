"use client";
import ProductItem from "@/component/ProductItem";
import { CartItems } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext"; // Có thể thêm lại khi cần refreshCart() cho update/delete items
import Link from "next/link";
import { useRouter } from "next/navigation";

// Type cho cart items từ API response
type CartItemResponse = CartItems;

function Cart() {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  // refreshCart có thể được thêm lại khi cần update/delete items trên cart page
  const { refreshCart } = useCart();
  const router = useRouter();

  // Tính tổng tiền
  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => {
      const price = item.ProductVariant?.discountPrice
        ? item.ProductVariant.price - item.ProductVariant.discountPrice
        : item.ProductVariant?.price
        ? item.ProductVariant?.price
        : item.Product?.discountPrice
        ? item.Product.price - item.Product.discountPrice
        : item.Product?.price || 0;
      console.log("price", price);
      console.log(
        "item.ProductVariant?.discountPrice",
        item.ProductVariant?.discountPrice
      );
      console.log("item.ProductVariant?.price", item.ProductVariant?.price);

      return total + price * item.quantity;
    }, 0);
  };
  const fetchQuantity = async (
    quantity: number,
    productId: number,
    varientId: number,
    cartId: number
  ) => {
    try {
      // setIsLoading(true);
      setIsLoadingCart(true);
      const response = await fetch("/api/cart/updateQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          varientId,
          cartId,
          quantity,
        }),
      });
      const data = await response.json();
      console.log("data update qusntity", data);
      if (data.error === 0 && data.cartItems.length > 0) {
        // setCartItems((prev) => [...prev,data.cartItemUpdated]);
        setCartItems(data.cartItems);
        refreshCart();
        // Không cần refreshCart() ở đây vì CartContext đã fetch cartCount khi mount
        // Chỉ cần gọi refreshCart() khi có thay đổi (update quantity, delete item)
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoadingCart(false);
    }
  };
  const fetchDelete = async (
    productId: number,
    varientId: number,
    cartId: number
  ) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/cart/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          varientId,
          cartId,
        }),
      });
      const data = await response.json();
      console.log("data", data);
      if (data.error === 0) {
        setCartItems(data.remainingCart || []);
        refreshCart();
        // Không cần refreshCart() ở đây vì CartContext đã fetch cartCount khi mount
        // Chỉ cần gọi refreshCart() khi có thay đổi (update quantity, delete item)
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        setIsLoadingCart(true);

        const response = await fetch("/api/cart");
        const data = await response.json();
        console.log(data, "data cart");
        if (data.error === 0) {
          setCartItems(data.cartItems || []);
          // Không cần refreshCart() ở đây vì CartContext đã fetch cartCount khi mount
          // Chỉ cần gọi refreshCart() khi có thay đổi (update quantity, delete item)
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      } finally {
        setIsLoading(false);
        setIsLoadingCart(false);
      }
    };
    fetchCart();
  }, []);

  const total = calculateTotal();

  const handleCheckout = () => {
    const postCheckout = async () => {
      try {
        setIsLoadingCart(true);

        const res = await fetch("api/checkout-sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "cart",
          }),
        });
        const data = await res.json();
        if (data.error === 0 && data.checkoutSession) {
          console.log("data.checkoutSession id", data.checkoutSession.id);
          // router.push(`/checkout/${data.checkoutSession.id}`);
          router.push(`/checkout/${data.checkoutSession.id}`);
        }
        console.log("data post checkoutid", data);
        setIsLoadingCart(false);
      } catch (error) {
        setIsLoadingCart(false);

        console.log(error);
      }
    };
    postCheckout();
  };
  console.log("total outside", total);
  console.log(" cartItems", cartItems);

  return (
    <div className="bg-background-light-secondary dark:bg-background-dark font-display text-[#181611] dark:text-gray-200">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <main className="layout-container flex h-full grow flex-col">
          <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <a
                    className="text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
                    href="#"
                  >
                    Trang chủ
                  </a>
                  <span className="text-[#897f61] dark:text-gray-400 text-sm font-medium leading-normal">
                    /
                  </span>
                  <span className="text-[#181611] dark:text-gray-200 text-sm font-medium leading-normal">
                    Giỏ hàng
                  </span>
                </div>
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex min-w-72 flex-col gap-2">
                    <h1 className="text-[#181611] dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em]">
                      Giỏ Hàng Của Bạn
                    </h1>
                    <p className="text-[#897f61] dark:text-gray-400 text-base font-normal leading-normal">
                      Vui lòng kiểm tra lại sản phẩm trước khi tiến hành thanh
                      toán.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="flex gap-2">
                    <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm">
                      <div className="hidden md:grid grid-cols-7 gap-4 p-4 border-b border-gray-200 dark:border-gray-800 text-xs font-bold uppercase text-[#897f61] dark:text-gray-400">
                        <div className="col-span-3">Sản phẩm</div>
                        <div className="text-center">Đơn giá</div>
                        <div className="text-center">Số lượng</div>
                        <div className="text-right">Thành tiền</div>
                        <div className="text-right">Xóa</div>
                      </div>
                      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
                        {isLoading ? (
                          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            Đang tải...
                          </div>
                        ) : cartItems && cartItems.length > 0 ? (
                          cartItems.map((item) => (
                            <ProductItem
                              key={item.id}
                              fetchDelete={fetchDelete}
                              fetchQuantity={fetchQuantity}
                              item={item}
                            />
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            <p className="mb-4">Giỏ hàng của bạn đang trống</p>
                            <Link
                              href="/products"
                              className="text-primary hover:underline font-medium"
                            >
                              Tiếp tục mua sắm
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Link
                    className="flex items-center gap-2 text-[#181611] dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium w-fit"
                    href="/products"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Tiếp tục mua sắm
                  </Link>
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6 flex flex-col gap-4 sticky top-24">
                    <h3 className="text-xl font-bold text-[#181611] dark:text-gray-100">
                      Tóm Tắt Đơn Hàng
                    </h3>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between text-[#897f61] dark:text-gray-400">
                        <span>Tạm tính</span>
                        <span className="text-[#181611] dark:text-gray-200">
                          {total.toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                      <div className="flex justify-between text-[#897f61] dark:text-gray-400">
                        <span>Phí vận chuyển</span>
                        <span className="text-[#181611] dark:text-gray-200">
                          Sẽ được tính sau
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-medium text-[#181611] dark:text-gray-200"
                        htmlFor="promo-code"
                      >
                        Mã khuyến mãi
                      </label>
                      <div className="flex gap-2">
                        <input
                          className="flex-grow w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-background-dark focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
                          id="promo-code"
                          placeholder="Nhập mã khuyến mãi"
                          type="text"
                        />
                        <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-[#181611] dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold text-sm">
                          Áp dụng
                        </button>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[#181611] dark:text-gray-200">
                        Tổng cộng
                      </span>
                      <span className="text-2xl font-black text-primary">
                        {total.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full text-center py-3 rounded-lg bg-primary hover:bg-primary/90 text-white dark:text-background-dark font-bold text-base transition-colors duration-200"
                    >
                      {isLoadingCart ? (
                        <div
                          role="status"
                          className="flex items-center justify-center"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Tiến hành Thanh toán"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Cart;
function refreshCart() {
  throw new Error("Function not implemented.");
}
