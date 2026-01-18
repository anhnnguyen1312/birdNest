"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

import "./global.css";
import "@/styles/Global.scss";
import { AppProvider } from "@/context/AppProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Yến Sào Tinh Hoa",
//   description: "Yến Sào Tinh Hoa",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Lớp `.dark` sẽ được thêm/bỏ bởi `ThemeProvider` thông qua `document.documentElement`
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
