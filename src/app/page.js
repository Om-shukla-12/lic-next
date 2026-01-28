'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Shield, Users, FileText, Calendar, ArrowRight, CheckCircle2, BarChart3, Lock, ChevronRight } from 'lucide-react';
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

const ZenDivider = ({ className = "" }) => (
  <div className={`h-px w-full bg-muted/60 ${className}`} />
);

const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="group relative p-8 md:p-12 border-r border-b border-muted/60 bg-card-background hover:bg-muted/10 transition-colors duration-500"
    >
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-heading text-2xl text-card-heading mb-4 group-hover:translate-x-2 transition-transform duration-300">
        {title}
      </h3>
      <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
        {description}
      </p>
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowRight className="w-6 h-6 text-primary" />
      </div>
    </motion.div>
  );
};

const RoleCard = ({ title, description, features, borderColor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative bg-card-background p-8 md:p-10 rounded-none border-l-4 ${borderColor} shadow-sm hover:shadow-md transition-shadow duration-300 mb-8`}
    >
      <h3 className="font-heading text-3xl text-card-heading mb-3">{title}</h3>
      <p className="font-paragraph text-lg text-foreground mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 font-paragraph text-sm text-foreground/80">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary/20 selection:text-primary">
      <Header />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <section ref={heroRef} className="relative w-full min-h-[95vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#1F2937 1px, transparent 1px), linear-gradient(90deg, #1F2937 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
        </div>

        <div className="container max-w-[120rem] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-20 lg:pt-0">

          <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-3">
                <span className="h-px w-12 bg-primary"></span>
                <span className="font-heading text-sm tracking-widest uppercase text-primary font-bold">Official Digital Portal</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-primary leading-[0.95] tracking-tight">
                LIC Digital <br />
                <span className="text-foreground">Platform</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="font-paragraph text-xl md:text-2xl text-foreground/70 max-w-2xl leading-relaxed border-l-2 border-secondary pl-6">
                आपकी बीमा पॉलिसी का डिजिटल समाधान। <br />
                Manage policies, track renewals, and connect with agents seamlessly in a unified ecosystem.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 pt-4">
                <Link href="/login">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 font-semibold text-lg h-auto w-full sm:w-auto shadow-lg shadow-primary/20 transition-all hover:scale-105">
                    Login to Portal
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-10 py-7 font-semibold text-lg h-auto w-full sm:w-auto shadow-lg shadow-secondary/20 transition-all hover:scale-105">
                    Register Now
                  </Button>
                </Link>
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

      <ZenDivider />

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
                <stat.icon className="w-8 h-8 text-secondary mb-2" />
                <h4 className="font-heading text-4xl md:text-5xl font-bold text-primary">{stat.value}</h4>
                <p className="font-paragraph text-sm md:text-base text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                <Link href="/register">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-6 rounded-full transition-all">
                    Explore All Features
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Link href="/register">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 font-bold text-xl h-auto shadow-xl">
                  Register Now
                  <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-12 py-8 font-bold text-xl h-auto transition-all duration-300">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
