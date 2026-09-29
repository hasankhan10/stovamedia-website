"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function Preloader() {
  const pathname = usePathname();
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  const isExcludedPage = pathname === "/aiecommerce" || pathname?.startsWith("/aiecommerce");

  useEffect(() => {
    if (isExcludedPage) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => setComplete(true),
          });
        },
      });

      // Characters staggered reveal
      tl.from(".char-stova", {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      })
      .from(".char-dot", {
        opacity: 0,
        scale: 0,
        color: "#4F46E5",
        duration: 0.3,
        ease: "back.out(2)",
      }, "0.7")
      .from(".char-media", {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      }, "0.9")
      .to(underlineRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power4.inOut",
      }, "1.3");
    }, containerRef);

    return () => ctx.revert();
  }, [isExcludedPage]);

  if (isExcludedPage || complete) return null;

  const stova = "Stova".split("");
  const media = "Media".split("");

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
    >
      <div className="relative">
        <div className="font-display text-4xl md:text-6xl lg:text-8xl flex items-baseline gap-1 overflow-hidden font-bold text-slate-900">
          <div className="flex">
            {stova.map((char, i) => (
              <span key={i} className="char-stova inline-block">{char}</span>
            ))}
          </div>
          <span className="char-dot text-indigo-600">.</span>
          <div className="flex">
            {media.map((char, i) => (
              <span key={i} className="char-media inline-block font-light text-slate-500">{char}</span>
            ))}
          </div>
        </div>
        
        {/* Animated Underline */}
        <div 
          ref={underlineRef}
          className="absolute -bottom-4 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-600 to-cyan-500 scale-x-0 origin-center rounded-full"
        />
      </div>
    </div>
  );
}
