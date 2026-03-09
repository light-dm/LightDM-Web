"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import Link from "next/link";
import { Users, Target, Zap, Globe } from "lucide-react";

const stats = [
  { value: "5+", label: "Jahre Erfahrung" },
  { value: "40+", label: "Projekte" },
  { value: "98%", label: "Zufriedenheit" },
  { value: "100%", label: "Remote" },
];

const values = [
  {
    icon: Target,
    title: "Zielorientiert",
    description: "Jedes Projekt beginnt mit klaren Zielen und messbaren Ergebnissen."
  },
  {
    icon: Zap,
    title: "Effizient",
    description: "Schlanke Prozesse und direkter Kommunikationsweg für schnelle Ergebnisse."
  },
  {
    icon: Users,
    title: "Partnerschaftlich",
    description: "Wir arbeiten eng mit Ihnen zusammen, als Teil Ihres Teams."
  },
  {
    icon: Globe,
    title: "Digital First",
    description: "Moderne Technologien und zeitgemäße Lösungen für die digitale Welt."
  },
];

export function AboutClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true });

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
                  Über uns
                </motion.div>
              </div>
              
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[8vw] sm:text-[7vw] md:text-[5vw] lg:text-[3.5vw] leading-[1.1] font-bold tracking-[-0.02em] mb-6"
                >
                  <span className="text-gradient">LIGHT</span>
                  <br />
                  <span className="text-white">DIGITAL</span>
                </motion.h1>
              </div>
              
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-base md:text-lg max-w-lg text-white/50"
                >
                  Gegründet 2019, sind wir ein interdisziplinäres Studio für IT-Beratung, Webdesign und Branding.
                </motion.p>
              </div>
            </div>
          </section>

          <section ref={contentRef} className="py-20 md:py-32">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10"
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white">
                    Unsere <span className="text-gradient">Mission</span>
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed mb-6 text-white/60">
                    Wir verbinden Technik und Gestaltung, um digitale Erlebnisse zu schaffen, die Marken stärken und Menschen verbinden.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-white/60">
                    Unsere Arbeitsweise ist klar, effizient und partnerschaftlich. Jedes Projekt beginnt mit dem Verständnis Ihrer Ziele.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10"
                >
                  <div className="grid grid-cols-2 gap-6 md:gap-8">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        className="text-center p-4"
                      >
                        <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                          {stat.value}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-white/40">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-4">
                  Unsere <span className="text-gradient">Werte</span>
                </h2>
                <p className="text-white/50 text-center max-w-2xl mx-auto">
                  Diese Prinzipien leiten uns bei jedem Projekt
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {values.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 hover:bg-white/[0.04] hover:border-[#F5C518]/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#F5C518]/10 border border-[#F5C518]/20 flex items-center justify-center mb-4 group-hover:bg-[#F5C518]/20 transition-colors">
                      <value.icon className="w-6 h-6 text-[#F5C518]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-white/50">{value.description}</p>
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
                  Bereit für Ihr <span className="text-gradient">Projekt</span>?
                </h2>
                <p className="text-white/50 max-w-xl mx-auto mb-8">
                  Lassen Sie uns gemeinsam etwas Großartiges schaffen.
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
