'use client';

import { useEffect, useCallback } from 'react';
import { useAuthContext } from '@/context/AuthContext';

/**
 * Professional Navigation Guard
 * Prevents accidental exits from dashboards and ensures session integrity.
 */
export const useNavigationGuard = (shouldPrevent = true) => {
    const { logout } = useAuthContext();

    const handlePopState = useCallback((event) => {
        if (!shouldPrevent || window._is_logging_out) return;

        // If they click back, they pop our trap. We immediately push it back.
        window.history.pushState({ trap: true }, '', window.location.href);

        const confirmed = window.confirm(
            "Security Notice:\n\nReturning to the previous page will end your current session. Do you wish to proceed?"
        );

        if (confirmed) {
            window._is_logging_out = true;
            logout();
        } else {
            // Re-push again to be extra safe
            window.history.pushState({ trap: true }, '', window.location.href);
        }
    }, [shouldPrevent, logout]);

    useEffect(() => {
        if (!shouldPrevent) return;

        // AGGRESSIVE LOCK:
        // Pushing twice creates a buffer. This ensures that even if the first 
        // back-click 'escapes' the popstate event briefly, there's a second 
        // entry waiting to catch them.
        const armTrap = () => {
            if (window._is_logging_out) return;
            window.history.pushState({ trap: true }, '', window.location.href);
            window.history.pushState({ trap: true }, '', window.location.href);
        };

        // Try to arm immediately and once after a tiny delay
        armTrap();
        const timer = setTimeout(armTrap, 300);

        const handleBeforeUnload = (e) => {
            if (window._is_logging_out) return;
            const msg = "Active session detected.";
            e.preventDefault();
            e.returnValue = msg;
            return msg;
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [shouldPrevent, handlePopState]);
};
