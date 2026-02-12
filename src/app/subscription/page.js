
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Zap, Star, Layout, ArrowLeft } from "lucide-react";

export default function SubscriptionPage() {
    const router = useRouter();

    const plans = [
        {
            name: "Basic Plan",
            price: 20,
            features: ["Standard Support", "Access to Basic Features", "Email Updates"],
            icon: <Layout className="w-8 h-8 text-blue-500" />,
            color: "blue",
        },
        {
            name: "Standard Plan",
            price: 50,
            features: ["Priority Support", "All Basic Features", "Advanced Analytics", "Monthly Reports"],
            icon: <Zap className="w-8 h-8 text-yellow-500" />,
            color: "yellow",
            popular: true,
        },
        {
            name: "Premium Plan",
            price: 100,
            features: ["24/7 Dedicated Support", "All Standard Features", "Custom Dashboard", "API Access", "Unlimited Storage"],
            icon: <Star className="w-8 h-8 text-purple-500" />,
            color: "purple",
        },
    ];

    const handleBuy = (plan) => {
        // Redirect to payment page with plan details as query params
        const query = new URLSearchParams({
            planName: plan.name,
            amount: plan.price.toString(),
        }).toString();
        router.push(`/payment?${query}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center p-6 relative">
            <button
                onClick={() => router.back()}
                className="absolute top-6 left-6 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm border border-gray-100 transition-all hover:scale-110 z-20 group"
            >
                <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-primary" />
            </button>
            <div className="text-center mb-12 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-blue">
                    Choose Your Plan
                </h1>
                <p className="text-lg text-muted-foreground">
                    Unlock the full potential of your agent dashboard with our premium subscription plans.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl bg-white/80 backdrop-blur-md border border-white/20 shadow-xl ${plan.popular ? "border-primary ring-2 ring-primary/20 scale-105 z-10" : "border-gray-100"
                            }`}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6 flex justify-center">
                            <div className={`p-4 rounded-full bg-${plan.color}-50`}>
                                {plan.icon}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">{plan.name}</h3>
                        <div className="flex justify-center items-baseline mb-6">
                            <span className="text-4xl font-extrabold text-gray-900">₹{plan.price}</span>
                            <span className="ml-1 text-gray-500">/month</span>
                        </div>

                        <ul className="flex-1 space-y-4 mb-8">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm md:text-base">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleBuy(plan)}
                            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all shadow-lg active:scale-95 ${plan.popular
                                ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-blue-500/25"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-md"
                                }`}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
