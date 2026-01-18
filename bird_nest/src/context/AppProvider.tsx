"use client";

import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "./ThemeContext";
import { CartProvider } from "./CartContext";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
