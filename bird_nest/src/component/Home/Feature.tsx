import React from "react";
import {
  CheckBadgeIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
function Feature() {
  return (
    <div className="flex flex-col gap-10 px-4 py-16 @container">
      <div className="flex flex-col gap-4 text-center items-center">
        <h2 className="text-[#181611] dark:text-background-light tracking-tight text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
          Giá Trị Cốt Lõi Của Chúng Tôi
        </h2>
        <p className="text-[#897f61] dark:text-gray-400 text-base font-normal leading-normal max-w-[720px]">
          Chúng tôi cam kết mang đến những sản phẩm yến sào chất lượng nhất,
          được khai thác và chế biến theo quy trình nghiêm ngặt, đảm bảo an toàn
          và dinh dưỡng.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-0">
        <div className="flex flex-1 gap-4 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] bg-white dark:bg-background-dark p-6 flex-col text-center items-center">
          <div className="text-primary" data-size="24px">
            <CheckBadgeIcon className="w-10 h-10 text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[#181611] dark:text-background-light text-lg font-bold leading-tight">
              Yến Thật 100%
            </h3>
            <p className="text-[#897f61] dark:text-gray-400 text-sm font-normal leading-normal">
              Cam kết nguồn gốc yến sào tự nhiên, không pha trộn, không chất bảo
              quản.
            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-4 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] bg-white dark:bg-background-dark p-6 flex-col text-center items-center">
          <div className="text-primary" data-size="24px">
            <TruckIcon className="w-10 h-10 text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[#181611] dark:text-background-light text-lg font-bold leading-tight">
              Giao Hàng Nhanh
            </h3>
            <p className="text-[#897f61] dark:text-gray-400 text-sm font-normal leading-normal">
              Dịch vụ giao hàng tận nơi nhanh chóng và đáng tin cậy trên toàn
              quốc.
            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-4 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] bg-white dark:bg-background-dark p-6 flex-col text-center items-center">
          <div className="text-primary" data-size="24px">
            <ShieldCheckIcon className="w-10 h-10 text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[#181611] dark:text-background-light text-lg font-bold leading-tight">
              Chứng Nhận An Toàn
            </h3>
            <p className="text-[#897f61] dark:text-gray-400 text-sm font-normal leading-normal">
              Sản phẩm đã qua kiểm định nghiêm ngặt, đạt chuẩn an toàn vệ sinh
              thực phẩm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
