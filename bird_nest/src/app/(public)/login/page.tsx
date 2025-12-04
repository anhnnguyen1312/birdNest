"use client";

import React, { useState, useRef, useEffect } from "react";

type Mode = "login" | "signup";

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  //spread là toán tử để lấy ra hết phần tử trong ảng hoặc obj sau đó gán vào 1 biến mới
  //a: imutable
  // b là mutable
  const a = { a: 1, b: 2, c: 3 };
  const newobj = { ...a, d: 4 };
  // b.push(4);

  console.log(newobj);

  // rest là toán tử để lấy tất cả phần tử còn lại gom lại vào 1 biến, ngược lại với spread
  const restArr = [1, 2, 3];
  const newarr = [1, ...restArr, 4, 5];
  const restObj = { o: 1, b: 2, c: 3 };
  const { o, ...rest } = restObj; // Destructure để lấy a (đổi tên thành aProp) và phần còn lại vào rest
  // const newobj2 = { a: aProp, ...rest };
  // console.log(newobj2);
  console.log(rest, o);

  useEffect(() => {
    usernameRef.current?.focus();
  }, [mode]);

  // basic validate (can replace with lib like zod/yup)
  function validate() {
    if (!username.trim()) {
      setError("Vui lòng nhập tên đăng nhập.");
      usernameRef.current?.focus();
      return false;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu.");
      return false;
    }
    if (mode === "signup" && password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return false;
    }
    setError(null);
    return true;
  }

  async function handleSubmit(e?: React.FormEvent | React.KeyboardEvent) {
    if (e) e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);

    try {
      const url = mode === "login" ? "/api/auth/signin" : "/api/auth/signup";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      } else {
        // handle login success (redirect, store token, etc.)
        setError(null);
        // Nếu là đăng ký thành công thì tự động đăng nhập luôn
        if (mode === "signup") {
          // Sau khi đăng ký thành công, gọi luôn API đăng nhập và xử lý như login
          const loginRes = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
          const loginData = await loginRes.json();

          if (!loginRes.ok || loginData.error) {
            setError(
              loginData.message ||
                "Đăng ký thành công nhưng đăng nhập thất bại."
            );
            return;
          }
        }
        // Lưu thông tin session vào localStorage (hoặc context, tùy nhu cầu)

        // Redirect tới trang chính (trang chủ)
        window.location.href = "/";
      }
    } catch (err) {
      setError("Kết nối máy chủ thất bại!");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <div
      className="mx-[20%] sm:mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-2xl xl:max-w-2xl w-full flex flex-col justify-center min-h-screen
"
    >
      <form
        className="space-y-6 w-full"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-primary dark:text-blue-400 font-display">
          {mode === "login" ? "Đăng nhập" : "Đăng ký"}
        </h2>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="font-medium text-gray-700 dark:text-gray-100"
          >
            Tên đăng nhập
          </label>
          <input
            id="username"
            type="text"
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-background-dark-input dark:text-white transition"
            autoCorrect="off"
            autoComplete="username"
            minLength={3}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-medium text-gray-700 dark:text-gray-100"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-background-dark-input dark:text-white transition"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            minLength={6}
          />
        </div>
        {error && (
          <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-bold text-lg transition  bg-primary hover:bg-primary focus:ring-2 focus:ring-primary focus:outline-none shadow ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading
            ? mode === "login"
              ? "Đang đăng nhập..."
              : "Đang đăng ký..."
            : mode === "login"
            ? "Đăng nhập"
            : "Đăng ký"}
        </button>
        <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-200 space-x-1">
          {mode === "login" ? (
            <>
              <span>Bạn chưa có tài khoản?</span>
              <button
                type="button"
                className="text-blue-600 hover:underline"
                disabled={loading}
                onClick={() => {
                  setMode("signup");
                  setError(null);
                  setPassword("");
                }}
              >
                Đăng ký
              </button>
            </>
          ) : (
            <>
              <span>Đã có tài khoản?</span>
              <button
                type="button"
                className="text-blue-600 hover:underline"
                disabled={loading}
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
