"use client";

import React from "react";
import { MarqueeTrack } from "@/components/ui";

const marqueeItems = [
  "Healthcare SaaS",
  "Web Apps",
  "React Native",
  "API Systems",
  "White-label",
  "3D Visualization",
  "Clinic Software",
];

export default function MarqueeStrip() {
  return (
    <div className="border-y border-border bg-transparent py-6 overflow-hidden">
      {/* Row 1: Left to Right */}
      <MarqueeTrack speed={30}>
        {marqueeItems.map((item, i) => (
          <span 
            key={i} 
            className="text-xl md:text-2xl font-display uppercase tracking-widest text-cream/90"
          >
            {item}
          </span>
        ))}
      </MarqueeTrack>

      {/* Row 2: Right to Left (Slower) */}
      <MarqueeTrack speed={45} reverse className="mt-4">
        {[...marqueeItems].reverse().map((item, i) => (
          <span 
            key={i} 
            className="text-xl md:text-2xl font-display uppercase tracking-widest text-muted/60"
          >
            {item}
          </span>
        ))}
      </MarqueeTrack>
    </div>
  );
}
