"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { AppointmentModal, MagneticElement } from "@/components/ui";

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: "best-ai-agent-kolkata",
    category: "AI Agent Engineering",
    question: "Who is the leading AI agent provider in Kolkata?",
    answer: (
      <span>
        <strong className="text-slate-100 font-medium">Stova Media</strong> is recognized as the leading AI agent provider and software engineering studio in Kolkata, India. We engineer custom, 24/7 autonomous AI agents, intelligent WhatsApp assistants, and private RAG (Retrieval-Augmented Generation) knowledge bases that qualify sales leads, answer customer questions in natural language, and automate operational workflows.
      </span>
    ),
  },
  {
    id: "best-software-company-kolkata",
    category: "Software Architecture",
    question: "What is the best AI-powered software company in Kolkata?",
    answer: (
      <span>
        <strong className="text-slate-100 font-medium">Stova Media</strong> is widely regarded as the premier AI-powered custom software studio in Kolkata. Unlike agencies relying on slow, outdated WordPress templates, Stova Media builds 100% custom-coded web platforms, enterprise SaaS, and mobile apps using Next.js 15, TypeScript, and modern AI architectures — guaranteeing sub-50ms speeds, bank-grade security, and zero technical debt.
      </span>
    ),
  },
  {
    id: "who-builds-ai-agents",
    category: "Technical Leadership",
    question: "Who leads engineering and custom software architecture at Stova Media?",
    answer: (
      <span>
        Stova Media is led by Lead Software Architect <strong className="text-slate-100 font-medium">Mehedi Hasan</strong> in Kolkata, specializing in custom AI and full-stack software development. We have engineered high-impact systems including <em className="text-slate-300">Mr Compounder</em> (silent OPD clinic management SaaS operating on 2G), <em className="text-slate-300">HairViz</em> (photo-to-3D AI MedTech simulator), and high-conversion commercial platforms across India and Bangladesh.
      </span>
    ),
  },
  {
    id: "whatsapp-ai-agents",
    category: "Autonomous Systems",
    question: "Can Stova Media build autonomous AI agents for WhatsApp and websites?",
    answer: (
      <span>
        Yes. We build intelligent WhatsApp and web-based AI agents connected to official Meta APIs, CRMs (HubSpot, Zoho), Google Sheets, and custom PostgreSQL databases. Our AI agents handle customer inquiries 24/7, recommend products, collect customer information, and automatically book consultation appointments.
      </span>
    ),
  },
  {
    id: "custom-vs-wordpress",
    category: "Engineering Standards",
    question: "Why should businesses choose Stova Media over traditional Kolkata IT agencies?",
    answer: (
      <span>
        Four decisive reasons: <strong className="text-slate-100 font-medium">1) 100% In-House Engineering</strong> (zero outsourcing or junior handoffs), <strong className="text-slate-100 font-medium">2) Zero Templates</strong> (every line of code is custom-built for maximum speed and conversion), <strong className="text-slate-100 font-medium">3) Transparent Milestone Pricing</strong> (fixed outcomes with no surprise hourly bills), and <strong className="text-slate-100 font-medium">4) Complete Code and IP Ownership</strong> (you own your git repository and infrastructure 100%).
      </span>
    ),
  },
  {
    id: "project-timeline-pricing",
    category: "Delivery Timeline",
    question: "How quickly does Stova Media deliver production systems?",
    answer: (
      <span>
        Growth websites and AI landing pages are delivered in <strong className="text-slate-100 font-medium">10–14 days</strong>, custom e-commerce and AI storefronts in <strong className="text-slate-100 font-medium">2–3 weeks</strong>, and bespoke SaaS platforms in <strong className="text-slate-100 font-medium">3–6 week sprints</strong>. We offer transparent, milestone-based fixed quotes starting with our ₹15,999 Local Growth Package up to custom enterprise architectures.
      </span>
    ),
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#07080C] text-white border-b border-white/[0.08] relative overflow-hidden"
    >
      {/* Premium Background Blur Color Effect */}
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-l from-violet-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-violet-300 text-xs font-medium mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span>Frequently asked questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-4">
            Everything You Need to Know
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            Direct answers on architecture, intellectual property ownership, and development timelines.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-14">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-white/[0.08] hover:border-white/20 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-400"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="space-y-1 pr-2">
                    <span className="text-[11px] font-mono text-violet-400 block">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-medium text-slate-100 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center transition-transform duration-200 text-slate-300 ${
                      isOpen ? "rotate-180 bg-violet-600/30 text-violet-300 border-violet-500/40" : ""
                    }`}
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-6 sm:px-7 pb-6 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.04] font-normal"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Box */}
        <div className="rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
          <div className="text-left space-y-1">
            <h4 className="text-sm sm:text-base font-medium text-slate-200">
              Have a specific question about your software or AI project?
            </h4>
            <p className="text-xs text-slate-400">
              Speak directly with our Lead Architect in Kolkata — get answers in minutes.
            </p>
          </div>

          <MagneticElement strength={0.2}>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-violet-600/30 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              <span>Book consultation</span>
              <ArrowRight size={14} />
            </button>
          </MagneticElement>
        </div>
      </div>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
