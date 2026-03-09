"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface BlogProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

const blogPosts = [
  {
    slug: "ki-webdesign-trends-2024",
    category: "TRENDS",
    title: "KI im Webdesign: Die wichtigsten Trends 2024",
    excerpt: "Wie künstliche Intelligenz das Webdesign revolutioniert und welche Trends Sie nicht verpassen sollten.",
    author: "Light DM Team",
    date: "Jan 2024",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    featured: true
  },
  {
    slug: "remote-arbeit-it-sicherheit",
    category: "IT-SERVICES",
    title: "Remote-Arbeit sicher gestalten: IT-Tipps",
    excerpt: "Best Practices für sichere Remote-Arbeit und wie Sie Ihr Unternehmen vor Cyber-Bedrohungen schützen.",
    author: "Light DM Team",
    date: "Jan 2024",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    featured: false
  },
  {
    slug: "markenidentitaet-entwickeln",
    category: "BRANDING",
    title: "Starke Markenidentität entwickeln",
    excerpt: "Wie Sie eine einprägsame Markenidentität aufbauen, die bei Ihrer Zielgruppe Resonanz findet.",
    author: "Light DM Team",
    date: "Jan 2024",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    featured: false
  }
];

export function Blog({ setRef }: BlogProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  
  const featuredPost = blogPosts.find(p => p.featured);
  const otherPosts = blogPosts.filter(p => !p.featured);

  return (
    <section ref={setRef("blog")} id="blog" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl text-white/40"
            >
              Blog
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={headerInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white"
              >
                Aktuelle Insights
              </motion.h2>
            </div>
          </div>
          
          <Link href="/blog">
            <motion.span
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block px-6 py-3 border border-white/20 bg-white/[0.03] backdrop-blur-xl text-white rounded-full text-sm uppercase tracking-wider hover:border-[#F5C518] hover:text-[#F5C518] transition-all"
            >
              Alle Artikel
            </motion.span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group cursor-pointer lg:row-span-2 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-4 md:p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all h-full"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 md:mb-6">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c]/60 to-transparent" />
                </div>
                
                <span className="inline-block text-[10px] md:text-xs uppercase tracking-widest text-[#F5C518] mb-2 md:mb-3 px-3 py-1 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/20">
                  {featuredPost.category}
                </span>
                
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 group-hover:text-[#F5C518] transition-colors">
                  {featuredPost.title}
                </h3>
                
                <p className="text-sm md:text-base text-white/50 mb-4 md:mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-xs md:text-sm text-white/40">
                  <span>{featuredPost.author}</span>
                  <span>-</span>
                  <span>{featuredPost.date}</span>
                </div>
              </motion.article>
            </Link>
          )}
          
          <div className="space-y-4">
            {otherPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer flex gap-4 md:gap-6 p-3 md:p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/20 transition-all"
                >
                  <div className="flex-shrink-0 w-24 h-20 md:w-32 md:h-24 overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-widest text-[#F5C518] mb-1 md:mb-2">
                      {post.category}
                    </span>
                    
                    <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2 group-hover:text-[#F5C518] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-white/40 line-clamp-2 hidden sm:block">
                      {post.excerpt}
                    </p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
