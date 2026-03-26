"use client";

import React from "react";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
      
      {/* Central Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.12)_0%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.08)_0%,transparent_50%)] animate-pulse-slow" />

      {/* Subtle floating orb for depth */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] opacity-40 animate-float" />
    </div>
  );
}
