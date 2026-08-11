import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: "About Us | Founder-Led Custom Software & AI Agent Studio Kolkata",
  description: "Learn about Stova Media, a Kolkata-based custom software development agency led by Founder & Lead Architect Mehedi Hasan. 100% in-house engineering, zero outsourcing, zero templates.",
  keywords: [
    "About Stova Media",
    "Mehedi Hasan Software Architect",
    "Kolkata Software Agency Founder",
    "Custom Software Studio India",
    "In-house engineering team Kolkata"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Stova Media | Founder-Led Custom Software & AI Agent Studio",
    description: "Learn about Stova Media's story, core engineering values, and Kolkata-based founder Mehedi Hasan.",
    url: "https://stovamedia.in/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
