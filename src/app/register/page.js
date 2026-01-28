'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState('role');
    const [role, setRole] = useState(null);
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [otp, setOtp] = useState('');

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep('details');
    };

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        if (details.password !== details.confirmPassword) {
            alert('पासवर्ड मेल नहीं खाते। Passwords do not match.');
            return;
        }
        setStep('otp');
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (role === 'agent') {
            router.push('/agent-dashboard');
        } else if (role === 'customer') {
            router.push('/customer-dashboard');
        } else if (role === 'do') {
            router.push('/do-dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-4">
                        <Shield className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h1 className="font-heading text-4xl text-primary mb-2">Register</h1>
                    <p className="font-paragraph text-base text-foreground">
                        रजिस्टर करें। Create your account
                    </p>
                </div>

                <div className="bg-card-background rounded-2xl shadow-md p-8">
                    {step === 'role' && (
                        <div className="space-y-4">
                            <h2 className="font-heading text-2xl text-card-heading mb-6">
                                Select Your Role
                            </h2>
                            <Button
                                onClick={() => handleRoleSelect('agent')}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-6 font-semibold h-auto"
                            >
                                Agent
                            </Button>
                            <Button
                                onClick={() => handleRoleSelect('customer')}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-6 font-semibold h-auto"
                            >
                                Customer
                            </Button>
                            <Button
                                onClick={() => handleRoleSelect('do')}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-6 font-semibold h-auto"
                            >
                                District Officer
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
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-3 font-semibold h-auto"
                            >
                                Continue
                            </Button>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div className="mb-4">
                                <Button
                                    type="button"
                                    onClick={() => setStep('details')}
                                    className="text-sm text-primary hover:underline bg-transparent hover:bg-transparent p-0 h-auto font-normal"
                                >
                                    ← Back
                                </Button>
                            </div>
                            <h2 className="font-heading text-2xl text-card-heading mb-2">
                                Verify OTP
                            </h2>
                            <p className="font-paragraph text-sm text-foreground mb-6">
                                OTP भेजा गया है। We've sent a code to {details.email}
                            </p>
                            <div className="space-y-2">
                                <Label htmlFor="otp" className="font-paragraph text-sm text-form-label">
                                    OTP Code
                                </Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="bg-input-background border-input-border focus:border-input-focus-border rounded-lg text-center text-2xl tracking-widest"
                                    maxLength={6}
                                    placeholder="000000"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-3 font-semibold h-auto"
                            >
                                Verify & Register
                            </Button>
                            <Button
                                type="button"
                                className="w-full bg-transparent text-primary hover:bg-muted rounded-lg py-3 font-semibold h-auto"
                            >
                                Resend OTP
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
