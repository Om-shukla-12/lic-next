'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertCircle, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';

export default function LoginPage() {
    const { login, isLoading: isAuthLoading } = useAuthContext();
    const router = useRouter();
    const [step, setStep] = useState('role');
    const [role, setRole] = useState(null);
    const [details, setDetails] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep('credentials');
        setError(null);
        // Prefetch relevant dashboard for zero-delay navigation
        if (selectedRole === 'agent') router.prefetch('/agent-dashboard');
        else if (selectedRole === 'customer') router.prefetch('/customer-dashboard');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const result = await login(details.email, details.password, role);

        if (!result.success) {
            setError(result.error || 'Login failed. Please check your credentials.');
        }
        // REDIRECT is now handled centrally in AuthContext to avoid race conditions and redundant push calls
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-6 shadow-xl shadow-primary/20">
                        <Shield className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h1 className="font-heading text-4xl text-primary mb-2">Welcome Back</h1>
                    <p className="font-paragraph text-base text-foreground">
                        लॉग इन करें। Sign in to your account
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
                            {/* <Button
                                onClick={() => handleRoleSelect('customer')}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-4 font-bold h-auto shadow-md"
                            >
                                Customer
                            </Button> */}
                        </div>
                    )}

                    {step === 'credentials' && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-4">
                                <Button
                                    type="button"
                                    onClick={() => setStep('role')}
                                    className="text-sm text-primary hover:underline bg-transparent hover:bg-transparent p-0 h-auto font-normal"
                                    disabled={isAuthLoading}
                                >
                                    ← Change Role ({role})
                                </Button>
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
                                    disabled={isAuthLoading}
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
                                    disabled={isAuthLoading}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-3 font-semibold h-auto flex items-center justify-center"
                                disabled={isAuthLoading}
                            >
                                {isAuthLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <p className="font-paragraph text-sm text-foreground">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary hover:underline font-semibold">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
