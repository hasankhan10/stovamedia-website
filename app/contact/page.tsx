import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Stova Media | Hire Custom Software & AI Developers Kolkata",
  description: "Start a conversation with Stova Media. Hire custom software engineers, AI agent developers, and web architects based in Kolkata. 4-hour technical proposal response SLA.",
  keywords: [
    "Contact Stova Media",
    "Hire Software Developers Kolkata",
    "Hire AI Agent Studio",
    "Custom Software Inquiry",
    "Software Agency Kolkata Contact",
    "WhatsApp Software Consultation"
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Stova Media | Hire Custom Software & AI Developers",
    description: "Submit your project requirements or chat directly with our lead software architect on WhatsApp.",
    url: "https://stovamedia.in/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Stova Media | Software & AI Studio",
    description: "Connect directly with our lead architect. 4-hour feasibility review guarantee.",
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Stova Media",
    "description": "Direct communication channel with Stova Media lead software architects in Kolkata, India.",
    "url": "https://stovamedia.in/contact",
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
          "name": "Contact",
          "item": "https://stovamedia.in/contact"
        }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Stova Media",
      "url": "https://stovamedia.in",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9432053261",
          "contactType": "sales",
          "email": "contact@stovamedia.in",
          "areaServed": ["IN", "US", "GB", "AE", "BD"],
          "availableLanguage": ["English", "Bengali", "Hindi"]
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
