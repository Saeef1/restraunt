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
  _id: string;
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
  changeQuantity: (_id: string, delta: number) => void; // delta = +1 / ‑1
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
  /** helper: how many of this id are currently in the cart? */
  getItemQuantity: (_id: string) => number;
};

/* ------------------------------------------------------------------ */
/* 2. Context + Provider                                               */
/* ------------------------------------------------------------------ */
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /* ---- Restore from localStorage ---------------------------------- */
  useEffect(() => {
    console.log("CartProvider: Loading from localStorage...");
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log("CartProvider: Loaded from localStorage:", parsed);
        setCartItems(parsed);
      } catch (error) {
        console.error("CartProvider: Error parsing localStorage:", error);
        localStorage.removeItem("cartItems"); // corrupted data → reset
      }
    } else {
      console.log("CartProvider: No stored cart data found");
    }
  }, []);

  /* ---- Persist to localStorage ------------------------------------ */
  useEffect(() => {
    console.log("CartProvider: Saving to localStorage:", cartItems);
    if (cartItems.length > 0) {
      // Strip StaticImageData objects down to just `src` before saving
      const serialisable = cartItems.map((i) => ({
        ...i,
        image: typeof i.image === "string" ? i.image : i.image.src,
      }));
      localStorage.setItem("cartItems", JSON.stringify(serialisable));
      console.log("CartProvider: Saved to localStorage:", serialisable);
    } else {
      localStorage.removeItem("cartItems");
      console.log("CartProvider: Removed from localStorage (empty cart)");
    }
  }, [cartItems]);

  /* ---- Actions ---------------------------------------------------- */
  const addToCart = useCallback((item: CartItem) => {
    if (item.quantity <= 0) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

 const changeQuantity = useCallback(
  (_id: string, delta: number, fallback?: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i._id === _id);

      if (existing) {
        return prev
          .map(i =>
            i._id === _id
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

  const removeFromCart = useCallback((_id: string) => {
    setCartItems((prev) => prev.filter((i) => i._id !== _id));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const getItemQuantity = useCallback(
    (_id: string) => {
      const quantity = cartItems.find((i) => i._id === _id)?.quantity ?? 0;
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

