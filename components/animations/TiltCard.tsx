"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  spotlightColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  spotlightColor = "rgba(99, 102, 241, 0.12)",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // If touch device, return normal container with zero 3D tilt overhead for max mobile smoothness
  if (isTouchDevice) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentMouseX = e.clientX - rect.left;
    const currentMouseY = e.clientY - rect.top;

    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);

    const xPct = currentMouseX / width - 0.5;
    const yPct = currentMouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* Dynamic Cursor Spotlight Sheen */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-30"
          style={{
            background: `radial-gradient(350px circle at ${mouseX.get()}px ${mouseY.get()}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}

      {children}
    </motion.div>
  );
}
