export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://light-dm.de/#organization",
    name: "LIGHT Digital Marketing",
    alternateName: "LIGHT DM",
    url: "https://light-dm.de",
    logo: {
      "@type": "ImageObject",
      url: "https://light-dm.de/images/logo-symbol.png",
      width: 512,
      height: 512,
    },
    description: "Professionelles Webdesign, IT-Beratung und Branding aus Deutschland.",
    foundingDate: "2019",
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
      addressRegion: "Deutschland",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+49 40 60778244",
      email: "info@light-dm.de",
      availableLanguage: ["German", "English"],
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://light-dm.de/#localbusiness",
    name: "LIGHT Digital Marketing",
    image: "https://light-dm.de/images/logo-symbol.png",
    url: "https://light-dm.de",
    description: "Full-Service Digitalagentur für Webdesign, IT-Beratung und Branding.",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
    },
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    serviceType: ["Webdesign", "IT-Beratung", "Branding", "IT-Support"],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://light-dm.de/#website",
    url: "https://light-dm.de",
    name: "LIGHT Digital Marketing",
    description: "Professionelles Webdesign, IT-Beratung und Branding",
    publisher: {
      "@id": "https://light-dm.de/#organization",
    },
    inLanguage: "de-DE",
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface Service {
  name: string;
  description: string;
  url: string;
}

export function ServiceSchema({ services }: { services: Service[] }) {
  const schema = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@id": "https://light-dm.de/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
  }));

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
