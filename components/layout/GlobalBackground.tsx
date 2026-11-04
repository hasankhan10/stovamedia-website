"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function GlobalBackground() {
  const pathname = usePathname();
  const isExcluded = pathname?.startsWith("/aiecommerce") || pathname?.startsWith("/ailandingpage") || pathname?.startsWith("/admin");

  if (isExcluded) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080C]">
      {/* Precision Hairline Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
      
      {/* Central Soft Ambient Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] pointer-events-none opacity-30" 
        style={{ background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 0%, transparent 70%)' }}
      />
    </div>
  );
}
