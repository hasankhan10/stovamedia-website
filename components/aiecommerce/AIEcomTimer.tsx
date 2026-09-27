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
    <div className={`flex flex-col items-center justify-center gap-3 p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.04)] relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-indigo-500/10 rounded-full blur-2xl" />

      {/* Header Badge */}
      <div className="flex items-center justify-between w-full gap-3 px-1 border-b border-slate-100 pb-2.5 z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
          </span>
          <span className="text-xs sm:text-sm font-bold text-rose-600 font-ui uppercase tracking-wider flex items-center gap-1.5">
            <Flame size={14} className="text-rose-500 animate-bounce" />
            Limited Monthly Slots
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm font-['Hind_Siliguri',sans-serif]">
          <Clock size={13} className="text-indigo-600" />
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
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-indigo-600 animate-pulse" />
              </div>
            )}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition" />
                <div className={`relative flex items-center justify-center ${isLg ? "min-w-[68px] sm:min-w-[85px] py-2.5 sm:py-3.5 px-3 sm:px-4 text-2xl sm:text-4xl md:text-5xl" : "min-w-[56px] py-2 px-2.5 text-xl sm:text-2xl"} font-mono font-extrabold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl shadow-xs tracking-wider`}>
                  <span className="text-slate-900">
                    {item.val}
                  </span>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 font-ui mt-1.5">
                {item.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 border border-slate-200 rounded-full h-2 overflow-hidden relative z-10 mt-1">
        <div 
          className="h-full bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
