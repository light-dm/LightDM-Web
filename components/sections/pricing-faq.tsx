"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type SectionTheme = "dark" | "light";

interface PricingFAQProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
  currentTheme: SectionTheme;
}

const packages = [
  { name: "BASIC", price: "ab 1.500 €", desc: "Startups & kleine Projekte" },
  { name: "PLUS", price: "ab 3.000 €", desc: "Wachsende Unternehmen", highlight: true },
  { name: "PREMIUM", price: "ab 6.000 €", desc: "Komplexe Anforderungen" }
];

const faqs = [
  { q: "Individuelle Pakete?", a: "Ja, die Pakete dienen zur Orientierung. Jedes Projekt bekommt ein individuelles Angebot." },
  { q: "Wie läuft ein Projekt ab?", a: "Kennenlernen, Analyse, Konzept, Design, Entwicklung und Launch." },
  { q: "Welche Systeme?", a: "Webflow, WordPress oder Headless (React/Next.js)." },
  { q: "Wie lange dauert es?", a: "Einfache Website: 2-4 Wochen. Komplexer: 6-12 Wochen." },
];

export function PricingAndFAQ({ setRef, currentTheme }: PricingFAQProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";
  const mutedColor = currentTheme === "dark" ? "text-white/40" : "text-black/40";
  const borderColor = currentTheme === "dark" ? "border-white/10" : "border-black/10";
  const accentColor = currentTheme === "dark" ? "text-[#eedea0]" : "text-[#1a1918]";
  const ringAccent = currentTheme === "dark" ? "ring-[#eedea0]" : "ring-[#1a1918]";

  return (
    <section ref={setRef("pricing")} id="pricing" className="py-24 md:py-32">
      <div className="container-custom">
        
        <div className="flex items-center gap-3 mb-12">
          <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-700 ${mutedColor}`}>Sec.</span>
          <span className={`transition-colors duration-700 ${accentColor}`}>/●</span>
          <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight transition-colors duration-700 ${textColor}`}>Preise</h2>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-px mb-20 transition-colors duration-700 ${currentTheme === "dark" ? "bg-white/10" : "bg-black/10"}`}>
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 md:p-8 transition-colors duration-700 ${currentTheme === "dark" ? "bg-black/40" : "bg-white/80"} ${pkg.highlight ? `ring-1 ${ringAccent}` : ""}`}
            >
              {pkg.highlight && (
                <div className={`text-[9px] uppercase tracking-widest mb-3 transition-colors duration-700 ${accentColor}`}>Beliebt</div>
              )}
              <div className={`text-[10px] uppercase tracking-widest mb-3 transition-colors duration-700 ${mutedColor}`}>{pkg.name}</div>
              <div className={`text-2xl md:text-3xl font-bold mb-2 transition-colors duration-700 ${textColor}`}>{pkg.price}</div>
              <p className={`text-xs transition-colors duration-700 ${mutedColor}`}>{pkg.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-700 ${mutedColor}`}>Sec.</span>
            <span className={`transition-colors duration-700 ${accentColor}`}>/●</span>
            <h3 className={`text-xl font-bold uppercase tracking-tight transition-colors duration-700 ${textColor}`}>FAQ</h3>
          </div>

          <div className={`border-t transition-colors duration-700 ${borderColor}`}>
            {faqs.map((faq, i) => (
              <div key={i} className={`border-b transition-colors duration-700 ${borderColor}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-5 flex items-center justify-between text-left"
                >
                  <span className={`text-sm md:text-base font-medium transition-colors duration-700 ${textColor}`}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform duration-300 ${textColor} ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className={`pb-5 text-sm leading-relaxed transition-colors duration-700 ${mutedColor}`}>{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
