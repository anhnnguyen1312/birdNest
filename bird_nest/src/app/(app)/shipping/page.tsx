"use client";

import Link from "next/link";
import { TruckIcon } from "@heroicons/react/24/outline";

export default function ShippingPolicyPage() {
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
                  Chính sách giao hàng
                </span>
              </div>

              {/* Header */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <TruckIcon className="h-10 w-10 text-primary" />
                  <h1 className="text-[#181611] dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em]">
                    Chính Sách Giao Hàng
                  </h1>
                </div>
                <p className="text-[#897f61] dark:text-gray-400 text-base font-normal leading-normal">
                  Cam kết giao hàng nhanh chóng, an toàn và đúng hẹn
                </p>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-8">
                {/* Section 1 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    1. Phạm vi giao hàng
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Yến Sào Tinh Hoa giao hàng toàn quốc với các khu vực:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Nội thành TP.HCM & Hà Nội:</strong> Giao hàng
                        trong 24 giờ
                      </li>
                      <li>
                        <strong>Ngoại thành:</strong> Giao hàng trong 2-3 ngày
                      </li>
                      <li>
                        <strong>Các tỉnh thành khác:</strong> Giao hàng trong
                        3-5 ngày làm việc
                      </li>
                      <li>
                        <strong>Vùng sâu, vùng xa:</strong> Giao hàng trong 5-7
                        ngày làm việc
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 2 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    2. Phí vận chuyển
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <div className="bg-white dark:bg-background-dark/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-2 font-semibold">
                              Khu vực
                            </th>
                            <th className="text-right py-2 font-semibold">
                              Phí vận chuyển
                            </th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2">Nội thành TP.HCM & Hà Nội</td>
                            <td className="text-right">30.000đ</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2">Ngoại thành</td>
                            <td className="text-right">50.000đ</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2">Các tỉnh thành khác</td>
                            <td className="text-right">80.000đ</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold">
                              Miễn phí vận chuyển
                            </td>
                            <td className="text-right font-semibold text-primary">
                              Đơn hàng từ 2.000.000đ
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    3. Quy trình giao hàng
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-semibold mb-1">
                            Xác nhận đơn hàng
                          </p>
                          <p>
                            Sau khi đặt hàng thành công, chúng tôi sẽ gửi email
                            xác nhận trong vòng 2 giờ.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Chuẩn bị hàng</p>
                          <p>
                            Đơn hàng được đóng gói cẩn thận, đảm bảo chất lượng
                            sản phẩm trong vòng 24 giờ.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Giao hàng</p>
                          <p>
                            Nhân viên giao hàng sẽ liên hệ trước 30 phút để xác
                            nhận địa chỉ và thời gian giao hàng.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          4
                        </div>
                        <div>
                          <p className="font-semibold mb-1">
                            Kiểm tra và nhận hàng
                          </p>
                          <p>
                            Vui lòng kiểm tra hàng hóa trước khi thanh toán. Nếu
                            có vấn đề, vui lòng từ chối nhận hàng và liên hệ
                            ngay với chúng tôi.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    4. Đóng gói sản phẩm
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Tất cả sản phẩm được đóng gói cẩn thận với:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Hộp đựng chuyên dụng, chống ẩm</li>
                      <li>Bao bì bảo vệ chống va đập</li>
                      <li>Nhãn mác đầy đủ thông tin sản phẩm</li>
                      <li>Hướng dẫn bảo quản và sử dụng</li>
                      <li>Hóa đơn VAT (nếu yêu cầu)</li>
                    </ul>
                  </div>
                </section>

                {/* Section 5 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    5. Xử lý khi giao hàng thất bại
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Trong trường hợp giao hàng thất bại do:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Sai địa chỉ:</strong> Khách hàng vui lòng cung
                        cấp lại địa chỉ chính xác, phí giao lại: 30.000đ
                      </li>
                      <li>
                        <strong>Không liên lạc được:</strong> Chúng tôi sẽ gọi
                        lại 3 lần trong 2 ngày, nếu không liên lạc được sẽ hủy
                        đơn hàng
                      </li>
                      <li>
                        <strong>Từ chối nhận hàng:</strong> Đơn hàng sẽ được
                        hoàn trả, phí hoàn trả: 50.000đ
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 6 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    6. Giao hàng nhanh (Express)
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 border border-primary/20">
                      <p className="font-semibold mb-2">
                        Dịch vụ giao hàng trong 2-4 giờ (chỉ áp dụng nội thành
                        TP.HCM & Hà Nội)
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Phí dịch vụ: 100.000đ</li>
                        <li>Áp dụng cho đơn hàng đặt trước 14:00</li>
                        <li>Đơn hàng sau 14:00 sẽ giao vào ngày hôm sau</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 7 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    7. Liên hệ
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Mọi thắc mắc về giao hàng, vui lòng liên hệ:</p>
                    <div className="bg-white dark:bg-background-dark/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                      <p className="font-semibold mb-2">Yến Sào Tinh Hoa</p>
                      <p>Hotline: 1900 1234 (24/7)</p>
                      <p>Email: shipping@yensaotinhhoa.com</p>
                      <p>Giờ làm việc: 8:00 - 20:00 (T2 - CN)</p>
                    </div>
                  </div>
                </section>

                {/* Footer Note */}
                <div className="mt-8 p-6 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="text-[#181611] dark:text-gray-200 text-sm leading-relaxed">
                    <strong>Cam kết:</strong> Chúng tôi cam kết giao hàng đúng
                    hẹn, đảm bảo chất lượng sản phẩm. Nếu có bất kỳ vấn đề nào
                    trong quá trình giao hàng, vui lòng liên hệ ngay với chúng
                    tôi để được hỗ trợ kịp thời.
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
