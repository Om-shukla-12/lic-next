import React from 'react';
import { User, ShieldCheck, Activity, Users, FileText, History } from 'lucide-react';

export const FormReviewStep = ({ customerForm, nomineeForm, jobForm, medicalForm, familyMembers, policyForm, existingPolicies }) => {
    const SectionHeader = ({ icon: Icon, title, color }) => (
        <div className="flex items-center gap-2 mb-4">
            <div className={`p-1.5 rounded-lg bg-${color}-50`}>
                <Icon className={`w-4 h-4 text-${color}-600`} />
            </div>
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{title}</h4>
        </div>
    );

    const InfoItem = ({ label, value }) => (
        <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="text-sm font-medium text-slate-700">{value || 'N/A'}</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-bold text-blue-900 text-lg">Review Application</h3>
                    <p className="text-blue-700 text-sm">Please review all the captured details carefully before final submission.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Identity */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <SectionHeader icon={User} title="Customer Identity" color="blue" />
                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Full Name" value={customerForm.customer_name} />
                        <InfoItem label="Date of Birth" value={customerForm.dob} />
                        <InfoItem label="Mobile" value={customerForm.mobile_number} />
                        <InfoItem label="Aadhaar" value={customerForm.aadhaar_number} />
                        <div className="col-span-2">
                            <InfoItem label="Address" value={customerForm.address} />
                        </div>
                    </div>
                </div>

                {/* Nominee & Job */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <SectionHeader icon={ShieldCheck} title="Nominee & Job" color="green" />
                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Nominee Name" value={nomineeForm.nominee_name} />
                        <InfoItem label="Relation" value={nomineeForm.relation} />
                        <InfoItem label="Job Type" value={jobForm.type} />
                        <InfoItem label="Income" value={`₹${jobForm.annual_income}`} />
                    </div>
                </div>

                {/* Family */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <SectionHeader icon={Users} title="Family Members" color="indigo" />
                    <p className="text-sm text-slate-600 mb-2">{familyMembers.length} members added</p>
                    <div className="max-h-32 overflow-y-auto space-y-2">
                        {familyMembers.map((m, i) => (
                            <div key={i} className="text-xs bg-slate-50 p-2 rounded border border-slate-100 flex justify-between">
                                <span className="font-bold text-slate-700">{m.fullName}</span>
                                <span className="text-slate-500">{m.relationship}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Policies */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <SectionHeader icon={FileText} title="Policy Details" color="purple" />
                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Policy No" value={policyForm.insurance_number} />
                        <InfoItem label="Installment" value={policyForm.installment_type} />
                        <InfoItem label="Premium" value={`₹${policyForm.installment_price}`} />
                        <InfoItem label="Maturity" value={policyForm.maturity_date} />
                    </div>
                </div>
            </div>
        </div>
    );
};
