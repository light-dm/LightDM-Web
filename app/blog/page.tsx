import type { Metadata } from "next";
import { BlogClient } from "@/components/pages/blog-client";

export const metadata: Metadata = {
  title: "Blog - Tipps zu Webdesign, IT & digitale Trends",
  description: "Der LIGHT DM Blog: Praxis-Tipps zu Webdesign, IT-Services, SEO und digitalen Trends. Expertenwissen für Ihren Online-Erfolg.",
  alternates: {
    canonical: "/blog/",
  },
  openGraph: {
    title: "Blog - Webdesign & IT Tipps | LIGHT DM",
    description: "Praxis-Tipps zu Webdesign, IT-Services und digitalen Trends.",
    url: "https://light-dm.de/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
