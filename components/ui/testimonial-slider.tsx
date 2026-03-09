"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Conversion-Rate um 40% gesteigert",
    name: "Michael K.",
    role: "CEO"
  },
  {
    quote: "Professionelle Arbeit, exzellente Ergebnisse",
    name: "Sarah M.",
    role: "Marketing"
  },
  {
    quote: "Zuverlässig, kreativ und termingerecht",
    name: "Thomas H.",
    role: "Geschäftsführer"
  }
];

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative mb-4 md:mb-6">
      <div className="py-4 md:py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center"
          >
            <div className="flex items-center gap-2 text-white/70 text-sm md:text-base">
              <span className="text-[#F5C518] font-medium">"</span>
              <span className="font-medium">{testimonials[current].quote}</span>
              <span className="text-[#F5C518] font-medium">"</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] md:text-sm">
              <span className="hidden sm:inline">—</span>
              <span>{testimonials[current].name}</span>
              <span className="text-white/20">·</span>
              <span className="text-white/30">{testimonials[current].role}</span>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#F5C518] w-6" : "bg-white/20 hover:bg-white/30 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
