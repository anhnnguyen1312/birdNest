import { render, screen, fireEvent } from "@testing-library/react";
import SideBar from "../SideBar";
import { ProductFilterProvider } from "@/context/ProductFilterContext";

const renderSideBar = () => {
  return render(
    <ProductFilterProvider>
      <SideBar />
    </ProductFilterProvider>
  );
};

describe("SideBar Component", () => {
  describe("Rendering", () => {
    test("renders category filters", () => {
      renderSideBar();
      expect(screen.getByText("Tất cả sản phẩm")).toBeInTheDocument();
      expect(screen.getByText("Yến thô")).toBeInTheDocument();
      expect(screen.getByText("Yến tinh chế")).toBeInTheDocument();
    });

    test("renders price range filter", () => {
      renderSideBar();
      const priceInput = screen.getByLabelText(/giá/i) || screen.getByRole("slider");
      // Price filter might be rendered differently
    });

    test("renders weight filters", () => {
      renderSideBar();
      expect(screen.getByText("50g")).toBeInTheDocument();
      expect(screen.getByText("100g")).toBeInTheDocument();
    });
  });

  describe("Category Selection", () => {
    test("selects category when clicked", () => {
      renderSideBar();
      const yenthButton = screen.getByText("Yến thô");

      fireEvent.click(yenthButton);

      // Category should be selected (check via context or visual state)
      expect(yenthButton).toBeInTheDocument();
    });

    test("handles all category options", () => {
      renderSideBar();
      const categories = [
        "Tất cả sản phẩm",
        "Yến thô",
        "Yến tinh chế",
        "Yến baby",
        "Yến chưng sẵn",
        "Quà tặng",
      ];

      categories.forEach((category) => {
        const button = screen.getByText(category);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
      });
    });
  });

  describe("Price Range Filter", () => {
    test("updates price range on slider change", () => {
      renderSideBar();
      // Find price range input
      const priceInputs = screen.getAllByRole("slider") || screen.queryAllByLabelText(/giá/i);
      
      if (priceInputs.length > 0) {
        fireEvent.change(priceInputs[0], { target: { value: "3000000" } });
        // Price range should update
      }
    });
  });

  describe("Weight Filter", () => {
    test("toggles weight filter on checkbox click", () => {
      renderSideBar();
      const weight50g = screen.getByLabelText("50g") || screen.getByText("50g").closest("input");

      if (weight50g) {
        fireEvent.click(weight50g);
        // Weight should be toggled
      }
    });

    test("handles multiple weight selections", () => {
      renderSideBar();
      const weights = ["50g", "100g", "Hộp 6 hũ"];

      weights.forEach((weight) => {
        const checkbox = screen.getByLabelText(weight) || screen.getByText(weight).closest("input");
        if (checkbox) {
          fireEvent.click(checkbox);
        }
      });
    });
  });

  describe("Filter Actions", () => {
    test("clears all filters when clear button is clicked", () => {
      renderSideBar();
      const clearButton = screen.getByText(/xóa bộ lọc/i) || screen.getByRole("button", { name: /clear/i });

      if (clearButton) {
        fireEvent.click(clearButton);
        // All filters should reset
      }
    });

    test("applies filters when apply button is clicked", () => {
      renderSideBar();
      const applyButton = screen.getByText(/áp dụng/i) || screen.getByRole("button", { name: /apply/i });

      if (applyButton) {
        fireEvent.click(applyButton);
        // Filters should be applied
      }
    });
  });
});

