"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 md:py-24 relative border-t border-white/5">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 mb-12 md:mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4 md:mb-6">
              <Image 
                src="/images/logo-full-white.png" 
                alt="LIGHT DM" 
                width={160} 
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              Kreatives Studio für IT-Beratung, Webdesign und Branding. 
              Wir gestalten Lösungen, die Marken stärken und Menschen verbinden.
            </p>
            <div className="flex flex-wrap gap-2">
              {["LinkedIn", "Instagram"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-white/50 hover:text-white hover:border-[#F5C518]/20 hover:bg-white/[0.04] transition-all"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest mb-4 md:mb-6">Navigation</h4>
            <nav className="space-y-3">
              <Link href="/leistungen" className="block text-white/40 text-sm hover:text-[#F5C518] transition-colors" data-testid="link-footer-services">Leistungen</Link>
              <Link href="/projekte" className="block text-white/40 text-sm hover:text-[#F5C518] transition-colors" data-testid="link-footer-projects">Projekte</Link>
              <Link href="/about" className="block text-white/40 text-sm hover:text-[#F5C518] transition-colors" data-testid="link-footer-about">Über Uns</Link>
              <Link href="/support" className="block text-white/40 text-sm hover:text-[#F5C518] transition-colors" data-testid="link-footer-support">IT-Support</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest mb-4 md:mb-6">Kontakt</h4>
            <div className="space-y-3">
              <a href="mailto:info@light-dm.de" className="block text-white/40 text-sm hover:text-[#F5C518] transition-colors" data-testid="link-footer-email">
                info@light-dm.de
              </a>
              <a href="tel:+494060778244" className="block text-white/40 text-sm hover:text-[#F5C518] transition-colors" data-testid="link-footer-phone">
                +49 40 60778244
              </a>
              <p className="text-white/40 text-sm">Deutschland / Remote</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs uppercase tracking-widest">
              2019 — 2026 LIGHT DM. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/impressum" className="text-white/30 text-xs uppercase tracking-widest hover:text-[#F5C518] transition-colors" data-testid="link-footer-imprint">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-white/30 text-xs uppercase tracking-widest hover:text-[#F5C518] transition-colors" data-testid="link-footer-privacy">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
