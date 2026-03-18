"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-6 px-10 flex items-center justify-between",
        scrolled
          ? "bg-ink/80 backdrop-blur-2xl border-b border-border py-4"
          : "bg-transparent"
      )}
    >
      {/* Left: Logo */}
      <Link href="/" className="group flex items-center gap-1">
        <span className="font-display text-xl transition-colors group-hover:text-gold">
          Stova
          <span className="text-gold">.</span>
          <span className="font-light text-cream/70 group-hover:text-cream">Media</span>
        </span>
      </Link>

      {/* Center: Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="relative group text-[11px] uppercase tracking-[0.15em] font-medium text-muted transition-colors hover:text-cream"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        ))}
      </nav>

      {/* Right: CTA & ThemeToggle */}
      <div className="flex items-center gap-6">
        <ThemeToggle />

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full border border-border text-[11px] uppercase tracking-wider font-semibold hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300"
        >
          Start a Project
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-ink z-[200] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-display text-xl">
                Stova<span className="text-gold">.</span>Media
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-cream p-2 hover:text-gold transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-5xl hover:text-gold transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto"
            >
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block w-full text-center py-5 bg-gold text-ink font-semibold rounded-lg text-lg"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
