import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Services from "@/components/sections/Services";
import WorkHorizontal from "@/components/sections/WorkHorizontal";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Testimonial from "@/components/sections/Testimonial";
import CTASection from "@/components/sections/CTASection";
import { RevealOnScroll } from "@/components/ui";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      
      <RevealOnScroll>
        <Services />
      </RevealOnScroll>
      
      <WorkHorizontal />
      
      <RevealOnScroll>
        <Process />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <About />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <Testimonial />
      </RevealOnScroll>
      
      <CTASection />
    </main>
  );
}
