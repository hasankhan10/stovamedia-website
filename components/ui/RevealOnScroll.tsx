"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const RevealOnScroll = ({
  children,
  className,
  delay = 0,
  duration = 0.8,
  once = true,
}: RevealOnScrollProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={cn("w-full h-full", className)}
    >
      {children}
    </motion.div>
  );
};
