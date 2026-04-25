import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://travelsense.co.in"
const SITE_NAME = "TravelSense"

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const url = `${SITE_URL}${path}`
  const ogImage = image || `${SITE_URL}/og/default.png`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  }
}

// ─── JSON-LD Generators ─────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/logo-final-nobg.png`,
    sameAs: [
      "https://instagram.com/travelsense.in",
      "https://facebook.com/travelsensein",
      "https://twitter.com/travelsensein",
      "https://linkedin.com/company/travelsense-in",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+918087453658",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  }
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/logo-final-nobg.png`,
    image: `${SITE_URL}/images/brand/logo-final.png`,
    description:
      "Curated leisure, adventure, educational, and sports travel experiences for India's working professionals.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    priceRange: "₹₹-₹₹₹₹",
    openingHours: "Mo-Sa 09:00-19:00",
    founder: {
      "@type": "Person",
      name: "Jayshree Lakhotiya",
    },
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
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
  }
}

export function blogPostSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
  authorName: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand/logo-final-nobg.png`,
      },
    },
  }
}
