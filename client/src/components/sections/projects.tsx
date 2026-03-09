import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

type SectionTheme = "dark" | "light";

interface ProjectsProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
  currentTheme: SectionTheme;
}

const projects = [
  {
    slug: "score4impact",
    title: "Score 4 Impact",
    tags: ["Design", "Development", "Content"],
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/675020f3b2bd0afb8ba55c53_S4I%20-%20Homepage.png"
  },
  {
    slug: "mowomind",
    title: "Mowomind",
    tags: ["Design", "Development", "Branding"],
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/66d84163f75bd71b890d33dd_Web-Desktop.jpg"
  },
  {
    slug: "modernworkaward",
    title: "Modern Work Award",
    tags: ["Design", "Development", "Branding"],
    image: "https://cdn.prod.website-files.com/66b1e4356bd0881074b85ef5/66d8407e91014541f12645f5_MWA-DESKTOP.jpg"
  }
];

export function Projects({ setRef, currentTheme }: ProjectsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);
  
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";
  const mutedColor = currentTheme === "dark" ? "text-white/40" : "text-black/40";
  const borderColor = currentTheme === "dark" ? "border-white/10" : "border-black/10";

  return (
    <section 
      ref={(node) => {
        setRef("projects")(node);
        // @ts-ignore
        targetRef.current = node;
      }}
      id="projects" 
      className="h-[250vh] relative"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container-custom mb-6">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-700 ${mutedColor}`}>Sec.</span>
            <span className="text-[#eedea0]">/●</span>
            <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight transition-colors duration-700 ${textColor}`}>Projekte</h2>
          </div>
        </div>
        
        <motion.div style={{ x }} className="flex gap-4 md:gap-6 pl-4 md:pl-[5vw] pr-[30vw]">
          {projects.map((project, index) => (
            <Link key={index} href={`/projekte/${project.slug}`}>
              <a className="flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] group cursor-pointer block">
                <div className="aspect-[16/10] overflow-hidden mb-4 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 border-b pb-4 transition-colors duration-700 ${borderColor}`}>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-700 group-hover:text-[#eedea0] ${textColor}`}>{project.title}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`text-[10px] uppercase tracking-widest transition-colors duration-700 ${mutedColor}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
