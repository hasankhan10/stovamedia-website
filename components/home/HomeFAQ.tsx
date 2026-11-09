"use client";

import React, { useState } from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { AppointmentModal, SpotlightCard, SpecularButton } from "@/components/ui";

interface FAQItem {
  number: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    number: "01",
    question: "What services does Stova Media provide?",
    answer:
      "We build fast modern websites, custom web applications, and smart AI chat assistants that help businesses win more clients and automate daily tasks.",
  },
  {
    number: "02",
    question: "How does pricing and payment work?",
    answer:
      "We work on simple, fixed project prices with zero surprise fees. Typically, it is 50% upfront to start and 50% only after you review and approve the final work.",
  },
  {
    number: "03",
    question: "Who owns the website and code after launch?",
    answer:
      "You own 100% of everything. Your website files, code, design, and domain belong entirely to you with zero monthly lock-in or recurring licensing fees.",
  },
  {
    number: "04",
    question: "How long does a project take?",
    answer:
      "Most business websites are ready in 10 to 14 days. Online stores and AI tools take 2 to 3 weeks, and custom software takes 3 to 6 weeks.",
  },
];

export default function HomeFAQ() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section 
      id="faq" 
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#07080C] text-white border-b border-white/[0.08] relative overflow-hidden"
    >
      {/* 🌌 Premium Ambient Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[350px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139, 92, 246, 0.2) 0%, rgba(79, 70, 229, 0.1) 45%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <HelpCircle size={13} className="text-violet-400" />
            <span>Common Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-3">
            Clear Answers to Common Questions
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about working with us, pricing, and project ownership.
          </p>
        </div>

        {/* 2x2 Compact Bento Grid with React Bits SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {faqs.map((faq) => (
            <SpotlightCard
              key={faq.number}
              spotlightColor="rgba(139, 92, 246, 0.22)"
              className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-violet-500/40 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-medium text-violet-400">
                  {faq.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500/40" />
              </div>

              <h3 className="text-base sm:text-lg font-medium text-slate-100 mb-2 leading-snug tracking-tight">
                {faq.question}
              </h3>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                {faq.answer}
              </p>
            </SpotlightCard>
          ))}
        </div>

        {/* Bottom Consultation Box with SpecularButton */}
        <div className="rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
          <div className="text-left space-y-1">
            <h4 className="text-sm sm:text-base font-medium text-slate-200">
              Have a question about your project?
            </h4>
            <p className="text-xs text-slate-400">
              Book a free 15-minute call to discuss your goals and get straightforward advice.
            </p>
          </div>

          <SpecularButton
            onClick={() => setModalOpen(true)}
            size="sm"
            radius={12}
            tint="#6d28d9"
            tintOpacity={0.7}
            lineColor="#c4b5fd"
            baseColor="#4c1d95"
            glow={1.1}
            thickness={1.3}
            intensity={1.1}
            idleIntensity={0.5}
            shineSize={14}
            shineFade={32}
            followMouse={true}
            proximity={280}
            className="text-white font-medium text-xs sm:text-sm shadow-md shadow-violet-600/30 shrink-0"
          >
            <span>Book a Free Call</span>
            <ArrowRight size={14} />
          </SpecularButton>
        </div>
      </div>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
