import { generatePageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { DestinationGrid } from "@/components/destinations/DestinationGrid"
import type { DestinationCardData } from "@/components/destinations/DestinationCard"
import { destinations, comingSoonDestinations } from "@/data/destinations"

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

const comingSoonCards: DestinationCardData[] = comingSoonDestinations.map(
  (d, i) => ({
    _id: `soon-${i + 1}`,
    name: d.name,
    slug: d.slug,
    description: d.tagline,
    heroImage: d.heroImage,
    region: d.region,
    country: d.country,
    comingSoon: true,
  })
)

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

          {/* Coming soon — client-provided destinations, itineraries in progress */}
          {comingSoonCards.length > 0 && (
            <div className="mt-20">
              <div className="mb-8 text-center">
                <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#2BA5A5]">
                  Coming Soon
                </p>
                <h2 className="mt-2 font-heading text-3xl font-medium tracking-[-0.02em] text-white md:text-4xl">
                  More destinations, <em className="italic font-normal text-[#FFB3A3]">on the way.</em>
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-white/50">
                  We&apos;re curating these next. Tap any one to register your interest and we&apos;ll
                  reach out the moment its itineraries are ready.
                </p>
              </div>
              <DestinationGrid destinations={comingSoonCards} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
