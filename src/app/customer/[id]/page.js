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
    RotateCcw,
    Download
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthContext } from '@/context/AuthContext';
import { apiService } from '@/lib/api-service';
import { useToast } from '@/hooks/use-toast';

const API_ASSET_BASE = 'https://lic-backend-2026.onrender.com';

const normalizeImageUrl = (url) => {
    if (!url || url === 'string') return '';
    if (url.includes('res.cloudinary.com/demo/image/upload')) return ''; // Filter out broken demo URLs
    if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
    return `${API_ASSET_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
};

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

    const { toast } = useToast();

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role === 'customer') setDashboardLink('/customer-dashboard');
    }, []);

    const handleDownloadPDF = async () => {
        if (!record || !token) return;
        try {
            const blob = await apiService.downloadPDF(id, token);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `LIC_Profile_${record.customer?.customer_name || 'Customer'}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast({ title: "Download Successful", description: "Profile PDF downloaded successfully.", variant: "success" });
        } catch (err) {
            console.error(err);
            toast({ title: "Download Failed", description: "Could not download PDF.", variant: "destructive" });
        }
    };

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

    const profileImageUrl = normalizeImageUrl(
        record?.customer?.profile_picture ||
        record?.customer?.profile_photo ||
        record?.customer?.profilePicture ||
        record?.customer?.photo ||
        record?.customer?.avatar ||
        record?.profile_picture ||
        record?.profile_photo ||
        record?.profilePicture ||
        record?.photo ||
        record?.avatar ||
        ''
    );
    const hasProfileImage = profileImageUrl && profileImageUrl !== 'string';

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
            <div className="bg-[#1a56db] text-white pt-8 pb-16 px-4 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <Link href={dashboardLink} className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold transition-colors group text-xs md:text-sm">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 transition-all backdrop-blur-sm"
                        >
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">Customer Profile</h1>
                    <p className="text-white/80 text-sm md:text-base font-medium">
                        ग्राहक प्रोफ़ाइल। <span className="text-white/60 mx-2">|</span> Complete customer information
                    </p>
                </div>
            </div>

            <main className="flex-1 -mt-10 pb-12 px-4 md:px-12">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* Main Profile Card */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100 flex flex-col md:flex-row gap-6 md:items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Photo Column */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-slate-50 bg-slate-100 flex items-center justify-center">
                                {hasProfileImage ? (
                                    <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-16 h-16 text-slate-300" />
                                )}
                            </div>
                        </div>

                        {/* Details Column */}
                        <div className="flex-grow space-y-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-[#1a56db] tracking-tight mb-4">{record.customer?.customer_name}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <DetailItem icon={<Mail className="w-4 h-4" />} label="Email" value={record.customer?.email} />
                                    <DetailItem icon={<Phone className="w-4 h-4" />} label="Phone" value={record.customer?.mobile_number} />
                                    <DetailItem icon={<Calendar className="w-4 h-4" />} label="Date of Birth" value={record.customer?.dob} />
                                    <DetailItem icon={<User className="w-4 h-4" />} label="Gender" value={record.customer?.gender || 'N/A'} />
                                    <DetailItem icon={<FileText className="w-4 h-4" />} label="Aadhaar" value={maskAadhaar(record.customer?.aadhaar_number)} />
                                    <DetailItem icon={<MapPin className="w-4 h-4" />} label="Address" value={`${record.customer?.address}, ${record.customer?.village} - ${record.customer?.pincode}`} />
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
                            <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:border-[#1a56db]/30 transition-colors">
                                <div className="space-y-1 text-center md:text-left">
                                    <h4 className="text-lg md:text-xl font-bold text-[#1a56db]">{record.policies?.[0]?.name || 'LIC Jeevan Labh'}</h4>
                                    <p className="text-xs md:text-sm font-mono text-slate-400">POL-{record.policies?.[0]?.insurance_number}</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-3 items-center">
                                    <span className="bg-[#1a56db] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3 h-3" /> Active
                                    </span>
                                    <div className="text-center md:text-right md:min-w-[120px]">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Premium Amount</p>
                                        <p className="text-xl font-black text-[#1a56db]">₹{record.policies?.[0]?.installment_price?.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="text-center md:text-right md:min-w-[120px]">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Due Date</p>
                                        <p className="text-base font-bold text-slate-600">{record.policies?.[0]?.maturity_date || 'N/A'}</p>
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
                                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100 overflow-hidden">
                                            <User className="w-6 h-6 text-slate-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-[#1a56db]">{member.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{member.relation}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 pt-3 border-t border-slate-50">
                                        <FamilyInfoItem label="DOB" value={member.dob} />
                                        <FamilyInfoItem label="Gender" value={member.gender || 'N/A'} />
                                        <FamilyInfoItem label="Aadhaar" value={maskAadhaar(member.aadhaar_number)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Additional Details Section (Job, Nominee, Health) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-450">
                        {/* Nominee Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
                            <h4 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 mb-4 text-indigo-400">
                                Nominee <FileText className="w-4 h-4" />
                            </h4>
                            <div className="space-y-4">
                                <NomineeItem label="Full Name" value={record.policies?.[0]?.nominee?.nominee_name} />
                                <NomineeItem label="Relationship" value={record.policies?.[0]?.nominee?.relation} />
                                <NomineeItem label="PAN Number" value={record.policies?.[0]?.nominee?.pan_number} />
                            </div>
                        </div>

                        {/* Job Card */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-100">
                            <h4 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 mb-4 text-[#1a56db]">
                                Occupation <Briefcase className="w-4 h-4" />
                            </h4>
                            <div className="space-y-4">
                                <FamilyInfoItem label="Type" value={record.job_business?.type} />
                                <FamilyInfoItem label="Annual Income" value={`₹${record.job_business?.annual_income?.toLocaleString('en-IN')}`} />
                                <FamilyInfoItem label="Work Address" value={record.job_business?.address} />
                            </div>
                        </div>

                        {/* Vital Stats Card */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-100">
                            <h4 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 mb-4 text-[#1a56db]">
                                Vital Stats <HeartPulse className="w-4 h-4" />
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Height</p>
                                    <p className="text-xl font-black text-slate-800">{record.medical?.height} cm</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                                    <p className="text-xl font-black text-slate-800">{record.medical?.weight} kg</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50 space-y-3">
                                <FamilyInfoItem label="Mother's Name" value={record.customer?.mother_name} />
                                <FamilyInfoItem label="Father's Name" value={record.customer?.father_name} />
                                <FamilyInfoItem label="Spouse Name" value={record.customer?.spouse_name} />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <div className="bg-slate-100 p-8 mt-12 mb-12 rounded-xl">
                <details>
                    <summary className="font-bold text-slate-500 cursor-pointer mb-4">Debug: Raw Record Data (Click to Expand)</summary>
                    <pre className="text-xs bg-slate-800 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
                        {JSON.stringify(record, null, 2)}
                    </pre>
                </details>
            </div>
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
            <p className="text-[9px] font-black text-indigo-300/60 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-lg font-black text-white">{value || 'N/A'}</p>
        </div>
    );
}
