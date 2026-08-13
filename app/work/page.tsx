import type { Metadata } from "next";
import { fetchProjectsFromSupabase } from "@/lib/db-projects";
import WorkIndexClient from "@/components/work/WorkIndexClient";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Custom Software & AI Projects",
  description: "Explore Stova Media's portfolio of custom software, healthcare SaaS (Mr Compounder), AI 3D platforms (HairViz), local business engines, and e-commerce setups (Dr. Paul's Care).",
  keywords: [
    "Stova Media Portfolio",
    "Healthcare SaaS Case Studies",
    "AI Agent Projects",
    "Mr Compounder SaaS",
    "Hair Transplant Simulation 3D",
    "Dr Pauls Online Care E-commerce",
    "Custom Software Case Studies Kolkata"
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Portfolio & Case Studies | Stova Media Software Studio",
    description: "Real-world healthcare SaaS, AI 3D visualization platforms, and high-performance e-commerce setups.",
    url: "https://stovamedia.in/work",
  },
};

export default async function WorkPage() {
  const { data: allProjects } = await fetchProjectsFromSupabase();

  return <WorkIndexClient projects={allProjects} />;
}
