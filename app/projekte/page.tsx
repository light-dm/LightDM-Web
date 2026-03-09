import type { Metadata } from "next";
import { ProjekteClient } from "@/components/pages/projekte-client";

export const metadata: Metadata = {
  title: "Unsere Projekte - Erfolgreiche Webdesign & Branding Cases",
  description: "Entdecken Sie unsere Referenzen: Erfolgreiche Webdesign, Branding und IT-Projekte. Sehen Sie, wie wir Unternehmen zum digitalen Erfolg verhelfen.",
  alternates: {
    canonical: "/projekte/",
  },
  openGraph: {
    title: "Unsere Projekte - Webdesign & Branding Referenzen | LIGHT DM",
    description: "Erfolgreiche Webdesign und Branding Projekte. Sehen Sie unsere Referenzen.",
    url: "https://light-dm.de/projekte",
  },
};

export default function ProjektePage() {
  return <ProjekteClient />;
}
