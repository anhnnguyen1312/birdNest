"use client";

import React from "react";
import SideBar from "@/component/ProductPage/SideBar";
import ProductList from "@/component/ProductPage/ProductList";
import { ProductFilterProvider } from "@/context/ProductFilterContext";
import { Product } from "@/types";

interface ProductsPageClientProps {
  initialProducts: Product[];
}

export default function ProductsPageClient({
  initialProducts,
}: ProductsPageClientProps) {
  return (
    <ProductFilterProvider>
      <div className="font-display bg-background-light-secondary dark:bg-background-dark-product text-[#181611] dark:text-[#f8f7f6]">
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <main className="mx-auto w-full max-w-7xl px-4 py-8">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* <!-- Sidebar Filters --> */}
                <SideBar />
                {/* <!-- Product Listing --> */}
                <ProductList initialProducts={initialProducts} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProductFilterProvider>
  );
}
