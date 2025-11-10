// RTK Query API slice for Stripe payment handling
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./api";

// Define the Stripe API slice
export const stripeApi = createApi({
  reducerPath: "stripeApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["StripePayment", "StripeCustomer"],
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<any, Record<string, any>>({
      query: (body) => ({
        url: "/payment/create-payment",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "StripePayment", id: "LIST" }],
    }),

    getPaymentIntentById: builder.query<any, string>({
      query: (id) => `/api/stripe/payment-intent/${id}`,
      providesTags: (result, error, id) => [{ type: "StripePayment", id }],
    }),

    cancelPaymentIntent: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/stripe/payment-intent/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "StripePayment", id },
        { type: "StripePayment", id: "LIST" },
      ],
    }),

    createCheckoutSession: builder.mutation<any, Record<string, any>>({
      query: (body) => ({
        url: "/api/stripe/checkout-session",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "StripePayment", id: "LIST" }],
    }),

    createRefund: builder.mutation<any, Record<string, any>>({
      query: (body) => ({
        url: "/api/stripe/refund",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "StripePayment", id: "LIST" }],
    }),

    getAllPaymentIntents: builder.query<any, void>({
      query: () => `/api/stripe/payment-intents`,
      providesTags: [{ type: "StripePayment", id: "LIST" }],
    }),

    // 🔹 Create Customer
    createCustomer: builder.mutation<any, Record<string, any>>({
      query: (body) => ({
        url: "/api/stripe/customer",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "StripeCustomer", id: "LIST" }],
    }),

    getCustomerById: builder.query<any, string>({
      query: (id) => `/api/stripe/customer/${id}`,
      providesTags: (result, error, id) => [{ type: "StripeCustomer", id }],
    }),

    triggerWebhook: builder.mutation<any, Record<string, any>>({
      query: (body) => ({
        url: "/api/stripe/webhook",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useGetPaymentIntentByIdQuery,
  useCancelPaymentIntentMutation,
  useCreateCheckoutSessionMutation,
  useCreateRefundMutation,
  useGetAllPaymentIntentsQuery,
  useCreateCustomerMutation,
  useGetCustomerByIdQuery,
  useTriggerWebhookMutation,
} = stripeApi;
