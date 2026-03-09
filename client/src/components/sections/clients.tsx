import { motion } from "framer-motion";

type SectionTheme = "dark" | "light";

interface ClientsProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
  currentTheme: SectionTheme;
}

const clients = [
  { name: "Score4Impact", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3a035209fcd798cfe1_Score4Impact_Logo_RGB.png" },
  { name: "PRR Service", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3b8532ebf4e613bfc7_prrservice-logo-Horizontal-1.png" },
  { name: "Enso", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3bbbbbc2e9ce6afb1c_enso-logo-Transparent-Kopie-1.png" },
  { name: "Element", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3bbbbbc2e9ce6afb19_Element-1logo-300ppi-1.png" },
  { name: "Loco Sushi", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3b8a26a1778cfea6cb_cropped-Loco_Sushi_Logo-1.png" },
  { name: "Neon", logo: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85e9c/6746df3bc8e148cb3f863d35_Element-74bg-neon-1.png" },
];

export function Clients({ setRef, currentTheme }: ClientsProps) {
  const mutedColor = currentTheme === "dark" ? "text-white/40" : "text-black/40";
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";

  return (
    <section ref={setRef("clients")} id="clients" className="py-20">
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-12">
          <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-700 ${mutedColor}`}>Sec.</span>
          <span className="text-[#eedea0]">/●</span>
          <span className={`text-sm uppercase tracking-wide transition-colors duration-700 ${textColor}`}>Kooperationen</span>
        </div>
        
        <div className="overflow-hidden">
          <motion.div 
            className="flex gap-12 md:gap-16"
            animate={{ x: [0, -1200] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...clients, ...clients].map((client, i) => (
              <div 
                key={i} 
                className={`flex-shrink-0 h-8 md:h-10 flex items-center transition-opacity duration-500 ${currentTheme === "dark" ? "opacity-50 hover:opacity-100 invert" : "opacity-40 hover:opacity-80"}`}
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
