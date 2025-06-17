"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Currency, Loader2, CheckCircle2, XCircle } from "lucide-react";

const PaymentPage = () => {
    const [amount, setAmount] = useState(100);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', or 'failed'
    const [errorMessage, setErrorMessage] = useState("");

    const handlePayment = async () => {
        if (!amount || amount <= 0) {
            setErrorMessage("Please enter a valid amount");
            return;
        }

        setIsProcessing(true);
        setErrorMessage("");
        setPaymentStatus(null);

        try {
            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create order');
            }

            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: "INR",
                name: "Your Business",
                description: "Payment for Services",
                order_id: data.id,
                handler: function(response) {
                    // Verify payment signature here in a real application
                    setPaymentStatus('success');
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@gmail.com",
                    contact: "1234567890"
                },
                theme: {
                    color: "#4f46e5"
                },
                modal: {
                    ondismiss: function() {
                        if (paymentStatus !== 'success') {
                            setErrorMessage("Payment was cancelled");
                        }
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function(response) {
                console.error("Payment failed", response);
                setPaymentStatus('failed');
                setErrorMessage(response.error.description || "Payment failed. Please try again.");
            });

            rzp.open();

        } catch (error) {
            console.error("Payment error:", error);
            setErrorMessage(error.message || "An error occurred. Please try again.");
            setPaymentStatus('failed');
        } finally {
            setIsProcessing(false);
        }
    };

    if (paymentStatus === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center border border-green-200">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Payment Successful!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your payment of ₹{amount}.
                    </p>
                    <div className="bg-green-50 p-4 rounded-md mb-6">
                        <p className="text-green-700 font-medium">Transaction ID: {paymentStatus.razorpay_payment_id}</p>
                    </div>
                    <button
                        onClick={() => {
                            setPaymentStatus(null);
                            setAmount(100);
                        }}
                        className="w-full py-3 px-4 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Make Another Payment
                    </button>
                </div>
            </div>
        );
    }

    if (paymentStatus === 'failed') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center border border-red-200">
                    <div className="flex justify-center mb-4">
                        <XCircle className="w-16 h-16 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Payment Failed
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {errorMessage || "There was an issue processing your payment."}
                    </p>
                    <div className="bg-red-50 p-4 rounded-md mb-6">
                        <p className="text-red-700 font-medium">Please try again or contact support.</p>
                    </div>
                    <button
                        onClick={() => {
                            setPaymentStatus(null);
                            setErrorMessage("");
                        }}
                        className="w-full py-3 px-4 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
                    <Currency className="w-8 h-8 text-indigo-600" /> Payment Gateway
                </h1>

                <div className="mb-6">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter Amount (INR)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            min="1"
                            step="1"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="focus:ring-indigo-500 focus:border-indigo-500 text-black block w-full pl-7 pr-12 py-3 border-gray-300 rounded-md"
                            placeholder="100"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <span className="text-gray-500 sm:text-sm pr-3">.00</span>
                        </div>
                    </div>
                </div>

                {errorMessage && (
                    <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-red-600 text-center">{errorMessage}</p>
                    </div>
                )}

                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Test Card Details</h3>
                    <div className="text-xs bg-gray-100 p-3 rounded-md text-gray-600">
                        <p>Card: 4111 1111 1111 1111</p>
                        <p>CVV: Any 3 digits</p>
                        <p>Expiry: Any future date</p>
                        <p className="mt-2 text-indigo-600">Note: Use any amount ≥ ₹1 for testing</p>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center gap-2 ${
                        isProcessing 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    }`}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        `Pay ₹${amount}`
                    )}
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    Secure payment powered by Razorpay
                </p>
            </div>

            <Script 
                src="https://checkout.razorpay.com/v1/checkout.js" 
                strategy="beforeInteractive" 
                onError={() => setErrorMessage("Failed to load payment processor. Please refresh the page.")}
            />
        </div>
    );
};

export default PaymentPage;