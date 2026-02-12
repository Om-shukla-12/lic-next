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
            <div className="p-4 md:p-6 space-y-6">
                {/* Policy Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                        <Label htmlFor="policy_type" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Policy Type *</Label>
                        <Input
                            id="policy_type"
                            placeholder="e.g., Term Life, Endowment"
                            value={form.policy_type}
                            onChange={(e) => onChange('policy_type', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.policy_type ? 'border-destructive' : ''}`}
                        />
                        {errors.policy_type && <p className="text-destructive text-[11px] font-medium mt-1">{errors.policy_type}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="policy_name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Policy Holder Name *</Label>
                        <Input
                            id="policy_name"
                            placeholder="Name on policy"
                            value={form.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.name ? 'border-destructive' : ''}`}
                        />
                        {errors.name && <p className="text-destructive text-[11px] font-medium mt-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="policy_no" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Policy Number *</Label>
                        <Input
                            id="policy_no"
                            type="number"
                            placeholder="Policy number"
                            value={form.policy_no}
                            onChange={(e) => onChange('policy_no', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.policy_no ? 'border-destructive' : ''}`}
                        />
                        {errors.policy_no && <p className="text-destructive text-[11px] font-medium mt-1">{errors.policy_no}</p>}
                    </div>
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
                        <Label htmlFor="maturity_years" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Maturity Years *</Label>
                        <Input
                            id="maturity_years"
                            type="number"
                            placeholder="Years until maturity"
                            value={form.maturity_years}
                            onChange={(e) => onChange('maturity_years', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.maturity_years ? 'border-destructive' : ''}`}
                        />
                        {errors.maturity_years && <p className="text-destructive text-[11px] font-medium mt-1">{errors.maturity_years}</p>}
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

                {/* Nominee Details - Now embedded in policy */}
                <div className="border-t border-slate-200 pt-6">
                    <h4 className="font-heading text-md font-bold text-slate-700 mb-4">Nominee Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-1.5">
                            <Label htmlFor="nominee_name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Nominee Name *</Label>
                            <Input
                                id="nominee_name"
                                value={form.nominee?.nominee_name || ''}
                                onChange={(e) => onChange('nominee', { ...form.nominee, nominee_name: e.target.value })}
                                className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.nominee_name ? 'border-destructive' : ''}`}
                            />
                            {errors.nominee_name && <p className="text-destructive text-[11px] font-medium mt-1">{errors.nominee_name}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="nominee_relation" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Relation *</Label>
                            <Input
                                id="nominee_relation"
                                placeholder="e.g., Spouse, Child"
                                value={form.nominee?.relation || ''}
                                onChange={(e) => onChange('nominee', { ...form.nominee, relation: e.target.value })}
                                className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.nominee_relation ? 'border-destructive' : ''}`}
                            />
                            {errors.nominee_relation && <p className="text-destructive text-[11px] font-medium mt-1">{errors.nominee_relation}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="nominee_age" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Age *</Label>
                            <Input
                                id="nominee_age"
                                type="number"
                                value={form.nominee?.age || ''}
                                onChange={(e) => onChange('nominee', { ...form.nominee, age: e.target.value })}
                                className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.nominee_age ? 'border-destructive' : ''}`}
                            />
                            {errors.nominee_age && <p className="text-destructive text-[11px] font-medium mt-1">{errors.nominee_age}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="nominee_pan" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">PAN Number *</Label>
                            <Input
                                id="nominee_pan"
                                placeholder="ABCDE1234F"
                                value={form.nominee?.pan_number || ''}
                                onChange={(e) => onChange('nominee', { ...form.nominee, pan_number: e.target.value.toUpperCase() })}
                                className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.nominee_pan ? 'border-destructive' : ''}`}
                                maxLength={10}
                            />
                            {errors.nominee_pan && <p className="text-destructive text-[11px] font-medium mt-1">{errors.nominee_pan}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
