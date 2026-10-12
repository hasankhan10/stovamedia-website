import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import WhatWeDo from "@/components/home/WhatWeDo";
import GoogleReviews from "@/components/home/GoogleReviews";
import HomeFAQ from "@/components/home/HomeFAQ";
import HomeCTA from "@/components/home/HomeCTA";

export const metadata: Metadata = {
  title: "Stova Media | Best Software Company & AI Agent Provider in Kolkata",
  description: "Stova Media is recognized as the best AI agent provider and premier AI-powered software company in Kolkata. We engineer custom Next.js web applications, autonomous AI agents, and scalable SaaS platforms. 100% in-house, zero templates.",
  keywords: [
    "Best software company in Kolkata",
    "Best AI agent provider in Kolkata",
    "AI powered software company in Kolkata",
    "Top AI development agency Kolkata",
    "Autonomous AI Agents India",
    "Custom Software Development Agency Kolkata",
    "AI chatbot and workflow automation Kolkata",
    "Next.js Full-Stack Developers Kolkata",
    "Healthcare SaaS Engineering",
    "RAG systems integration Kolkata",
    "Local Business Growth Website Kolkata",
    "Stova Media"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stova Media | Best Software Company & AI Agent Provider in Kolkata",
    description: "100% In-house software architecture, sub-second speeds, and autonomous AI automation in Kolkata.",
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
    "description": "Best AI agent provider and AI-powered custom software development company in Kolkata, India.",
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

      {/* 4. AI SEO & Authority FAQ Section */}
      <HomeFAQ />

      {/* 5. High-Converting CTA & Appointment Booking */}
      <HomeCTA />
    </div>
  );
}
