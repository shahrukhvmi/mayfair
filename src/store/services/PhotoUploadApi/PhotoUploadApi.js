import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      // For file uploads you may remove or override this if needed
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

export const uploadPhotoApi = createApi({
  reducerPath: "uploadPhotoApi",
  baseQuery,
  endpoints: (builder) => ({
    // ✅ GET API - Fetch BMI images for order
    getBMIImagesForOrderProcess: builder.query({
      query: (orderId) => ({
        url: `/api/getBMIImagesForOrderProcess`,
        method: "GET",
        data: { orderId }, // ✅ query string
      }),
    }),

    // ✅ POST API - Upload BMI images for order
    BMIImagesForOrderProcess: builder.mutation({
      query: (data) => ({
        url: "/api/BMIImagesForOrderProcess",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetBMIImagesForOrderProcessQuery,
  useBMIImagesForOrderProcessMutation,
} = uploadPhotoApi;
