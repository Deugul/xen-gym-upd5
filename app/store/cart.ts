import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart } from "~/lib/shopify/types";

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  setCart: (cart: Cart) => void;
  setLoading: (loading: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      isOpen: false,
      isLoading: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setCart: (cart) => set({ cart }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "xen-cart",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
