"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChatBot } from "@/components/ui";
import { AISummary } from "@/components/layout/AISummary";

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isAIEcomRoute = pathname?.startsWith("/aiecommerce");

  if (isAdminRoute) {
    return <div className="admin-theme min-h-screen bg-[#F8FAFC] text-slate-900">{children}</div>;
  }

  if (isAIEcomRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <ChatBot />
      <div className="flex-1 w-full">
        {children}
      </div>
      <AISummary />
      <Footer />
    </div>
  );
}
