"use client";

import React from "react";
import { SectionLabel, SplitHeadline } from "@/components/ui";

export default function Testimonial() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-10 lg:px-20 text-center flex flex-col items-center">
      <SectionLabel className="justify-center">Client Perspective</SectionLabel>
      
      <div className="relative mt-12 mb-10 max-w-[920px]">
        {/* Curly Quotes Decoration */}
        <span className="absolute -top-10 -left-10 md:-top-16 md:-left-16 font-display text-[150px] md:text-[220px] text-gold/10 pointer-events-none select-none">
          &ldquo;
        </span>
        
        <blockquote className="font-display italic text-3xl md:text-5xl lg:text-6xl text-cream leading-[1.2] tracking-tight relative z-10">
          They didn&apos;t just build what we asked for — they 
          <span className="text-gold"> pushed back </span> 
          on features that would have slowed us down and delivered something 
          <span className="italic"> far better.</span>
        </blockquote>

        <span className="absolute -bottom-24 -right-10 md:-bottom-32 md:-right-16 font-display text-[150px] md:text-[220px] text-gold/10 pointer-events-none select-none">
          &rdquo;
        </span>
      </div>

      <cite className="font-ui text-[11px] uppercase tracking-[0.3em] font-bold text-dim not-italic mt-16 group">
        <span className="text-gold group-hover:text-cream transition-colors duration-500">Dr. Rahul S.</span> · Founder, Clinical OPD
      </cite>
    </section>
  );
}
