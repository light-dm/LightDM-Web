import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type SectionTheme = "dark" | "light";

interface HeroProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
  currentTheme: SectionTheme;
}

export function Hero({ setRef, currentTheme }: HeroProps) {
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";

  return (
    <section 
      ref={setRef("hero")}
      id="hero"
      className="min-h-screen flex items-end pb-16 md:pb-24 pt-32 overflow-hidden"
    >
      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[12vw] sm:text-[10vw] lg:text-[5vw] leading-[0.95] font-bold tracking-tight text-[#eedea0]">
              SMART<br/>
              GEPLANT.
            </h1>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[12vw] sm:text-[10vw] lg:text-[5vw] leading-[0.95] font-bold tracking-tight text-[#eedea0] mb-8 lg:mb-12">
              <span className="inline-block w-[0.5em] h-[0.5em] rounded-full bg-[#eedea0] mr-1 align-middle"></span>UNVERGESSLICH<br/>
              IM ERGEBNIS.
            </h2>
            
            <p className={`text-base md:text-lg leading-relaxed max-w-md mb-8 transition-colors duration-700 ${currentTheme === "dark" ? "text-white/60" : "text-black/60"}`}>
              Wir bringen Marken in den kulturellen Dialog und schaffen Verbindungen durch gemeinsame Werte.
            </p>
            
            <Button 
              variant="outline" 
              className={`rounded-full h-11 px-6 text-sm font-medium transition-colors duration-500 ${currentTheme === "dark" ? "border-white/30 text-white hover:bg-white hover:text-black" : "border-black/30 text-black hover:bg-black hover:text-white"}`}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Projekt Starten
            </Button>
          </motion.div>

        </div>
        
        {/* Bottom info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`mt-16 pt-8 border-t flex justify-between items-center text-xs uppercase tracking-widest transition-colors duration-700 ${currentTheme === "dark" ? "border-white/10 text-white/30" : "border-black/10 text-black/30"}`}
        >
          <span>L.DM 2019 —</span>
          <span className="hidden sm:block">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
