"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface FAQProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

const faqs = [
  {
    question: "Wie kann digitales Marketing meinem Unternehmen helfen?",
    answer: "Wir bieten umfassende digitale Lösungen von Webdesign über Branding bis hin zu IT-Services. Unser Ziel ist es, Unternehmen dabei zu helfen, ihre Online-Präsenz zu stärken und mehr Kunden zu gewinnen."
  },
  {
    question: "Ist die Integration in bestehende Systeme schwierig?",
    answer: "Nein. Wir gestalten unsere Lösungen so, dass sie nahtlos in Ihre bestehenden Tools und Workflows integriert werden können. Ob CRM, ERP oder individuelle Systeme - wir passen die Integration reibungslos an."
  },
  {
    question: "Welche Branchen können von Ihren Dienstleistungen profitieren?",
    answer: "Wir arbeiten branchenübergreifend - von Startups über Mittelständler bis hin zu etablierten Unternehmen in Tech, Finance, E-Commerce und mehr. Unsere Lösungen sind individuell auf Ihre Bedürfnisse zugeschnitten."
  },
  {
    question: "Was unterscheidet Ihre Preispläne?",
    answer: "Unsere Pakete sind auf unterschiedliche Bedürfnisse zugeschnitten: IT-Services für laufende Betreuung, Webdesign für Einzelprojekte, und individuelle Lösungen für komplexe Anforderungen. Jedes Paket ist transparent kalkuliert."
  },
  {
    question: "Wie lange dauert die Umsetzung eines Projekts?",
    answer: "Die Dauer hängt vom Projektumfang ab. Eine einfache Website kann in 2-4 Wochen umgesetzt werden, während komplexere Projekte wie Rebranding oder App-Entwicklung mehrere Monate dauern können."
  },
  {
    question: "Bieten Sie auch laufenden Support an?",
    answer: "Ja! Wir bieten umfassenden Support nach Projektabschluss. Von regelmäßigen Updates über Content-Management bis hin zu technischem Support - wir sind für Sie da."
  }
];

function FAQItem({ faq, index, isOpen, onClick }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`border rounded-2xl md:rounded-3xl backdrop-blur-sm transition-all ${
        isOpen 
          ? "border-[#F5C518]/20 bg-white/[0.04]" 
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.03]"
      }`}
    >
      <motion.button
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className="w-full p-4 md:py-6 md:px-6 flex items-start justify-between gap-4 text-left group"
      >
        <h3 className={`text-base md:text-xl font-medium transition-colors ${
          isOpen ? "text-[#F5C518]" : "text-white group-hover:text-[#F5C518]"
        }`}>
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 border transition-all ${
            isOpen 
              ? "bg-[#F5C518]/10 border-[#F5C518]/30 text-[#F5C518]" 
              : "bg-white/[0.03] border-white/10 text-white/40 group-hover:border-[#F5C518]/20"
          }`}
        >
          <span className="text-lg md:text-xl">+</span>
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 md:pb-6 md:px-6 text-sm md:text-base text-white/50 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ({ setRef }: FAQProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={setRef("faq")} id="faq" className="py-16 md:py-24 relative">
      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-lg text-white/50"
          >
            FAQ
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            >
              <span className="text-white">Häufig gestellte </span>
              <span className="text-gradient">Fragen</span>
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 md:mt-6 text-base md:text-lg text-white/40"
          >
            Antworten auf die wichtigsten Fragen zu unseren Dienstleistungen.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
