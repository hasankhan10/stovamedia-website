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
    default: "Stova Media | Custom Software Development Agency & AI Agent Studio",
    template: "%s | Stova Media",
  },
  description: "Stova Media is a premier custom software development agency and AI agent studio in Kolkata, India. Building high-fidelity SaaS, autonomous AI agents, enterprise web applications, and e-commerce platforms.",
  keywords: [
    "Custom Software Development Company",
    "AI Agent Studio",
    "Kolkata Software Agency",
    "Autonomous AI Agents India",
    "Healthcare SaaS Development",
    "Agentic AI Workflow Automation",
    "Best software company in Kolkata",
    "Custom web application development",
    "Full-stack Next.js Developers",
    "Doctor Recommended E-commerce Platform",
    "RAG Systems Integration",
    "Best website development company in Dholahat",
    "Best website development in Dholahat",
    "Offshore software development India",
    "Mehedi Hasan software architect"
  ],
  authors: [{ name: "Mehedi Hasan", url: "https://www.linkedin.com/in/mehedi-hasan110/" }],
  creator: "Stova Media",
  metadataBase: new URL("https://stovamedia.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stova Media | Custom Software Development Agency & AI Agent Studio",
    description: "Architecting custom software and autonomous AI agents that drive growth. Specialized in Healthcare SaaS, RAG Automation & High-Performance Web Architecture.",
    url: "https://stovamedia.in",
    siteName: "Stova Media",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Stova Media | Custom Software & AI Agent Studio Kolkata"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stova Media | Custom Software Development & AI Agent Studio",
    description: "Building premium software and autonomous AI agents for serious businesses.",
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
  verification: {
    google: "T1GvZg1zt3moDOmO1EW833TuOi2s5wCkPhYX4FvR_KE",
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
        "@type": ["ProfessionalService", "Organization", "LocalBusiness"],
        "@id": "https://stovamedia.in/#organization",
        "name": "Stova Media",
        "alternateName": ["Stova", "Stova Media AI Studio", "Stova Software Agency"],
        "description": "Premium Custom Software Development Agency and AI Agent Studio based in Kolkata, West Bengal, India. Specialized in high-fidelity healthcare SaaS, autonomous AI agents, enterprise web applications, and e-commerce platforms.",
        "image": "https://stovamedia.in/og-image.jpg",
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
        "areaServed": [
          "India",
          "Kolkata",
          "United States",
          "United Kingdom",
          "United Arab Emirates",
          "Bangladesh",
          "Global"
        ],
        "knowsAbout": [
          "Custom Software Development",
          "AI Agent Studio",
          "Autonomous AI Agents",
          "Agentic AI Workflow Automation",
          "Healthcare SaaS Architecture",
          "Retrieval-Augmented Generation (RAG)",
          "Next.js Development",
          "React Native & Flutter Apps",
          "Python & FastAPI",
          "Full-Stack Web Engineering"
        ],
        "founder": {
          "@type": "Person",
          "name": "Mehedi Hasan",
          "url": "https://www.linkedin.com/in/mehedi-hasan110/",
          "image": "https://stovamedia.in/founder.jpeg",
          "jobTitle": "Founder & Lead Architect"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        "sameAs": [
          "https://www.linkedin.com/company/stova-media/",
          "https://www.instagram.com/stovamedia"
        ],
        "priceRange": "$$$",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Custom Software Engineering & AI Agent Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Software Development",
                "description": "Bespoke full-stack web applications, mobile platforms, and healthcare SaaS architected 100% from scratch."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Agent Studio & Automation",
                "description": "Autonomous AI agents, RAG pipelines, conversational interfaces, and intelligent workflow automation."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Local Business Growth Engine",
                "description": "Google Business Profile optimization paired with a high-converting custom-coded landing page for local market dominance."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Premium E-commerce Setup",
                "description": "Custom-coded digital storefronts with secure payment gateway integrations, high page speeds, and brand-aligned design systems."
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://stovamedia.in/#website",
        "name": "Stova Media",
        "url": "https://stovamedia.in",
        "publisher": {
          "@id": "https://stovamedia.in/#organization"
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
              "text": "Stova Media specializes in Custom Software Development, AI Agent Studio & Automation services, Local Business Growth engines (GMB + High-Converting Web Platforms), and Premium Custom E-commerce Setups."
            }
          },
          {
            "@type": "Question",
            "name": "Where is Stova Media located and which regions do you serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media is headquartered in Kolkata, West Bengal, India. We deliver custom software engineering and AI agent development to businesses across India, the United States, the UK, UAE, Bangladesh, and globally."
            }
          },
          {
            "@type": "Question",
            "name": "How does Stova Media build custom AI agents?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We design and deploy autonomous AI agents using RAG architectures, LLM fine-tuning, vector databases, and custom workflow logic to automate business tasks, customer support, and lead qualification 24/7."
            }
          },
          {
            "@type": "Question",
            "name": "Does Stova Media use website templates or outsourcing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Stova Media operates with 100% in-house engineering in Kolkata. Every project is built from scratch with custom software architecture, zero pre-made themes, zero templates, and zero outsourcing."
            }
          },
          {
            "@type": "Question",
            "name": "How much does custom software or AI agent development cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media provides transparent, outcome-driven fixed quotes based on project scope. Local business packages start at ₹15,999, premium e-commerce setups up to ₹39,999, and custom SaaS / AI agent systems are quoted following a discovery consultation."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className={`${displayFont.variable} ${uiFont.variable}`} suppressHydrationWarning>
      <head>
        <link rel="author" href="/llms.txt" />
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
