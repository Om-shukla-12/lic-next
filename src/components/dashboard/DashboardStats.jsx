import React from 'react';
import Link from 'next/link';
import { Users, FileText, Calendar } from 'lucide-react';

export const DashboardStats = React.memo(({ customerCount, planCount }) => {
    const stats = [
        {
            title: "Total Customers",
            value: customerCount,
            icon: <Users className="w-8 h-8 text-primary" />,
            bgColor: "bg-primary/10",
            textColor: "text-primary"
        },
        {
            title: "Active Plans",
            value: planCount,
            icon: <FileText className="w-8 h-8 text-secondary-foreground" />,
            bgColor: "bg-secondary/10",
            textColor: "text-secondary-foreground"
        },
        {
            title: "Renewals",
            value: (
                <Link href="/renewals" className="hover:underline decoration-secondary decoration-4">
                    View
                </Link>
            ),
            icon: <Calendar className="w-8 h-8 text-primary" />,
            bgColor: "bg-primary/10",
            textColor: "text-primary"
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-2 mb-4">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-card rounded-xl shadow-premium p-2 md:p-4 border border-muted/20 transition-all hover:scale-[1.02]">
                    <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-6">
                        <div className={`w-10 h-10 md:w-16 md:h-16 ${stat.bgColor} rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner`}>
                            {React.cloneElement(stat.icon, { className: "w-5 h-5 md:w-8 md:h-8 " + stat.textColor })}
                        </div>
                        <div className="space-y-0 md:space-y-1 text-center md:text-left">
                            <p className="font-paragraph text-[8px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</p>
                            <p className={`font-heading text-lg md:text-4xl font-black ${stat.textColor}`}>{stat.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});

DashboardStats.displayName = 'DashboardStats';
