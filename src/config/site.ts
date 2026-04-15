export const siteConfig = {
  name: "TravelSense",
  description:
    "Your trusted travel partner for curated leisure, adventure, educational, and sports travel experiences. Expert consultation, personalized itineraries, and seamless booking.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og/default.jpg",
  creator: "Sol8um",
  keywords: [
    "travel",
    "travel platform",
    "travel packages",
    "adventure travel",
    "educational travel",
    "sports travel",
    "leisure travel",
    "travel consultation",
    "personalized itinerary",
    "India travel",
    "TravelSense",
    "Pune travel",
  ],
  authors: [{ name: "TravelSense" }],
  founder: {
    name: "Jayshree Lakhotiya",
    company: "TravelSense",
    location: "Pune, India",
  },
  contact: {
    email: "hello@travelsense.in",
    phone: "+91-9876543210",
    whatsapp: "+91-9876543210",
    address: "Pune, Maharashtra, India",
  },
  social: {
    instagram: "https://instagram.com/travelsense.in",
    facebook: "https://facebook.com/travelsense.in",
    linkedin: "https://linkedin.com/company/travelsense",
  },
} as const;

export type SiteConfig = typeof siteConfig;
