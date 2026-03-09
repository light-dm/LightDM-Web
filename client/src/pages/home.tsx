import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { PricingAndFAQ } from "@/components/sections/pricing-faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { useState, useEffect, useRef } from "react";

type SectionTheme = "dark" | "light";

interface Section {
  id: string;
  theme: SectionTheme;
}

const sections: Section[] = [
  { id: "hero", theme: "dark" },
  { id: "clients", theme: "dark" },
  { id: "services", theme: "light" },
  { id: "projects", theme: "light" },
  { id: "about", theme: "dark" },
  { id: "process", theme: "light" },
  { id: "pricing", theme: "light" },
  { id: "contact", theme: "dark" },
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<SectionTheme>("dark");
  const observerRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = observerRefs.current.get(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setCurrentTheme(section.theme);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      observerRefs.current.set(id, el);
    }
  };

  const bgColor = currentTheme === "dark" ? "bg-[#1a1918]" : "bg-[#F4F4F4]";

  return (
    <SmoothScroll>
      <div className={`min-h-screen font-sans selection:bg-[#eedea0] selection:text-black transition-colors duration-700 ease-out ${bgColor}`}>
        <Navbar isDarkTheme={currentTheme === "dark"} />
        <main>
          <Hero setRef={setRef} currentTheme={currentTheme} />
          <Clients setRef={setRef} currentTheme={currentTheme} />
          <Services setRef={setRef} currentTheme={currentTheme} />
          <Projects setRef={setRef} currentTheme={currentTheme} />
          <About setRef={setRef} currentTheme={currentTheme} />
          <Process setRef={setRef} currentTheme={currentTheme} />
          <PricingAndFAQ setRef={setRef} currentTheme={currentTheme} />
          <Contact setRef={setRef} currentTheme={currentTheme} />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
