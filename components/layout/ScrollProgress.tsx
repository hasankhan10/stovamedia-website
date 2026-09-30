"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/aiecommerce")) return null;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 z-[1000] origin-left pointer-events-none"
    />
  );
}
