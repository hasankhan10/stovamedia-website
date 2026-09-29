"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { AppointmentModal, MagneticElement } from "@/components/ui";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "AI E-Commerce", href: "/aiecommerce", badge: "AI" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock on mobile drawer
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
          "fixed top-0 left-0 w-full z-[500] transition-all duration-300 px-4 sm:px-8 md:px-12 lg:px-20",
          scrolled ? "py-3 md:py-3.5" : "py-5 md:py-6"
        )}
      >
        <div
          className={cn(
            "max-w-[1300px] mx-auto flex items-center justify-between transition-all duration-300 rounded-full px-5 sm:px-7 py-2.5",
            scrolled
              ? "bg-white/85 backdrop-blur-2xl border border-slate-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
              : "bg-white/60 backdrop-blur-md border border-slate-200/50"
          )}
        >
          {/* Left: Brand Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative">
              <Image 
                src="/logo.jpeg" 
                alt="Stova Media" 
                width={140} 
                height={36} 
                className="h-7 sm:h-8 w-auto object-contain rounded-full border border-slate-200 group-hover:scale-105 transition-transform" 
                priority
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative py-1 text-sm font-ui transition-all duration-200 flex items-center gap-1.5 group",
                    isActive
                      ? "text-indigo-600 font-bold"
                      : "text-slate-600 hover:text-slate-900 font-medium"
                  )}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-indigo-600 text-white rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="active-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-indigo-600 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            {/* WhatsApp Direct Link */}
            <MagneticElement strength={0.25} className="hidden sm:inline-block">
              <a
                href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20am%20interested%20in%20discussing%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-xs font-semibold"
              >
                <MessageSquare size={13} />
                <span>WhatsApp</span>
              </a>
            </MagneticElement>

            {/* Primary CTA Button */}
            <MagneticElement strength={0.25} className="hidden sm:inline-block">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs uppercase tracking-wider font-bold shadow-sm shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Start Project</span>
              </button>
            </MagneticElement>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-slate-700 p-2 hover:text-indigo-600 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-[1000] flex flex-col p-6 sm:p-10 overflow-y-auto"
            data-lenis-prevent
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-6 border-b border-slate-100">
              <Image 
                src="/logo.jpeg" 
                alt="Stova Media" 
                width={140} 
                height={36} 
                className="h-8 w-auto object-contain rounded-full border border-slate-200" 
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-full border border-slate-200 bg-slate-50"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-6 my-auto py-8">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "font-display text-3xl sm:text-4xl transition-colors flex items-center justify-between font-bold",
                        isActive ? "text-indigo-600" : "text-slate-900 hover:text-indigo-600"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="text-[11px] font-mono px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-600 font-bold rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </span>
                      <ArrowUpRight size={22} className={isActive ? "text-indigo-600" : "text-slate-300"} />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3 mt-auto">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full text-center py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md shadow-indigo-600/25"
              >
                Start A Project
              </button>

              <a
                href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
