"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FeaturesProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

const features = [
  {
    title: "Blitzschnelle Ladezeiten",
    description: "Optimierte Performance für maximale Conversion. Ihre Website lädt in unter 2 Sekunden.",
    visual: "Ladezeit: 0.8s"
  },
  {
    title: "24/7 IT-Support",
    description: "Professioneller Remote-Support für Ihr Unternehmen. Wir sind immer für Sie da.",
    visual: "Wie kann ich helfen?"
  }
];

export function Features({ setRef }: FeaturesProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section ref={setRef("features")} id="features" className="py-16 md:py-24 relative">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden min-h-[300px] md:min-h-[400px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {index === 0 ? (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#F5C518]/20 via-[#7C3AED]/20 to-[#F5C518]/20 rounded-2xl blur-xl" />
                        <div className="relative px-6 py-3 rounded-xl border border-[#7C3AED]/50 bg-black/40 backdrop-blur-xl">
                          <span className="text-white text-sm md:text-base">{feature.visual}</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#F5C518] rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <div className="relative w-full max-w-xs">
                        <div className="absolute -inset-4 bg-gradient-to-br from-[#F5C518]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
                        <div className="relative p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5C518] to-[#7C3AED]" />
                            <span className="text-white/80 text-sm">{feature.visual}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5">
                            <span className="text-white/40 text-xs">Write message...</span>
                            <div className="ml-auto w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                              <span className="text-white/40 text-xs">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
                
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-white/50">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
