"use client";

import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/types";

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className = "" }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Đóng suggestions khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce search để tránh gọi API quá nhiều
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Chỉ search khi có ít nhất 2 ký tự
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setIsLoading(true);
      setShowSuggestions(true);

      try {
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(searchQuery)}&limit=5`
        );
        const data = await response.json();

        if (data.error === 0 && Array.isArray(data.products)) {
          setSuggestions(data.products);
          // setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error("Search error:", error);
        setShowSuggestions(false);

        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Debounce 300ms

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  // Xử lý submit form
  const fetchSearch = () => {
    if (searchQuery.trim().length > 0) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setSuggestions([]);
      inputRef.current?.blur();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearch();
  };
  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      fetchSearch();
    }
  };
  // Xử lý click vào suggestion
  const handleSuggestionClick = (product: Product) => {
    // router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    router.push(`/product_detail/${product.id}`);

    // setShowSuggestions(false);
    // inputRef.current?.blur();
  };

  // Clear search
  const handleClear = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
          <div className="text-[#897f61] h-[40px] dark:text-primary/70 flex bg-[#f4f3f0] dark:bg-background-dark border border-solid border-[#e6e3db] dark:border-[#3a3321] items-center justify-center pl-3 rounded-l-lg border-r-0">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            // focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-solid border-[#e6e3db] dark:border-[#3a3321]
            className="  border border-solid border-[#e6e3db] dark:border-[#3a3321] form-input h-[40px]  focus:outline-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181611] dark:text-background-light  bg-[#f4f3f0] dark:bg-background-dark  placeholder:text-[#897f61] dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            placeholder="Tìm kiếm sản phẩm..."
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="clearBtn"
              onClick={handleClear}
              className="text-[#897f61] dark:text-gray-400 hover:text-[#181611] dark:hover:text-background-light px-2 flex items-center justify-center"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>

      {/* Autocomplete Suggestions */}
      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-background-dark border border-[#e6e3db] dark:border-[#3a3321] rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-[#897f61] dark:text-gray-400">
              Đang tìm kiếm...
            </div>
          ) : suggestions.length > 0 ? (
            <>
              <div className="p-2 border-b border-[#e6e3db] dark:border-[#3a3321]">
                <p className="text-xs font-semibold text-[#897f61] dark:text-gray-400 uppercase">
                  Gợi ý tìm kiếm
                </p>
              </div>
              <ul className="py-2">
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full text-left px-4 py-3 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors flex items-center gap-3"
                    >
                      <div
                        className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{
                          backgroundImage: `url(${product.imageUrlThumb})`,
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#181611] dark:text-background-light truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#897f61] dark:text-gray-400 truncate">
                          {product.category}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-2 border-t border-[#e6e3db] dark:border-[#3a3321]">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full text-center py-2 text-sm font-medium text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors"
                >
                  Xem tất cả kết quả cho "{searchQuery}"
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
