"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import Link from "next/link";
import { Globe, Palette, Server } from "lucide-react";

const services = [
  {
    id: "webdesign",
    icon: Globe,
    title: "WEBDESIGN",
    subtitle: "Für den perfekten Online-Auftritt",
    description: "Moderne, responsive Websites die Besucher in Kunden verwandeln.",
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
    icon: Palette,
    title: "BRANDING",
    subtitle: "Markenidentität mit Charakter",
    description: "Einzigartige Markenidentitäten die im Gedächtnis bleiben.",
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
    icon: Server,
    title: "IT-SERVICES",
    subtitle: "Strategisch und nachhaltig",
    description: "Zuverlässige IT-Infrastruktur für Ihr Unternehmen.",
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

export function ServicesClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <ScrollToTop />
      <SmoothScroll>
      <div className="min-h-screen font-sans selection:bg-[#F5C518] selection:text-black">
        
        <Navbar isDarkTheme={true} />
        
        <main className="relative z-10">
          <section ref={heroRef} className="min-h-[70vh] flex items-end pb-16 pt-32">
            <div className="container-custom">
              <div className="overflow-hidden mb-6">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-lg text-white/50"
                >
                  Leistungen
                </motion.div>
              </div>
              
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[8vw] sm:text-[7vw] md:text-[5vw] lg:text-[3.5vw] leading-[1.1] font-bold tracking-[-0.02em] mb-6"
                >
                  <span className="text-white">UNSERE</span>
                  <br />
                  <span className="text-gradient">LEISTUNGEN</span>
                </motion.h1>
              </div>
              
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-base md:text-lg max-w-lg text-white/50"
                >
                  Mit der perfekten Balance aus Kreativität und Funktionalität entwickeln wir digitale Erlebnisse.
                </motion.p>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32">
            <div className="container-custom">
              <div className="space-y-8 md:space-y-12">
                {services.map((service, i) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 hover:bg-white/[0.04] hover:border-[#F5C518]/20 transition-all"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-[#F5C518]/10 border border-[#F5C518]/20 flex items-center justify-center group-hover:bg-[#F5C518]/20 transition-colors">
                            <service.icon className="w-7 h-7 text-[#F5C518]" />
                          </div>
                          <span className="text-xs font-mono text-white/30">0{i + 1}</span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-white group-hover:text-gradient transition-all">
                          {service.title}
                        </h2>
                        <p className="text-[#F5C518] text-sm uppercase tracking-wider mb-4">
                          {service.subtitle}
                        </p>
                        <p className="text-white/50 text-base">
                          {service.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.items.map((item, j) => (
                          <motion.div 
                            key={j} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + j * 0.05 }}
                            className="flex items-center gap-3 text-sm py-3 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/60 hover:text-white hover:border-white/10 transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-10 md:p-16 text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                  Projekt <span className="text-gradient">starten</span>?
                </h2>
                <p className="text-white/50 max-w-xl mx-auto mb-8">
                  Lassen Sie uns über Ihre Anforderungen sprechen.
                </p>
                <Link 
                  href="/kontakt" 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#F5C518] via-[#FFD700] to-[#E6A800] text-black font-semibold hover:opacity-90 transition-opacity"
                >
                  Kontakt aufnehmen
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
      </SmoothScroll>
    </>
  );
}
