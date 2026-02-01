import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1.0],
        },
    }),
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const HeroSection = ({ userRole, dashboardLink, heroRef, heroY, heroOpacity }) => {
    return (
        <section ref={heroRef} className="relative w-full min-h-[95vh] flex flex-col justify-center overflow-hidden bg-white">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container max-w-[120rem] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-20 lg:pt-0">
                <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-3">
                            <span className="h-px w-12 bg-primary"></span>
                            <span className="font-heading text-sm tracking-widest uppercase text-primary font-bold">Official Digital Portal</span>
                        </motion.div>

                        <div className="border-l-4 border-secondary pl-8 py-2">
                            <motion.h1 variants={fadeInUp} className="font-heading text-6xl md:text-8xl font-black text-primary leading-[0.95] tracking-tighter">
                                LIC Digital <br />
                                <span className="text-[#1a1a1a]">Platform</span>
                            </motion.h1>
                        </div>

                        <div className="space-y-4 max-w-xl">
                            <motion.p variants={fadeInUp} className="font-heading text-2xl md:text-3xl text-foreground font-medium leading-tight">
                                एलआईसी डिजिटल प्लेटफॉर्म। <br />
                                <span className="text-foreground/70 text-lg md:text-xl font-paragraph">Your Gateway to Comprehensive Insurance Management.</span>
                            </motion.p>
                        </div>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 pt-4">
                            {userRole ? (
                                <Link href={dashboardLink}>
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 py-8 font-bold text-xl h-auto w-full sm:w-auto shadow-2xl shadow-primary/20 transition-all hover:scale-105">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 py-8 font-bold text-xl h-auto w-full sm:w-auto shadow-2xl shadow-primary/20 transition-all hover:scale-105">
                                            Login to Portal
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-12 py-8 font-bold text-xl h-auto w-full sm:w-auto shadow-2xl shadow-secondary/20 transition-all hover:scale-105">
                                            Register Now
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="lg:col-span-5 relative h-[60vh] lg:h-[80vh] w-full flex items-center justify-center"
                >
                    <div className="relative w-full h-full">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-3xl" />
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-muted">
                            <Image
                                src="https://static.wixstatic.com/media/c7eba1_5f114f2d90f644aaae1f9eaa1e133399~mv2.png?originWidth=768&originHeight=448"
                                alt="LIC Digital Platform Dashboard Visualization"
                                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-multiply" />
                        </div>

                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-8 -left-8 bg-background p-6 rounded-xl shadow-xl border border-muted max-w-xs hidden md:block"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-2 bg-green-100 rounded-full">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <span className="font-heading font-bold text-lg">Secure & Trusted</span>
                            </div>
                            <p className="text-sm text-muted-foreground">End-to-end encryption for all your policy data.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
