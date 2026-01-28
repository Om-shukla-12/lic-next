'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { FileText, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function CustomerDashboardPage() {
    const [policies, setPolicies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const result = await BaseCrudService.getAll('policies');
            setPolicies(result?.items || []);
        } catch (e) {
            console.error("Failed to load policies", e);
        }
        setIsLoading(false);
    };

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
        const dueDate = new Date(p.dueDate);
        const today = new Date();
        const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays > 0 && diffDays <= 30;
    }).length;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="bg-primary text-primary-foreground py-12">
                    <div className="max-w-[100rem] mx-auto px-8">
                        <h1 className="font-heading text-4xl mb-2">Customer Dashboard</h1>
                        <p className="font-paragraph text-lg opacity-90">
                            ग्राहक डैशबोर्ड। View your policies and renewals
                        </p>
                    </div>
                </section>

                <section className="max-w-[100rem] mx-auto px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-card-background rounded-2xl shadow-md p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-paragraph text-sm text-foreground">Active Policies</p>
                                    <p className="font-heading text-3xl text-card-heading">{activePolicies}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card-background rounded-2xl shadow-md p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-secondary-foreground" />
                                </div>
                                <div>
                                    <p className="font-paragraph text-sm text-foreground">Total Premium</p>
                                    <p className="font-heading text-3xl text-card-heading">₹{totalPremium.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card-background rounded-2xl shadow-md p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-paragraph text-sm text-foreground">Upcoming Renewals</p>
                                    <p className="font-heading text-3xl text-card-heading">{upcomingRenewals}</p>
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
                            {isLoading ? (
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
