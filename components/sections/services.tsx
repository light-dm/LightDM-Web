"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type SectionTheme = "dark" | "light";

interface ServicesProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
  currentTheme: SectionTheme;
}

const services = [
  { 
    title: "Webdesign", 
    description: "Landing-Pages, CMS, E-Commerce, Corporate Design", 
    num: "01" 
  },
  { 
    title: "Branding", 
    description: "Logo, Visual Identity, Brand Guidelines", 
    num: "02" 
  },
  { 
    title: "IT-Services", 
    description: "Network, Server, Firewall, Beratung", 
    num: "03" 
  }
];

export function Services({ setRef, currentTheme }: ServicesProps) {
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";
  const mutedColor = currentTheme === "dark" ? "text-white/40" : "text-black/40";
  const borderColor = currentTheme === "dark" ? "border-white/10" : "border-black/10";
  const accentColor = currentTheme === "dark" ? "text-[#eedea0]" : "text-[#1a1918]";
  const hoverAccent = currentTheme === "dark" ? "hover:text-[#eedea0]" : "hover:text-[#1a1918]";
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section ref={setRef("services")} id="services" className="py-24 md:py-32">
      <div className="container-custom">
        <div className={`mb-12 pb-6 border-b flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 transition-colors duration-700 ${borderColor}`}>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-700 ${mutedColor}`}>Sec.</span>
            <span className={`transition-colors duration-700 ${accentColor}`}>/●</span>
            <div className="overflow-hidden">
              <motion.h2 
                ref={headingRef}
                initial={{ y: "100%" }}
                animate={headingInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`text-2xl md:text-3xl font-bold uppercase tracking-tight transition-colors duration-700 ${textColor}`}
              >
                Leistungen
              </motion.h2>
            </div>
          </div>
          <Link href="/leistungen" className={`text-xs uppercase tracking-widest ${hoverAccent} transition-colors ${mutedColor}`}>
            Alle ansehen
          </Link>
        </div>

        <div>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border-b py-8 md:py-10 grid grid-cols-12 gap-4 items-baseline cursor-pointer transition-colors duration-500 ${borderColor} ${currentTheme === "dark" ? "hover:bg-white/5" : "hover:bg-black/5"}`}
            >
              <div className={`col-span-2 sm:col-span-1 font-mono text-xs transition-colors duration-700 ${mutedColor}`}>{service.num}</div>
              <div className={`col-span-10 sm:col-span-5 text-xl sm:text-2xl md:text-3xl font-medium transition-colors duration-700 ${textColor}`}>{service.title}</div>
              <div className={`col-span-12 sm:col-span-6 text-sm transition-colors duration-700 ${mutedColor}`}>{service.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
