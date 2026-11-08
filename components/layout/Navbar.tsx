"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AppointmentModal, MagneticElement } from "@/components/ui";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/#work" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "AI E-Commerce", href: "/aiecommerce", badge: "AI" },
  { name: "AI Landing Page", href: "/ailandingpage", badge: "AI" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll on mobile drawer open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[500] transition-all duration-300 px-4 sm:px-6 lg:px-8",
          scrolled ? "py-2.5 sm:py-3" : "py-4 sm:py-5"
        )}
      >
        <div
          className={cn(
            "max-w-6xl mx-auto relative flex items-center justify-between transition-all duration-300 rounded-2xl px-4 sm:px-6 py-2.5",
            scrolled
              ? "bg-[#0B0D16]/85 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-[#0B0D16]/70 backdrop-blur-xl border border-white/[0.08]"
          )}
        >
          {/* Left: Brand Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0 z-10">
            <Image 
              src="/logo.jpeg" 
              alt="Stova Media" 
              width={130} 
              height={32} 
              className="h-7 w-auto object-contain rounded-lg border border-white/10 shadow-xs" 
              priority
            />
          </Link>

          {/* Center: Desktop Navigation Links (Positioned Exactly in the Middle) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 md:absolute md:left-1/2 md:-translate-x-1/2 z-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && !link.href.includes("#") && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[13.5px] lg:text-[14.5px] font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-violet-400",
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Medium Corner Radius Button (rounded-xl) */}
          <div className="flex items-center gap-3 z-10">
            <MagneticElement strength={0.2} className="hidden sm:inline-block">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs sm:text-[13px] font-medium transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)] active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-400"
              >
                <span>Book consultation</span>
              </button>
            </MagneticElement>

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden text-slate-300 p-1.5 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-violet-400"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Modern Dark Glass Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-0 bg-[#090A10]/95 backdrop-blur-2xl z-[1000] flex flex-col p-6 sm:p-8 overflow-y-auto text-white border-l border-white/10"
            data-lenis-prevent
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-5 border-b border-white/10">
              <Image 
                src="/logo.jpeg" 
                alt="Stova Media" 
                width={130} 
                height={32} 
                className="h-7 w-auto object-contain rounded-lg border border-white/10" 
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg border border-white/10 bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-violet-400"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 my-auto py-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-xl transition-colors flex items-center justify-between font-normal py-2 border-b border-white/[0.04]",
                      isActive ? "text-violet-300 font-medium" : "text-slate-300 hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-md">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight size={18} className="text-slate-500" />
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Bottom Actions: Medium Corner Radius (rounded-xl) */}
            <div className="pt-5 border-t border-white/10 flex flex-col gap-2.5 mt-auto">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full text-center py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs rounded-xl transition-all shadow-md shadow-violet-600/30"
              >
                Book strategy consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
