import React from "react";

function Promotion() {
  return (
    <div className="px-4 py-16">
      <div className="bg-primary/20 dark:bg-primary/10 rounded-xl flex flex-col md:flex-row items-center overflow-hidden">
        <div className="w-full md:w-1/2 p-8 lg:p-12 text-center md:text-left">
          <h2 className="text-[#181611] dark:text-background-light text-2xl lg:text-3xl font-bold leading-tight tracking-tight mb-3">
            Ưu đãi đặc biệt trong tháng
          </h2>
          <p className="text-[#897f61] dark:text-gray-400 mb-6">
            Nhận ngay ưu đãi giảm giá 15% cho tất cả các combo quà tặng. Món quà
            sức khỏe ý nghĩa cho những người thân yêu của bạn.
          </p>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-[#181611] text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity mx-auto md:mx-0">
            <span>Xem Combo</span>
          </button>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-auto md:align-self-stretch">
          <div
            className="h-full w-full bg-cover bg-center"
            data-alt="A festive arrangement of bird's nest gift sets."
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMt7-vVs9dIkRBjtwbn-AnnTeceUQHdDDThN_nG_23k1ua5yFJkLN0iG4DCUr3jRzuRk66oBrJFb6MeKNQkzLThBO4jQcsaq2OKyC4duLJECJplA_ahwxUK3wSpuDk4fJIKcYJtLPCbNOWpP12Mehb79jV8U0HAiZhuL1i8CqO_Yob4OegUCZHlpqwak3ET0538_6toDfHYjRopfMHaCj-NTzKVetB4oXc-uhHm6Lz1FTEMKIxvNB_tQ5dTRz2sDaCWfpFImyCsBo')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Promotion;
