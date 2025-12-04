"use client";

import { useProductFilters } from "@/context/ProductFilterContext";

type CategoryFilter =
  | "ALL"
  | "THO"
  | "TINH_CHE"
  | "BABY"
  | "YEN_CHUNG"
  | "QUA_TANG";

type WeightFilter = "50g" | "100g" | "Hộp 6 hũ";

const categoryLabels: Record<CategoryFilter, string> = {
  ALL: "Tất cả sản phẩm",
  THO: "Yến thô",
  TINH_CHE: "Yến tinh chế",
  BABY: "Yến baby",
  YEN_CHUNG: "Yến chưng sẵn",
  QUA_TANG: "Quà tặng",
};

function SideBar() {
  const {
    filters,
    setCategory,
    setPriceRange,
    toggleWeight,
    clearFilters,
    applyFilters,
    isFilterApplied,
  } = useProductFilters();

  // Handler cho category click
  const handleCategoryClick = (category: CategoryFilter) => {
    setCategory(category);
  };

  // Handler cho price range slider
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    setPriceRange([filters.priceRange[0], newMax]);
  };

  // Handler cho weight checkbox
  const handleWeightToggle = (weight: WeightFilter) => {
    toggleWeight(weight);
  };

  // Handler cho nút Áp dụng
  const handleApplyFilters = () => {
    applyFilters();
  };

  // Handler cho nút Xóa lọc
  const handleClearFilters = () => {
    clearFilters();
  };

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };

  // Check if category is active
  const isActiveCategory = (category: CategoryFilter) =>
    filters.category === category;

  // Check if weight is selected
  const isWeightSelected = (weight: WeightFilter) =>
    filters.selectedWeights.includes(weight);

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* Danh Mục */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Danh Mục</h3>
          <ul className="space-y-2 text-sm">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const category = key as CategoryFilter;
              const isActive = isActiveCategory(category);
              return (
                <li key={key}>
                  <button
                    className={`w-full text-left transition-colors ${
                      isActive
                        ? "font-semibold text-primary"
                        : "hover:text-primary"
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-[#f4f3f0] dark:border-white/10"></div>

        {/* Lọc Theo Giá */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Lọc Theo Giá</h3>
          <div className="flex flex-col gap-2">
            <input
              className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              max="5000000"
              min="500000"
              step="100000"
              type="range"
              value={filters.priceRange[1]}
              onChange={handlePriceRangeChange}
            />
            <div className="flex justify-between text-xs text-[#897f61] dark:text-[#a19b85]">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span className="font-semibold text-primary">
                {formatPrice(filters.priceRange[1])}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#f4f3f0] dark:border-white/10"></div>

        {/* Trọng Lượng */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Trọng Lượng</h3>
          <div className="flex flex-col gap-2 text-sm">
            {(["50g", "100g", "Hộp 6 hũ"] as WeightFilter[]).map((weight) => {
              const isSelected = isWeightSelected(weight);
              return (
                <label
                  key={weight}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleWeightToggle(weight)}
                    className="form-checkbox rounded border-[#897f61]/50 bg-transparent text-primary focus:ring-primary/50 cursor-pointer"
                  />
                  <span>{weight}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Nút Áp dụng và Xóa lọc */}
        <div className="flex gap-2">
          <button
            className="w-full text-center rounded-lg h-10 px-4 text-sm font-bold bg-primary text-[#181611] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleApplyFilters}
            disabled={!isFilterApplied}
          >
            Áp Dụng
          </button>
          <button
            className="w-full text-center rounded-lg h-10 px-4 text-sm font-bold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClearFilters}
            disabled={!isFilterApplied}
          >
            Xóa Lọc
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
