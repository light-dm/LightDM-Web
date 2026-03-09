"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Check, Settings, Puzzle, Headphones } from "lucide-react";

interface AboutProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(eased * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);
  
  return <span ref={ref}>{displayValue}{suffix}</span>;
}

function AnimatedCheckIcon() {
  return (
    <div className="relative w-8 h-8 md:w-10 md:h-10">
      <div className="absolute inset-0 rounded-full bg-[#F5C518]/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Check className="w-5 h-5 md:w-6 md:h-6 text-[#F5C518]" strokeWidth={3} />
      </div>
    </div>
  );
}

function AnimatedGearIcon() {
  return (
    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      <Settings className="w-6 h-6 md:w-8 md:h-8 text-[#F5C518]" />
    </div>
  );
}

function AnimatedPuzzleIcon() {
  return (
    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      <Puzzle className="w-6 h-6 md:w-8 md:h-8 text-[#F5C518]" />
    </div>
  );
}

function AnimatedSupportIcon() {
  return (
    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      <Headphones className="w-6 h-6 md:w-8 md:h-8 text-[#F5C518]" />
    </div>
  );
}

const stats = [
  { value: 40, suffix: "+", label: "Projekte umgesetzt" },
  { value: 98, suffix: "%", label: "Kundenzufriedenheit" },
  { value: 5, suffix: "+", label: "Jahre Erfahrung" },
  { value: 24, suffix: "/7", label: "Support verfügbar" }
];

const features = [
  { 
    title: "Bewährte Ergebnisse", 
    description: "Nachweisliche Erfolge bei über 40 Projekten", 
    label: "Ergebnisse",
    Icon: AnimatedCheckIcon
  },
  { 
    title: "Nahtlose Integration", 
    description: "Funktioniert mit Ihren bestehenden Tools", 
    label: "Integration",
    Icon: AnimatedGearIcon
  },
  { 
    title: "Maßgeschneidert", 
    description: "Individuelle Lösungen für Ihre Anforderungen", 
    label: "Individuell",
    Icon: AnimatedPuzzleIcon
  },
  { 
    title: "Fortlaufender Support", 
    description: "Wir sorgen für reibungslosen Betrieb", 
    label: "Support",
    Icon: AnimatedSupportIcon
  }
];

export function About({ setRef }: AboutProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section ref={setRef("about")} id="about" className="py-16 md:py-24 relative">
      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-lg text-white/50"
          >
            Warum wir
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            >
              <span className="text-white">Warum Top-Marken </span>
              <span className="text-gradient">uns vertrauen</span>
            </motion.h2>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20">
          {features.map((feature, i) => {
            const IconComponent = feature.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileTap={{ scale: 0.98 }}
                className="p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/15 transition-all group"
              >
                <div className="text-[8px] md:text-[10px] uppercase tracking-widest mb-3 md:mb-4 text-white/30">
                  {feature.label}
                </div>
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-[#F5C518]/10 group-hover:border-[#F5C518]/20 transition-all">
                  <IconComponent />
                </div>
                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-white">{feature.title}</h3>
                <p className="text-xs md:text-sm text-white/40">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-12 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-1 md:mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
