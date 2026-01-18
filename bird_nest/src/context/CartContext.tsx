"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm fetch số lượng sản phẩm trong giỏ hàng
  const fetchCartCount = useCallback(async () => {
    try {
      console.log("refreshCart() call nè");

      setIsLoading(true);
      const response = await fetch("/api/cart");
      const data = await response.json();

      if (data.error === 0 && Array.isArray(data.cartItems)) {
        // Tính tổng số lượng sản phẩm
        const totalQuantity = data.cartItems.reduce(
          (sum: number, item: { quantity: number }) => sum + item.quantity,
          0
        );
        setCartCount(totalQuantity);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh cart count
  // refreshCart định nghĩa 1 lần lúc mount vì fetchCartCount được đin 1l
  //refreshCart được gọi nhiều lần ở mọi component?
  // gọi nhiều hay 1 có liên quan callback? hay call back chỉ quyết định khi nào đn lại hàm khi re render?
  const refreshCart = useCallback(async () => {
    await fetchCartCount();
  }, [fetchCartCount]);

  // Fetch cart count khi component mount
  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
