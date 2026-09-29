"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldAlert, Sparkles, Home } from "lucide-react";

import { MagneticElement } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-white flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-hidden text-slate-900">
      {/* Soft Ambient Light Glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[350px] rounded-full blur-[110px] bg-gradient-to-tr from-indigo-100/80 via-cyan-100/50 to-blue-50/40 -z-10"
      />
      
      {/* Giant 404 Watermark */}
      <div 
        className="font-display font-extrabold text-[clamp(100px,22vw,280px)] leading-none select-none pointer-events-none text-slate-100/80 -mb-8 sm:-mb-14"
      >
        404
      </div>

      {/* Narrative Section */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-5 shadow-xs">
          <ShieldAlert size={14} className="text-indigo-600" />
          <span>Page Not Found · Error 404</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
          Lost in the Architecture?
        </h1>

        <p className="font-ui text-sm sm:text-base text-slate-600 font-light max-w-md mb-8 sm:mb-10 leading-relaxed">
          The requested page or resource has been relocated, renamed, or does not exist on our servers.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <MagneticElement strength={0.3} className="w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-ui font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <Home size={15} />
              <span>Return to Homepage</span>
            </Link>
          </MagneticElement>

          <MagneticElement strength={0.3} className="w-full sm:w-auto">
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-white text-slate-800 hover:text-indigo-700 hover:border-indigo-300 font-ui font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xs"
            >
              <Sparkles size={14} className="text-indigo-600" />
              <span>View Pricing &amp; Scope</span>
              <ArrowRight size={14} />
            </Link>
          </MagneticElement>
        </div>
      </div>
    </div>
  );
}
