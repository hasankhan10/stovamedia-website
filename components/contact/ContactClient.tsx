"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ChevronDown, 
  Layers,
  HelpCircle
} from "lucide-react";
import TiltCard from "@/components/animations/TiltCard";
import { MagneticElement } from "@/components/ui";

interface ContactFAQ {
  question: string;
  answer: string;
}

const faqs: ContactFAQ[] = [
  {
    question: "How fast will you respond to my project inquiry?",
    answer: "Our lead software architect reviews all project briefs directly. You will receive an engineering feasibility review, proposed timeline, and transparent milestone quote within 4 business hours.",
  },
  {
    question: "Do you build with templates or 100% custom code?",
    answer: "We write 100% bespoke code using Next.js 15, React 19, TypeScript, and high-performance databases. Zero slow WordPress themes, zero page builders, and zero unnecessary bloat.",
  },
  {
    question: "Who owns the code and intellectual property?",
    answer: "You own 100% of the intellectual property, git repository, design assets, and cloud deployment pipelines immediately upon project milestone completion.",
  },
  {
    question: "Can we start with an MVP or small milestone first?",
    answer: "Yes. We specialize in modular milestone delivery. We can build an initial high-converting website or functional MVP in 2–3 weeks and systematically iterate from there.",
  },
  {
    question: "How do you handle maintenance and support after launch?",
    answer: "Every custom build includes 30 days of comprehensive post-launch warranty, error monitoring, and performance tuning. We also provide ongoing SLA maintenance retainers for continuous feature upgrades.",
  },
  {
    question: "What payment structures do you accept?",
    answer: "We work with transparent milestone-based payments (e.g. 50% upfront deposit to begin architecture and 50% only upon your final verification and staging approval), accepting Bank Transfers, UPI, and International Wire.",
  },
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Growth Website Architecture",
    budget: "₹15,000 – ₹50,000",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Please enter your phone or WhatsApp number";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(true);
      }
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Stova Media! I'd like to discuss a software project.\nName: ${formData.name || "Client"}\nService: ${formData.service}\nBudget Range: ${formData.budget}`
  );

  return (
    <div className="w-full bg-[#07080C] text-white relative">
      {/* 1. Main Unified Contact Section */}
      <section className="relative pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden border-b border-white/[0.08]">
        {/* 🌌 Celestial Radiant Dome Glow Effect */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[480px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139, 92, 246, 0.35) 0%, rgba(79, 70, 229, 0.2) 45%, transparent 75%)',
            filter: 'blur(50px)'
          }}
        />

        {/* 🔮 Bottom Ambient Glow Blur Effect */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[850px] h-[280px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(139, 92, 246, 0.4) 0%, rgba(99, 102, 241, 0.2) 45%, transparent 75%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Precision Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-[1300px] mx-auto relative z-10">
          {/* Top Eyebrow */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <Layers size={14} className="text-violet-400" />
              <span>Direct Technical Access · 4-Hour Response SLA</span>
            </div>
          </div>

          {/* 2-Column Side-by-Side Unified Studio Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Narrative & Direct Channels (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.04] mb-4">
                  Let&apos;s Architect Your Next Milestone
                </h1>
                <p className="text-slate-400 text-base sm:text-lg font-normal leading-relaxed mb-6">
                  Have a new custom software project, need a high-converting web platform, or want to deploy autonomous AI agents? Connect directly with our Lead Architect.
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all flex items-center gap-3.5 group shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase tracking-wider">WHATSAPP DIRECT (INSTANT)</span>
                      <span className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                        Connect with Studio Architect
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:stovamedia@gmail.com"
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/40 hover:bg-white/[0.05] transition-all flex items-center gap-3.5 group shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase tracking-wider">EMAIL INQUIRIES</span>
                      <span className="text-sm font-medium text-slate-200 group-hover:text-violet-300 transition-colors">
                        stovamedia@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* Studio Location */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase tracking-wider">STUDIO LOCATION</span>
                      <span className="text-sm font-medium text-slate-200">
                        Kolkata, West Bengal, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Project Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <TiltCard maxTilt={2}>
                <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 border border-white/[0.08] backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
                  {isSuccess ? (
                    /* Success Confirmation Screen */
                    <div className="text-center py-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20">
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-medium text-slate-100 font-display mb-2">
                        Project Brief Received!
                      </h3>
                      <p className="text-slate-400 text-sm sm:text-base max-w-md mb-8">
                        Thank you, <span className="font-semibold text-slate-200">{formData.name}</span>. Our Lead Architect will review your technical brief and reply with a proposal within 4 hours.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                        <a
                          href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-[0_0_24px_rgba(139,92,246,0.35)]"
                        >
                          <MessageSquare size={16} />
                          <span>Direct WhatsApp</span>
                        </a>
                        <button
                          onClick={() => {
                            setIsSuccess(false);
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              service: "Growth Website Architecture",
                              budget: "₹15,000 – ₹50,000",
                              message: "",
                            });
                          }}
                          className="py-3 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 font-medium text-sm transition-colors cursor-pointer"
                        >
                          Send Another Brief
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Main Form */
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                        <div>
                          <h2 className="text-lg sm:text-xl font-medium text-slate-100">
                            Submit Project Brief
                          </h2>
                          <p className="text-slate-400 text-xs mt-0.5">
                            Tell us about your requirements, timeline, and architectural targets.
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Open for Q2/Q3</span>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                              Your Name <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (errors.name) setErrors({ ...errors, name: "" });
                              }}
                              placeholder="John Doe"
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-100 bg-white/[0.03] placeholder-slate-500 focus:outline-none transition-all ${
                                errors.name
                                  ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                                  : "border-white/10 focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50"
                              }`}
                            />
                            {errors.name && (
                              <p className="text-rose-400 text-[11px] mt-1">{errors.name}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                              Work Email <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (errors.email) setErrors({ ...errors, email: "" });
                              }}
                              placeholder="john@company.com"
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-100 bg-white/[0.03] placeholder-slate-500 focus:outline-none transition-all ${
                                errors.email
                                  ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                                  : "border-white/10 focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50"
                              }`}
                            />
                            {errors.email && (
                              <p className="text-rose-400 text-[11px] mt-1">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Phone & Service Category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                              Phone / WhatsApp <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                if (errors.phone) setErrors({ ...errors, phone: "" });
                              }}
                              placeholder="+91 98765 43210"
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-100 bg-white/[0.03] placeholder-slate-500 focus:outline-none transition-all ${
                                errors.phone
                                  ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                                  : "border-white/10 focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50"
                              }`}
                            />
                            {errors.phone && (
                              <p className="text-rose-400 text-[11px] mt-1">{errors.phone}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                              Architecture Tier
                            </label>
                            <select
                              value={formData.service}
                              onChange={(e) =>
                                setFormData({ ...formData, service: e.target.value })
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 text-sm text-slate-200 bg-[#0d0f17] focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50 transition-all cursor-pointer"
                            >
                              <option value="Growth Website Architecture">Growth Website Architecture (Sub-second)</option>
                              <option value="Custom Web App & SaaS">Enterprise SaaS &amp; Custom Web Platform</option>
                              <option value="AI Automation Workflow">Autonomous AI Agent &amp; Chatbot System</option>
                              <option value="E-Commerce Platform">High-Converting E-Commerce Storefront</option>
                              <option value="Architecture Upgrade">Architecture Codebase Optimization</option>
                            </select>
                          </div>
                        </div>

                        {/* Estimated Budget Range */}
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Estimated Investment Scope
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) =>
                              setFormData({ ...formData, budget: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 text-sm text-slate-200 bg-[#0d0f17] focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50 transition-all cursor-pointer"
                          >
                            <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000 (Growth Website Scope)</option>
                            <option value="₹30,000 – ₹75,000">₹30,000 – ₹75,000 (E-Commerce / AI Agent Scope)</option>
                            <option value="₹75,000 – ₹2,00,000">₹75,000 – ₹2,00,000 (Custom SaaS / Full Stack MVP)</option>
                            <option value="₹2,00,000+">₹2,00,000+ (Enterprise Architecture)</option>
                            <option value="Flexible / Needs Consultation">Flexible / Direct Architecture Review</option>
                          </select>
                        </div>

                        {/* Project Description */}
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Project Objectives &amp; Requirements (Optional)
                          </label>
                          <textarea
                            rows={3}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            placeholder="Describe your current system, target launch date, and key features..."
                            className="w-full px-3.5 py-2 rounded-xl border border-white/10 text-sm text-slate-100 bg-white/[0.03] placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none"
                          />
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                          <MagneticElement strength={0.2} className="flex-1">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-[0_0_24px_rgba(139,92,246,0.35)] active:scale-[0.99] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <>
                                  <Send size={15} />
                                  <span>Submit Project Inquiry</span>
                                </>
                              )}
                            </button>
                          </MagneticElement>

                          <MagneticElement strength={0.2}>
                            <a
                              href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-3 px-5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 hover:text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                            >
                              <MessageSquare size={15} />
                              <span>WhatsApp</span>
                            </a>
                          </MagneticElement>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Frequently Asked Questions Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 border-b border-white/[0.08] relative">
        <div className="max-w-[850px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium backdrop-blur-xl mb-3">
              <HelpCircle size={14} className="text-violet-400" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
              Everything you need to know about our custom engineering process, intellectual property rights, and turnaround times.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white/[0.08] overflow-hidden bg-white/[0.02] backdrop-blur-xl transition-colors hover:border-white/15"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-3 cursor-pointer"
                  >
                    <span className="font-medium text-sm sm:text-base text-slate-200">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-violet-400" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.06] bg-white/[0.01]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Consultation Trigger Strip */}
          <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.36)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-slate-100">
                Have a specialized custom requirement?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Talk directly to Lead Architect Mehedi Hasan and get an instant technical evaluation.
              </p>
            </div>
            <MagneticElement strength={0.2} className="shrink-0">
              <a
                href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center gap-2"
              >
                <MessageSquare size={14} />
                <span>Direct Inquiry</span>
              </a>
            </MagneticElement>
          </div>
        </div>
      </section>
    </div>
  );
}
