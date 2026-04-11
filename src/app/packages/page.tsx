import { generatePageMetadata } from "@/lib/seo"
import { sanityClient, allPackagesQuery, urlFor } from "@/lib/sanity"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { PackageFilters } from "@/components/packages/PackageFilters"
import type { PackageCardData } from "@/components/packages/PackageCard"

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title: "Travel Packages | TravelSense",
  description:
    "Browse curated travel packages across leisure, adventure, educational, and sports categories. Find the perfect trip for your next getaway.",
  path: "/packages",
})

/* ─── Placeholder data when Sanity is unavailable ─────────────────────────── */

const PLACEHOLDER_PACKAGES: PackageCardData[] = [
  {
    _id: "pp-1",
    title: "Golden Triangle Explorer",
    slug: "golden-triangle-explorer",
    description:
      "Experience the iconic Delhi-Agra-Jaipur circuit with luxury stays, guided tours, and authentic culinary experiences.",
    category: "leisure",
    duration: { days: 6, nights: 5 },
    price: 28000,
    discountedPrice: 22500,
    heroImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Taj Mahal", "Amber Fort", "Qutub Minar"],
    destination: { name: "Rajasthan", slug: "rajasthan", region: "North India" },
  },
  {
    _id: "pp-2",
    title: "Ladakh Bike Expedition",
    slug: "ladakh-bike-expedition",
    description:
      "Ride through the highest motorable passes in the world on an epic Leh-Ladakh motorcycle adventure.",
    category: "adventure",
    duration: { days: 10, nights: 9 },
    price: 45000,
    heroImage:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
    difficulty: "Challenging",
    featured: true,
    highlights: ["Khardung La", "Pangong Lake", "Nubra Valley"],
    destination: { name: "Ladakh", slug: "ladakh", region: "North India" },
  },
  {
    _id: "pp-3",
    title: "Kerala Backwater Bliss",
    slug: "kerala-backwater-bliss",
    description:
      "Cruise through serene backwaters, explore spice plantations, and rejuvenate with traditional Ayurvedic therapies.",
    category: "leisure",
    duration: { days: 7, nights: 6 },
    price: 32000,
    discountedPrice: 27500,
    heroImage:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Houseboat Stay", "Ayurveda Spa", "Munnar Tea Gardens"],
    destination: { name: "Kerala", slug: "kerala", region: "South India" },
  },
  {
    _id: "pp-4",
    title: "Rishikesh Adventure Camp",
    slug: "rishikesh-adventure-camp",
    description:
      "White-water rafting, bungee jumping, and camping by the Ganges in the adventure capital of India.",
    category: "adventure",
    duration: { days: 4, nights: 3 },
    price: 15000,
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    difficulty: "Moderate",
    featured: false,
    highlights: ["Rafting", "Bungee Jump", "Camping"],
    destination: { name: "Rishikesh", slug: "rishikesh", region: "North India" },
  },
  {
    _id: "pp-5",
    title: "Hampi Heritage Trail",
    slug: "hampi-heritage-trail",
    description:
      "Walk among the ruins of the Vijayanagara Empire, explore ancient temples and boulder-strewn landscapes.",
    category: "educational",
    duration: { days: 4, nights: 3 },
    price: 18000,
    heroImage:
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: false,
    highlights: ["Virupaksha Temple", "Royal Enclosure", "Sunset Point"],
    destination: { name: "Hampi", slug: "hampi", region: "South India" },
  },
  {
    _id: "pp-6",
    title: "Goa Beach Escape",
    slug: "goa-beach-escape",
    description:
      "Relax on pristine beaches, explore Portuguese heritage, and savour coastal cuisine in India's party capital.",
    category: "leisure",
    duration: { days: 5, nights: 4 },
    price: 20000,
    discountedPrice: 16000,
    heroImage:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Beaches", "Water Sports", "Nightlife"],
    destination: { name: "Goa", slug: "goa", region: "West India" },
  },
  {
    _id: "pp-7",
    title: "IPL Cricket Experience",
    slug: "ipl-cricket-experience",
    description:
      "Watch IPL matches live with premium seats, meet players, and enjoy behind-the-scenes stadium tours.",
    category: "sports",
    duration: { days: 3, nights: 2 },
    price: 35000,
    heroImage:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: false,
    highlights: ["VIP Seats", "Stadium Tour", "Player Meet"],
    destination: { name: "Mumbai", slug: "mumbai", region: "West India" },
  },
  {
    _id: "pp-8",
    title: "Bali Wellness Retreat",
    slug: "bali-wellness-retreat",
    description:
      "Yoga, meditation, and holistic healing amidst Bali's rice terraces and spiritual temples.",
    category: "leisure",
    duration: { days: 8, nights: 7 },
    price: 65000,
    discountedPrice: 55000,
    heroImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Yoga", "Temples", "Rice Terraces"],
    destination: { name: "Bali", slug: "bali", region: "International" },
  },
  {
    _id: "pp-9",
    title: "Meghalaya Living Roots",
    slug: "meghalaya-living-roots",
    description:
      "Trek to living root bridges, swim in crystal-clear rivers, and explore Asia's cleanest village.",
    category: "adventure",
    duration: { days: 6, nights: 5 },
    price: 24000,
    heroImage:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&h=600&fit=crop",
    difficulty: "Moderate",
    featured: false,
    highlights: ["Root Bridges", "Dawki River", "Mawlynnong"],
    destination: { name: "Meghalaya", slug: "meghalaya", region: "Northeast India" },
  },
]

/* ─── Data fetching ───────────────────────────────────────────────────────── */

async function getPackages(): Promise<PackageCardData[]> {
  try {
    const raw = await sanityClient.fetch(allPackagesQuery)
    if (!raw || raw.length === 0) return PLACEHOLDER_PACKAGES

    return raw.map(
      (p: Record<string, unknown>) =>
        ({
          _id: p._id as string,
          title: p.title as string,
          slug: p.slug as string,
          description: p.description as string,
          category: p.category as string | undefined,
          duration: p.duration as { days: number; nights: number } | undefined,
          price: p.price as number | undefined,
          discountedPrice: p.discountedPrice as number | undefined,
          heroImage: p.heroImage
            ? urlFor(p.heroImage).width(800).height(600).url()
            : undefined,
          difficulty: p.difficulty as string | undefined,
          featured: p.featured as boolean | undefined,
          highlights: p.highlights as string[] | undefined,
          destination: p.destination as PackageCardData["destination"],
        }) satisfies PackageCardData
    )
  } catch {
    return PLACEHOLDER_PACKAGES
  }
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function PackagesPage() {
  const packages = await getPackages()

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Travel Packages",
          description:
            "Browse curated travel packages across India and beyond with TravelSense.",
          url: "https://travelsense.co.in/packages",
        }}
      />

      <PageHero
        title="Travel Packages"
        subtitle="Curated experiences for every kind of traveller"
        backgroundImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&h=900&fit=crop"
      >
        <Breadcrumbs items={[{ label: "Packages", href: "/packages" }]} />
      </PageHero>

      <section className="bg-[#0A1425] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <PackageFilters packages={packages} />
        </div>
      </section>
    </>
  )
}
