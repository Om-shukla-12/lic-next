"use client";

import React, { useState } from 'react';
import { useBirthdays } from '@/hooks/useBirthdays';
import { BirthdayCard } from '@/components/dashboard/BirthdayCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Cake,
    Calendar,
    Gift,
    Search,
    Loader2,
    ChevronLeft,
    RefreshCcw,
    AlertCircle,
    Users
} from 'lucide-react';
import Link from 'next/link';

export default function BirthdayPage() {
    const { todayBirthdays, filteredBirthdays, isLoading, error, refresh } = useBirthdays();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('today'); // 'yesterday', 'today', 'week'

    const getCurrentList = () => {
        if (!filteredBirthdays) return [];
        switch (filter) {
            case 'yesterday': return filteredBirthdays.yesterday || [];
            case 'today': return todayBirthdays || [];
            case 'week': return filteredBirthdays.week || [];
            default: return todayBirthdays || [];
        }
    };

    const currentList = getCurrentList();

    const filterList = (list) => {
        if (!searchQuery) return list;
        return list.filter(p =>
            (p.name || p.customer_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.role || '').toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const displayedBirthdays = filterList(currentList);

    const getSectionTitle = () => {
        switch (filter) {
            case 'yesterday': return "Yesterday's Celebrations";
            case 'today': return "Today's Birthdays";
            case 'week': return "Upcoming This Week";
            default: return "Birthdays";
        }
    };

    const getSectionSubtitle = () => {
        switch (filter) {
            case 'yesterday': return "Missed it? It's never too late to wish!";
            case 'today': return `${displayedBirthdays.length} JOYFUL EVENTS`;
            case 'week': return "Plan ahead for the next 7 days";
            default: return "";
        }
    };
    
    if (isLoading && !filteredBirthdays) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Fetching birthdays...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfdff] relative overflow-hidden">
            {/* Enhanced Mesh Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-200/30 blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-rose-200/30 blur-[150px]" />
                <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-200/20 blur-[150px]" />
                <div className="absolute top-[10%] left-[30%] w-[50%] h-[50%] rounded-full bg-indigo-200/20 blur-[180px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-200/20 blur-[150px]" />
            </div>

            <main className="relative z-10">
                {/* Header Section */}
                <div className="relative z-10 p-4 md:p-6 max-w-[100rem] mx-auto space-y-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                        <div className="space-y-3 max-w-2xl">
                            <Link href="/agent-dashboard" className="inline-flex items-center gap-2 py-1.5 px-4 bg-white/60 backdrop-blur-md border border-slate-200 rounded-full text-[10px] font-black text-blue-600 shadow-sm hover:shadow-md transition-all hover:-translate-x-1 uppercase tracking-widest">
                                <ChevronLeft className="w-3.5 h-3.5" /> Back to Dashboard
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter flex flex-wrap items-center gap-x-4">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600">
                                    Member's
                                </span>
                                <span className="flex items-center gap-2">
                                    Birthdays <Cake className="w-10 h-10 md:w-12 md:h-12 text-rose-500 animate-pulse" />
                                </span>
                            </h1>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative group sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    placeholder="Search names..."
                                    className="pl-11 h-14 rounded-2xl border-none bg-white shadow-2xl shadow-blue-100/50 focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-bold"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                variant="default"
                                size="icon"
                                className="h-14 w-14 rounded-2xl bg-white hover:bg-slate-50 text-blue-600 shadow-2xl shadow-blue-100/50 border-none shrink-0"
                                onClick={refresh}
                                disabled={isLoading}
                            >
                                <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                            </Button>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm w-fit mx-auto md:mx-0">
                        {['yesterday', 'today', 'week'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`
                                    px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300
                                    ${filter === f
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                                        : 'text-slate-500 hover:bg-white/80 hover:text-blue-600'
                                    }
                                `}
                            >
                                {f === 'week' ? 'This Week' : f}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="mb-12 p-5 bg-rose-50 border border-rose-100 text-rose-600 rounded-3xl flex items-center gap-4 shadow-xl shadow-rose-100/20">
                            <AlertCircle className="w-5 h-5" />
                            <p className="font-bold text-sm">Sync Status: Using Local Records ({error})</p>
                        </div>
                    )}
                </div>

                {/* DYNAMIC LIST SECTION */}
                <section className="relative px-4 md:px-8 py-6 mb-8">
                    <div className="max-w-[100rem] mx-auto relative z-10 space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className={`p-3 rounded-2xl shadow-xl border border-white transition-colors duration-500 ${filter === 'today' ? 'bg-blue-600 text-white shadow-blue-600/20' :
                                    filter === 'yesterday' ? 'bg-slate-100 text-slate-600' :
                                        'bg-indigo-100 text-indigo-600'
                                }`}>
                                {filter === 'today' ? <Gift className="w-6 h-6" /> :
                                    filter === 'yesterday' ? <Calendar className="w-6 h-6" /> :
                                        <Calendar className="w-6 h-6" />}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase animate-in fade-in slide-in-from-left-2 duration-300" key={filter}>
                                    {getSectionTitle()}
                                </h2>
                                <p className="text-[10px] text-slate-400 font-black tracking-[0.2em] uppercase">
                                    {getSectionSubtitle()}
                                </p>
                            </div>
                        </div>

                        {displayedBirthdays.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-500">
                                {displayedBirthdays.map((person, idx) => (
                                    <BirthdayCard key={`${filter}-${idx}`} person={person} isToday={filter === 'today'} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/60 border border-slate-100/50 rounded-[3rem] p-16 flex flex-col items-center text-center shadow-xl backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <Users className="w-12 h-12 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">No Birthdays Found</h3>
                                <p className="text-slate-500 mt-2 font-bold uppercase tracking-widest text-xs">
                                    {filter === 'today' ? "No one is celebrating today" :
                                        filter === 'yesterday' ? "No birthdays yesterday" :
                                            "No birthdays upcoming this week"}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
