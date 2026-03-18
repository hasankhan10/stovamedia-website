"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeTrackProps {
  children: React.ReactNode[];
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

export const MarqueeTrack = ({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className,
  itemClassName,
}: MarqueeTrackProps) => {
  // Triple the items to ensure continuous loop
  const duplicatedItems = [...children, ...children, ...children];

  return (
    <div className={cn("overflow-hidden flex gap-8 py-4 whitespace-nowrap group select-none", className)}>
      <motion.div
        animate={{
          x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className={cn(
          "flex gap-8 items-center flex-shrink-0",
          itemClassName,
          { "group-hover:[animation-play-state:paused]": pauseOnHover }
        )}
      >
        {duplicatedItems.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex-shrink-0">{item}</div>
            <span className="text-gold opacity-50 select-none">✦</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
