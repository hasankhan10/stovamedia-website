"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui";
import { FAQItem } from "./types";
import { ChevronDown } from "lucide-react";
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

export default function AIEcomFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section 
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 650px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#05070D] relative z-10 border-b border-slate-800/80"
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">Got Questions?</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F8FAFC] mt-4">
            সাধারণ জিজ্ঞাসা (FAQ)
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
                    ? "border-indigo-500/60 bg-[#0F1524] shadow-[0_0_25px_rgba(99,102,241,0.2)]" 
                    : "border-slate-800 bg-[#0B0F19]/90 hover:border-slate-700 hover:bg-[#0D121F]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 sm:p-7 text-left flex items-center justify-between gap-4 text-white font-bold text-base sm:text-xl md:text-2xl cursor-pointer"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold shrink-0">
                      0{i + 1}
                    </span>
                    <span className="hover:text-cyan-300 transition-colors">{faq.q}</span>
                  </span>
                  <div className={cn(
                    "p-2 rounded-xl border transition-transform duration-300 shrink-0",
                    isOpen 
                      ? "rotate-180 border-cyan-500/50 bg-cyan-950/60 text-cyan-300" 
                      : "border-slate-800 bg-[#05070D] text-slate-400"
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
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-light border-t border-slate-800/80 pt-4">
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
