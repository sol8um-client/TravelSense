import { generatePageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { DestinationGrid } from "@/components/destinations/DestinationGrid"
import type { DestinationCardData } from "@/components/destinations/DestinationCard"
import { destinations } from "@/data/destinations"

export const dynamic = "force-static"

export const metadata = generatePageMetadata({
  title: "Destinations | TravelSense",
  description:
    "Explore handpicked travel destinations across India and beyond. From serene beaches to majestic mountains, find your perfect getaway with TravelSense.",
  path: "/destinations",
})

/* ─── Map static data to card format ─────────────────────────────────────── */

const destinationCards: DestinationCardData[] = destinations.map((d, i) => ({
  _id: `dest-${i + 1}`,
  name: d.name,
  slug: d.slug,
  description: d.tagline + " — " + d.description,
  heroImage: d.heroImage,
  region: d.region,
  country: d.country,
  startingPrice: d.startingPrice,
  highlights: d.highlights,
  featured: d.featured,
}))

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function DestinationsPage() {
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
          <DestinationGrid destinations={destinationCards} />
        </div>
      </section>
    </>
  )
}
