import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const stockLoaderSlice = createSlice({
  name: "stockLoader",
  initialState,
  reducers: {
    setStockLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setStockLoading } = stockLoaderSlice.actions;
export default stockLoaderSlice.reducer;
