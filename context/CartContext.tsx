"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartProduct {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tracklive_cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {
      localStorage.removeItem("tracklive_cart");
    }
  }, []);

  const save = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("tracklive_cart", JSON.stringify(newItems));
  };

  const addItem = (product: CartProduct) => {
    setItems(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      const updated = exists
        ? prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { product, quantity: 1 }];
      localStorage.setItem("tracklive_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id: number) => {
    save(items.filter(i => i.product.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) { removeItem(id); return; }
    save(items.map(i => i.product.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => save([]);

  const total = items.reduce((acc, i) => acc + i.product.preco * i.quantity, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}