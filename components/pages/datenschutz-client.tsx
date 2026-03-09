"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";

export function DatenschutzClient() {
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
                <span className="text-gradient">Datenschutzerklärung</span>
              </h1>
              
              <div className="prose prose-invert prose-lg max-w-none space-y-8">
                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">1. Datenschutz auf einen Blick</h2>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">Allgemeine Hinweise</h3>
                  <p className="text-white/70 mb-4">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">Datenerfassung auf dieser Website</h3>
                  <p className="text-white/70">
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                  </p>
                </section>

                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">2. Verantwortliche Stelle</h2>
                  <p className="text-white/70">
                    Hasan Yuset Rose<br />
                    Heitmannshausen 50 i<br />
                    21614 Buxtehude<br />
                    Deutschland<br /><br />
                    Telefon: +49 40 60778244<br />
                    E-Mail: info@light-dm.de
                  </p>
                </section>

                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">3. Datenerfassung auf dieser Website</h2>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">Kontaktformular</h3>
                  <p className="text-white/70 mb-4">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">Server-Log-Dateien</h3>
                  <p className="text-white/70">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.
                  </p>
                </section>

                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">4. Ihre Rechte</h2>
                  <p className="text-white/70">
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </p>
                </section>

                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">5. Cookies</h2>
                  <p className="text-white/70">
                    Diese Website verwendet keine Tracking-Cookies. Es werden lediglich technisch notwendige Cookies verwendet, die für die Funktionalität der Website erforderlich sind.
                  </p>
                </section>

                <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold text-white mb-4">6. Externe Dienste</h2>
                  <p className="text-white/70">
                    Diese Website nutzt keine externen Analyse- oder Tracking-Dienste. Kontaktanfragen werden über einen sicheren Webhook verarbeitet und nicht an Dritte weitergegeben.
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
