'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';

export default function RegisterPage() {
    const { register, isLoading: isAuthLoading } = useAuthContext();
    const [step, setStep] = useState('role');
    const [role, setRole] = useState(null);
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    // const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep('details');
        setError(null);
    };

    const handleDetailsSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (details.password !== details.confirmPassword) {
            setError('पासवर्ड मेल नहीं खाते। Passwords do not match.');
            return;
        }
        // setStep('otp'); // Removed OTP step

        const payload = {
            name: details.name,
            email: details.email,
            mobile: details.phone,
            password: details.password
        };

        const result = await register(payload);

        if (result.success) {
            setIsSuccess(true);
        } else {
            setError(result.error || 'Registration failed. Please try again.');
        }
    };
    /* Resend OTP Logic removed */

    const isLoading = isAuthLoading;

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="font-heading text-4xl text-primary mb-4">Success!</h1>
                    <p className="font-paragraph text-lg text-foreground mb-8">
                        Your account has been created successfully. You can now log in.
                    </p>
                    <Link href="/login">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-4 font-bold h-auto shadow-md">
                            Go to Login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-6 shadow-xl shadow-primary/20">
                        <Shield className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h1 className="font-heading text-4xl text-primary mb-2">Register</h1>
                    <p className="font-paragraph text-base text-foreground">
                        रजिस्टर करें। Create your account
                    </p>
                </div>

                <div className="bg-card-background rounded-2xl shadow-md p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
                            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {step === 'role' && (
                        <div className="space-y-4">
                            <h2 className="font-heading text-2xl text-card-heading mb-6">
                                Select Your Role
                            </h2>
                            <Button
                                onClick={() => handleRoleSelect('agent')}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-4 font-bold h-auto shadow-md"
                            >
                                Agent
                            </Button>
                            <Button
                                onClick={() => handleRoleSelect('customer')}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-4 font-bold h-auto shadow-md"
                            >
                                Customer
                            </Button>
                        </div>
                    )}

                    {step === 'details' && (
                        <form onSubmit={handleDetailsSubmit} className="space-y-6">
                            <div className="mb-4">
                                <Button
                                    type="button"
                                    onClick={() => setStep('role')}
                                    className="text-sm text-primary hover:underline bg-transparent hover:bg-transparent p-0 h-auto font-normal"
                                    disabled={isLoading}
                                >
                                    ← Change Role
                                </Button>
                            </div>
                            <h2 className="font-heading text-2xl text-card-heading mb-6">
                                Enter Your Details
                            </h2>
                            <div className="space-y-2">
                                <Label htmlFor="name" className="font-paragraph text-sm text-form-label">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={details.name}
                                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                                    className="bg-input-background border-input-border focus:border-input-focus-border rounded-lg"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-paragraph text-sm text-form-label">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={details.email}
                                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                                    className="bg-input-background border-input-border focus:border-input-focus-border rounded-lg"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="font-paragraph text-sm text-form-label">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={details.phone}
                                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                                    className="bg-input-background border-input-border focus:border-input-focus-border rounded-lg"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="font-paragraph text-sm text-form-label">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={details.password}
                                    onChange={(e) => setDetails({ ...details, password: e.target.value })}
                                    className="bg-input-background border-input-border focus:border-input-focus-border rounded-lg"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="font-paragraph text-sm text-form-label">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={details.confirmPassword}
                                    onChange={(e) => setDetails({ ...details, confirmPassword: e.target.value })}
                                    className="bg-input-background border-input-border focus:border-input-focus-border rounded-lg"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-3 font-semibold h-auto flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Register'
                                )}
                            </Button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <p className="font-paragraph text-sm text-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline font-semibold">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
