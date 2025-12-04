"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Promotion.module.scss";
import { FeaturedProduct } from "@/types";
import Link from "next/link";

function Promotion({ topProducts }: { topProducts: FeaturedProduct }) {
  console.log("topProducts ne", topProducts);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!topProducts?.endDate) return;

    const end = new Date(topProducts.endDate).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [topProducts?.endDate]);

  return (
    <Link
      className="    flex flex-1 justify-center py-5 bg-card-light dark:bg-card-dark"
      href={`/product_detail/${topProducts.productId}`}
    >
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col lg:flex-row items-center gap-10 px-4 py-10">
          <div className="flex-1 w-full">
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-xl"
              data-alt="Close-up of a beautifully packaged box of premium bird's nests."
              style={{
                backgroundImage: `url(${topProducts?.products?.imageUrlThumb})`,
              }}
            ></div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
                Ưu Đãi Đặc Biệt: Hộp Quà Yến Sào Thượng Hạng
              </h2>
              <div className="flex items-baseline gap-3">
                <span className="text-primary text-3xl font-bold">
                  {(
                    topProducts?.products?.price -
                    topProducts?.products?.discountPrice
                  ).toLocaleString("vi-VN")}
                  ₫
                </span>
                <span className="text-subtext-light dark:text-subtext-dark line-through">
                  {topProducts?.products?.price.toLocaleString("vi-VN")}₫
                </span>
              </div>
              <p className="text-subtext-light dark:text-subtext-dark text-sm font-normal leading-normal">
                Ưu đãi sẽ kết thúc sau:
              </p>
              <div className="flex gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-text-light dark:text-text-dark">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-subtext-light dark:text-subtext-dark">
                    NGÀY
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-text-light dark:text-text-dark">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-subtext-light dark:text-subtext-dark">
                    GIỜ
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-text-light dark:text-text-dark">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-subtext-light dark:text-subtext-dark">
                    PHÚT
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-text-light dark:text-text-dark">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-subtext-light dark:text-subtext-dark">
                    GIÂY
                  </div>
                </div>
              </div>
            </div>
            <div className="p-0 grid grid-cols-[auto_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-border-light dark:border-t-border-dark py-4">
                <p className="text-subtext-light dark:text-subtext-dark text-sm font-normal leading-normal">
                  Nguồn gốc
                </p>
                <p className="text-text-light dark:text-text-dark text-sm font-normal leading-normal">
                  Yến sào Khánh Hòa tự nhiên, được thu hoạch từ những vách đá
                  ven biển.
                </p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-border-light dark:border-t-border-dark py-4">
                <p className="text-subtext-light dark:text-subtext-dark text-sm font-normal leading-normal">
                  Quy trình
                </p>
                <p className="text-text-light dark:text-text-dark text-sm font-normal leading-normal">
                  Chế biến thủ công, giữ trọn dưỡng chất tinh túy, không sử dụng
                  hóa chất.
                </p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-b border-border-light dark:border-border-dark py-4">
                <p className="text-subtext-light dark:text-subtext-dark text-sm font-normal leading-normal">
                  Thành phần
                </p>
                <p className="text-text-light dark:text-text-dark text-sm font-normal leading-normal">
                  100% yến sào nguyên chất, giàu protein, axit amin và khoáng
                  chất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Promotion;
