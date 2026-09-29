"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, MessageSquare, Calendar, Sparkles } from "lucide-react";
import { MagneticElement } from "./MagneticElement";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  defaultService = "General Inquiry",
}: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    preferredDate: "",
    preferredTime: "morning",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync default service when opened
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service: defaultService || "General Inquiry",
      }));
      setIsSuccess(false);
      setErrors({});
    }
  }, [isOpen, defaultService]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Please enter your phone/WhatsApp number";
    }
    if (!formData.preferredDate) {
      errs.preferredDate = "Please choose a preferred date";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
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
    `Hello Stova Media! I'd like to book a project consultation.\nName: ${formData.name || "Client"}\nService: ${formData.service}\nPreferred Date: ${formData.preferredDate || "Earliest available"}`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-[0_25px_70px_rgba(15,23,42,0.18)] border border-slate-200 overflow-hidden z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              /* Success State */
              <div className="p-8 sm:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-200">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mb-2">
                  Consultation Request Received!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-md mb-8">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our lead architect will review your project requirements and confirm the meeting slot within 4 hours.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <a
                    href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20"
                  >
                    <MessageSquare size={16} />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-2">
                  <Sparkles size={15} />
                  <span>Free Architecture &amp; Feasibility Strategy</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight mb-2">
                  Book a Project Consultation
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-6">
                  Select a preferred time and tell us about your goals. No sales pressure — direct engineer consultation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
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
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
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

                  {/* Phone & Service Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
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
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Project Category
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      >
                        <option value="Small Business Website">Small Business Website (High Speed)</option>
                        <option value="Custom Software / SaaS">Custom Web App &amp; Enterprise Software</option>
                        <option value="AI Automation Workflow">AI Automation &amp; Intelligent Agent</option>
                        <option value="E-Commerce Platform">Custom E-Commerce Platform</option>
                        <option value="General Inquiry">Other Consultation</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date & Time Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Preferred Date <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.preferredDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => {
                            setFormData({ ...formData, preferredDate: e.target.value });
                            if (errors.preferredDate) setErrors({ ...errors, preferredDate: "" });
                          }}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                            errors.preferredDate
                              ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                              : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                          }`}
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-rose-500 text-[11px] mt-1">{errors.preferredDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredTime: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      >
                        <option value="morning">Morning (10:00 AM – 1:00 PM)</option>
                        <option value="afternoon">Afternoon (1:00 PM – 5:00 PM)</option>
                        <option value="evening">Evening (5:00 PM – 8:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Brief */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Brief Description (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us briefly what you want to build or achieve..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                    />
                  </div>

                  {/* Submit & WhatsApp Button Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <MagneticElement strength={0.25} className="flex-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/25 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Calendar size={16} />
                            <span>Confirm Booking</span>
                          </>
                        )}
                      </button>
                    </MagneticElement>

                    <MagneticElement strength={0.25}>
                      <a
                        href={`https://wa.me/919432053261?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs uppercase tracking-wider transition-all"
                      >
                        <MessageSquare size={15} />
                        <span>WhatsApp Direct</span>
                      </a>
                    </MagneticElement>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
