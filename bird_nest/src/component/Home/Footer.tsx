"use client";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark-home border-t border-[#e6e3db] dark:border-[#3a3321]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 text-[#181611] dark:text-primary mb-4">
              <div className="size-6 text-primary">
                <svg
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                </svg>
              </div>
              <h2 className="text-[#181611] dark:text-background-light text-lg font-bold">
                Yến Sào Tinh Hoa
              </h2>
            </div>
            <p className="text-sm text-[#897f61] dark:text-gray-400">
              Món quà sức khỏe từ thiên nhiên, mang đến giá trị dinh dưỡng cao
              nhất.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#181611] dark:text-background-light tracking-wider uppercase">
              Sản phẩm
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  className="text-base text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                  href="#"
                >
                  Yến Thô
                </a>
              </li>
              <li>
                <a
                  className="text-base text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                  href="#"
                >
                  Yến Tinh Chế
                </a>
              </li>
              <li>
                <a
                  className="text-base text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                  href="#"
                >
                  Yến Chưng Sẵn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#181611] dark:text-background-light tracking-wider uppercase">
              Chính sách
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  className="text-base text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                  href="#"
                >
                  Chính sách giao hàng
                </a>
              </li>
              <li>
                <a
                  className="text-base text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                  href="#"
                >
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a
                  className="text-base text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                  href="#"
                >
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#181611] dark:text-background-light tracking-wider uppercase">
              Đăng ký nhận tin
            </h3>
            <p className="mt-4 text-base text-[#897f61] dark:text-gray-400">
              Nhận thông tin về sản phẩm mới và các chương trình ưu đãi.
            </p>
            <form className="mt-4 flex">
              <input
                className=" px-2 form-input w-full rounded-l-lg border-[#a7a6a5] dark:border-[#3a3321] bg-[#f0f0f0] dark:bg-[#2a2414] focus:ring-primary/50 text-[#181611] dark:text-background-light"
                placeholder="Email của bạn"
                type="email"
              />
              <button
                className="p-2 rounded-r-lg bg-primary text-[#181611] hover:opacity-90"
                type="submit"
              >
                <ArrowRightIcon className="h-6 w-6 " />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-[#e6e3db] dark:border-[#3a3321] pt-8 text-center">
          <p className="text-base text-[#897f61] dark:text-gray-400">
            © 2024 Yến Sào Tinh Hoa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
