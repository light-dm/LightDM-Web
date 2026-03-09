"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar({ isDarkTheme }: { isDarkTheme: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let touchStartY = 0;
    
    function checkScroll() {
      const currentY = window.scrollY;
      
      if (currentY < 50) {
        setVisible(true);
        setScrolled(false);
      } else {
        setScrolled(true);
        if (currentY < lastY) {
          setVisible(true);
        } else if (currentY > lastY + 5) {
          setVisible(false);
        }
      }
      lastY = currentY;
    }
    
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    
    function onTouchMove(e: TouchEvent) {
      const touchY = e.touches[0].clientY;
      const diff = touchY - touchStartY;
      const currentY = window.scrollY;
      
      if (currentY < 50) {
        setVisible(true);
        setScrolled(false);
      } else {
        setScrolled(true);
        if (diff > 10) {
          setVisible(true);
        } else if (diff < -10) {
          setVisible(false);
        }
      }
    }
    
    function onScroll() {
      checkScroll();
    }
    
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      setTimeout(() => setMenuVisible(true), 10);
    } else {
      document.body.style.overflow = "";
      setMenuVisible(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleClose = () => {
    setMenuVisible(false);
    setTimeout(() => setMenuOpen(false), 400);
  };

  const links = [
    { name: "Leistungen", url: "/leistungen" },
    { name: "Projekte", url: "/projekte" },
    { name: "Über Uns", url: "/about" },
    { name: "Blog", url: "/blog" },
    { name: "Kontakt", url: "/kontakt" },
  ];

  return (
    <>
      <header
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          WebkitTransform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s ease-out, background-color 0.3s ease, backdrop-filter 0.3s ease",
          backgroundColor: scrolled ? "rgba(26, 25, 24, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
        className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4"
      >
        <div className="container-custom flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo-full-white.png"
              alt="LIGHT DM"
              width={160}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/80 hover:text-[#F5C518] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="ml-4 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#1a1918] hover:scale-105 transition-transform"
            >
              Projekt starten
            </Link>
          </nav>

          <button
            className="md:hidden w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center"
            onClick={() => setMenuOpen(true)}
            aria-label="Menu öffnen"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path d="M0 1H18M0 6H18M0 11H18" stroke="white" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0d0d0c",
            zIndex: 99999,
            opacity: menuVisible ? 1 : 0,
            transition: "opacity 0.4s ease-out",
            WebkitTransition: "opacity 0.4s ease-out",
          }}
        >
          <div 
            style={{ 
              padding: "12px 24px", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              opacity: menuVisible ? 1 : 0,
              transform: menuVisible ? "translateY(0)" : "translateY(-20px)",
              WebkitTransform: menuVisible ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s",
              WebkitTransition: "opacity 0.4s ease-out 0.1s, -webkit-transform 0.4s ease-out 0.1s",
            }}
          >
            <Link href="/" onClick={handleClose}>
              <Image
                src="/images/logo-symbol.png"
                alt="LIGHT DM"
                width={40}
                height={40}
                style={{ width: 32, height: 32 }}
              />
            </Link>
            
            <button
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: menuVisible ? "rotate(0deg)" : "rotate(-90deg)",
                WebkitTransform: menuVisible ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 0.4s ease-out 0.1s",
                WebkitTransition: "-webkit-transform 0.4s ease-out 0.1s",
              }}
              onClick={handleClose}
              aria-label="Menu schließen"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <nav style={{ padding: "60px 32px" }}>
            {links.map((link, index) => (
              <Link
                key={link.name}
                href={link.url}
                onClick={handleClose}
                style={{
                  display: "block",
                  fontSize: 28,
                  fontWeight: 600,
                  color: "white",
                  marginBottom: 28,
                  textDecoration: "none",
                  opacity: menuVisible ? 1 : 0,
                  transform: menuVisible ? "translateX(0)" : "translateX(-30px)",
                  WebkitTransform: menuVisible ? "translateX(0)" : "translateX(-30px)",
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s`,
                  WebkitTransition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s, -webkit-transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s`,
                }}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              href="/kontakt"
              onClick={handleClose}
              style={{
                display: "inline-block",
                marginTop: 32,
                padding: "18px 36px",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                background: "linear-gradient(to right, #F5C518, #E6A800)",
                color: "#0d0d0c",
                textDecoration: "none",
                opacity: menuVisible ? 1 : 0,
                transform: menuVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                WebkitTransform: menuVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
                WebkitTransition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, -webkit-transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
              }}
            >
              Projekt starten
            </Link>
          </nav>

          <div style={{ 
            position: "absolute", 
            bottom: 0, 
            left: 0, 
            right: 0, 
            padding: "24px 32px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            opacity: menuVisible ? 1 : 0,
            transform: menuVisible ? "translateY(0)" : "translateY(20px)",
            WebkitTransform: menuVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.4s ease-out 0.6s, transform 0.4s ease-out 0.6s",
            WebkitTransition: "opacity 0.4s ease-out 0.6s, -webkit-transform 0.4s ease-out 0.6s",
          }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              info@light-dm.de
            </p>
          </div>
        </div>
      )}
    </>
  );
}
