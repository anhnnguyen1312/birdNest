"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
export default function OAuthLandingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { refreshUser } = useUser();
  useEffect(() => {
    async function handleOAuthLanding() {
      try {
        console.log("OAuth landing page: calling API...");

        // Gọi API để xử lý OAuth tokens
        const response = await fetch("/api/auth/oauth/landing", {
          method: "GET",
          credentials: "include",
        });
        console.log("response", response);
        if (!response.ok) {
          throw new Error("Failed to process OAuth tokens");
        }

        console.log("OAuth landing page: API call successful");

        // API sẽ tự redirect, nhưng để đảm bảo:
        console.log("chuẩn bị refreshUser");
        refreshUser();
        console.log("đã refreshUser");

        setTimeout(() => {
          router.replace("/");
        }, 500);
      } catch (err) {
        console.error("OAuth landing page error:", err);
        setError("Có lỗi xảy ra khi xử lý đăng nhập OAuth");
        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      }
    }

    handleOAuthLanding();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Lỗi đăng nhập
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Đang chuyển hướng về trang đăng nhập...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Đang xử lý đăng nhập
        </h2>
        <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
        <p className="text-sm text-gray-500 mt-4">
          Chúng tôi đang hoàn tất quá trình đăng nhập OAuth của bạn
        </p>
      </div>
    </div>
  );
}
