"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CategoryFilter =
  | "ALL"
  | "THO"
  | "TINH_CHE"
  | "BABY"
  | "YEN_CHUNG"
  | "QUA_TANG";

type WeightFilter = "50g" | "100g" | "Hộp 6 hũ";

interface ProductFilters {
  category: CategoryFilter;
  priceRange: [number, number]; // [min, max]
  selectedWeights: WeightFilter[];
}

interface ProductFilterContextType {
  filters: ProductFilters;
  appliedFilters: ProductFilters;
  setCategory: (category: CategoryFilter) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleWeight: (weight: WeightFilter) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  isFilterApplied: boolean;
}

const ProductFilterContext = createContext<
  ProductFilterContextType | undefined
>(undefined);

const defaultFilters: ProductFilters = {
  category: "ALL",
  priceRange: [500000, 5000000],
  selectedWeights: [],
};

export function ProductFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<ProductFilters>(defaultFilters);

  const setCategory = (category: CategoryFilter) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const setPriceRange = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const toggleWeight = (weight: WeightFilter) => {
    setFilters((prev) => {
      const newWeights = prev.selectedWeights.includes(weight)
        ? prev.selectedWeights.filter((w) => w !== weight)
        : [...prev.selectedWeights, weight];
      return { ...prev, selectedWeights: newWeights };
    });
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const isFilterApplied =
    filters.category !== defaultFilters.category ||
    filters.priceRange[0] !== defaultFilters.priceRange[0] ||
    filters.priceRange[1] !== defaultFilters.priceRange[1] ||
    filters.selectedWeights.length > 0;

  return (
    <ProductFilterContext.Provider
      value={{
        filters,
        appliedFilters,
        setCategory,
        setPriceRange,
        toggleWeight,
        clearFilters,
        applyFilters,
        isFilterApplied,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}

export function useProductFilters() {
  const context = useContext(ProductFilterContext);
  if (context === undefined) {
    throw new Error(
      "useProductFilters must be used within a ProductFilterProvider"
    );
  }
  return context;
}
