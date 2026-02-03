const API_BASE_URL = 'https://lic-backend-2026.onrender.com/api';
const AUTH_BASE_URL = 'https://lic-backend-2026.onrender.com/auth';

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

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            const message = data.detail || data.message || 'An unexpected error occurred';
            throw new Error(typeof message === 'object' ? JSON.stringify(message) : message);
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


    async getMyRecords(token) {
        const response = await fetch(`${API_BASE_URL}/forms/my-records`, {
            headers: this.getHeaders(token),
        });
        return this.handleResponse(response);
    },

    async registerCustomer(payload, token) {
        const response = await fetch(`${API_BASE_URL}/forms/register-customer`, {
            method: 'POST',
            headers: this.getHeaders(token),
            body: JSON.stringify(payload),
        });
        return this.handleResponse(response);
    },

    async updateCustomer(customerId, payload, token) {
        const response = await fetch(`${API_BASE_URL}/forms/update-customer/${customerId}`, {
            method: 'PUT',
            headers: this.getHeaders(token),
            body: JSON.stringify(payload),
        });
        return this.handleResponse(response);
    },

    async deleteCustomer(customerId, token) {
        const response = await fetch(`${API_BASE_URL}/forms/delete-customer/${customerId}`, {
            method: 'DELETE',
            headers: this.getHeaders(token),
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

    async updateProfile(payload, token) {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: 'PUT',
            headers: this.getHeaders(token),
            body: JSON.stringify(payload),
        });
        return this.handleResponse(response);
    },

    /**
     * Download APIs
     */
    async downloadPDF(customerId, token) {
        const response = await fetch(`${API_BASE_URL}/forms/download-pdf/${customerId}`, {
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
