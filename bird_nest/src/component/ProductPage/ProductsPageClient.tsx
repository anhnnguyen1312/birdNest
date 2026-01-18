"use client";

import React, { Suspense } from "react";
import SideBar from "@/component/ProductPage/SideBar";
import ProductList from "@/component/ProductPage/ProductList";
import { ProductFilterProvider } from "@/context/ProductFilterContext";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";

function ProductsContent({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  return (
    <ProductFilterProvider>
      <div className="font-display bg-background-light-secondary dark:bg-background-dark text-[#181611] dark:text-[#f8f7f6]">
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <main className="mx-auto w-full max-w-7xl px-4 py-8">
              {/* Search Results Header */}
              {searchQuery && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#181611] dark:text-gray-100">
                    Kết quả tìm kiếm cho: "{searchQuery}"
                  </h2>
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* <!-- Sidebar Filters --> */}
                <SideBar />
                {/* <!-- Product Listing --> */}
                <ProductList
                  initialProducts={initialProducts}
                  searchQuery={searchQuery || undefined}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProductFilterProvider>
  );
}

interface ProductsPageClientProps {
  initialProducts: Product[];
}

export default function ProductsPageClient({
  initialProducts,
}: ProductsPageClientProps) {
  return (
    //<Suspense fallback={<div>Loading...</div>}>
    <ProductsContent initialProducts={initialProducts} />
    // </Suspense>
  );
}
