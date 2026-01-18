"use client";

import Header from "@/component/Header";
import Footer from "@/component/Home/Footer";
import { AppProvider } from "@/context/AppProvider";

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //<AppProvider>
    <div>
      <Header />
      <main>{children}</main>
      {/* <!-- Footer --> */}
      <Footer />
    </div>
    // </AppProvider>
  );
}
