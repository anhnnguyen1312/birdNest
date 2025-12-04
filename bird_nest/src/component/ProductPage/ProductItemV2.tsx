import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Product } from "@/types/index";

/**
 * CÁCH 2: Spread product + thêm props
 * Interface extends Product để có thể spread tất cả properties của Product
 * và thêm các props tùy chọn khác
 */
interface ProductItemV2Props extends Product {
  // Các props bổ sung
  additionalProp?: string;
  className?: string;
  showRating?: boolean;
  onAddToCart?: (product: Product) => void;
}

// Destructure trực tiếp các properties của Product
function ProductItemV2({
  id,
  name,
  price,
  imageUrlThumb,
  discountPrice,
  additionalProp,
  className,
  showRating = true,
  onAddToCart,
  ...restProductProps // Các props còn lại của Product
}: ProductItemV2Props) {
  // Tạo lại product object nếu cần
  const product: Product = {
    id,
    name,
    price,
    imageUrlThumb,
    discountPrice,
    ...restProductProps,
  } as Product;

  const handleClick = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className={`flex flex-col gap-3 group ${className || ""}`}>
      {additionalProp && (
        <span className="text-xs text-primary">{additionalProp}</span>
      )}
      <div className="relative w-full overflow-hidden aspect-square rounded-xl bg-[#f4f3f0] dark:bg-[#2a2416]">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-110"
          data-alt={name}
          style={{
            backgroundImage: `url(${imageUrlThumb})`,
          }}
        ></div>
      </div>
      <div>
        <h4 className="text-base font-semibold leading-tight">{name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm font-medium text-primary">
            {price?.toLocaleString("vi-VN")}₫
          </p>
          {discountPrice && discountPrice < price && (
            <p className="text-xs line-through text-gray-400">
              {discountPrice.toLocaleString("vi-VN")}₫
            </p>
          )}
        </div>
        {showRating && (
          <div className="flex items-center gap-1 mt-1 text-sm text-[#897f61] dark:text-[#a19b85]">
            <StarIcon className="w-6 h-6 text-primary" />
            <span>4.9</span>
          </div>
        )}
        {onAddToCart && (
          <button
            onClick={handleClick}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductItemV2;




