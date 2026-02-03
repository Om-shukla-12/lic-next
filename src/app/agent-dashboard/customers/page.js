'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/hooks/useAuth';
import { useCustomers } from '@/hooks/useCustomers';
import { useToast } from '@/hooks/use-toast';
import { CustomerList } from '@/components/dashboard/CustomerList';
import { useNavigationGuard } from '@/hooks/useNavigationGuard';
import AddCustomerForm from '@/components/dashboard/AddCustomerForm';

export default function AllCustomersPage() {
    const router = useRouter();
    const { authorized } = useAuth('agent');
    const [editingCustomer, setEditingCustomer] = useState(null);

    // We don't strictly need navigation guard here but it's consistent
    useNavigationGuard(authorized);

    const { toast } = useToast();
    const { customers, isLoading, updateCustomer, deleteCustomer, downloadPDF } = useCustomers();

    const handleEditCustomer = useCallback((customer) => {
        setEditingCustomer(customer);
    }, []);

    const handleCancelEdit = useCallback(() => {
        setEditingCustomer(null);
    }, []);

    const handleUpdateSubmit = useCallback(async (formData) => {
        if (!editingCustomer) return;
        const result = await updateCustomer(editingCustomer._id, formData);
        if (result.success) {
            toast({ title: "Customer Updated", variant: "default" });
            setEditingCustomer(null);
        } else {
            toast({ title: "Update Failed", description: result.error, variant: "destructive" });
        }
    }, [editingCustomer, updateCustomer, toast]);

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
        <div className="min-h-screen bg-background flex flex-col relative">
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

            {/* Edit Modal Overlay */}
            {editingCustomer && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
                        <div className="sticky top-0 right-0 p-4 bg-white z-10 flex justify-between items-center border-b">
                            <h2 className="text-xl font-bold text-primary">Edit Customer: {editingCustomer.fullName}</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCancelEdit}
                                className="rounded-full hover:bg-red-50 hover:text-red-500"
                            >
                                <X className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="p-4 md:p-6">
                            <AddCustomerForm
                                initialData={editingCustomer.rawData}
                                onSubmit={handleUpdateSubmit}
                                onCancel={handleCancelEdit}
                                isProcessing={isLoading}
                            />
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
