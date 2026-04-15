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
    title: "Kashmir Standard",
    slug: "kashmir-standard",
    description:
      "Experience the paradise of India with visits to Srinagar, Gulmarg, Pahalgam, and a stay on a traditional Dal Lake houseboat.",
    category: "leisure",
    duration: { days: 7, nights: 6 },
    price: 28000,
    discountedPrice: 24500,
    heroImage:
      "https://images.unsplash.com/photo-1597074866923-dc0589150bd6?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Dal Lake Houseboat", "Gulmarg Gondola", "Pahalgam Valley"],
    destination: { name: "Kashmir", slug: "kashmir", region: "North India" },
  },
  {
    _id: "pp-2",
    title: "Kashmir with Gurez Valley",
    slug: "kashmir-gurez-valley",
    description:
      "An extended Kashmir experience including the remote and stunning Gurez Valley — one of the most beautiful valleys in the Himalayas.",
    category: "adventure",
    duration: { days: 10, nights: 9 },
    price: 38000,
    heroImage:
      "https://images.unsplash.com/photo-1597074866923-dc0589150bd6?w=800&h=600&fit=crop",
    difficulty: "Moderate",
    featured: true,
    highlights: ["Gurez Valley", "Habba Khatoon Peak", "Dal Lake", "Gulmarg"],
    destination: { name: "Kashmir", slug: "kashmir", region: "North India" },
  },
  {
    _id: "pp-3",
    title: "Ladakh Complete Circuit",
    slug: "ladakh-complete-circuit",
    description:
      "The ultimate Ladakh experience covering Leh, Nubra Valley, Pangong Lake, and the highest motorable passes in the world.",
    category: "adventure",
    duration: { days: 9, nights: 8 },
    price: 35000,
    heroImage:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
    difficulty: "Challenging",
    featured: true,
    highlights: ["Pangong Lake", "Khardung La", "Nubra Valley", "Monasteries"],
    destination: { name: "Leh-Ladakh", slug: "leh-ladakh", region: "North India" },
  },
  {
    _id: "pp-4",
    title: "Himachal Classic",
    slug: "himachal-classic",
    description:
      "Explore Shimla's colonial charm, Manali's adventure scene, and Dharamshala's Tibetan culture on this classic Himachal circuit.",
    category: "leisure",
    duration: { days: 8, nights: 7 },
    price: 22000,
    discountedPrice: 19500,
    heroImage:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Shimla", "Manali", "Dharamshala", "Solang Valley"],
    destination: { name: "Himachal Pradesh", slug: "himachal-pradesh", region: "North India" },
  },
  {
    _id: "pp-5",
    title: "Royal Rajasthan",
    slug: "royal-rajasthan",
    description:
      "Live like royalty across Jaipur, Jodhpur, Udaipur, and Jaisalmer — palaces, forts, desert safaris, and vibrant bazaars.",
    category: "leisure",
    duration: { days: 8, nights: 7 },
    price: 32000,
    discountedPrice: 28000,
    heroImage:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Jaipur Forts", "Udaipur Lakes", "Jaisalmer Desert", "Jodhpur"],
    destination: { name: "Rajasthan", slug: "rajasthan", region: "North India" },
  },
  {
    _id: "pp-6",
    title: "Golden Triangle Explorer",
    slug: "golden-triangle-explorer",
    description:
      "India's most iconic circuit — experience the Taj Mahal, Amber Fort, and Qutub Minar on this perfect introduction to India.",
    category: "educational",
    duration: { days: 5, nights: 4 },
    price: 18000,
    discountedPrice: 15500,
    heroImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Taj Mahal", "Amber Fort", "Qutub Minar", "Hawa Mahal"],
    destination: { name: "Golden Triangle", slug: "golden-triangle", region: "North India" },
  },
  {
    _id: "pp-7",
    title: "Uttarakhand Heritage & Nature",
    slug: "uttarakhand-heritage-nature",
    description:
      "From the yoga capital Rishikesh to Jim Corbett's tigers and Mussoorie's colonial hill station charm.",
    category: "leisure",
    duration: { days: 7, nights: 6 },
    price: 20000,
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: false,
    highlights: ["Rishikesh", "Jim Corbett", "Mussoorie", "Haridwar"],
    destination: { name: "Uttarakhand", slug: "uttarakhand", region: "North India" },
  },
  {
    _id: "pp-8",
    title: "Northeast Discovery",
    slug: "northeast-discovery",
    description:
      "Explore the untouched beauty of India's northeast — living root bridges, tea gardens, monasteries, and vibrant tribal cultures.",
    category: "adventure",
    duration: { days: 10, nights: 9 },
    price: 35000,
    heroImage:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&h=600&fit=crop",
    difficulty: "Moderate",
    featured: true,
    highlights: ["Meghalaya Root Bridges", "Kaziranga", "Tawang", "Dawki River"],
    destination: { name: "Meghalaya", slug: "meghalaya", region: "Northeast India" },
  },
  {
    _id: "pp-9",
    title: "Kerala Backwaters & Spices",
    slug: "kerala-backwaters-spices",
    description:
      "Cruise through serene backwaters, explore spice plantations in Munnar, and rejuvenate with authentic Ayurvedic therapies.",
    category: "leisure",
    duration: { days: 7, nights: 6 },
    price: 25000,
    discountedPrice: 22000,
    heroImage:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Houseboat Stay", "Munnar Tea Gardens", "Ayurveda Spa", "Periyar Wildlife"],
    destination: { name: "Kerala", slug: "kerala", region: "South India" },
  },
  {
    _id: "pp-10",
    title: "Goa Beach & Heritage",
    slug: "goa-beach-heritage",
    description:
      "Relax on pristine beaches, explore Portuguese churches, and savour coastal cuisine in India's favourite beach destination.",
    category: "leisure",
    duration: { days: 5, nights: 4 },
    price: 15000,
    discountedPrice: 12500,
    heroImage:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Beaches", "Old Goa Churches", "Water Sports", "Nightlife"],
    destination: { name: "Goa", slug: "goa", region: "West India" },
  },
  {
    _id: "pp-11",
    title: "Bali Island of Gods",
    slug: "bali-island-of-gods",
    description:
      "Explore ancient temples, lush rice terraces, and world-class beaches on Indonesia's most enchanting island.",
    category: "leisure",
    duration: { days: 7, nights: 6 },
    price: 65000,
    discountedPrice: 58000,
    heroImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Ubud Temples", "Rice Terraces", "Seminyak Beach", "Tanah Lot"],
    destination: { name: "Bali", slug: "bali", region: "International" },
  },
  {
    _id: "pp-12",
    title: "Char Dham Yatra by Helicopter",
    slug: "char-dham-yatra-helicopter",
    description:
      "Complete the sacred Char Dham pilgrimage in comfort — visit Yamunotri, Gangotri, Kedarnath, and Badrinath by helicopter.",
    category: "educational",
    duration: { days: 6, nights: 5 },
    price: 200000,
    heroImage:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
    difficulty: "Easy",
    featured: true,
    highlights: ["Kedarnath", "Badrinath", "Gangotri", "Yamunotri"],
    destination: { name: "Char Dham", slug: "char-dham", region: "North India" },
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
