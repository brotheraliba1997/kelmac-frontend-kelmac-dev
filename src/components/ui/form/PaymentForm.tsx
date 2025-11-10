"use client";

import { useState } from "react";
import {
  IconVisa,
  IconMastercard,
  IconMastercard2,
  IconPaypal,
  IconBank,
} from "@/components/icons/icons";
import { useCreatePaymentIntentMutation } from "@/store/api/stripeApi";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRegisterInterpreterMutation } from "@/store/api/authApi";
import { useSelector } from "react-redux";

export default function PaymentForm() {
  const [selectedMethod, setSelectedMethod] = useState("credit");

  const auth = useSelector((state: any) => state?.auth);



  const [createPayment, { isLoading, isSuccess, isError }] =
    useCreatePaymentIntentMutation();

  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded");
      return;
    }
    try {
      const res: any = await createPayment({
        courseId: "69014cbd0fce61265374b155",
        userId: auth?.user?.id,
        amount: 1000,
        currency: "usd",
        metadata: {},
      }).unwrap();

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/class-schedule`,
        {
          course: "671018fabc123456789ef013",
          instructor: "671018fabc123456789ef014",
          students: auth?.user?.id,
          date: "2025-11-05",
          time: "15:30",
          duration: 60,
          googleMeetLink: "https://meet.google.com/xyz-1234-abc",
          securityKey: "a6d2b99a-f81a-4cb5-a123-984e07fd9e33",
          status: "scheduled",
          progress: 0,
        }
      );

      const clientSecret = res.clientSecret;
      console.log("Client Secret:", clientSecret);

      // Get CardElement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error(
          "CardElement not found! Make sure it's mounted inside <Elements>."
        );
        return;
      }

      // 2️⃣ Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        console.error("Payment failed:", result.error.message);
        // setStatus(`❌ ${result.error.message}`);
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === "succeeded"
      ) {
        console.log("Payment succeeded:", result);

        // Optional: Notify backend about success
        /*
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/confirm`,
        {
          paymentIntentId: result.paymentIntent.id,
          courseId: "69014cbd0fce61265374b155",
          userId: "6911ec768e2abd75f6c55472",
          amount: 1000,
        }
      );
      */

        // setStatus('✅ Payment successful!');
      }
    } catch (err: any) {
      console.error("Error in payment process:", err);
      // setStatus('⚠️ Payment failed.');
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary text-sm text-gray-800 placeholder-gray-400 bg-white";
  const labelClass = "block text-[15px] text-gray-900 mb-2";
  const baseCard =
    "rounded-2xl p-6 border border-gray-200 bg-white transition-all cursor-pointer hover:border-secondary";
  const activeCard = "rounded-2xl p-6 bg-gray-50 shadow-sm transition-all";
  const RadioCircle = ({ checked }: { checked: boolean }) => (
    <span
      className={`relative inline-flex items-center justify-center w-5 h-5 rounded-full border transition-all ${
        checked ? "bg-secondary" : "bg-white border-gray-300"
      }`}
    >
      <span
        className={`absolute w-2 h-2 rounded-full ${
          checked ? "bg-white" : "bg-transparent"
        }`}
      ></span>
    </span>
  );

  //   const handlePayment = async () => {
  //     try {
  //       const response = await createPayment({
  //         courseId,
  //         userId,
  //         amount: 5000, // amount could be dynamic
  //         currency: "usd",
  //         metadata: { paymentMethod: selectedMethod },
  //       }).unwrap();

  //       console.log("✅ Payment created:", response);
  //       // You can redirect or show success message here
  //     } catch (err) {
  //       console.error("❌ Payment creation failed:", err);
  //     }
  //   };

  return (
    <div className="max-w-2xl space-y-5">
      {/* CREDIT / DEBIT CARD */}
      <div
        className={selectedMethod === "credit" ? activeCard : baseCard}
        onClick={() => setSelectedMethod("credit")}
      >
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="credit"
              checked={selectedMethod === "credit"}
              onChange={() => setSelectedMethod("credit")}
              className="sr-only"
            />
            <RadioCircle checked={selectedMethod === "credit"} />
            <span className="font-semibold text-[18px] text-gray-900">
              Credit/Debit Card
            </span>
          </label>

          {/* Payment method icons */}
          <div className="flex items-center space-x-2">
            <IconVisa className="h-6" />
            <IconMastercard className="h-6" />
            <IconMastercard2 className="h-6" />
            <IconPaypal className="h-6" />
          </div>
        </div>

        {/* Expandable credit card input fields */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            selectedMethod === "credit"
              ? "max-h-[800px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-4 pt-1">
            <div>
              <label className={labelClass}>Cardholder Name*</label>
              <input
                type="text"
                placeholder="Enter cardholder name"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Card Number*</label>
              <input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                className={inputClass}
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className={labelClass}>Expiry Date*</label>
                <input type="text" placeholder="MM/YY" className={inputClass} />
              </div>
              <div className="w-1/2">
                <label className={labelClass}>CVC/CVV*</label>
                <input type="text" placeholder="123" className={inputClass} />
              </div>
            </div>

            <div className="flex items-center gap-2 text-secondary text-sm pt-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Payment information is secure and encrypted</span>
            </div>

            {/* Submit button */}
            <button
              onClick={handlePay}
              disabled={isLoading}
              className="w-full mt-5 bg-secondary text-white font-semibold py-3 rounded-xl hover:bg-secondary/90 transition"
            >
              {/* {isLoading ? "Processing..." : "Pay Now"} */}
              payment
            </button>

            {/* Status messages */}
            {isSuccess && (
              <p className="text-green-600 mt-2">
                Payment created successfully!
              </p>
            )}
            {isError && (
              <p className="text-red-500 mt-2">Failed to create payment</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
