import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  addonCart: (() => {
    try {
      const savedCart = localStorage.getItem("addonCart"); // Updated key to 'addonCart'
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      if (Array.isArray(parsedCart)) {
        return parsedCart;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error loading addonCart from localStorage:", error);
      return [];
    }
  })(),
};

// Create Slice
const addonCartSlice = createSlice({
  name: "addonCart", // Updated slice name to 'addonCart'
  initialState,
  reducers: {
    // Add to Cart
    addToCartAddon(state, action) {
      const newItem = action.payload;
      const qty = Number(newItem.qty) || 1; // Ensure valid quantity

      if (Array.isArray(state.addonCart)) {
        const existingItem = state.addonCart.find((item) => item.id === newItem.id);

        if (existingItem) {
          existingItem.qty = qty; // Update quantity if item exists
        } else {
          state.addonCart.push({ ...newItem, qty });
        }
      }

      // Save updated addonCart to localStorage
      localStorage.setItem("addonCart", JSON.stringify(state.addonCart));
    },

    // Remove from Cart
    removeFromCartAddon(state, action) {
      if (Array.isArray(state.addonCart)) {
        state.addonCart = state.addonCart.filter((item) => item.id !== action.payload);
      }
      localStorage.setItem("addonCart", JSON.stringify(state.addonCart));
    },

    // Update Item in Cart
    updateCartAddon(state, action) {
      const updatedItem = action.payload;

      if (Array.isArray(state.addonCart)) {
        const index = state.addonCart.findIndex((item) => item.id === updatedItem.id);

        if (index !== -1) {
          if (updatedItem.qty > 0) {
            state.addonCart[index] = updatedItem; // Update if qty > 0
          } else {
            state.addonCart.splice(index, 1); // Remove if qty = 0
          }
        }
      }
      localStorage.setItem("addonCart", JSON.stringify(state.addonCart));
    },

    // Clear Entire Cart
    clearCartAddon(state) {
      state.addonCart = [];
      localStorage.removeItem("addonCart");
    },
  },
});

// Export Actions
export const { addToCartAddon, removeFromCartAddon, updateCartAddon, clearCartAddon } = addonCartSlice.actions;

// Export Reducer
export default addonCartSlice.reducer;