"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import ProductItem from "./ProductItem";
import { Product } from "@/types/index";
import Link from "next/link";

type SortOption = "newest" | "price_asc" | "price_desc";

type CategoryFilter =
  | "all"
  | "yen_tho"
  | "yen_tinh_che"
  | "yen_baby"
  | "yen_chung_san";

const PAGE_SIZE = 12;

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Gọi API lấy danh sách sản phẩm (client-side, interactive)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/products/all_products");

        if (!res.ok) {
          throw new Error(`Fetch failed with status ${res.status}`);
        }

        const data = await res.json();
        const listProducts: Product[] =
          data.error === 0 && Array.isArray(data.products) ? data.products : [];

        setProducts(listProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Xử lý filter theo category
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter !== "all") {
      result = result.filter((product) => {
        // Map categoryFilter sang giá trị category thực tế trong DB
        switch (categoryFilter) {
          case "yen_tho":
            return product.category === "Yến thô";
          case "yen_tinh_che":
            return product.category === "Yến tinh chế";
          case "yen_baby":
            return product.category === "Yến baby";
          case "yen_chung_san":
            return product.category === "Yến chưng sẵn";
          default:
            return true;
        }
      });
    }

    // Sắp xếp
    result.sort((a, b) => {
      if (sortOption === "price_asc") {
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      }
      if (sortOption === "price_desc") {
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      }

      // "newest" - dựa vào createdAt
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [products, categoryFilter, sortOption]);

  // Phân trang
  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  // Handlers
  const handleChangeSort = (value: SortOption) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handleChangeCategory = (value: CategoryFilter) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const isActiveCategory = (value: CategoryFilter) =>
    categoryFilter === value
      ? "bg-primary/20 text-[#181611] dark:text-[#f8f7f6]"
      : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10";

  return (
    <div className="flex-1">
      <div className="flex flex-wrap gap-2 mb-2">
        <Link
          className="text-[#897f61] dark:text-[#a19b85] text-sm font-medium leading-normal"
          href="/home"
        >
          Trang chủ
        </Link>

        <span className="text-[#897f61] dark:text-[#a19b85] text-sm font-medium leading-normal">
          /
        </span>
        <span className="text-sm font-medium leading-normal">Sản phẩm</span>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-baseline gap-3 mb-4">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
          Sản Phẩm Yến Sào
        </h1>
        <p className="text-sm text-[#897f61] dark:text-[#a19b85] shrink-0">
          {totalProducts > 0
            ? `Hiển thị ${Math.min(
                PAGE_SIZE,
                totalProducts - (currentPage - 1) * PAGE_SIZE
              )} trên ${totalProducts} sản phẩm`
            : "Không có sản phẩm nào"}
        </p>
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -ml-2 pl-2">
        {/* Sort */}
        <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/20 text-[#181611] dark:text-[#f8f7f6] pl-4 pr-2">
          <p className="text-sm font-semibold whitespace-nowrap">Sắp xếp:</p>
          <select
            className="bg-transparent outline-none text-sm font-medium"
            value={sortOption}
            onChange={(e) => handleChangeSort(e.target.value as SortOption)}
          >
            <option className="text-black" value="newest">
              Mới nhất
            </option>
            <option className="text-black" value="price_asc">
              Giá tăng dần
            </option>
            <option className="text-black" value="price_desc">
              Giá giảm dần
            </option>
          </select>
        </div>

        {/* Category filters */}
        <button
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-2 ${isActiveCategory(
            "yen_tho"
          )}`}
          onClick={() => handleChangeCategory("yen_tho")}
        >
          <p className="text-sm font-medium">Yến thô</p>
        </button>
        <button
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-2 ${isActiveCategory(
            "yen_tinh_che"
          )}`}
          onClick={() => handleChangeCategory("yen_tinh_che")}
        >
          <p className="text-sm font-medium">Yến tinh chế</p>
        </button>
        <button
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-2 ${isActiveCategory(
            "yen_baby"
          )}`}
          onClick={() => handleChangeCategory("yen_baby")}
        >
          <p className="text-sm font-medium">Yến baby</p>
        </button>
        <button
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-2 ${isActiveCategory(
            "yen_chung_san"
          )}`}
          onClick={() => handleChangeCategory("yen_chung_san")}
        >
          <p className="text-sm font-medium">Yến chưng sẵn</p>
        </button>
      </div>

      {/* Loading / Error state */}
      {loading && (
        <p className="text-center text-sm text-[#897f61] dark:text-[#a19b85]">
          Đang tải sản phẩm...
        </p>
      )}
      {error && !loading && (
        <p className="text-center text-sm text-red-500">{error}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {!loading &&
          !error &&
          paginatedProducts.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
      </div>
      {/* <!-- Pagination --> */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-12">
          <button
            className="flex items-center justify-center rounded-lg size-10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#897f61] dark:text-[#a19b85] disabled:opacity-40"
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                className={`flex items-center justify-center rounded-lg size-10 font-bold text-sm ${
                  isActive
                    ? "bg-primary text-[#181611]"
                    : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
                onClick={() => handleChangePage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="flex items-center justify-center rounded-lg size-10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#897f61] dark:text-[#a19b85] disabled:opacity-40"
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </nav>
      )}
    </div>
  );
}
