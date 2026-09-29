"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, CheckCircle2 } from "lucide-react";

export default function SpeedDialGraphic() {
  const [speedVal, setSpeedVal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpeedVal(100);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-emerald-50/30 border border-emerald-100 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm">
            <Zap size={15} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-ui">
            Core Web Vitals Engine
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
          <CheckCircle2 size={12} />
          Passed 100%
        </span>
      </div>

      {/* SVG Speedometer Dial Motion Graphic */}
      <div className="relative flex flex-col items-center justify-center my-2">
        <svg viewBox="0 0 200 115" className="w-48 h-auto overflow-visible">
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Animated Speed Gauge Arc */}
          <motion.path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="url(#speedGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="236"
            initial={{ strokeDashoffset: 236 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            filter="url(#glow)"
          />

          {/* Radial Tick Lines */}
          {[...Array(9)].map((_, i) => {
            const angle = -180 + i * 22.5;
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 60 * Math.cos(rad);
            const y1 = 105 + 60 * Math.sin(rad);
            const x2 = 100 + 68 * Math.cos(rad);
            const y2 = 105 + 68 * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Center Digital Readout */}
        <div className="absolute top-12 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl font-extrabold font-display text-slate-900 tracking-tight"
          >
            {speedVal}
            <span className="text-sm font-bold text-emerald-600 ml-0.5">/100</span>
          </motion.span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
            Grade A Performance
          </span>
        </div>
      </div>

      {/* Live Telemetry Badges */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-3 border-t border-slate-200/70">
        <div className="p-1.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 block text-[9px]">TTFB</span>
          <span className="text-emerald-700 font-bold">34ms</span>
        </div>
        <div className="p-1.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 block text-[9px]">LCP</span>
          <span className="text-emerald-700 font-bold">0.4s</span>
        </div>
        <div className="p-1.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 block text-[9px]">CLS</span>
          <span className="text-emerald-700 font-bold">0.00</span>
        </div>
      </div>
    </div>
  );
}
