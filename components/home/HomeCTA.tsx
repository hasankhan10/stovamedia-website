"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MessageSquare, ShieldCheck, Sparkles, Clock, ArrowRight } from "lucide-react";
import { AppointmentModal, MagneticElement } from "@/components/ui";

export default function HomeCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="contact" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 lg:px-16 bg-white relative overflow-hidden">
      {/* Background Soft Ambient Light Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-indigo-100/70 via-cyan-100/50 to-blue-50/30 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-b from-white to-slate-50/90 rounded-2xl sm:rounded-[36px] p-6 sm:p-12 md:p-16 border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] text-center flex flex-col items-center overflow-hidden"
        >
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Currently Accepting New Projects for Q2/Q3</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-3xl mb-5 sm:mb-6">
            Ready to Build Software That{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">
              Scales Your Business?
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light max-w-2xl leading-relaxed mb-8 sm:mb-10">
            No endless sales calls, no junior handoffs. Talk directly with our lead technical architect and get a crystal-clear execution roadmap within 4 hours.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-12">
            <MagneticElement strength={0.3}>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-8 sm:px-9 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_30px_rgba(79,70,229,0.4)] transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
              >
                <Calendar size={18} />
                <span>Book Strategy Consultation</span>
                <ArrowRight size={18} />
              </button>
            </MagneticElement>

            <MagneticElement strength={0.3}>
              <a
                href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 sm:px-8 py-4 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-700 font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </MagneticElement>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 sm:pt-8 border-t border-slate-200/80 w-full flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-indigo-600" />
              <span>4-Hour Feasibility Response</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-emerald-600" />
              <span>100% IP Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-amber-500" />
              <span>100% Custom Architecture</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Appointment / Booking Modal */}
      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
