"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";

export function ImpressumClient() {
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
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
                <span className="text-gradient">Impressum</span>
              </h1>
              
              <div className="prose prose-invert prose-lg max-w-none space-y-8">
                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">Angaben gemäß § 5 TMG</h2>
                  <p className="text-white/70">
                    Hasan Yuset Rose<br />
                    Heitmannshausen 50 i<br />
                    21614 Buxtehude<br />
                    Deutschland
                  </p>
                </section>

                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">Kontakt</h2>
                  <p className="text-white/70">
                    Telefon: <a href="tel:+494060778244" className="hover:text-[#F5C518] transition-colors">+49 40 60778244</a><br />
                    E-Mail: info@light-dm.de
                  </p>
                </section>

                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                  <p className="text-white/70">
                    Hasan Yuset Rose<br />
                    Heitmannshausen 50 i<br />
                    21614 Buxtehude
                  </p>
                </section>

                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">Haftungsausschluss</h2>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">Haftung für Inhalte</h3>
                  <p className="text-white/70 mb-4">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">Haftung für Links</h3>
                  <p className="text-white/70 mb-4">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">Urheberrecht</h3>
                  <p className="text-white/70">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </section>
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
