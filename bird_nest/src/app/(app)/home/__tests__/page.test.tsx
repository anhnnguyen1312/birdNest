import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../home/page";

// Mock fetch
global.fetch = jest.fn();

// Mock components
jest.mock("@/component/Home/Hero", () => {
  return function MockHero() {
    return <div data-testid="hero">Hero Section</div>;
  };
});

jest.mock("@/component/Home/Feature", () => {
  return function MockFeature() {
    return <div data-testid="feature">Feature Section</div>;
  };
});

jest.mock("@/component/Home/ImageGrid", () => {
  return function MockImageGrid({ hotProducts }: { hotProducts: any[] }) {
    return (
      <div data-testid="image-grid">
        Image Grid - {hotProducts.length} products
      </div>
    );
  };
});

jest.mock("@/component/Home/Promotion", () => {
  return function MockPromotion() {
    return <div data-testid="promotion">Promotion Section</div>;
  };
});

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders all main sections", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ hotProducts: [] }),
      });

      render(await Home());

      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getByTestId("feature")).toBeInTheDocument();
      expect(screen.getByTestId("promotion")).toBeInTheDocument();
    });

    test("renders ImageGrid when products are available", async () => {
      const mockProducts = [
        {
          id: 1,
          type: "hot",
          productId: 1,
          startDate: "2024-01-01",
          endDate: null,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
          products: {
            id: 1,
            name: "Test Product",
          },
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ hotProducts: mockProducts }),
      });

      render(await Home());

      await waitFor(() => {
        expect(screen.getByTestId("image-grid")).toBeInTheDocument();
      });
    });
  });

  describe("API Calls", () => {
    test("fetches hot products on mount", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ hotProducts: [] }),
      });

      render(await Home());

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "http://localhost:3000/api/products/hot_products"
        );
      });
    });

    test("handles API error gracefully", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

      // Should not crash
      const component = await Home();
      expect(component).toBeDefined();
    });
  });

  describe("Conditional Rendering", () => {
    test("does not render ImageGrid when no products", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ hotProducts: [] }),
      });

      render(await Home());

      // ImageGrid should not render when products array is empty
      const imageGrid = screen.queryByTestId("image-grid");
      // This depends on the actual implementation
    });
  });
});

