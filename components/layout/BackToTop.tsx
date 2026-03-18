"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { MagneticElement } from "@/components/ui";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-10 right-10 z-[100]"
        >
          <MagneticElement strength={0.2}>
            <button
              onClick={scrollToTop}
              className="w-14 h-14 rounded-full border border-border bg-ink flex items-center justify-center text-muted hover:border-gold hover:text-gold hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
          </MagneticElement>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
