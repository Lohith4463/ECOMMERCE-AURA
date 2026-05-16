"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, options?: { color?: string; size?: string }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (product, options) => {
        setItems((current) => {
          const color = options?.color ?? product.colors[0];
          const size = options?.size ?? product.sizes[0];
          const existing = current.find(
            (item) => item.product.id === product.id && item.color === color && item.size === size
          );

          if (existing) {
            return current.map((item) =>
              item === existing ? { ...item, quantity: item.quantity + 1 } : item
            );
          }

          return [...current, { product, quantity: 1, color, size }];
        });
        setIsOpen(true);
      },
      removeItem: (productId) => {
        setItems((current) => current.filter((item) => item.product.id !== productId));
      },
      updateQuantity: (productId, quantity) => {
        setItems((current) =>
          current.map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        );
      },
      clearCart: () => setItems([]),
      subtotal,
      count
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
