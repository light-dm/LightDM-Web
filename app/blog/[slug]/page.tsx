import type { Metadata } from "next";
import { BlogPostClient } from "@/components/pages/blog-post-client";
import { notFound } from "next/navigation";

const blogPosts: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
}> = {
  "ki-webdesign-trends-2024": {
    title: "KI im Webdesign: Die wichtigsten Trends 2024",
    category: "Trends",
    date: "15. Januar 2024",
    readTime: "5 min",
    excerpt: "Wie künstliche Intelligenz das Webdesign revolutioniert und welche Trends Sie nicht verpassen sollten.",
    content: [
      "Künstliche Intelligenz verändert die Art, wie wir Websites gestalten und entwickeln. Von automatisierter Bildoptimierung bis hin zu personalisierten Benutzererfahrungen - KI ist aus dem modernen Webdesign nicht mehr wegzudenken.",
      "Personalisierung durch KI: Moderne Websites passen sich automatisch an das Verhalten und die Präferenzen ihrer Besucher an. Dies führt zu höheren Conversion-Rates und zufriedeneren Nutzern.",
      "Automatisierte Design-Systeme: KI-gestützte Tools können jetzt Farbpaletten, Layouts und sogar ganze Design-Systeme vorschlagen, die auf Markenrichtlinien und Best Practices basieren.",
      "Performance-Optimierung: Machine Learning Algorithmen analysieren Website-Performance in Echtzeit und optimieren automatisch Ladezeiten und Core Web Vitals."
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200"
  },
  "remote-arbeit-it-sicherheit": {
    title: "Remote-Arbeit sicher gestalten: IT-Tipps für Unternehmen",
    category: "IT-Services",
    date: "10. Januar 2024",
    readTime: "7 min",
    excerpt: "Best Practices für sichere Remote-Arbeit und wie Sie Ihr Unternehmen vor Cyber-Bedrohungen schützen.",
    content: [
      "Die Verlagerung zum Home-Office hat neue Herausforderungen für die IT-Sicherheit geschaffen. Unternehmen müssen ihre Sicherheitsstrategien anpassen, um Mitarbeiter außerhalb des Büronetzwerks zu schützen.",
      "VPN und Zero-Trust-Architektur: Ein robustes VPN ist die Grundlage für sichere Remote-Arbeit. Moderne Zero-Trust-Konzepte gehen noch weiter und verifizieren jeden Zugriff unabhängig vom Standort.",
      "Endpoint-Security: Jedes Gerät, das auf Unternehmensdaten zugreift, muss geschützt werden. Antivirus-Software, Firewall und regelmäßige Updates sind unverzichtbar.",
      "Schulung der Mitarbeiter: Der Mensch bleibt das schwächste Glied in der Sicherheitskette. Regelmäßige Schulungen zu Phishing und Social Engineering sind essentiell."
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200"
  },
  "markenidentitaet-entwickeln": {
    title: "Starke Markenidentität entwickeln: Ein Leitfaden",
    category: "Branding",
    date: "5. Januar 2024",
    readTime: "6 min",
    excerpt: "Wie Sie eine einprägsame und konsistente Markenidentität aufbauen, die bei Ihrer Zielgruppe Resonanz findet.",
    content: [
      "Eine starke Markenidentität ist mehr als nur ein Logo. Sie umfasst alle visuellen und kommunikativen Elemente, die Ihr Unternehmen definieren und von der Konkurrenz abheben.",
      "Markenwerte definieren: Bevor Sie mit dem Design beginnen, müssen Sie klar definieren, wofür Ihre Marke steht. Welche Werte vertreten Sie? Was macht Sie einzigartig?",
      "Visuelle Konsistenz: Farben, Typografie und Bildsprache müssen über alle Kanäle hinweg einheitlich sein. Ein Brand Style Guide hilft dabei, diese Konsistenz zu wahren.",
      "Storytelling: Erzählen Sie die Geschichte Ihrer Marke. Menschen verbinden sich mit Geschichten, nicht mit Produkten. Eine authentische Markengeschichte schafft emotionale Bindung."
    ],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200"
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    return {
      title: "Artikel nicht gefunden",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | LIGHT Digital Marketing`,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient slug={slug} post={post} />;
}
