import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../data/products'

export interface CartLine {
  product: Product
  qty: number
}

interface CartState {
  lines: CartLine[]
  isOpen: boolean
  add: (product: Product, qty?: number) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  open: () => void
  close: () => void
  toggle: () => void
  count: () => number
  subtotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      add: (product, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.product.id === product.id)
          if (existing) {
            return {
              isOpen: true,
              lines: s.lines.map((l) =>
                l.product.id === product.id ? { ...l, qty: l.qty + qty } : l,
              ),
            }
          }
          return { isOpen: true, lines: [...s.lines, { product, qty }] }
        }),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.product.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.product.id !== id)
              : s.lines.map((l) => (l.product.id === id ? { ...l, qty } : l)),
        })),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () => get().lines.reduce((n, l) => n + l.qty * l.product.price, 0),
    }),
    { name: 'skyn-cart' },
  ),
)
