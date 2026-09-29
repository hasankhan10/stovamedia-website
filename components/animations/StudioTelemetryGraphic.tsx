"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Radio, ShieldCheck, Zap } from "lucide-react";

export default function StudioTelemetryGraphic() {
  const [timeStr, setTimeStr] = useState("12:30 PM");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 shadow-2xs space-y-3">
      {/* Live SLA & Clock */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <Radio size={16} className="animate-pulse text-indigo-600" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase tracking-wider">
              KOLKATA STUDIO TIME (IST)
            </span>
            <span className="text-xs font-mono font-bold text-slate-900">
              {timeStr} GMT+5:30
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Architect Online</span>
        </div>
      </div>

      {/* Animated 4-Hour Response SLA Bar */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex justify-between items-center text-[11px] font-mono mb-1.5">
          <span className="text-slate-600 flex items-center gap-1">
            <Clock size={12} className="text-indigo-600" />
            Direct SLA Response Window
          </span>
          <span className="text-emerald-700 font-bold">&lt; 4 Hours</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
