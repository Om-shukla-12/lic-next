'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuthContext } from '@/context/AuthContext';
import { apiService } from '@/lib/api-service';

import { useNavigationGuard } from '@/hooks/useNavigationGuard';

export default function CustomerDashboardPage() {
    const { user, token, isAuthenticated, isLoading: isAuthLoading } = useAuthContext();

    const [policies, setPolicies] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const loadData = useCallback(async () => {
        if (!token) return;
        setIsDataLoading(true);
        try {
            const apiRecords = await apiService.getMyRecords(token);

            if (apiRecords && apiRecords.length > 0) {
                const mappedPolicies = apiRecords.map((record, index) => ({
                    _id: record._id || `api-policy-${index}`,
                    policyNumber: record.policy?.insurance_number || 'N/A',
                    policyName: (record.policy?.installment_type || '') + " " + (record.policy?.insurance_number || ''),
                    premiumAmount: record.policy?.installment_price || 0,
                    renewalStatus: 'Active',
                    dueDate: record.policy?.maturity_date
                }));
                setPolicies(mappedPolicies);
            } else {
                setPolicies([]);
            }
        } catch (e) {
            console.error("Failed to load customer data", e);
        } finally {
            setIsDataLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-primary text-primary-foreground';
            case 'Pending':
                return 'bg-secondary text-secondary-foreground';
            case 'Overdue':
                return 'bg-destructive text-destructive-foreground';
            default:
                return 'bg-muted text-muted-foreground';
        }
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        try {
            return format(new Date(date), 'dd MMM yyyy');
        } catch {
            return 'N/A';
        }
    };

    const totalPremium = policies.reduce((sum, policy) => sum + (policy.premiumAmount || 0), 0);
    const activePolicies = policies.filter(p => p.renewalStatus === 'Active').length;
    const upcomingRenewals = policies.filter(p => {
        if (!p.dueDate) return false;
        try {
            const dueDate = new Date(p.dueDate);
            const today = new Date();
            const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            return diffDays > 0 && diffDays <= 30;
        } catch {
            return false;
        }
    }).length;

    const isLoading = isAuthLoading || isDataLoading;
    const authorized = isAuthenticated && user?.role === 'customer';

    // Prevent going back to login/home from dashboard
    useNavigationGuard(authorized);

    if (!authorized) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                {isAuthLoading ? <LoadingSpinner /> : <p>Redirecting...</p>}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="bg-primary text-primary-foreground py-16 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="max-w-[100rem] mx-auto px-8 relative z-10">
                        <h1 className="font-heading text-5xl font-bold mb-3 tracking-tight">Customer Dashboard</h1>
                        <p className="font-paragraph text-xl opacity-80 max-w-2xl">
                            ग्राहक डैशबोर्ड। Your policies and renewals at a glance.
                        </p>
                    </div>
                </section>

                <section className="max-w-[100rem] mx-auto px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-card rounded-2xl shadow-premium p-8 border border-muted/20 transition-all hover:scale-[1.02]">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
                                    <FileText className="w-8 h-8 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-paragraph text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Policies</p>
                                    <p className="font-heading text-4xl font-black text-primary">{activePolicies}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card rounded-2xl shadow-premium p-8 border border-muted/20 transition-all hover:scale-[1.02]">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center shadow-inner">
                                    <DollarSign className="w-8 h-8 text-secondary-foreground" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-paragraph text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Premium</p>
                                    <p className="font-heading text-4xl font-black text-secondary-foreground">₹{totalPremium.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card rounded-2xl shadow-premium p-8 border border-muted/20 transition-all hover:scale-[1.02]">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
                                    <Calendar className="w-8 h-8 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-paragraph text-xs font-bold uppercase tracking-wider text-muted-foreground">Upcoming Renewals</p>
                                    <p className="font-heading text-4xl font-black text-primary">{upcomingRenewals}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary/10 border border-secondary rounded-2xl p-6 mb-12">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-secondary-foreground flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-heading text-lg text-card-heading mb-2">
                                    Important Notice
                                </h3>
                                <p className="font-paragraph text-base text-foreground mb-4">
                                    महत्वपूर्ण सूचना। You have {upcomingRenewals} policy renewals due in the next 30 days. Please ensure timely payment to avoid policy lapse.
                                </p>
                                <Link
                                    href="/renewals"
                                    className="inline-block bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg px-6 py-2 font-semibold"
                                >
                                    View Renewals
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card-background rounded-2xl shadow-md p-8">
                        <h2 className="font-heading text-2xl text-card-heading mb-6">Your Policies</h2>
                        <div className="min-h-[400px]">
                            {isDataLoading ? (
                                <div className="flex justify-center items-center h-48">
                                    <LoadingSpinner />
                                </div>
                            ) : policies.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {policies.map((policy) => (
                                        <div
                                            key={policy._id}
                                            className="bg-upload-area-background border border-upload-area-border rounded-lg p-6"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-heading text-lg text-card-heading mb-1">
                                                        {policy.policyName}
                                                    </h3>
                                                    <p className="font-paragraph text-sm text-muted-foreground">
                                                        {policy.policyNumber}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`${getStatusColor(policy.renewalStatus)} px-3 py-1 rounded-lg font-paragraph text-xs font-semibold`}
                                                >
                                                    {policy.renewalStatus}
                                                </span>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-paragraph text-sm text-foreground">Premium Amount</span>
                                                    <span className="font-heading text-xl text-primary">
                                                        ₹{policy.premiumAmount?.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-paragraph text-sm text-foreground">Due Date</span>
                                                    <span className="font-paragraph text-sm text-card-heading font-semibold">
                                                        {formatDate(policy.dueDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <FileText className="w-16 h-16 text-muted mx-auto mb-4" />
                                    <h3 className="font-heading text-xl text-card-heading mb-2">
                                        No Policies Found
                                    </h3>
                                    <p className="font-paragraph text-base text-foreground">
                                        कोई पॉलिसी नहीं। Contact your agent to add policies
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
