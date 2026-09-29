"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui";
import { FAQItem } from "./types";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs: FAQItem[] = [
  {
    q: "আপনারা কি শুধু AI Integration করেন?",
    a: "না। আমাদের মূল Service হলো সম্পূর্ণ Premium, Custom E-commerce Website Development — তার সাথে 24/7 AI Shopping Assistant, Smart Semantic Search এবং Automated AI SEO একীভূত থাকে, সব একসাথে সম্পূর্ণ Turnkey Solution হিসেবে।"
  },
  {
    q: "Existing Website-এ কি এই AI Features যুক্ত করা যাবে?",
    a: "হ্যাঁ, অবশ্যই! আপনার বর্তমান Website বা E-commerce স্টোরে আমরা সরাসরি আমাদের AI Shopping Assistant এবং Smart Search ইঞ্জিন ইন্টিগ্রেট করে দিতে পারি। তবে আপনার পুরোনো প্ল্যাটফর্ম যদি লোডিংয়ে স্লো হয় বা কনভার্শন কম থাকে, তাহলে সম্পূর্ণ সিমলেস কাস্টমার এক্সপেরিয়েন্স ও সর্বোচ্চ সেলস নিশ্চিত করতে আমাদের Modern Custom Architecture-এ আপগ্রেড করা হবে আপনার বিজনেসের জন্য সবচেয়ে সেরা এবং লাভজনক সিদ্ধান্ত।"
  },
  {
    q: "এটির Price কত?",
    a: "আপনার Business Requirement, Product Catalogue সাইজ এবং কাস্টম ফিচারের ওপর ভিত্তি করে প্যাকেজ নির্ধারণ করা হয়। আমাদের Free Discovery Consultation-এ আপনার জন্য Exact Pricing ও Special Offer জানিয়ে দেওয়া হবে।"
  },
  {
    q: "Launch-এর পরে কি Support থাকবে?",
    a: "অবশ্যই! Launch-এর পর প্রথম ৩ মাস সম্পূর্ণ Free Priority 24/7 Technical Support পাবেন। এরপরও আপনার সুবিধার্থে আমাদের ডেডিকেটেড Maintenance & AI Continuous Optimization সার্ভিস চালু রাখা যায়।"
  },
  {
    q: "আপনারা কী কী কাজ করেন?",
    a: "আমরা Premium Animation যুক্ত Website, Landing Page, Professional Custom Software এবং AI Automation তৈরি করি। শুধু আপনার Requirement বলুন আর নিজেকে সময় ও টাকা নষ্টের হাত থেকে বাঁচান।"
  }
];

export default function AIEcomFAQ({ onBookClick }: { onBookClick?: () => void }) {
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
            সাধারণ প্রশ্ন (FAQ) <span className="text-red-500">?</span>
          </h2>
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
                  className="w-full p-5 sm:p-7 text-left flex items-center justify-between gap-4 text-slate-900 font-bold text-base sm:text-xl md:text-2xl cursor-pointer"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono text-xs font-bold shrink-0">
                      0{i + 1}
                    </span>
                    <span className="hover:text-blue-600 transition-colors">{faq.q}</span>
                  </span>
                  <div className={cn(
                    "p-2 rounded-xl border transition-transform duration-300 shrink-0",
                    isOpen 
                      ? "rotate-180 border-cyan-300 bg-cyan-50 text-cyan-800" 
                      : "border-slate-200 bg-white text-slate-400"
                  )}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {onBookClick && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-4.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.35)] cursor-pointer rounded-2xl active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
            >
              <span>Free Consultation Appointment বুক করুন</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
