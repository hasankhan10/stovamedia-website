import type { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";

export const metadata: Metadata = {
  title: "Pricing & Investment Standard | Custom Software & AI Studio",
  description: "Understand Stova Media's pricing philosophy: outcome-driven fixed quotes, zero hourly billing surprises, 100% in-house engineering from Kolkata, and long-term maintenance.",
  keywords: [
    "Software Development Pricing",
    "AI Agent Cost",
    "Fixed Price Custom Software",
    "Stova Media Pricing Standard",
    "In-house Software Engineering Costs",
    "Next.js Development Agency Pricing"
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing & Investment Standard | Stova Media",
    description: "Fixed scope quotes, zero hourly billing, and outcome-driven software engineering.",
    url: "https://stovamedia.in/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Investment Standard | Stova Media",
    description: "Predictable fixed-scope pricing and guaranteed milestone software delivery.",
  },
};

export default function PricingPage() {
  const pricingJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing & Investment Standard | Stova Media",
    "description": "Transparent milestone-based pricing for custom software, high-speed websites, and AI automation.",
    "url": "https://stovamedia.in/pricing",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://stovamedia.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Pricing",
          "item": "https://stovamedia.in/pricing"
        }
      ]
    },
    "mainEntity": {
      "@type": "OfferCatalog",
      "name": "Engineering Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Growth Website Package",
          "description": "100% custom Next.js 15 code, Google Maps #1 ranking optimization, sub-50ms TTFB guarantee.",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "INR",
            "description": "Fixed-Scope Milestone Quote"
          }
        },
        {
          "@type": "Offer",
          "name": "E-Commerce & AI Agent",
          "description": "Custom-coded fast checkout store, 24/7 intelligent WhatsApp AI bot, automated order management.",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "INR",
            "description": "Custom Storefront Milestone Quote"
          }
        },
        {
          "@type": "Offer",
          "name": "Custom SaaS & Enterprise",
          "description": "Full-stack Next.js, TypeScript & PostgreSQL architecture, bank-grade RBAC, private AI workflows.",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "INR",
            "description": "Bespoke Sprint Milestone"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <PricingClient />
    </>
  );
}
