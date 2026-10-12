import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: "About Us | Best Software Company & AI Agent Provider in Kolkata",
  description: "Learn about Stova Media, recognized as the best AI agent provider and premier AI-powered software company in Kolkata, India. Led by Founder & Lead Architect Mehedi Hasan. 100% in-house engineering.",
  keywords: [
    "Best software company in Kolkata",
    "Best AI agent provider in Kolkata",
    "AI powered software company in Kolkata",
    "About Stova Media",
    "Mehedi Hasan Software Architect",
    "Kolkata Software Agency Founder",
    "Autonomous AI Agents Kolkata",
    "Custom Software Studio India",
    "In-house engineering team Kolkata",
    "Next.js full-stack agency Kolkata"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Stova Media | Best Software Company & AI Agent Provider in Kolkata",
    description: "Learn about Stova Media's story, core engineering values, and Kolkata-based founder Mehedi Hasan. 100% in-house engineering, zero templates.",
    url: "https://stovamedia.in/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Stova Media | Best Software Company & AI Agent Studio Kolkata",
    description: "Founder-led senior software engineering and autonomous AI systems from Kolkata, India.",
  },
};

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Stova Media",
    "description": "Founder-led custom software engineering studio and autonomous AI lab based in Kolkata, India.",
    "url": "https://stovamedia.in/about",
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
          "name": "About",
          "item": "https://stovamedia.in/about"
        }
      ]
    },
    "mainEntity": {
      "@type": "Person",
      "name": "Mehedi Hasan",
      "jobTitle": "Founder & Lead Software Architect",
      "worksFor": {
        "@type": "Organization",
        "name": "Stova Media",
        "url": "https://stovamedia.in"
      },
      "url": "https://www.linkedin.com/in/mehedi-hasan110/",
      "sameAs": [
        "https://www.linkedin.com/in/mehedi-hasan110/",
        "https://stovamedia.in"
      ],
      "knowsAbout": [
        "Full-Stack Software Architecture",
        "Next.js 15 & React 19",
        "Autonomous AI Agents",
        "Healthcare SaaS Systems",
        "PostgreSQL & Database Optimization"
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
