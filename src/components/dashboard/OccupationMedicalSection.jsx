import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Activity } from 'lucide-react';

export const OccupationMedicalSection = ({ jobForm, medicalForm, errors, onJobChange, onMedicalChange }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-white flex items-center gap-3">
                <div className="p-1.5 bg-orange-50 rounded-lg">
                    <Activity className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-800">Job & Medical Details</h3>
            </div>
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="job_type" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Job Type *</Label>
                        <select
                            id="job_type"
                            value={jobForm.type}
                            onChange={(e) => onJobChange('type', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1 h-11 text-sm focus:border-blue-500 focus:ring-blue-500 transition-all cursor-pointer"
                        >
                            <option value="Job">Job</option>
                            <option value="Business">Business</option>
                            <option value="Professional">Professional</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="annual_income" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Income *</Label>
                        <Input
                            id="annual_income"
                            type="number"
                            value={jobForm.annual_income}
                            onChange={(e) => onJobChange('annual_income', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.annual_income ? 'border-destructive' : ''}`}
                        />
                        {errors.annual_income && <p className="text-destructive text-[11px] font-medium mt-1">{errors.annual_income}</p>}
                    </div>
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="job_address" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Work Address *</Label>
                    <Input
                        id="job_address"
                        value={jobForm.address}
                        onChange={(e) => onJobChange('address', e.target.value)}
                        className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.job_address ? 'border-destructive' : ''}`}
                    />
                    {errors.job_address && <p className="text-destructive text-[11px] font-medium mt-1">{errors.job_address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="height" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Height (cm) *</Label>
                        <Input
                            id="height"
                            type="number"
                            value={medicalForm.height}
                            onChange={(e) => onMedicalChange('height', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.height ? 'border-destructive' : ''}`}
                        />
                        {errors.height && <p className="text-destructive text-[11px] font-medium mt-1">{errors.height}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="weight" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Weight (kg) *</Label>
                        <Input
                            id="weight"
                            type="number"
                            value={medicalForm.weight}
                            onChange={(e) => onMedicalChange('weight', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.weight ? 'border-destructive' : ''}`}
                        />
                        {errors.weight && <p className="text-destructive text-[11px] font-medium mt-1">{errors.weight}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
