import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus, X, Users } from 'lucide-react';

export const FamilyMembersSection = ({ members, onAdd, onRemove, onChange }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden font-paragraph">
            <div className="p-4 md:p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                        <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-800">Family Members</h3>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onAdd}
                    className="h-9 text-xs flex items-center gap-1.5 px-4 border-slate-200 hover:bg-slate-50 transition-all rounded-lg"
                >
                    <Plus className="w-3.5 h-3.5" /> Add Member
                </Button>
            </div>
            <div className="p-4 md:p-6 space-y-4">
                {members.map((member, index) => (
                    <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative group transition-all hover:border-slate-300">
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-destructive transition-colors p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pr-8">
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Full Name</Label>
                                <Input
                                    value={member.fullName}
                                    onChange={(e) => onChange(index, 'fullName', e.target.value)}
                                    className="h-10 text-sm rounded-lg bg-white border-slate-200"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Relationship</Label>
                                <Input
                                    value={member.relationship}
                                    onChange={(e) => onChange(index, 'relationship', e.target.value)}
                                    className="h-10 text-sm rounded-lg bg-white border-slate-200"
                                    placeholder="e.g. Son"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">DOB</Label>
                                <Input
                                    type="date"
                                    value={member.dateOfBirth}
                                    onChange={(e) => onChange(index, 'dateOfBirth', e.target.value)}
                                    className="h-10 text-sm rounded-lg bg-white border-slate-200"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-paragraph">Age</Label>
                                <Input
                                    type="number"
                                    value={member.age}
                                    onChange={(e) => onChange(index, 'age', e.target.value)}
                                    className="h-10 text-sm rounded-lg bg-white border-slate-200"
                                    placeholder="Age"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {members.length === 0 && (
                    <div className="text-center py-10 text-slate-400 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        No family members added yet.
                    </div>
                )}
            </div>
        </div>
    );
};
