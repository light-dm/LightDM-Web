"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Download, Shield, Headphones } from "lucide-react";

export function SupportClient() {
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
                  IT-Support
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[8vw] sm:text-[7vw] md:text-[5vw] lg:text-[3.5vw] leading-[1.1] font-bold tracking-[-0.02em] mb-6"
                >
                  <span className="text-white">Remote </span>
                  <span className="text-gradient">Support</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-lg text-white/50"
                >
                  Laden Sie unsere Fernwartungs-Software herunter, um schnelle und sichere IT-Hilfe zu erhalten.
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl mx-auto mb-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.a
                  href="https://lightdm-my.sharepoint.com/:f:/g/personal/hrose_light-dm_de/IgBRH6iMLR5TRYegI7kQJoafARAqWzbMs2h709mJVvd0G3g?e=DWkXvu"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group block p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-[#F5C518]/30 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0078D4] to-[#005A9E] flex items-center justify-center shadow-lg shadow-[#0078D4]/20">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8.5v8.5H3V3zm9.5 0H21v8.5h-8.5V3zM3 12.5h8.5V21H3v-8.5zm9.5 0H21V21h-8.5v-8.5z"/></svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl group-hover:text-[#F5C518] transition-colors mb-1">
                        Windows
                      </h3>
                      <p className="text-white/50 text-sm">LightDesk Remote f&uuml;r Windows</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                      <Shield className="w-4 h-4 text-[#28c840]" />
                      <span className="text-white/60 text-sm">Verschl&uuml;sselt</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0078D4]/10 border border-[#0078D4]/20">
                      <svg className="w-3.5 h-3.5 text-[#0078D4]" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8.5v8.5H3V3zm9.5 0H21v8.5h-8.5V3zM3 12.5h8.5V21H3v-8.5zm9.5 0H21V21h-8.5v-8.5z"/></svg>
                      <span className="text-[#0078D4] text-sm font-medium">Windows</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#1a1918] font-semibold group-hover:shadow-lg group-hover:shadow-[#F5C518]/30 transition-all">
                    <Download className="w-5 h-5" />
                    <span>Jetzt herunterladen</span>
                  </div>
                </motion.a>

                <motion.a
                  href="https://lightdm-my.sharepoint.com/:f:/g/personal/hrose_light-dm_de/IgBLAX5zGK0MQpCmJfkdXnRUAdvbgPJ73SehGZIpxUeOMVA?e=9di2xH"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group block p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-[#F5C518]/30 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#555555] to-[#333333] flex items-center justify-center shadow-lg shadow-white/10">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl group-hover:text-[#F5C518] transition-colors mb-1">
                        macOS
                      </h3>
                      <p className="text-white/50 text-sm">LightDesk Remote f&uuml;r Mac</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                      <Shield className="w-4 h-4 text-[#28c840]" />
                      <span className="text-white/60 text-sm">Verschl&uuml;sselt</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                      <svg className="w-3.5 h-3.5 text-white/60" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                      <span className="text-white/60 text-sm font-medium">macOS</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#1a1918] font-semibold group-hover:shadow-lg group-hover:shadow-[#F5C518]/30 transition-all">
                    <Download className="w-5 h-5" />
                    <span>Jetzt herunterladen</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm max-w-2xl mx-auto">
                <Headphones className="w-12 h-12 text-[#F5C518] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">So funktioniert es</h3>
                <ol className="text-left text-white/60 space-y-4 max-w-md mx-auto">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5C518]/20 text-[#F5C518] text-sm font-bold flex items-center justify-center">1</span>
                    <span>Laden Sie die Software herunter und starten Sie sie</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5C518]/20 text-[#F5C518] text-sm font-bold flex items-center justify-center">2</span>
                    <span>Teilen Sie uns Ihre angezeigte ID telefonisch mit</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5C518]/20 text-[#F5C518] text-sm font-bold flex items-center justify-center">3</span>
                    <span>Wir verbinden uns sicher und helfen Ihnen direkt</span>
                  </li>
                </ol>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/40 text-sm mb-3">
                    Fragen? Schreiben Sie uns eine E-Mail.
                  </p>
                  <a 
                    href="mailto:support@light-dm.de" 
                    className="text-[#F5C518] hover:underline"
                  >
                    support@light-dm.de
                  </a>
                </div>
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
