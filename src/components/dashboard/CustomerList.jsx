import React, { useState } from 'react';
import { Users, Eye, Edit2, Trash2, AlertTriangle, FileText, Download, Search, X as CloseIcon } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const CustomerList = React.memo(({ customers, isLoading, onEdit, onDelete, onView, onDownload }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [downloadingId, setDownloadingId] = useState(null);
    const [customerToDelete, setCustomerToDelete] = useState(null);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <LoadingSpinner />
            </div>
        );
    }

    if (customers.length === 0) {
        return (
            <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="font-heading text-xl text-card-heading mb-2">
                    No Customers Yet
                </h3>
                <p className="font-paragraph text-base text-foreground">
                    ग्राहक जोड़ें। Add your first customer to get started
                </p>
            </div>
        );
    }

    const confirmDelete = () => {
        if (customerToDelete) {
            onDelete(customerToDelete._id);
            setCustomerToDelete(null);
        }
    };

    const handleDownload = async (e, customer) => {
        e.stopPropagation();
        setDownloadingId(customer._id);
        await onDownload(customer._id, customer.fullName);
        setDownloadingId(null);
    };

    const filteredCustomers = customers.filter(customer => {
        const query = searchQuery.toLowerCase();
        return (
            customer.fullName?.toLowerCase().includes(query) ||
            customer.emailAddress?.toLowerCase().includes(query) ||
            customer.contactNumber?.toLowerCase().includes(query) ||
            customer.plan?.toLowerCase().includes(query)
        );
    });

    return (
        <>
            <div className="mb-8 relative max-w-md">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="w-4 h-4" />
                </div>
                <Input
                    placeholder="Search by name, email, mobile or policy..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 h-11 rounded-xl border-muted/20 focus:ring-primary/20"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <CloseIcon className="w-4 h-4" />
                    </button>
                )}
            </div>

            {filteredCustomers.length === 0 ? (
                <div className="text-center py-12 bg-muted/10 rounded-2xl border border-dashed border-muted/20">
                    <Search className="w-12 h-12 text-muted mx-auto mb-4 opacity-20" />
                    <h3 className="font-heading text-lg text-card-heading mb-1">No results found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCustomers.map((customer) => (
                        <div
                            key={customer._id}
                            className="bg-card rounded-2xl shadow-premium border border-muted/20 p-6 transition-all hover:shadow-hover group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                                        {customer.plan || 'No Plan'}
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEdit(customer)}
                                        className="p-2 hover:bg-secondary/10 rounded-lg text-secondary-foreground transition-colors"
                                        title="Edit Customer"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCustomerToDelete(customer);
                                        }}
                                        className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
                                        title="Delete Customer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-heading text-lg font-bold text-card-heading mb-1">
                                {customer.fullName}
                            </h3>
                            <p className="font-paragraph text-sm text-foreground/70 mb-1 truncate">
                                {customer.emailAddress}
                            </p>
                            <p className="font-paragraph text-sm text-foreground/70 mb-4">
                                {customer.contactNumber}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-muted/20 gap-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => onView(customer._id)}
                                    className="h-8 text-xs font-bold text-primary hover:bg-primary/5 px-4 flex items-center gap-1.5"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    View
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => handleDownload(e, customer)}
                                    disabled={downloadingId === customer._id}
                                    className="h-8 text-[11px] font-bold flex items-center gap-1.5 border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-primary"
                                >
                                    {downloadingId === customer._id ? (
                                        <>
                                            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-3.5 h-3.5" />
                                            Download PDF
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AlertDialog open={!!customerToDelete} onOpenChange={(open) => !open && setCustomerToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the customer record for
                            <span className="font-bold text-foreground"> {customerToDelete?.fullName}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete Customer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
});

CustomerList.displayName = 'CustomerList';
