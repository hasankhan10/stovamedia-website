import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";

// Layout Components
import SmoothScroll from "@/components/animations/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import GlobalBackground from "@/components/layout/GlobalBackground";
import PageTransition from "@/components/layout/PageTransition";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";

const displayFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});

const uiFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  title: {
    default: "Stova Media | Custom Software & AI Agent Studio",
    template: "%s | Stova Media",
  },
  description: "Building premium custom software, SaaS, and AI Agents for forward-thinking businesses. 100% in-house engineering and high-fidelity architecture from Kolkata.",
  keywords: [
    "Custom Software Development", 
    "AI Agent Studio", 
    "Kolkata Software Agency", 
    "Indian Software Studio",
    "Best software company in Dholahat",
    "Best website development company in Dholahat",
    "Best website development in Dholahat"
  ],
  authors: [{ name: "Mehedi Hasan", url: "https://www.linkedin.com/in/mehedi-hasan110/" }],
  creator: "Stova Media",
  metadataBase: new URL("https://stovamedia.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stova Media | Custom Software & AI Agent Studio",
    description: "Architecting software that drives growth. Specialized in Healthcare & AI Automation.",
    url: "https://stovamedia.in",
    siteName: "Stova Media",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Stova Media | High-Fidelity Software Studio"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stova Media | Custom Software & AI Agent Studio",
    description: "Building premium software for serious businesses.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Stova Media",
    "image": "https://stovamedia.in/stova-media-logo.jpg",
    "url": "https://stovamedia.in",
    "telephone": "+919432053261",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kolkata, WB",
      "addressLocality": "Kolkata",
      "addressRegion": "West Bengal",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.5726,
      "longitude": 88.3639
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/stova-media/",
      "https://www.instagram.com/stovamedia"
    ],
    "priceRange": "$$$"
  };

  return (
    <html lang="en" className={`${displayFont.variable} ${uiFont.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased text-cream selection:bg-gold selection:text-ink">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Preloader />
          <GlobalBackground />
          <ScrollProgress />
          <Navbar />
          <BackToTop />
          <SmoothScroll>
            <PageTransition>
              {children}
              <Footer />
            </PageTransition>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
