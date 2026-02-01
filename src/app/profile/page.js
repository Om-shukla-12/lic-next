'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { User, Mail, Shield, Save, Loader2, ArrowLeft, Pencil, X } from 'lucide-react';
import Link from 'next/link';
import { useProfile } from '@/hooks/useProfile';
import { useAuthContext } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    const { profile, isLoading, updateProfile, error } = useProfile();
    const { user: authUser } = useAuthContext();

    const getDashboardPath = () => {
        if (!authUser) return '/login';
        if (authUser.role === 'agent') return '/agent-dashboard';
        if (authUser.role === 'customer') return '/customer-dashboard';
        return '/login';
    };

    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        role: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || profile.fullName || '',
                email: profile.email || '',
                mobile: profile.mobile || profile.contactNumber || '',
                role: profile.role || ''
            });
        }
    }, [profile]);

    const handleEdit = () => setIsEditing(true);

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original data
        if (profile) {
            setFormData({
                name: profile.name || profile.fullName || '',
                email: profile.email || '',
                mobile: profile.mobile || profile.contactNumber || '',
                role: profile.role || ''
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const result = await updateProfile(formData);

        if (result.success) {
            toast({
                title: "Profile Updated",
                description: "Your profile details have been saved successfully.",
                variant: "success",
            });
            setIsEditing(false); // Stop editing after save
        } else {
            toast({
                title: "Update Failed",
                description: result.error || "Failed to update profile.",
                variant: "destructive",
            });
        }
        setIsSaving(false);
    };

    if (isLoading && !profile) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 max-w-4xl mx-auto w-full px-8 py-12">
                <div className="mb-6">
                    <Link
                        href={getDashboardPath()}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">My Profile</h1>
                        <p className="font-paragraph text-muted-foreground">Manage your personal information and account settings.</p>
                    </div>
                    {!isEditing && (
                        <Button
                            onClick={handleEdit}
                            className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 transition-all rounded-xl"
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-card rounded-2xl shadow-premium border border-muted/20 p-8 text-center sticky top-24">
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                                <User className="w-12 h-12" />
                            </div>
                            <h2 className="font-heading text-xl font-bold text-card-heading mb-1">{formData.name || 'User'}</h2>
                            <p className="font-paragraph text-sm text-muted-foreground mb-4 uppercase tracking-widest">{formData.role}</p>

                            <div className="flex flex-col gap-2 pt-6 border-t border-muted/20 text-left">
                                <div className="flex items-center gap-3 text-sm text-foreground/70">
                                    <Mail className="w-4 h-4" />
                                    <span className="truncate">{formData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-foreground/70">
                                    <Shield className="w-4 h-4" />
                                    <span>Verified Account</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="md:col-span-2">
                        <div className="bg-card-background rounded-2xl shadow-md p-8">
                            <h3 className="font-heading text-2xl text-card-heading mb-8">Personal Information</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full bg-upload-area-background border border-upload-area-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-paragraph ${!isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-upload-area-background border border-upload-area-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-paragraph disabled:opacity-50"
                                            placeholder="your@email.com"
                                            disabled
                                        />
                                        <p className="text-[10px] text-muted-foreground italic">Email cannot be changed manually.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mobile Number</label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full bg-upload-area-background border border-upload-area-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-paragraph ${!isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            placeholder="Your contact number"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Role</label>
                                        <input
                                            type="text"
                                            value={formData.role}
                                            className="w-full bg-muted/20 border border-upload-area-border rounded-xl px-4 py-3 text-muted-foreground font-paragraph uppercase tracking-widest disabled:cursor-not-allowed"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className={`pt-6 border-t border-muted/20 flex justify-end gap-3 transition-all duration-300 ${isEditing ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden pt-0'}`}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        className="rounded-xl px-6"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
