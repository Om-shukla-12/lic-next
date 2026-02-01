import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, FileText, Calendar, BarChart3, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeatureCard } from './FeatureCard';

export const FeaturesSection = ({ userRole, dashboardLink }) => {
    return (
        <section className="w-full bg-background relative">
            <div className="max-w-[120rem] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-4 bg-primary text-primary-foreground p-12 lg:p-20 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="w-16 h-1 bg-secondary mb-8" />
                            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Key Features <br />
                                <span className="text-secondary">Designed for You</span>
                            </h2>
                            <p className="font-paragraph text-lg text-primary-foreground/80 mb-12 max-w-md">
                                Experience a seamless interface designed to simplify your insurance journey. Everything you need, organized perfectly.
                            </p>
                            <div className="hidden lg:block">
                                <ArrowRight className="w-12 h-12 text-secondary animate-pulse" />
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2">
                        <FeatureCard
                            index={0}
                            icon={<Users className="w-8 h-8" />}
                            title="Customer Management"
                            description="ग्राहक प्रोफाइल बनाएं और परिवार के सदस्यों को जोड़ें। Complete customer profiles with family details seamlessly integrated."
                        />
                        <FeatureCard
                            index={1}
                            icon={<FileText className="w-8 h-8" />}
                            title="Policy Tracking"
                            description="सभी पॉलिसी एक जगह देखें। Track all your policies, premiums, and maturity details in one unified dashboard."
                        />
                        <FeatureCard
                            index={2}
                            icon={<Calendar className="w-8 h-8" />}
                            title="Renewal Management"
                            description="नवीनीकरण की तारीख याद रखें। Never miss a renewal with timely automated reminders and instant payment options."
                        />
                        <FeatureCard
                            index={3}
                            icon={<BarChart3 className="w-8 h-8" />}
                            title="Performance Insights"
                            description="Track growth and performance metrics. Visual analytics for agents and officers to monitor progress."
                        />
                        <FeatureCard
                            index={4}
                            icon={<Lock className="w-8 h-8" />}
                            title="Secure Access"
                            description="Role-based security ensures your data is seen only by authorized personnel. Enterprise-grade protection."
                        />
                        <div className="p-8 md:p-12 bg-muted/20 flex items-center justify-center">
                            <Link href={userRole ? dashboardLink : "/register"}>
                                <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-6 rounded-full transition-all">
                                    {userRole ? "View Your Dashboard" : "Explore All Features"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
