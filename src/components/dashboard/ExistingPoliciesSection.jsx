import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, History } from 'lucide-react';

export const ExistingPoliciesSection = ({ policies, onAdd, onRemove, onChange }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden font-paragraph">
            <div className="p-4 md:p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-50 rounded-lg">
                        <History className="w-5 h-5 text-rose-600" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-800">Existing Family Policies</h3>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onAdd}
                    className="h-9 text-xs flex items-center gap-1.5 px-4 border-slate-200 hover:bg-slate-50 transition-all rounded-lg"
                >
                    <Plus className="w-3.5 h-3.5" /> Add Policy
                </Button>
            </div>
            <div className="p-4 md:p-6 space-y-4">
                {policies.map((p, index) => (
                    <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative group transition-all hover:border-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pr-8">
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Holder Name</Label>
                                <Input
                                    placeholder="Name"
                                    value={p.name}
                                    onChange={(e) => onChange(index, 'name', e.target.value)}
                                    className="h-10 text-sm rounded-lg bg-white border-slate-200"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Relation</Label>
                                <Input
                                    placeholder="Relation"
                                    value={p.relation}
                                    onChange={(e) => onChange(index, 'relation', e.target.value)}
                                    className="h-10 text-sm rounded-lg bg-white border-slate-200"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Policy No</Label>
                                <Input
                                    placeholder="Number"
                                    value={p.policyNumber}
                                    onChange={(e) => onChange(index, 'policyNumber', e.target.value)}
                                    className="h-10 text-sm rounded-lg bg-white border-slate-200"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Date</Label>
                                <Input
                                    type="date"
                                    value={p.policyDate}
                                    onChange={(e) => onChange(index, 'policyDate', e.target.value)}
                                    className="h-10 text-sm rounded-lg bg-white border-slate-200"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Sum Assured (₹)</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Amount"
                                        value={p.policyAmount}
                                        onChange={(e) => onChange(index, 'policyAmount', e.target.value)}
                                        className="h-10 text-sm rounded-lg bg-white border-slate-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onRemove(index)}
                                        className="text-slate-400 hover:text-destructive transition-colors p-1"
                                    >
                                        <Plus className="w-5 h-5 rotate-45" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {policies.length === 0 && (
                    <div className="text-center py-10 text-slate-400 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        No family policies added yet.
                    </div>
                )}
            </div>
        </div>
    );
};
