"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock for mobile menu
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
        "fixed top-0 left-0 w-full z-[500] transition-all duration-500 py-6 px-10 flex items-center justify-between",
        scrolled
          ? "bg-ink/65 backdrop-blur-2xl border-b border-border py-4"
          : "bg-transparent"
      )}
    >
      {/* Left: Logo */}
      <Link href="/" className="group flex items-center gap-1">
        <Image 
          src="/stova-media-logo.jpg" 
          alt="Stova Media" 
          width={160} 
          height={40} 
          className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
          priority
        />
      </Link>

      {/* Center: Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative text-[11px] uppercase tracking-[0.15em] font-medium transition-colors py-1",
                isActive ? "text-gold" : "text-muted hover:text-cream"
              )}
            >
              {link.name}
              {isActive && (
                <motion.div 
                  layoutId="active-nav-dot"
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
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

    </header>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-[#0A0A0B] dark:bg-[#0A0A0B] light:bg-[#E5E5E5] z-[1000] flex flex-col p-8 md:p-10 overflow-y-auto"
          data-lenis-prevent
        >
          <div className="flex justify-between items-center mb-20">
            <Image 
              src="/stova-media-logo.jpg" 
              alt="Stova Media" 
              width={160} 
              height={40} 
              className="h-10 w-auto object-contain" 
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-cream p-2 hover:text-gold transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-8">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-display text-4xl md:text-5xl transition-colors block",
                      isActive ? "text-gold" : "text-cream hover:text-gold"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
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
  </>
);
}
