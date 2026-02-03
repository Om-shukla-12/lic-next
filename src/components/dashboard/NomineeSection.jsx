import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ShieldCheck } from 'lucide-react';

export const NomineeSection = ({ form, errors, onChange }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-white flex items-center gap-3">
                <div className="p-1.5 bg-green-50 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-800">Nominee Assignment</h3>
            </div>
            <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="nominee_name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name *</Label>
                    <Input
                        id="nominee_name"
                        value={form.nominee_name}
                        onChange={(e) => onChange('nominee_name', e.target.value)}
                        className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.nominee_name ? 'border-destructive/60 bg-destructive/5' : ''}`}
                    />
                    {errors.nominee_name && <p className="text-destructive text-xs font-semibold mt-1 flex items-center gap-1">● {errors.nominee_name}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="nominee_relation" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Relationship *</Label>
                    <Input
                        id="nominee_relation"
                        value={form.relation}
                        onChange={(e) => onChange('relation', e.target.value)}
                        className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.nominee_relation ? 'border-destructive/60 bg-destructive/5' : ''}`}
                    />
                    {errors.nominee_relation && <p className="text-destructive text-xs font-semibold mt-1 flex items-center gap-1">● {errors.nominee_relation}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="nominee_age" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Age *</Label>
                        <Input
                            id="nominee_age"
                            type="number"
                            value={form.age}
                            onChange={(e) => onChange('age', e.target.value)}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.nominee_age ? 'border-destructive/60 bg-destructive/5' : ''}`}
                        />
                        {errors.nominee_age && <p className="text-destructive text-xs font-semibold mt-1 flex items-center gap-1">● {errors.nominee_age}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="pan_number" className="text-xs font-bold text-slate-500 uppercase tracking-wider">PAN *</Label>
                        <Input
                            id="pan_number"
                            value={form.pan_number}
                            onChange={(e) => onChange('pan_number', e.target.value.toUpperCase())}
                            className={`h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${errors.pan_number ? 'border-destructive/60 bg-destructive/5' : ''}`}
                            placeholder="ABCDE1234F"
                            maxLength={10}
                        />
                        {errors.pan_number && <p className="text-destructive text-xs font-semibold mt-1 flex items-center gap-1">● {errors.pan_number}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
