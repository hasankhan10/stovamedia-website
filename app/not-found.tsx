"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#05070D] flex flex-col items-center justify-center p-6 sm:p-10 overflow-hidden relative text-[#F8FAFC]">
      {/* Cyber-Obsidian Glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-25 z-0"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 70%)"
        }}
      />
      
      {/* Giant Cyber 404 Watermark */}
      <h1 
        className="font-display font-bold text-[clamp(120px,25vw,340px)] leading-none select-none pointer-events-none opacity-10 text-transparent bg-gradient-to-b from-indigo-400 to-transparent bg-clip-text"
      >
        404
      </h1>

      {/* Narrative Section */}
      <div className="relative z-10 text-center flex flex-col items-center -mt-16 md:-mt-28 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/40 bg-[#0B0F19]/90 backdrop-blur-md mb-6">
          <ShieldAlert size={14} className="text-cyan-400" />
          <span className="text-xs uppercase font-mono tracking-wider text-cyan-300 font-semibold">
            Route Not Found · 404 System Status
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F8FAFC] mb-4 leading-tight">
          This Coordinates Do Not Exist.
        </h2>

        <p className="font-ui text-sm sm:text-base text-slate-400 font-light max-w-md mb-10 leading-relaxed">
          The requested architectural blueprint or endpoint was moved or does not exist on our servers.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xs bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-ui font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} />
            <span>Return to HQ</span>
          </Link>

          <Link
            href="/work"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xs border border-slate-800 bg-[#0B0F19] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 font-ui font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Case Studies</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Footer Location Pill */}
      <div className="absolute bottom-10 flex items-center gap-2 text-slate-500 text-[11px] font-mono uppercase tracking-widest">
        <span>Stova Media Engineering Studio</span>
        <span>·</span>
        <span className="text-cyan-400">Kolkata, India</span>
      </div>
    </main>
  );
}
