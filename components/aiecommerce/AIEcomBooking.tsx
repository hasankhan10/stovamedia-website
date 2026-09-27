"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

interface AIEcomBookingProps {
  onBookClick?: () => void;
  onWhatsAppClick?: (url: string) => void;
}

export default function AIEcomBooking({ 
  onBookClick,
  onWhatsAppClick 
}: AIEcomBookingProps) {
  return (
    <section 
      id="booking"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 600px" }}
      className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-5 sm:px-8 md:px-12 lg:px-20 bg-slate-50/100 relative z-10 overflow-hidden border-t border-slate-200/80"
    >
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[450px] md:h-[600px] rounded-full opacity-40 z-0"
        style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.04) 60%, transparent 70%)" }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10 text-center space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-semibold uppercase tracking-wider font-ui rounded-full shadow-2xs">
          <Sparkles size={14} />
          <span>Limited Monthly Intake (৩-৫ Brands Only)</span>
        </div>

        <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] text-slate-900 max-w-4xl mx-auto">
          আপনার Business-কে এবার একটা <span className="text-green-700">Real AI-Powered</span> Platform দিন
        </h2>

        <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-base sm:text-xl md:text-2xl leading-relaxed font-light max-w-3xl mx-auto">
          কোনো ঝুঁকি ছাড়াই, একটা Complete Premium Platform। প্রতি মাসে আমরা মাত্র ৩-৫টি ব্র্যান্ড নিয়ে সম্পূর্ণ ফোকাস দিয়ে কাজ করি — আপনার Slot শেষ হওয়ার আগেই যোগাযোগ করুন।
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-ui text-sm sm:text-base text-slate-700 max-w-3xl mx-auto">
          {[
            "ফ্রি ৩০ মিনিটের টেকনিক্যাল কনসাল্টেশন",
            "Actionable AI Growth Roadmap",
            "ডাইরেক্ট আর্কিটেক্ট সাপোর্ট"
          ].map((text, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-800 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-2xs">
              <CheckCircle2 size={16} className="text-cyan-600 flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          {onBookClick && (
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto flex-1 px-8 py-4.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.45)] cursor-pointer rounded-2xl active:scale-[0.98] font-['Hind_Siliguri',sans-serif] min-h-[52px]"
            >
              <span>Free Consultation Appointment বুক করুন</span>
              <ArrowRight size={18} />
            </button>
          )}

          <a 
            href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20book%20a%20free%20consultation%20for%20AI%20E-commerce"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              const url = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20book%20a%20free%20consultation%20for%20AI%20E-commerce";
              if (onWhatsAppClick) {
                e.preventDefault();
                onWhatsAppClick(url);
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base tracking-wider transition-all duration-300 shadow-md min-h-[52px] rounded-2xl cursor-pointer active:scale-[0.98] font-ui"
          >
            <MessageSquare size={18} />
            <span>Direct WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Compact Clean Footer */}
      <div className="mt-14 sm:mt-20 pt-6 border-t border-slate-200 text-center text-xs text-slate-500 font-ui flex flex-col items-center gap-2.5">
        <Link href="/" className="group inline-flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-300" />
            <Image 
              src="/logo.jpeg" 
              alt="Stova Media Logo" 
              width={160} 
              height={42} 
              className="relative h-8 sm:h-9 w-auto object-contain rounded-full border border-slate-200 shadow-xs" 
            />
          </div>
        </Link>
        <p className="text-[11px] sm:text-xs text-slate-500">
          © {new Date().getFullYear()} Stova Media • All Rights Reserved. Transforming E-Commerce with Intelligent AI Solutions.
        </p>
      </div>
    </section>
  );
}
