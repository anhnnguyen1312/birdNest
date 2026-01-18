"use client";
import { CustomOrderTypeFull } from "@/types";
import Link from "next/link";

export default function Order({ order }: { order: CustomOrderTypeFull }) {
  if (!order || !order.id) {
    return <div className="flex flex-1">Không có dữ liệu đơn hàng !!!</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
        {/* SUCCESS HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-green-600">
            🎉 Đặt hàng thành công
          </h1>
          <p className="text-gray-600 mt-2">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
          </p>
        </div>

        {/* CUSTOMER INFO */}
        <div className="border rounded-lg p-4 mb-4">
          <h2 className="font-semibold mb-2">Thông tin nhận hàng</h2>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {order.phone}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {order.address}
          </p>
          <p>
            <strong>Thanh toán:</strong>{" "}
            {order.paymentMethod === "cod"
              ? "Thanh toán khi nhận hàng"
              : order.paymentMethod}
          </p>
        </div>

        {/* ORDER ITEMS */}
        <div className="border rounded-lg p-4 mb-4">
          <h2 className="font-semibold mb-3">Sản phẩm đã đặt</h2>

          {order?.OrderItems?.map((item, index) => (
            <div
              key={index}
              className="flex  justify-center  gap-1.5 border-b last:border-b-0 py-2"
            >
              <div className="relative">
                <img
                  className="w-16 h-16 rounded-lg object-cover"
                  alt={item.product.name}
                  src={item.product.imageUrlThumb}
                />
              </div>
              <div className=" flex-1 flex  text-left flex-col">
                <p className="font-medium">{item.product.name}</p>
                {/* <p className="text-sm text-gray-500">
                  Phân loại: {item.product}
                </p> */}
              </div>

              <div className="text-right flex-1 flex items-center flex-col">
                <p className="font-medium">{item.price.toLocaleString()}₫</p>

                <p className="text-sm text-gray-500">X {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="border rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-1">
            <span>Tổng số lượng</span>
            <span>{order.totalQuantity}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg text-primary">
            <span>Tổng tiền</span>
            <span>{order.totalPrice.toLocaleString()}₫</span>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-center">
          <Link
            href="/products"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
