import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../(public)/page";

// Mock fetch
global.fetch = jest.fn();

// Mock components
jest.mock("@/component/LandingPage/Hero", () => {
  return function MockHero() {
    return <div data-testid="hero">Hero Section</div>;
  };
});

jest.mock("@/component/LandingPage/Feature", () => {
  return function MockFeature() {
    return <div data-testid="feature">Feature Section</div>;
  };
});

jest.mock("@/component/LandingPage/Promotion", () => {
  return function MockPromotion({ topProducts }: { topProducts: any }) {
    return (
      <div data-testid="promotion">
        Promotion - {topProducts ? "Has Product" : "No Product"}
      </div>
    );
  };
});

jest.mock("@/component/LandingPage/Testimonials", () => {
  return function MockTestimonials() {
    return <div data-testid="testimonials">Testimonials</div>;
  };
});

jest.mock("@/component/LandingPage/CTA", () => {
  return function MockCTA() {
    return <div data-testid="cta">CTA Section</div>;
  };
});

jest.mock("@/component/LandingPage/Footer", () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

describe("Landing Page", () => {
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
      expect(screen.getByTestId("testimonials")).toBeInTheDocument();
      expect(screen.getByTestId("cta")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    test("renders Promotion with product when available", async () => {
      const mockProduct = {
        id: 1,
        type: "top",
        productId: 1,
        startDate: "2024-01-01",
        endDate: null,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        products: {
          id: 1,
          name: "Top Product",
        },
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ hotProducts: [mockProduct] }),
      });

      render(await Home());

      await waitFor(() => {
        expect(screen.getByText("Has Product")).toBeInTheDocument();
      });
    });

    test("renders Promotion without product when not available", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
      });

      render(await Home());

      await waitFor(() => {
        expect(screen.getByText("No Product")).toBeInTheDocument();
      });
    });
  });

  describe("API Calls", () => {
    test("fetches top products on mount", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ hotProducts: [] }),
      });

      render(await Home());

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "http://localhost:3000/api/products/top_products"
        );
      });
    });

    test("handles fetch error gracefully", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

      const component = await Home();
      expect(component).toBeDefined();
    });

    test("handles non-ok response", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      const component = await Home();
      expect(component).toBeDefined();
    });
  });
});

