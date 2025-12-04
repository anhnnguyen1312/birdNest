export type CategoryFilter =
  | "ALL"
  | "THO"
  | "TINH_CHE"
  | "BABY"
  | "YEN_CHUNG"
  | "QUA_TANG";

export type WeightFilter = "50g" | "100g" | "Hộp 6 hũ";

export interface ProductFilters {
  category: CategoryFilter;
  priceRange: [number, number]; // [min, max]
  selectedWeights: WeightFilter[];
}

export const defaultFilters: ProductFilters = {
  category: "ALL",
  priceRange: [500000, 5000000],
  selectedWeights: [],
};

