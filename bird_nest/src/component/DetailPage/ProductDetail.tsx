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
import { StarIcon } from "@heroicons/react/24/solid";
import { Product } from "@/types";
function ProductDetail({ product }: { product: Product }) {
  // ===== State Management =====
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    // TODO: Replace with actual cart context/mutation
    alert(
      `Đã thêm "${product?.name}" (${weights[selectedWeightIndex].label}, x${quantity}) vào giỏ hàng.`
    );
  };

  const handleBuyNow = () => {
    // TODO: Replace with navigation/payment logic
    alert(
      `Mua ngay "${product?.name}" (${weights[selectedWeightIndex].label}, x${quantity}).`
    );
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
          Quà tặng:{" "}
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
          Mua ngay
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
