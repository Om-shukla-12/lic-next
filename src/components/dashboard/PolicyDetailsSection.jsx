import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileText } from 'lucide-react';

export const PolicyDetailsSection = ({ form, errors, onChange }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-paragraph">
            <div className="p-4 md:p-6 border-b border-slate-100 bg-white flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-800">Policy Specifications</h3>
            </div>
            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                    <Label htmlFor="insurance_rate" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Insurance Rate (%) *</Label>
                    <Input
                        id="insurance_rate"
                        type="number"
                        step="0.1"
                        value={form.insurance_rate}
                        onChange={(e) => onChange('insurance_rate', e.target.value)}
                        className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.insurance_rate ? 'border-destructive' : ''}`}
                    />
                    {errors.insurance_rate && <p className="text-destructive text-[11px] font-medium mt-1">{errors.insurance_rate}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="insurance_number" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Insurance Number *</Label>
                    <Input
                        id="insurance_number"
                        value={form.insurance_number}
                        onChange={(e) => onChange('insurance_number', e.target.value)}
                        className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.insurance_number ? 'border-destructive' : ''}`}
                    />
                    {errors.insurance_number && <p className="text-destructive text-[11px] font-medium mt-1">{errors.insurance_number}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="premium_year" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Premium Year *</Label>
                    <Input
                        id="premium_year"
                        type="number"
                        value={form.premium_year}
                        onChange={(e) => onChange('premium_year', e.target.value)}
                        className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.premium_year ? 'border-destructive' : ''}`}
                    />
                    {errors.premium_year && <p className="text-destructive text-[11px] font-medium mt-1">{errors.premium_year}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="maturity_date" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Maturity Date *</Label>
                    <Input
                        id="maturity_date"
                        type="date"
                        value={form.maturity_date}
                        onChange={(e) => onChange('maturity_date', e.target.value)}
                        className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.maturity_date ? 'border-destructive' : ''}`}
                    />
                    {errors.maturity_date && <p className="text-destructive text-[11px] font-medium mt-1">{errors.maturity_date}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="installment_type" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Installment *</Label>
                    <select
                        id="installment_type"
                        value={form.installment_type}
                        onChange={(e) => onChange('installment_type', e.target.value)}
                        className="w-full h-11 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm transition-all focus:border-blue-500 focus:ring-blue-500 cursor-pointer"
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Half-Yearly">Half-Yearly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="installment_price" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Premium Price (₹) *</Label>
                    <Input
                        id="installment_price"
                        type="number"
                        value={form.installment_price}
                        onChange={(e) => onChange('installment_price', e.target.value)}
                        className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.installment_price ? 'border-destructive' : ''}`}
                    />
                    {errors.installment_price && <p className="text-destructive text-[11px] font-medium mt-1">{errors.installment_price}</p>}
                </div>
                <div className="space-y-1.5 md:col-span-2 lg:col-span-3">
                    <Label htmlFor="birth_place" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">City of Birth *</Label>
                    <Input
                        id="birth_place"
                        value={form.birth_place}
                        onChange={(e) => onChange('birth_place', e.target.value)}
                        className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.birth_place ? 'border-destructive' : ''}`}
                    />
                    {errors.birth_place && <p className="text-destructive text-[11px] font-medium mt-1">{errors.birth_place}</p>}
                </div>
            </div>
        </div>
    );
};
