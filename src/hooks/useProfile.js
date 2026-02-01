import { useState, useCallback, useEffect } from 'react';
import { apiService } from '@/lib/api-service';
import { useAuthContext } from '@/context/AuthContext';

/**
 * Custom hook to manage user profile
 */
export const useProfile = () => {
    const { token, logout, user: authUser } = useAuthContext();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProfile = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        setError(null);
        try {
            const profileData = await apiService.getProfile(token);
            // Ensure role is preserved from auth state if missing in API response
            if (profileData && !profileData.role && authUser?.role) {
                profileData.role = authUser.role;
            }
            setProfile(profileData);
        } catch (e) {
            console.error("Failed to load profile", e);
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
        loadProfile();
    }, [loadProfile]);

    const updateProfile = async (payload) => {
        if (!token) return { success: false, error: "Authentication token missing" };

        setIsLoading(true);
        try {
            const apiResponse = await apiService.updateProfile(payload, token);

            // Merge existing profile with updated fields to ensure UI doesn't break
            // if API returns a simple success message instead of the full profile object.
            const updatedData = { ...profile, ...payload };

            // If API actually returns the updated profile object, use that as source of truth
            let finalProfile = (apiResponse && (apiResponse.email || apiResponse.name || apiResponse.fullName))
                ? apiResponse
                : updatedData;

            // Always ensure role is preserved
            if (finalProfile && !finalProfile.role && authUser?.role) {
                finalProfile = { ...finalProfile, role: authUser.role };
            }

            setProfile(finalProfile);
            return { success: true, data: finalProfile };
        } catch (e) {
            console.error("Profile update error:", e);
            if (e.message === 'UNAUTHORIZED') logout();
            return { success: false, error: e.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        profile: profile || authUser, // Fallback to auth user if profile not yet loaded
        isLoading,
        error,
        loadProfile,
        updateProfile
    };
};
