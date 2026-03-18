"use client";

import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button, MagneticElement, SectionLabel } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center p-10 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05),transparent_70%)] pointer-events-none" />
      
      {/* Outlined 404 Text */}
      <h1 className="font-display text-[clamp(120px,20vw,320px)] leading-none select-none pointer-events-none animate-float opacity-[0.15] text-transparent stroke-gold"
          style={{ WebkitTextStroke: "2px var(--gold)" }}>
        404
      </h1>

      {/* Narrative Section */}
      <div className="relative z-10 text-center flex flex-col items-center -mt-16 md:-mt-32">
        <SectionLabel className="justify-center mb-8">System Error</SectionLabel>
        <p className="font-display italic text-2xl md:text-4xl text-cream max-w-lg mb-12 leading-tight">
          This page doesn&apos;t exist. <br />
          <span className="text-gold">But your next project can.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          <MagneticElement>
            <Button variant="primary" href="/" className="px-10">
              Return Home
            </Button>
          </MagneticElement>
          <MagneticElement>
            <Button variant="outline" href="/work" className="px-10">
              See Our Work
            </Button>
          </MagneticElement>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-20 flex items-center gap-4 text-dim text-[10px] uppercase tracking-[0.3em] font-bold">
        Lost? <MoveRight size={14} className="text-gold" /> stovamedia.in
      </div>

      <style jsx>{`
        .stroke-gold {
          -webkit-text-stroke: 1.5px var(--gold);
        }
        .animate-float {
          animation: float 10s infinite ease-in-out;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-10px, 15px); }
          66% { transform: translate(15px, -10px); }
        }
      `}</style>
    </main>
  );
}
