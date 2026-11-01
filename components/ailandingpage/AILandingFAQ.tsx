"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQItem } from "./types";
import { Plus, Minus } from "lucide-react";

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

export default function AILandingFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section 
      className="py-14 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#FDFBF7] relative z-10 border-b border-[#EAE4D9]/80 font-['Hind_Siliguri',sans-serif]"
    >
      <div className="max-w-[950px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            মনে যে প্রশ্নগুলো আসছে (FAQ) <span className="text-orange-600">?</span>
          </h2>
        </div>

        {/* Accordion Rows */}
        <div className="space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div 
                key={i}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? "border-orange-300 bg-white shadow-xs" 
                    : "border-[#EAE4D9] bg-white hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Anek_Bangla',sans-serif] text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors bg-[#F8F5EE] text-slate-700">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-slate-600 font-['Hind_Siliguri',sans-serif] text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3.5 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
