"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
    quantity: number;
    discount: number;
   
  category: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ ADD TO CART FUNCTIONALITY
    addToCart: (state, action: PayloadAction<CartItem>) => {
      
      
        const newItem = action.payload;
        const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);
      
        if (existingItemIndex !== -1) {
          // ✅ Correctly updating the quantity using Immer
          state.items[existingItemIndex] = {
            ...state.items[existingItemIndex],
            quantity: state.items[existingItemIndex].quantity + newItem.quantity,
          };
        } else {
          // ✅ Add new item with quantity
          state.items.push({ ...newItem, quantity: newItem.quantity });
        }
      
        // ✅ Update total quantity & total price correctly
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      
     
      },
      
    // ✅ REMOVE FROM CART FUNCTIONALITY
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(existingItemIndex, 1);
      }
    },

    // ✅ UPDATE QUANTITY FUNCTIONALITY
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Adjust total price and quantity
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalPrice += (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
      }
    },

    // ✅ CLEAR CART FUNCTIONALITY
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
