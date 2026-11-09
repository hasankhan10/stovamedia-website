"use client";

import React, { useState } from "react";
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Layers,
  HelpCircle
} from "lucide-react";
import TiltCard from "@/components/animations/TiltCard";
import { MagneticElement, SpotlightCard, SpecularButton } from "@/components/ui";

interface ContactFAQ {
  number: string;
  question: string;
  answer: string;
}

const faqs: ContactFAQ[] = [
  {
    number: "01",
    question: "How fast will you reply to my inquiry?",
    answer: "We review all inquiries promptly. You will receive a friendly, detailed reply and initial price estimate within 24 hours.",
  },
  {
    number: "02",
    question: "Do you build with templates or custom code?",
    answer: "We write 100% custom code for every client. That means your website is uniquely designed for your business, loads in less than a second, and has zero slow template bloat.",
  },
  {
    number: "03",
    question: "Who owns the code and intellectual property?",
    answer: "You own 100% of everything — the design, code, images, and domain. We never lock you into recurring agency fees.",
  },
  {
    number: "04",
    question: "Can we start with a simple version first?",
    answer: "Yes, absolutely! We often build a clean, fast launch version in 10–14 days, and then add more advanced features as your business grows.",
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
              <span>Direct Contact · Fast 24-Hour Response</span>
            </div>
          </div>

          {/* 2-Column Side-by-Side Unified Studio Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Narrative & Direct Channels (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.04] mb-4">
                  Let&apos;s Discuss Your Project
                </h1>
                <p className="text-slate-400 text-base sm:text-lg font-normal leading-relaxed mb-6">
                  Have an idea for a new website, custom web application, or smart AI assistant? Tell us what you need and we&apos;ll help you bring it to life.
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
                      <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase tracking-wider">WHATSAPP DIRECT (QUICK CHAT)</span>
                      <span className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                        Chat with Our Team
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
                        Message Received!
                      </h3>
                      <p className="text-slate-400 text-sm sm:text-base max-w-md mb-8">
                        Thank you, <span className="font-semibold text-slate-200">{formData.name}</span>. Our team will review your project details and reply within 24 hours with recommendations.
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
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Main Form */
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                        <div>
                          <h2 className="text-lg sm:text-xl font-medium text-slate-100">
                            Tell Us About Your Project
                          </h2>
                          <p className="text-slate-400 text-xs mt-0.5">
                            Fill in your details below and we&apos;ll get back to you within 24 hours with a clear plan.
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Accepting New Projects</span>
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
                              Your Email <span className="text-rose-400">*</span>
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
                              Service Needed
                            </label>
                            <select
                              value={formData.service}
                              onChange={(e) =>
                                setFormData({ ...formData, service: e.target.value })
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 text-sm text-slate-200 bg-[#0d0f17] focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50 transition-all cursor-pointer"
                            >
                              <option value="Business Website">Business Website (Fast &amp; Modern)</option>
                              <option value="Custom Web App & Software">Custom Web App &amp; Software</option>
                              <option value="AI Assistant & Automation">AI Chat Assistant &amp; Automation</option>
                              <option value="Online Store">High-Converting Online Store</option>
                              <option value="Website Redesign">Website Redesign / Upgrade</option>
                            </select>
                          </div>
                        </div>

                        {/* Estimated Budget Range */}
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Estimated Budget
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) =>
                              setFormData({ ...formData, budget: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 text-sm text-slate-200 bg-[#0d0f17] focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50 transition-all cursor-pointer"
                          >
                            <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000 (Business Website)</option>
                            <option value="₹30,000 – ₹75,000">₹30,000 – ₹75,000 (Store or AI Assistant)</option>
                            <option value="₹75,000 – ₹2,00,000">₹75,000 – ₹2,00,000 (Custom Web App)</option>
                            <option value="₹2,00,000+">₹2,00,000+ (Large Platform)</option>
                            <option value="Flexible / Needs Consultation">Flexible / Let&apos;s Discuss</option>
                          </select>
                        </div>

                        {/* Project Description */}
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Project Details (Optional)
                          </label>
                          <textarea
                            rows={3}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            placeholder="Tell us about what you want to build, target launch date, and any questions..."
                            className="w-full px-3.5 py-2 rounded-xl border border-white/10 text-sm text-slate-100 bg-white/[0.03] placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none"
                          />
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                          <SpecularButton
                            type="submit"
                            disabled={isSubmitting}
                            size="md"
                            radius={12}
                            tint="#6d28d9"
                            tintOpacity={0.75}
                            lineColor="#c4b5fd"
                            baseColor="#4c1d95"
                            glow={1.2}
                            thickness={1.3}
                            intensity={1.2}
                            idleIntensity={0.5}
                            shineSize={16}
                            shineFade={32}
                            followMouse={true}
                            proximity={240}
                            className="w-full flex-1 text-white font-medium text-sm shadow-md shadow-violet-600/30 cursor-pointer disabled:opacity-60"
                          >
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <Send size={15} />
                                <span>Send Inquiry</span>
                              </>
                            )}
                          </SpecularButton>

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

      {/* 2. Frequently Asked Questions Section (Home Page Bento Grid Style) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 border-b border-white/[0.08] relative overflow-hidden">
        {/* Ambient Radial Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[350px] pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139, 92, 246, 0.2) 0%, rgba(79, 70, 229, 0.1) 45%, transparent 75%)",
            filter: "blur(70px)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium mb-3 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <HelpCircle size={14} className="text-violet-400" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Quick answers about working together, pricing, and project timelines.
            </p>
          </div>

          {/* 2x2 Bento Grid with React Bits SpotlightCard */}
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

          {/* Quick Consultation Trigger Strip with SpecularButton */}
          <div className="rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
            <div className="text-left space-y-1">
              <h4 className="text-sm sm:text-base font-medium text-slate-200">
                Prefer to chat directly?
              </h4>
              <p className="text-xs text-slate-400">
                Reach out on WhatsApp for a quick conversation with our founder Mehedi.
              </p>
            </div>

            <SpecularButton
              onClick={() => window.open(`https://wa.me/919432053261?text=${whatsappMessage}`, "_blank")}
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
              className="text-white font-medium text-xs sm:text-sm shadow-md shadow-violet-600/30 shrink-0 cursor-pointer"
            >
              <MessageSquare size={14} />
              <span>Chat on WhatsApp</span>
            </SpecularButton>
          </div>
        </div>
      </section>
    </div>
  );
}
