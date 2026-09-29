"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function GlobalBackground() {
  const pathname = usePathname();
  const isAIEcomRoute = pathname?.startsWith("/aiecommerce");

  // Keep dark background for standalone routes if needed, otherwise ultra-clean light grid & ambient glows
  if (isAIEcomRoute) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {/* Precision Hairline Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(79, 70, 229, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.025) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
      
      {/* Central Soft Ambient Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] pointer-events-none opacity-40" 
        style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, transparent 70%)' }}
      />
    </div>
  );
}
