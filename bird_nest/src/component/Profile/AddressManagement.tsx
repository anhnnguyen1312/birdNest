"use client";

import { useState, useEffect } from "react";
import {
  MapPinIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
}

interface AddressManagementProps {
  userId: number;
}

export default function AddressManagement({ userId }: AddressManagementProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    isDefault: false,
  });

  useEffect(() => {
    // TODO: Fetch addresses from API
    const mockAddresses: Address[] = [
      {
        id: "1",
        name: "Nguyễn Văn A",
        phone: "0912345678",
        address: "123 Đường ABC",
        ward: "Phường 1",
        district: "Quận 1",
        city: "TP. Hồ Chí Minh",
        isDefault: true,
      },
    ];
    setAddresses(mockAddresses);
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    // TODO: Save address via API
    if (editingId) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...addr, ...formData } : addr
        )
      );
      setEditingId(null);
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
      };
      setAddresses((prev) => [...prev, newAddress]);
      setIsAdding(false);
    }
    setFormData({
      name: "",
      phone: "",
      address: "",
      ward: "",
      district: "",
      city: "",
      isDefault: false,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    }
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setEditingId(address.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#181611] dark:text-gray-100 mb-2">
            Địa Chỉ Giao Hàng
          </h1>
          <p className="text-[#897f61] dark:text-gray-400">
            Quản lý địa chỉ giao hàng của bạn
          </p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-[#181611] font-semibold hover:bg-primary/90 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Thêm địa chỉ
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-[#181611] dark:text-gray-100">
            {editingId ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Họ và tên"
              className="px-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Số điện thoại"
              className="px-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Số nhà, tên đường"
              className="md:col-span-2 px-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleInputChange}
              placeholder="Phường/Xã"
              className="px-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              placeholder="Quận/Huyện"
              className="px-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Tỉnh/Thành phố"
              className="px-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                name="isDefault"
                id="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <label
                htmlFor="isDefault"
                className="text-sm text-[#181611] dark:text-gray-200"
              >
                Đặt làm địa chỉ mặc định
              </label>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 rounded-lg bg-primary text-[#181611] font-semibold hover:bg-primary/90 transition-colors"
            >
              Lưu
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                  name: "",
                  phone: "",
                  address: "",
                  ward: "",
                  district: "",
                  city: "",
                  isDefault: false,
                });
              }}
              className="flex-1 px-6 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] text-[#181611] dark:text-gray-200 font-semibold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white dark:bg-background-dark/50 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <MapPinIcon className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-[#181611] dark:text-gray-100">
                    {address.name}
                  </h3>
                  {address.isDefault && (
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-primary/20 text-primary">
                      Mặc định
                    </span>
                  )}
                </div>
                <p className="text-[#897f61] dark:text-gray-400 mb-1">
                  {address.phone}
                </p>
                <p className="text-[#897f61] dark:text-gray-400">
                  {address.address}, {address.ward}, {address.district},{" "}
                  {address.city}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-primary" />
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
