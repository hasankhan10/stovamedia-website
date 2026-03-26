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
    <div className={cn("flex items-center gap-4 mb-4 select-none", className)}>
      <span className="w-7 h-[1.2px] bg-gold rounded-full transition-all duration-500 origin-left" />
      <span className="text-[9px] uppercase tracking-[0.22em] font-medium text-gold whitespace-nowrap">
        {children}
      </span>
      {className?.includes("justify-center") && (
        <span className="w-7 h-[1.2px] bg-gold rounded-full transition-all duration-500 origin-right" />
      )}
    </div>
  );
};
