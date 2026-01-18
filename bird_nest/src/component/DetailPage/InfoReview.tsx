import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

function InfoReview() {
  return (
    <div className="mt-16 lg:mt-24">
      <div className="border-b border-primary/20 dark:border-primary/10">
        <nav className="flex gap-8 -mb-px">
          <button className="py-4 px-1 border-b-2 border-primary text-primary font-bold">
            Mô tả chi tiết
          </button>
          <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 font-medium">
            Đánh giá của khách hàng
          </button>
        </nav>
      </div>
      <div className="py-8">
        {/* <!-- Detailed Description Content --> */}
        <div className="prose prose-lg max-w-none text-[#221d10] dark:text-[#f8f7f6] prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary dark:prose-invert">
          <h3>Chất Lượng Vượt Trội</h3>
          <p>
            Yến Tinh Chế Thượng Hạng được thu hoạch từ những nhà yến đạt chuẩn
            tại Khánh Hòa, nơi có điều kiện tự nhiên lý tưởng cho chim yến sinh
            sống và tạo ra những tổ yến chất lượng nhất. Quy trình thu hoạch và
            chế biến được kiểm soát nghiêm ngặt, đảm bảo giữ trọn vẹn dưỡng chất
            quý giá.
          </p>
          <ul>
            <li>
              <strong>Nguồn gốc rõ ràng:</strong> 100% yến sào nguyên chất từ
              Khánh Hòa.
            </li>
            <li>
              <strong>Quy trình tinh chế:</strong> Làm sạch thủ công tỉ mỉ,
              không sử dụng hóa chất tẩy trắng.
            </li>
            <li>
              <strong>Hàm lượng dinh dưỡng:</strong> Giàu protein, acid amin và
              các vi khoáng chất thiết yếu.
            </li>
          </ul>
          <h3>Công Dụng Tuyệt Vời</h3>
          <p>
            Sử dụng yến sào thường xuyên giúp bồi bổ cơ thể, tăng cường hệ miễn
            dịch, cải thiện làn da, và hỗ trợ phục hồi sức khỏe cho người bệnh,
            người lớn tuổi, phụ nữ mang thai và trẻ em. Đây là món quà sức khỏe
            vô giá từ thiên nhiên.
          </p>
          {/* <!-- RatingSummary Component Section --> */}
          <h3 className="mt-16">Đánh giá từ khách hàng</h3>
          <div className="flex flex-col md:flex-row flex-wrap gap-x-12 gap-y-8 p-4 bg-background-light-secondary dark:bg-background-dark border border-primary/10 rounded-xl not-prose">
            <div className="flex flex-col gap-2">
              <p className="text-[#221d10] dark:text-[#f8f7f6] text-5xl font-black tracking-tighter">
                4.8
              </p>
              <div className="flex gap-0.5 text-primary">
                <StarIcon className="w-6 h-6" />
                <StarIcon className="w-6 h-6" />
                <StarIcon className="w-6 h-6" />
                <StarIcon className="w-6 h-6" />
                <StarIcon className="w-6 h-6" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base font-normal">
                Dựa trên 125 reviews
              </p>
            </div>
            <div className="grid min-w-[240px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-x-4 gap-y-3">
              <p className="text-[#221d10] dark:text-[#f8f7f6] text-sm font-normal">
                5
              </p>
              <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-primary/20">
                <div
                  className="rounded-full bg-primary"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal text-right">
                80%
              </p>
              <p className="text-[#221d10] dark:text-[#f8f7f6] text-sm font-normal">
                4
              </p>
              <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-primary/20">
                <div
                  className="rounded-full bg-primary"
                  style={{ width: "12%" }}
                ></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal text-right">
                12%
              </p>
              <p className="text-[#221d10] dark:text-[#f8f7f6] text-sm font-normal">
                3
              </p>
              <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-primary/20">
                <div
                  className="rounded-full bg-primary"
                  style={{ width: "5%" }}
                ></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal text-right">
                5%
              </p>
              <p className="text-[#221d10] dark:text-[#f8f7f6] text-sm font-normal">
                2
              </p>
              <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-primary/20">
                <div
                  className="rounded-full bg-primary"
                  style={{ width: "2%" }}
                ></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal text-right">
                2%
              </p>
              <p className="text-[#221d10] dark:text-[#f8f7f6] text-sm font-normal">
                1
              </p>
              <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-primary/20">
                <div
                  className="rounded-full bg-primary"
                  style={{ width: "1%" }}
                ></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal text-right">
                1%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoReview;
