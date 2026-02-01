import React from 'react';
import { motion } from 'framer-motion';

export const RoleCard = ({ title, description, features, borderColor, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative bg-card-background p-8 md:p-10 rounded-none border-l-4 ${borderColor} shadow-sm hover:shadow-md transition-shadow duration-300 mb-8 h-full`}
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
