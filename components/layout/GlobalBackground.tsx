"use client";

import React from "react";

export default function GlobalBackground() {
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
