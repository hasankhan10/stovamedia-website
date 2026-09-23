"use client";

import React, { useState, useEffect, useRef } from "react";
import { Flame, Clock } from "lucide-react";

interface AIEcomTimerProps {
  className?: string;
  size?: "md" | "lg";
  onExpire?: () => void;
}

export default function AIEcomTimer({ className = "", size = "lg", onExpire }: AIEcomTimerProps) {
  const TOTAL = 600; // 10 minutes window
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL);
  const [isBooked, setIsBooked] = useState(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const handleBooked = () => setIsBooked(true);
    window.addEventListener("stova_aiecom_booked_event", handleBooked);

    const storageKey = "stova_aiecom_timer_10m";
    const now = Date.now();
    let startTime = sessionStorage.getItem(storageKey);
    if (!startTime) {
      sessionStorage.setItem(storageKey, String(now));
      startTime = String(now);
    }

    const elapsed = Math.floor((now - parseInt(startTime, 10)) / 1000);
    const initial = Math.max(0, TOTAL - elapsed);
    setTimeLeft(initial);

    if (initial <= 0) {
      onExpireRef.current?.();
      return () => window.removeEventListener("stova_aiecom_booked_event", handleBooked);
    }

    const timer = setInterval(() => {
      const curElapsed = Math.floor((Date.now() - parseInt(startTime!, 10)) / 1000);
      const remaining = Math.max(0, TOTAL - curElapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        onExpireRef.current?.();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("stova_aiecom_booked_event", handleBooked);
    };
  }, []);

  if (isBooked) return null;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const percent = Math.max(0, Math.min(100, (timeLeft / TOTAL) * 100));
  const isLg = size === "lg";

  return (
    <div className={`flex flex-col items-center justify-center gap-3 p-4 sm:p-5 bg-gradient-to-b from-[#0B0F1E] via-[#070A14] to-[#0B0F1E] border border-indigo-500/40 rounded-xl shadow-[0_0_35px_rgba(99,102,241,0.25)] relative overflow-hidden backdrop-blur-xl ${className}`}>
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-cyan-500/20 rounded-full blur-2xl" />

      {/* Header Badge */}
      <div className="flex items-center justify-between w-full gap-3 px-1 border-b border-slate-800/80 pb-2.5 z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
          </span>
          <span className="text-xs sm:text-sm font-bold text-rose-300 font-ui uppercase tracking-wider flex items-center gap-1.5">
            <Flame size={14} className="text-rose-400 animate-bounce" />
            Limited Monthly Slots
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300 text-xs sm:text-sm font-['Hind_Siliguri',sans-serif]">
          <Clock size={13} className="text-cyan-400" />
          <span>অফার শেষ হতে বাকি</span>
        </div>
      </div>

      {/* Countdown Digits */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-1.5 z-10">
        {[
          { label: "Minutes", val: minutes },
          { label: "Seconds", val: seconds },
        ].map((item, idx) => (
          <React.Fragment key={item.label}>
            {idx === 1 && (
              <div className="flex flex-col gap-1.5 pb-5">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)] animate-pulse" />
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)] animate-pulse" />
              </div>
            )}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition" />
                <div className={`relative flex items-center justify-center ${isLg ? "min-w-[68px] sm:min-w-[85px] py-2.5 sm:py-3.5 px-3 sm:px-4 text-2xl sm:text-4xl md:text-5xl" : "min-w-[56px] py-2 px-2.5 text-xl sm:text-2xl"} font-mono font-extrabold text-white bg-[#05070D] border border-indigo-500/50 rounded-lg shadow-[inset_0_1px_15px_rgba(99,102,241,0.2)] tracking-wider`}>
                  <span className="bg-gradient-to-b from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                    {item.val}
                  </span>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-300 font-ui mt-1.5">
                {item.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#05070D] border border-slate-800 rounded-full h-2 overflow-hidden relative z-10 mt-1">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-1000 ease-linear rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
