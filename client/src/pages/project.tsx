import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRoute, Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

type SectionTheme = "dark" | "light";

const projectsData: Record<string, {
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  year: string;
  client: string;
  services: string[];
}> = {
  "score4impact": {
    title: "Score 4 Impact",
    category: "Platform",
    tags: ["Design", "Development", "Content"],
    description: "Eine innovative Plattform zur Messung und Visualisierung von Impact-Metriken für nachhaltige Unternehmen.",
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/675020f3b2bd0afb8ba55c53_S4I%20-%20Homepage.png",
    year: "2024",
    client: "Score 4 Impact GmbH",
    services: ["UI/UX Design", "Web Development", "Content Strategy"]
  },
  "mowomind": {
    title: "Mowomind",
    category: "Corporate",
    tags: ["Design", "Development", "Branding"],
    description: "Moderne Corporate Website für ein innovatives Beratungsunternehmen im Bereich New Work und Organisationsentwicklung.",
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/66d84163f75bd71b890d33dd_Web-Desktop.jpg",
    year: "2023",
    client: "Mowomind",
    services: ["Brand Identity", "Web Design", "Development"]
  },
  "modernworkaward": {
    title: "Modern Work Award",
    category: "Event",
    tags: ["Design", "Development", "Branding"],
    description: "Digitale Präsenz für den Modern Work Award - eine Auszeichnung für zukunftsweisende Arbeitskonzepte.",
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/66d8407e91014541f12645f5_MWA-DESKTOP.jpg",
    year: "2023",
    client: "Modern Work Award",
    services: ["Visual Identity", "Web Development", "Event Branding"]
  }
};

export default function Project() {
  const [, params] = useRoute("/projekte/:slug");
  const slug = params?.slug || "";
  const project = projectsData[slug];

  const [currentTheme, setCurrentTheme] = useState<SectionTheme>("dark");
  const observerRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const sections = [
      { id: "hero", theme: "dark" as SectionTheme },
      { id: "content", theme: "light" as SectionTheme },
      { id: "next", theme: "dark" as SectionTheme },
    ];

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
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) observerRefs.current.set(id, el);
  };

  const bgColor = currentTheme === "dark" ? "bg-[#1a1918]" : "bg-[#F4F4F4]";
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";
  const mutedColor = currentTheme === "dark" ? "text-white/40" : "text-black/40";
  const borderColor = currentTheme === "dark" ? "border-white/10" : "border-black/10";

  if (!project) {
    return (
      <div className="min-h-screen bg-[#1a1918] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Projekt nicht gefunden</h1>
          <Link href="/">
            <a className="text-[#eedea0]">Zurück zur Startseite</a>
          </Link>
        </div>
      </div>
    );
  }

  const projectKeys = Object.keys(projectsData);
  const currentIndex = projectKeys.indexOf(slug);
  const nextSlug = projectKeys[(currentIndex + 1) % projectKeys.length];
  const nextProject = projectsData[nextSlug];

  return (
    <SmoothScroll>
      <div className={`min-h-screen font-sans selection:bg-[#eedea0] selection:text-black transition-colors duration-700 ${bgColor}`}>
        <Navbar isDarkTheme={currentTheme === "dark"} />
        
        <main>
          {/* Hero */}
          <section ref={setRef("hero")} className="min-h-screen flex items-end pb-16 pt-32">
            <div className="container-custom w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-[10px] uppercase tracking-[0.15em] ${mutedColor}`}>{project.category}</span>
                  <span className="text-[#eedea0]">/●</span>
                  <span className={`text-[10px] uppercase tracking-[0.15em] ${mutedColor}`}>{project.year}</span>
                </div>
                
                <h1 className="text-[12vw] md:text-[8vw] leading-[0.95] font-bold tracking-tight text-[#eedea0] mb-8">
                  {project.title.toUpperCase()}
                </h1>
                
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, i) => (
                    <span key={i} className={`text-xs uppercase tracking-widest ${mutedColor}`}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Content */}
          <section ref={setRef("content")} className="py-24">
            <div className="container-custom">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              </motion.div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${textColor}`}>Über das Projekt</h2>
                  <p className={`text-base leading-relaxed ${mutedColor}`}>{project.description}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="space-y-8"
                >
                  <div className={`border-b pb-6 ${borderColor}`}>
                    <div className={`text-[10px] uppercase tracking-widest mb-2 ${mutedColor}`}>Kunde</div>
                    <div className={`text-lg font-medium ${textColor}`}>{project.client}</div>
                  </div>
                  <div className={`border-b pb-6 ${borderColor}`}>
                    <div className={`text-[10px] uppercase tracking-widest mb-2 ${mutedColor}`}>Jahr</div>
                    <div className={`text-lg font-medium ${textColor}`}>{project.year}</div>
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase tracking-widest mb-3 ${mutedColor}`}>Leistungen</div>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((s, i) => (
                        <span key={i} className={`text-sm py-1 px-3 border rounded-full ${borderColor} ${mutedColor}`}>{s}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Next Project */}
          <section ref={setRef("next")} className="py-32">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={`text-xs uppercase tracking-widest mb-4 ${mutedColor}`}>Nächstes Projekt</div>
                <Link href={`/projekte/${nextSlug}`}>
                  <a className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight hover:text-[#eedea0] transition-colors ${textColor}`}>
                    {nextProject.title.toUpperCase()}
                  </a>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </SmoothScroll>
  );
}
