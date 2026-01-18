"use client";
import { signOut } from "next-auth/react";

import fetchWithAuth from "@/helper/fetchWithAuth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface User {
  role: string;
  id: number;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (userData: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user info từ API

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if we're on OAuth landing page
      // const isOAuthPage = window.location.pathname === "/oauth/landingPage";

      // if (isOAuthPage) {
      //   console.log(
      //     "UserContext: On OAuth landing page, skipping fetch until redirect"
      //   );
      //   // Don't fetch user info while on landing page
      //   // The API will redirect to home after setting tokens
      //   setUser(null);
      //   return;
      // }
      //
      console.log("fetch user ne");
      const res = await fetchWithAuth("/api/auth-backend/me");

      if (!res.ok) {
        if (res.status === 401) {
          // Không có token hoặc token hết hạn
          setUser(null);
          return;
        }
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      console.log(" đã fetch user cong ne", data.user);

      if (data.error === 0 && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Không thể tải thông tin user");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user khi component mount
  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setError(null);
  };

  const logout = async () => {
    try {
      // Có thể gọi API logout ở đây nếu cần
      // await fetch("/api/auth-backend/logout", { method: "POST" });

      // Xóa cookies
      // document.cookie =
      //   "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      // document.cookie =
      //   "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      await signOut({
        redirect: false, // không cho NextAuth tự redirect
      });
      const res = await fetch("/api/auth-backend/logout", {
        method: "POST",
        credentials: "include", // 🔴 BẮT BUỘC
      });
      const data = await res.json();
      console.log("Logout response:", data);
      if (res.ok) {
        setUser(null);
        setError(null);

        // Redirect về trang login
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", data);
        alert("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
