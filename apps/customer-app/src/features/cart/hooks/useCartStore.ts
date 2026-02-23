import { create } from 'zustand';
import { type MenuItem } from '@self-ordering/types';

export interface CartItem extends MenuItem {
   quantity: number;
}

interface CartState {
   items: CartItem[];
   totalPrice: number;

   // Actions
   addItem: (item: MenuItem) => void;
   removeItem: (itemId: string) => void;
   clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
   items: [],
   totalPrice: 0,

   addItem: (item) =>
      set((state) => {
         const existingItem = state.items.find((i) => i.id === item.id);

         let newItems = [];
         if (existingItem) {
            newItems = state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
         } else {
            newItems = [...state.items, { ...item, quantity: 1 }];
         }

         return {
            items: newItems,
            totalPrice: state.totalPrice + item.price,
         };
      }),

   removeItem: (itemId) =>
      set((state) => {
         const itemToRemove = state.items.find((i) => i.id === itemId);
         if (!itemToRemove) return state;

         const newItems = state.items.filter((i) => i.id !== itemId);
         return {
            items: newItems,
            totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,
         };
      }),

   clearCart: () => set({ items: [], totalPrice: 0 }),
}));
