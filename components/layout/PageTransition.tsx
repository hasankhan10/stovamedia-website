"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Exit Curtain (Swipes UP from bottom to cover screen) */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "100%" }}
          exit={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-gold opacity-10 pointer-events-none"
        />
        
        {/* Actual Page Content Fade/Slide */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          {children}
        </motion.div>

        {/* Enter Curtain (Already covers screen, swipes UP to reveal) */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="fixed inset-0 z-[200] bg-ink pointer-events-none"
        />
      </motion.div>
    </AnimatePresence>
  );
}
