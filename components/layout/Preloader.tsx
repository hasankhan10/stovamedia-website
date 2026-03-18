"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Session check to show only once
    const hasLoaded = sessionStorage.getItem("stova-preloader-v1");
    if (hasLoaded) {
      setComplete(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("stova-preloader-v1", "true");
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => setComplete(true),
          });
        },
      });

      // Characters staggered reveal
      tl.from(".char-stova", {
        opacity: 0,
        y: 20,
        stagger: 0.07,
        duration: 0.6,
        ease: "power2.out",
      })
      .from(".char-dot", {
        opacity: 0,
        scale: 0,
        color: "#C9A84C",
        duration: 0.4,
        ease: "back.out(2)",
      }, "0.9")
      .from(".char-media", {
        opacity: 0,
        y: 20,
        stagger: 0.07,
        duration: 0.6,
        ease: "power2.out",
      }, "1.1")
      .to(underlineRef.current, {
        scaleX: 1,
        duration: 1,
        ease: "power4.inOut",
      }, "1.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (complete) return null;

  const stova = "Stova".split("");
  const media = "Media".split("");

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-ink flex items-center justify-center overflow-hidden"
    >
      <div className="relative">
        <div className="font-display text-4xl md:text-6xl lg:text-8xl flex items-baseline gap-1 overflow-hidden">
          <div className="flex">
            {stova.map((char, i) => (
              <span key={i} className="char-stova inline-block">{char}</span>
            ))}
          </div>
          <span className="char-dot text-gold">.</span>
          <div className="flex">
            {media.map((char, i) => (
              <span key={i} className="char-media inline-block font-light text-cream/60">{char}</span>
            ))}
          </div>
        </div>
        
        {/* Animated Underline */}
        <div 
          ref={underlineRef}
          className="absolute -bottom-4 left-0 w-full h-[2px] bg-gold scale-x-0 origin-center"
        />
      </div>

      {/* Background scaling circles for "Flash" exit */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-gold/5 rounded-full flash-circle group-hover:block" />
      </div>
    </div>
  );
}
