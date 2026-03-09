import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Link } from "wouter";

type SectionTheme = "dark" | "light";

const services = [
  {
    id: "webdesign",
    title: "WEBDESIGN",
    subtitle: "Für den perfekten Online-Auftritt",
    items: [
      "Landing-Pages",
      "Hosting und Domain",
      "Content Management",
      "Content Development",
      "Corporate Design",
      "Display Advertising",
      "B2B/B2C Onlineshops"
    ]
  },
  {
    id: "branding",
    title: "BRANDING",
    subtitle: "Markenidentität mit Charakter",
    items: [
      "Brand Building",
      "Logo Creation",
      "Visual Identity",
      "Brand Guidelines",
      "Corporate Design",
      "Art Direction"
    ]
  },
  {
    id: "it-services",
    title: "IT-SERVICES",
    subtitle: "Strategisch und nachhaltig",
    items: [
      "Network and Infrastructure",
      "Firewall Management",
      "Server-Management",
      "Desktop-Management",
      "Patch-Management",
      "IT-Beratung"
    ]
  }
];

export default function Services() {
  const [currentTheme, setCurrentTheme] = useState<SectionTheme>("dark");
  const observerRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const sections = [
      { id: "hero", theme: "dark" as SectionTheme },
      { id: "services-list", theme: "light" as SectionTheme },
      { id: "cta", theme: "dark" as SectionTheme },
    ];

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
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) observerRefs.current.set(id, el);
  };

  const bgColor = currentTheme === "dark" ? "bg-[#1a1918]" : "bg-[#F4F4F4]";
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";
  const mutedColor = currentTheme === "dark" ? "text-white/40" : "text-black/40";
  const borderColor = currentTheme === "dark" ? "border-white/10" : "border-black/10";

  return (
    <SmoothScroll>
      <div className={`min-h-screen font-sans selection:bg-[#eedea0] selection:text-black transition-colors duration-700 ${bgColor}`}>
        <Navbar isDarkTheme={currentTheme === "dark"} />
        
        <main>
          {/* Hero */}
          <section ref={setRef("hero")} className="min-h-[70vh] flex items-end pb-16 pt-32">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-[10px] uppercase tracking-[0.15em] ${mutedColor}`}>Sec.</span>
                  <span className="text-[#eedea0]">/●</span>
                </div>
                <h1 className="text-[10vw] md:text-[6vw] leading-[0.95] font-bold tracking-tight text-[#eedea0] mb-8">
                  UNSERE<br/>LEISTUNGEN
                </h1>
                <p className={`text-base md:text-lg max-w-lg ${mutedColor}`}>
                  Mit der perfekten Balance aus Kreativität und Funktionalität entwickeln wir digitale Erlebnisse.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Services List */}
          <section ref={setRef("services-list")} className="py-24">
            <div className="container-custom">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`border-b py-16 md:py-20 ${borderColor}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div>
                      <div className={`text-xs font-mono mb-4 ${mutedColor}`}>0{i + 1}</div>
                      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${textColor}`}>
                        {service.title}
                      </h2>
                      <p className={`text-sm md:text-base ${mutedColor}`}>{service.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.items.map((item, j) => (
                        <div key={j} className={`text-sm py-3 border-b ${borderColor} ${mutedColor}`}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section ref={setRef("cta")} className="py-32">
            <div className="container-custom text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 ${textColor}`}>
                  PROJEKT STARTEN?
                </h2>
                <Link href="/#contact">
                  <a className={`inline-block rounded-full h-11 px-8 text-sm font-medium leading-[44px] transition-colors ${currentTheme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"}`}>
                    Kontakt aufnehmen
                  </a>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </SmoothScroll>
  );
}
