import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Stova Media | Hire Custom Software & AI Developers Kolkata",
  description: "Start a conversation with Stova Media. Hire custom software engineers, AI agent developers, and web architects based in Kolkata. 24-hour proposal response time.",
  keywords: [
    "Contact Stova Media",
    "Hire Software Developers Kolkata",
    "Hire AI Agent Studio",
    "Custom Software Inquiry",
    "Software Agency Kolkata Contact"
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Stova Media | Hire Custom Software & AI Developers",
    description: "Submit your project requirements or book a discovery call with Stova Media.",
    url: "https://stovamedia.in/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
