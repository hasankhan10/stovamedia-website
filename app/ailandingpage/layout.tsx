import type { Metadata } from "next";
import { MetaPixel } from "@/components/analytics";

export const metadata: Metadata = {
  title: "Travel Agency AI Website & Scrolling Animation | Stova Media",
  description: "West Bengal-এর first-time Scrolling Animation ও AI Assistant যুক্ত premium website — শুধু আপনার travel business-এর জন্য। ২৪ ঘণ্টা AI বুকিং অ্যাসিস্ট্যান্ট ও সিনেমাটিক মোশন।",
  keywords: [
    "Travel Agency AI Website Kolkata",
    "Travel Agency Website Development West Bengal",
    "Best AI agent provider in Kolkata",
    "AI powered software company in Kolkata",
    "Travel Agency Scrolling Animation Website",
    "West Bengal Travel Agency AI Booking System",
    "Bengali Travel Website Designer",
    "Stova Media Travel AI"
  ],
  openGraph: {
    title: "Travel Agency AI Website & Scrolling Animation | Stova Media",
    description: "আপনার tour ভালো, তাহলে booking কেন competitor-এর কাছে চলে যাচ্ছে? নিয়ে আসুন West Bengal-এর প্রথম Scrolling Animation ও AI Assistant যুক্ত ট্রাভেল ওয়েবসাইট।",
    url: "https://stovamedia.in/ailandingpage",
    siteName: "Stova Media",
    locale: "bn_BD",
    type: "website",
  },
};

export default function AILandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Stova Media - Travel Agency AI Platform",
    "description": "West Bengal's first-time Scrolling Animation & 24/7 AI Assistant powered website development for Travel Agencies.",
    "url": "https://stovamedia.in/ailandingpage",
    "telephone": "+919432053261",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kolkata",
      "addressRegion": "West Bengal",
      "addressCountry": "IN"
    },
    "serviceType": [
      "Travel Agency AI Website Development",
      "Scrolling Animation Web Design",
      "AI Travel Booking Assistant",
      "AI Powered Software Development in Kolkata"
    ],
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "West Bengal"
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@300;400;500;600;700;800&family=Caveat:wght@600;700&family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        style={{
          ["--font-hind-siliguri" as any]: "'Hind Siliguri', sans-serif",
          ["--font-anek-bangla" as any]: "'Anek Bangla', sans-serif",
          ["--font-noto-bengali" as any]: "'Noto Sans Bengali', sans-serif",
          ["--font-caveat" as any]: "'Caveat', cursive",
        }}
        className="font-['Hind_Siliguri',sans-serif] min-h-screen bg-[#FDFBF7] text-slate-900 selection:bg-orange-500 selection:text-white"
      >
        <MetaPixel />
        {children}
      </div>
    </>
  );
}
