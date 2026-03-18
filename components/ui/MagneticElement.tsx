"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticElement = ({
  children,
  strength = 0.35,
  className,
}: MagneticElementProps) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      gsap.to(el, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={magneticRef} className={className}>
      {children}
    </div>
  );
};
