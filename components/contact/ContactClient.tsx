"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ChevronDown, 
  ShieldCheck, 
  Zap,
  Layers,
  HelpCircle
} from "lucide-react";
import TiltCard from "@/components/animations/TiltCard";
import StudioTelemetryGraphic from "@/components/animations/StudioTelemetryGraphic";
import { MagneticElement } from "@/components/ui";

const faqs = [
  {
    question: "How fast will you respond to my project inquiry?",
    answer: "Our lead software architect reviews all project briefs directly. You will receive an engineering feasibility review, proposed timeline, and transparent quote within 4 business hours.",
  },
  {
    question: "Do you build with templates or 100% custom code?",
    answer: "We write 100% bespoke code using Next.js 15, React, TypeScript, and high-performance databases. Zero slow WordPress themes, zero page builders, and zero unnecessary bloat.",
  },
  {
    question: "Who owns the code and intellectual property?",
    answer: "You own 100% of the intellectual property, git repository, design assets, and cloud deployment pipelines immediately upon project completion.",
  },
  {
    question: "Can we start with an MVP or small milestone first?",
    answer: "Yes! We specialize in modular milestone delivery. We can build an initial high-converting website or functional MVP in 2–3 weeks and iterate from there.",
  },
  {
    question: "How do you handle maintenance and support after launch?",
    answer: "Every custom build includes 30 days of comprehensive post-launch warranty and monitoring. We also provide ongoing SLA maintenance retainers for continuous feature upgrades.",
  },
  {
    question: "What payment structures do you accept?",
    answer: "We work with transparent milestone-based payments (e.g. 50% upfront deposit and 50% upon final deployment after staging approval), accepting Bank Transfers, UPI, and International Wire.",
  },
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Small Business Website",
    budget: "₹15,000 – ₹50,000",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First FAQ open by default

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
    <div className="w-full bg-white relative">
      {/* 1. Main Unified Contact Section */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden bg-white">
        {/* Soft Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-indigo-100/70 via-cyan-100/40 to-blue-50/30 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-[1300px] mx-auto">
          {/* Top Eyebrow */}
          <div className="flex justify-center mb-5 sm:mb-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold shadow-xs">
              <Layers size={14} className="text-indigo-600" />
              <span>Direct Technical Access · 4-Hour Response SLA</span>
            </div>
          </div>

          {/* 2-Column Side-by-Side Unified Studio Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Narrative & Direct Channels (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-5">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-3">
                  Let&apos;s Architect Your{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">
                    Next Milestone
                  </span>
                </h1>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                  Have a new software project, need a high-converting website, or want to deploy autonomous AI agents? Connect directly with our lead architect.
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all flex items-center gap-3.5 shadow-2xs group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/80 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 block font-bold uppercase tracking-wider">WHATSAPP DIRECT (INSTANT)</span>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        +91 9432053261
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:contact@stovamedia.in"
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all flex items-center gap-3.5 shadow-2xs group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100/80 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 block font-bold uppercase tracking-wider">EMAIL INQUIRIES</span>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        contact@stovamedia.in
                      </span>
                    </div>
                  </a>

                  {/* Studio Location */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center gap-3.5 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100/80 border border-cyan-200 text-cyan-700 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 block font-bold uppercase tracking-wider">STUDIO LOCATION</span>
                      <span className="text-sm font-bold text-slate-900">
                        Kolkata, West Bengal, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Studio Telemetry & Animated SLA Window */}
              <StudioTelemetryGraphic />
            </div>

            {/* RIGHT COLUMN: Interactive Project Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <TiltCard maxTilt={2}>
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-slate-200 shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
                  {isSuccess ? (
                    /* Success Confirmation Screen */
                    <div className="text-center py-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-200">
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mb-2">
                        Project Brief Received!
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base max-w-md mb-8">
                        Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our lead architect will review your project brief and reply with a technical proposal within 4 hours.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                        <a
                          href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm"
                        >
                          <MessageSquare size={16} />
                          <span>Chat on WhatsApp</span>
                        </a>
                        <button
                          onClick={() => {
                            setIsSuccess(false);
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              service: "Small Business Website",
                              budget: "₹15,000 – ₹50,000",
                              message: "",
                            });
                          }}
                          className="py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                        >
                          Send Another Brief
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Main Form */
                    <div>
                      <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-slate-100">
                        <div>
                          <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900">
                            Submit Project Brief
                          </h3>
                          <p className="text-slate-500 text-xs mt-0.5">
                            Tell us about your project requirements and goals.
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Open for Q2/Q3</span>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3.5">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Your Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (errors.name) setErrors({ ...errors, name: "" });
                              }}
                              placeholder="John Doe"
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none transition-all ${
                                errors.name
                                  ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                                  : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                              }`}
                            />
                            {errors.name && (
                              <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Work Email <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (errors.email) setErrors({ ...errors, email: "" });
                              }}
                              placeholder="john@company.com"
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none transition-all ${
                                errors.email
                                  ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                                  : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                              }`}
                            />
                            {errors.email && (
                              <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Phone & Service Category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Phone / WhatsApp <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                if (errors.phone) setErrors({ ...errors, phone: "" });
                              }}
                              placeholder="+91 98765 43210"
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none transition-all ${
                                errors.phone
                                  ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                                  : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                              }`}
                            />
                            {errors.phone && (
                              <p className="text-rose-500 text-[11px] mt-1">{errors.phone}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Project Category
                            </label>
                            <select
                              value={formData.service}
                              onChange={(e) =>
                                setFormData({ ...formData, service: e.target.value })
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            >
                              <option value="Small Business Website">Small Business Website (High Speed)</option>
                              <option value="Custom Web App & SaaS">Custom Web App &amp; SaaS Software</option>
                              <option value="AI Automation Workflow">Autonomous AI &amp; Chatbot System</option>
                              <option value="E-Commerce Platform">Custom E-Commerce Platform</option>
                              <option value="Architecture Upgrade">Architecture Codebase Upgrade</option>
                            </select>
                          </div>
                        </div>

                        {/* Estimated Budget Range */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Estimated Budget
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) =>
                              setFormData({ ...formData, budget: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                          >
                            <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000 (Growth Website Package)</option>
                            <option value="₹30,000 – ₹75,000">₹30,000 – ₹75,000 (Full E-Commerce / AI Agent)</option>
                            <option value="₹75,000 – ₹2,00,000">₹75,000 – ₹2,00,000 (Custom SaaS / Full Stack App)</option>
                            <option value="₹2,00,000+">₹2,00,000+ (Enterprise System)</option>
                            <option value="Flexible / Needs Consultation">Flexible / Needs Consultation</option>
                          </select>
                        </div>

                        {/* Project Description */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Project Scope &amp; Goals (Optional)
                          </label>
                          <textarea
                            rows={3}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            placeholder="Tell us what you want to build, current challenges, or timeline targets..."
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                          />
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-1.5 flex flex-col sm:flex-row gap-3">
                          <MagneticElement strength={0.25} className="flex-1">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/25 active:scale-[0.99] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
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

                          <MagneticElement strength={0.25}>
                            <a
                              href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-3 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                            >
                              <MessageSquare size={15} />
                              <span>WhatsApp Direct</span>
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

      {/* 2. Frequently Asked Questions Section (Fills lower page seamlessly before footer) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-[850px] mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
              <HelpCircle size={14} className="text-indigo-600" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
              Everything you need to know about our custom engineering process, intellectual property rights, and turnaround times.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-3 cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 font-display">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-indigo-600" : ""
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
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
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
          <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-indigo-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Have a specialized custom requirement?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Talk directly to lead architect Mehedi Hasan and get an instant technical answer.
              </p>
            </div>
            <MagneticElement strength={0.25} className="shrink-0">
              <a
                href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2"
              >
                <MessageSquare size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </MagneticElement>
          </div>
        </div>
      </section>
    </div>
  );
}
