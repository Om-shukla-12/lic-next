const API_BASE_URL = 'https://lic-backend-2026.onrender.com/api/v1';
const AUTH_BASE_URL = 'https://lic-backend-2026.onrender.com/api/v1/auth';

/**
 * Centralized API service for backend communication
 */
export const apiService = {
    /**
     * Helper to get headers with optional auth token
     */
    getHeaders(token = null) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    },

    /**
     * Handle API responses
     */
    async handleResponse(response) {
        // Reduced logging for performance
        if (process.env.NODE_ENV === 'development') {
            console.log(`API [${response.status}] ${response.url.split('?')[0]}`);
        }

        if (response.status === 401) {
            throw new Error('UNAUTHORIZED');
        }

        // Try parsing JSON, if fails, try text
        let data;
        const text = await response.text();
        try {
            data = JSON.parse(text);
        } catch (e) {
            // It's not JSON, maybe it's a plain string URL or message
            // If status is OK, treat text as the data
            if (response.ok && text) {
                return text; // Return plain text (likely URL)
            }
            data = {};
        }

        if (!response.ok) {
            const message = data.detail || data.message || text || 'An unexpected error occurred';
            throw new Error(typeof message === 'object' ? JSON.stringify(message) : message);
        }

        // Return unwrapped data if it follows the standard response pattern
        if (data && data.success === true && data.data !== undefined) {
            return data.data;
        }

        return data;
    },

    /**
     * Auth APIs
     */
    async login(email, password) {
        const response = await fetch(`${AUTH_BASE_URL}/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email, password }),
        });
        return this.handleResponse(response);
    },
    async register(payload) {
        const response = await fetch(`${AUTH_BASE_URL}/register`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(payload),
        });
        return this.handleResponse(response);
    },

    /**
     * Form APIs
     */

    /**
     * Get my records
     */
    async getMyRecords(token) {
        const response = await fetch(`${API_BASE_URL}/customer/my-records`, {
            headers: this.getHeaders(token),
        });
        return this.handleResponse(response);
    },

    /**
     * Register customer
     */
    async registerCustomer(payload, token) {
        const response = await fetch(`${API_BASE_URL}/customer/register-customer`, {
            method: 'POST',
            headers: this.getHeaders(token),
            body: JSON.stringify(payload),
        });
        return this.handleResponse(response);
    },

    /**
     * Update customer
     */
    async updateCustomer(customerId, payload, token) {
        const response = await fetch(`${API_BASE_URL}/customer/update-customer/${customerId}`, {
            method: 'PUT',
            headers: this.getHeaders(token),
            body: JSON.stringify(payload),
        });
        return this.handleResponse(response);
    },

    /**
     * Delete customer
     */
    async deleteCustomer(customerId, token) {
        const response = await fetch(`${API_BASE_URL}/customer/delete-customer/${customerId}`, {
            method: 'DELETE',
            headers: this.getHeaders(token),
        });
        return this.handleResponse(response);
    },

    /**
     * PDF Processing APIs
     */
    async uploadPdfAndExtract(file, token) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/upload/extract`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                // Browser will set the correct boundary for multipart/form-data automatically
            },
            body: formData,
        });
        return this.handleResponse(response);
    },

    /**
     * Upload Customer Profile Photo
     */
    async uploadProfilePhoto(customerId, file, token) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_BASE_URL}/upload/profile-photo?customer_id=${customerId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        return this.handleResponse(response);
    },

    /**
     * Upload Logged-In User Profile Photo
     */
    async uploadMyProfilePhoto(file, token) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_BASE_URL}/upload/profile-photo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        return this.handleResponse(response);
    },

    /**
     * Profile APIs
     */
    async getProfile(token) {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            headers: this.getHeaders(token),
        });
        return this.handleResponse(response);
    },

    /**
     * Update profile
     */
    async updateProfile(payload, token) {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: 'PUT',
            headers: this.getHeaders(token),
            body: JSON.stringify(payload),
        });
        return this.handleResponse(response);
    },

    /**
     * Admin / Utility APIs
     */
    async getBirthdays(token) {
        const response = await fetch(`${API_BASE_URL}/admin/birthdays/today`, {
            headers: {
                ...this.getHeaders(token),
                // 'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || ''
            },
        });
        return this.handleResponse(response);
    },

    /**
     * Download APIs
     */
    async downloadPDF(customerId, token) {
        const response = await fetch(`${API_BASE_URL}/customer/download-pdf/${customerId}`, {
            headers: this.getHeaders(token),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.detail || 'Failed to download PDF');
        }

        return response.blob();
    },

    /**
     * Check if mobile number exists in agent's records
     */
    async checkMobileAvailability(mobileNumber, token) {
        try {
            const myRecords = await this.getMyRecords(token);
            const exists = (myRecords || []).some(record => record.customer?.mobile_number === mobileNumber);
            return { exists };
        } catch (error) {
            console.error("Error checking mobile availability:", error);
            return { exists: false, error: 'Could not verify number' };
        }
    }
};
