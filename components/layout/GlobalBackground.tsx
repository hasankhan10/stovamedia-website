"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function GlobalBackground() {
  const pathname = usePathname();
  const isAIEcomRoute = pathname?.startsWith("/aiecommerce");

  if (isAIEcomRoute) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070D]">
        {/* Subtle Cyber Grid lines */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        
        {/* Electric Indigo Central Gradient Glow */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] pointer-events-none" 
          style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.12) 0%, transparent 65%)' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] pointer-events-none animate-pulse-slow" 
          style={{ background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.08) 0%, transparent 50%)' }}
        />

        {/* AI Cyber Floating Orb */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-full blur-[110px] opacity-60 animate-float" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid lines */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
      
      {/* Central Gradient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] pointer-events-none" 
        style={{ background: 'radial-gradient(circle at center, var(--glow-color) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] pointer-events-none animate-pulse-slow" 
        style={{ background: 'radial-gradient(circle at center, var(--glow-color-soft) 0%, transparent 50%)' }}
      />

      {/* Subtle floating orb for depth */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] opacity-40 animate-float" />
    </div>
  );
}
