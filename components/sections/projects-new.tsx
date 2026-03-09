"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectsProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

const projectsData = [
  {
    num: "01",
    slug: "allgemeinmedizin-alsterdorf",
    title: "Allgemeinmedizin Alsterdorf",
    subtitle: "Full Service 2026",
    year: 2026,
    description: "Ganzheitliches Projekt von der Markenentwicklung bis zur fertigen Website. Logo-Design, Corporate Identity und moderne Website.",
    tags: ["Branding", "WordPress"],
    image: "https://api.microlink.io/?url=https://allgemeinmedizin-alsterdorf.de&screenshot=true&meta=false&embed=screenshot.url",
    highlight: "Neues Projekt 2026"
  },
  {
    num: "02",
    slug: "aromacleansolutions",
    title: "AromaCleanSolutions",
    subtitle: "Branding & WordPress 2025",
    year: 2025,
    description: "Komplettes Branding und WordPress-Website: Logo, Corporate Identity und moderner Webauftritt für Reinigungsservice.",
    tags: ["Branding", "WordPress", "Logo"],
    image: "/images/aromaclean-mockup-v2.png",
    highlight: "Projekt 2025"
  },
  {
    num: "03",
    slug: "diversity-konferenz",
    title: "Diversity Konferenz",
    subtitle: "Event Website 2025",
    year: 2025,
    description: "Modernes, barrierefreies Webdesign für die Diversity-Konferenz. Klare Informationsstruktur und optimierte Zugänglichkeit.",
    tags: ["Event", "Accessibility"],
    image: "https://api.microlink.io/?url=https://diversity-konferenz.de&screenshot=true&meta=false&embed=screenshot.url",
    highlight: "Barrierefreies Design"
  }
];

const projects = [...projectsData].sort((a, b) => b.year - a.year);

function AccordionCard({ project, index, isExpanded, onHover, onToggle }: { 
  project: typeof projects[0]; 
  index: number;
  isExpanded: boolean;
  onHover: (index: number | null) => void;
  onToggle: (index: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const handleClick = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && !isExpanded) {
      e.preventDefault();
      onToggle(index);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Link href={`/projekte/${project.slug}`} onClick={handleClick}>
        <motion.div
          className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] cursor-pointer"
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          animate={{
            borderColor: isExpanded ? "rgba(245, 197, 24, 0.3)" : "rgba(255, 255, 255, 0.1)",
          }}
          transition={{ duration: 0.3 }}
          data-testid={`card-project-${index}`}
        >
          <div className="flex flex-col md:flex-row">
            <motion.div 
              className="relative overflow-hidden"
              animate={{
                width: isExpanded ? "100%" : "100%",
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="relative aspect-[16/9] md:aspect-[2.5/1] overflow-hidden"
                animate={{
                  height: isExpanded ? "auto" : "auto",
                }}
              >
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: isExpanded ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"
                  animate={{
                    opacity: isExpanded ? 0.85 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <motion.span 
                    className="text-white/30 text-xs md:text-sm font-mono"
                    animate={{
                      color: isExpanded ? "rgba(245, 197, 24, 0.6)" : "rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {project.num}
                  </motion.span>
                </div>
                
                <motion.div 
                  className="absolute top-4 right-4 md:top-6 md:right-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    scale: isExpanded ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F5C518] flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#1a1918]" />
                  </div>
                </motion.div>
                
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <motion.span 
                        className="px-3 py-1 text-[10px] md:text-xs uppercase tracking-wider rounded-full bg-[#F5C518] text-[#1a1918] font-semibold"
                        animate={{
                          backgroundColor: isExpanded ? "#F5C518" : "rgba(245, 197, 24, 0.9)",
                        }}
                      >
                        {project.highlight}
                      </motion.span>
                    </div>
                    
                    <motion.h3 
                      className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
                      animate={{
                        color: isExpanded ? "#F5C518" : "#ffffff",
                      }}
                      transition={{ duration: 0.3 }}
                      data-testid={`text-project-title-${index}`}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-white/50 text-sm md:text-base"
                      animate={{
                        y: isExpanded ? 0 : 0,
                        opacity: isExpanded ? 1 : 0.7,
                      }}
                    >
                      {project.subtitle}
                    </motion.p>
                    
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-white/60 text-sm md:text-base leading-relaxed mt-2 max-w-2xl">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="text-[10px] md:text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/20 text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Projects({ setRef }: ProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section ref={setRef("projects")} id="projects" className="py-16 md:py-24 relative">
      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-xs uppercase tracking-[0.2em] mb-4 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/40">
              Portfolio
            </span>
          </motion.div>
          
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            >
              <span className="text-white">Unsere </span>
              <span className="text-gradient">Arbeit in Aktion</span>
            </motion.h2>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          {projects.map((project, index) => (
            <AccordionCard 
              key={index} 
              project={project} 
              index={index}
              isExpanded={hoveredIndex === index}
              onHover={setHoveredIndex}
              onToggle={(i) => setHoveredIndex(prev => prev === i ? null : i)}
            />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/projekte">
            <motion.button 
              className="group px-6 md:px-8 py-3 md:py-4 border border-white/20 bg-white/5 text-white rounded-full text-sm uppercase tracking-wider transition-all hover:border-[#F5C518] hover:text-[#F5C518] flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Alle Projekte ansehen
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
