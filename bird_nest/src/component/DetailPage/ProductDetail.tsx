"use client";
import React, { useState } from "react";
import clsx from "clsx";
import NotFoundPage from "@/component/NotFoundPage";
import {
  CheckBadgeIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import { StarIcon } from "@heroicons/react/24/solid";
import { Product, ProductVariant } from "@/types";
function ProductDetail({ product }: { product: Product }) {
  // ===== State Management =====
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoadingBuy, setIsLoadinBuy] = useState(false);

  const router = useRouter();

  // Mocked weights for demonstration; in production, consider product.variants or similar
  const weights: { label: string; value: number; discount: number }[] =
    product.ProductVariants?.map((variant) => ({
      label: variant.variantName,
      value: variant.price,
      discount: variant.discountPrice ?? 0,
    })) ?? [];
  console.log(weights, "weights");
  // Calculate base price, discount, per variant (if present)
  const originalPrice = weights[selectedWeightIndex]?.value
    ? weights[selectedWeightIndex].value
    : product.price;
  const finalPrice = weights[selectedWeightIndex]?.value
    ? weights[selectedWeightIndex].value -
      (weights[selectedWeightIndex].discount ?? 0)
    : 0;
  const finalPriceNoVariant = product.price - product.discountPrice;
  // const originalPrice = product?.price * weightPriceFactor;

  // ===== Handlers =====
  const handleWeightChange = (idx: number) => setSelectedWeightIndex(idx);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) setQuantity(val);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrease = () => setQuantity(quantity + 1);

  const handleAddToCart = async () => {
    try {
      // Lấy productId và varientId từ product
      const productId = product.id;
      const selectedVariant = product.ProductVariants?.[selectedWeightIndex];
      // ProductVariant từ API có id, nhưng type definition chưa có
      // Sử dụng type assertion tạm thời
      const varientId = (selectedVariant as ProductVariant & { id: number })
        ?.id;

      if (!productId || quantity <= 0) {
        alert("Vui lòng chọn loại sản phẩm");
        return;
      }

      if (
        product.ProductVariants &&
        product.ProductVariants.length > 0 &&
        !varientId
      ) {
        alert("Vui lòng chọn phân loại");
        return;
      }
      // Gọi API thêm vào giỏ hàng
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          varientId,
          quantity,
        }),
      });

      const data = await response.json();

      if (data.error === 0) {
        // Dispatch custom event để Header có thể refresh
        window.dispatchEvent(new CustomEvent("cartUpdated"));
        alert(
          `Đã thêm "${product?.name}" (${
            weights[selectedWeightIndex]?.label ?? ""
          } x${quantity}) vào giỏ hàng.`
        );
      } else {
        alert(data.message || "Có lỗi xảy ra khi thêm vào giỏ hàng");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  const handleBuyNow = async () => {
    try {
      setIsLoadinBuy(true);
      const selectedVariant = product.ProductVariants?.[selectedWeightIndex];
      const varientId = (selectedVariant as ProductVariant & { id: number })
        ?.id;
      const res = await fetch("/api/checkout-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "buy_now",
          productId: product.id,
          quantity: Number(quantity),
          variantId: varientId || null,
        }),
      });
      console.log("res", res);

      if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        if (data.error === 0 && data.checkoutSession) {
          console.log("data.checkoutSession id", data.checkoutSession.id);
          // router.push(`/checkout/${data.checkoutSession.id}`);
          router.push(`/checkout/${data.checkoutSession.id}`);
        }
      }
      setIsLoadinBuy(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (!product) return <NotFoundPage />;
  return (
    <div className="flex flex-col gap-6">
      {/* <!-- PageHeading and Rating --> */}
      <div className="flex flex-col gap-3">
        <p className="text-[#221d10] dark:text-[#f8f7f6] text-3xl md:text-4xl font-black tracking-tighter">
          {product?.name}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5 text-primary">
            <StarIcon className="w-5 h-5 text-primary " />
            <StarIcon className="w-5 h-5 text-primary " />
            <StarIcon className="w-5 h-5 text-primary " />
            <StarIcon className="w-5 h-5 text-primary " />
            <StarIcon className="w-5 h-5 text-primary " />

            {/* <span className="material-symbols-outlined text-base">
              star_half
            </span> */}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">
            (125 đánh giá)
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed">
          {product?.description}
        </p>
        <span className="text-red-600 dark:text-gray-300 text-base font-normal leading-relaxed">
          {product?.gift && "Quà tặng kèm:"}
        </span>
        <span className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed">
          {product?.gift}
        </span>
      </div>
      {/* <!-- Price --> */}

      <p className="text-4xl font-bold text-primary">
        {finalPrice ? (
          finalPrice === originalPrice ? (
            `${finalPrice.toLocaleString("vi-VN")}₫`
          ) : (
            <>
              {finalPrice.toLocaleString("vi-VN")}₫
              <span className="text-2xl text-gray-400 line-through font-normal ml-2">
                {originalPrice.toLocaleString("vi-VN")}₫
              </span>
            </>
          )
        ) : finalPriceNoVariant === originalPrice ? (
          `${finalPriceNoVariant.toLocaleString("vi-VN")}₫`
        ) : (
          <>
            {finalPriceNoVariant.toLocaleString("vi-VN")}₫
            <span className="text-2xl text-gray-400 line-through font-normal ml-2">
              {originalPrice.toLocaleString("vi-VN")}₫
            </span>
          </>
        )}
      </p>
      {/* <!-- Purchase Options --> */}
      <div className="flex flex-col gap-4 border-y border-primary/20 dark:border-primary/10 py-6">
        {/* <!-- Variants --> */}
        <div>
          <p className="text-sm font-bold mb-2">Trọng lượng:</p>
          <div className="flex gap-3">
            {weights.map((weight, idx) => (
              <button
                key={weight.label}
                type="button"
                className={clsx(
                  "px-4 py-2 rounded-lg border font-semibold text-sm transition-colors",
                  selectedWeightIndex === idx
                    ? "bg-primary/20 text-[#221d10] dark:text-[#f8f7f6] border-primary"
                    : "bg-transparent border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary hover:bg-primary/10"
                )}
                onClick={() => handleWeightChange(idx)}
              >
                {weight.label}
              </button>
            ))}
          </div>
        </div>
        {/* <!-- Quantity --> */}
        <div>
          <p className="text-sm font-bold mb-2">Số lượng:</p>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg max-w-[120px]">
            <button
              type="button"
              className="h-10 w-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
              onClick={handleDecrease}
            >
              -
            </button>
            <input
              className="w-10 text-center bg-transparent border-none p-0 focus:ring-0"
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              type="button"
              className="h-10 w-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
      </div>
      {/* <!-- CTA Buttons --> */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          className="w-full flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-[#221d10] dark:bg-[#f8f7f6] text-white dark:text-[#221d10] font-bold text-base hover:opacity-90 transition-opacity"
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon className="w-5 h-5" />
          Thêm vào giỏ hàng
        </button>
        <button
          type="button"
          className="w-full flex-1 h-12 rounded-lg bg-primary text-[#221d10] font-bold text-base hover:opacity-90 transition-opacity"
          onClick={handleBuyNow}
        >
          {isLoadingBuy ? (
            <div role="status" className="flex items-center justify-center">
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
            "Mua Ngay"
          )}
        </button>
      </div>
      {/* <!-- Trust Signals --> */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-4 text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-3">
          <TruckIcon className="w-5 h-5 text-primary" />
          <span>Giao hàng miễn phí</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckBadgeIcon className="w-5 h-5 text-primary" />
          <span>Cam kết yến thật 100%</span>
        </div>
        <div className="flex items-center gap-3">
          <ClipboardDocumentCheckIcon className="w-5 h-5 text-primary" />
          <span>Chính sách đổi trả uy tín</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheckIcon className="w-5 h-5 text-primary" />
          <span>Chứng nhận an toàn VSTP</span>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
