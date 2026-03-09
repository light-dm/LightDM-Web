"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PricingProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

const pricingPlans = [
  {
    name: "IT-Services",
    price: "ab 99",
    unit: "/Monat",
    description: "Für kleine Unternehmen",
    features: [
      "Netzwerk & Infrastruktur",
      "Server-Management",
      "E-Mail Support",
      "Monatliche Wartung",
      "Sicherheitsupdates"
    ],
    highlight: false
  },
  {
    name: "Webdesign",
    price: "ab 2.499",
    unit: "einmalig",
    description: "Für wachsende Teams",
    features: [
      "Individuelles Design",
      "Responsive Entwicklung",
      "CMS-Integration",
      "SEO-Optimierung",
      "3 Monate Support"
    ],
    highlight: true
  },
  {
    name: "App & Branding",
    price: "Individuell",
    unit: "",
    description: "Für große Projekte",
    features: [
      "Komplette Brand Identity",
      "App-Entwicklung",
      "Individuelle Integrationen",
      "Dedizierter Ansprechpartner",
      "Langfristige Betreuung"
    ],
    highlight: false
  }
];

export function Pricing({ setRef }: PricingProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section ref={setRef("pricing")} id="pricing" className="py-16 md:py-24 relative">
      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-lg text-white/50"
          >
            Preise
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            >
              <span className="text-white">Transparente </span>
              <span className="text-gradient">Preise</span>
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 md:mt-6 text-base md:text-lg text-white/40"
          >
            Wählen Sie das passende Paket für Ihre Anforderungen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 md:p-8 rounded-2xl md:rounded-3xl border backdrop-blur-sm transition-all ${
                plan.highlight 
                  ? "border-[#F5C518]/30 bg-gradient-to-b from-[#F5C518]/10 to-white/[0.02]" 
                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#1a1918] text-xs font-semibold rounded-full shadow-lg shadow-[#F5C518]/25">
                  Beliebt
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-white/40">{plan.description}</p>
              </div>
              
              <div className="mb-6 md:mb-8">
                <span className="text-3xl md:text-5xl font-bold text-gradient">{plan.price}</span>
                {plan.unit && <span className="text-white/40 ml-1 text-sm md:text-base">{plan.unit}</span>}
              </div>
              
              <ul className="space-y-3 mb-6 md:mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="text-[#F5C518] flex-shrink-0">+</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full py-3 md:py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#1a1918] shadow-xl shadow-[#F5C518]/25"
                    : "border border-white/10 bg-white/[0.02] text-white hover:border-[#F5C518]/30 hover:text-[#F5C518] hover:bg-[#F5C518]/5"
                }`}
              >
                Anfragen
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
