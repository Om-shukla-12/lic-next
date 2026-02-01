'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function HomePage() {
    const { user, isLoading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (user && user.role) {
                // Redirect based on role
                if (user.role === 'agent') router.push('/agent-dashboard');
                else if (user.role === 'customer') router.push('/customer-dashboard');
                else {
                    // Unknown role - send to login to re-authenticate or handle error
                    console.error("Unknown user role:", user.role);
                    router.push('/login');
                }
            } else {
                router.push('/login');
            }
        }
    }, [user, isLoading, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <LoadingSpinner message="Redirecting..." className="w-10 h-10 text-primary" />
        </div>
    );
}
