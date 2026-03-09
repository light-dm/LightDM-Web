import type { Metadata } from "next";
import { AboutClient } from "@/components/pages/about-client";

export const metadata: Metadata = {
  title: "Über Uns - Die Agentur hinter LIGHT Digital Marketing",
  description: "Lernen Sie LIGHT Digital Marketing kennen: Ihre Full-Service Digitalagentur für Webdesign, IT-Beratung und Branding. Persönlich, professionell, partnerschaftlich.",
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: "Über Uns - Das Team von LIGHT DM",
    description: "Ihre Full-Service Digitalagentur für Webdesign, IT-Beratung und Branding.",
    url: "https://light-dm.de/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
