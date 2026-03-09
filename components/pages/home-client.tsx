"use client";

import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { Services } from "@/components/sections/services-new";
import { Projects } from "@/components/sections/projects-new";
import { About } from "@/components/sections/about-new";
import { Contact } from "@/components/sections/contact-new";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/ui/section-divider";
import { Marquee } from "@/components/ui/marquee";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { TechStack } from "@/components/sections/tech-stack";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Blog } from "@/components/sections/blog";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ParallaxBlobs } from "@/components/ui/parallax-background";
import { StickyPillars } from "@/components/sections/sticky-pillars";
import { Preloader } from "@/components/preloader";
import { useRef, useState } from "react";

const marqueeItems = [
  "WEBDESIGN",
  "BRANDING", 
  "IT-SERVICES",
  "UI/UX",
  "DEVELOPMENT",
  "CONSULTING",
  "E-COMMERCE",
  "IDENTITY"
];

export function HomeClient() {
  const observerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      observerRefs.current.set(id, el);
    }
  };

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <ScrollToTop />
      <div>
        <CustomCursor />
        <SmoothScroll>
          <div className="min-h-screen font-sans selection:bg-[#F5C518] selection:text-black">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
              <div 
                className="hidden lg:block absolute top-1/4 -left-32 w-[600px] h-[800px] opacity-[0.06]"
                style={{
                  background: "linear-gradient(135deg, transparent 0%, rgba(245, 197, 24, 0.3) 30%, rgba(255, 215, 0, 0.5) 50%, rgba(245, 197, 24, 0.3) 70%, transparent 100%)",
                  transform: "rotate(-15deg) skewY(-5deg)",
                  filter: "blur(80px)",
                }}
              />
            </div>
            <Navbar isDarkTheme={true} />
            <main className="relative z-10">
              <Hero setRef={setRef} isLoaded={isLoaded} />
              
              <section 
                ref={setRef("marquee")} 
                id="marquee" 
                className="py-8 md:py-12 overflow-hidden"
              >
                <Marquee 
                  items={marqueeItems} 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white"
                  speed={30}
                />
              </section>
              
              <SectionDivider />
              <Clients setRef={setRef} />
              <SectionDivider />
              <Services setRef={setRef} />
              <SectionDivider />
              <Features setRef={setRef} />
              <SectionDivider />
              <StickyPillars setRef={setRef} />
              <SectionDivider />
              <Projects setRef={setRef} />
              <SectionDivider />
              <About setRef={setRef} />
              <SectionDivider />
              <TechStack setRef={setRef} />
              <SectionDivider />
              <Testimonials setRef={setRef} />
              <SectionDivider />
              <FAQ setRef={setRef} />
              <SectionDivider />
              <Blog setRef={setRef} />
              <SectionDivider />
              <Contact setRef={setRef} />
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </div>
    </>
  );
}
