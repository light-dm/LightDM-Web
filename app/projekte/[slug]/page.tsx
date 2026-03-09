import type { Metadata } from "next";
import { ProjectClient } from "@/components/pages/project-client";
import { notFound } from "next/navigation";

const projectsData: Record<string, {
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  year: string;
  client: string;
  services: string[];
  url?: string;
}> = {
  "aromacleansolutions": {
    title: "AromaCleanSolutions",
    category: "Branding & Webdesign",
    tags: ["Branding", "Logo", "Webdesign", "WordPress"],
    description: "Komplettes Branding und WordPress-Website für einen professionellen Reinigungsservice mit Duft-Expertise. Von der Markenentwicklung über Logo-Design bis zur fertigen Website – ein Rundum-Paket für den erfolgreichen Markenauftritt.",
    image: "/images/aromaclean-mockup-v2.png",
    year: "2025",
    client: "AromaCleanSolutions",
    services: ["Branding", "Logo Design", "Corporate Identity", "WordPress Website", "UI/UX Design"],
    url: "https://aromacleansolutions.com"
  },
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
  },
  "hanseatic-pos": {
    title: "Hanseatic POS",
    category: "Redesign",
    tags: ["Design", "Development", "UX"],
    description: "Komplettes Website-Redesign für Hanseatic POS, Anbieter moderner Kassensysteme. Neues visuelles Konzept mit verbesserter Benutzerführung und optimierter Conversion-Rate.",
    image: "https://api.microlink.io/?url=https://hanseatic-pos.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2024",
    client: "Hanseatic POS",
    services: ["Website Redesign", "UI/UX Design", "Frontend Development"],
    url: "https://hanseatic-pos.de"
  },
  "truework": {
    title: "Truework",
    category: "WordPress",
    tags: ["WordPress", "Design", "Development"],
    description: "Professionelle WordPress-Website mit maßgeschneidertem Theme-Design. Fokus auf Performance, SEO-Optimierung und einfache Content-Verwaltung für das Team.",
    image: "https://api.microlink.io/?url=https://truework.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2024",
    client: "Truework",
    services: ["WordPress Development", "Custom Theme", "SEO"],
    url: "https://truework.de"
  },
  "allgemeinmedizin-alsterdorf": {
    title: "Allgemeinmedizin Alsterdorf",
    category: "Full Service",
    tags: ["Branding", "Design", "Development", "Logo"],
    description: "Ganzheitliches Projekt von der Markenentwicklung bis zur fertigen Website. Logo-Design, Corporate Identity und moderne Website mit Oxygen Builder für die Arztpraxis.",
    image: "https://api.microlink.io/?url=https://allgemeinmedizin-alsterdorf.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2026",
    client: "Allgemeinmedizin Alsterdorf",
    services: ["Brand Identity", "Logo Design", "Web Development", "Oxygen Builder"],
    url: "https://allgemeinmedizin-alsterdorf.de"
  },
  "momhunting": {
    title: "Momhunting",
    category: "Webdesign",
    tags: ["Design", "Development", "Recruiting"],
    description: "Kreatives Webdesign für die innovative Recruiting-Plattform. Modernes, ansprechendes Design mit Fokus auf Benutzerfreundlichkeit und Conversion-Optimierung.",
    image: "/images/momhunting-screenshot.png",
    year: "2024",
    client: "Momhunting",
    services: ["Web Design", "UI/UX", "Frontend Development"],
    url: "https://momhunting.com"
  },
  "auel-gmbh": {
    title: "Auel GmbH",
    category: "WordPress",
    tags: ["WordPress", "Design", "Corporate"],
    description: "Professionelle Unternehmenswebsite für die Auel GmbH. WordPress-Entwicklung mit SEO-Optimierung und responsivem Design für alle Endgeräte.",
    image: "/images/auel-mockup.png",
    year: "2024",
    client: "Auel GmbH",
    services: ["WordPress Development", "Web Design", "SEO"],
    url: "https://auel-gmbh.de"
  },
  "vereinbarkeitssummit": {
    title: "Vereinbarkeitssummit",
    category: "Event",
    tags: ["Event", "Design", "Development"],
    description: "Vollumfängliches Webdesign für die Konferenz-Website. Event-Registrierung, Speaker-Übersicht, Programm-Darstellung und alle Informationen zur Veranstaltung.",
    image: "https://api.microlink.io/?url=https://vereinbarkeitssummit.com&screenshot=true&meta=false&embed=screenshot.url",
    year: "2025",
    client: "Vereinbarkeitssummit",
    services: ["Web Design", "Event Website", "Registration System"],
    url: "https://vereinbarkeitssummit.com"
  },
  "diversity-konferenz": {
    title: "Diversity Konferenz",
    category: "Event",
    tags: ["Event", "Design", "Accessibility"],
    description: "Modernes, barrierefreies Webdesign für die Diversity-Konferenz. Klare Informationsstruktur, responsive Design und optimierte Zugänglichkeit für alle Besucher.",
    image: "https://api.microlink.io/?url=https://diversity-konferenz.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2025",
    client: "Diversity Konferenz",
    services: ["Web Design", "Accessibility", "Event Branding"],
    url: "https://diversity-konferenz.de"
  },
  "dayanaamaya": {
    title: "Dayana Amaya",
    category: "Portfolio",
    tags: ["Portfolio", "Design", "Development"],
    description: "Elegantes Portfolio-Webdesign für die professionelle Online-Präsenz. Modernes Design mit klarer Struktur und ansprechender Ästhetik.",
    image: "https://api.microlink.io/?url=https://dayanaamaya.com&screenshot=true&meta=false&embed=screenshot.url",
    year: "2024",
    client: "Dayana Amaya",
    services: ["Web Design", "Portfolio", "UI/UX"],
    url: "https://dayanaamaya.com"
  },
  "prrservice": {
    title: "PRR Service",
    category: "Unternehmen",
    tags: ["Corporate", "Design", "Development"],
    description: "Professionelle Unternehmenswebsite mit klarer Struktur und modernem Design. SEO-optimiert und responsiv für alle Endgeräte.",
    image: "https://api.microlink.io/?url=https://prrservice.de&screenshot=true&meta=false&embed=screenshot.url",
    year: "2024",
    client: "PRR Service",
    services: ["Web Design", "Development", "SEO"],
    url: "https://prrservice.de"
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug];
  
  if (!project) {
    return {
      title: "Projekt nicht gefunden",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | LIGHT Digital Marketing`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData[slug];
  
  if (!project) {
    notFound();
  }

  return <ProjectClient slug={slug} project={project} />;
}
