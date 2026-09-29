"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Check, Cpu, Server } from "lucide-react";

const terminalLogs = [
  { text: "stova init --studio=kolkata --tier=senior-architect", color: "text-slate-700" },
  { text: "✓ Next.js 15 & React 19 Core: Initialized (0ms)", color: "text-emerald-600" },
  { text: "✓ Sub-50ms Edge SSR & PostgreSQL Schema: Connected", color: "text-indigo-600" },
  { text: "✓ Autonomous AI Agent & RAG Pipeline: Live (24/7)", color: "text-cyan-600" },
  { text: "⚡ Status: Ready for Production Deployments", color: "text-emerald-700 font-bold" },
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
    <div className="w-full max-w-xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_35px_rgba(15,23,42,0.05)] overflow-hidden my-6 text-left font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-slate-500 font-semibold ml-2 flex items-center gap-1">
            <Terminal size={12} className="text-indigo-600" />
            stova-studio://kolkata-hq
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="p-4 space-y-2 bg-slate-900/[0.02] min-h-[140px]">
        {terminalLogs.slice(0, displayedLogs).map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2 ${log.color}`}
          >
            <span className="text-slate-400 select-none">&gt;</span>
            <span>{log.text}</span>
          </motion.div>
        ))}
        {displayedLogs < terminalLogs.length && (
          <div className="w-2 h-4 bg-indigo-600 animate-pulse inline-block align-middle" />
        )}
      </div>
    </div>
  );
}
