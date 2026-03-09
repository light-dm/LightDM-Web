"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TechStackProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

const technologies = [
  { num: "01", name: "NEXT.JS", icon: "N" },
  { num: "02", name: "REACT", icon: "R" },
  { num: "03", name: "FIGMA", icon: "F" },
  { num: "04", name: "WORDPRESS", icon: "W" },
  { num: "05", name: "TAILWIND", icon: "T" },
];

export function TechStack({ setRef }: TechStackProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section ref={setRef("tech-stack")} id="tech-stack" className="py-16 md:py-24 relative">
      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-lg text-white/50"
          >
            Tech Stack
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            >
              <span className="text-white">Unser </span>
              <span className="text-gradient">Tech</span>
              <span className="text-white"> Stack</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative h-48 md:h-64 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4 md:p-6 flex flex-col justify-between cursor-pointer group hover:border-[#F5C518]/20 hover:bg-white/[0.04] transition-all"
            >
              <span className="text-white/30 text-[10px] md:text-xs font-mono relative z-10">{tech.num}</span>
              
              <div className="flex-1 flex items-center justify-center relative z-10">
                <motion.div 
                  className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl md:text-4xl font-bold text-white/30 group-hover:text-[#F5C518] group-hover:border-[#F5C518]/20 group-hover:bg-[#F5C518]/5 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {tech.icon}
                </motion.div>
              </div>
              
              <h3 className="text-center text-xs md:text-base font-bold text-white/60 group-hover:text-white transition-colors relative z-10">
                {tech.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
