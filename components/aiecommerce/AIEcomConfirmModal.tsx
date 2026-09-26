"use client";

import React, { useEffect } from "react";
import { X, HelpCircle, ArrowRight } from "lucide-react";

interface AIEcomConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AIEcomConfirmModal({
  isOpen,
  onClose,
  onConfirm
}: AIEcomConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Dialog Card */}
      <div 
        className="relative w-full max-w-lg bg-[#0B0F19] border border-emerald-500/40 rounded-3xl p-6 sm:p-9 shadow-[0_0_50px_rgba(16,185,129,0.25)] text-center z-10 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Glow ambient background */}
        <div 
          className="pointer-events-none absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-30 z-0"
          style={{ background: "radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 70%)" }}
        />
        <div 
          className="pointer-events-none absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-30 z-0"
          style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)" }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full border border-slate-700/60 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Icon / Badge */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-950/70 border border-emerald-400/50 flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
          <HelpCircle size={32} className="animate-pulse" />
        </div>

        {/* Headline / Question */}
        <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#F8FAFC] leading-[1.35] font-['Hind_Siliguri',sans-serif] mb-6">
          আপনি কি সত্যি সত্যি আপনার business-কে{" "}
          <span className="text-[#25D366] text-emerald-400 font-extrabold underline decoration-emerald-400/50 underline-offset-4">
            মারাত্মক লেভেলের
          </span>{" "}
          করতে চান? তাহলে continue করুন।
        </h3>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="order-2 sm:order-1 px-6 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all duration-200 cursor-pointer font-ui active:scale-95"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onConfirm();
            }}
            className="order-1 sm:order-2 flex-1 px-7 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider text-[#05070D] bg-[#25D366] hover:bg-[#20bd5a] shadow-[0_0_25px_rgba(37,211,102,0.45)] hover:shadow-[0_0_35px_rgba(37,211,102,0.65)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-ui active:scale-95"
          >
            <span>Continue করুন</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
