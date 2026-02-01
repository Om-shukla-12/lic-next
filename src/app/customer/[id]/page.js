'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    User,
    Shield,
    Briefcase,
    HeartPulse,
    Users,
    FileText,
    LayoutDashboard,
    Mail,
    Phone,
    Calendar,
    MapPin,
    X,
    CheckCircle2,
    AlertCircle,
    RotateCcw
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthContext } from '@/context/AuthContext';
import { apiService } from '@/lib/api-service';

const maskAadhaar = (val) => {
    if (!val) return '';
    const s = val.toString();
    if (s.length < 4) return s;
    return 'XXXX-XXXX-' + s.slice(-4);
};

export default function CustomerDetailPage({ params }) {
    const { id } = use(params);
    const [record, setRecord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dashboardLink, setDashboardLink] = useState('/agent-dashboard');
    const { token } = useAuthContext();

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role === 'customer') setDashboardLink('/customer-dashboard');
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            try {
                setIsLoading(true);
                const data = await apiService.getMyRecords(token);
                const found = data.find((r) => r._id === id);
                if (!found) throw new Error('Customer record not found');
                setRecord(found);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown network error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, token]);

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-12 h-12 border-4 border-[#1a56db] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-sm">
                <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                <h2 className="text-2xl font-black text-slate-900 mb-4">Error</h2>
                <p className="text-slate-500 mb-6">{error}</p>
                <Link href="/records" className="text-[#1a56db] font-bold hover:underline flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Return to Records
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
            <Header />

            {/* Blue Header Section */}
            <div className="bg-[#1a56db] text-white pt-12 pb-24 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <Link href={dashboardLink} className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold mb-8 transition-colors group text-sm">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Customer Profile</h1>
                    <p className="text-white/80 text-lg md:text-xl font-medium">
                        ग्राहक प्रोफ़ाइल। <span className="text-white/60 mx-2">|</span> Complete customer information
                    </p>
                </div>
            </div>

            <main className="flex-1 -mt-16 pb-20 px-6 md:px-12">
                <div className="max-w-6xl mx-auto space-y-12">

                    {/* Main Profile Card */}
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 flex flex-col md:flex-row gap-10 md:items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Photo Column */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-4 border-slate-50 bg-slate-100 flex items-center justify-center">
                                {record.customer?.profile_picture ? (
                                    <img src={record.customer.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-20 h-20 text-slate-300" />
                                )}
                            </div>
                        </div>

                        {/* Details Column */}
                        <div className="flex-grow space-y-8">
                            <div>
                                <h2 className="text-4xl font-black text-[#1a56db] tracking-tight mb-6">{record.customer?.customer_name}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                    <DetailItem icon={<Mail className="w-5 h-5" />} label="Email" value={record.customer?.email} />
                                    <DetailItem icon={<Phone className="w-5 h-5" />} label="Phone" value={record.customer?.mobile_number} />
                                    <DetailItem icon={<Calendar className="w-5 h-5" />} label="Date of Birth" value={record.customer?.dob} />
                                    <DetailItem icon={<User className="w-5 h-5" />} label="Gender" value={record.customer?.gender || 'N/A'} />
                                    <DetailItem icon={<FileText className="w-5 h-5" />} label="Aadhaar" value={maskAadhaar(record.customer?.aadhaar_number)} />
                                    <DetailItem icon={<MapPin className="w-5 h-5" />} label="Address" value={`${record.customer?.address}, ${record.customer?.village} - ${record.customer?.pincode}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Policies Section */}
                    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                        <h3 className="text-2xl font-black text-[#1a56db] px-2 flex items-center gap-2">
                            Policies <Shield className="w-6 h-6" />
                        </h3>
                        <div className="space-y-4">
                            {/* Primary Policy Card */}
                            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:border-[#1a56db]/30 transition-colors">
                                <div className="space-y-1 text-center md:text-left">
                                    <h4 className="text-xl font-bold text-[#1a56db]">LIC Jeevan Labh</h4>
                                    <p className="text-sm font-mono text-slate-400">POL-{record.policy?.insurance_number}</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4 items-center">
                                    <span className="bg-[#1a56db] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3 h-3" /> Active
                                    </span>
                                    <div className="text-center md:text-right md:min-w-[150px]">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Amount</p>
                                        <p className="text-2xl font-black text-[#1a56db]">₹{record.policy?.installment_price?.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="text-center md:text-right md:min-w-[150px]">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</p>
                                        <p className="text-lg font-bold text-slate-600">{record.policy?.maturity_date || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Family Members Section */}
                    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                        <h3 className="text-2xl font-black text-[#1a56db] px-2 flex items-center gap-2">
                            Family Members <Users className="w-6 h-6" />
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {record.family_members?.map((member, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100 overflow-hidden">
                                            <User className="w-8 h-8 text-slate-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#1a56db]">{member.name}</h4>
                                            <p className="text-xs text-slate-400 font-medium">{member.relation}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 pt-4 border-t border-slate-50">
                                        <FamilyInfoItem label="DOB" value={member.dob} />
                                        <FamilyInfoItem label="Gender" value={member.gender || 'N/A'} />
                                        <FamilyInfoItem label="Aadhaar" value={maskAadhaar(member.aadhaar_number)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Additional Details Section (Job, Nominee, Health) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-450">
                        {/* Nominee Card */}
                        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
                            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-8 text-indigo-400">
                                Nominee <FileText className="w-5 h-5" />
                            </h4>
                            <div className="space-y-6">
                                <NomineeItem label="Full Name" value={record.nominee?.nominee_name} />
                                <NomineeItem label="Relationship" value={record.nominee?.relation} />
                                <NomineeItem label="PAN Number" value={record.nominee?.pan_number} />
                            </div>
                        </div>

                        {/* Job Card */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100">
                            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-8 text-[#1a56db]">
                                Occupation <Briefcase className="w-5 h-5" />
                            </h4>
                            <div className="space-y-6">
                                <FamilyInfoItem label="Type" value={record.job_business?.type} />
                                <FamilyInfoItem label="Annual Income" value={`₹${record.job_business?.annual_income?.toLocaleString('en-IN')}`} />
                                <FamilyInfoItem label="Work Address" value={record.job_business?.address} />
                            </div>
                        </div>

                        {/* Vital Stats Card */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100">
                            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-8 text-[#1a56db]">
                                Vital Stats <HeartPulse className="w-5 h-5" />
                            </h4>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Height</p>
                                    <p className="text-2xl font-black text-slate-800">{record.medical?.height} cm</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                                    <p className="text-2xl font-black text-slate-800">{record.medical?.weight} kg</p>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                                <FamilyInfoItem label="Mother's Name" value={record.customer?.mother_name} />
                                <FamilyInfoItem label="Father's Name" value={record.customer?.father_name} />
                                <FamilyInfoItem label="Spouse Name" value={record.customer?.spouse_name} />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}

function DetailItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-1 text-[#1a56db] bg-blue-50 p-2 rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-base font-bold text-slate-700 leading-tight">{value || 'N/A'}</p>
            </div>
        </div>
    );
}

function FamilyInfoItem({ label, value }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">{label}:</span>
            <span className="text-[#1a56db] font-bold">{value || 'N/A'}</span>
        </div>
    );
}

function NomineeItem({ label, value }) {
    return (
        <div>
            <p className="text-[10px] font-black text-indigo-300/60 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-xl font-black text-white">{value || 'N/A'}</p>
        </div>
    );
}
