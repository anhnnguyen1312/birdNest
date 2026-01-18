import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Product } from "@/types/index";

/**
 * CÁCH 3: Destructure trong component cha
 * Component nhận từng property riêng lẻ thay vì nhận object
 */
interface ProductItemV3Props {
  // Destructure các properties cần thiết
  id: number;
  name: string;
  price: number;
  imageUrlThumb: string;
  discountPrice?: number;
  category?: string;
  description?: string;
  // Các props bổ sung
  className?: string;
  showRating?: boolean;
  onAddToCart?: (id: number) => void;
  // Rest props từ Product (nếu có)
  [key: string]: any; // Cho phép nhận thêm props khác từ spread
}

function ProductItemV3({
  id,
  name,
  price,
  imageUrlThumb,
  discountPrice,
  category,
  description,
  className,
  showRating = true,
  onAddToCart,
}: ProductItemV3Props) {
  const handleClick = () => {
    if (onAddToCart) {
      onAddToCart(id);
    }
  };

  return (
    <div className={`flex flex-col gap-3 group ${className || ""}`}>
      {category && (
        <span className="text-xs text-primary uppercase">{category}</span>
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
        {description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
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
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm"
          >
            Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductItemV3;








