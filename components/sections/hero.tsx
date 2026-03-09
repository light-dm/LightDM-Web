"use client";

import { motion } from "framer-motion";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";

interface HeroProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
  isLoaded?: boolean;
}

function LineReveal({ children, delay = 0, gradient = false, isLoaded = false }: { children: string; delay?: number; gradient?: boolean; isLoaded?: boolean }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1],
          delay 
        }}
        className={gradient ? "text-[#F5C518]" : ""}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Hero({ setRef, isLoaded = false }: HeroProps) {
  return (
    <section 
      ref={setRef("hero")}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between pt-32 md:pt-44 lg:pt-48 pb-8 md:pb-10 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-20 md:top-24 right-0 md:right-8 lg:right-16 z-0 pointer-events-none hidden md:block"
      >
        <div className="relative">
          <img
            src="/images/logo-symbol.png"
            alt="LIGHT DM"
            className="w-40 sm:w-56 md:w-72 lg:w-[320px] xl:w-[380px] h-auto drop-shadow-[0_0_60px_rgba(245,197,24,0.4)]"
            style={{ filter: 'drop-shadow(0 0 30px rgba(245,197,24,0.3))' }}
          />
          
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#F5C518]/40 via-[#FFD700]/30 to-transparent rounded-full blur-[100px] -z-10 opacity-50"
          />
        </div>
      </motion.div>

      <div className="container-custom flex-1 flex items-center relative z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <span className="text-[#F5C518] text-sm">*</span>
            <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-[0.15em]">Creative Digital Studio</span>
          </motion.div>
          
          <h1 className="text-[8vw] sm:text-[7vw] md:text-[5vw] lg:text-[3.5vw] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-4 md:mb-6">
            <LineReveal delay={0.2} isLoaded={isLoaded}>Verwandeln Sie Ihr</LineReveal>
            <LineReveal delay={0.35} isLoaded={isLoaded}>Business in eine</LineReveal>
            <LineReveal delay={0.5} isLoaded={isLoaded} gradient>digitale Erfolgsmaschine.</LineReveal>
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 md:mt-6 max-w-xl"
          >
            <p className="text-white/50 text-sm md:text-lg leading-relaxed">
              Ihr ergebnisorientierter Partner für <strong className="text-white">Webdesign</strong>, <strong className="text-white">Branding</strong> und <strong className="text-white">IT-Beratung</strong>. 
              Wir optimieren Prozesse, stärken Ihre Marke und beschleunigen Ihr Wachstum.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4"
          >
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#0d0d0c] text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full overflow-hidden shadow-xl shadow-[#F5C518]/25 hover:scale-105 active:scale-95 transition-transform duration-300"
              data-testid="button-start-project"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <span>Kostenloses Gespräch</span>
            </button>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        className="container-custom relative z-10"
      >
        <TestimonialSlider />
        
        <div className="pt-4 md:pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 text-[10px] md:text-xs uppercase tracking-widest text-white/30">
          <div className="flex items-center gap-4 md:gap-6">
            <img
              src="/images/logo-white.png"
              alt="LIGHT DM"
              className="h-4 md:h-5 w-auto opacity-50"
            />
            <span>2019 - 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              v
            </motion.span>
            <span>Scroll</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
