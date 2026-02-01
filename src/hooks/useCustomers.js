import { useState, useCallback, useEffect } from 'react';
import { apiService } from '@/lib/api-service';
import { useAuthContext } from '@/context/AuthContext';

/**
 * Custom hook to manage customer data and operations
 */
export const useCustomers = () => {
    const { token, logout } = useAuthContext();
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCustomers = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        setError(null);
        try {
            // Switch to getMyRecords for agent-specific data
            const apiRecords = await apiService.getMyRecords(token);

            const mappedCustomers = (apiRecords || []).map((record, index) => ({
                _id: record._id || `api-customer-${index}`,
                fullName: record.customer?.customer_name || 'Unknown',
                emailAddress: record.customer?.email || 'N/A',
                contactNumber: record.customer?.mobile_number || 'N/A',
                aadhaar_number: record.customer?.aadhaar_number,
                status: 'Active',
                plan: record.policy?.insurance_number || 'N/A',
                premium: record.policy?.installment_price || '0',
                lastPaid: new Date().toISOString(),
                // Keep the raw record for editing
                rawData: record
            }));

            setCustomers(mappedCustomers);
        } catch (e) {
            console.error("Failed to load customer data", e);
            if (e.message === 'UNAUTHORIZED') {
                logout();
            } else {
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, [token, logout]);

    useEffect(() => {
        loadCustomers();
    }, [loadCustomers]);

    const registerCustomer = async (payload) => {
        if (!token) return { success: false, error: "Authentication token missing" };

        setIsLoading(true);
        try {
            await apiService.registerCustomer(payload, token);
            await loadCustomers();
            return { success: true };
        } catch (e) {
            console.error("Registration error:", e);
            if (e.message === 'UNAUTHORIZED') logout();
            return { success: false, error: e.message };
        } finally {
            setIsLoading(false);
        }
    };

    const updateCustomer = async (customerId, payload) => {
        if (!token) return { success: false, error: "Authentication token missing" };

        setIsLoading(true);
        try {
            await apiService.updateCustomer(customerId, payload, token);
            await loadCustomers();
            return { success: true };
        } catch (e) {
            console.error("Update error:", e);
            if (e.message === 'UNAUTHORIZED') logout();
            return { success: false, error: e.message };
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCustomer = async (customerId) => {
        if (!token) return { success: false, error: "Authentication token missing" };

        setIsLoading(true);
        try {
            await apiService.deleteCustomer(customerId, token);
            await loadCustomers();
            return { success: true };
        } catch (e) {
            console.error("Delete error:", e);
            if (e.message === 'UNAUTHORIZED') logout();
            return { success: false, error: e.message };
        } finally {
            setIsLoading(false);
        }
    };

    const downloadPDF = async (customerId, customerName) => {
        if (!token) return { success: false, error: "Authentication token missing" };

        try {
            const blob = await apiService.downloadPDF(customerId, token);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `LIC_Customer_${customerName.replace(/\s+/g, '_')}_${customerId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            return { success: true };
        } catch (e) {
            console.error("Download error:", e);
            if (e.message === 'UNAUTHORIZED') logout();
            return { success: false, error: e.message };
        }
    };

    return {
        customers,
        isLoading,
        error,
        loadCustomers,
        registerCustomer,
        updateCustomer,
        deleteCustomer,
        downloadPDF
    };
};
