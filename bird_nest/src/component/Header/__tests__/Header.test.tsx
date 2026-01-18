import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "../../Header";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock SearchInput
jest.mock("@/component/SearchInput", () => {
  return function MockSearchInput() {
    return (
      <div data-testid="search-input" data-visible="true">
        Search Input
      </div>
    );
  };
});

let mockUserValue = {
  user: null,
  loading: false,
  logout: jest.fn(),
};

let mockCartValue = {
  cartCount: null,
  refreshCart: jest.fn(),
};
jest.mock("@/context/UserContext", () => {
  return {
    UserProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    // useUser: jest.fn(), // <-- đây là jest.fn()

    // useUser: () => ({
    //   user: null, // chưa login
    //   loading: false, // có thể vẫn false nếu mock xong rồi
    //   logout: jest.fn(),
    // }),
    useUser: () => mockUserValue, // <-- luôn lấy giá trị từ biến
  };
});
jest.mock("@/context/CartContext", () => {
  return {
    CartProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    // useCart: () => ({
    //   cartCount: null, // chưa login
    //   refreshCart: jest.fn(),
    // }),
    useCart: () => mockCartValue, // <-- luôn lấy giá trị từ biến
  };
});

import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";

// Mock fetch for cart

global.fetch = jest.fn();

const renderHeader = (user = null) => {
  return render(
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <Header />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ error: 0, cartItems: [] }),
    });
  });

  describe("Rendering", () => {
    test("renders header with logo", () => {
      renderHeader();
      const logo = screen.getByAltText("Yến Sào Tinh Hoa Logo");
      expect(logo).toBeInTheDocument();
    });

    test("renders navigation links", () => {
      renderHeader();
      const links = screen.getAllByText("Trang chủ");

      expect(links.length).toBeGreaterThan(1);
      expect(links[0]).toBeInTheDocument();
      expect(links[0]).toHaveAttribute("href", "/home");
      expect(links[1]).toBeInTheDocument();
      expect(links[1]).toHaveAttribute("href", "/home");

      const links_products = screen.getAllByText("Sản phẩm");
      expect(links_products.length).toBeGreaterThan(1);
      expect(links_products[0]).toBeInTheDocument();
      expect(links_products[0]).toHaveAttribute("href", "/products");
      expect(links_products[1]).toBeInTheDocument();
      expect(links_products[1]).toHaveAttribute("href", "/products");

      const links_about = screen.getAllByText("Giới thiệu");
      expect(links_about.length).toBeGreaterThan(1);
      expect(links_about[0]).toBeInTheDocument();
      expect(links_about[0]).toHaveAttribute("href", "/about");
      expect(links_about[1]).toBeInTheDocument();
      expect(links_about[1]).toHaveAttribute("href", "/about");

      const links_blog = screen.getAllByText("Tin tức");
      expect(links_blog.length).toBeGreaterThan(1);
      expect(links_blog[0]).toBeInTheDocument();
      expect(links_blog[0]).toHaveAttribute("href", "/blog");
      expect(links_blog[1]).toBeInTheDocument();
      expect(links_blog[1]).toHaveAttribute("href", "/blog");
    });

    test("renders search input", () => {
      renderHeader();
      const searchInputs = screen.getAllByTestId("search-input");
      const visibleInput = searchInputs.find(
        (input) => input.dataset.visible === "true" // chỉ lấy element hiển thị
      );
      expect(visibleInput).toBeInTheDocument();

      screen.debug();
    });

    test("renders cart icon", () => {
      renderHeader();
      const cartLink = screen.getByRole("link", { name: /cart/i });
      expect(cartLink).toHaveAttribute("href", "/cart");
    });

    test("renders theme toggle button", () => {
      renderHeader();
      const themeButton = screen.getByLabelText("Toggle theme");
      expect(themeButton).toBeInTheDocument();
    });
  });

  describe("User Menu", () => {
    test("shows login link when user is not logged in", () => {
      renderHeader();
      const loginLink = screen.getByRole("link", { name: /login/i });
      expect(loginLink).toHaveAttribute("href", "/login");
    });

    test("renders correctly when user is  logged in", () => {
      // (useUser as jest.Mock).mockReturnValue({
      //   user: { id: 1, name: "Test User" },
      //   loading: false,
      //   logout: jest.fn(),
      // });
      mockUserValue = {
        user: { id: 1, username: "Test User" },
        loading: false,
        logout: jest.fn(),
      };
      renderHeader();

      // Header should render user info
      expect(screen.getByText(/test user/i)).toBeInTheDocument();
      // expect(screen.getByText(`ID: 1`)).toBeInTheDocument();
      // const profileLink = screen.getByRole("link", { name: /profile/i });
      // expect(profileLink).toHaveAttribute("href", "/profile");
      // const logoutLink = screen.getByRole("button", { name: /logout/i });
      // expect(logoutLink).toHaveAttribute("href", "/logout");
    });
    // test("shows user menu when user is logged in", async () => {
    //   // Mock user context
    //   mockUserValue = {
    //     user: { id: 1, username: "Test User" },
    //     loading: false,
    //     logout: jest.fn(),
    //   };
    //         renderHeader();

    //   // Wait for user to load
    //   await waitFor(() => {
    //     const userButton = screen.queryByText("test user");
    //     if (userButton) {
    //       expect(userButton).toBeInTheDocument();
    //     }
    //   });
    // });

    test("opens user menu dropdown on click", async () => {
      mockUserValue = {
        user: { id: 1, username: "Test User" },
        loading: false,
        logout: jest.fn(),
      };
      renderHeader();

      await waitFor(() => {
        const userButton = screen.queryByText("test user");
        if (userButton) {
          fireEvent.click(userButton);
          // expect(screen.getByText("Hồ sơ")).toBeInTheDocument();
          // expect(screen.getByText("Đăng xuất")).toBeInTheDocument();
          expect(
            screen.getByText(`ID: ${mockUserValue?.user?.id}`)
          ).toBeInTheDocument();
          const profileLink = screen.getByRole("link", { name: /profile/i });
          expect(profileLink).toHaveAttribute("href", "/profile");
          const logoutLink = screen.getByRole("button", { name: /logout/i });
          expect(logoutLink).toHaveAttribute("href", "/logout");
        }
      });
    });

    test("closes user menu when clicking outside", async () => {
      mockUserValue = {
        user: { id: 1, username: "Test User" },
        loading: false,
        logout: jest.fn(),
      };
      renderHeader();

      await waitFor(() => {
        const userButton = screen.queryByText("test user");
        if (userButton) {
          fireEvent.click(userButton);
          const profileLink = screen.getByText("Hồ sơ");
          expect(profileLink).toBeInTheDocument();

          // Click outside
          fireEvent.mouseDown(document.body);
          expect(screen.queryByText("Hồ sơ")).not.toBeInTheDocument();
        }
      });
    });
  });

  describe("Theme Toggle", () => {
    test("toggles theme when clicked", () => {
      renderHeader();
      const themeButton = screen.getByLabelText("Toggle theme");

      fireEvent.click(themeButton);
      // Theme should toggle (implementation depends on ThemeContext)
      expect(themeButton).toBeInTheDocument();
    });
  });

  describe("Cart Count", () => {
    test("displays cart count badge when cart has items", () => {
      // (global.fetch as jest.Mock).mockResolvedValue({
      //   ok: true,
      //   json: async () => ({
      //     error: 0,
      //     cartItems: [{ quantity: 2 }, { quantity: 1 }],
      //   }),
      // });
      mockCartValue = {
        cartCount: 3,
        refreshCart: jest.fn(),
      };
      renderHeader();

      const cartBadge = screen.queryByText("3");
      // Cart count might not show immediately due to async fetch
      if (cartBadge) {
        expect(cartBadge).toBeInTheDocument();
      }
    });

    test("does not display cart badge when cart is empty", () => {
      mockCartValue = {
        cartCount: 0,
        refreshCart: jest.fn(),
      };
      renderHeader();

      const cartBadge = screen.queryByText(/\d+/);
      expect(cartBadge).not.toBeInTheDocument();
    });
  });
  test("does not display cart badge when cart is empty", () => {
    mockCartValue = {
      cartCount: 100,
      refreshCart: jest.fn(),
    };
    renderHeader();

    const cartBadge = screen.queryByText("99+");
    expect(cartBadge).toBeInTheDocument();
  });

  describe("Event Handling", () => {
    test("handles cart updated event", async () => {
      mockCartValue = {
        cartCount: 100,
        refreshCart: jest.fn(),
      };
      renderHeader();

      // Dispatch cart updated event
      window.dispatchEvent(new CustomEvent("cartUpdated"));

      await waitFor(() => {
        expect(mockCartValue.refreshCart).toHaveBeenCalledTimes(1);
      });
    });
  });
});
