import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Setting up base query with authorization token
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL, // Base URL from environment variables
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token; // Extracting token from state
        if (token) {
            headers.set("Authorization", `Bearer ${token}`); // Setting Authorization header
        }
        return headers;
    },
});

// Define API slice
export const stepApi = createApi({
    reducerPath: "stepApi", // Define a unique key for the reducer
    baseQuery,
    endpoints: (builder) => ({
        // Mutation for fetching previous steps
        getPrevs: builder.mutation({
            query: (data) => ({
                url: "api/GetStepsData", // Endpoint for fetching data
                method: "POST", // HTTP method
                body: data, // Request payload
            }),
        }),

        // Mutation for posting step data
        postSteps: builder.mutation({
            query: (data) => ({
                url: "api/order/consultationMayfair",
                method: "POST", 
                body: data,
            }),
        }),
    }),
});

// Export hooks with consistent names
export const {
    useGetPrevsMutation, 
    usePostStepsMutation,
} = stepApi;
