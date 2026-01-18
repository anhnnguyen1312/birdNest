"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import type { Blog } from "@/types";
import CircularProgressWithLabel from "@/component/CircularProgressWithLabel";
import Image from "next/image";

type SortOption = "newest" | "oldest";
type CategoryFilter =
  | "ALL"
  | "Sức khỏe"
  | "Công thức"
  | "Nguồn gốc"
  | "Làm đẹp"
  | "Quy trình"
  | "Kiến thức";

const PAGE_SIZE = 4;
const categories: CategoryFilter[] = [
  "ALL",
  "Sức khỏe",
  "Công thức",
  "Nguồn gốc",
  "Làm đẹp",
];

export default function Blog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>(searchQuery);
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day} Tháng ${month}, ${year}`;
  };

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        setProgress(0);
        progressTimerRef.current = setInterval(() => {
          setProgress((p) => {
            if (p >= 90) return 90;
            return p + 5;
          });
        }, 200);

        let res: Response;
        if (searchQuery && searchQuery.trim().length > 0) {
          res = await fetch(
            `/api/blog/search?q=${encodeURIComponent(searchQuery.trim())}`
          );
        } else {
          res = await fetch("/api/blog/all_blog");
        }

        if (!res.ok) {
          setError(`Fetch failed with status ${res.status}`);
        }

        const data = await res.json();
        console.log("blogs data", data);
        const listBlogs: Blog[] =
          data.error === 0 && Array.isArray(data.blogs) ? data.blogs : [];

        setBlogs(listBlogs);
        setError(null);
        setProgress(100);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Không thể tải danh sách bài viết. Vui lòng thử lại sau.");
      } finally {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 300);
      }
    };

    fetchBlogs();
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOption, searchQuery]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    } else {
      params.delete("search");
    }
    router.push(`/blog?${params.toString()}`);
  };

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let result = [...blogs];

    // Filter by category
    if (selectedCategory !== "ALL") {
      result = result.filter((blog) => blog.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === "newest") {
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      } else {
        return (
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
      }
    });

    return result;
  }, [blogs, selectedCategory, sortOption]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogs &&
      blogs.length > 0 &&
      blogs.forEach((blog) => {
        blog.tags?.forEach((tag) => tagSet.add(tag));
      });
    return Array.from(tagSet);
  }, [blogs]);

  // Pagination
  const totalBlogs = filteredBlogs.length;
  const totalPages = Math.max(1, Math.ceil(totalBlogs / PAGE_SIZE));

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredBlogs.slice(start, end);
  }, [filteredBlogs, currentPage]);

  // Featured blog (first blog)
  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;

  // Handlers
  const handleChangeSort = (value: SortOption) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (category: CategoryFilter) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display transition-colors duration-200">
      <main className="flex flex-col items-center w-full min-h-screen pb-16">
        <div className="w-full max-w-[1280px] px-4 md:px-10 flex flex-col gap-8">
          {/* Page Heading & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-10 pb-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Kiến thức &amp; Góc chia sẻ
              </h1>
              <p className="text-text-secondary dark:text-[#a0977e] text-base font-normal">
                Khám phá công dụng, nguồn gốc và những bí quyết chế biến yến sào
                thượng hạng.
              </p>
            </div>
            <div
              onSubmit={handleSearch}
              className="w-full md:w-auto md:min-w-[320px]"
            >
              <label className="flex items-center w-full h-12 bg-white dark:bg-[#1a160c] rounded-lg border border-[#e5e7eb] dark:border-[#332d1f] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden shadow-sm">
                <div className="pl-4 pr-2 text-text-secondary">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-full border-none bg-transparent focus:ring-0 text-base placeholder:text-text-secondary dark:placeholder:text-[#6b6351]"
                  placeholder="Tìm kiếm bài viết..."
                />
              </label>
            </div>
          </div>
          {/* <!-- Chips / Filters --> */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`h-9 px-5 rounded-lg font-bold text-sm shadow-sm transition-opacity ${
                  selectedCategory === category
                    ? "bg-primary text-[#181611]"
                    : "bg-white dark:bg-[#1a160c] border border-[#e5e7eb] dark:border-[#332d1f] text-text-main dark:text-white hover:border-primary hover:text-primary dark:hover:text-primary"
                }`}
              >
                {category === "ALL" ? "Tất cả" : category}
              </button>
            ))}
          </div>

          {/* Loading / Error state */}
          {loading && (
            <div className="flex justify-center py-8">
              <CircularProgressWithLabel value={progress} />
            </div>
          )}
          {error && !loading && (
            <p className="text-center text-sm text-red-500 py-8">{error}</p>
          )}

          {/* No Results UI */}
          {!loading && !error && filteredBlogs.length === 0 && searchQuery && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6">
                <MagnifyingGlassIcon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-[#181611] dark:text-gray-100 mb-2">
                Không tìm thấy bài viết
              </h3>
              <p className="text-subtext-light dark:text-gray-400 text-center mb-6 max-w-md">
                Không có bài viết nào khớp với từ khóa &quot;{searchQuery}
                &quot;. Vui lòng thử lại với từ khóa khác.
              </p>
              <button
                onClick={() => {
                  setSearchInput("");
                  router.push("/blog");
                }}
                className="px-6 py-3 rounded-lg border border-[#e6e3db] dark:border-[#3a3321] text-[#181611] dark:text-gray-200 font-semibold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              >
                Xóa bộ lọc tìm kiếm
              </button>
            </div>
          )}

          {/* Featured Article (Hero) */}
          {!loading && !error && featuredBlog && (
            <Link
              href={`/blog/${featuredBlog.slug}`}
              className="mt-4 rounded-xl overflow-hidden bg-white dark:bg-[#1a160c] shadow-md border border-[#f0f0f0] dark:border-[#332d1f] group cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/5 h-[300px] lg:h-[400px] relative overflow-hidden">
                  <Image
                    src={featuredBlog.imageUrl}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                </div>
                <div className="w-full lg:w-2/5 p-6 lg:p-10 flex flex-col justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded bg-primary/20 text-yellow-700 dark:text-primary text-xs font-bold uppercase tracking-wider">
                      {featuredBlog.category}
                    </span>
                    <span className="text-text-secondary text-xs font-medium">
                      {formatDate(featuredBlog.publishedAt)}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-text-secondary dark:text-[#a0977e] text-base leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="pt-4">
                    <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                      Xem chi tiết
                      <ArrowRightIcon className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Content Grid Layout with Sidebar */}
          {!loading && !error && filteredBlogs.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
              {/* Main Article Grid */}
              <div className="w-full lg:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedBlogs
                    .filter((blog) => blog.id !== featuredBlog?.id)
                    .map((blog) => (
                      <Link
                        key={blog.id}
                        href={`/blog/${blog.slug}`}
                        className="group flex flex-col bg-white dark:bg-[#1a160c] rounded-xl overflow-hidden shadow-sm border border-[#f0f0f0] dark:border-[#332d1f] hover:shadow-md transition-all"
                      >
                        <div className="h-56 overflow-hidden relative">
                          <Image
                            src={blog.imageUrl}
                            alt={blog.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-md bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold uppercase tracking-wider shadow-sm">
                              {blog.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col gap-3 flex-1">
                          <div className="text-xs text-text-secondary">
                            {formatDate(blog.publishedAt)}
                          </div>
                          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-text-secondary dark:text-[#a0977e] text-sm line-clamp-3 mb-auto">
                            {blog.excerpt}
                          </p>
                          <span className="inline-flex items-center text-sm font-bold mt-4 hover:text-primary transition-colors">
                            Đọc tiếp
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-[#1a160c] border border-[#e5e7eb] dark:border-[#332d1f] hover:bg-gray-50 dark:hover:bg-[#2a2418] disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={() => handleChangePage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => {
                      const page = index + 1;
                      const isActive = page === currentPage;
                      return (
                        <button
                          key={page}
                          className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-sm ${
                            isActive
                              ? "bg-primary text-[#181611]"
                              : "bg-white dark:bg-[#1a160c] border border-[#e5e7eb] dark:border-[#332d1f] hover:bg-gray-50 dark:hover:bg-[#2a2418]"
                          }`}
                          onClick={() => handleChangePage(page)}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-[#1a160c] border border-[#e5e7eb] dark:border-[#332d1f] hover:bg-gray-50 dark:hover:bg-[#2a2418] disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={() => handleChangePage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Results count */}
                <p className="text-sm text-subtext-light dark:text-[#a19b85] text-center mt-6">
                  {!loading && !error && totalBlogs > 0
                    ? `Hiển thị ${Math.min(
                        PAGE_SIZE,
                        totalBlogs - (currentPage - 1) * PAGE_SIZE
                      )} trên ${totalBlogs} bài viết`
                    : "Không có bài viết nào"}
                </p>
              </div>

              {/* Sidebar */}
              <aside className="w-full lg:w-1/4 flex flex-col gap-8">
                {/* Popular Tags */}
                <div className="bg-white dark:bg-[#1a160c] rounded-xl p-6 border border-[#f0f0f0] dark:border-[#332d1f] shadow-sm">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <TagIcon className="w-5 h-5" />
                    Chủ đề phổ biến
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?search=${encodeURIComponent(tag)}`}
                        className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#2a2418] text-sm hover:bg-primary hover:text-[#181611] transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Top Products (Cross-sell) */}
                <div className="bg-white dark:bg-[#1a160c] rounded-xl p-6 border border-[#f0f0f0] dark:border-[#332d1f] shadow-sm">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <TagIcon className="w-5 h-5" />
                    Sản phẩm bán chạy
                  </h4>
                  <div className="flex flex-col gap-4">
                    <Link className="flex gap-3 group" href="/products">
                      <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyuHbbKoomZ0Rj5goiomw5ODFQhnNByHUl_ao2zE1_dXiSL_ClDgJeg5qUngzorwRwqc-U96BwuXNn5HjykEuWYlL6A9IuCkicbxK0GR-sAjU5xcUUm_gi8PpJh9akEK6tToul-CKzmkF0xabWBHUrvYUnLlN5egrYApDwYC10rziUTg4KjcwRPVs0jFE8Vbt-ZqgI36qXhfgRDe5jxUFjzRFfUC_QF-ax1YjLXvv7eMt-HE16N4scBmcYRrmJ4ewkI-saYijlwJU')`,
                          }}
                        ></div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-sm font-bold group-hover:text-primary transition-colors">
                          Yến chưng đường phèn
                        </h5>
                        <p className="text-primary font-bold text-sm">
                          450.000₫
                        </p>
                      </div>
                    </Link>
                    <Link className="flex gap-3 group" href="/products">
                      <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGqKDHKvFak00P1doycJ1o998nPPgJXEm6JMpcLT3k93QYlf3Fwplk59e9GYmKdQvef4EbWA3A5z3sDGblL2htYsOAbwkadDjQsn9tnlh3ce-O6ccUtjXimbIP1xkdBfzXwiZS5oEtTMIrZuIisqNurLNCEELXlz3bQwfRmh9skqWqqAHXhaozrf8lryL_f-N6ahFun0KlSlkzOM266g9seDEE7bN4mzeismOfdv-R8h4cr49k6v5aW-1V13mxDy4iauWq0WVhzMY')`,
                          }}
                        ></div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-sm font-bold group-hover:text-primary transition-colors">
                          Hồng yến tinh chế
                        </h5>
                        <p className="text-primary font-bold text-sm">
                          5.200.000₫
                        </p>
                      </div>
                    </Link>
                    <Link className="flex gap-3 group" href="/products">
                      <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEszylDACKlS4QI0KxfeuXogytJIvhasfIEcUUeLCPKRIVTrN9Jww4gfxWd8tGtMWd0h0E6T-arXgPkQ2s_s-yyigWqS82PcUXCLFADfheiHNKs07_XUiwvkllILurhjbHj5QLOGElNTtMBTdG1mkPYlQt17nAErzZEnIVCc5T4AoXUfU16YCoP3FCsYV1Z16nPJcVG0XteCBiZhTj_ncfVpnsgpqMKFzBR_sI2iDKN_fpEUOampKi3f6pTZt9BUpqIg4fBbs8e9A')`,
                          }}
                        ></div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-sm font-bold group-hover:text-primary transition-colors">
                          Hộp quà tặng cao cấp
                        </h5>
                        <p className="text-primary font-bold text-sm">
                          2.800.000₫
                        </p>
                      </div>
                    </Link>
                  </div>
                  <Link
                    href="/products"
                    className="block w-full mt-5 py-2 rounded-lg bg-[#f4f3f0] dark:bg-[#2a2418] text-sm font-bold hover:bg-primary hover:text-[#181611] transition-colors text-center"
                  >
                    Xem tất cả sản phẩm
                  </Link>
                </div>

                {/* Newsletter */}
                <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                  <h4 className="text-lg font-bold mb-2">Đăng ký nhận tin</h4>
                  <p className="text-sm text-text-secondary mb-4">
                    Nhận thông báo về bài viết mới và ưu đãi độc quyền.
                  </p>
                  <div className="flex flex-col gap-2">
                    <input
                      className="w-full h-10 px-3 rounded-lg border-none focus:ring-1 focus:ring-primary text-sm dark:bg-[#1a160c]"
                      placeholder="Email của bạn"
                      type="email"
                    />
                    <button className="w-full h-10 rounded-lg bg-primary text-[#181611] font-bold text-sm hover:opacity-90 transition-opacity">
                      Đăng ký
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
