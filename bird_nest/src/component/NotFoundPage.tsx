"use client";

import React from "react";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light-secondary dark:bg-background-dark-product text-[#221d10] dark:text-[#f8f7f6]">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Không tìm thấy trang</h2>
      <p className="mb-8 text-lg text-center max-w-xs">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        href="/home"
        className="px-6 py-3 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
      >
        Quay về Trang chủ
      </Link>
    </div>
  );
}

export default NotFoundPage;
