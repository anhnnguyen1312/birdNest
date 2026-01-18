"use client";

import Link from "next/link";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function ReturnPolicyPage() {
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
                  Chính sách đổi trả
                </span>
              </div>

              {/* Header */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <ArrowPathIcon className="h-10 w-10 text-primary" />
                  <h1 className="text-[#181611] dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em]">
                    Chính Sách Đổi Trả
                  </h1>
                </div>
                <p className="text-[#897f61] dark:text-gray-400 text-base font-normal leading-normal">
                  Cam kết đổi trả miễn phí trong 7 ngày nếu sản phẩm không đúng
                  như mô tả
                </p>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-8">
                {/* Section 1 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    1. Điều kiện đổi trả
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Chúng tôi chấp nhận đổi trả trong các trường hợp sau:</p>
                    <div className="bg-white dark:bg-background-dark/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800 space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <span className="text-green-600 dark:text-green-400 text-sm">
                            ✓
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">
                            Sản phẩm bị lỗi do nhà sản xuất
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Hư hỏng, thiếu sót, không đúng mô tả
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <span className="text-green-600 dark:text-green-400 text-sm">
                            ✓
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">
                            Sản phẩm bị hư hỏng trong quá trình vận chuyển
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Bao bì bị rách, sản phẩm bị vỡ, biến dạng
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <span className="text-green-600 dark:text-green-400 text-sm">
                            ✓
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">Giao nhầm sản phẩm</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Sản phẩm không đúng với đơn hàng
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800/30">
                      <p className="font-semibold text-red-700 dark:text-red-400 mb-2">
                        Không chấp nhận đổi trả:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-red-600 dark:text-red-400 ml-4">
                        <li>Sản phẩm đã qua sử dụng, mở niêm phong</li>
                        <li>
                          Hết hạn đổi trả (quá 7 ngày kể từ ngày nhận hàng)
                        </li>
                        <li>Không có hóa đơn hoặc phiếu giao hàng</li>
                        <li>
                          Đổi ý không muốn mua nữa (trừ trường hợp đặc biệt)
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    2. Thời gian đổi trả
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Đổi trả miễn phí:</strong> Trong vòng 7 ngày kể
                        từ ngày nhận hàng
                      </li>
                      <li>
                        <strong>Hoàn tiền:</strong> Xử lý trong 3-5 ngày làm
                        việc sau khi nhận được sản phẩm hoàn trả
                      </li>
                      <li>
                        <strong>Đổi sản phẩm:</strong> Giao hàng mới trong 2-3
                        ngày sau khi xác nhận
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 3 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    3. Quy trình đổi trả
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-semibold mb-1">
                            Liên hệ với chúng tôi
                          </p>
                          <p>
                            Gọi hotline 1900 1234 hoặc email
                            support@yensaotinhhoa.com với mã đơn hàng và lý do
                            đổi trả.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Xác nhận yêu cầu</p>
                          <p>
                            Chúng tôi sẽ xác nhận yêu cầu trong vòng 24 giờ và
                            hướng dẫn các bước tiếp theo.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Gửi sản phẩm về</p>
                          <p>
                            Đóng gói sản phẩm nguyên vẹn, kèm hóa đơn và gửi về
                            địa chỉ chúng tôi cung cấp. Chúng tôi sẽ hỗ trợ phí
                            vận chuyển nếu sản phẩm bị lỗi.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          4
                        </div>
                        <div>
                          <p className="font-semibold mb-1">
                            Kiểm tra và xử lý
                          </p>
                          <p>
                            Sau khi nhận được sản phẩm, chúng tôi sẽ kiểm tra và
                            xử lý đổi trả/hoàn tiền trong 3-5 ngày làm việc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    4. Phí đổi trả
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <div className="bg-white dark:bg-background-dark/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-2 font-semibold">
                              Trường hợp
                            </th>
                            <th className="text-right py-2 font-semibold">
                              Phí
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2">
                              Sản phẩm lỗi, hư hỏng do nhà sản xuất
                            </td>
                            <td className="text-right text-green-600 dark:text-green-400 font-semibold">
                              Miễn phí
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2">
                              Hư hỏng trong quá trình vận chuyển
                            </td>
                            <td className="text-right text-green-600 dark:text-green-400 font-semibold">
                              Miễn phí
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2">Giao nhầm sản phẩm</td>
                            <td className="text-right text-green-600 dark:text-green-400 font-semibold">
                              Miễn phí
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">
                              Đổi ý (trường hợp đặc biệt)
                            </td>
                            <td className="text-right">50.000đ</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Section 5 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    5. Hoàn tiền
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Chúng tôi sẽ hoàn tiền qua các hình thức:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Thanh toán online:</strong> Hoàn tiền vào tài
                        khoản trong 3-5 ngày làm việc
                      </li>
                      <li>
                        <strong>Thanh toán COD:</strong> Chuyển khoản hoặc hoàn
                        tiền mặt khi nhận lại sản phẩm
                      </li>
                      <li>
                        <strong>Thẻ tín dụng:</strong> Hoàn tiền vào thẻ trong
                        5-7 ngày làm việc
                      </li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Lưu ý: Thời gian hoàn tiền có thể thay đổi tùy theo ngân
                      hàng của bạn.
                    </p>
                  </div>
                </section>

                {/* Section 6 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    6. Đổi sản phẩm
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Bạn có thể đổi sang sản phẩm khác với các điều kiện:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        Giá trị sản phẩm mới bằng hoặc cao hơn sản phẩm cũ
                      </li>
                      <li>
                        Nếu giá trị cao hơn, bạn sẽ thanh toán phần chênh lệch
                      </li>
                      <li>
                        Nếu giá trị thấp hơn, chúng tôi sẽ hoàn tiền phần chênh
                        lệch
                      </li>
                      <li>Sản phẩm đổi phải còn hàng trong kho</li>
                    </ul>
                  </div>
                </section>

                {/* Section 7 */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[#181611] dark:text-gray-100 text-2xl font-bold">
                    7. Liên hệ
                  </h2>
                  <div className="flex flex-col gap-3 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                    <p>Mọi thắc mắc về đổi trả, vui lòng liên hệ:</p>
                    <div className="bg-white dark:bg-background-dark/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                      <p className="font-semibold mb-2">Yến Sào Tinh Hoa</p>
                      <p>Hotline: 1900 1234 (24/7)</p>
                      <p>Email: support@yensaotinhhoa.com</p>
                      <p>Giờ làm việc: 8:00 - 20:00 (T2 - CN)</p>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Địa chỉ nhận hàng đổi trả: [Địa chỉ cửa hàng]
                      </p>
                    </div>
                  </div>
                </section>

                {/* Footer Note */}
                <div className="mt-8 p-6 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="text-[#181611] dark:text-gray-200 text-sm leading-relaxed">
                    <strong>Cam kết:</strong> Chúng tôi luôn đặt quyền lợi của
                    khách hàng lên hàng đầu. Mọi yêu cầu đổi trả hợp lệ sẽ được
                    xử lý nhanh chóng và minh bạch. Nếu bạn có bất kỳ thắc mắc
                    nào, đừng ngần ngại liên hệ với chúng tôi.
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
