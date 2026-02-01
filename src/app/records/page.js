'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuthContext } from '@/context/AuthContext';
import { apiService } from '@/lib/api-service';

export default function CustomerRecordsPage() {
    const { token, isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
    const [records, setRecords] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!token) return;
        try {
            setIsDataLoading(true);
            const data = await apiService.getMyRecords(token);
            setRecords(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown network error');
        } finally {
            setIsDataLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const isLoading = isAuthLoading || isDataLoading;

    if (!isAuthenticated && !isAuthLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-slate-400 font-bold">Please login to view records.</p>
            </div>
        );
    }

    if (isLoading && records.length === 0) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 font-sans">
            <div className="flex flex-col items-center gap-4">
                <LoadingSpinner className="w-12 h-12 text-indigo-600" />
                <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Syncing Data...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-sans">
            <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] border border-red-50 shadow-2xl shadow-red-100/50 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">!</div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Connection Issues</h2>
                <p className="text-slate-500 mb-8">{error}</p>
                <button
                    onClick={() => fetchData()}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black transition-all active:scale-95"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <Header />
            <main className="flex-1 p-6 md:p-12">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">Customer Activity</h1>
                        <div className="flex items-center gap-3">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{records.length} records retrieved</p>
                        </div>
                    </header>

                    {records.length === 0 ? (
                        <div className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-sm text-center">
                            <p className="text-slate-300 text-xl font-bold uppercase tracking-widest leading-relaxed">No data detected in<br />the cloud storage.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-indigo-100/40 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left whitespace-nowrap">
                                    <thead className="bg-slate-50/50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client Identity</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Metadata</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Policy Details</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Premium (₹)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {records.map((item, i) => (
                                            <tr key={item._id || i} className="hover:bg-indigo-50/30 transition-colors group cursor-default">
                                                <td className="px-10 py-8">
                                                    <div className="font-black text-slate-900 text-xl group-hover:text-indigo-600 transition-colors">{item.customer?.customer_name || 'Anonymous User'}</div>
                                                    <div className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-tighter bg-slate-100 inline-block px-1.5 rounded">UID: {item.customer?.aadhaar_number || 'N/A'}</div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="text-slate-700 font-bold text-lg">{item.customer?.mobile_number}</div>
                                                    <div className="text-xs text-indigo-400 font-black lowercase italic tracking-tight">{item.customer?.email}</div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="text-slate-600 font-black uppercase text-xs tracking-widest">{item.policy?.installment_type || 'PLAN'} | {item.policy?.insurance_number}</div>
                                                    <div className="mt-1.5 font-mono text-[10px] text-slate-300 font-bold">MATURITY: {item.policy?.maturity_date || 'N/A'}</div>
                                                </td>
                                                <td className="px-10 py-8 text-right">
                                                    <div className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-right tracking-tighter">
                                                        ₹{item.policy?.installment_price?.toLocaleString('en-IN') || '0'}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
