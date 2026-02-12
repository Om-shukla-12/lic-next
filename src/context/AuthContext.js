'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { apiService } from '@/lib/api-service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Initialize auth state from cookies/localStorage
    useEffect(() => {
        const savedToken = Cookies.get('auth-token');
        const savedUser = localStorage.getItem('user-data');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (email, password, selectedRole = null) => {
        setIsLoading(true);
        console.log('Attempting login for:', email, 'with fallback role:', selectedRole);
        try {
            const data = await apiService.login(email, password);
            console.log('Login API response data:', data);

            // Handle variant token and role field names from API (including unwrapped data)
            const accessToken = data.token || data.access_token || data.accessToken || data.id_token || data.data?.token;
            const apiRole = data.user_role || data.role || data.userRole || data.user?.role || data.user?.user_role || data.data?.role;
            const userName = data.name || data.username || data.email || data.user?.name || data.user?.customer_name || 'User';
            const userEmail = data.email || data.user?.email || email;
            const userPhone = data.phone || data.mobile || data.user?.phone || data.user?.mobile || data.user?.mobile_number || 'N/A';

            if (!accessToken) {
                console.error('No token found in response. Available keys:', Object.keys(data));
                return { success: false, error: 'Authentication failed: Server did not return a session token.' };
            }

            // Use apiRole if available, otherwise fallback to selectedRole
            const role = apiRole || selectedRole;
            console.log(`Role Identification - API: ${apiRole}, Selected: ${selectedRole}, Final: ${role}`);

            const userData = {
                name: userName,
                email: userEmail,
                phone: userPhone,
                role: role
            };
            setToken(accessToken);
            setUser(userData);

            // Persist
            const cookieOptions = {
                expires: 7,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            };

            Cookies.set('auth-token', accessToken, cookieOptions);
            Cookies.set('user-role', role, cookieOptions);
            localStorage.setItem('user-data', JSON.stringify(userData));
            sessionStorage.setItem('login-data', JSON.stringify(data));

            // Redirect based on role
            if (role === 'agent') router.replace('/agent-dashboard');
            else if (role === 'customer') router.replace('/customer-dashboard');
            else {
                console.warn(`Unknown role "${role}", defaulting to dashboard fallback or /`);
                // If we have a role but it doesn't match, maybe casing issue? 
                // Let's try lowercase check.
                const normalizedRole = role?.toLowerCase();
                if (normalizedRole === 'agent') router.replace('/agent-dashboard');
                else if (normalizedRole === 'customer') router.replace('/customer-dashboard');
                else router.replace('/');
            }

            return { success: true };
        } catch (error) {
            console.error('Login error details:', error);
            const errorMessage = error.message === 'UNAUTHORIZED' ? 'Invalid email or password' : error.message;
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const register = useCallback(async (payload) => {
        setIsLoading(true);
        try {
            await apiService.register(payload);
            // After registration, we usually want them to login
            // Or if API returns token, we can log them in directly
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateUser = useCallback((newUserData) => {
        setUser(prev => {
            const updated = { ...prev, ...newUserData };
            localStorage.setItem('user-data', JSON.stringify(updated));
            return updated;
        });
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        window._is_logging_out = true;

        // Clear all session identifiers
        const cookieOptions = { path: '/' };
        Cookies.remove('auth-token', cookieOptions);
        Cookies.remove('user-role', cookieOptions);

        localStorage.removeItem('user-data');
        sessionStorage.removeItem('login-data');

        // Full redirect to login
        window.location.href = '/login';
    }, []);

    // Handle unauthorized access or redirects for authenticated users
    // Middleware now handles this! We keep this simple to sync state.
    useEffect(() => {
        // Optional: Listen for storage events to sync across tabs
    }, []);

    const value = {
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        updateUser,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
