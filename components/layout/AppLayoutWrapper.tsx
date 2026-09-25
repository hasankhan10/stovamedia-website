"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { ChatBot } from "@/components/ui";
import { AISummary } from "@/components/layout/AISummary";

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isAIEcomRoute = pathname?.startsWith("/aiecommerce");

  if (isAdminRoute) {
    return <div className="min-h-screen bg-[#05070D] text-slate-100">{children}</div>;
  }

  if (isAIEcomRoute) {
    return <SmoothScroll>{children}</SmoothScroll>;
  }

  return (
    <>
      <Navbar />
      <ChatBot />
      <SmoothScroll>
        <PageTransition>
          {children}
          <AISummary />
          <Footer />
        </PageTransition>
      </SmoothScroll>
    </>
  );
}
