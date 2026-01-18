import { renderHook, act } from "@testing-library/react";
import {
  ProductFilterProvider,
  useProductFilters,
} from "../ProductFilterContext";

describe("ProductFilterContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ProductFilterProvider>{children}</ProductFilterProvider>
  );

  describe("Initial State", () => {
    test("initializes with default filters", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      expect(result.current.filters.category).toBe("ALL");
      expect(result.current.filters.priceRange).toEqual([500000, 5000000]);
      expect(result.current.filters.selectedWeights).toEqual([]);
      expect(result.current.isFilterApplied).toBe(false);
    });
  });

  describe("setCategory", () => {
    test("updates category filter", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      act(() => {
        result.current.setCategory("THO");
      });

      expect(result.current.filters.category).toBe("THO");
    });

    test("updates category with different values", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      const categories: Array<"ALL" | "THO" | "TINH_CHE" | "BABY" | "YEN_CHUNG" | "QUA_TANG"> = [
        "THO",
        "TINH_CHE",
        "BABY",
        "YEN_CHUNG",
        "QUA_TANG",
        "ALL",
      ];

      categories.forEach((category) => {
        act(() => {
          result.current.setCategory(category);
        });
        expect(result.current.filters.category).toBe(category);
      });
    });
  });

  describe("setPriceRange", () => {
    test("updates price range", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      act(() => {
        result.current.setPriceRange([1000000, 3000000]);
      });

      expect(result.current.filters.priceRange).toEqual([1000000, 3000000]);
    });

    test("handles different price ranges", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      const ranges: [number, number][] = [
        [0, 1000000],
        [1000000, 2000000],
        [2000000, 5000000],
        [5000000, 10000000],
      ];

      ranges.forEach((range) => {
        act(() => {
          result.current.setPriceRange(range);
        });
        expect(result.current.filters.priceRange).toEqual(range);
      });
    });
  });

  describe("toggleWeight", () => {
    test("adds weight when not selected", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      act(() => {
        result.current.toggleWeight("50g");
      });

      expect(result.current.filters.selectedWeights).toContain("50g");
    });

    test("removes weight when already selected", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      act(() => {
        result.current.toggleWeight("50g");
      });

      expect(result.current.filters.selectedWeights).toContain("50g");

      act(() => {
        result.current.toggleWeight("50g");
      });

      expect(result.current.filters.selectedWeights).not.toContain("50g");
    });

    test("handles multiple weights", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      act(() => {
        result.current.toggleWeight("50g");
        result.current.toggleWeight("100g");
        result.current.toggleWeight("Hộp 6 hũ");
      });

      expect(result.current.filters.selectedWeights).toHaveLength(3);
      expect(result.current.filters.selectedWeights).toContain("50g");
      expect(result.current.filters.selectedWeights).toContain("100g");
      expect(result.current.filters.selectedWeights).toContain("Hộp 6 hũ");
    });
  });

  describe("clearFilters", () => {
    test("resets all filters to default", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      // Set some filters
      act(() => {
        result.current.setCategory("THO");
        result.current.setPriceRange([1000000, 2000000]);
        result.current.toggleWeight("50g");
      });

      // Clear filters
      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.filters.category).toBe("ALL");
      expect(result.current.filters.priceRange).toEqual([500000, 5000000]);
      expect(result.current.filters.selectedWeights).toEqual([]);
      expect(result.current.appliedFilters.category).toBe("ALL");
    });
  });

  describe("applyFilters", () => {
    test("applies current filters to appliedFilters", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      act(() => {
        result.current.setCategory("TINH_CHE");
        result.current.setPriceRange([1000000, 3000000]);
        result.current.toggleWeight("100g");
      });

      act(() => {
        result.current.applyFilters();
      });

      expect(result.current.appliedFilters.category).toBe("TINH_CHE");
      expect(result.current.appliedFilters.priceRange).toEqual([
        1000000, 3000000,
      ]);
      expect(result.current.appliedFilters.selectedWeights).toContain("100g");
    });
  });

  describe("isFilterApplied", () => {
    test("returns false when no filters are applied", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      expect(result.current.isFilterApplied).toBe(false);
    });

    test("returns true when category is changed", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      act(() => {
        result.current.setCategory("THO");
      });

      expect(result.current.isFilterApplied).toBe(true);
    });

    test("returns true when price range is changed", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      act(() => {
        result.current.setPriceRange([1000000, 2000000]);
      });

      expect(result.current.isFilterApplied).toBe(true);
    });

    test("returns true when weights are selected", () => {
      const { result } = renderHook(() => useProductFilters(), { wrapper });

      act(() => {
        result.current.toggleWeight("50g");
      });

      expect(result.current.isFilterApplied).toBe(true);
    });
  });

  describe("Error Handling", () => {
    test("throws error when used outside provider", () => {
      // Suppress console.error for this test
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        renderHook(() => useProductFilters());
      }).toThrow("useProductFilters must be used within a ProductFilterProvider");

      consoleSpy.mockRestore();
    });
  });
});

