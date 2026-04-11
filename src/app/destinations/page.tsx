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
    name: "Goa",
    slug: "goa",
    description:
      "Sun-kissed beaches, vibrant nightlife, and Portuguese heritage make Goa India's favourite coastal escape.",
    heroImage:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    region: "West India",
    country: "India",
    startingPrice: 12000,
    highlights: ["Beaches", "Nightlife", "Heritage"],
    featured: true,
  },
  {
    _id: "p-2",
    name: "Ladakh",
    slug: "ladakh",
    description:
      "The land of high passes offers breathtaking landscapes, ancient monasteries, and unmatched adventure.",
    heroImage:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 25000,
    highlights: ["Mountains", "Monasteries", "Adventure"],
    featured: true,
  },
  {
    _id: "p-3",
    name: "Kerala",
    slug: "kerala",
    description:
      "Backwaters, lush tea gardens, and Ayurvedic wellness make Kerala God's Own Country.",
    heroImage:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    region: "South India",
    country: "India",
    startingPrice: 15000,
    highlights: ["Backwaters", "Tea Gardens", "Ayurveda"],
    featured: true,
  },
  {
    _id: "p-4",
    name: "Rajasthan",
    slug: "rajasthan",
    description:
      "Royal palaces, golden deserts, and colourful culture — experience the land of kings.",
    heroImage:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 18000,
    highlights: ["Palaces", "Desert Safari", "Culture"],
    featured: false,
  },
  {
    _id: "p-5",
    name: "Andaman Islands",
    slug: "andaman-islands",
    description:
      "Crystal-clear waters, pristine beaches, and world-class diving in the Bay of Bengal.",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    region: "Islands",
    country: "India",
    startingPrice: 22000,
    highlights: ["Scuba Diving", "Beaches", "Water Sports"],
    featured: true,
  },
  {
    _id: "p-6",
    name: "Meghalaya",
    slug: "meghalaya",
    description:
      "Living root bridges, crystal-clear rivers, and the wettest place on earth await in the abode of clouds.",
    heroImage:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&h=600&fit=crop",
    region: "Northeast India",
    country: "India",
    startingPrice: 16000,
    highlights: ["Root Bridges", "Caves", "Waterfalls"],
    featured: false,
  },
  {
    _id: "p-7",
    name: "Varanasi",
    slug: "varanasi",
    description:
      "One of the oldest living cities in the world, where spirituality meets ancient traditions on the banks of the Ganges.",
    heroImage:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop",
    region: "North India",
    country: "India",
    startingPrice: 10000,
    highlights: ["Ghats", "Temples", "Spirituality"],
    featured: false,
  },
  {
    _id: "p-8",
    name: "Bali",
    slug: "bali",
    description:
      "Tropical paradise with terraced rice paddies, ancient temples, and vibrant arts — Indonesia's jewel.",
    heroImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    region: "International",
    country: "Indonesia",
    startingPrice: 45000,
    highlights: ["Temples", "Rice Terraces", "Beaches"],
    featured: true,
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
