import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar({ isDarkTheme }: { isDarkTheme: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const handleNavigation = (id: string) => {
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
           element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const textColor = isDarkTheme ? "text-white" : "text-black";
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 md:py-8 transition-colors duration-500 bg-transparent">
      <div className="container-custom flex items-center justify-between">
        <Link href="/">
          <a className={`text-lg md:text-xl font-bold tracking-tighter uppercase ${textColor} transition-colors duration-500 cursor-pointer`}>
            Light<sup className="text-[8px] ml-0.5">DM</sup>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/leistungen">
            <a className={`text-xs font-medium uppercase tracking-widest hover:text-[#eedea0] transition-colors ${textColor}`}>
              Leistungen
            </a>
          </Link>
          <button
            onClick={() => handleNavigation("projects")}
            className={`text-xs font-medium uppercase tracking-widest hover:text-[#eedea0] transition-colors ${textColor}`}
          >
            Projekte
          </button>
          
          <Link href="/about">
             <a className={`text-xs font-medium uppercase tracking-widest hover:text-[#eedea0] transition-colors ${textColor}`}>
               Über Uns
             </a>
          </Link>

          <button
            onClick={() => handleNavigation("contact")}
            className={`text-xs font-medium uppercase tracking-widest hover:text-[#eedea0] transition-colors ${textColor}`}
          >
            Kontakt
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 ${textColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 ${isDarkTheme ? "bg-[#1a1918]" : "bg-[#F4F4F4]"}`}>
          <Link href="/leistungen">
            <a onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-medium uppercase tracking-widest ${textColor}`}>Leistungen</a>
          </Link>
          <button onClick={() => handleNavigation("projects")} className={`text-xl font-medium uppercase tracking-widest ${textColor}`}>Projekte</button>
          <Link href="/about">
            <a onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-medium uppercase tracking-widest ${textColor}`}>Über Uns</a>
          </Link>
          <button onClick={() => handleNavigation("contact")} className={`text-xl font-medium uppercase tracking-widest ${textColor}`}>Kontakt</button>
        </div>
      )}
    </nav>
  );
}
