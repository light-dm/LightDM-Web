"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    slug: "ki-webdesign-trends-2024",
    title: "KI im Webdesign: Die wichtigsten Trends 2024",
    category: "Trends",
    date: "15. Januar 2024",
    readTime: "5 min",
    excerpt: "Wie künstliche Intelligenz das Webdesign revolutioniert und welche Trends Sie nicht verpassen sollten.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    featured: true
  },
  {
    slug: "remote-arbeit-it-sicherheit",
    title: "Remote-Arbeit sicher gestalten: IT-Tipps für Unternehmen",
    category: "IT-Services",
    date: "10. Januar 2024",
    readTime: "7 min",
    excerpt: "Best Practices für sichere Remote-Arbeit und wie Sie Ihr Unternehmen vor Cyber-Bedrohungen schützen.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800"
  },
  {
    slug: "markenidentitaet-entwickeln",
    title: "Starke Markenidentität entwickeln: Ein Leitfaden",
    category: "Branding",
    date: "5. Januar 2024",
    readTime: "6 min",
    excerpt: "Wie Sie eine einprägsame und konsistente Markenidentität aufbauen, die bei Ihrer Zielgruppe Resonanz findet.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800"
  }
];

export function BlogClient() {
  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

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
                  Blog
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[8vw] sm:text-[7vw] md:text-[5vw] lg:text-[3.5vw] leading-[1.1] font-bold tracking-[-0.02em] mb-6"
                >
                  <span className="text-white">Einblicke & </span>
                  <span className="text-gradient">Trends</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-lg text-white/50"
                >
                  Aktuelle Artikel zu Webdesign, IT-Services und digitalen Trends.
                </motion.p>
              </div>
            </div>

            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <Link href={`/blog/${featuredPost.slug}`}>
                  <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#1a1918] text-xs font-semibold">
                        Empfohlen
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[#F5C518] text-xs uppercase tracking-wider">{featuredPost.category}</span>
                        <span className="text-white/30">·</span>
                        <span className="text-white/40 text-xs">{featuredPost.date}</span>
                        <span className="text-white/30">·</span>
                        <span className="text-white/40 text-xs">{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#F5C518] transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-white/50 mb-6">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-2 text-[#F5C518] font-medium">
                        <span>Artikel lesen</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group h-full p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[#F5C518] text-xs uppercase tracking-wider">{post.category}</span>
                        <span className="text-white/30">·</span>
                        <span className="text-white/40 text-xs">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F5C518] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/50 text-sm line-clamp-2">{post.excerpt}</p>
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
