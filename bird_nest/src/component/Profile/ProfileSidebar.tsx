"use client";

import {
  UserIcon,
  ReceiptPercentIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { User } from "@/context/UserContext";

type ProfileTab = "info" | "orders" | "address" | "security";

interface ProfileSidebarProps {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
  user: User;
}

export default function ProfileSidebar({
  activeTab,
  setActiveTab,
  user,
}: ProfileSidebarProps) {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems = [
    {
      id: "info" as ProfileTab,
      label: "Thông tin cá nhân",
      icon: UserIcon,
    },
    {
      id: "orders" as ProfileTab,
      label: "Lịch sử đơn hàng",
      icon: ReceiptPercentIcon,
    },
    {
      id: "address" as ProfileTab,
      label: "Địa chỉ",
      icon: MapPinIcon,
    },
    {
      id: "security" as ProfileTab,
      label: "Bảo mật",
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-[#e6e3db] dark:border-[#3a3321] p-6 shadow-sm">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#e6e3db] dark:border-[#3a3321]">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-[#181611] dark:text-gray-100 truncate">
              {user.username}
            </h2>
            <p className="text-sm text-primary font-medium">Thành viên</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/20 text-primary dark:bg-primary/30"
                    : "text-[#181611] dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-2"
          >
            <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
