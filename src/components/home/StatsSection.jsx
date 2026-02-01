import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, CheckCircle2, Shield } from 'lucide-react';

export const StatsSection = () => {
    return (
        <section className="w-full bg-background py-20 border-b border-muted/60">
            <div className="max-w-[120rem] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Active Policies", value: "25M+", icon: FileText },
                        { label: "Trusted Agents", value: "100k+", icon: Users },
                        { label: "Claims Settled", value: "98%", icon: CheckCircle2 },
                        { label: "Years of Trust", value: "65+", icon: Shield },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center md:items-start space-y-2"
                        >
                            <stat.icon className="w-8 h-8 text-primary mb-2" />
                            <h4 className="font-heading text-4xl md:text-5xl font-bold text-primary">{stat.value}</h4>
                            <p className="font-paragraph text-sm md:text-base text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
