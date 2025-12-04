import React from "react";

function ProductItem() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center p-4">
      <div className="col-span-1 md:col-span-3 flex items-start gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg h-20 w-20 flex-shrink-0"
          data-alt="Yến Tinh Chế Thượng Hạng"
          style={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/aida-public/AB6AXuAcPrg9qv0EkZyR1C_Rp6LXaoULC48WpbjpxKm643f5Dsu7UfbwadH-lEFb33DWGNcjlOp6ymedLluUVmT6wN00y33D4YKYARPv4GtBS5YnpUPQSJPcZo1YeoSpUwdx9M1u0l3OXPrFS_UfIjVzKKYEswPRjz6tcoK9srMKeArdJge0TZxj6Dz5VoGfhw84SOG3n3rVpeyOK4CO38cE3ZGZ4-MQedBALleBkRqa-hsKeSyQ-SAB352KlnQnWRK3TqcVSfqR-I4ye6A)",
          }}
        ></div>
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-[#181611] dark:text-gray-200 text-base font-medium leading-normal">
            Yến Tinh Chế Thượng Hạng
          </p>
          <p className="text-[#897f61] dark:text-gray-400 text-sm font-normal leading-normal">
            Loại: Yến tinh chế, 100g
          </p>
          <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm mt-1 flex items-center gap-1 md:hidden">
            <span className="material-symbols-outlined text-sm">delete</span>{" "}
            Xóa
          </button>
        </div>
      </div>
      <div className="text-left md:text-center text-[#897f61] dark:text-gray-400">
        <span className="md:hidden font-medium text-[#181611] dark:text-gray-200">
          Đơn giá:{" "}
        </span>
        3,500,000đ
      </div>
      <div className="flex justify-start md:justify-center">
        <div className="flex items-center gap-2 text-[#181611] dark:text-gray-200">
          <button className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f3f0] dark:bg-gray-700 cursor-pointer">
            -
          </button>
          <input
            className="text-base font-medium leading-normal w-6 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none"
            type="number"
            value="1"
          />
          <button className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f3f0] dark:bg-gray-700 cursor-pointer">
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center md:justify-end">
        <p className="md:hidden font-medium text-[#181611] dark:text-gray-200">
          Thành tiền:
        </p>
        <p className="text-right text-[#181611] dark:text-gray-200 font-bold">
          3,500,000đ
        </p>
        <button className="hidden md:flex text-gray-400 hover:text-red-500 dark:hover:text-red-400 ml-4">
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
