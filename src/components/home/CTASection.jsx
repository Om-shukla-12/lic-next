import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTASection = ({ userRole, dashboardLink }) => {
    return (
        <section className="w-full py-32 bg-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-8">
                        Ready to Get Started?
                    </h2>
                    <p className="font-paragraph text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                        अभी शुरू करें। Join thousands of satisfied users managing their LIC policies digitally.
                        Secure, fast, and reliable.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        {userRole ? (
                            <Link href={dashboardLink}>
                                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 font-bold text-xl h-auto shadow-xl">
                                    Go to Dashboard
                                    <ChevronRight className="ml-2 w-6 h-6" />
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/register">
                                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 font-bold text-xl h-auto shadow-xl">
                                        Register Now
                                        <ChevronRight className="ml-2 w-6 h-6" />
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-12 py-8 font-bold text-xl h-auto transition-all duration-300">
                                        Login
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
