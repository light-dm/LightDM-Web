"use client";

import { motion } from "framer-motion";

interface ClientsProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

const clients = [
  { name: "AromaCleanSolutions", logo: "/images/aromaclean-logo.png", hasDarkText: false },
  { name: "Score4Impact", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3a035209fcd798cfe1_Score4Impact_Logo_RGB.png", hasDarkText: true },
  { name: "PRR Service", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3b8532ebf4e613bfc7_prrservice-logo-Horizontal-1.png", hasDarkText: false },
  { name: "Enso", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3bbbbbc2e9ce6afb1c_enso-logo-Transparent-Kopie-1.png", hasDarkText: false },
  { name: "Element", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3bbbbbc2e9ce6afb19_Element-1logo-300ppi-1.png", hasDarkText: false },
  { name: "Loco Sushi", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3b8a26a1778cfea6cb_cropped-Loco_Sushi_Logo-1.png", hasDarkText: false },
  { name: "Neon", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3bc8e148cb3f863d35_Element-74bg-neon-1.png", hasDarkText: false },
];

export function Clients({ setRef }: ClientsProps) {
  return (
    <section ref={setRef("clients")} id="clients" className="py-12 md:py-16 relative overflow-hidden">
      <div className="overflow-hidden relative z-10">
        <motion.div 
          className="flex gap-12 md:gap-24 will-change-transform"
          animate={{ x: [0, -1200] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 h-8 md:h-12 flex items-center opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 ${client.hasDarkText ? 'brightness-0 invert hover:brightness-100 hover:invert-0' : 'brightness-200 hover:brightness-100'}`}
              data-testid={`client-logo-${i}`}
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-full w-auto object-contain"
                data-testid={`img-client-${i}`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
