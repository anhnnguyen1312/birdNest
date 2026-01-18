import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import SearchInput from "../../SearchInput";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock fetch
global.fetch = jest.fn();

describe("SearchInput Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // (global.fetch as jest.Mock).mockResolvedValue({
    //   ok: true,
    //   json: async () => ({
    //     error: 0,
    //     products: [
    //       {
    //         id: 1,
    //         name: "Yến Sào Tinh Chế",
    //         category: "TINH_CHE",
    //         imageUrlThumb: "/test.jpg",
    //       },
    //     ],
    //   }),
    // });

    // });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Rendering", () => {
    test("renders search input", () => {
      render(<SearchInput />);
      const input = screen.getByPlaceholderText("Tìm kiếm sản phẩm...");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Input Handling", () => {
    test("updates input value on change", () => {
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: "yến sào" } });
      expect(input.value).toBe("yến sào");
    });

    test("shows clear button when input has value", () => {
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: "test" } });
      const clearButton = screen.getByRole("button", { name: /clearBtn/i });
      expect(clearButton).toBeInTheDocument();
    });

    test("clears input when clear button is clicked", () => {
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: "test" } });
      const clearButton = screen.getByRole("button", { name: /clear/i });
      fireEvent.click(clearButton);

      expect(input.value).toBe("");
    });
  });

  describe("Debounce Search", () => {
    test("does not call API immediately on input", async () => {
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "yến" } });
      expect(global.fetch).not.toHaveBeenCalled();
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });
    test("calls API after debounce delay", async () => {
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "yến sào" } });
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/products/search?q=y%E1%BA%BFn%20s%C3%A0o&limit=5"
        );
      });
    });
    test("does not call API for queries shorter than 2 characters", async () => {
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "y" } });
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
      await waitFor(() => {
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });
  });

  describe("Autocomplete Suggestions", () => {
    test("displays suggestions when API returns results ", async () => {
      const mockProducts = [
        { id: 1, name: "Yến sào baby" },
        { id: 2, name: "Yến sào tinh chế" },
      ];
      // (global.fetch as jest.Mock).mockResolvedValueOnce({
      //   console.log("MOCK API RETURN:", mockProducts);

      //   ok: true,
      //   json: async () => mockProducts,
      // });
      (global.fetch as jest.Mock).mockImplementationOnce(() => {
        console.log("MOCK API RETURN:", mockProducts);
        return Promise.resolve({
          ok: true,
          json: async () => ({
            error: 0,
            products: mockProducts,
          }),
        });
      });
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "yến sào" } });
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/products/search?q=y%E1%BA%BFn%20s%C3%A0o&limit=5"
        );
      });
      for (const product of mockProducts) {
        expect(await screen.findByText(product.name)).toBeInTheDocument();
      }
    });
    test("hides suggestions when clicking outside", async () => {
      const mockProducts = [
        { id: 1, name: "Yến sào baby" },
        { id: 2, name: "Yến sào tinh chế" },
      ];

      (global.fetch as jest.Mock).mockImplementationOnce(() => {
        console.log("MOCK API RETURN:", mockProducts);
        return Promise.resolve({
          ok: true,
          json: async () => ({
            error: 0,
            products: mockProducts,
          }),
        });
      });
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: "yến sào" } });
      fireEvent.focus(input);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      for (const product of mockProducts) {
        expect(await screen.findByText(product.name)).toBeInTheDocument();
      }

      fireEvent.mouseDown(document.body);

      for (const product of mockProducts) {
        expect(screen.queryByText(product.name)).not.toBeInTheDocument();
      }
    });

    test("navigates to products page when suggestion is clicked", async () => {
      const mockProducts = [
        { id: 1, name: "Yến Sào Tinh Chế Loại I" },
        { id: 2, name: "Yến sào tinh chế" },
      ];

      (global.fetch as jest.Mock).mockImplementationOnce(() => {
        console.log("MOCK API RETURN:", mockProducts);
        return Promise.resolve({
          ok: true,
          json: async () => ({
            error: 0,
            products: mockProducts,
          }),
        });
      });
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: "yến sào" } });
      fireEvent.focus(input);

      act(() => {
        jest.advanceTimersByTime(500);
      });
      for (const product of mockProducts) {
        expect(screen.queryByText(product.name)).not.toBeInTheDocument();
      }

      await waitFor(() => {
        // for (const product of mockProducts) {
        const suggestion = screen.getByText(mockProducts[0].name);
        fireEvent.click(suggestion);
        //}

        // const suggestion = screen.getByText("Yến Sào Tinh Chế");
        // fireEvent.click(suggestion);
      });

      expect(mockPush).toHaveBeenCalledWith(
        `/product_detail/${mockProducts[0].id}`
      );
    });
  });

  describe("Form Submission", () => {
    test("navigates to products page on form submit", () => {
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;
      const form = input.closest("form");

      fireEvent.change(input, { target: { value: "yến sào" } });
      fireEvent.submit(form!);

      expect(mockPush).toHaveBeenCalledWith(
        "/products?search=y%E1%BA%BFn%20s%C3%A0o"
      );
    });

    test("does not navigate on empty submit", () => {
      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;
      const form = input.closest("form");

      fireEvent.submit(form!);

      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe("Loading State", () => {
    test("shows loading message while fetching", async () => {
      jest.useFakeTimers(); // bật fake timers

      (global.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ error: 0, products: [] }),
                }),
              1000
            )
          )
      );

      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: "yến sào" } });
      fireEvent.focus(input);
      await act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(screen.queryByText("Đang tìm kiếm...")).toBeInTheDocument();

      jest.runAllTimers();
      //thay vì đợi 1000ms để mock api trả data về như code dưới
      // thì ta dùng fake timer jest.runAllTimers(); để chạy ngay mà k cần đợi 1s

      // await act(() => {
      //   jest.advanceTimersByTime(1000);
      // });
      // Kiểm tra sau khi fetch xong (loading biến mất)
      await waitFor(() => {
        expect(screen.queryByText("Đang tìm kiếm...")).not.toBeInTheDocument();
      });

      jest.useRealTimers();
    });
  });

  describe("Error Handling", () => {
    test("handles API error gracefully", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

      render(<SearchInput />);
      const input = screen.getByPlaceholderText(
        "Tìm kiếm sản phẩm..."
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: "yến sào" } });

      act(() => {
        jest.advanceTimersByTime(300);
      });

      await waitFor(() => {
        // Should not crash, suggestions should be empty
        expect(
          screen.queryByText("Yến Sào Tinh Chế Loại I")
        ).not.toBeInTheDocument();
      });
    });
  });
});
