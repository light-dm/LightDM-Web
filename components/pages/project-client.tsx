"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface ProjectData {
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  year: string;
  client: string;
  services: string[];
  challenge?: string;
  solution?: string;
  results?: { value: string; label: string }[];
  url?: string;
}

const projectsData: Record<string, ProjectData> = {
  "score4impact": {
    title: "Score 4 Impact",
    category: "Plattform",
    tags: ["Startup", "Nachhaltigkeit"],
    description: "Eine innovative Plattform zur Messung und Visualisierung von Impact-Metriken für nachhaltige Unternehmen.",
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/675020f3b2bd0afb8ba55c53_S4I%20-%20Homepage.png",
    year: "2025",
    client: "Score 4 Impact GmbH",
    services: ["UI/UX Design", "Webentwicklung", "Content-Strategie"],
    url: "https://score4impact.com",
    challenge: "Score 4 Impact stand vor der Herausforderung, komplexe Nachhaltigkeitsdaten verständlich darzustellen. Die bestehende Plattform war veraltet und konnte die wachsenden Anforderungen nicht mehr erfüllen.",
    solution: "Wir entwickelten eine komplett neue Plattform mit modernem Design und intuitiver Benutzerführung. Interaktive Dashboards machen komplexe Daten auf einen Blick verständlich.",
    results: [
      { value: "40%", label: "Mehr Conversions" },
      { value: "2x", label: "Traffic verdoppelt" },
      { value: "65%", label: "Schnellere Ladezeit" }
    ]
  },
  "mowomind": {
    title: "Mowomind",
    category: "Unternehmen",
    tags: ["Technologie", "Unternehmen"],
    description: "Moderne Corporate Website für ein innovatives Beratungsunternehmen im Bereich New Work und Organisationsentwicklung.",
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/66d84163f75bd71b890d33dd_Web-Desktop.jpg",
    year: "2023",
    client: "Mowomind",
    services: ["Markenidentität", "Webdesign", "Entwicklung"],
    url: "https://mowomind.com",
    challenge: "Mowomind benötigte eine Website, die ihre innovative Herangehensweise an New Work widerspiegelt und gleichzeitig Vertrauen bei Unternehmenskunden aufbaut.",
    solution: "Ein vollständiges Rebranding mit neuer visueller Identität und einer Website, die moderne Arbeitsmethoden verkörpert. Performance-Optimierung für schnelle Ladezeiten.",
    results: [
      { value: "80%", label: "Schnellere Ladezeit" },
      { value: "3x", label: "Mehr Anfragen" },
      { value: "100%", label: "Markenkonformität" }
    ]
  },
  "modernworkaward": {
    title: "Modern Work Award",
    category: "Veranstaltung",
    tags: ["Auszeichnung", "Veranstaltung"],
    description: "Digitale Präsenz für den Modern Work Award - eine Auszeichnung für zukunftsweisende Arbeitskonzepte.",
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/66d8407e91014541f12645f5_MWA-DESKTOP.jpg",
    year: "2023",
    client: "Modern Work Award",
    services: ["Visuelle Identität", "Webentwicklung", "Event-Branding"],
    url: "https://modernworkaward.com",
    challenge: "Der Modern Work Award brauchte eine digitale Präsenz, die den innovativen Charakter der Auszeichnung unterstreicht und den Bewerbungsprozess vereinfacht.",
    solution: "Entwicklung einer preisgekrönten Website mit nahtloser Integration des Bewerbungsformulars und einer dynamischen Präsentation der Gewinner und Nominierten.",
    results: [
      { value: "200+", label: "Bewerbungen" },
      { value: "50%", label: "Mehr Sichtbarkeit" },
      { value: "Preis", label: "Gekröntes Design" }
    ]
  },
  "hanseatic-pos": {
    title: "Hanseatic POS",
    category: "Redesign",
    tags: ["Redesign", "B2B"],
    description: "Komplettes Website-Redesign für Hanseatic POS, Anbieter moderner Kassensysteme. Neues visuelles Konzept mit verbesserter Benutzerführung.",
    image: "https://api.microlink.io/?url=https://hanseatic-pos.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2024",
    client: "Hanseatic POS",
    services: ["Website Redesign", "UI/UX Design", "Frontend Development"],
    url: "https://hanseatic-pos.de",
    challenge: "Die bestehende Website war veraltet und spiegelte nicht mehr die moderne Ausrichtung des Unternehmens wider.",
    solution: "Komplettes Redesign mit frischem, modernem Look und optimierter Benutzerführung für bessere Conversion-Raten."
  },
  "truework": {
    title: "Truework",
    category: "WordPress",
    tags: ["WordPress", "Webdesign"],
    description: "Professionelle WordPress-Website mit maßgeschneidertem Theme-Design für optimale Nutzererfahrung.",
    image: "https://api.microlink.io/?url=https://truework.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2023",
    client: "Truework",
    services: ["WordPress Development", "Custom Theme", "SEO"],
    url: "https://truework.de",
    challenge: "Truework benötigte eine professionelle Online-Präsenz, die einfach zu verwalten ist.",
    solution: "Maßgeschneiderte WordPress-Website mit intuitivem Backend für einfache Content-Verwaltung."
  },
  "allgemeinmedizin-alsterdorf": {
    title: "Allgemeinmedizin Alsterdorf",
    category: "WordPress",
    tags: ["WordPress", "Branding"],
    description: "Professionelle Praxis-Website mit Branding und Logo-Design. Moderne WordPress-Website mit Oxygen Builder.",
    image: "https://api.microlink.io/?url=https://allgemeinmedizin-alsterdorf.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2026",
    client: "Allgemeinmedizin Alsterdorf",
    services: ["WordPress Development", "Logo Design", "Web Design", "Oxygen Builder"],
    url: "https://allgemeinmedizin-alsterdorf.de",
    challenge: "Die Praxis brauchte einen kompletten Markenauftritt von Grund auf - Logo, Farben, und Website.",
    solution: "Entwicklung einer vollständigen Corporate Identity mit Logo, Farbkonzept und moderner WordPress-Website."
  },
  "momhunting": {
    title: "Momhunting",
    category: "Webdesign",
    tags: ["Webdesign", "Recruiting"],
    description: "Kreatives Webdesign für die innovative Recruiting-Plattform mit Fokus auf Benutzerfreundlichkeit.",
    image: "/images/momhunting-screenshot.png",
    year: "2023",
    client: "Momhunting",
    services: ["Web Design", "UI/UX", "Frontend Development"],
    url: "https://momhunting.com",
    challenge: "Die Recruiting-Plattform brauchte ein frisches, ansprechendes Design, das Vertrauen aufbaut.",
    solution: "Modernes, kreatives Webdesign mit klarer Struktur und optimierter Conversion-Rate."
  },
  "auel-gmbh": {
    title: "Auel GmbH",
    category: "WordPress",
    tags: ["WordPress", "Unternehmen"],
    description: "Professionelle Unternehmenswebsite mit WordPress, optimiert für Suchmaschinen.",
    image: "https://api.microlink.io/?url=https://auel-gmbh.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2025",
    client: "Auel GmbH",
    services: ["WordPress Development", "Web Design", "SEO"],
    url: "https://auel-gmbh.de",
    challenge: "Das Unternehmen benötigte eine professionelle Website für bessere Online-Sichtbarkeit.",
    solution: "SEO-optimierte WordPress-Website mit responsivem Design für alle Endgeräte."
  },
  "vereinbarkeitssummit": {
    title: "Vereinbarkeitssummit",
    category: "Event",
    tags: ["Event", "Konferenz"],
    description: "Vollumfängliches Webdesign für die Konferenz-Website mit Event-Registrierung.",
    image: "https://api.microlink.io/?url=https://vereinbarkeitssummit.com&screenshot=true&meta=false&embed=screenshot.url",
    year: "2025",
    client: "Vereinbarkeitssummit",
    services: ["Web Design", "Event Website", "Registration System"],
    url: "https://vereinbarkeitssummit.com",
    challenge: "Die Konferenz brauchte eine übersichtliche Website mit Anmeldefunktion und Programm-Übersicht.",
    solution: "Moderne Event-Website mit allen wichtigen Informationen und einfacher Registrierung."
  },
  "diversity-konferenz": {
    title: "Diversity Konferenz",
    category: "Event",
    tags: ["Event", "Diversity"],
    description: "Modernes, barrierefreies Webdesign für die Diversity-Konferenz.",
    image: "https://api.microlink.io/?url=https://diversity-konferenz.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2025",
    client: "Diversity Konferenz",
    services: ["Web Design", "Accessibility", "Event Branding"],
    url: "https://diversity-konferenz.de",
    challenge: "Die Konferenz zum Thema Diversity brauchte eine barrierefreie, inklusive Website.",
    solution: "Barrierefreies Webdesign mit klarer Informationsstruktur und optimierter Zugänglichkeit."
  },
  "dayanaamaya": {
    title: "Dayana Amaya",
    category: "Portfolio",
    tags: ["Portfolio", "Webdesign"],
    description: "Elegantes Portfolio-Webdesign für die professionelle Online-Präsenz.",
    image: "https://api.microlink.io/?url=https://dayanaamaya.com&screenshot=true&meta=false&embed=screenshot.url",
    year: "2025",
    client: "Dayana Amaya",
    services: ["Web Design", "Portfolio", "UI/UX"],
    url: "https://dayanaamaya.com",
    challenge: "Professionelle Online-Präsenz für persönliches Portfolio benötigt.",
    solution: "Elegantes, modernes Portfolio-Design mit klarer Struktur und ansprechender Ästhetik."
  },
  "prrservice": {
    title: "PRR Service",
    category: "Unternehmen",
    tags: ["Unternehmen", "Webdesign"],
    description: "Professionelle Unternehmenswebsite mit klarer Struktur und modernem Design.",
    image: "https://api.microlink.io/?url=https://prrservice.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2025",
    client: "PRR Service",
    services: ["Web Design", "Development", "SEO"],
    url: "https://prrservice.de",
    challenge: "Professionelle Unternehmenswebsite für bessere Online-Präsenz benötigt.",
    solution: "Moderne Unternehmenswebsite mit klarer Struktur, responsivem Design und SEO-Optimierung."
  }
};

interface ProjectClientProps {
  slug: string;
  project: ProjectData;
}

export function ProjectClient({ slug, project }: ProjectClientProps) {
  const projectKeys = Object.keys(projectsData);
  const currentIndex = projectKeys.indexOf(slug);
  const nextSlug = projectKeys[(currentIndex + 1) % projectKeys.length];
  const nextProject = projectsData[nextSlug];
  const fullProject = projectsData[slug] || project;

  return (
    <>
      <ScrollToTop />
      <SmoothScroll>
      <div className="min-h-screen font-sans selection:bg-[#F5C518] selection:text-black">
        <Navbar isDarkTheme={true} />
        
        <main className="relative z-10 pt-32 pb-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/projekte" 
                className="inline-flex items-center gap-2 text-white/50 hover:text-[#F5C518] transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück zu Projekte</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/50">
                  {fullProject.category}
                </span>
                {fullProject.tags.map((tag, i) => (
                  <span key={i} className="text-xs uppercase tracking-wider text-white/40">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="text-gradient">{fullProject.title}</span>
              </h1>
              
              <p className="text-lg text-white/50 max-w-2xl mb-6">
                {fullProject.description}
              </p>
              
              {fullProject.url && (
                <a 
                  href={fullProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#1a1918] font-semibold rounded-full hover:shadow-lg hover:shadow-[#F5C518]/30 transition-all group"
                >
                  <span>Website besuchen</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                <span className="text-xs uppercase tracking-wider text-white/40 block mb-1">Timeline</span>
                <span className="text-white font-medium">{fullProject.year}</span>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                <span className="text-xs uppercase tracking-wider text-white/40 block mb-1">Kunde</span>
                <span className="text-white font-medium">{fullProject.client}</span>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] col-span-2">
                <span className="text-xs uppercase tracking-wider text-white/40 block mb-1">Branche</span>
                <span className="text-white font-medium">{fullProject.tags.join(", ")}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-20"
            >
              <img 
                src={fullProject.image} 
                alt={fullProject.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {fullProject.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <span className="text-xs uppercase tracking-[0.2em] mb-4 text-white/40 block">
                  Herausforderung
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
                    {fullProject.challenge}
                  </p>
                </div>
              </motion.div>
            )}

            {fullProject.solution && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <span className="text-xs uppercase tracking-[0.2em] mb-4 text-white/40 block">
                  Lösung
                </span>
                <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
                  <p className="text-lg text-white/70 leading-relaxed mb-6">
                    {fullProject.solution}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {fullProject.services.map((service, i) => (
                      <span 
                        key={i} 
                        className="text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-[#F5C518]/30 bg-[#F5C518]/10 text-[#F5C518]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {fullProject.results && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <span className="text-xs uppercase tracking-[0.2em] mb-8 text-white/40 block">
                  Ergebnisse
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {fullProject.results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-8 rounded-3xl border border-white/10 bg-white/[0.02]"
                    >
                      <div className="text-5xl md:text-6xl font-bold text-gradient mb-2">
                        {result.value}
                      </div>
                      <div className="text-white/50 uppercase tracking-wider text-sm">
                        {result.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-12 border-t border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/40 block mb-2">
                    Nächstes Projekt
                  </span>
                  <Link 
                    href={`/projekte/${nextSlug}`}
                    className="text-2xl md:text-4xl font-bold text-white hover:text-[#F5C518] transition-colors"
                  >
                    {nextProject.title}
                  </Link>
                </div>
                <Link
                  href={`/projekte/${nextSlug}`}
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:border-[#F5C518] hover:text-[#F5C518] transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
      </SmoothScroll>
    </>
  );
}
