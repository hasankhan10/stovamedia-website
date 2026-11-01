"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItemData {
  q: string;
  renderAnswer: () => React.ReactNode;
}

const faqs: FAQItemData[] = [
  {
    q: "আমার তো Facebook page আছে, website কেন লাগবে?",
    renderAnswer: () => (
      <span>
        Facebook page দেখে customer tour পছন্দ করতে পারে, কিন্তু হাজার হাজার টাকার booking-এর ভরসাটা website-ই বানায়।{" "}
        <span className="text-[#1D4ED8] font-bold">Page হলো পরিচয়</span>,{" "}
        <span className="text-emerald-700 font-bold">website হলো বিশ্বাস</span>।
      </span>
    )
  },
  {
    q: "Website চালাতে কি আমাকে technical জানতে হবে?",
    renderAnswer: () => (
      <span>
        না। Website বানানো থেকে চালানো পর্যন্ত সবকিছু{" "}
        <span className="text-orange-600 font-bold">Stova Media সামলাবে</span> — আপনি শুধু আপনার{" "}
        <span className="text-emerald-700 font-bold">tour আর customer-এর দিকে মন দিন</span>।
      </span>
    )
  },
  {
    q: "AI Assistant কি সত্যিই customer সামলাতে পারবে?",
    renderAnswer: () => (
      <span>
        <span className="text-cyan-700 font-bold">AI Assistant</span> customer-কে{" "}
        <span className="text-emerald-700 font-bold">সঠিক তথ্য দেবে</span>, package বুঝিয়ে দেবে আর booking-এ সাহায্য করবে —{" "}
        <span className="text-[#1D4ED8] font-bold">২৪ ঘণ্টা, ছুটির দিনেও</span>।
      </span>
    )
  },
  {
    q: "স্লট বুক করলে তারপর কী হবে?",
    renderAnswer: () => (
      <span>
        আপনি যোগাযোগ করলেই আমরা আপনার business বুঝে{" "}
        <span className="text-emerald-700 font-bold">পরের ধাপ জানিয়ে দেবো</span> — কী হবে, কিভাবে হবে,{" "}
        <span className="text-orange-600 font-bold">সব পরিষ্কার করে</span>।
      </span>
    )
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
                      <div className="px-5 sm:px-6 pb-6 text-slate-700 font-['Hind_Siliguri',sans-serif] text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3.5 font-normal">
                        {faq.renderAnswer()}
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
