'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/hooks/useAuth';
import { useCustomers } from '@/hooks/useCustomers';
import { useToast } from '@/hooks/use-toast';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { CustomerList } from '@/components/dashboard/CustomerList';
import AddCustomerForm from '@/components/dashboard/AddCustomerForm';

import { useNavigationGuard } from '@/hooks/useNavigationGuard';

/**
 * Refactored Agent Dashboard Page
 * Uses modular components and custom hooks for better maintainability and performance.
 */
export default function AgentDashboardPage() {
    const router = useRouter();
    const { authorized } = useAuth('agent');

    // Prevent going back to login/home from dashboard
    useNavigationGuard(authorized);

    const { toast } = useToast();
    const { customers, isLoading, registerCustomer, updateCustomer, deleteCustomer, downloadPDF } = useCustomers();
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const handleFormSubmit = useCallback(async (payload) => {
        let result;
        if (editingCustomer) {
            result = await updateCustomer(editingCustomer._id, payload);
        } else {
            result = await registerCustomer(payload);
        }

        if (result.success) {
            toast({
                title: editingCustomer ? "Customer Updated" : "Customer Registered",
                description: editingCustomer ? "Customer details updated successfully." : "New customer has been added to your records.",
                variant: "success",
            });
            setShowAddCustomer(false);
            setEditingCustomer(null);
        } else {
            toast({
                title: "Operation Failed",
                description: result.error || "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    }, [registerCustomer, updateCustomer, editingCustomer, toast]);

    const handleEditCustomer = useCallback((customer) => {
        setEditingCustomer(customer);
        setShowAddCustomer(true);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleDeleteCustomer = useCallback(async (customerId) => {
        const result = await deleteCustomer(customerId);
        if (result.success) {
            toast({
                title: "Customer Deleted",
                description: "The customer record has been removed.",
                variant: "default",
            });
        } else {
            toast({
                title: "Delete Failed",
                description: result.error || "Could not delete customer.",
                variant: "destructive",
            });
        }
    }, [deleteCustomer, toast]);

    const handleViewCustomer = useCallback((customerId) => {
        router.push(`/customer/${customerId}`);
    }, [router]);

    const handleCancelForm = useCallback(() => {
        setShowAddCustomer(false);
        setEditingCustomer(null);
    }, []);

    const handleDownloadPDF = useCallback(async (customerId, customerName) => {
        const result = await downloadPDF(customerId, customerName);
        if (!result.success) {
            toast({
                title: "Download Failed",
                description: result.error || "Could not download PDF. Please try again.",
                variant: "destructive",
            });
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
                <section className="bg-primary text-primary-foreground py-16 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="max-w-[100rem] mx-auto px-8 relative z-10">
                        <h1 className="font-heading text-5xl font-bold mb-3 tracking-tight">Agent Dashboard</h1>
                        <p className="font-paragraph text-xl opacity-80 max-w-2xl">
                            एजेंट डैशबोर्ड। Manage your customers and policies in one secure place.
                        </p>
                    </div>
                </section>

                <section className="max-w-[100rem] mx-auto px-8 py-12">
                    {/* Stats Section */}
                    <DashboardStats
                        customerCount={customers.length}
                        planCount={0}
                    />

                    <div className="mb-10 flex gap-4">
                        <Button
                            onClick={() => {
                                if (showAddCustomer) {
                                    handleCancelForm();
                                } else {
                                    setShowAddCustomer(true);
                                }
                            }}
                            className={`${showAddCustomer ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'} hover:opacity-90 rounded-full px-8 py-4 font-bold text-lg h-auto shadow-lg transition-all hover:scale-105`}
                        >
                            {showAddCustomer ? <X className="w-6 h-6 mr-2" /> : <Plus className="w-6 h-6 mr-2" />}
                            {showAddCustomer ? 'Cancel' : 'Add New Customer'}
                        </Button>
                    </div>

                    {/* Conditional Registration Form */}
                    {showAddCustomer && (
                        <AddCustomerForm
                            onSubmit={handleFormSubmit}
                            onCancel={handleCancelForm}
                            isProcessing={isLoading}
                            initialData={editingCustomer?.rawData}
                        />
                    )}

                    {/* Customer Records Section */}
                    <div className="bg-card-background rounded-2xl shadow-md p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-heading text-2xl text-card-heading">My Customers</h2>
                            <div className="text-sm font-medium text-muted-foreground bg-muted/20 px-4 py-2 rounded-full">
                                {customers.length} Total Records
                            </div>
                        </div>
                        <CustomerList
                            customers={customers}
                            isLoading={isLoading}
                            onEdit={handleEditCustomer}
                            onDelete={handleDeleteCustomer}
                            onView={handleViewCustomer}
                            onDownload={handleDownloadPDF}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
