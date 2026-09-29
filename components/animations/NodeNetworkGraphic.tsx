"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Database, Shield, Cpu } from "lucide-react";

export default function NodeNetworkGraphic() {
  return (
    <div className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-indigo-50/40 border border-indigo-100 overflow-hidden">
      {/* Radial indigo glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-300/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Server size={15} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-ui">
            Microservices Architecture
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          Zero Latency
        </span>
      </div>

      {/* SVG Animated Node Circuit Network */}
      <div className="relative h-36 w-full flex items-center justify-between px-2">
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>

          {/* Connection Path 1: Client to Gateway */}
          <path
            d="M 50 68 L 135 68"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Animated Laser Pulse 1 */}
          <motion.circle
            r="3.5"
            fill="#4F46E5"
            animate={{
              cx: [50, 135],
              cy: [68, 68],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Connection Path 2: Gateway to DB */}
          <path
            d="M 175 68 L 260 68"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Animated Laser Pulse 2 */}
          <motion.circle
            r="3.5"
            fill="#06B6D4"
            animate={{
              cx: [175, 260],
              cy: [68, 68],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.8,
              delay: 0.9,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>

        {/* Node 1: Next.js Frontend */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-800"
          >
            <Cpu size={20} className="text-indigo-600" />
          </motion.div>
          <span className="text-[10px] font-mono font-bold text-slate-700 mt-1.5">Next.js UI</span>
          <span className="text-[9px] font-mono text-emerald-600">Edge SSR</span>
        </div>

        {/* Node 2: Central API Gateway */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(79, 70, 229, 0.2)",
                "0 0 0 10px rgba(79, 70, 229, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white shadow-md flex items-center justify-center"
          >
            <Shield size={22} />
          </motion.div>
          <span className="text-[10px] font-mono font-bold text-indigo-700 mt-1.5">API Gateway</span>
          <span className="text-[9px] font-mono text-indigo-500">RBAC / Auth</span>
        </div>

        {/* Node 3: PostgreSQL Database */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-800"
          >
            <Database size={20} className="text-cyan-600" />
          </motion.div>
          <span className="text-[10px] font-mono font-bold text-slate-700 mt-1.5">PostgreSQL</span>
          <span className="text-[9px] font-mono text-cyan-600">Encrypted</span>
        </div>
      </div>

      {/* SLA Metric Footer */}
      <div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-slate-200/70 text-slate-500">
        <span>Uptime SLA: 99.99%</span>
        <span className="text-indigo-700 font-bold">100% Code Ownership</span>
      </div>
    </div>
  );
}
