"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Puzzle, Headphones } from "lucide-react";

interface StickyPillarsProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

const pillars = [
  {
    num: "1",
    title: "Schnell",
    description: "Blitzschnelle Websites mit optimierten Ladezeiten. Wir entwickeln Lösungen, die Nutzer nicht warten lassen und Google liebt.",
    icon: Zap,
  },
  {
    num: "2", 
    title: "Sicher",
    description: "Modernste Sicherheitsstandards von Anfang an. SSL, sichere Datenübertragung und regelmäßige Updates gehören zum Standard.",
    icon: Shield,
  },
  {
    num: "3",
    title: "Flexibel",
    description: "Keine Lösung von der Stange. Jedes Projekt wird individuell auf Ihre Anforderungen und Ziele zugeschnitten.",
    icon: Puzzle,
  },
  {
    num: "4",
    title: "Support",
    description: "Persönlicher Ansprechpartner und schnelle Reaktionszeiten. Wir sind für Sie da, wenn Sie uns brauchen.",
    icon: Headphones,
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-10% 0px -10% 0px" });
  
  const Icon = pillar.icon;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.span 
        className="text-[80px] md:text-[120px] lg:text-[160px] font-bold text-white/[0.03] absolute -top-4 md:-top-8 left-0 leading-none select-none pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
      >
        ({pillar.num})
      </motion.span>
      
      <div className="pt-16 md:pt-24 lg:pt-32">
        <motion.div 
          className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#F5C518] to-[#E6A800] flex items-center justify-center mb-5 shadow-lg shadow-[#F5C518]/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
        >
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#1a1918]" />
        </motion.div>
        
        <motion.h3 
          className="text-xl md:text-2xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.15 }}
        >
          {pillar.title}
        </motion.h3>
        
        <motion.p 
          className="text-white/50 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {pillar.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function StickyPillars({ setRef }: StickyPillarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section ref={setRef("pillars")} id="pillars" className="relative py-20 md:py-32">
      <div ref={containerRef} className="container-custom">
        <div 
          ref={headerRef} 
          className="text-center mb-16 md:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white/40"
          >
            Unsere Werte
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              <span className="text-white">Was uns </span>
              <span className="text-gradient">antreibt</span>
            </motion.h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.num} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
