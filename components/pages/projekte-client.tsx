"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    slug: "allgemeinmedizin-alsterdorf",
    num: "01",
    title: "Allgemeinmedizin Alsterdorf",
    category: "Full Service",
    year: "2026",
    description: "Ganzheitliches Projekt von der Markenentwicklung bis zur fertigen Website. Logo-Design, Corporate Identity und moderne Website.",
    tags: ["Branding", "WordPress"],
    image: "https://api.microlink.io/?url=https://allgemeinmedizin-alsterdorf.de&screenshot=true&meta=false&embed=screenshot.url",
    highlight: "Neues Projekt 2026",
    url: "https://allgemeinmedizin-alsterdorf.de"
  },
  {
    slug: "aromacleansolutions",
    num: "02",
    title: "AromaCleanSolutions",
    category: "Branding & Webdesign",
    year: "2025",
    description: "Komplettes Branding und WordPress-Website: Logo, Corporate Identity und moderner Webauftritt.",
    tags: ["Branding", "WordPress", "Logo"],
    image: "/images/aromaclean-mockup-v2.png",
    highlight: "Projekt 2025",
    url: "https://aromacleansolutions.com"
  },
  {
    slug: "diversity-konferenz",
    num: "03",
    year: "2025",
    title: "Diversity Konferenz",
    category: "Event",
    description: "Modernes, barrierefreies Webdesign für die Diversity-Konferenz.",
    tags: ["Event", "Diversity"],
    image: "https://api.microlink.io/?url=https://diversity-konferenz.de&screenshot=true&meta=false&embed=screenshot.url",
    highlight: "Barrierefreies Design",
    url: "https://diversity-konferenz.de"
  },
  {
    slug: "vereinbarkeitssummit",
    num: "04",
    year: "2025",
    title: "Vereinbarkeitssummit",
    category: "Event",
    description: "Vollumfängliches Webdesign für die Konferenz-Website.",
    tags: ["Event", "Konferenz"],
    image: "https://api.microlink.io/?url=https://vereinbarkeitssummit.com&screenshot=true&meta=false&embed=screenshot.url",
    highlight: "Event Website",
    url: "https://vereinbarkeitssummit.com"
  },
  {
    slug: "score4impact",
    num: "05",
    year: "2024",
    title: "Score 4 Impact",
    category: "Plattform",
    description: "Komplettes Redesign mit modernem UI/UX steigerte die Conversions um 40%.",
    tags: ["Startup", "Nachhaltigkeit"],
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/675020f3b2bd0afb8ba55c53_S4I%20-%20Homepage.png",
    highlight: "40% mehr Conversions",
    url: "https://score4impact.com"
  },
  {
    slug: "dayanaamaya",
    num: "06",
    year: "2024",
    title: "Dayana Amaya",
    category: "Portfolio",
    description: "Elegantes Portfolio-Webdesign für die professionelle Online-Präsenz.",
    tags: ["Portfolio", "Webdesign"],
    image: "https://api.microlink.io/?url=https://dayanaamaya.com&screenshot=true&meta=false&embed=screenshot.url",
    highlight: "Portfolio Website",
    url: "https://dayanaamaya.com"
  },
  {
    slug: "prrservice",
    num: "07",
    year: "2024",
    title: "PRR Service",
    category: "Unternehmen",
    description: "Professionelle Unternehmenswebsite mit klarer Struktur und modernem Design.",
    tags: ["Unternehmen", "Webdesign"],
    image: "https://api.microlink.io/?url=https://prrservice.de&screenshot=true&meta=false&embed=screenshot.url",
    highlight: "Unternehmenswebsite",
    url: "https://prrservice.de"
  },
  {
    slug: "hanseatic-pos",
    num: "08",
    year: "2024",
    title: "Hanseatic POS",
    category: "Redesign",
    description: "Komplettes Website-Redesign mit modernem Look und verbesserter Benutzerführung.",
    tags: ["Redesign", "B2B"],
    image: "https://api.microlink.io/?url=https://hanseatic-pos.de&screenshot=true&meta=false&embed=screenshot.url",
    highlight: "Komplettes Redesign",
    url: "https://hanseatic-pos.de"
  },
  {
    slug: "momhunting",
    num: "09",
    year: "2024",
    title: "Momhunting",
    category: "Webdesign",
    description: "Kreatives Webdesign für die Recruiting-Plattform.",
    tags: ["Webdesign", "Recruiting"],
    image: "/images/momhunting-screenshot.png",
    highlight: "Kreatives Design",
    url: "https://momhunting.com"
  },
  {
    slug: "auel-gmbh",
    num: "10",
    year: "2024",
    title: "Auel GmbH",
    category: "WordPress",
    description: "Professionelle Unternehmenswebsite mit WordPress und SEO-Optimierung.",
    tags: ["WordPress", "Unternehmen"],
    image: "/images/auel-mockup.png",
    highlight: "WordPress Website",
    url: "https://auel-gmbh.de"
  },
  {
    slug: "truework",
    num: "11",
    year: "2024",
    title: "Truework",
    category: "WordPress",
    description: "Professionelle WordPress-Website mit maßgeschneidertem Design.",
    tags: ["WordPress", "Webdesign"],
    image: "https://api.microlink.io/?url=https://truework.de&screenshot=true&meta=false&embed=screenshot.url",
    highlight: "WordPress Entwicklung",
    url: "https://truework.de"
  },
  {
    slug: "mowomind",
    num: "12",
    year: "2023",
    title: "Mowomind",
    category: "Unternehmen",
    description: "Vollständiges Rebranding mit neuer Website und 80% schnellerer Ladezeit.",
    tags: ["Technologie", "Unternehmen"],
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/66d84163f75bd71b890d33dd_Web-Desktop.jpg",
    highlight: "Komplettes Rebranding",
    url: "https://mowomind.com"
  },
  {
    slug: "modernworkaward",
    num: "13",
    year: "2023",
    title: "Modern Work Award",
    category: "Veranstaltung",
    description: "Preisgekröntes Design mit nahtloser Integration des Bewerbungsprozesses.",
    tags: ["Auszeichnung", "Veranstaltung"],
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/66d8407e91014541f12645f5_MWA-DESKTOP.jpg",
    highlight: "Preisgekröntes Design",
    url: "https://modernworkaward.com"
  }
];

const sortedProjects = [...projects].sort((a, b) => parseInt(b.year) - parseInt(a.year));

export function ProjekteClient() {
  return (
    <>
      <ScrollToTop />
      <SmoothScroll>
      <div className="min-h-screen font-sans selection:bg-[#F5C518] selection:text-black">
        <Navbar isDarkTheme={true} />
        
        <main className="relative z-10 pt-32 pb-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="overflow-hidden mb-4">
                <motion.span 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white/40"
                >
                  Portfolio
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[8vw] sm:text-[7vw] md:text-[5vw] lg:text-[3.5vw] leading-[1.1] font-bold tracking-[-0.02em] mb-6"
                >
                  <span className="text-white">Unsere </span>
                  <span className="text-gradient">Projekte</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-lg text-white/50"
                >
                  Entdecken Sie ausgewählte Arbeiten aus den Bereichen Webdesign, Branding und IT-Services.
                </motion.p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link href={`/projekte/${project.slug}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-[#F5C518]/30 transition-all cursor-pointer h-full">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <motion.img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover object-top"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 group-hover:via-black/70 transition-colors" />
                        
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs uppercase tracking-wider rounded-full bg-[#F5C518] text-[#1a1918] font-semibold">
                            {project.category}
                          </span>
                        </div>
                        
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F5C518] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 2).map((tag, i) => (
                            <span 
                              key={i} 
                              className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/10 text-white/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
      </SmoothScroll>
    </>
  );
}
