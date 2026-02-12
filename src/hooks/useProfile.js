import { useState, useCallback, useEffect } from 'react';
import { apiService } from '@/lib/api-service';
import { useAuthContext } from '@/context/AuthContext';

/**
 * Custom hook to manage user profile
 */
export const useProfile = () => {
    const { token, logout, user: authUser, updateUser } = useAuthContext();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_ASSET_BASE = 'https://lic-backend-2026.onrender.com';

    const normalizeImageUrl = (url) => {
        if (!url || url === 'string') return '';
        if (url.includes('res.cloudinary.com/demo/image/upload')) return ''; // Filter out broken demo URLs
        if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
        return `${API_ASSET_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const extractPhotoUrl = (resp) => normalizeImageUrl(
        (typeof resp === 'string' ? resp : null) ||
        resp?.profile_picture ||
        resp?.profile_photo ||
        resp?.profilePicture ||
        resp?.photo ||
        resp?.avatar ||
        resp?.url ||
        resp?.image_url ||
        resp?.secure_url ||
        resp?.file_url ||
        resp?.location ||
        resp?.data?.profile_picture ||
        resp?.data?.profile_photo ||
        resp?.data?.profilePicture ||
        resp?.data?.photo ||
        resp?.data?.avatar ||
        resp?.data?.url ||
        resp?.data?.image_url ||
        resp?.data?.secure_url ||
        null
    );

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
    }, [token, logout, authUser?.role]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const updateProfile = async (payload, profilePhotoFile = null) => {
        if (!token) return { success: false, error: "Authentication token missing" };

        setIsLoading(true);
        try {
            let uploadedPhotoUrl = '';
            if (profilePhotoFile) {
                const uploadResponse = await apiService.uploadMyProfilePhoto(profilePhotoFile, token);
                uploadedPhotoUrl = extractPhotoUrl(uploadResponse);
            }

            let finalPayload = { ...payload };
            if (uploadedPhotoUrl) {
                finalPayload.profile_picture = uploadedPhotoUrl;
                finalPayload.profile_photo = uploadedPhotoUrl; // Send both keys to be safe
            }

            const apiResponse = await apiService.updateProfile(finalPayload, token);

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

            if (uploadedPhotoUrl) {
                finalProfile = {
                    ...finalProfile,
                    profile_picture: uploadedPhotoUrl,
                    profile_photo: uploadedPhotoUrl
                };
            }

            setProfile(finalProfile);

            // Sync with global auth user state if name or email changed
            const globalName = finalProfile.name || finalProfile.fullName || finalProfile.customer_name;
            updateUser({
                ...(globalName ? { name: globalName } : {}),
                ...(uploadedPhotoUrl ? { profile_picture: uploadedPhotoUrl, profile_photo: uploadedPhotoUrl } : {})
            });

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
        profile: profile || authUser,
        isLoading,
        error,
        loadProfile,
        updateProfile
    };
};
