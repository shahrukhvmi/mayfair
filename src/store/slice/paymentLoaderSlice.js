import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const paymentLoaderSlice = createSlice({
  name: "paymentLoader",
  initialState,
  reducers: {
    setPaymentLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPaymentLoading } = paymentLoaderSlice.actions;
export default paymentLoaderSlice.reducer;
