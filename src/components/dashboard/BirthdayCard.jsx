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
        <div className={`relative group overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${theme.bg
            } ${theme.border} ${theme.shadow}`}>

            {/* Background Decoration */}
            <div className={`absolute -right-4 -top-4 opacity-5 group-hover:scale-125 group-hover:opacity-10 transition-all duration-700`}>
                <Cake className={`w-24 h-24 ${theme.text}`} />
            </div>

            <div className="p-4 flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${theme.iconBg} shadow-md ${isToday ? 'animate-bounce shadow-blue-200' : ''}`}>
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-heading font-black text-slate-800 text-base line-clamp-1 leading-tight">{person.name || person.customer_name}</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <Badge variant="secondary" className={`${theme.badge} border-none font-bold text-[9px] uppercase tracking-wider px-1.5 h-4`}>
                                    {person.role || (person.relation ? 'Family' : 'Customer')}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-1 space-y-1">
                    <div className="flex items-center gap-2 text-slate-600 bg-white/50 p-1.5 rounded-lg border border-white/50">
                        <Calendar className={`w-3.5 h-3.5 ${theme.text}`} />
                        <span className="text-xs font-bold">
                            {new Date(person.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                    </div>
                    {person.mobile && (
                        <div className="flex items-center gap-2 text-slate-600 px-1.5">
                            <Phone className={`w-3.5 h-3.5 ${theme.text}`} />
                            <span className="text-xs font-semibold">{person.mobile}</span>
                        </div>
                    )}
                    {person.customerName && (
                        <div className="flex items-center gap-1.5 px-1.5 text-slate-400">
                            <Users className="w-3 h-3" />
                            <span className="text-[10px] font-medium leading-tight truncate">Rel: {person.customerName}</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto flex gap-2 pt-3">
                    <Button
                        size="sm"
                        variant="default"
                        className={`flex-1 rounded-xl text-[10px] h-8 font-black flex items-center justify-center gap-1.5 transition-all ${theme.iconBg
                            } hover:opacity-90 shadow-sm`}
                        asChild
                    >
                        <a href={`tel:${person.mobile}`}>
                            <Phone className="w-3 h-3" /> CALL
                        </a>
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-xl text-[10px] h-8 font-black border-slate-200 text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all"
                        asChild
                    >
                        <a href={`https://wa.me/${person.mobile}?text=Happy Birthday ${person.name}!`} target="_blank" rel="noopener noreferrer">
                            <MessageSquare className="w-3 h-3" /> CHAT
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
};
