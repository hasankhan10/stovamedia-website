"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Bot, X, Minimize2 } from "lucide-react";

const AIEcomChatbotDemo = dynamic(() => import("./AIEcomChatbotDemo"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] sm:h-[520px] flex items-center justify-center bg-[#070A14] text-slate-400 font-ui text-sm">
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <span>AI Assistant লোড হচ্ছে...</span>
      </div>
    </div>
  )
});

export default function AIEcomFloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("stova_open_aichat", handleOpenChat);

    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3500);

    return () => {
      window.removeEventListener("stova_open_aichat", handleOpenChat);
      clearTimeout(timer);
    };
  }, []);

  // Lock background body scroll when chat modal is open on mobile and desktop
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* 1️⃣ Floating Bubble Trigger (Bottom-Right) */}
      <div className="fixed bottom-24 sm:bottom-8 right-3.5 sm:right-8 z-40 flex items-center sm:items-end gap-2.5 sm:gap-3 pointer-events-auto">
        {/* Floating Large Tooltip / Action Pill */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#0E1528]/95 via-[#0B1020]/95 to-[#070B18]/95 border-2 border-cyan-400/60 text-white shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan-300 group max-w-[calc(100vw-85px)] sm:max-w-none"
          >
            <span className="text-amber-300 text-sm sm:text-base animate-pulse shrink-0">⚡</span>
            <span className="font-['Hind_Siliguri',sans-serif] text-[11px] sm:text-sm md:text-base font-bold text-slate-100 group-hover:text-cyan-200 transition-colors tracking-wide truncate sm:whitespace-normal">
              AI শপিং অ্যাসিস্ট্যান্ট <strong className="text-cyan-400 font-extrabold underline decoration-cyan-400/40 decoration-1 underline-offset-4">ডেমো ট্রাই করুন →</strong>
            </span>
          </div>
        )}

        {/* The Main Circular Floating Action Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Shopping Assistant Demo Chat"
          className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/20 shrink-0"
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <>
              <Bot size={26} className="animate-pulse" />
              {/* Online indicator ping */}
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-400 border-2 border-[#05070D]" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* 2️⃣ Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 sm:hidden animate-in fade-in duration-200"
        />
      )}

      {/* 3️⃣ Floating Chat Window Modal (Native Bottom Sheet on Mobile, Floating on Desktop) */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-28 sm:right-6 md:right-8 z-50 w-full sm:w-[440px] md:w-[460px] max-w-full sm:max-w-[95vw] animate-in fade-in slide-in-from-bottom-8 duration-300 pointer-events-auto">
          <div className="relative shadow-[0_25px_70px_rgba(0,0,0,0.95)] rounded-t-3xl sm:rounded-3xl flex flex-col bg-[#070A14] border-t sm:border border-indigo-500/40 overflow-hidden">
            {/* Mobile Sheet Drag Handle Indicator */}
            <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-[#05070D]/95">
              <div className="w-12 h-1.5 bg-slate-700/80 rounded-full" />
            </div>

            {/* Close / Minimize Button Top Right */}
            <div className="absolute top-3.5 sm:top-3.5 right-3.5 sm:right-4 z-30 flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 sm:p-2 bg-[#0D1322]/90 hover:bg-rose-950/80 border border-slate-700/80 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer flex items-center justify-center shadow-md active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            {/* Embedded Interactive Chatbot */}
            <AIEcomChatbotDemo onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
