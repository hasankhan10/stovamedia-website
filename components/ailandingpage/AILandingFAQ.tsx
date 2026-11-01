"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui";
import { FAQItem } from "./types";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs: FAQItem[] = [
  {
    q: "আমার তো Facebook page আছে, website কেন লাগবে?",
    a: "Facebook page দেখে customer tour পছন্দ করতে পারে, কিন্তু হাজার হাজার টাকার booking-এর ভরসাটা website-ই বানায়। Page হলো পরিচয়, website হলো বিশ্বাস।"
  },
  {
    q: "Website চালাতে কি আমাকে technical জানতে হবে?",
    a: "না। Website বানানো থেকে চালানো পর্যন্ত সবকিছু Stova Media সামলাবে — আপনি শুধু আপনার tour আর customer-এর দিকে মন দিন।"
  },
  {
    q: "AI Assistant কি সত্যিই customer সামলাতে পারবে?",
    a: "AI Assistant customer-কে সঠিক তথ্য দেবে, package বুঝিয়ে দেবে আর booking-এ সাহায্য করবে — ২৪ ঘণ্টা, ছুটির দিনেও।"
  },
  {
    q: "স্লট বুক করলে তারপর কী হবে?",
    a: "আপনি যোগাযোগ করলেই আমরা আপনার business বুঝে পরের ধাপ জানিয়ে দেবো — কী হবে, কিভাবে হবে, সব পরিষ্কার করে।"
  }
];

export default function AILandingFAQ({ onBookClick }: { onBookClick?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section 
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 650px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-white relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">Got Questions?</SectionLabel>
          <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mt-4">
            মনে যে প্রশ্নগুলো আসছে (FAQ) <span className="text-red-500">?</span>
          </h2>
          <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-base sm:text-xl mt-3 font-medium">
            সিদ্ধান্ত নেওয়ার আগে আপনার সব সন্দেহের সোজা উত্তর:
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div 
                key={i}
                className={cn(
                  "border rounded-2xl transition-all duration-300 overflow-hidden",
                  isOpen 
                    ? "border-indigo-300 bg-white shadow-[0_4px_25px_rgba(99,102,241,0.08)]" 
                    : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-left p-5 sm:p-7 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border",
                    isOpen 
                      ? "rotate-180 bg-indigo-600 text-white border-indigo-600" 
                      : "bg-white text-slate-600 border-slate-200"
                  )}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-7 pb-6 sm:pb-7 text-slate-600 font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-sm sm:text-base md:text-lg leading-relaxed border-t border-slate-100 pt-4 font-medium">
                        {i === 0 ? (
                          <p>
                            Facebook page দেখে customer tour পছন্দ করতে পারে, কিন্তু <span className="text-red-500 font-bold">হাজার হাজার টাকার booking</span>-এর ভরসাটা website-ই বানায়।{" "}
                            <strong className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Page হলো পরিচয়, website হলো বিশ্বাস।</strong>
                          </p>
                        ) : i === 1 ? (
                          <p>
                            না। Website বানানো থেকে চালানো পর্যন্ত সবকিছু <strong className="text-indigo-600 font-bold">Stova Media সামলাবে</strong> — আপনি শুধু আপনার <span className="text-green-700 font-semibold">tour আর customer-এর দিকে মন দিন</span>।
                          </p>
                        ) : i === 2 ? (
                          <p>
                            AI Assistant customer-কে <span className="text-emerald-700 font-semibold">সঠিক তথ্য দেবে</span>, package বুঝিয়ে দেবে আর <span className="text-green-700 font-semibold">booking-এ সাহায্য করবে</span> — <strong className="text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded">২৪ ঘণ্টা, ছুটির দিনেও</strong>।
                          </p>
                        ) : (
                          <p>
                            আপনি যোগাযোগ করলেই আমরা আপনার business বুঝে পরের ধাপ জানিয়ে দেবো —{" "}
                            <strong className="text-emerald-700 font-bold">কী হবে, কিভাবে হবে, সব পরিষ্কার করে।</strong>
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {onBookClick && (
          <div className="mt-12 text-center">
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_4px_25px_rgba(99,102,241,0.3)] transition active:scale-98 cursor-pointer font-['Hind_Siliguri',sans-serif]"
            >
              <span>আপনার স্লট এখনই কনফার্ম করুন</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
