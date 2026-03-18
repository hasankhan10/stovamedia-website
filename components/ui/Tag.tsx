import React from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: string;
  className?: string;
}

export const Tag = ({ children, className }: TagProps) => {
  return (
    <span
      className={cn(
        "px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] font-semibold text-gold bg-gold-glow border border-gold/20 rounded-sm whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  );
};
