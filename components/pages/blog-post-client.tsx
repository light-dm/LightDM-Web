"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface BlogPost {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
}

interface BlogPostClientProps {
  slug: string;
  post: BlogPost;
}

export function BlogPostClient({ slug, post }: BlogPostClientProps) {
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
                href="/blog" 
                className="inline-flex items-center gap-2 text-white/50 hover:text-[#F5C518] transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück zum Blog</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8">
                <span className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-4 py-2 rounded-full border border-[#F5C518]/30 bg-[#F5C518]/10 text-[#F5C518]">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} Lesezeit</span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl text-white/70 leading-relaxed mb-8">
                  {post.excerpt}
                </p>
                
                {post.content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-white/60 leading-relaxed mb-6"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 pt-12 border-t border-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Haben Sie Fragen zu diesem Thema?</h3>
                    <p className="text-white/50">Kontaktieren Sie uns für eine unverbindliche Beratung.</p>
                  </div>
                  <Link
                    href="/kontakt"
                    className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#1a1918] font-semibold uppercase tracking-wider hover:shadow-lg hover:shadow-[#F5C518]/30 transition-all"
                  >
                    Kontakt aufnehmen
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
      </SmoothScroll>
    </>
  );
}
