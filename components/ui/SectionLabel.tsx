import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
  delay?: number;
}

export const SectionLabel = ({
  children,
  className,
}: SectionLabelProps) => {
  return (
    <div className={cn("flex items-center gap-3 mb-4 select-none", className)}>
      <span className="w-6 h-[1.5px] bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500 origin-left" />
      <span className="text-[10px] uppercase font-mono tracking-[0.22em] font-bold text-cyan-400 whitespace-nowrap">
        {children}
      </span>
      {className?.includes("justify-center") && (
        <span className="w-6 h-[1.5px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-500 origin-right" />
      )}
    </div>
  );
};
