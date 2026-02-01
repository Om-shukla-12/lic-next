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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-card rounded-2xl shadow-premium p-8 border border-muted/20 transition-all hover:scale-[1.02]">
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center shadow-inner`}>
                            {stat.icon}
                        </div>
                        <div className="space-y-1">
                            <p className="font-paragraph text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</p>
                            <p className={`font-heading text-4xl font-black ${stat.textColor}`}>{stat.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});

DashboardStats.displayName = 'DashboardStats';
