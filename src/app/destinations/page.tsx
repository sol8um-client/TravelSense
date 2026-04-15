import { generatePageMetadata } from "@/lib/seo"
import { sanityClient, allDestinationsQuery, urlFor } from "@/lib/sanity"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { DestinationGrid } from "@/components/destinations/DestinationGrid"
import type { DestinationCardData } from "@/components/destinations/DestinationCard"

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title: "Destinations | TravelSense",
  description:
    "Explore handpicked travel destinations across India and beyond. From serene beaches to majestic mountains, find your perfect getaway with TravelSense.",
  path: "/destinations",
})

/* ─── Placeholder data when Sanity is unavailable ─────────────────────────── */

const PLACEHOLDER_DESTINATIONS: DestinationCardData[] = [
  {
    _id: "p-1",
    name: "Kashmir",
    slug: "kashmir",
    description:
      "Paradise on Earth — snow-capped peaks, pristine Dal Lake, and lush Mughal gardens make Kashmir an unforgettable escape.",
    heroImage:
      "https://images.unsplash.com/photo-1597074866923-dc0589150bd6?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 28000,
    highlights: ["Dal Lake", "Gulmarg", "Mughal Gardens", "Pahalgam"],
    featured: true,
  },
  {
    _id: "p-2",
    name: "Leh-Ladakh",
    slug: "leh-ladakh",
    description:
      "The land of high passes offers breathtaking landscapes, ancient monasteries, and the highest motorable roads in the world.",
    heroImage:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 35000,
    highlights: ["Pangong Lake", "Khardung La", "Nubra Valley", "Monasteries"],
    featured: true,
  },
  {
    _id: "p-3",
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    description:
      "From the colonial charm of Shimla to the adventure hub of Manali, Himachal offers mountains, temples, and serene valleys.",
    heroImage:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 22000,
    highlights: ["Shimla", "Manali", "Dharamshala", "Spiti Valley"],
    featured: true,
  },
  {
    _id: "p-4",
    name: "Rajasthan",
    slug: "rajasthan",
    description:
      "Royal palaces, golden deserts, and vibrant culture — experience the majestic land of kings.",
    heroImage:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 32000,
    highlights: ["Jaipur", "Udaipur", "Jaisalmer", "Desert Safari"],
    featured: true,
  },
  {
    _id: "p-5",
    name: "Varanasi & Uttar Pradesh",
    slug: "varanasi-uttar-pradesh",
    description:
      "One of the oldest living cities in the world — experience sacred ghats, ancient temples, and the spiritual heart of India.",
    heroImage:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 12000,
    highlights: ["Ganga Aarti", "Kashi Vishwanath", "Sarnath", "Agra"],
    featured: false,
  },
  {
    _id: "p-6",
    name: "Golden Triangle",
    slug: "golden-triangle",
    description:
      "India's most iconic circuit connecting Delhi, Agra, and Jaipur — a perfect introduction to the country's rich heritage.",
    heroImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 18000,
    highlights: ["Taj Mahal", "Amber Fort", "Qutub Minar", "Hawa Mahal"],
    featured: true,
  },
  {
    _id: "p-7",
    name: "Uttarakhand",
    slug: "uttarakhand",
    description:
      "The Dev Bhoomi offers sacred pilgrimages, Himalayan treks, and wildlife sanctuaries amidst stunning mountain scenery.",
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 20000,
    highlights: ["Rishikesh", "Mussoorie", "Jim Corbett", "Valley of Flowers"],
    featured: false,
  },
  {
    _id: "p-8",
    name: "Meghalaya",
    slug: "meghalaya",
    description:
      "Living root bridges, crystal-clear rivers, and the wettest place on earth await in the abode of clouds.",
    heroImage:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&h=600&fit=crop",
    region: "Northeast India",
    country: "India",
    startingPrice: 18000,
    highlights: ["Root Bridges", "Dawki River", "Mawlynnong", "Cherrapunji"],
    featured: true,
  },
  {
    _id: "p-9",
    name: "Sikkim & Darjeeling",
    slug: "sikkim-darjeeling",
    description:
      "Stunning views of Kanchenjunga, ancient monasteries, and the world-famous Darjeeling tea gardens.",
    heroImage:
      "https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=800&h=600&fit=crop",
    region: "Northeast India",
    country: "India",
    startingPrice: 20000,
    highlights: ["Kanchenjunga", "Tea Gardens", "Monasteries", "Toy Train"],
    featured: false,
  },
  {
    _id: "p-10",
    name: "Arunachal Pradesh",
    slug: "arunachal-pradesh",
    description:
      "India's last frontier — untouched tribal cultures, the majestic Tawang monastery, and pristine Himalayan landscapes.",
    heroImage:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&h=600&fit=crop",
    region: "Northeast India",
    country: "India",
    startingPrice: 25000,
    highlights: ["Tawang", "Ziro Valley", "Sela Pass", "Tribal Culture"],
    featured: false,
  },
  {
    _id: "p-11",
    name: "Assam",
    slug: "assam",
    description:
      "Vast tea estates, the mighty Brahmaputra, one-horned rhinos, and vibrant Bihu culture define India's gateway to the northeast.",
    heroImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    region: "Northeast India",
    country: "India",
    startingPrice: 16000,
    highlights: ["Kaziranga", "Tea Gardens", "Majuli Island", "Brahmaputra"],
    featured: false,
  },
  {
    _id: "p-12",
    name: "Kerala",
    slug: "kerala",
    description:
      "Backwaters, lush tea gardens, and Ayurvedic wellness — God's Own Country is a tropical paradise.",
    heroImage:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    region: "South India",
    country: "India",
    startingPrice: 25000,
    highlights: ["Backwaters", "Munnar", "Ayurveda", "Periyar Wildlife"],
    featured: true,
  },
  {
    _id: "p-13",
    name: "Goa",
    slug: "goa",
    description:
      "Sun-kissed beaches, Portuguese heritage, and vibrant nightlife make Goa India's favourite coastal escape.",
    heroImage:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    region: "West India",
    country: "India",
    startingPrice: 15000,
    highlights: ["Beaches", "Churches", "Water Sports", "Nightlife"],
    featured: true,
  },
  {
    _id: "p-14",
    name: "Karnataka",
    slug: "karnataka",
    description:
      "From the ruins of Hampi to the coffee plantations of Coorg, Karnataka blends heritage, nature, and coastal beauty.",
    heroImage:
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&h=600&fit=crop",
    region: "South India",
    country: "India",
    startingPrice: 18000,
    highlights: ["Hampi", "Coorg", "Mysore Palace", "Gokarna"],
    featured: false,
  },
  {
    _id: "p-15",
    name: "Char Dham",
    slug: "char-dham",
    description:
      "The sacred pilgrimage to Yamunotri, Gangotri, Kedarnath, and Badrinath — India's holiest spiritual circuit.",
    heroImage:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 35000,
    highlights: ["Kedarnath", "Badrinath", "Gangotri", "Yamunotri"],
    featured: true,
  },
  {
    _id: "p-16",
    name: "Andaman Islands",
    slug: "andaman-islands",
    description:
      "Crystal-clear waters, pristine beaches, and world-class diving in the Bay of Bengal.",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    region: "South India",
    country: "India",
    startingPrice: 30000,
    highlights: ["Scuba Diving", "Havelock Island", "Radhanagar Beach", "Water Sports"],
    featured: false,
  },
  {
    _id: "p-17",
    name: "Bali",
    slug: "bali",
    description:
      "Tropical paradise with terraced rice paddies, ancient temples, and vibrant arts — Indonesia's island of the gods.",
    heroImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    region: "International",
    country: "Indonesia",
    startingPrice: 65000,
    highlights: ["Temples", "Rice Terraces", "Ubud", "Beach Clubs"],
    featured: true,
  },
  {
    _id: "p-18",
    name: "Thailand",
    slug: "thailand",
    description:
      "Golden temples, bustling night markets, and idyllic islands — Thailand is Southeast Asia's crown jewel.",
    heroImage:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop",
    region: "International",
    country: "Thailand",
    startingPrice: 45000,
    highlights: ["Bangkok", "Phuket", "Chiang Mai", "Phi Phi Islands"],
    featured: true,
  },
  {
    _id: "p-19",
    name: "Dubai & UAE",
    slug: "dubai-uae",
    description:
      "Futuristic skylines, luxury shopping, and desert adventures — the UAE is a playground of modern marvels.",
    heroImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    region: "International",
    country: "UAE",
    startingPrice: 55000,
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Abu Dhabi"],
    featured: false,
  },
  {
    _id: "p-20",
    name: "Vietnam",
    slug: "vietnam",
    description:
      "Emerald rice paddies, floating markets, and ancient towns — Vietnam is a feast for the senses.",
    heroImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
    region: "International",
    country: "Vietnam",
    startingPrice: 50000,
    highlights: ["Ha Long Bay", "Hoi An", "Hanoi", "Mekong Delta"],
    featured: false,
  },
]

/* ─── Data fetching ───────────────────────────────────────────────────────── */

async function getDestinations(): Promise<DestinationCardData[]> {
  try {
    const raw = await sanityClient.fetch(allDestinationsQuery)
    if (!raw || raw.length === 0) return PLACEHOLDER_DESTINATIONS

    return raw.map(
      (d: Record<string, unknown>) =>
        ({
          _id: d._id as string,
          name: d.name as string,
          slug: d.slug as string,
          description: d.description as string,
          heroImage: d.heroImage
            ? urlFor(d.heroImage).width(800).height(600).url()
            : undefined,
          region: (d.region as string) || "India",
          country: d.country as string | undefined,
          startingPrice: d.startingPrice as number | undefined,
          highlights: d.highlights as string[] | undefined,
          featured: d.featured as boolean | undefined,
        }) satisfies DestinationCardData
    )
  } catch {
    return PLACEHOLDER_DESTINATIONS
  }
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Travel Destinations",
          description:
            "Explore handpicked travel destinations across India and beyond with TravelSense.",
          url: "https://travelsense.co.in/destinations",
        }}
      />

      <PageHero
        title="Destinations"
        subtitle="Discover extraordinary places handpicked by our travel experts"
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=900&fit=crop"
      >
        <Breadcrumbs items={[{ label: "Destinations", href: "/destinations" }]} />
      </PageHero>

      <section className="bg-[#0A1425] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <DestinationGrid destinations={destinations} />
        </div>
      </section>
    </>
  )
}
