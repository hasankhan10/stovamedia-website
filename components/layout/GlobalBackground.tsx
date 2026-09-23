"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function GlobalBackground() {
  const pathname = usePathname();
  const isAIEcomRoute = pathname?.startsWith("/aiecommerce");

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070D]">
      {/* Precision Hairline Cyber Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.035) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      
      {/* Central Electric Indigo Gradient Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] pointer-events-none" 
        style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.12) 0%, transparent 65%)' }}
      />
      
      {/* Secondary Radiant Cyan Ambient Glow */}
      <div 
        className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] pointer-events-none animate-pulse-slow" 
        style={{ background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.07) 0%, transparent 55%)' }}
      />

      {/* Subtle Floating Cyber Orb for organic depth */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-full blur-[120px] opacity-50 animate-float" />
    </div>
  );
}
