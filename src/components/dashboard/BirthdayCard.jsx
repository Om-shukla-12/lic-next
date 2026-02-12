import React from 'react';
import { Cake, Phone, User, Calendar, MessageSquare, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const THEMES = [
    {
        name: 'rose',
        bg: 'bg-gradient-to-br from-rose-50 to-white',
        border: 'border-rose-100',
        iconBg: 'bg-rose-600',
        text: 'text-rose-600',
        badge: 'bg-rose-100 text-rose-700',
        shadow: 'shadow-rose-100/50'
    },
    {
        name: 'amber',
        bg: 'bg-gradient-to-br from-amber-50 to-white',
        border: 'border-amber-100',
        iconBg: 'bg-amber-600',
        text: 'text-amber-600',
        badge: 'bg-amber-100 text-amber-700',
        shadow: 'shadow-amber-100/50'
    },
    {
        name: 'emerald',
        bg: 'bg-gradient-to-br from-emerald-50 to-white',
        border: 'border-emerald-100',
        iconBg: 'bg-emerald-600',
        text: 'text-emerald-600',
        badge: 'bg-emerald-100 text-emerald-700',
        shadow: 'shadow-emerald-100/50'
    },
    {
        name: 'violet',
        bg: 'bg-gradient-to-br from-violet-50 to-white',
        border: 'border-violet-100',
        iconBg: 'bg-violet-600',
        text: 'text-violet-600',
        badge: 'bg-violet-100 text-violet-700',
        shadow: 'shadow-violet-100/50'
    },
    {
        name: 'blue',
        bg: 'bg-gradient-to-br from-blue-50 to-white',
        border: 'border-blue-100',
        iconBg: 'bg-blue-600',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-700',
        shadow: 'shadow-blue-100/50'
    }
];

export const BirthdayCard = ({ person, isToday }) => {
    // Pick a theme based on name length or just a simple index
    const themeIndex = (person.name || person.customer_name || '').length % THEMES.length;
    const theme = isToday ? THEMES[4] : THEMES[themeIndex]; // Keep Blue for Today, or mix it up

    return (
        <div className={`relative group overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${theme.bg
            } ${theme.border} ${theme.shadow}`}>

            {/* Background Decoration */}
            <div className={`absolute -right-6 -top-6 opacity-5 group-hover:scale-125 group-hover:opacity-10 transition-all duration-700`}>
                <Cake className={`w-32 h-32 ${theme.text}`} />
            </div>

            <div className="p-6 flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${theme.iconBg} shadow-lg ${isToday ? 'animate-bounce shadow-blue-200' : ''}`}>
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-heading font-black text-slate-800 text-lg line-clamp-1">{person.name || person.customer_name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className={`${theme.badge} border-none font-bold text-[10px] uppercase tracking-wider px-2 h-5`}>
                                    {person.role || (person.relation ? 'Family Member' : 'Customer')}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-1">
                    <div className="flex items-center gap-3 text-slate-600 bg-white/50 p-2 rounded-xl border border-white/50">
                        <Calendar className={`w-4 h-4 ${theme.text}`} />
                        <span className="text-sm font-bold">
                            {new Date(person.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                        </span>
                    </div>
                    {person.mobile && (
                        <div className="flex items-center gap-3 text-slate-600 p-2">
                            <Phone className={`w-4 h-4 ${theme.text}`} />
                            <span className="text-sm font-semibold">{person.mobile}</span>
                        </div>
                    )}
                    {person.customerName && (
                        <div className="flex items-center gap-2 px-2 text-slate-400">
                            <Users className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-medium leading-tight">Relation to: {person.customerName}</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto flex flex-col gap-2">
                    <Button
                        size="sm"
                        variant="default"
                        className={`w-full rounded-2xl text-xs h-10 font-black flex items-center justify-center gap-2 transition-all ${theme.iconBg
                            } hover:opacity-90 shadow-md`}
                        asChild
                    >
                        <a href={`tel:${person.mobile}`}>
                            <Phone className="w-3.5 h-3.5" /> CALL NOW
                        </a>
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="w-full rounded-2xl text-xs h-10 font-black border-slate-200 text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                        asChild
                    >
                        <a href={`https://wa.me/${person.mobile}?text=Happy Birthday ${person.name}!`} target="_blank" rel="noopener noreferrer">
                            <MessageSquare className="w-3.5 h-3.5" /> WHATSAPP
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
};
