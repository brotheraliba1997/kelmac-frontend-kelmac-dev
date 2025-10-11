"use client";

import { useState } from "react";
import {
    IconVisa,
    IconMastercard,
    IconMastercard2,
    IconPaypal,
    IconBank,
} from "@/components/icons/icons";

export default function PaymentForm() {
    const [selectedMethod, setSelectedMethod] = useState("credit");

    const inputClass =
        "w-full border border-gray-300 rounded-lg p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary text-sm text-gray-800 placeholder-gray-400 bg-white";
    const labelClass = "block text-[15px] text-gray-900 mb-2";
    const baseCard =
        "rounded-2xl p-6 border border-gray-200 bg-white transition-all cursor-pointer hover:border-secondary";
    const activeCard =
        "rounded-2xl p-6 bg-gray-50 shadow-sm transition-all";

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
                    <div className="flex items-center space-x-2">
                        <IconVisa className="h-6" />
                        <IconMastercard className="h-6" />
                        <IconMastercard2 className="h-6" />
                        <IconPaypal className="h-6" />
                    </div>
                </div>

                <div
                    className={`transition-all duration-500 ease-in-out ${selectedMethod === "credit"
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
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Payment information is secure and encrypted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BANK TRANSFER */}
            <div
                className={selectedMethod === "bank" ? activeCard : baseCard}
                onClick={() => setSelectedMethod("bank")}
            >
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            value="bank"
                            checked={selectedMethod === "bank"}
                            onChange={() => setSelectedMethod("bank")}
                            className="sr-only"
                        />
                        <RadioCircle checked={selectedMethod === "bank"} />
                        <span className="font-semibold text-[18px] text-gray-900">
                            Bank Transfer
                        </span>
                    </label>
                    <IconBank className="h-7 w-auto text-primary" />
                </div>
            </div>

            {/* STRIPE */}
            <div
                className={selectedMethod === "stripe" ? activeCard : baseCard}
                onClick={() => setSelectedMethod("stripe")}
            >
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            value="stripe"
                            checked={selectedMethod === "stripe"}
                            onChange={() => setSelectedMethod("stripe")}
                            className="sr-only"
                        />
                        <RadioCircle checked={selectedMethod === "stripe"} />
                        <div>
                            <span className="font-semibold text-[18px] text-gray-900 block">
                                Stripe
                            </span>
                            <p
                                className={`transition-all duration-500 ease-in-out ${selectedMethod === "stripe"
                                    ? "max-h-20 opacity-100"
                                    : "max-h-0 opacity-0"
                                    } text-sm text-gray-500 mt-1`}
                            >
                                You will be redirected to the Stripe website after submitting
                                your order
                            </p>
                        </div>
                    </label>
                    <div className="text-primary font-bold text-2xl">stripe</div>
                </div>
            </div>

            {/* PAYORDER */}
            <div
                className={selectedMethod === "payorder" ? activeCard : baseCard}
                onClick={() => setSelectedMethod("payorder")}
            >
                <label className="flex items-center gap-3 cursor-pointer mb-5">
                    <input
                        type="radio"
                        value="payorder"
                        checked={selectedMethod === "payorder"}
                        onChange={() => setSelectedMethod("payorder")}
                        className="sr-only"
                    />
                    <RadioCircle checked={selectedMethod === "payorder"} />
                    <span className="font-semibold text-[18px] text-gray-900">
                        Payorder
                    </span>
                </label>

                <div
                    className={`transition-all duration-500 ease-in-out ${selectedMethod === "payorder"
                        ? "max-h-[800px] opacity-100"
                        : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="space-y-4 pt-1">
                        <div>
                            <label className={labelClass}>Name*</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>PO Number*</label>
                            <input
                                type="text"
                                placeholder="Enter PO number"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Financial Contact Email*</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                className={inputClass}
                            />
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white">
                            <div className="mx-auto text-5xl text-primary">☁️↑</div>
                            <p className="mt-2 font-medium text-gray-800">
                                Drag & drop files or{" "}
                                <span className="text-primary cursor-pointer">Browse</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
