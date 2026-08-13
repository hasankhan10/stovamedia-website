import type { Metadata } from "next";
import { fetchServicesFromSupabase } from "@/lib/db-services";
import ServicesClient from "@/components/services/ServicesClient";

export const metadata: Metadata = {
  title: "Custom Software & AI Agent Services | Stova Media Kolkata",
  description: "Explore Stova Media's core capabilities: Custom Software Development, Autonomous AI Agent Studio, Local Business Growth Packages (₹15,999), and Custom E-commerce Setups.",
  keywords: [
    "Custom Software Development Services",
    "AI Agent Studio Services",
    "Autonomous AI Agent Engineering",
    "Healthcare SaaS Development",
    "Local Business Web Growth Package",
    "Custom E-commerce Platform Development",
    "Software Agency Services Kolkata"
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Custom Software & AI Agent Services | Stova Media",
    description: "Full-stack custom software development, AI agent automation, local business packages, and custom e-commerce architecture.",
    url: "https://stovamedia.in/services",
  },
};

export default async function ServicesPage() {
  const { data: services } = await fetchServicesFromSupabase();

  return <ServicesClient initialServices={services} />;
}
