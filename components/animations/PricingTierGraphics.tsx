"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Bot, Database, Check, Sparkles, MessageSquare, Shield, Clock } from "lucide-react";

/**
 * 1. Growth Website Speedometer Mini-Graphic
 */
export function GrowthWebsiteMotionGraphic() {
  return (
    <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-50 to-emerald-50/40 border border-emerald-100/90 my-4 overflow-hidden relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
          <Zap size={13} className="text-amber-500 fill-amber-500" />
          Core Web Vitals Engine
        </span>
        <span className="text-[10px] font-mono font-extrabold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
          100/100
        </span>
      </div>

      {/* Animated Gauge Bar */}
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
            <span>Server Response (TTFB)</span>
            <span className="text-emerald-700 font-bold">28ms</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "96%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
            <span>Google Maps #1 Ranking Rank</span>
            <span className="text-indigo-700 font-bold">Optimized</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. E-Commerce & 24/7 AI Bot Conversation Simulation
 */
export function EcommerceAIMotionGraphic() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-50 to-indigo-50/40 border border-indigo-100/90 my-4 overflow-hidden relative">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
          <Bot size={13} className="text-indigo-600" />
          Autonomous 24/7 AI Agent
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      {/* Simulated Live Chat Stream */}
      <div className="space-y-2 text-[11px] font-ui">
        <motion.div
          animate={{ opacity: activeStep >= 0 ? 1 : 0.4, y: activeStep >= 0 ? 0 : 4 }}
          className="p-2 rounded-xl bg-white border border-slate-200/80 text-slate-800 flex items-start gap-2 shadow-2xs"
        >
          <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[9px] shrink-0 mt-0.5">👤</span>
          <span>&quot;Do you have size M available in Kolkata?&quot;</span>
        </motion.div>

        <motion.div
          animate={{ opacity: activeStep >= 1 ? 1 : 0.3, y: activeStep >= 1 ? 0 : 4 }}
          className="p-2 rounded-xl bg-indigo-600 text-white flex items-start gap-2 shadow-xs"
        >
          <Bot size={13} className="shrink-0 mt-0.5 text-cyan-300" />
          <span>&quot;Yes! In stock. Tap here to pay via UPI &amp; get delivery in 24h.&quot;</span>
        </motion.div>

        <motion.div
          animate={{ opacity: activeStep >= 2 ? 1 : 0.3, y: activeStep >= 2 ? 0 : 4 }}
          className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono flex items-center justify-between"
        >
          <span className="flex items-center gap-1">
            <Check size={12} className="text-emerald-600 stroke-[3]" />
            Order #8492 Auto-Confirmed
          </span>
          <span className="font-bold">WhatsApp Synced</span>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * 3. Custom SaaS Microservices & Database Node Network
 */
export function CustomSaaSMotionGraphic() {
  return (
    <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-50 to-cyan-50/40 border border-cyan-100/90 my-4 overflow-hidden relative">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
          <Database size={13} className="text-cyan-600" />
          Enterprise Full-Stack Pipeline
        </span>
        <span className="text-[10px] font-mono font-bold text-cyan-800 bg-cyan-100/90 px-2 py-0.5 rounded-full">
          99.99% SLA
        </span>
      </div>

      {/* 3 Node Animated Laser Circuit */}
      <div className="relative flex items-center justify-between px-2 py-2">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M 40 28 L 120 28" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <path d="M 140 28 L 220 28" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <motion.circle
            r="3"
            fill="#4F46E5"
            animate={{ cx: [40, 120], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            cy="28"
          />
          <motion.circle
            r="3"
            fill="#06B6D4"
            animate={{ cx: [140, 220], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, delay: 0.8, repeat: Infinity, ease: "linear" }}
            cy="28"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-800">
            <span className="text-[10px] font-mono font-bold text-indigo-600">Next</span>
          </div>
          <span className="text-[9px] font-mono text-slate-600 mt-1">App UI</span>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-600 text-white shadow-xs flex items-center justify-center">
            <Shield size={16} />
          </div>
          <span className="text-[9px] font-mono text-indigo-700 font-bold mt-1">RBAC API</span>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-800">
            <Database size={15} className="text-cyan-600" />
          </div>
          <span className="text-[9px] font-mono text-slate-600 mt-1">Postgres</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[9px] font-mono pt-2 border-t border-slate-200/60 text-slate-500">
        <span>RAG Pipelines</span>
        <span className="text-cyan-700 font-bold">100% IP Ownership</span>
      </div>
    </div>
  );
}
