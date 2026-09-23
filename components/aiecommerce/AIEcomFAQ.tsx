"use client";

import React, { useState } from "react";
import { SectionLabel } from "@/components/ui";
import { FAQItem } from "./types";
import { ChevronDown } from "lucide-react";

const faqs: FAQItem[] = [
  {
    q: "আপনারা কি শুধু AI Integration করেন?",
    a: "না। আমাদের মূল Service হলো সম্পূর্ণ Premium, Custom E-commerce Website Development — তার সাথে 24/7 AI Shopping Assistant, Smart Semantic Search এবং Automated AI SEO একীভূত থাকে, সব একসাথে সম্পূর্ণ Turnkey Solution হিসেবে।"
  },
  {
    q: "Existing Website-এ কি এই AI Features যুক্ত করা যাবে?",
    a: "হ্যাঁ, আপনার বর্তমান Website-এর Technology Stack ও Product Database বিশ্লেষণ করে আমরা Seamlessly এই AI Shopping Assistant ও Smart Search Engine ইন্টিগ্রেট করে দিতে পারি।"
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
    <section className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#05070D] relative z-10 border-b border-slate-800/80">
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
                className="border border-slate-800 bg-[#0B0F19]/80 overflow-hidden transition-colors duration-200 hover:border-indigo-500/40"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-6 sm:p-7 text-left flex justify-between items-center gap-4 text-white font-bold text-base sm:text-xl md:text-2xl focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={22} 
                    className={`text-cyan-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                  />
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-light border-t border-slate-800/60 pt-5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
