"use client";

import { motion } from "motion/react";

interface TemplateProps {
    children: React.ReactNode;
    down?: boolean;
  }
export default function Template({ children, down = false }: TemplateProps) {
  return (
    <motion.div
    initial={{ opacity: 0, translateY: down ? -40 : 40 }}
    animate={{ opacity: 1, translateY: 0 }}
    exit={{ opacity: 0, translateY: down ? -140 : 240 }}
      transition={{ 
        duration: 0.75,
        type: 'spring',
        stiffness: 100,
        damping: 20,
     }}
     className="w-full"
    >
      {children}
    </motion.div>
  );
}