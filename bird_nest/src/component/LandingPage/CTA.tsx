import styles from "@/styles/CTA.module.scss";
import Link from "next/link";
// import styles2 from "@/styles/Global.scss";

export default function CTA() {
  return (
    <div className={styles.CTAWrapper}>
      {/* <div className={styles2.layoutContentContainer}> */}
      <div className="layoutContentContainer">
        <div className={styles.layoutInner}>
          <h2>
            Đừng bỏ lỡ cơ hội sở hữu yến sào thượng hạng với giá tốt nhất!
          </h2>
          <p>
            Chương trình khuyến mãi chỉ diễn ra trong thời gian ngắn. Hãy hành
            động ngay để chăm sóc sức khỏe cho bạn và những người thân yêu.
          </p>

          <Link
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 @[480px]:h-12 @[480px]:px-7 bg-primary text-[#181611] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:opacity-90 transition-opacity"
            href="/products"
          >
            <span className="truncate text-white">Đặt Hàng Ngay</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
