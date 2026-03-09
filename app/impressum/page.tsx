import type { Metadata } from "next";
import { ImpressumClient } from "@/components/pages/impressum-client";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Informationen von LIGHT Digital Marketing.",
};

export default function ImpressumPage() {
  return <ImpressumClient />;
}
