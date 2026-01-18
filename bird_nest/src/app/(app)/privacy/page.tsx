"use client";

import Link from "next/link";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background-light-secondary dark:bg-background-dark font-display text-[#181611] dark:text-gray-200">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <main className="layout-container flex h-full grow flex-col">
          <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
              {/* Breadcrumbs */}
              <div className="flex flex-wrap gap-2">
                <Link
                  className="text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors"
                  href="/home"
                >
                  Trang chủ
                </Link>
                <span className="text-[#897f61] dark:text-gray-400 text-sm font-medium leading-normal">
                  /
                </span>
                <span className="text-[#181611] dark:text-gray-200 text-sm font-medium leading-normal">
                  Chính sách bảo mật
                </span>
              </div>

              {/* Header */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-10 w-10 text-primary" />
                  <h1 className="text-[#181611] dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em]">
                    Chính Sách Bảo Mật
                  </h1>
                </div>
                <p className="text-[#897f61] dark:text-gray-400 text-base font-normal leading-normal">
                  Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
                </p>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-8">
                {/* Section 1 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    1. Thu thập thông tin
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>
                      Yến Sào Tinh Hoa cam kết bảo vệ quyền riêng tư của khách
                      hàng. Chúng tôi chỉ thu thập thông tin cần thiết để phục
                      vụ bạn tốt nhất:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Thông tin cá nhân:</strong> Họ tên, số điện
                        thoại, địa chỉ email, địa chỉ giao hàng
                      </li>
                      <li>
                        <strong>Thông tin thanh toán:</strong> Được xử lý an
                        toàn qua cổng thanh toán bên thứ ba, chúng tôi không lưu
                        trữ thông tin thẻ tín dụng
                      </li>
                      <li>
                        <strong>Thông tin duyệt web:</strong> Cookies, địa chỉ
                        IP, trình duyệt để cải thiện trải nghiệm người dùng
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 2 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    2. Sử dụng thông tin
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Thông tin thu thập được sử dụng cho các mục đích:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Xử lý và giao hàng đơn hàng</li>
                      <li>Gửi thông báo về đơn hàng và dịch vụ</li>
                      <li>Cải thiện chất lượng sản phẩm và dịch vụ</li>
                      <li>Gửi thông tin khuyến mãi (nếu bạn đồng ý)</li>
                      <li>Phân tích và cải thiện trải nghiệm người dùng</li>
                    </ul>
                  </div>
                </section>

                {/* Section 3 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    3. Bảo vệ thông tin
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>
                      Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo
                      vệ thông tin của bạn:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        Mã hóa SSL/TLS cho tất cả các giao dịch trực tuyến
                      </li>
                      <li>Hệ thống firewall và bảo mật đa lớp cho máy chủ</li>
                      <li>
                        Chỉ nhân viên được ủy quyền mới có quyền truy cập thông
                        tin khách hàng
                      </li>
                      <li>
                        Không chia sẻ thông tin với bên thứ ba trừ khi có yêu
                        cầu pháp lý
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 4 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    4. Cookies
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Website sử dụng cookies để:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Ghi nhớ sở thích và cài đặt của bạn</li>
                      <li>Lưu thông tin giỏ hàng</li>
                      <li>Phân tích lưu lượng truy cập</li>
                      <li>Cải thiện hiệu suất website</li>
                    </ul>
                    <p className="mt-2">
                      Bạn có thể tắt cookies trong cài đặt trình duyệt, tuy
                      nhiên điều này có thể ảnh hưởng đến trải nghiệm sử dụng.
                    </p>
                  </div>
                </section>

                {/* Section 5 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    5. Quyền của khách hàng
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Bạn có quyền:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Truy cập và xem thông tin cá nhân của mình</li>
                      <li>Yêu cầu chỉnh sửa hoặc xóa thông tin</li>
                      <li>Từ chối nhận email marketing</li>
                      <li>Khiếu nại về việc xử lý thông tin cá nhân</li>
                    </ul>
                  </div>
                </section>

                {/* Section 6 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    6. Liên hệ
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>
                      Nếu bạn có thắc mắc về chính sách bảo mật, vui lòng liên
                      hệ:
                    </p>
                    <div className="bg-white dark:bg-background-dark/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                      <p className="font-semibold mb-2">Yến Sào Tinh Hoa</p>
                      <p>Email: info@yensaotinhhoa.com</p>
                      <p>Hotline: 1900 1234</p>
                      <p>Địa chỉ: [Địa chỉ cửa hàng]</p>
                    </div>
                  </div>
                </section>

                {/* Footer Note */}
                <div className="mt-8 p-6 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="text-[#181611] dark:text-gray-200 text-sm leading-relaxed">
                    <strong>Lưu ý:</strong> Chúng tôi có thể cập nhật chính sách
                    bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo
                    trên trang này. Việc bạn tiếp tục sử dụng website sau khi có
                    thay đổi được coi là bạn đã chấp nhận chính sách mới.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
