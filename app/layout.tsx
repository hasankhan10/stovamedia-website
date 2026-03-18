import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";

// Layout Components
import SmoothScroll from "@/components/animations/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
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
    default: "Stova Media | Custom Software Studio",
    template: "%s | Stova Media",
  },
  description: "Building premium software for serious businesses. Healthcare SaaS, 3D Platforms, and White-label solutions architected with intention and craft.",
  openGraph: {
    title: "Stova Media | Custom Software Studio",
    description: "Architecting software that drives growth. Specialized in Healthcare & 3D Visualization.",
    url: "https://stovamedia.in",
    siteName: "Stova Media",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stova Media | Custom Software Studio",
    description: "Building premium software for serious businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${uiFont.variable}`} suppressHydrationWarning>
      <body className="antialiased text-cream selection:bg-gold selection:text-ink">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Preloader />
          <SmoothScroll>
            <PageTransition>
              <ScrollProgress />
              <Navbar />
              {children}
              <Footer />
              <BackToTop />
            </PageTransition>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
