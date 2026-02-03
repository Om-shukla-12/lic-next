'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/hooks/useAuth';
import { useCustomers } from '@/hooks/useCustomers';
import { useToast } from '@/hooks/use-toast';
import { CustomerList } from '@/components/dashboard/CustomerList';
import { useNavigationGuard } from '@/hooks/useNavigationGuard';

export default function AllCustomersPage() {
    const router = useRouter();
    const { authorized } = useAuth('agent');

    // We don't strictly need navigation guard here but it's consistent
    useNavigationGuard(authorized);

    const { toast } = useToast();
    const { customers, isLoading, updateCustomer, deleteCustomer, downloadPDF } = useCustomers();

    const handleEditCustomer = useCallback((customer) => {
        // Since editing happens on the main dashboard form, we should redirect back 
        // with the intent to edit if we want full integration, or implement modal editing.
        // For simplicity and speed, we'll redirect back to dashboard.
        router.push('/agent-dashboard');
        toast({
            title: "Redirecting",
            description: "Click edit on the dashboard to modify customer details.",
        });
    }, [router, toast]);

    const handleDeleteCustomer = useCallback(async (customerId) => {
        const result = await deleteCustomer(customerId);
        if (result.success) {
            toast({ title: "Customer Deleted", variant: "default" });
        } else {
            toast({ title: "Delete Failed", description: result.error, variant: "destructive" });
        }
    }, [deleteCustomer, toast]);

    const handleViewCustomer = useCallback((customerId) => {
        router.push(`/customer/${customerId}`);
    }, [router]);

    const handleDownloadPDF = useCallback(async (customerId, customerName) => {
        const result = await downloadPDF(customerId, customerName);
        if (!result.success) {
            toast({ title: "Download Failed", description: result.error, variant: "destructive" });
        }
    }, [downloadPDF, toast]);

    if (!authorized) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="bg-primary text-primary-foreground py-3 md:py-5 shadow-inner relative overflow-hidden">
                    <div className="max-w-[100rem] mx-auto px-4 relative z-10 flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push('/agent-dashboard')}
                            className="text-primary-foreground hover:bg-white/10 rounded-full"
                        >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </Button>
                        <div>
                            <h1 className="font-heading text-xl md:text-3xl font-bold tracking-tight">All Customers</h1>
                            <p className="font-paragraph text-xs md:text-sm opacity-80">
                                विस्तृत ग्राहक सूची। Search and manage all your records.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="max-w-[100rem] mx-auto px-4 py-3 md:py-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push('/agent-dashboard')}
                        className="text-primary hover:bg-primary/5 flex items-center gap-2 font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </section>

                <section className="max-w-[100rem] mx-auto px-4 py-2 md:py-4">
                    <div className="bg-card-background rounded-xl md:rounded-2xl shadow-md p-4 md:p-8">
                        <CustomerList
                            customers={customers}
                            isLoading={isLoading}
                            onEdit={handleEditCustomer}
                            onDelete={handleDeleteCustomer}
                            onView={handleViewCustomer}
                            onDownload={handleDownloadPDF}
                            showSearch={true}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
