"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ChatBubbleBottomCenterTextIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import SearchInput from "@/component/SearchInput";
import { env } from "process";

export default function Header() {
  const { user, loading, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { cartCount, refreshCart } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Lắng nghe event cartUpdated để refresh cart count
  useEffect(() => {
    const handleCartUpdate = () => {
      refreshCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [refreshCart]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-solid border-b-[#f4f3f0] dark:border-b-[#3a3321]">
      {/* <div className="bg-white text-black dark:bg-black dark:text-white">
        Hello Tailwind v4
      </div> */}{" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Image
                alt="Yến Sào Tinh Hoa Logo"
                className="h-10 w-auto"
                src={process.env.NEXT_PUBLIC_ADMIN_LOGO_URL ?? ""}
                width={120}
                height={40}
                unoptimized
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                className="text-primary text-sm font-bold leading-normal"
                href="/home"
              >
                {" "}
                Trang chủ{" "}
              </Link>

              <Link
                className="text-[#181611] dark:text-background-light hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
                href="/products"
              >
                {" "}
                Sản phẩm
              </Link>
              <Link
                className="text-[#181611] dark:text-background-light hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
                href="/about"
              >
                {" "}
                Giới thiệu
              </Link>

              <Link
                className="text-[#181611] dark:text-background-light hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
                href="/blog"
              >
                {" "}
                Tin tức
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
            <div className=" md:flex-1 md:flex hidden flex-col min-w-40 !h-10 max-w-64">
              <SearchInput />
            </div>
            <div className="flex gap-2 items-center">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>

              {/* <Link
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                href="/likes"
              >
                {" "}
                <HeartIcon className="h-6 w-6" />
              </Link> */}
              <Link
                className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                href="/cart"
                aria-label="Cart"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
              <Link
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                href="/chat"
                aria-label="Chat"
              >
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
              </Link>
              <Link
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                href="/create-blog"
                aria-label="Chat"
              >
                <PlusCircleIcon className="h-6 w-6" />
              </Link>

              {/* User Menu */}
              {loading ? (
                <div className="flex items-center justify-center rounded-lg h-10 w-10 bg-transparent animate-pulse">
                  <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
              ) : user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg h-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm font-medium">
                      {user.username}
                    </span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-background-light dark:bg-background-dark border border-[#e6e3db] dark:border-[#3a3321] rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-[#e6e3db] dark:border-[#3a3321]">
                        <p className="text-sm font-semibold text-[#181611] dark:text-background-light">
                          {user.username}
                        </p>
                        <p className="text-xs text-[#897f61] dark:text-gray-400">
                          ID: {user.id}
                        </p>
                      </div>
                      <Link
                        aria-label="profile"
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#181611] dark:text-background-light hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserIcon className="h-5 w-5" />
                        Hồ sơ
                      </Link>
                      <button
                        onClick={handleLogout}
                        aria-label="logout"
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                  href="/login"
                  aria-label="login"
                >
                  {" "}
                  <UserIcon className="h-6 w-6" />
                </Link>
              )}
            </div>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-base hover:bg-neutral-secondary-soft"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={` ${
            open ? "block" : "hidden"
          } items-center justify-between  w-full md:hidden`}
        >
          {/* <div className="relative mt-3 md:hidden"> */}
          {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-1"
              className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-2.5 py-2 shadow-xs placeholder:text-body"
              placeholder="Search"
            /> */}
          {/* <div className="flex items-center pointer-events-none  "> */}
          <SearchInput
            className={" block w-full py-2.5   px-2.5  shadow-xs "}
          />
          {/* </div> */}
          {/* </div> */}
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-border-light dark:border-border-dark rounded-2xl bg-background-light dark:bg-background-dark md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 ">
            <li>
              <Link
                className="block py-2 px-3 text-heading dark:bg-background-dark text-primary rounded hover:bg-background-light md:hover:bg-background-light md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                href="/home"
              >
                {" "}
                Trang chủ{" "}
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-heading dark:bg-background-dark text-primary rounded hover:bg-background-light md:hover:bg-background-light md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                href="/products"
              >
                {" "}
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-heading dark:bg-background-dark text-primary rounded hover:bg-background-light md:hover:bg-background-light md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                href="/about"
              >
                {" "}
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-heading dark:bg-background-dark text-primary rounded hover:bg-background-light md:hover:bg-background-light md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                href="/blog"
              >
                {" "}
                Tin tức
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-heading dark:bg-background-dark text-primary rounded hover:bg-background-light md:hover:bg-background-light md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                href="/chat"
              >
                {" "}
                Tư Vấn
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-heading dark:bg-background-dark text-primary rounded hover:bg-background-light md:hover:bg-background-light md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                href="/create-blog"
              >
                {" "}
                Đăng bài
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-heading dark:bg-background-dark text-primary rounded hover:bg-background-light md:hover:bg-background-light md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                href="/profile"
              >
                {" "}
                Trang cá nhân
              </Link>
            </li>{" "}
            <li>
              <button
                className="block py-2 px-3 text-heading dark:bg-background-dark text-primary rounded hover:bg-background-light md:hover:bg-background-light md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                onClick={logout}
              >
                {" "}
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Menu */}
      {/* <div className={`w-full md:flex md:w-auto ${open ? "block" : "hidden"}`}>
        <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
          <li>
            <a href="#" className="block py-2 text-heading">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 text-heading">
              About
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 text-heading">
              Services
            </a>
          </li>
        </ul>
      </div> */}
    </header>
  );
}
