import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  cart: (() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      if (Array.isArray(parsedCart)) {
        return parsedCart;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  })(),
};

// Create Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to Cart
    addToCart(state, action) {
      const newItem = action.payload;

      if (Array.isArray(state.cart)) {
        const existingItem = state.cart.find((item) => item.id === newItem.id);

        if (existingItem) {
          existingItem.qty = newItem.qty;
        } else {
          state.cart.push({ ...newItem, qty: newItem.qty || 1 });
        }
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },


    // Remove from Cart
    removeFromCart(state, action) {
      if (Array.isArray(state.cart)) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Update Item in Cart
    updateCart(state, action) {
      const updatedItem = action.payload;

      if (Array.isArray(state.cart)) {
        const index = state.cart.findIndex((item) => item.id === updatedItem.id);

        if (index !== -1) {
          if (updatedItem.qty > 0) {
            state.cart[index] = updatedItem; // Update if qty > 0
          } else {
            state.cart.splice(index, 1); // Remove if qty = 0
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Clear Entire Cart
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

// Export Actions
export const { addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions;

// Export Reducer
export default cartSlice.reducer;
