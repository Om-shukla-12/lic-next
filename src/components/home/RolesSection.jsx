import React from 'react';
import { motion } from 'framer-motion';
import { RoleCard } from './RoleCard';

export const RolesSection = () => {
    return (
        <section className="w-full py-32 bg-muted/10 relative overflow-hidden">
            <div className="max-w-[100rem] mx-auto px-6 md:px-12">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-heading text-4xl md:text-5xl text-card-heading font-bold mb-6"
                    >
                        Tailored User Roles
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        className="h-1 w-24 bg-secondary mx-auto"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <RoleCard
                        index={0}
                        title="Agent"
                        description="एजेंट डैशबोर्ड। Add customers, manage policies, and track renewals efficiently."
                        borderColor="border-primary"
                        features={[
                            "Add customer profiles",
                            "Upload family member photos",
                            "Select LIC plans",
                            "View premium details"
                        ]}
                    />

                    <RoleCard
                        index={1}
                        title="District Officer"
                        description="डीओ डैशबोर्ड। View agent lists and policy summaries with high-level oversight."
                        borderColor="border-secondary"
                        features={[
                            "View agent performance",
                            "Monitor policy summaries",
                            "Read-only access",
                            "District-level insights"
                        ]}
                    />

                    <RoleCard
                        index={2}
                        title="Customer"
                        description="ग्राहक डैशबोर्ड। View your policies and renewal status with ease."
                        borderColor="border-primary"
                        features={[
                            "View policy cards",
                            "Check renewal status",
                            "See premium details",
                            "No edit access"
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};
