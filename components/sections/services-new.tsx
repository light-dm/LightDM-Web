"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ServicesProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

function WebDesignMockup() {
  return (
    <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <div className="ml-2 flex-1 h-5 rounded bg-white/5 flex items-center px-2">
          <span className="text-[8px] text-white/30">yourwebsite.de</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-16 rounded-lg bg-gradient-to-r from-[#F5C518]/20 to-[#E6A800]/10 flex items-center justify-center">
          <div className="text-[#F5C518] text-xs font-medium">
            Hero Section
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 rounded bg-white/5" />
          <div className="h-8 rounded bg-white/5" />
          <div className="h-8 rounded bg-white/5" />
        </div>
        <div className="flex gap-2">
          <div className="h-12 flex-1 rounded bg-white/[0.03]" />
          <div className="h-12 w-20 rounded bg-[#F5C518]/20 flex items-center justify-center">
            <span className="text-[8px] text-[#F5C518]">CTA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandingMockup() {
  return (
    <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-4 flex flex-col items-center justify-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#F5C518] to-[#E6A800] flex items-center justify-center mb-4 shadow-lg shadow-[#F5C518]/20">
        <span className="text-[#0d0d0c] text-2xl md:text-3xl font-bold">L</span>
      </div>
      <div className="flex gap-3 mb-3">
        <div className="w-6 h-6 rounded-full bg-[#F5C518]" />
        <div className="w-6 h-6 rounded-full bg-[#FFD700]" />
        <div className="w-6 h-6 rounded-full bg-[#E6A800]" />
        <div className="w-6 h-6 rounded-full bg-white/20" />
      </div>
      <div className="flex gap-2">
        <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/40">Aa</span>
        <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/40 font-bold">Aa</span>
      </div>
    </div>
  );
}

function ITServicesMockup() {
  return (
    <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-white/40 uppercase tracking-wider">System Status</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[10px] text-green-400">Online</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-white/60">Server</span>
          <div className="flex items-center gap-1">
            <div className="h-1.5 bg-[#F5C518]/60 rounded w-[70%]" />
            <span className="text-[9px] text-white/40">72%</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-white/60">Netzwerk</span>
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-16 bg-green-400/60 rounded" />
            <span className="text-[9px] text-white/40">98%</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-white/60">Backup</span>
          <span className="text-[9px] text-[#F5C518]">Aktiv</span>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#F5C518]/30 border-t-[#F5C518] rounded-full"
        />
      </div>
    </div>
  );
}

const services = [
  { 
    title: "WEBDESIGN", 
    description: "Landing-Pages, E-Commerce, CMS-Systeme und Corporate Websites die konvertieren.",
    features: ["UI/UX Design", "Responsive", "SEO-optimiert", "Schnelle Ladezeiten"],
    Mockup: WebDesignMockup
  },
  { 
    title: "BRANDING", 
    description: "Logo-Design, Visual Identity und Brand Guidelines für einen starken Auftritt.",
    features: ["Logo Design", "Corporate Design", "Brand Strategy", "Style Guides"],
    Mockup: BrandingMockup
  },
  { 
    title: "IT-SERVICES", 
    description: "Netzwerk, Server-Management und IT-Beratung für optimale Infrastruktur.",
    features: ["Netzwerk", "Server", "Cloud", "Support"],
    Mockup: ITServicesMockup
  }
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { Mockup } = service;
  
  return (
    <div
      className="group relative rounded-2xl md:rounded-3xl border transition-all border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:border-[#F5C518]/20 overflow-hidden"
      data-testid={`service-item-${index}`}
    >
      <div className="p-4 md:p-6">
        <Mockup />
      </div>
      
      <div className="p-5 md:p-8 pt-0">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-white">
          {service.title}
        </h3>
        
        <p className="text-sm md:text-base leading-relaxed mb-4 text-white/50">
          {service.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature, i) => (
            <span 
              key={i}
              className="text-[10px] md:text-xs uppercase tracking-wider px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-full border text-white/60 border-white/10 bg-white/[0.02] group-hover:border-[#F5C518]/20 transition-colors"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Services({ setRef }: ServicesProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section ref={setRef("services")} id="services" className="py-16 md:py-24 relative">
      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-lg text-white/50"
          >
            Unsere Lösungen
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            >
              <span className="text-white">Maßgeschneiderte </span>
              <span className="text-gradient">Lösungen</span>
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 md:mt-6 text-base md:text-lg text-white/40"
          >
            Wir eliminieren ineffiziente Prozesse, optimieren Ihren Auftritt und helfen Ihrem Unternehmen zu wachsen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
