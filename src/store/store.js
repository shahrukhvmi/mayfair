import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/Auth/authSlice";
import { authApi } from "./services/Auth/authApi";
import { dashboardApi } from "./services/Dashboard/dashboardApi";
import stepReducer from "./slice/stepper";
import { addressApi } from "./services/addressApi/addressApi";
import { gpAddressApi } from "./services/addressApi/gpAddressApi";
import stepsSlice from "./slice/stepSlice";
import { stepApi } from "./services/Steps/Steps";
import cartSlice from "./slice/cartSlice"; // Fixed path
import addonCartSlice from "./slice/addonCartSlice"; // Fixed path
import paymentLoaderReducer from "./slice/paymentLoaderSlice"; // import the slice

const store = configureStore({
  reducer: {
    step: stepReducer,
    stepsSlice,
    cart: cartSlice, // Fixed cartSlice reducer setup
    addonCart: addonCartSlice,
    auth: authReducer,
    paymentLoader: paymentLoaderReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [gpAddressApi.reducerPath]: addressApi.reducer,
    [stepApi.reducerPath]: stepApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(addressApi.middleware)
      .concat(gpAddressApi.middleware)
      .concat(stepApi.middleware)
      .concat(addressApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
