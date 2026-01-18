"use client";

import { useState, useRef } from "react";
import { User } from "@/context/UserContext";
import { useUser } from "@/context/UserContext";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

interface ProfileInfoProps {
  user: User;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const { refreshUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: "",
    phone: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước ảnh không được vượt quá 5MB");
      return;
    }

    setIsUploading(true);
    try {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);

      // TODO: Upload to server
      // const formData = new FormData();
      // formData.append('avatar', file);
      // const response = await fetch('/api/user/avatar', {
      //   method: 'POST',
      //   body: formData
      // });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Có lỗi xảy ra khi tải ảnh lên");
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      // TODO: Call API to update user info
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // if (response.ok) {
      //   await refreshUser();
      //   setIsEditing(false);
      //   alert('Cập nhật thông tin thành công');
      // }
      alert("Tính năng đang được phát triển");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: "",
      phone: "",
      fullName: "",
      dateOfBirth: "",
      gender: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#181611] dark:text-gray-100 mb-2">
            Thông Tin Cá Nhân
          </h1>
          <p className="text-[#897f61] dark:text-gray-400">
            Quản lý thông tin cá nhân và tài khoản của bạn
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 rounded-lg bg-primary text-[#181611] font-semibold hover:bg-primary/90 transition-colors"
          >
            Chỉnh sửa
          </button>
        )}
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8 pb-8 border-b border-[#e6e3db] dark:border-[#3a3321]">
        <div className="relative">
          <div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-4xl font-bold text-primary overflow-hidden"
            style={{
              backgroundImage: avatar ? `url(${avatar})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!avatar && user.username.charAt(0).toUpperCase()}
          </div>
          {isEditing && (
            <button
              onClick={handleAvatarClick}
              disabled={isUploading}
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
            >
              {isUploading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <CameraIcon className="w-5 h-5" />
              )}
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        {isEditing && (
          <p className="text-sm text-[#897f61] dark:text-gray-400 mt-4 text-center">
            Nhấn vào icon camera để thay đổi ảnh đại diện
          </p>
        )}
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#181611] dark:text-gray-100">
              Tên đăng nhập
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#897f61] dark:text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#181611] dark:text-gray-100">
              Họ và tên
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Nhập họ và tên"
              className="w-full px-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#181611] dark:text-gray-100">
              Email
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#897f61] dark:text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="example@email.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#181611] dark:text-gray-100">
              Số điện thoại
            </label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#897f61] dark:text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="0912345678"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#181611] dark:text-gray-100">
              Ngày sinh
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#181611] dark:text-gray-100">
              Giới tính
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-4 pt-6 border-t border-[#e6e3db] dark:border-[#3a3321]">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 rounded-lg bg-primary text-[#181611] font-semibold hover:bg-primary/90 transition-colors"
            >
              Lưu thay đổi
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-6 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] text-[#181611] dark:text-gray-200 font-semibold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              Hủy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
