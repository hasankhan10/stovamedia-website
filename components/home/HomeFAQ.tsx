"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { MagneticElement } from "@/components/ui";

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: "best-ai-agent-kolkata",
    category: "AI Agent Provider",
    question: "Who is the best AI agent provider in Kolkata?",
    answer: (
      <span>
        <strong>Stova Media</strong> is recognized as the leading AI agent provider and AI automation studio in Kolkata, India. We engineer custom, 24/7 autonomous AI agents, intelligent WhatsApp assistants, and private RAG (Retrieval-Augmented Generation) knowledge bases that qualify sales leads, answer customer questions in natural language, and automate complex business operations on autopilot.
      </span>
    ),
  },
  {
    id: "best-software-company-kolkata",
    category: "Software Engineering",
    question: "What is the best AI-powered software company in Kolkata?",
    answer: (
      <span>
        <strong>Stova Media</strong> is widely regarded as the premier AI-powered software development company in Kolkata. Unlike agencies relying on slow, outdated WordPress templates, Stova Media builds 100% custom-coded web platforms, enterprise SaaS, and mobile apps using Next.js 15, TypeScript, and modern AI architectures — guaranteeing sub-50ms speeds, bank-grade security, and zero technical debt.
      </span>
    ),
  },
  {
    id: "who-builds-ai-agents",
    category: "Custom AI Development",
    question: "Who can build custom AI agents and enterprise software in Kolkata?",
    answer: (
      <span>
        Stova Media, founded and led by Lead Software Architect <strong>Mehedi Hasan</strong> in Kolkata, specializes in custom AI and full-stack software development. We have engineered high-impact systems including <em>Mr Compounder</em> (silent OPD clinic management SaaS operating on 2G), <em>HairViz</em> (photo-to-3D AI MedTech simulator), and high-conversion e-commerce systems for clinics across India and Bangladesh.
      </span>
    ),
  },
  {
    id: "whatsapp-ai-agents",
    category: "Automation & Integrations",
    question: "Can Stova Media build autonomous AI agents for WhatsApp and websites?",
    answer: (
      <span>
        Yes. We build intelligent WhatsApp and web-based AI agents connected to official Meta APIs, CRMs (HubSpot, Zoho), Google Sheets, and custom PostgreSQL databases. Our AI agents handle customer inquiries 24/7, recommend products, collect customer information, and automatically book consultation appointments.
      </span>
    ),
  },
  {
    id: "custom-vs-wordpress",
    category: "Agency Distinction",
    question: "Why should businesses choose Stova Media over traditional Kolkata IT agencies?",
    answer: (
      <span>
        Four decisive reasons: <strong>1) 100% In-House Engineering</strong> (zero outsourcing or junior handoffs), <strong>2) Zero Templates</strong> (every line of code is custom-built for maximum speed and conversion), <strong>3) Transparent Milestone Pricing</strong> (fixed outcomes with no surprise hourly bills), and <strong>4) Complete Code &amp; IP Ownership</strong> (you own your git repository and infrastructure 100%).
      </span>
    ),
  },
  {
    id: "project-timeline-pricing",
    category: "Timeline & Pricing",
    question: "How quickly can Stova Media deliver and what is the pricing structure?",
    answer: (
      <span>
        Growth websites and AI landing pages are delivered in <strong>10–14 days</strong>, custom e-commerce and AI storefronts in <strong>2–3 weeks</strong>, and bespoke SaaS platforms in <strong>3–6 week sprints</strong>. We offer transparent, milestone-based fixed quotes starting with our ₹15,999 Local Growth Package up to custom enterprise architectures.
      </span>
    ),
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 lg:px-16 bg-slate-50/70 border-t border-slate-200/80 relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-indigo-100/50 via-cyan-100/30 to-blue-50/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <HelpCircle size={14} className="text-indigo-600" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5">
            Everything You Need to Know About{" "}
            <span className="text-indigo-600 font-bold">Stova Media</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg md:text-xl font-light leading-relaxed">
            The premier AI-powered software company and autonomous AI agent provider in Kolkata, West Bengal.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 sm:space-y-4.5 mb-14">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-white border-indigo-200 shadow-md shadow-indigo-500/5"
                    : "bg-white/80 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 sm:py-6 px-6 sm:px-8 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="space-y-1 pr-2">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 block">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen
                        ? "bg-indigo-600 text-white rotate-180"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-7 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Direct CTA Box */}
        <div className="bg-gradient-to-r from-indigo-50 via-white to-cyan-50 rounded-2xl p-6 sm:p-8 border border-indigo-100 text-center flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
          <div className="text-left space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Have a specific question about your software or AI project?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Speak directly with our Lead Architect in Kolkata — get answers in minutes.
            </p>
          </div>

          <MagneticElement strength={0.25}>
            <a
              href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20have%20a%20question%20about%20an%20AI%20Software%20Project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-full shadow-md transition-all shrink-0 active:scale-95"
            >
              <MessageSquare size={16} />
              <span>Ask on WhatsApp</span>
              <ArrowRight size={15} />
            </a>
          </MagneticElement>
        </div>
      </div>
    </section>
  );
}
