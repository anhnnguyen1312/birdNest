import React from "react";
import Link from "next/link";
function Breadcrumbs() {
  return (
    <div className="flex flex-wrap gap-2 px-4 mb-8">
      <Link
        className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary transition-colors"
        href="/home"
      >
        Trang chủ
      </Link>
      <span className="text-gray-400 dark:text-gray-500 text-sm font-medium leading-normal">
        /
      </span>

      <Link
        className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary transition-colors"
        href="/products"
      >
        Sản phẩm
      </Link>
      <span className="text-gray-400 dark:text-gray-500 text-sm font-medium leading-normal">
        /
      </span>

      <Link
        className="text-[#221d10] dark:text-[#f8f7f6] text-sm font-medium leading-normal"
        href="/home"
      >
        Yến Tinh Chế Thượng Hạng 100g
      </Link>
    </div>
  );
}

export default Breadcrumbs;
