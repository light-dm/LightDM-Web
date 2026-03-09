import type { Metadata } from "next";
import { KontaktClient } from "@/components/pages/kontakt-client";

export const metadata: Metadata = {
  title: "Kontakt - Kostenlose Erstberatung anfragen",
  description: "Kontaktieren Sie LIGHT Digital Marketing für Ihr Webdesign oder IT-Projekt. Kostenlose Erstberatung, schnelle Antwort innerhalb von 24 Stunden.",
  alternates: {
    canonical: "/kontakt/",
  },
  openGraph: {
    title: "Kontakt - Jetzt Projekt anfragen | LIGHT DM",
    description: "Kostenlose Erstberatung für Ihr Webdesign oder IT-Projekt. Antwort innerhalb von 24 Stunden.",
    url: "https://light-dm.de/kontakt",
  },
};

export default function KontaktPage() {
  return <KontaktClient />;
}
