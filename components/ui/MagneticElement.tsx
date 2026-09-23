"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticElement = ({
  children,
  className,
}: MagneticElementProps) => {
  return (
    <div
      className={cn(
        "inline-block transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-[0.98] ease-out",
        className
      )}
    >
      {children}
    </div>
  );
};
