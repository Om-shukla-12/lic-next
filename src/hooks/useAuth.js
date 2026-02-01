'use client';

import { useAuthContext } from '@/context/AuthContext';

/**
 * Hook for consuming auth state.
 * Refactored to use AuthContext for unified session management.
 */
export const useAuth = (allowedRole) => {
    const { user, isAuthenticated, isLoading, logout } = useAuthContext();

    // Check if authorized based on role
    const authorized = isAuthenticated && (!allowedRole || user?.role === allowedRole);

    return {
        authorized,
        isLoading,
        logout,
        user,
        isAuthenticated
    };
};
