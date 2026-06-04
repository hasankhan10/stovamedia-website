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

import { ThemeProvider } from "@/components/ThemeProvider";
import { ChatBot } from "@/components/ui";
import { AISummary } from "@/components/layout/AISummary";

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
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://stovamedia.in/#organization",
        "name": "Stova Media",
        "alternateName": "Stova",
        "description": "Premium Custom Software and AI Agent Studio based in Kolkata, India. Specialized in high-fidelity healthcare SaaS, AI automation, and enterprise web solutions.",
        "image": "https://stovamedia.in/logo.jpeg",
        "url": "https://stovamedia.in",
        "logo": "https://stovamedia.in/logo.jpeg",
        "telephone": "+919432053261",
        "email": "contact@stovamedia.in",
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
        "founder": {
          "@type": "Person",
          "name": "Mehedi Hasan",
          "url": "https://www.linkedin.com/in/mehedi-hasan110/",
          "image": "https://stovamedia.in/founder.jpeg",
          "jobTitle": "Founder & Lead Architect"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        "sameAs": [
          "https://www.linkedin.com/company/stova-media/",
          "https://www.instagram.com/stovamedia"
        ],
        "priceRange": "$$$",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Engineering & AI Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Software Development",
                "description": "Full-stack web applications, mobile platforms, and healthcare SaaS architected from scratch."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Agent Studio",
                "description": "Autonomous AI agents, conversational interfaces, and intelligent workflow automation."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Local Business Growth Package",
                "description": "Google Business Profile optimization paired with high-converting premium landing pages."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Premium E-commerce Setup",
                "description": "Custom-coded digital storefronts with secure payments and scalable architecture."
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://stovamedia.in/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services does Stova Media provide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media specializes in Custom Software Development, AI Agent Studio services, Local Business Growth packages (GMB + Landing Pages), and Premium E-commerce setups."
            }
          },
          {
            "@type": "Question",
            "name": "Where is Stova Media located?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media is a premium software studio based in Kolkata, West Bengal, India, serving clients globally with in-house engineering."
            }
          },
          {
            "@type": "Question",
            "name": "Does Stova Media use templates for development?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. At Stova Media, we believe in high-fidelity engineering. Every project is built from scratch with custom architecture, zero templates, and 100% in-house code written specifically for your business logic."
            }
          }
        ]
      }
    ]
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

          <ChatBot />
          <SmoothScroll>
            <PageTransition>
              {children}
              <AISummary />
              <Footer />
            </PageTransition>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
