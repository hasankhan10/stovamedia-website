"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Layers, Home } from "lucide-react";
import { MagneticElement } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-[#07080C] flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-hidden text-white">
      {/* 🌌 Celestial Radiant Dome Glow Effect */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[350px] rounded-full z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139, 92, 246, 0.3) 0%, rgba(79, 70, 229, 0.15) 50%, transparent 75%)',
          filter: 'blur(50px)'
        }}
      />
      
      {/* Giant 404 Watermark */}
      <div 
        className="font-display font-medium text-[clamp(100px,22vw,280px)] leading-none select-none pointer-events-none text-white/[0.03] -mb-8 sm:-mb-14 relative z-0"
      >
        404
      </div>

      {/* Narrative Section */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium mb-6 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-xl">
          <ShieldAlert size={14} className="text-violet-400" />
          <span>Page Not Found · Error 404</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-slate-100 mb-3 sm:mb-4">
          Lost in the Architecture?
        </h1>

        <p className="text-sm sm:text-base text-slate-400 font-normal max-w-md mb-8 sm:mb-10 leading-relaxed">
          The requested page or resource has been relocated, renamed, or does not exist on our servers.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <MagneticElement strength={0.2} className="w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-[0_0_24px_rgba(139,92,246,0.35)] flex items-center justify-center gap-2"
            >
              <Home size={15} />
              <span>Return to Homepage</span>
            </Link>
          </MagneticElement>

          <MagneticElement strength={0.2} className="w-full sm:w-auto">
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-xl"
            >
              <Layers size={14} className="text-violet-400" />
              <span>View Pricing &amp; Scope</span>
              <ArrowRight size={14} />
            </Link>
          </MagneticElement>
        </div>
      </div>
    </div>
  );
}
