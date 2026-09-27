"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Bot, X } from "lucide-react";

const AIEcomChatbotDemo = dynamic(() => import("./AIEcomChatbotDemo"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] sm:h-[520px] flex items-center justify-center bg-white text-slate-500 font-ui text-sm">
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <span>AI Assistant লোড হচ্ছে...</span>
      </div>
    </div>
  )
});

export default function AIEcomFloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("stova_open_aichat", handleOpenChat);

    return () => {
      window.removeEventListener("stova_open_aichat", handleOpenChat);
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
            className="flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl bg-white/95 border-2 border-indigo-200 text-slate-900 shadow-[0_10px_30px_rgba(99,102,241,0.18)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.3)] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:border-indigo-400 group max-w-[calc(100vw-85px)] sm:max-w-none"
          >
            <span className="text-amber-500 text-sm sm:text-base animate-pulse shrink-0">⚡</span>
            <span className="font-['Hind_Siliguri',sans-serif] text-[11px] sm:text-sm md:text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors tracking-wide truncate sm:whitespace-normal">
              AI শপিং অ্যাসিস্ট্যান্ট <strong className="text-indigo-600 font-extrabold underline decoration-indigo-300 decoration-1 underline-offset-4">ডেমো ট্রাই করুন →</strong>
            </span>
          </div>
        )}

        {/* The Main Circular Floating Action Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Shopping Assistant Demo Chat"
          className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-[0_8px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-2 border-white shrink-0"
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <>
              <Bot size={26} className="animate-pulse" />
              {/* Online indicator ping */}
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-white" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* 2️⃣ Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 sm:hidden animate-in fade-in duration-200"
        />
      )}

      {/* 3️⃣ Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-28 sm:right-6 md:right-8 z-50 w-full sm:w-[440px] md:w-[460px] max-w-full sm:max-w-[95vw] animate-in fade-in slide-in-from-bottom-8 duration-300 pointer-events-auto">
          <div className="relative shadow-[0_25px_70px_rgba(0,0,0,0.2)] rounded-t-3xl sm:rounded-3xl flex flex-col bg-white border-t sm:border border-slate-200 overflow-hidden">
            {/* Mobile Sheet Drag Handle Indicator */}
            <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-slate-50">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Close / Minimize Button Top Right */}
            <div className="absolute top-3.5 sm:top-3.5 right-3.5 sm:right-4 z-30 flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 sm:p-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl transition-colors cursor-pointer flex items-center justify-center shadow-xs active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            {/* Actual Interactive Chatbot Sandbox Interface */}
            <div className="flex-1 w-full overflow-hidden bg-white">
              <AIEcomChatbotDemo />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
