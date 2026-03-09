"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type SectionTheme = "dark" | "light";

interface AboutProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
  currentTheme: SectionTheme;
}

export function About({ setRef, currentTheme }: AboutProps) {
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";
  const mutedColor = currentTheme === "dark" ? "text-white/40" : "text-black/40";
  const borderColor = currentTheme === "dark" ? "border-white/10" : "border-black/10";
  const accentColor = currentTheme === "dark" ? "text-[#eedea0]" : "text-[#1a1918]";
  
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });
  
  const lines = ["WIR VERBINDEN", "TECHNIK UND", "GESTALTUNG."];

  return (
    <section ref={setRef("about")} id="about" className="py-24 md:py-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-700 ${mutedColor}`}>Sec.</span>
              <span className={`transition-colors duration-700 ${accentColor}`}>/●</span>
              <span className={`text-sm uppercase tracking-wide transition-colors duration-700 ${textColor}`}>Über Uns</span>
            </motion.div>
            
            <div ref={headingRef} className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight transition-colors duration-700 ${textColor}`}>
              {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={headingInView ? { y: 0 } : { y: "110%" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1 + i * 0.1,
                    }}
                    className={i === 2 ? `transition-colors duration-700 ${accentColor}` : ""}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8"
          >
            <div className={`space-y-4 text-base leading-relaxed transition-colors duration-700 ${mutedColor}`}>
              <p>
                Gegründet 2019, sind wir ein interdisziplinäres Studio für IT-Beratung, Webdesign und Branding.
              </p>
              <p>
                Unsere Arbeitsweise ist klar, effizient und partnerschaftlich.
              </p>
            </div>

            <div className={`border-t pt-8 grid grid-cols-3 gap-4 md:gap-8 transition-colors duration-700 ${borderColor}`}>
              <div>
                <div className={`text-2xl md:text-3xl font-bold transition-colors duration-700 ${textColor}`}>5+</div>
                <div className={`text-[10px] uppercase tracking-widest mt-1 transition-colors duration-700 ${mutedColor}`}>Jahre</div>
              </div>
              <div>
                <div className={`text-2xl md:text-3xl font-bold transition-colors duration-700 ${textColor}`}>40+</div>
                <div className={`text-[10px] uppercase tracking-widest mt-1 transition-colors duration-700 ${mutedColor}`}>Projekte</div>
              </div>
              <div>
                <div className={`text-2xl md:text-3xl font-bold transition-colors duration-700 ${textColor}`}>98%</div>
                <div className={`text-[10px] uppercase tracking-widest mt-1 transition-colors duration-700 ${mutedColor}`}>Zufrieden</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
