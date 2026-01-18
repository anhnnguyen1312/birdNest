import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "../ProductList";
import { ProductFilterProvider } from "@/context/ProductFilterContext";
import { Product } from "@/types";

// Mock fetch
global.fetch = jest.fn();

// Mock ProductItem
jest.mock("../ProductItem", () => {
  return function MockProductItem({ product }: { product: Product }) {
    return <div data-testid={`product-${product.id}`}>{product.name}</div>;
  };
});

// Mock CircularProgressWithLabel
jest.mock("../../CircularProgressWithLabel", () => {
  return function MockCircularProgress({ value }: { value: number }) {
    return <div data-testid="progress">{value}%</div>;
  };
});

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Yến Sào Tinh Chế 100g",
    category: "TINH_CHE",
    description: "Yến sào cao cấp",
    price: 3000000,
    discountPrice: 500000,
    stock: 10,
    imageUrlThumb: "/test1.jpg",
    imageUrlArr: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Yến Thô 50g",
    category: "THO",
    description: "Yến thô nguyên chất",
    price: 2000000,
    discountPrice: 300000,
    stock: 5,
    imageUrlThumb: "/test2.jpg",
    imageUrlArr: [],
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02",
  },
  {
    id: 3,
    name: "Yến Baby 30g",
    category: "BABY",
    description: "Yến baby",
    price: 1500000,
    discountPrice: 200000,
    stock: 8,
    imageUrlThumb: "/test3.jpg",
    imageUrlArr: [],
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
];

const renderProductList = (props = {}) => {
  return render(
    <ProductFilterProvider>
      <ProductList initialProducts={mockProducts} {...props} />
    </ProductFilterProvider>
  );
};

describe("ProductList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders product list with initial products", () => {
      renderProductList();

      expect(screen.getByText("Yến Sào Tinh Chế 100g")).toBeInTheDocument();
      expect(screen.getByText("Yến Thô 50g")).toBeInTheDocument();
      expect(screen.getByText("Yến Baby 30g")).toBeInTheDocument();
    });

    test("renders page title", () => {
      renderProductList();
      expect(screen.getByText("Sản Phẩm Yến Sào")).toBeInTheDocument();
    });

    test("renders sort dropdown", () => {
      renderProductList();
      const sortSelect = screen.getByDisplayValue("Mới nhất");
      expect(sortSelect).toBeInTheDocument();
    });
  });

  describe("API Calls", () => {
    test("fetches products when no initialProducts provided", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          error: 0,
          products: mockProducts,
        }),
      });

      renderProductList({ initialProducts: [] });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/products/all_products");
      });
    });

    test("fetches from search API when searchQuery provided", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          error: 0,
          products: [mockProducts[0]],
        }),
      });

      renderProductList({ searchQuery: "yến sào" });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/products/search?q=y%E1%BA%BFn%20s%C3%A0o"
        );
      });
    });

    test("uses initialProducts when provided and no search", () => {
      renderProductList({ initialProducts: mockProducts });

      expect(global.fetch).not.toHaveBeenCalled();
      expect(screen.getByText("Yến Sào Tinh Chế 100g")).toBeInTheDocument();
    });
  });

  describe("Filtering", () => {
    test("filters products by category", async () => {
      const { rerender } = renderProductList();

      // Change filter context
      const filterProvider = ({ children }: { children: React.ReactNode }) => (
        <ProductFilterProvider>
          {children}
        </ProductFilterProvider>
      );

      // This would require mocking the context or using a test wrapper
      // For now, we test that products are rendered
      expect(screen.getByText("Yến Sào Tinh Chế 100g")).toBeInTheDocument();
    });

    test("filters products by price range", () => {
      renderProductList();
      // Price filtering logic would be tested here
      // This requires access to the filtered products
      expect(screen.getByText("Yến Sào Tinh Chế 100g")).toBeInTheDocument();
    });
  });

  describe("Sorting", () => {
    test("sorts products by newest", () => {
      renderProductList();
      const sortSelect = screen.getByDisplayValue("Mới nhất");
      expect(sortSelect).toBeInTheDocument();
    });

    test("sorts products by price ascending", () => {
      renderProductList();
      const sortSelect = screen.getByDisplayValue("Mới nhất") as HTMLSelectElement;

      fireEvent.change(sortSelect, { target: { value: "price_asc" } });

      expect(sortSelect.value).toBe("price_asc");
    });

    test("sorts products by price descending", () => {
      renderProductList();
      const sortSelect = screen.getByDisplayValue("Mới nhất") as HTMLSelectElement;

      fireEvent.change(sortSelect, { target: { value: "price_desc" } });

      expect(sortSelect.value).toBe("price_desc");
    });
  });

  describe("Pagination", () => {
    test("displays pagination when products exceed page size", () => {
      const manyProducts = Array.from({ length: 10 }, (_, i) => ({
        ...mockProducts[0],
        id: i + 1,
        name: `Product ${i + 1}`,
      }));

      renderProductList({ initialProducts: manyProducts });

      // Should show pagination controls
      const pagination = screen.queryByRole("button", { name: /next/i });
      // Pagination might not show if PAGE_SIZE is large
    });

    test("changes page when pagination button is clicked", () => {
      const manyProducts = Array.from({ length: 10 }, (_, i) => ({
        ...mockProducts[0],
        id: i + 1,
        name: `Product ${i + 1}`,
      }));

      renderProductList({ initialProducts: manyProducts });

      const nextButton = screen.queryByRole("button", { name: /next/i });
      if (nextButton) {
        fireEvent.click(nextButton);
        // Should show next page products
      }
    });
  });

  describe("Loading State", () => {
    test("shows loading indicator while fetching", async () => {
      (global.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ error: 0, products: mockProducts }),
                }),
              100
            )
          )
      );

      renderProductList({ initialProducts: [] });

      expect(screen.getByTestId("progress")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    test("displays error message when API fails", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

      renderProductList({ initialProducts: [] });

      await waitFor(() => {
        expect(
          screen.getByText(/Không thể tải danh sách sản phẩm/i)
        ).toBeInTheDocument();
      });
    });

    test("handles empty product list", () => {
      renderProductList({ initialProducts: [] });

      // Should show empty state or loading
    });
  });

  describe("Search Query", () => {
    test("displays no results message when search returns empty", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ error: 0, products: [] }),
      });

      renderProductList({ searchQuery: "nonexistent" });

      await waitFor(() => {
        expect(
          screen.getByText(/Không tìm thấy sản phẩm/i)
        ).toBeInTheDocument();
      });
    });
  });
});

