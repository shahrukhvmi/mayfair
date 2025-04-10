// src/features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "api/auth/registerPatient",
        method: "POST",
        body: userInfo,
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email, passwordlink }) => ({
        url: 'api/password/ForgotPasswordLink',
        method: 'POST',
        body: { email, passwordlink },
      }),
    }),
    
    changePassword: builder.mutation({
      query: ({ email, password, password_confirmation, token }) => ({
        url: "api/password/ForgotPassword",
        method: "POST",
        body: { email, password, password_confirmation, token },
      }),
    }),

    loginImpersonation: builder.mutation({
      query: ({ impersonate_email }) => ({
        url: 'api/impersonation',
        method: 'POST',
        body: { impersonate_email },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useLoginImpersonationMutation
} = authApi;
