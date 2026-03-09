import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ChevronDown } from "lucide-react";

const stats = [
  { label: "MITARBEITER", value: "10+", description: "Ein engagiertes Team aus Designern, Entwicklern und Strategen." },
  { label: "PROJEKTE", value: "40+", description: "Erfolgreich abgeschlossene Projekte für verschiedenste Branchen." },
  { label: "JAHRE", value: "5+", description: "Seit 2019 entwickeln wir digitale Lösungen, die wirken." },
  { label: "ZUFRIEDENHEIT", value: "98%", description: "Unsere Kunden schätzen unsere Arbeitsweise." },
  { label: "SERVICES", value: "03", description: "Webdesign. Branding. IT-Services. Alles aus einer Hand." },
  { label: "FOKUS", value: "100%", description: "Volle Konzentration auf jedes einzelne Projekt." },
];

const capabilities = [
  {
    title: "WEBDESIGN & ENTWICKLUNG",
    items: [
      "Marktanalyse & Wettbewerbsrecherche",
      "User Research & Zielgruppenanalyse",
      "UX-/UI-Design",
      "Design Systems & Guidelines",
      "Responsive Website Design",
      "Full-Stack Development",
      "CMS-Integration",
      "E-Commerce & Onlineshops",
      "Performance-Optimierung",
    ]
  },
  {
    title: "BRANDING & IDENTITÄT",
    items: [
      "Markenstrategie & Positionierung",
      "Logo-Entwicklung",
      "Visuelle Identität",
      "Farb- & Typografie-Konzepte",
      "Brand Guidelines",
      "Grafik Design",
      "Art Direction",
    ]
  }
];

const team = [
  { name: "ALEX MEYER", role: "Design Director" },
  { name: "SARAH SCHMIDT", role: "Tech Lead" },
  { name: "JONAS WEBER", role: "Strategy" },
  { name: "LISA BRAUN", role: "Development" },
  { name: "MAX HOFFMANN", role: "Founder" },
];

type SectionTheme = "dark" | "light";

interface Section {
  id: string;
  theme: SectionTheme;
}

const sections: Section[] = [
  { id: "hero", theme: "dark" },
  { id: "tagline", theme: "light" },
  { id: "snapshot", theme: "light" },
  { id: "capabilities", theme: "light" },
  { id: "awards", theme: "dark" },
  { id: "team", theme: "light" },
];

export default function About() {
  const [currentTheme, setCurrentTheme] = useState<SectionTheme>("dark");
  const [openCapability, setOpenCapability] = useState<number | null>(0);
  const observerRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = observerRefs.current.get(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setCurrentTheme(section.theme);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      observerRefs.current.set(id, el);
    }
  };

  const bgColor = currentTheme === "dark" ? "bg-[#1a1918]" : "bg-[#F4F4F4]";
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";

  return (
    <SmoothScroll>
      <div className={`min-h-screen font-sans selection:bg-[#eedea0] selection:text-black transition-colors duration-700 ease-out ${bgColor}`}>
        <Navbar isDarkTheme={currentTheme === "dark"} />
        
        <main>
          {/* Hero Section */}
          <section 
            ref={setRef("hero")} 
            id="hero"
            className="min-h-screen flex items-center relative overflow-hidden"
          >
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                
                {/* Left Column */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-[11vw] lg:text-[5.5vw] leading-[0.95] font-bold tracking-tight text-[#eedea0]">
                    WIR SETZEN<br/>
                    VISIONEN IN<br/>
                    REALITÄT
                  </h1>
                </motion.div>

                {/* Right Column */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:pt-8"
                >
                  <h2 className="text-[11vw] lg:text-[5.5vw] leading-[0.95] font-bold tracking-tight text-[#eedea0] mb-12">
                    <span className="inline-block w-[0.7em] h-[0.7em] rounded-full bg-[#eedea0] mr-2 align-middle"></span>UND<br/>
                    GESTALTEN<br/>
                    ZUKUNFT
                  </h2>
                  
                  <p className={`text-lg lg:text-xl leading-relaxed max-w-lg transition-colors duration-700 ${currentTheme === "dark" ? "text-white/70" : "text-black/70"}`}>
                    <span className="text-[#eedea0] font-bold">LIGHT</span><sup className="text-xs">DM</sup> ist ein kreatives Studio für IT-Beratung, Webdesign und Innovation. Wir gestalten Lösungen, die Marken stärken, Prozesse optimieren und Menschen verbinden — klar, effizient und nachhaltig.
                  </p>
                </motion.div>

              </div>
            </div>

            {/* Year indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className={`absolute bottom-12 right-12 text-xs uppercase tracking-widest hidden lg:block transition-colors duration-700 ${currentTheme === "dark" ? "text-white/30" : "text-black/30"}`}
            >
              LIGHT DM, INC 19 - 26©
            </motion.div>
          </section>

          {/* Tagline */}
          <section 
            ref={setRef("tagline")} 
            id="tagline"
            className="py-32"
          >
            <div className="container-custom">
              <p className={`text-2xl md:text-4xl lg:text-5xl font-light leading-tight transition-colors duration-700`}>
                <span className={currentTheme === "dark" ? "text-white/30" : "text-black/30"}>KLAR ZU VERSTEHEN.</span><br/>
                <span className={`font-medium ${textColor}`}>UNMÖGLICH ZU IGNORIEREN.</span>™
              </p>
            </div>
          </section>

          {/* Agency Snapshot */}
          <section 
            ref={setRef("snapshot")} 
            id="snapshot"
            className="py-24"
          >
            <div className="container-custom">
              <div className="flex items-center gap-4 mb-16">
                <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 ${currentTheme === "dark" ? "text-white/40" : "text-black/40"}`}>SEC.</span>
                <span className="text-[#eedea0] text-lg">/●</span>
                <h2 className={`text-lg font-medium uppercase tracking-wide transition-colors duration-700 ${textColor}`}>STUDIO SNAPSHOT</h2>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px transition-colors duration-700 ${currentTheme === "dark" ? "bg-white/10" : "bg-black/10"}`}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-10 transition-colors duration-700 ${currentTheme === "dark" ? "bg-[#1a1918] hover:bg-[#252423]" : "bg-[#F4F4F4] hover:bg-white"}`}
                  >
                    <div className={`text-[10px] uppercase tracking-[0.2em] mb-6 transition-colors duration-700 ${currentTheme === "dark" ? "text-white/40" : "text-black/40"}`}>{stat.label}</div>
                    <div className={`text-5xl lg:text-6xl font-bold mb-4 tracking-tight transition-colors duration-700 ${textColor}`}>{stat.value}</div>
                    <p className={`text-sm leading-relaxed transition-colors duration-700 ${currentTheme === "dark" ? "text-white/50" : "text-black/50"}`}>{stat.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Capabilities */}
          <section 
            ref={setRef("capabilities")} 
            id="capabilities"
            className="py-24"
          >
            <div className="container-custom">
              <div className="flex items-center gap-4 mb-16">
                <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 ${currentTheme === "dark" ? "text-white/40" : "text-black/40"}`}>SEC.</span>
                <span className="text-[#eedea0] text-lg">/●</span>
                <h2 className={`text-lg font-medium uppercase tracking-wide transition-colors duration-700 ${textColor}`}>LEISTUNGEN</h2>
              </div>

              <div className={`border-t transition-colors duration-700 ${currentTheme === "dark" ? "border-white/10" : "border-black/10"}`}>
                {capabilities.map((cap, index) => (
                  <div key={index} className={`border-b transition-colors duration-700 ${currentTheme === "dark" ? "border-white/10" : "border-black/10"}`}>
                    <button
                      onClick={() => setOpenCapability(openCapability === index ? null : index)}
                      className="w-full py-8 flex items-center justify-between text-left group"
                    >
                      <h3 className={`text-xl lg:text-2xl font-medium tracking-tight group-hover:text-[#eedea0] transition-colors duration-300 ${textColor}`}>{cap.title}</h3>
                      <ChevronDown className={`w-5 h-5 transition-all duration-300 ${textColor} ${openCapability === index ? "rotate-180" : ""}`} />
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: openCapability === index ? "auto" : 0, 
                        opacity: openCapability === index ? 1 : 0 
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3">
                        {cap.items.map((item, i) => (
                          <div key={i} className={`text-sm py-2 border-b transition-colors duration-700 ${currentTheme === "dark" ? "text-white/50 border-white/5" : "text-black/50 border-black/5"}`}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Awards */}
          <section 
            ref={setRef("awards")} 
            id="awards"
            className="py-24"
          >
            <div className="container-custom">
              <div className="flex items-center gap-4 mb-16">
                <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 ${currentTheme === "dark" ? "text-white/40" : "text-black/40"}`}>SEC.</span>
                <span className="text-[#eedea0] text-lg">/●</span>
                <h2 className={`text-lg font-medium uppercase tracking-wide transition-colors duration-700 ${textColor}`}>AUSZEICHNUNGEN</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                {[
                  { name: "Awwwards", count: "05" },
                  { name: "CSS Design Awards", count: "03" },
                  { name: "FWA", count: "02" },
                  { name: "Webby Honoree", count: "01" },
                ].map((award, i) => (
                  <div key={i} className={`border-l pl-6 transition-colors duration-700 ${currentTheme === "dark" ? "border-white/10" : "border-black/10"}`}>
                    <div className="text-4xl lg:text-5xl font-bold text-[#eedea0] mb-2 tracking-tight">{award.count}</div>
                    <div className={`text-xs uppercase tracking-widest transition-colors duration-700 ${currentTheme === "dark" ? "text-white/40" : "text-black/40"}`}>{award.name}</div>
                  </div>
                ))}
              </div>

              <p className={`text-xl lg:text-3xl font-light max-w-2xl leading-relaxed transition-colors duration-700`}>
                <span className={currentTheme === "dark" ? "text-white/30" : "text-black/30"}>STANDARDS SETZEN,</span><br/>
                <span className={currentTheme === "dark" ? "text-white/60" : "text-black/60"}>DIE ANDERE BEFOLGEN.</span>
              </p>
            </div>
          </section>

          {/* Team */}
          <section 
            ref={setRef("team")} 
            id="team"
            className="py-24"
          >
            <div className="container-custom">
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 ${currentTheme === "dark" ? "text-white/40" : "text-black/40"}`}>SEC.</span>
                <span className="text-[#eedea0] text-lg">/●</span>
                <h2 className={`text-lg font-medium uppercase tracking-wide transition-colors duration-700 ${textColor}`}>TEAM & FÜHRUNG</h2>
              </div>
              
              <p className={`text-lg max-w-2xl mb-16 leading-relaxed transition-colors duration-700 ${currentTheme === "dark" ? "text-white/50" : "text-black/50"}`}>
                Wir sind ein kleines, aber feines Team. Handwerk, Service und Effizienz treiben uns an.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {team.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-[#eedea0]/40 to-[#eedea0]/10 mb-4 relative overflow-hidden transition-all duration-500 group-hover:from-[#eedea0]/60 group-hover:to-[#eedea0]/30">
                      <div className="absolute bottom-4 left-4">
                        <div className={`text-[10px] font-mono tracking-widest transition-colors duration-700 ${currentTheme === "dark" ? "text-white/20" : "text-black/20"}`}>00{i+1}</div>
                      </div>
                    </div>
                    <h3 className={`text-sm font-medium tracking-wide transition-colors duration-700 ${textColor}`}>{member.name}</h3>
                    <p className={`text-xs uppercase tracking-widest transition-colors duration-700 ${currentTheme === "dark" ? "text-white/40" : "text-black/40"}`}>{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
