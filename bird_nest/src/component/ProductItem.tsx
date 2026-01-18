import { CartItems } from "@/types";
import React, { useEffect, useRef, useState } from "react";

function ProductItem({
  item,
  fetchDelete,
  fetchQuantity,
}: {
  item: CartItems;
  fetchDelete: (
    productId: number,
    varientId: number,
    cartId: number
  ) => Promise<void>;
  fetchQuantity: (
    quantity: number,
    productId: number,
    varientId: number,
    cartId: number
  ) => Promise<void>;
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [mounted, setMounted] = useState(false);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  // let mounted = false;
  useEffect(() => {
    //debounce

    // mounted = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  useEffect(() => {
    //debounce
    if (!mounted) return;
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      fetchQuantity(quantity, item.productId, item.varientId, item.cartId);
    }, 3000);
    return () => {
      //debounce
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [quantity]);

  console.log("item", item);
  const calPrice = () => {
    // if (item.varientId) {
    //   if (item.ProductVariant && item.ProductVariant?.discountPrice) {
    //     return (
    //       item.ProductVariant?.price - item.ProductVariant?.discountPrice
    //     );
    //   } else {
    //     return item.ProductVariant?.price;
    //   }
    // } else if (!item.varientId) {
    //   if (item.Product && item.Product?.discountPrice) {
    //     return item.Product?.price - item.Product?.discountPrice;
    //   } else {
    //     return item.Product?.price;
    //   }
    // } else {
    //   return 0;
    // }
    console.log("item.ProductVariant.price", item.Product.price);
    if (item.varientId) {
      if (
        item.ProductVariant &&
        typeof item.ProductVariant.discountPrice === "number" &&
        typeof item.ProductVariant.price === "number"
      ) {
        return item.ProductVariant.price - item.ProductVariant.discountPrice;
      } else if (
        item.ProductVariant &&
        typeof item.ProductVariant.price === "number"
      ) {
        return item.ProductVariant.price;
      } else {
        return 0;
      }
    } else {
      if (
        item.Product &&
        typeof item.Product.discountPrice === "number" &&
        typeof item.Product.price === "number"
      ) {
        return item.Product.price - item.Product.discountPrice;
      } else if (item.Product && typeof item.Product.price === "number") {
        return item.Product.price;
      } else {
        return 0;
      }
    }
  };
  const handleDelete = (
    productId: number,
    varientId: number,
    cartId: number
  ) => {
    console.log("productId", productId, cartId, varientId);
    fetchDelete(productId, varientId, cartId);
  };

  const handleChangeQuantity = ({
    val,
    productId,
    varientId,
    cartId,
  }: {
    val: string;
    productId: number;
    varientId: number;
    cartId: number;
  }) => {
    const quantity = parseInt(val, 10);
    if (!isNaN(quantity) && quantity > 0) {
      // fetchQuantity();
      setQuantity(quantity);
      console.log(
        "handleChangeQuantity",
        quantity,
        productId,
        varientId,
        cartId
      );
    }
  };

  const handleDecrease = ({
    val,
    productId,
    varientId,
    cartId,
  }: {
    val: number;
    productId: number;
    varientId: number;
    cartId: number;
  }) => {
    // fetchval();
    setQuantity((prev) => Math.max(prev - 1, 1));

    console.log("handleDecrease", quantity, productId, varientId, cartId);
  };
  const handleIncrease = ({
    val,
    productId,
    varientId,
    cartId,
  }: {
    val: number;
    productId: number;
    varientId: number;
    cartId: number;
  }) => {
    // fetchQuantity();
    setQuantity((prev) => prev + 1);

    console.log("handleIncrease", quantity, productId, varientId, cartId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center p-4">
      <div className="col-span-1 md:col-span-3 flex items-start gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg h-20 w-20 flex-shrink-0"
          data-alt="Yến Tinh Chế Thượng Hạng"
          style={{
            backgroundImage: `url(${item.Product?.imageUrlThumb})`,
          }}
        ></div>
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-[rgb(24,22,17)] dark:text-gray-200 text-base font-medium leading-normal">
            {item.Product?.name}
          </p>
          <p className="text-[#897f61] dark:text-gray-400 text-sm font-normal leading-normal">
            Loại: {`${item.ProductVariant?.variantName}`}
          </p>
          <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm mt-1 flex items-center gap-1 md:hidden">
            <span className="material-symbols-outlined text-sm">delete</span>{" "}
            Xóa
          </button>
        </div>
      </div>
      <div className="text-left md:text-center text-[#897f61] dark:text-gray-400">
        <span className="md:hidden font-medium text-[#181611] dark:text-gray-200">
          Đơn giá:{" "}
        </span>
        {calPrice().toLocaleString("vi-VN")}
      </div>
      <div className="flex justify-start md:justify-center">
        <div className="flex items-center gap-2 text-[#181611] dark:text-gray-200">
          <button
            onClick={() =>
              handleDecrease({
                val: item.quantity,
                cartId: item.cartId,
                productId: item.productId,
                varientId: item.varientId,
              })
            }
            className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f3f0] dark:bg-gray-700 cursor-pointer"
          >
            -
          </button>
          <input
            className="text-base font-medium leading-normal w-6 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none"
            type="number"
            value={quantity}
            onChange={(e) =>
              handleChangeQuantity({
                val: e.target.value,
                cartId: item.cartId,
                productId: item.productId,
                varientId: item.varientId,
              })
            }
          />
          <button
            onClick={() =>
              handleIncrease({
                val: item.quantity,
                cartId: item.cartId,
                productId: item.productId,
                varientId: item.varientId,
              })
            }
            className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f3f0] dark:bg-gray-700 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center md:justify-end">
        <p className="md:hidden font-medium text-[#181611] dark:text-gray-200">
          Thành tiền:
        </p>
        <p className="text-right text-[#181611] dark:text-gray-200 font-bold">
          {(calPrice() * item.quantity).toLocaleString("vi-VN")}
        </p>
        {/* <button className="hidden md:flex text-gray-400 hover:text-red-500 dark:hover:text-red-400 ml-4">
          <span className="material-symbols-outlined text-xl">delete</span>
        </button> */}
      </div>
      <div className="flex justify-between items-center md:justify-end">
        <p className="md:hidden font-medium text-[#181611] dark:text-gray-200">
          Xóa
        </p>
        {/* <p className="text-right text-[#181611] dark:text-gray-200 font-bold">
          {(calPrice() * item.quantity).toLocaleString("vi-VN")}
        </p> */}
        <button
          className="flex text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-4"
          onClick={() =>
            handleDelete(item.productId, item.varientId, item.cartId)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
