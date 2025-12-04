import React from "react";
import styles from "@/styles/Hero.module.scss";
import Link from "next/link";

function Hero() {
  return (
    <div className="flex flex-1 justify-center">
      <div className="layout-content-container flex flex-col w-full">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[60vh] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
              data-alt="High-quality bird's nest soup in a porcelain bowl, surrounded by dried bird's nest pieces and elegant decorations."
              style={{
                backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.2) 0%, 
      rgba(0, 0, 0, 0.5) 100%
    ), 
    url("https://lh3.googleusercontent.com/aida-public/AB6AXuCz3Avd1xGwhvSjdQIIFq3Hn07GiR8zxfJvGMtqRalpG09rczvWU_L2zafO-URq707bN3Pd_8runRWxV1w8cvemBUk4H6L-hq6eJaHixOdgNw7rfnnKeQ6Gl-QAxWcMVW1wkhnwVx2C11pH_G_gPO_iU39iSn_N8F_d9E9r7l6VMZBJSDlrBbCi7aUzQCIvmjArnJFn5QAlGqbbv-5okL-NX8YQmVpizrhLa-W1j2LwSTh5ZkOfW2Dg9sXlVva3tpZ2ChWQoje0SNs")`,
              }}
            >
              <div className="flex flex-col gap-2 text-center max-w-2xl">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                  Tinh Hoa Yến Sào - Món Quà Sức Khỏe Vàng
                </h1>
                <h2 className="text-white text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">
                  Giảm giá 30% duy nhất trong tuần này
                </h2>
              </div>

              <Link
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-[#181611] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:opacity-90 transition-opacity"
                href="/home"
              >
                <span className="truncate text-white">
                  Mua Ngay Nhận Ưu Đãi
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
