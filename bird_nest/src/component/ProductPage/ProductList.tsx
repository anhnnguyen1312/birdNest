"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ProductItem from "./ProductItem";
import { Product } from "@/types/index";
import Link from "next/link";
import { useProductFilters } from "@/context/ProductFilterContext";
import CircularProgressWithLabel from "@/component/CircularProgressWithLabel";
type SortOption = "newest" | "price_asc" | "price_desc";

const PAGE_SIZE = 4;

interface ProductListProps {
  initialProducts?: Product[];
  searchQuery?: string;
}

export default function ProductList({
  initialProducts = [],
  searchQuery,
}: ProductListProps) {
  const { appliedFilters } = useProductFilters();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [progress, setProgress] = useState(0);
  let progressTimer: NodeJS.Timeout | null = null;
  // let progressTimer: null
  // Fetch products - hỗ trợ cả search và all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        setProgress(0);
        progressTimer = setInterval(() => {
          setProgress((p) => {
            if (p >= 90) return 90; // Giữ lại 90% chờ API thật xong
            return p + 5;
          });
        }, 200);

        let res: Response;
        if (searchQuery && searchQuery.trim().length > 0) {
          // Fetch từ search API nếu có search query
          res = await fetch(
            `/api/products/search?q=${encodeURIComponent(searchQuery.trim())}`
          );
        } else {
          // Nếu có initialProducts và không có search, dùng initialProducts
          if (initialProducts.length > 0) {
            console.log("có initialProducts nè", initialProducts);

            setProducts(initialProducts);
            setError(null);
            setProgress(100);
            setTimeout(() => {
              setLoading(false);
              setProgress(0);
            }, 300);
            if (progressTimer) clearInterval(progressTimer);
            return;
          }
          // Fetch all products
          res = await fetch("/api/products/all_products");
        }

        if (!res.ok) {
          setError(`Fetch failed with status ${res.status}`);
        }

        const data = await res.json();
        const listProducts: Product[] =
          data.error === 0 && Array.isArray(data.products) ? data.products : [];

        setProducts(listProducts);
        setError(null);
        setProgress(100);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      } finally {
        // Tắt timer progress
        if (progressTimer) clearInterval(progressTimer);

        // Delay nhỏ để người dùng nhìn thấy 100%
        setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 300);
      }
    };

    fetchProducts();
  }, [initialProducts, searchQuery]);

  // Reset page khi filters thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);

  // Xử lý filter theo category, price range, và weight
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter theo category
    if (appliedFilters.category !== "ALL") {
      result = result.filter((product) => {
        switch (appliedFilters.category) {
          case "THO":
            return product.category === "THO";
          case "TINH_CHE":
            return product.category === "TINH_CHE";
          case "BABY":
            return product.category === "BABY";
          case "YEN_CHUNG":
            return product.category === "YEN_CHUNG";
          case "QUA_TANG":
            return product.category === "QUA_TANG";
          default:
            return true;
        }
      });
    }
    console.log(" result", result);

    // Filter theo price range
    const [minPrice, maxPrice] = appliedFilters.priceRange;
    result = result.filter((product) => {
      const productPrice = product.price - product.discountPrice;
      return productPrice >= minPrice && productPrice <= maxPrice;
    });
    console.log(" result price", result);

    // Filter theo weight (variantName)
    if (appliedFilters.selectedWeights.length > 0) {
      result = result.filter((product) => {
        if (!product.ProductVariants || product.ProductVariants.length === 0) {
          return false;
        }
        return product.ProductVariants.some((variant) => {
          const variantName = variant.variantName as string;
          return appliedFilters.selectedWeights.some(
            (weight) => variantName === weight
          );
        });
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
  }, [products, appliedFilters, sortOption]);

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

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
          {!loading && !error && totalProducts > 0
            ? `Hiển thị ${Math.min(
                PAGE_SIZE,
                totalProducts - (currentPage - 1) * PAGE_SIZE
              )} trên ${totalProducts} sản phẩm`
            : !loading && !error
            ? "Không có sản phẩm nào"
            : "Đang tải..."}
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

        {/* Category filters - removed as they're now in Sidebar */}
      </div>

      {/* Loading / Error state */}
      {loading && (
        <p className="text-center text-sm text-[#897f61] dark:text-[#a19b85]">
          <CircularProgressWithLabel value={progress} />
        </p>
      )}
      {error && !loading && (
        <p className="text-center text-sm text-red-500">{error}</p>
      )}

      {/* No Results UI */}
      {!loading && !error && paginatedProducts.length === 0 && searchQuery && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6">
            <MagnifyingGlassIcon className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-[#181611] dark:text-gray-100 mb-2">
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-[#897f61] dark:text-gray-400 text-center mb-6 max-w-md">
            Không có sản phẩm nào khớp với từ khóa "{searchQuery}". Vui lòng thử
            lại với từ khóa khác.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="px-6 py-3 rounded-lg bg-primary text-[#181611] font-semibold hover:bg-primary/90 transition-colors"
            >
              Xem tất cả sản phẩm
            </Link>
            <button
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.delete("search");
                window.location.href = url.toString();
              }}
              className="px-6 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] text-[#181611] dark:text-gray-200 font-semibold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && paginatedProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {paginatedProducts.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
      )}

      {/* Empty state khi không có search */}
      {!loading && !error && paginatedProducts.length === 0 && !searchQuery && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <p className="text-[#897f61] dark:text-gray-400 text-center">
            Không có sản phẩm nào
          </p>
        </div>
      )}
      {/* <!-- Pagination --> */}
      {!loading && !error && totalPages > 1 && (
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
