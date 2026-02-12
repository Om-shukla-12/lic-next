
"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { QrCode, CreditCard, Smartphone, Check, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";

function PaymentContent() {
    const searchParams = useSearchParams();
    const planName = searchParams.get("planName") || "Subscription";
    const amount = searchParams.get("amount") || "0";

    const [selectedMethod, setSelectedMethod] = React.useState("upi");
    const [processing, setProcessing] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);

    // Mock payment completion
    const handlePayment = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setCompleted(true);
        }, 2000);
    };

    if (completed) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl max-w-md mx-auto animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-2 text-blue-600">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                    Your subscription to <span className="font-semibold text-gray-900">{planName}</span> is now active.
                </p>
                <button
                    onClick={() => window.location.href = "/agent-dashboard"}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-1 bg-white p-6 rounded-2xl h-fit sticky top-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500">Plan</span>
                        <span className="font-medium text-gray-900">{planName}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-bold text-xl text-gray-900">₹{amount}</span>
                    </div>
                    <div className="pt-2">
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                            <Check className="w-4 h-4" />
                            <span>Secure Payment</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-blue-600">Select Payment Method</h2>

                {/* Method Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setSelectedMethod("upi")}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${selectedMethod === "upi"
                            ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                            : "border-gray-200 hover:border-gray-300 bg-transparent text-gray-600"
                            }`}
                    >
                        <QrCode className="w-5 h-5" />
                        <span className="font-medium">UPI / Scanner</span>
                    </button>

                    <button
                        onClick={() => setSelectedMethod("card")}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${selectedMethod === "card"
                            ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                            : "border-gray-200 hover:border-gray-300 bg-transparent text-gray-600"
                            }`}
                    >
                        <CreditCard className="w-5 h-5" />
                        <span className="font-medium">Card</span>
                    </button>

                    <button
                        onClick={() => setSelectedMethod("apps")}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${selectedMethod === "apps"
                            ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                            : "border-gray-200 hover:border-gray-300 bg-transparent text-gray-600"
                            }`}
                    >
                        <Smartphone className="w-5 h-5" />
                        <span className="font-medium">UPI Apps</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="min-h-[300px]">
                    {selectedMethod === "upi" && (
                        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 mb-6">
                                {/* Placeholder for QR Code */}
                                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg relative overflow-hidden">
                                    <QrCode className="w-full h-full text-gray-800 opacity-80" />
                                    {/* Overlay to simulate scan area */}
                                    <div className="absolute inset-0 border-2 border-primary/30 rounded-lg"></div>
                                </div>
                            </div>
                            <p className="text-sm text-center text-gray-500 mb-6 max-w-xs">
                                Scan this QR code with any UPI app to pay <span className="font-bold text-gray-900">₹{amount}</span> securely.
                            </p>

                            <div className="w-full relative px-4 md:px-12 mb-6">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-sm text-gray-400">Or enter UPI ID</span>
                                </div>
                            </div>

                            <div className="w-full max-w-sm flex gap-2">
                                <input
                                    type="text"
                                    placeholder="example@upi"
                                    className="flex-1 rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary text-gray-900"
                                />
                                <button
                                    disabled={processing}
                                    onClick={handlePayment}
                                    className="bg-primary text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    Verify
                                </button>
                            </div>
                        </div>
                    )}

                    {selectedMethod === "card" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-md mx-auto space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-gray-700">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 pl-9 text-gray-900" placeholder="0000 0000 0000 0000" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none text-gray-700">Expiry Date</label>
                                    <input className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 text-gray-900" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none text-gray-700">CVC</label>
                                    <input className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 text-gray-900" placeholder="123" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-gray-700">Cardholder Name</label>
                                <input className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 text-gray-900" placeholder="John Doe" />
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={processing}
                                className="w-full bg-primary text-white hover:bg-blue-700 h-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay Now"}
                            </button>
                        </div>
                    )}

                    {selectedMethod === "apps" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <p className="text-center text-sm text-muted-foreground mb-6">Select an app to authorize payment</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                                {/* Mock Logos for Payment Apps */}
                                {['GPay', 'PhonePe', 'Paytm', 'BHIM', 'Amazon Pay', 'Cred'].map((app) => (
                                    <button
                                        key={app}
                                        onClick={handlePayment}
                                        disabled={processing}
                                        className="flex flex-col items-center justify-center p-4 border border-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:border-primary/50 group"
                                    >
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <span className="text-xs font-bold text-gray-500">{app[0]}</span>
                                        </div>
                                        <span className="text-sm font-medium">{app}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-6 relative">
            <button
                onClick={() => router.back()}
                className="absolute top-6 left-6 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm border border-gray-100 transition-all hover:scale-110 z-20 group"
            >
                <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-primary" />
            </button>

            <div className="max-w-4xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
                <p className="text-gray-500 mt-2">Complete your purchase to activate your plan.</p>
            </div>
            <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
                <PaymentContent />
            </Suspense>
        </div>
    );
}
