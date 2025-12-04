import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Product } from "@/types/index";
import Link from "next/link";

// Định nghĩa interface cho props
interface ProductItemProps {
  product: Product;
  // Có thể thêm các props tùy chọn khác
  // className?: string;
  // showRating?: boolean;
  // onAddToCart?: (product: Product) => void;
}

// Destructuring với type annotation
function ProductItem({
  product,
}: // className,
// showRating = true,
// onAddToCart
ProductItemProps) {
  console.log(product);

  // fetch(`/api/products/product_detail/${product.id}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })

  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  return (
    <Link
      className="flex flex-col gap-3 group"
      href={`/product_detail/${product?.id}`}
    >
      <div className="relative w-full overflow-hidden aspect-square rounded-xl bg-[#f4f3f0] dark:bg-[#2a2416]">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-110"
          data-alt="Yến Thô Nguyên Tổ 50g trong hộp gỗ"
          style={{
            backgroundImage: `url(${product?.imageUrlThumb})`,
          }}
        ></div>
      </div>
      <div>
        <h4 className="text-base font-semibold leading-tight">
          {product?.name}
        </h4>
        <p className="text-sm font-medium text-primary mt-1">
          {product?.price?.toLocaleString("vi-VN")}₫
        </p>
        <div className="flex items-center gap-1 mt-1 text-sm text-[#897f61] dark:text-[#a19b85]">
          <StarIcon className="w-6 h-6 text-primary" />

          <span>4.9</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
