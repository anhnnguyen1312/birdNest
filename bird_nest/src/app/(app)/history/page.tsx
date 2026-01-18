import {
  ArrowLeftStartOnRectangleIcon,
  MapPinIcon,
  ReceiptPercentIcon,
  UserIcon,
  MagnifyingGlassIcon as SearchIcon,
  CheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import React from "react";

function page() {
  return (
    <div className="font-display bg-background-light-secondary dark:bg-background-dark text-text-light dark:text-gray-200">
      <div className="relative flex min-h-screen w-full flex-col">
        {/* <!-- Main Content --> */}
        <main className="container mx-auto flex flex-1 flex-col px-4 py-8 lg:flex-row lg:gap-8 lg:py-12">
          {/* <!-- SideNavBar --> */}
          <aside className="mb-8 w-full flex-shrink-0 lg:mb-0 lg:w-64 xl:w-72">
            <div className="flex h-full flex-col gap-4 rounded-lg border border-gray-200/80 bg-background-light-secondary p-4 dark:border-gray-700/80 dark:bg-surface-dark">
              <div className="flex items-center gap-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                  data-alt="User's profile picture"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYShbLqi0Ie-3dx-PVFTb6Xw-YPCUHeFsRIHbczh9A4P1vZcy9i1tsM0fXqylnvbgqJDmAHITWzbrevygNW58sJZ6jvrXEiG1yCf0CQ7PiXFD0Uthg-pf-mpaZlNSg4pVDLIRefZqyrY5_wb18KcT4XSToMFEN-IWxW6ixOoCxbDAHZwte6y9iCG7LeY8HPHAg1L5N65tCb6NML2JOOB_jDzzcTkqSxmpwLWeooMxdwhXbSZq_1LhRYubqkqgky148xZ_6jLMyaLE");',
                  }}
                ></div>
                <div className="flex flex-col">
                  <h1 className="text-base font-bold text-text-light dark:text-white">
                    Nguyễn Văn A
                  </h1>
                  <p className="text-sm font-medium text-primary">
                    Thành viên Vàng
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <a
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-light hover:bg-surface-light dark:text-gray-300 dark:hover:bg-gray-700/50"
                  href="#"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Thông tin cá nhân</span>
                </a>
                <a
                  className="flex items-center gap-3 rounded-lg bg-primary/20 px-3 py-2.5 text-sm font-bold text-primary dark:bg-primary/30"
                  href="#"
                >
                  <ReceiptPercentIcon className="w-5 h-5" />
                  <span>Lịch sử đơn hàng</span>
                </a>
                <a
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-light hover:bg-surface-light dark:text-gray-300 dark:hover:bg-gray-700/50"
                  href="#"
                >
                  <MapPinIcon className="w-5 h-5" /> <span>Địa chỉ</span>
                </a>
                <a
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-light hover:bg-surface-light dark:text-gray-300 dark:hover:bg-gray-700/50"
                  href="#"
                >
                  <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </a>
              </div>
            </div>
          </aside>
          {/* <!-- Main Panel --> */}
          <div className="flex-1">
            {/* <!-- PageHeading --> */}
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-text-light dark:text-white lg:text-4xl">
                Lịch Sử Đơn Hàng
              </h1>
              <p className="mt-1 text-subtle-light dark:text-gray-400">
                Xem và quản lý tất cả các đơn hàng đã đặt của bạn.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              {/* <!-- Order List Panel --> */}
              <div className="flex flex-col gap-4 xl:col-span-1">
                {/* <!-- SearchBar --> */}
                <div className="relative">
                  <SearchIcon className="w-5 h-5" />
                  <input
                    className="w-full rounded-lg border border-gray-200 bg-surface-light py-2.5 pl-10 pr-4 text-sm text-text-light placeholder:text-subtle-light focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-surface-dark dark:text-gray-200"
                    placeholder="Tìm theo mã đơn hàng, sản phẩm..."
                  />
                </div>
                {/* <!-- Chips / Filters --> */}
                <div className="flex flex-wrap gap-2">
                  <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/20 px-4 text-sm font-semibold text-primary">
                    Tất cả
                  </button>
                  <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-surface-light px-4 text-sm font-medium text-text-light hover:bg-gray-200 dark:bg-surface-dark dark:text-gray-300 dark:hover:bg-gray-700">
                    Chờ xử lý
                  </button>
                  <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-surface-light px-4 text-sm font-medium text-text-light hover:bg-gray-200 dark:bg-surface-dark dark:text-gray-300 dark:hover:bg-gray-700">
                    Đang giao
                  </button>
                  <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-surface-light px-4 text-sm font-medium text-text-light hover:bg-gray-200 dark:bg-surface-dark dark:text-gray-300 dark:hover:bg-gray-700">
                    Đã giao
                  </button>
                  <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-surface-light px-4 text-sm font-medium text-text-light hover:bg-gray-200 dark:bg-surface-dark dark:text-gray-300 dark:hover:bg-gray-700">
                    Đã hủy
                  </button>
                </div>
                {/* <!-- Order Cards List --> */}
                <div className="flex flex-col gap-3">
                  {/* <!-- Selected Order Card --> */}
                  <div className="cursor-pointer rounded-lg border-2 border-primary bg-primary/10 p-4 dark:bg-primary/20">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-text-light dark:text-white">
                        #YS2024001
                      </p>
                      <span className="rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-semibold text-success">
                        Đã giao
                      </span>
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <p className="text-xs text-subtle-light dark:text-gray-400">
                        01/05/2024
                      </p>
                      <p className="text-base font-bold text-text-light dark:text-white">
                        2.550.000đ
                      </p>
                    </div>
                  </div>
                  {/* <!-- Other Order Cards --> */}
                  <div className="cursor-pointer rounded-lg border border-gray-200 p-4 hover:border-primary/50 hover:bg-surface-light dark:border-gray-700 dark:hover:border-primary/50 dark:hover:bg-surface-dark/50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-text-light dark:text-white">
                        #YS2024002
                      </p>
                      <span className="rounded-full bg-info/20 px-2.5 py-0.5 text-xs font-semibold text-info">
                        Đang giao
                      </span>
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <p className="text-xs text-subtle-light dark:text-gray-400">
                        28/04/2024
                      </p>
                      <p className="text-base font-bold text-text-light dark:text-white">
                        1.800.000đ
                      </p>
                    </div>
                  </div>
                  <div className="cursor-pointer rounded-lg border border-gray-200 p-4 hover:border-primary/50 hover:bg-surface-light dark:border-gray-700 dark:hover:border-primary/50 dark:hover:bg-surface-dark/50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-text-light dark:text-white">
                        #YS2023985
                      </p>
                      <span className="rounded-full bg-danger/20 px-2.5 py-0.5 text-xs font-semibold text-danger">
                        Đã hủy
                      </span>
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <p className="text-xs text-subtle-light dark:text-gray-400">
                        15/04/2024
                      </p>
                      <p className="text-base font-bold text-text-light dark:text-white">
                        950.000đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Order Details Panel --> */}
              <div className="rounded-lg border border-gray-200/80 p-6 xl:col-span-2 dark:border-gray-700/80 dark:bg-surface-dark">
                {/* <!-- Header --> */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-bold text-text-light dark:text-white">
                      Chi tiết đơn hàng #YS2024001
                    </h2>
                    <p className="text-sm text-subtle-light dark:text-gray-400">
                      Đặt hàng ngày 01 tháng 5, 2024
                    </p>
                  </div>
                  <span className="rounded-full bg-success/20 px-3 py-1 text-sm font-semibold text-success">
                    Đã giao hàng thành công
                  </span>
                </div>
                {/* <!-- Progress Tracker --> */}
                <div className="py-6">
                  <ol className="flex w-full items-center">
                    <li className="flex w-full items-center text-success after:inline-block after:h-0.5 after:w-full after:border-2 after:border-dashed after:border-success">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success text-white">
                        <CheckIcon className="w-5 h-5" />{" "}
                      </div>
                    </li>
                    <li className="flex w-full items-center text-success after:inline-block after:h-0.5 after:w-full after:border-2 after:border-dashed after:border-success">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success text-white">
                        <CheckIcon className="w-5 h-5" />{" "}
                      </div>
                    </li>
                    <li className="flex w-full items-center text-success after:inline-block after:h-0.5 after:w-full after:border-2 after:border-dashed after:border-success">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success text-white">
                        <CheckIcon className="w-5 h-5" />{" "}
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success text-white">
                        <CheckIcon className="w-5 h-5" />{" "}
                      </div>
                    </li>
                  </ol>
                  <ol className="mt-2 grid grid-cols-4 text-center text-xs font-medium text-subtle-light dark:text-gray-400">
                    <li className="text-success">Đã đặt</li>
                    <li className="text-success">Đã xác nhận</li>
                    <li className="text-success">Đang giao</li>
                    <li className="text-success">Đã giao</li>
                  </ol>
                </div>
                {/* <!-- Info Sections --> */}
                <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-6 sm:grid-cols-2 dark:border-gray-700">
                  {/* <!-- Customer Info --> */}
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-text-light dark:text-white">
                      Thông tin khách hàng
                    </h3>
                    <p className="text-sm text-subtle-light dark:text-gray-300">
                      Nguyễn Văn A
                    </p>
                    <p className="text-sm text-subtle-light dark:text-gray-300">
                      0987 654 321
                    </p>
                    <p className="mt-1 text-sm text-subtle-light dark:text-gray-300">
                      123 Đường ABC, Phường 4, Quận 5, Thành phố Hồ Chí Minh
                    </p>
                  </div>
                  {/* <!-- Payment Info --> */}
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-text-light dark:text-white">
                      Thông tin thanh toán
                    </h3>
                    <p className="text-sm text-subtle-light dark:text-gray-300">
                      Thanh toán khi nhận hàng (COD)
                    </p>
                    <p className="text-sm text-subtle-light dark:text-gray-300">
                      Trạng thái:{" "}
                      <span className="font-medium text-success">
                        Đã thanh toán
                      </span>
                    </p>
                  </div>
                </div>
                {/* <!-- Product List --> */}
                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h3 className="mb-4 text-base font-semibold text-text-light dark:text-white">
                    Sản phẩm đã đặt
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="aspect-square w-16 shrink-0 overflow-hidden rounded-lg bg-surface-light dark:bg-gray-800">
                        <img
                          alt="Bird's nest in a bowl"
                          className="h-full w-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlIKakh7_I94eoBdEkfpHRez_Qr---ZMsBH3ldnGOYMfNcOmvT8UsRLF9unctDQ0bXjBHvfbeKeLFDae3INyv0uSu5qdtp6YpFXOkBtsF6_1y6E5hskqcQwf_XItgocx2Dk7pPZBd9guJyEdR12t9FjuprENcJABR7hL3CLxw54eSAVHRdWDWtgKEC_ixYIFTBwjXOyUojk32Rz_j7BnBk8VBuudcrakOG5YhJarpM3XwzA6jc-1PHVmv2M5EhBh8XFv3j_fo4RHY"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-text-light dark:text-white">
                          Yến Tinh Chế Thượng Hạng
                        </p>
                        <p className="text-sm text-subtle-light dark:text-gray-400">
                          Số lượng: 1
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-text-light dark:text-white">
                        1.800.000đ
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="aspect-square w-16 shrink-0 overflow-hidden rounded-lg bg-surface-light dark:bg-gray-800">
                        <img
                          alt="Bird's nest soup"
                          className="h-full w-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR_CtMlfBtEIXdvI4vVY0YLPrndAFa9uaEazGych-PyzhFWrG9bPp4y44N3I1zmg28hiGU0tVgc88cl2L8-GtUxa5hmxPFLX60_zQ3WkBUglUFiQpFcUYI2rcfGogeF7ZJR3v02nC1eXJXcd0WL66VcmuncHJYaComUziq-MN2uAN1bqXxdJt_XXvxCCTEfTZ-94tcECuls5efRtqpGFA-Uucse22RWiPHcCSST8oDtIqgfVwAllu98iT1MdA8TNz4MMW8LICNmGE"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-text-light dark:text-white">
                          Yến Hũ Chưng Sẵn (Lốc 6)
                        </p>
                        <p className="text-sm text-subtle-light dark:text-gray-400">
                          Số lượng: 1
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-text-light dark:text-white">
                        750.000đ
                      </p>
                    </li>
                  </ul>
                </div>
                {/* <!-- Payment Summary --> */}
                <div className="mt-6 space-y-2 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div className="flex justify-between text-sm text-subtle-light dark:text-gray-300">
                    <span>Tổng tiền hàng</span>
                    <span>2.550.000đ</span>
                  </div>
                  <div className="flex justify-between text-sm text-subtle-light dark:text-gray-300">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-sm text-subtle-light dark:text-gray-300">
                    <span>Giảm giá</span>
                    <span>0đ</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-text-light dark:text-white">
                    <span>Tổng cộng</span>
                    <span>2.550.000đ</span>
                  </div>
                </div>
                {/* <!-- Action Buttons --> */}
                <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm hover:bg-primary/90">
                    <ArrowPathIcon className="w-5 h-5" /> Mua lại
                  </button>
                  <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-background-light-secondary px-5 text-sm font-bold text-text-light hover:bg-surface-light dark:border-gray-600 dark:bg-surface-dark dark:text-gray-200 dark:hover:bg-gray-700">
                    <ReceiptPercentIcon className="w-5 h-5" />
                    Xem hóa đơn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default page;
