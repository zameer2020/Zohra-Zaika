"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { priceFor } from "./products";
import type { WeightOption } from "./products";

export interface CartItem {
  productId: string;
  weight: WeightOption;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isCartOpen: boolean;
  lastAddedAt: number | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, weight: WeightOption, quantity?: number) => void;
  updateQuantity: (
    productId: string,
    weight: WeightOption,
    quantity: number,
  ) => void;
  updateWeight: (
    productId: string,
    oldWeight: WeightOption,
    newWeight: WeightOption,
  ) => void;
  removeItem: (productId: string, weight: WeightOption) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "zohra-zaika-cart-v1";
const MAX_QTY = 20;
const MIN_QTY = 1;

function sanitize(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const out: CartItem[] = [];
  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;
    const productId = typeof e.productId === "string" ? e.productId : "";
    const weight = e.weight === 250 || e.weight === 500 || e.weight === 1000
      ? (e.weight as WeightOption)
      : null;
    const quantity =
      typeof e.quantity === "number" &&
      Number.isInteger(e.quantity) &&
      e.quantity >= MIN_QTY &&
      e.quantity <= MAX_QTY
        ? e.quantity
        : null;
    if (!productId || !weight || !quantity) continue;
    // Merge duplicates
    const existing = out.find(
      (i) => i.productId === productId && i.weight === weight,
    );
    if (existing) {
      existing.quantity = Math.min(MAX_QTY, existing.quantity + quantity);
    } else {
      out.push({ productId, weight, quantity });
    }
  }
  return out;
}

function loadStoredCart(): unknown {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    // Ignore corrupt or unavailable storage; start with empty cart
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate cart from localStorage after mount so server and client
    // render the same empty initial state (avoids hydration mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(sanitize(loadStoredCart()));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage may be unavailable; cart still works in memory
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback(
    (productId: string, weight: WeightOption, quantity = 1) => {
      const safeQty = Math.min(
        MAX_QTY,
        Math.max(MIN_QTY, Math.floor(quantity) || MIN_QTY),
      );
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === productId && i.weight === weight,
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === productId && i.weight === weight
              ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + safeQty) }
              : i,
          );
        }
        return [...prev, { productId, weight, quantity: safeQty }];
      });
      setLastAddedAt(Date.now());
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, weight: WeightOption, quantity: number) => {
      if (!Number.isInteger(quantity) || quantity < MIN_QTY || quantity > MAX_QTY) {
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.weight === weight
            ? { ...i, quantity }
            : i,
        ),
      );
    },
    [],
  );

  const updateWeight = useCallback(
    (productId: string, oldWeight: WeightOption, newWeight: WeightOption) => {
      if (oldWeight === newWeight) return;
      setItems((prev) => {
        const moving = prev.find(
          (i) => i.productId === productId && i.weight === oldWeight,
        );
        if (!moving) return prev;
        const withoutMoving = prev.filter(
          (i) => !(i.productId === productId && i.weight === oldWeight),
        );
        const target = withoutMoving.find(
          (i) => i.productId === productId && i.weight === newWeight,
        );
        if (target) {
          return withoutMoving.map((i) =>
            i.productId === productId && i.weight === newWeight
              ? {
                  ...i,
                  quantity: Math.min(MAX_QTY, i.quantity + moving.quantity),
                }
              : i,
          );
        }
        return [...withoutMoving, { ...moving, weight: newWeight }];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string, weight: WeightOption) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.weight === weight)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const item of items) {
      c += item.quantity;
      s += priceFor(item.productId, item.weight) * item.quantity;
    }
    return { count: c, subtotal: s };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isCartOpen,
      lastAddedAt,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      updateWeight,
      removeItem,
      clearCart,
    }),
    [
      items,
      count,
      subtotal,
      isCartOpen,
      lastAddedAt,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      updateWeight,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
