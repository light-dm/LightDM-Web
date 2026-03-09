import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AppProviders } from "@/components/providers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const ibmPlexSans = IBM_Plex_Sans({ 
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "LIGHT Digital Marketing | Webdesign & IT-Beratung aus Deutschland",
    template: "%s | LIGHT Digital Marketing"
  },
  description: "Professionelles Webdesign, IT-Beratung und Branding von LIGHT DM. Wir entwickeln moderne Websites, die verkaufen. Kostenlose Erstberatung anfragen!",
  keywords: ["Webdesign Agentur", "IT-Beratung", "Branding Agentur", "Website erstellen lassen", "Webentwicklung Deutschland", "Responsive Webdesign", "WordPress Agentur", "SEO Optimierung"],
  authors: [{ name: "LIGHT Digital Marketing" }],
  creator: "LIGHT Digital Marketing",
  publisher: "LIGHT Digital Marketing",
  metadataBase: new URL("https://light-dm.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "LIGHT Digital Marketing",
    title: "LIGHT Digital Marketing | Webdesign & IT-Beratung aus Deutschland",
    description: "Professionelles Webdesign, IT-Beratung und Branding. Moderne Websites, die verkaufen. Jetzt kostenlose Erstberatung anfragen!",
    url: "https://light-dm.de",
  },
  twitter: {
    card: "summary_large_image",
    title: "LIGHT Digital Marketing | Webdesign & IT-Beratung",
    description: "Professionelles Webdesign, IT-Beratung und Branding. Moderne Websites, die verkaufen.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  } : undefined,
};

const jsonLdOrganization = `{"@context":"https://schema.org","@type":"Organization","@id":"https://light-dm.de/#organization","name":"LIGHT Digital Marketing","alternateName":"LIGHT DM","url":"https://light-dm.de","logo":{"@type":"ImageObject","url":"https://light-dm.de/images/logo-symbol.png","width":512,"height":512},"description":"Professionelles Webdesign, IT-Beratung und Branding aus Deutschland.","foundingDate":"2019","address":{"@type":"PostalAddress","addressCountry":"DE","addressRegion":"Deutschland"},"contactPoint":{"@type":"ContactPoint","contactType":"customer service","email":"info@light-dm.de","availableLanguage":["German","English"]},"sameAs":[]}`;

const jsonLdLocalBusiness = `{"@context":"https://schema.org","@type":"ProfessionalService","@id":"https://light-dm.de/#localbusiness","name":"LIGHT Digital Marketing","image":"https://light-dm.de/images/logo-symbol.png","url":"https://light-dm.de","description":"Full-Service Digitalagentur für Webdesign, IT-Beratung und Branding.","priceRange":"€€","address":{"@type":"PostalAddress","addressCountry":"DE"},"areaServed":{"@type":"Country","name":"Germany"},"serviceType":["Webdesign","IT-Beratung","Branding","IT-Support"]}`;

const jsonLdWebsite = `{"@context":"https://schema.org","@type":"WebSite","@id":"https://light-dm.de/#website","url":"https://light-dm.de","name":"LIGHT Digital Marketing","description":"Professionelles Webdesign, IT-Beratung und Branding","publisher":{"@id":"https://light-dm.de/#organization"},"inLanguage":"de-DE"}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${ibmPlexSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: jsonLdOrganization }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: jsonLdLocalBusiness }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: jsonLdWebsite }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
