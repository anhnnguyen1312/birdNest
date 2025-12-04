import React from "react";
import styles from "@/styles/Feature.module.scss";
import { HeartIcon, GiftIcon, SparklesIcon } from "@heroicons/react/24/outline";
function Feature() {
  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-4 text-center items-center">
            <h2 className="text-text-light dark:text-text-dark tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
              Những Lợi Ích Vượt Trội
            </h2>
            <p className="text-subtext-light dark:text-subtext-dark text-base font-normal leading-normal max-w-[720px]">
              Khám phá những giá trị tuyệt vời mà yến sào thượng hạng mang lại
              cho sức khỏe và sắc đẹp của bạn.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-0">
            <div className="flex flex-1 gap-3 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 flex-col text-center items-center">
              <HeartIcon className="h-10 w-10 text-primary " />
              <div className="flex flex-col gap-1">
                <h3 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">
                  Bồi Bổ Sức Khỏe
                </h3>
                <p className="text-subtext-light dark:text-subtext-dark text-sm font-normal leading-normal">
                  Tăng cường hệ miễn dịch, phục hồi thể lực và cải thiện chức
                  năng cơ thể.
                </p>
              </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 flex-col text-center items-center">
              <SparklesIcon className="h-10 w-10 text-primary " />

              <div className="flex flex-col gap-1">
                <h3 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">
                  Trẻ Hóa Làn Da
                </h3>
                <p className="text-subtext-light dark:text-subtext-dark text-sm font-normal leading-normal">
                  Cung cấp collagen tự nhiên, giúp da căng mịn, tươi trẻ và
                  chống lão hóa.
                </p>
              </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 flex-col text-center items-center">
              <GiftIcon className="h-10 w-10 text-primary " />
              <div className="flex flex-col gap-1">
                <h3 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">
                  Quà Tặng Đẳng Cấp
                </h3>
                <p className="text-subtext-light dark:text-subtext-dark text-sm font-normal leading-normal">
                  Món quà sang trọng, tinh tế và đầy ý nghĩa cho người thân, đối
                  tác.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
