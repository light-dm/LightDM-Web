"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialsProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "LIGHT DM hat unsere Conversion-Rate um 40% gesteigert. Die Zusammenarbeit war von Anfang an professionell und ergebnisorientiert.",
    name: "Michael Krause",
    role: "CEO",
    company: "Score4Impact",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Professionelle Arbeit und exzellente Ergebnisse. Das Team versteht es, komplexe Anforderungen in elegante Lösungen zu verwandeln.",
    name: "Sarah Meier",
    role: "Marketing Director",
    company: "MowoMind",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Zuverlässig, kreativ und immer termingerecht. Unsere neue Website hat unsere Erwartungen übertroffen.",
    name: "Thomas Huber",
    role: "Geschäftsführer",
    company: "PRR Service",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Die IT-Betreuung ist erstklassig. Schnelle Reaktionszeiten und kompetente Beratung - genau was wir brauchten.",
    name: "Lisa Wagner",
    role: "Operations Manager",
    company: "Enso Digital",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  })
};

export function Testimonials({ setRef }: TestimonialsProps) {
  const [[current, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  
  const paginate = useCallback((newDirection: number) => {
    setPage(([prev]) => {
      const next = (prev + newDirection + testimonials.length) % testimonials.length;
      return [next, newDirection];
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setPage(([prev]) => {
      const direction = index > prev ? 1 : -1;
      return [index, direction];
    });
  }, []);
  
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]);

  const handleInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  
  return (
    <section ref={setRef("testimonials")} id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-lg text-white/50"
          >
            Kundenstimmen
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              <span className="text-white">Was unsere Kunden </span>
              <span className="text-gradient">sagen</span>
            </motion.h2>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#F5C518]/10 flex items-center justify-center">
            <Quote className="w-5 h-5 md:w-6 md:h-6 text-[#F5C518]" />
          </div>
          
          <div className="relative min-h-[220px] md:min-h-[200px] flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                className="absolute w-full text-center px-4 md:px-12"
              >
                <p className="text-base md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6 md:mb-8 font-light italic">
                  "{testimonials[current].quote}"
                </p>
                
                <div className="flex items-center justify-center gap-3 md:gap-4">
                  {testimonials[current].image && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative"
                    >
                      <img 
                        src={testimonials[current].image} 
                        alt={testimonials[current].name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#F5C518]/30"
                      />
                      <div className="absolute inset-0 rounded-full ring-2 ring-[#F5C518]/20 ring-offset-2 ring-offset-[#0d0d0c]" />
                    </motion.div>
                  )}
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm md:text-base">
                      {testimonials[current].name}
                    </div>
                    <div className="text-white/40 text-xs md:text-sm">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-6 md:mt-8">
            <motion.button
              onClick={() => { handleInteraction(); paginate(-1); }}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-[#F5C518] hover:border-[#F5C518]/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Vorheriges Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { handleInteraction(); goTo(i); }}
                  className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: i === current ? 32 : 8 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Gehe zu Testimonial ${i + 1}`}
                >
                  <div className={`absolute inset-0 transition-colors duration-300 ${
                    i === current ? "bg-[#F5C518]" : "bg-white/20 hover:bg-white/30"
                  }`} />
                  {i === current && isAutoPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-[#F5C518]/50"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      key={`progress-${current}`}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            <motion.button
              onClick={() => { handleInteraction(); paginate(1); }}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-[#F5C518] hover:border-[#F5C518]/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Nächstes Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
