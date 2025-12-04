import Link from "next/link";

function Hero() {
  return (
    <div className="w-full @container">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 text-center"
          data-alt="A beautiful, artfully arranged display of high-quality bird's nest products."
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbZEMgEbA5u0yuD230xN9tfZF5OA6SfXLt8o4EES8YDs5CUGydN-fh8TME5UziVRKG1zrG_x1XsN2-xTFtLwWSu6rnZmDrOThjCYBf29OUbpExzp2qnOhRj9ypv-OIh6X89EInnVxy5l089un2fYbQEDR069B2cckCrwcvp_XgdrGV72A2mxYMz-bt3djK0R77MUiq9vRx4NrlR4kQ1FaOmGqnib45PiHJmHE4Vd93deeROuOsWi96ywqzalLCoT_BwkaV1GIDJKE")`,
          }}
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              Tinh Hoa Từ Thiên Nhiên
            </h1>
            <h2 className="text-white text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal max-w-xl mx-auto">
              Khám phá sản phẩm yến sào nguyên chất, món quà quý giá cho sức
              khỏe từ những tổ yến được tuyển chọn kỹ lưỡng.
            </h2>
          </div>

          <Link
            href="/products"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-[#181611] text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
          >
            <span className="truncate text-white">Khám Phá Ngay</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
