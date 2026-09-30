import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import WhatWeDo from "@/components/home/WhatWeDo";
import GoogleReviews from "@/components/home/GoogleReviews";
import HomeCTA from "@/components/home/HomeCTA";

export const metadata: Metadata = {
  title: "Stova Media | Custom Software Development Agency & AI Agent Studio Kolkata",
  description: "Boutique software engineering studio and AI lab in Kolkata. We build 100% custom-coded high-speed websites, SaaS platforms, and autonomous AI chatbots. Zero templates.",
  keywords: [
    "Custom Software Development Agency Kolkata",
    "AI Agent Studio India",
    "Next.js Full-Stack Developers",
    "Local Business Growth Website",
    "Healthcare SaaS Engineering",
    "Autonomous AI Chatbots",
    "Stova Media"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stova Media | Custom Software & AI Agent Studio",
    description: "100% In-house software architecture, sub-second speeds, and autonomous AI automation.",
    url: "https://stovamedia.in",
    type: "website",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Stova Media",
    "url": "https://stovamedia.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://stovamedia.in/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="w-full bg-white relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      {/* 1. Monumental Hero Section */}
      <HomeHero />

      {/* 2. What We Do - 3 Core Pillars */}
      <WhatWeDo />

      {/* 3. Verified Google Reviews Showcase */}
      <GoogleReviews />

      {/* 4. High-Converting CTA & Appointment Booking */}
      <HomeCTA />
    </div>
  );
}
