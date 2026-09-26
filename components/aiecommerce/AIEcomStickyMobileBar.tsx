"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, ArrowRight, Flame } from "lucide-react";

interface AIEcomStickyMobileBarProps {
  onBookClick: () => void;
  onWhatsAppClick?: (url: string) => void;
}

export default function AIEcomStickyMobileBar({ onBookClick, onWhatsAppClick }: AIEcomStickyMobileBarProps) {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isOver = window.scrollY > 280;
          setVisible((prev) => (prev !== isOver ? isOver : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleBooked = () => setIsBooked(true);
    window.addEventListener("stova_aiecom_booked_event", handleBooked);

    const startTime = sessionStorage.getItem("stova_aiecom_timer_10m") || String(Date.now());
    const start = parseInt(startTime, 10);
    const initial = Math.max(0, 600 - Math.floor((Date.now() - start) / 1000));
    setTimeLeft(initial);

    const timer = setInterval(() => {
      const rem = Math.max(0, 600 - Math.floor((Date.now() - start) / 1000));
      setTimeLeft(rem);
      if (rem <= 0) clearInterval(timer);
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("stova_aiecom_booked_event", handleBooked);
      clearInterval(timer);
    };
  }, []);

  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 p-2.5 sm:p-3 bg-[#070B16]/95 border-t border-indigo-500/40 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-md mx-auto flex flex-col gap-1.5">
        {/* Banner Tag */}
        <div className="flex items-center justify-between px-1 text-[10px] text-slate-300 font-['Hind_Siliguri',sans-serif]">
          {isBooked ? (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold uppercase tracking-wider font-ui">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ✓ Consultation Slot Confirmed
            </span>
          ) : (
            <>
              <span className="flex items-center gap-1 text-rose-300 font-semibold uppercase tracking-wider font-ui">
                <span className={`w-1.5 h-1.5 rounded-full ${timeLeft === 0 ? "bg-rose-500" : "bg-rose-500 animate-ping"}`} />
                <Flame size={11} className="text-rose-400" />
                {timeLeft === 0 ? "Slots Expired" : "Limited Monthly Slots"}
              </span>
              <span className={timeLeft === 0 ? "text-rose-400 font-bold" : "text-cyan-300 font-mono font-bold"}>
                {timeLeft === 0 ? "সময় সমাপ্ত" : `${min}:${sec} বাকি`}
              </span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-12 gap-2 items-center">
          <button
            onClick={onBookClick}
            className="col-span-8 py-3 px-3 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5 font-['Hind_Siliguri',sans-serif]"
          >
            <span>ফ্রি বুকিং করুন</span>
            <ArrowRight size={14} className="flex-shrink-0" />
          </button>

          <a
            href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20AI%20E-commerce%20Consultation%20Slot"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              const url = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20AI%20E-commerce%20Consultation%20Slot";
              if (onWhatsAppClick) {
                e.preventDefault();
                onWhatsAppClick(url);
              }
            }}
            className="col-span-4 py-3 px-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#05070D] font-bold text-xs uppercase tracking-wider transition-transform active:scale-[0.98] flex items-center justify-center gap-1 shadow-md font-ui"
          >
            <MessageSquare size={14} className="flex-shrink-0" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
