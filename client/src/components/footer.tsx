import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 border-t border-white/10">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-heading font-bold tracking-tight mb-2">LIGHT DM</h2>
          <p className="text-white/60 text-sm">
            © 2025 LIGHT DM. Alle Rechte vorbehalten.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-white/80">
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">Projekte</button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">Kontakt</button>
          <Link href="/impressum"><a className="hover:text-primary transition-colors">Impressum</a></Link>
          <Link href="/datenschutz"><a className="hover:text-primary transition-colors">Datenschutz</a></Link>
        </div>
      </div>
    </footer>
  );
}
