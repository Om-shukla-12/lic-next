import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

export const FeatureCard = ({ icon, title, description, index }) => {
    return (
        <motion.div
            variants={fadeInUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
