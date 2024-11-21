"use client";

import React, { useState } from "react";

interface BeemPayProps {
  selectedClass: string;
  selectedClassName: string;
}

export default function BeemPay({ selectedClass, selectedClassName }: BeemPayProps) {
  const [amount, setAmount] = useState(20000);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");

  const handlePayment = async () => {
    setPaymentStatus("processing");
    try {
      // Mock payment processing logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPaymentStatus("success");
    } catch (error) {
      setPaymentStatus("failed");
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white border lg:w-[20rem] h-full flex flex-col  justify-center">
      <h2 className="text-xl font-semibold text-teal-700 mb-4">Payment</h2>

      <div className="mb-4">
        <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
          Selected Class
        </label>
        <p className="text-gray-800 font-medium bg-gray-100 px-3 py-2 rounded-md">
           {selectedClassName}
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
          Payment Amount TSH
        </label>
        <input
          type="number"
          id="amount"
          value={amount.toString()}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="input input-bordered w-full border-gray-300 focus:ring-teal-500 focus:border-teal-500"
          disabled
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={paymentStatus === "processing" || amount <= 0}
        className={`w-full py-2 px-4 text-white rounded-lg transition ${
          paymentStatus === "processing" || amount <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-teal-700 hover:bg-teal-600"
        }`}
      >
        {paymentStatus === "processing" ? "Processing..." : "Make Payment"}
      </button>

      {paymentStatus === "success" && (
        <p className="mt-4 text-green-600 font-medium">Payment Successful!</p>
      )}
      {paymentStatus === "failed" && (
        <p className="mt-4 text-red-600 font-medium">Payment Failed. Try Again.</p>
      )}
    </div>
  );
}
