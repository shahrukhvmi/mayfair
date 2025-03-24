// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  forgotToken: localStorage.getItem("forgotToken") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setForgotToken: (state, action) => {
      state.forgotToken = action.payload.forgotToken;
      localStorage.setItem("forgotToken", action.payload.forgotToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.forgotToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("forgotToken");
    },
  },
});

export const { setCredentials, logout, setForgotToken } = authSlice.actions;
export default authSlice.reducer;
