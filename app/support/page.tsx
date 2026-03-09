import type { Metadata } from "next";
import { SupportClient } from "@/components/pages/support-client";

export const metadata: Metadata = {
  title: "IT-Support - Schnelle Remote-Hilfe für Ihr Unternehmen",
  description: "IT-Support von LIGHT DM: Remote Desktop Hilfe, TeamViewer & AnyDesk Support. Schnelle Problemlösung, faire Preise. Jetzt Hilfe anfordern!",
  alternates: {
    canonical: "/support/",
  },
  openGraph: {
    title: "IT-Support - Remote Desktop Hilfe | LIGHT DM",
    description: "Schnelle IT-Hilfe per Remote Desktop. TeamViewer & AnyDesk Support.",
    url: "https://light-dm.de/support",
  },
};

export default function SupportPage() {
  return <SupportClient />;
}
