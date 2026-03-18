"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen">
        {/* Transition Curtain */}
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: "100vh" }}
          exit={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-gold opacity-15 pointer-events-none"
        />
        
        <motion.div
          initial={{ y: "-20px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "20px", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>

        {/* Enter Curtain */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="fixed inset-0 z-[200] bg-ink pointer-events-none"
        />
      </motion.div>
    </AnimatePresence>
  );
}
