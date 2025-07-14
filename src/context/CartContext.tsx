"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { StaticImageData } from "next/image";

/* 1. Types                                                            */
export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | StaticImageData;
  special: boolean;
  category: string[];
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  changeQuantity: (id: string, delta: number) => void; // delta = +1 / ‑1
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  /** helper: how many of this id are currently in the cart? */
  getItemQuantity: (id: string) => number;
};

/* ------------------------------------------------------------------ */
/* 2. Context + Provider                                               */
/* ------------------------------------------------------------------ */
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /* ---- Restore from localStorage ---------------------------------- */
  useEffect(() => {
    // console.log("CartProvider: Loading from localStorage...");
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        localStorage.removeItem("cartItems"); // corrupted data → reset
      }
    }
  }, []);

  /* ---- Persist to localStorage ------------------------------------ */
  useEffect(() => {
    // Strip StaticImageData objects down to just `src` before saving
    const serialisable = cartItems.map((i) => ({
      ...i,
      image: typeof i.image === "string" ? i.image : i.image.src,
    }));
    localStorage.setItem("cartItems", JSON.stringify(serialisable));
  }, [cartItems]);

  /* ---- Actions ---------------------------------------------------- */
  const addToCart = useCallback((item: CartItem) => {
    if (item.quantity <= 0) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

 const changeQuantity = useCallback(
  (id: string, delta: number, fallback?: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === id);

      if (existing) {
        return prev
          .map(i =>
            i.id === id
              ? { ...i, quantity: Math.max(0, i.quantity + delta) }
              : i
          )
          .filter(i => i.quantity > 0);
      }

      if (delta > 0 && fallback) {
        return [...prev, { ...fallback, quantity: delta }];
      }

      return prev;
    });
  },
  []
);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const getItemQuantity = useCallback(
    (id: string) => {
      const quantity = cartItems.find((i) => i.id === id)?.quantity ?? 0;
      // console.log(`CartProvider: Getting quantity for ${id}:`, quantity);
      return quantity;
    },
    [cartItems]
  );

  /* ---- Memoised value -------------------------------------------- */
const value = useMemo<CartContextType>(
  () => ({
    cartItems,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
  }),
  [
    cartItems,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
  ]
);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/* 3. Convenient hook                                                 */
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
};

