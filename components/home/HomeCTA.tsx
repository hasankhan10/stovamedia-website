"use client";

import React, { useState } from "react";
import { ArrowRight, Clock, ShieldCheck, Cpu } from "lucide-react";
import { AppointmentModal, MagneticElement, SpecularButton } from "@/components/ui";

export default function HomeCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="contact" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#07080C] text-white relative overflow-hidden border-t border-white/[0.08]">
      {/* 🌌 Radiant Ambient Dome Glow Effect (Matching the reference screenshot) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] h-[450px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.25) 0%, rgba(79, 70, 229, 0.15) 45%, transparent 75%)',
          filter: 'blur(100px)'
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="rounded-3xl border border-white/10 hover:border-violet-500/30 bg-gradient-to-b from-white/[0.06] to-white/[0.01] backdrop-blur-2xl p-8 sm:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-300">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium mb-6 backdrop-blur-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Accepting select client builds</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-4">
            Ready to Scale Your Software?
          </h2>

          <p className="text-slate-400 text-base sm:text-lg font-normal max-w-xl mx-auto leading-relaxed mb-9">
            Consult directly with our lead technical architect and receive a full feasibility roadmap within 4 hours.
          </p>

          {/* Action Buttons: Specular Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <SpecularButton
              onClick={() => setModalOpen(true)}
              size="md"
              radius={12}
              tint="#6d28d9"
              tintOpacity={0.7}
              lineColor="#c4b5fd"
              baseColor="#4c1d95"
              glow={1.2}
              thickness={1.5}
              intensity={1.2}
              idleIntensity={0.5}
              shineSize={14}
              shineFade={32}
              followMouse={true}
              proximity={320}
              className="w-full sm:w-auto text-white font-medium text-sm shadow-[0_0_28px_rgba(139,92,246,0.4)]"
            >
              <span>Book strategy consultation</span>
              <ArrowRight size={16} />
            </SpecularButton>

            <MagneticElement strength={0.2}>
              <a
                href="#work"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 font-medium text-sm transition-colors duration-150 flex items-center justify-center gap-2 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-white/40"
              >
                <span>Explore client case studies</span>
              </a>
            </MagneticElement>
          </div>

          {/* Trust Telemetry Points */}
          <div className="pt-8 border-t border-white/[0.08] flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-violet-400" />
              <span>4-hour feasibility response</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>100% Git code ownership</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu size={14} className="text-indigo-400" />
              <span>Zero third-party templates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
