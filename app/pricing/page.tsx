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
    "In-house Software Engineering Costs"
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing & Investment Standard | Stova Media",
    description: "Fixed scope quotes, zero hourly billing, and outcome-driven software engineering.",
    url: "https://stovamedia.in/pricing",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
