"use client";

import { useState } from "react";
import { User } from "@/context/UserContext";
import {
  LockClosedIcon,
  KeyIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface SecuritySettingsProps {
  user: User;
}

export default function SecuritySettings({ user }: SecuritySettingsProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không khớp");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      setIsChangingPassword(true);
      // TODO: Call API to change password
      // const response = await fetch('/api/user/change-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     currentPassword,
      //     newPassword
      //   })
      // });

      // if (response.ok) {
      //   setSuccess('Đổi mật khẩu thành công');
      //   setCurrentPassword('');
      //   setNewPassword('');
      //   setConfirmPassword('');
      // } else {
      //   setError('Mật khẩu hiện tại không đúng');
      // }

      // Mock success
      setTimeout(() => {
        setSuccess("Đổi mật khẩu thành công");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsChangingPassword(false);
      }, 1000);
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Có lỗi xảy ra khi đổi mật khẩu");
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[#181611] dark:text-gray-100 mb-2">
          Bảo Mật Tài Khoản
        </h1>
        <p className="text-[#897f61] dark:text-gray-400">
          Quản lý mật khẩu và bảo mật tài khoản của bạn
        </p>
      </div>

      {/* Change Password */}
      <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center">
            <LockClosedIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#181611] dark:text-gray-100">
              Đổi Mật Khẩu
            </h2>
            <p className="text-sm text-[#897f61] dark:text-gray-400">
              Thay đổi mật khẩu để bảo vệ tài khoản của bạn
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-600 dark:text-green-400">
              {success}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#181611] dark:text-gray-100">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#897f61] dark:text-gray-400" />
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[#181611] dark:text-gray-100">
              Mật khẩu mới
            </label>
            <div className="relative">
              <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#897f61] dark:text-gray-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[#181611] dark:text-gray-100">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#897f61] dark:text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark text-[#181611] dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            disabled={isChangingPassword}
            className="w-full px-6 py-3 rounded-lg bg-primary text-[#181611] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChangingPassword ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-xl border border-primary/20 dark:border-primary/30 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheckIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-[#181611] dark:text-gray-100 mb-2">
              Mẹo bảo mật tài khoản
            </h3>
            <ul className="space-y-1 text-sm text-[#897f61] dark:text-gray-400">
              <li>• Sử dụng mật khẩu mạnh với ít nhất 8 ký tự</li>
              <li>• Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
              <li>• Không chia sẻ mật khẩu với người khác</li>
              <li>• Đổi mật khẩu định kỳ để bảo vệ tài khoản</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
