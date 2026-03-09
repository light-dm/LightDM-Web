import type { Metadata } from "next";
import { DatenschutzClient } from "@/components/pages/datenschutz-client";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von LIGHT Digital Marketing.",
};

export default function DatenschutzPage() {
  return <DatenschutzClient />;
}
