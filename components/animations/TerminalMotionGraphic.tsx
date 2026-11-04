"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const terminalLogs = [
  { text: "stova init --studio=kolkata --tier=senior-architect", color: "text-slate-300" },
  { text: "✓ Next.js 15 & React 19 Core: Initialized (0ms)", color: "text-emerald-400" },
  { text: "✓ Sub-50ms Edge SSR & PostgreSQL Schema: Connected", color: "text-violet-400" },
  { text: "✓ Autonomous AI Agent & RAG Pipeline: Live (24/7)", color: "text-cyan-400" },
  { text: "⚡ Status: Ready for Production Deployments", color: "text-emerald-400 font-semibold" },
];

export default function TerminalMotionGraphic() {
  const [displayedLogs, setDisplayedLogs] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLogs((prev) => (prev < terminalLogs.length ? prev + 1 : 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl bg-white/[0.03] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden my-8 text-left font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-white/[0.04] px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] text-slate-400 font-medium ml-2 flex items-center gap-1.5">
            <Terminal size={12} className="text-violet-400" />
            stova-studio://kolkata-hq
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="p-4 space-y-2 bg-black/40 min-h-[140px]">
        {terminalLogs.slice(0, displayedLogs).map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2 ${log.color}`}
          >
            <span className="text-slate-500 select-none">&gt;</span>
            <span>{log.text}</span>
          </motion.div>
        ))}
        {displayedLogs < terminalLogs.length && (
          <div className="w-2 h-4 bg-violet-400 animate-pulse inline-block align-middle" />
        )}
      </div>
    </div>
  );
}
