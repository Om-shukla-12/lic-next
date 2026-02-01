import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, X, Camera, Image as ImageIcon, User } from 'lucide-react';

export const PersonalDetailsSection = ({ form, errors, onChange, onFileChange, onRemovePhoto }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Form Header */}
            <div className="p-4 md:p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-800">Customer Identity</h3>
                </div>
            </div>

            <div className="p-4 md:p-6 space-y-6">
                {/* Profile Picture Upload - Compact */}
                <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 border-dashed border-slate-300 bg-white overflow-hidden flex items-center justify-center shrink-0">
                        {form.profile_picture ? (
                            <>
                                <img src={form.profile_picture} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={onRemovePhoto}
                                    className="absolute top-0.5 right-0.5 bg-destructive/90 text-destructive-foreground p-1 rounded-md"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </>
                        ) : (
                            <div className="text-center">
                                <ImageIcon className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Profile Photo</p>
                        <div className="flex flex-wrap gap-2">
                            <input type="file" id="photo-upload" className="hidden" accept="image/*" onChange={onFileChange} />
                            <Button
                                type="button"
                                variant="outline"
                                className="h-8 text-xs rounded-lg flex items-center gap-1.5 px-3 border-slate-200"
                                onClick={() => document.getElementById('photo-upload').click()}
                            >
                                <Upload className="w-3 h-3" /> Upload
                            </Button>
                            <input type="file" id="camera-capture" className="hidden" accept="image/*" capture="user" onChange={onFileChange} />
                            <Button
                                type="button"
                                variant="outline"
                                className="h-8 text-xs rounded-lg flex items-center gap-1.5 px-3 border-slate-200"
                                onClick={() => document.getElementById('camera-capture').click()}
                            >
                                <Camera className="w-3 h-3" /> Take Photo
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Form Fields - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Row 1 */}
                    <div className="space-y-1.5">
                        <Label htmlFor="customer_name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name *</Label>
                        <Input
                            id="customer_name"
                            placeholder="As per Aadhaar"
                            value={form.customer_name}
                            onChange={(e) => onChange('customer_name', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.customer_name ? 'border-destructive' : ''}`}
                        />
                        {errors.customer_name && <p className="text-destructive text-[11px] font-medium mt-1">{errors.customer_name}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="dob" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date of Birth *</Label>
                        <Input
                            id="dob"
                            type="date"
                            placeholder="mm/dd/yyyy"
                            value={form.dob}
                            onChange={(e) => onChange('dob', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.dob ? 'border-destructive' : ''}`}
                        />
                        {errors.dob && <p className="text-destructive text-[11px] font-medium mt-1">{errors.dob}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="mobile_number" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mobile *</Label>
                        <Input
                            id="mobile_number"
                            type="tel"
                            placeholder="9876543210"
                            value={form.mobile_number}
                            onChange={(e) => onChange('mobile_number', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.mobile_number ? 'border-destructive' : ''}`}
                        />
                        {errors.mobile_number && <p className="text-destructive text-[11px] font-medium mt-1">{errors.mobile_number}</p>}
                    </div>

                    {/* Row 2 */}
                    <div className="space-y-1.5">
                        <Label htmlFor="father_name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Father's Name *</Label>
                        <Input
                            id="father_name"
                            value={form.father_name}
                            onChange={(e) => onChange('father_name', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.father_name ? 'border-destructive' : ''}`}
                        />
                        {errors.father_name && <p className="text-destructive text-[11px] font-medium mt-1">{errors.father_name}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="mother_name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mother's Name *</Label>
                        <Input
                            id="mother_name"
                            value={form.mother_name}
                            onChange={(e) => onChange('mother_name', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.mother_name ? 'border-destructive' : ''}`}
                        />
                        {errors.mother_name && <p className="text-destructive text-[11px] font-medium mt-1">{errors.mother_name}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="aadhaar_number" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Aadhaar No. *</Label>
                        <Input
                            id="aadhaar_number"
                            placeholder="12 Digit ID"
                            value={form.aadhaar_number}
                            onChange={(e) => onChange('aadhaar_number', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.aadhaar_number ? 'border-destructive' : ''}`}
                            maxLength={12}
                        />
                        {errors.aadhaar_number && <p className="text-destructive text-[11px] font-medium mt-1">{errors.aadhaar_number}</p>}
                    </div>

                    {/* Row 3 - Full Width Address */}
                    <div className="space-y-1.5 md:col-span-3">
                        <Label htmlFor="address" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Residential Address *</Label>
                        <textarea
                            id="address"
                            rows={3}
                            value={form.address}
                            onChange={(e) => onChange('address', e.target.value)}
                            className={`w-full p-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all text-sm min-h-[100px] resize-y ${errors.address ? 'border-destructive' : ''}`}
                        />
                        {errors.address && <p className="text-destructive text-[11px] font-medium mt-1">{errors.address}</p>}
                    </div>

                    {/* Additional Fields */}
                    <div className="space-y-1.5">
                        <Label htmlFor="gender" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Gender *</Label>
                        <select
                            id="gender"
                            value={form.gender}
                            onChange={(e) => onChange('gender', e.target.value)}
                            className={`w-full h-11 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm transition-all focus:border-blue-500 focus:ring-blue-500 cursor-pointer ${errors.gender ? 'border-destructive' : ''}`}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="spouse_name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Spouse Name</Label>
                        <Input
                            id="spouse_name"
                            value={form.spouse_name}
                            onChange={(e) => onChange('spouse_name', e.target.value)}
                            className="h-11 rounded-lg border-slate-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="customer_pan" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">PAN Number *</Label>
                        <Input
                            id="customer_pan"
                            placeholder="ABCDE1234F"
                            value={form.pan_number}
                            onChange={(e) => onChange('pan_number', e.target.value.toUpperCase())}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.pan_number ? 'border-destructive' : ''}`}
                            maxLength={10}
                        />
                        {errors.pan_number && <p className="text-destructive text-[11px] font-medium mt-1">{errors.pan_number}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.email ? 'border-destructive' : ''}`}
                        />
                        {errors.email && <p className="text-destructive text-[11px] font-medium mt-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="village" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Village *</Label>
                        <Input
                            id="village"
                            value={form.village}
                            onChange={(e) => onChange('village', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.village ? 'border-destructive' : ''}`}
                        />
                        {errors.village && <p className="text-destructive text-[11px] font-medium mt-1">{errors.village}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="pincode" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pincode *</Label>
                        <Input
                            id="pincode"
                            placeholder="6 digits"
                            value={form.pincode}
                            onChange={(e) => onChange('pincode', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.pincode ? 'border-destructive' : ''}`}
                            maxLength={6}
                        />
                        {errors.pincode && <p className="text-destructive text-[11px] font-medium mt-1">{errors.pincode}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
