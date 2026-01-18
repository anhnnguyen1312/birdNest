"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import ProfileSidebar from "./ProfileSidebar";
import ProfileInfo from "./ProfileInfo";
import OrderHistory from "./OrderHistory";
import AddressManagement from "./AddressManagement";
import SecuritySettings from "./SecuritySettings";
import OrderManage from "./OrderManage";

type ProfileTab = "info" | "orders" | "address" | "security";

export default function ProfileClient() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProfileTab>("info");

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [user, userLoading, router]);

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-[#897f61] dark:text-gray-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-background-light-secondary dark:bg-background-dark font-display text-[#181611] dark:text-gray-200 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <main className="layout-container flex h-full grow flex-col">
          <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <ProfileSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                user={user}
              />

              {/* Main Content */}
              <div className="flex-1">
                {activeTab === "info" && <ProfileInfo user={user} />}
                {/* {activeTab === "orders" && <OrderHistory userId={user.id} />} */}
                {activeTab === "orders" && <OrderManage />}

                {activeTab === "address" && (
                  <AddressManagement userId={user.id} />
                )}
                {activeTab === "security" && <SecuritySettings user={user} />}
                {activeTab === "security" && <OrderManage />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
