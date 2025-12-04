import ProductItem from "@/component/ProductItem";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";

function page() {
  return (
    <div className="bg-background-light-secondary dark:bg-background-dark-secondary font-display text-[#181611] dark:text-gray-200">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <main className="layout-container flex h-full grow flex-col">
          <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <a
                    className="text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
                    href="#"
                  >
                    Trang chủ
                  </a>
                  <span className="text-[#897f61] dark:text-gray-400 text-sm font-medium leading-normal">
                    /
                  </span>
                  <span className="text-[#181611] dark:text-gray-200 text-sm font-medium leading-normal">
                    Giỏ hàng
                  </span>
                </div>
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex min-w-72 flex-col gap-2">
                    <h1 className="text-[#181611] dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em]">
                      Giỏ Hàng Của Bạn
                    </h1>
                    <p className="text-[#897f61] dark:text-gray-400 text-base font-normal leading-normal">
                      Vui lòng kiểm tra lại sản phẩm trước khi tiến hành thanh
                      toán.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="bg-white dark:bg-background-dark-secondary/50 rounded-xl shadow-sm">
                    <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b border-gray-200 dark:border-gray-800 text-xs font-bold uppercase text-[#897f61] dark:text-gray-400">
                      <div className="col-span-3">Sản phẩm</div>
                      <div className="text-center">Đơn giá</div>
                      <div className="text-center">Số lượng</div>
                      <div className="text-right">Thành tiền</div>
                    </div>
                    <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
                      {/* <!-- Product Item 1 --> */}
                      <ProductItem />
                      {/* <!-- Product Item 2 --> */}
                      <ProductItem />
                    </div>
                  </div>
                  <a
                    className="flex items-center gap-2 text-[#181611] dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium w-fit"
                    href="#"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Tiếp tục mua sắm
                  </a>
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-background-dark-secondary/50 rounded-xl shadow-sm p-6 flex flex-col gap-4 sticky top-24">
                    <h3 className="text-xl font-bold text-[#181611] dark:text-gray-100">
                      Tóm Tắt Đơn Hàng
                    </h3>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between text-[#897f61] dark:text-gray-400">
                        <span>Tạm tính</span>
                        <span className="text-[#181611] dark:text-gray-200">
                          3,950,000đ
                        </span>
                      </div>
                      <div className="flex justify-between text-[#897f61] dark:text-gray-400">
                        <span>Phí vận chuyển</span>
                        <span className="text-[#181611] dark:text-gray-200">
                          Sẽ được tính sau
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-medium text-[#181611] dark:text-gray-200"
                        htmlFor="promo-code"
                      >
                        Mã khuyến mãi
                      </label>
                      <div className="flex gap-2">
                        <input
                          className="flex-grow w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-background-dark-secondary focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
                          id="promo-code"
                          placeholder="Nhập mã khuyến mãi"
                          type="text"
                        />
                        <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-[#181611] dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold text-sm">
                          Áp dụng
                        </button>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[#181611] dark:text-gray-200">
                        Tổng cộng
                      </span>
                      <span className="text-2xl font-black text-primary">
                        3,950,000đ
                      </span>
                    </div>
                    <button className="w-full text-center py-3 rounded-lg bg-primary hover:bg-primary/90 text-white dark:text-background-dark font-bold text-base transition-colors duration-200">
                      Tiến hành Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default page;
