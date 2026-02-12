import { useState, useCallback, useEffect } from 'react';
import { apiService } from '@/lib/api-service';
import { useAuthContext } from '@/context/AuthContext';

const API_ASSET_BASE = 'https://lic-backend-2026.onrender.com';

const normalizeImageUrl = (url) => {
    if (!url || url === 'string') return '';
    if (url.includes('res.cloudinary.com/demo/image/upload')) return ''; // Filter out broken demo URLs
    if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
    return `${API_ASSET_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
};

const getProfileImageUrl = (record) => {
    const url =
        record?.customer?.profile_picture ||
        record?.customer?.profile_photo ||
        record?.customer?.profilePicture ||
        record?.customer?.photo ||
        record?.customer?.avatar ||
        record?.profile_picture ||
        record?.profile_photo ||
        record?.profilePicture ||
        record?.photo ||
        record?.avatar ||
        null;
    return normalizeImageUrl(url);
};

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

            const mappedCustomers = (apiRecords || []).map((record, index) => {
                const photoUrl = getProfileImageUrl(record);
                return {
                    _id: record._id || `api-customer-${index}`,
                    fullName: record.customer?.customer_name || 'Unknown',
                    emailAddress: record.customer?.email || 'N/A',
                    contactNumber: record.customer?.mobile_number || 'N/A',
                    aadhaar_number: record.customer?.aadhaar_number,
                    status: 'Active',
                    plan: record.policy?.insurance_number || 'N/A',
                    premium: record.policy?.installment_price || '0',
                    lastPaid: new Date().toISOString(),
                    profile_picture: photoUrl,
                    // Keep the raw record for editing
                    rawData: {
                        ...record,
                        customer: {
                            ...(record.customer || {}),
                            profile_picture: photoUrl || record?.customer?.profile_picture || record?.customer?.profile_photo || '',
                            profile_photo: photoUrl || record?.customer?.profile_photo || record?.customer?.profile_picture || ''
                        }
                    }
                };
            });

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
            // Deep refresh
            const apiRecords = await apiService.getMyRecords(token);
            const mappedCustomers = (apiRecords || []).map((record, index) => {
                const photoUrl = getProfileImageUrl(record);
                return {
                    _id: record._id || `api-customer-${index}`,
                    fullName: record.customer?.customer_name || 'Unknown',
                    emailAddress: record.customer?.email || 'N/A',
                    contactNumber: record.customer?.mobile_number || 'N/A',
                    aadhaar_number: record.customer?.aadhaar_number,
                    status: 'Active',
                    plan: record.policy?.insurance_number || 'N/A',
                    premium: record.policy?.installment_price || '0',
                    lastPaid: new Date().toISOString(),
                    profile_picture: photoUrl,
                    rawData: {
                        ...record,
                        customer: {
                            ...(record.customer || {}),
                            profile_picture: photoUrl || record?.customer?.profile_picture || record?.customer?.profile_photo || '',
                            profile_photo: photoUrl || record?.customer?.profile_photo || record?.customer?.profile_picture || ''
                        }
                    }
                };
            });
            setCustomers(mappedCustomers);
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
            // Manual update in state is faster than full reload but full reload is safer for now
            // Just optimizing the flow to not call loadCustomers (which sets loading again)
            const apiRecords = await apiService.getMyRecords(token);
            const mappedCustomers = (apiRecords || []).map((record, index) => {
                const photoUrl = getProfileImageUrl(record);
                return {
                    _id: record._id || `api-customer-${index}`,
                    fullName: record.customer?.customer_name || 'Unknown',
                    emailAddress: record.customer?.email || 'N/A',
                    contactNumber: record.customer?.mobile_number || 'N/A',
                    aadhaar_number: record.customer?.aadhaar_number,
                    status: 'Active',
                    plan: record.policy?.insurance_number || 'N/A',
                    premium: record.policy?.installment_price || '0',
                    lastPaid: new Date().toISOString(),
                    profile_picture: photoUrl,
                    rawData: {
                        ...record,
                        customer: {
                            ...(record.customer || {}),
                            profile_picture: photoUrl || record?.customer?.profile_picture || record?.customer?.profile_photo || '',
                            profile_photo: photoUrl || record?.customer?.profile_photo || record?.customer?.profile_picture || ''
                        }
                    }
                };
            });
            setCustomers(mappedCustomers);
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
            // Optimistic update: filter out deleted locally immediately
            setCustomers(prev => prev.filter(c => c._id !== customerId));
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

    const uploadPhoto = async (customerId, file) => {
        if (!token) return { success: false, error: "Authentication token missing" };
        try {
            const uploadResponse = await apiService.uploadProfilePhoto(customerId, file, token);
            const photoUrl =
                (typeof uploadResponse === 'string' ? uploadResponse : null) ||
                uploadResponse?.profile_picture ||
                uploadResponse?.profile_photo ||
                uploadResponse?.photo ||
                uploadResponse?.url ||
                uploadResponse?.image_url ||
                uploadResponse?.secure_url ||
                uploadResponse?.file_url ||
                uploadResponse?.location ||
                uploadResponse?.data?.profile_picture ||
                uploadResponse?.data?.profile_photo ||
                uploadResponse?.data?.url ||
                uploadResponse?.data?.image_url ||
                uploadResponse?.data?.secure_url ||
                null;

            return { success: true, photoUrl: normalizeImageUrl(photoUrl), uploadResponse };
        } catch (e) {
            console.error("Upload error:", e);
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
        uploadPhoto,
        downloadPDF
    };
};
