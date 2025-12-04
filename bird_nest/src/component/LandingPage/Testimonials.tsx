import React from "react";
import styles from "@/styles/Testimonials.module.scss";
import { StarIcon } from "@heroicons/react/24/solid";

function Testimonials() {
  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-4 text-center items-center">
            <h2 className="text-text-light dark:text-text-dark tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
              Khách Hàng Nói Gì Về Chúng Tôi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
              <div className="flex items-center gap-4">
                <img
                  alt="Portrait of customer Minh Anh"
                  className="w-12 h-12 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdxy4fGWOaX-Pfh16YdWWeV254HSlQRhGTaOBTcGL8LUfOXQEkoeLNrKIGnDQkbvVgvgEQc0q_wjx2-jdJn1yOyH3_CcTFNv2aghjGcvs9NFMDwfRm48Gev4wN-_XSjZNxwZ6RqwimxiIe31VTVdUcnYta_IM_KpylP2uQA8-PWAjtSxHH-4HYdDvisUQyKoz5mSclSCkLAlPEzolJvOf8YHU7VlPYocfvi8qVtMdOli_ANqV3ByUvNrufU5hieNkPMztOrzYbiuk"
                />
                <div>
                  <p className="font-bold text-text-light dark:text-text-dark">
                    Chị Minh Anh
                  </p>
                  <div className="flex text-primary">
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <p className="text-subtext-light dark:text-subtext-dark text-sm italic">
                &quot;Sản phẩm rất chất lượng, mình dùng thấy sức khỏe cải thiện
                rõ rệt. Đóng gói cũng rất sang trọng, sẽ tiếp tục ủng hộ.&quot;
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
              <div className="flex items-center gap-4">
                <img
                  alt="Portrait of customer Quốc Tuấn"
                  className="w-12 h-12 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIwNXm2y9BPm18qx2HGgo2yV2KOVcMFqsBYJINPjYQWf-me1-4opFszsT6K0nsuYID7ZrNFDHin6TOvsjlzQytmZN78CIsaMzpNkeNYUu5VuJDfXiWpvd9SdjxxgobAOach7jVIvFNKhQgBmNcJsqMb1am7fnlKUL4h0j81M7h7DU-GVjKg6sGH0y-5D8-_ugFG8-hQuqCTVQkwOg03Fbj9hmAUi6DydC6PyZmQNe03l6Ko0XcG14OYIUxTTaS3ye9RKmpcjnNksM"
                />
                <div>
                  <p className="font-bold text-text-light dark:text-text-dark">
                    Anh Quốc Tuấn
                  </p>
                  <div className="flex text-primary">
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <p className="text-subtext-light dark:text-subtext-dark text-sm italic">
                &quot;Tôi mua làm quà biếu đối tác, họ rất hài lòng. Dịch vụ tư
                vấn chuyên nghiệp, giao hàng nhanh chóng. Rất đáng tiền.&quot;
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
              <div className="flex items-center gap-4">
                <img
                  alt="Portrait of customer Lan Hương"
                  className="w-12 h-12 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm0Y2ysVOzxiKBTAc7iMDgyVHIVfueTsg9TvaJ7y4_iEHWRIp_mVgQs7mc2rbUwNKgyL_y5mPkWNbumvJjxD01LhwdrfN7sDzMFnBhPEwUH1o7u-fgTu6pK0hJIZ9o255kqcrXjuxVH2qCiAH9LMiGcWlBL-bGmcZJAs45v6LB27QS0ZHjeg4zbrU_ViA6GXkNvRQL1Ypd0_GXkhWEWKCx_vB_7BDwKxgUdcGeaUCjtqjpxBb2SbxaCr0nQfWYnuCNu95e9vBX7nE"
                />
                <div>
                  <p className="font-bold text-text-light dark:text-text-dark">
                    Cô Lan Hương
                  </p>
                  <div className="flex text-primary">
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                    <StarIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <p className="text-subtext-light dark:text-subtext-dark text-sm italic">
                &quot;Yến sào ở đây sợi dai, nở đều, vị rất thanh. Tôi đã dùng
                nhiều nơi nhưng rất ưng ý chất lượng của shop.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
