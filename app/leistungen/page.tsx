import type { Metadata } from "next";
import { ServicesClient } from "@/components/pages/services-client";

export const metadata: Metadata = {
  title: "Leistungen - Webdesign, IT-Services & Branding",
  description: "Unsere Leistungen: Professionelles Webdesign, zuverlässige IT-Services, kreatives Branding. Von der Konzeption bis zur Umsetzung. Jetzt Projekt starten!",
  alternates: {
    canonical: "/leistungen/",
  },
  openGraph: {
    title: "Leistungen - Webdesign, IT-Services & Branding | LIGHT DM",
    description: "Professionelles Webdesign, IT-Services und Branding. Von der Konzeption bis zur Umsetzung.",
    url: "https://light-dm.de/leistungen",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
