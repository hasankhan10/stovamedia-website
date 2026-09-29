"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot, MessageSquare, Zap } from "lucide-react";

export default function AICoreGraphic() {
  return (
    <div className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-cyan-50/40 border border-cyan-100 overflow-hidden">
      {/* Cyan energy background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-300/25 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center shadow-sm">
            <Bot size={15} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-ui">
            Autonomous AI Engine
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          Active 24/7
        </span>
      </div>

      {/* SVG Rotating AI Reactor & Dynamic Tokens */}
      <div className="relative h-36 w-full flex items-center justify-center">
        {/* Orbital Outer Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 rounded-full border border-dashed border-cyan-400/50"
        />

        {/* Orbital Inner Ring 2 (counter-rotate) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-24 h-24 rounded-full border border-indigo-300/60"
        >
          {/* Orbital orbiting satellite node */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-500 shadow-sm" />
        </motion.div>

        {/* Pulsing Central AI Core */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 15px rgba(6, 182, 212, 0.4)",
              "0 0 30px rgba(79, 70, 229, 0.6)",
              "0 0 15px rgba(6, 182, 212, 0.4)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-indigo-700 text-white flex items-center justify-center z-10 shadow-lg"
        >
          <Sparkles size={22} className="animate-spin-slow" />
        </motion.div>

        {/* Floating Simulated Action Tag 1 */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1 left-2 bg-white/95 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-700 shadow-xs flex items-center gap-1.5"
        >
          <MessageSquare size={11} className="text-emerald-500" />
          <span>Lead Auto-Qualified</span>
        </motion.div>

        {/* Floating Simulated Action Tag 2 */}
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1 right-2 bg-white/95 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-700 shadow-xs flex items-center gap-1.5"
        >
          <Zap size={11} className="text-cyan-600" />
          <span>CRM Synchronized</span>
        </motion.div>
      </div>

      {/* AI Metric Footer */}
      <div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-slate-200/70 text-slate-500">
        <span>RAG Response: 120ms</span>
        <span className="text-cyan-700 font-bold">100% Private Business Data</span>
      </div>
    </div>
  );
}
