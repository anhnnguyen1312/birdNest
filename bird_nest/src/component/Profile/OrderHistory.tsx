"use client";

import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

type OrderStatus =
  | "all"
  | "pending"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled"
  | "returned";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
  shippingAddress: string;
  shipperName?: string;
  shipperPhone?: string;
  trackingNumber?: string;
}

interface OrderHistoryProps {
  userId: number;
}

export default function OrderHistory({ userId }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock data - Replace with API call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/orders?userId=${userId}`);
        // const data = await response.json();

        // Mock data
        const mockOrders: Order[] = [
          {
            id: "1",
            orderNumber: "ORD-2024-001",
            date: "2024-01-15",
            status: "delivered",
            total: 2500000,
            items: 3,
            shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
            shipperName: "Nguyễn Văn A",
            shipperPhone: "0912345678",
            trackingNumber: "VN123456789",
          },
          {
            id: "2",
            orderNumber: "ORD-2024-002",
            date: "2024-01-20",
            status: "shipping",
            total: 1800000,
            items: 2,
            shippingAddress: "456 Đường XYZ, Quận 2, TP.HCM",
            shipperName: "Trần Thị B",
            shipperPhone: "0923456789",
            trackingNumber: "VN987654321",
          },
          {
            id: "3",
            orderNumber: "ORD-2024-003",
            date: "2024-01-25",
            status: "processing",
            total: 3200000,
            items: 4,
            shippingAddress: "789 Đường DEF, Quận 3, TP.HCM",
          },
          {
            id: "4",
            orderNumber: "ORD-2024-004",
            date: "2024-01-10",
            status: "returned",
            total: 1500000,
            items: 1,
            shippingAddress: "321 Đường GHI, Quận 4, TP.HCM",
          },
        ];

        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // Filter orders
  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.shippingAddress
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [orders, selectedStatus, searchQuery]);

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return {
          label: "Chờ xử lý",
          icon: ClockIcon,
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        };
      case "processing":
        return {
          label: "Đang xử lý",
          icon: ArrowPathIcon,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
        };
      case "shipping":
        return {
          label: "Đang giao hàng",
          icon: TruckIcon,
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-50 dark:bg-purple-900/20",
        };
      case "delivered":
        return {
          label: "Đã giao",
          icon: CheckCircleIcon,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/20",
        };
      case "cancelled":
        return {
          label: "Đã hủy",
          icon: XCircleIcon,
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-50 dark:bg-red-900/20",
        };
      case "returned":
        return {
          label: "Đã trả hàng",
          icon: ArrowPathIcon,
          color: "text-orange-600 dark:text-orange-400",
          bgColor: "bg-orange-50 dark:bg-orange-900/20",
        };
      default:
        return {
          label: "Tất cả",
          icon: ClockIcon,
          color: "text-gray-600 dark:text-gray-400",
          bgColor: "bg-gray-50 dark:bg-gray-900/20",
        };
    }
  };

  const statusFilters: OrderStatus[] = [
    "all",
    "pending",
    "processing",
    "shipping",
    "delivered",
    "cancelled",
    "returned",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[#181611] dark:text-gray-100 mb-2">
          Lịch Sử Đơn Hàng
        </h1>
        <p className="text-[#897f61] dark:text-gray-400">
          Xem và quản lý tất cả các đơn hàng của bạn
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] p-6 shadow-sm">
        {/* Search */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#897f61] dark:text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã đơn hàng, địa chỉ..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((status) => {
            const statusInfo = getStatusInfo(status);
            const Icon = statusInfo.icon;
            const isActive = selectedStatus === status;

            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/20 text-primary dark:bg-primary/30"
                    : "bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                {statusInfo.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-[#897f61] dark:text-gray-400">Đang tải...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] p-12 text-center shadow-sm">
          <p className="text-[#897f61] dark:text-gray-400 text-lg">
            Không tìm thấy đơn hàng nào
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-background-dark/50 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-bold text-[#181611] dark:text-gray-100">
                        {order.orderNumber}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color} ${statusInfo.bgColor}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-[#897f61] dark:text-gray-400">
                      <p>
                        Ngày đặt:{" "}
                        {new Date(order.date).toLocaleDateString("vi-VN")}
                      </p>
                      <p>Địa chỉ: {order.shippingAddress}</p>
                      <p>{order.items} sản phẩm</p>
                      {order.status === "shipping" && order.shipperName && (
                        <div className="mt-2 pt-2 border-t border-[#e6e3db] dark:border-[#3a3321]">
                          <p className="font-semibold text-[#181611] dark:text-gray-200">
                            Thông tin shipper:
                          </p>
                          <p>Tên: {order.shipperName}</p>
                          <p>Điện thoại: {order.shipperPhone}</p>
                          {order.trackingNumber && (
                            <p>Mã vận đơn: {order.trackingNumber}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary mb-2">
                      {order.total.toLocaleString("vi-VN")}₫
                    </p>
                    <button className="text-sm text-primary hover:underline font-medium">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-background-dark rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#181611] dark:text-gray-100">
                Chi tiết đơn hàng
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#897f61] dark:text-gray-400 hover:text-[#181611] dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            {/* Order detail content here */}
            <p className="text-[#897f61] dark:text-gray-400">
              Mã đơn: {selectedOrder.orderNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
