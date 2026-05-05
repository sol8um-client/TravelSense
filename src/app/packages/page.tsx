import { generatePageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { PackageFilters } from "@/components/packages/PackageFilters"
import type { PackageCardData } from "@/components/packages/PackageCard"
import { packages } from "@/data/packages"
import { destinations } from "@/data/destinations"

export const metadata = generatePageMetadata({
  title: "Travel Packages | TravelSense",
  description:
    "Browse curated travel packages across leisure, adventure, educational, and sports categories. Find the perfect trip for your next getaway.",
  path: "/packages",
})

/* ─── Map static data to PackageCardData ─────────────────────────────────── */

function getPackageCards(): PackageCardData[] {
  // Build a slug -> region lookup for fast region resolution
  const regionBySlug = new Map<string, string>(
    destinations.map((d) => [d.slug, d.region])
  )

  return packages.map((p, i) => ({
    _id: `pkg-${i + 1}`,
    title: p.title,
    slug: p.slug,
    description: p.description,
    category: p.category,
    duration: p.duration,
    price: p.price,
    discountedPrice: p.discountedPrice,
    heroImage: p.heroImage,
    difficulty: p.difficulty,
    featured: p.featured,
    highlights: p.highlights,
    destination: {
      name: p.destinationName,
      slug: p.destinationSlug,
      region: regionBySlug.get(p.destinationSlug) ?? undefined,
    },
  }))
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function PackagesPage() {
  const pkgCards = getPackageCards()

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
          <PackageFilters packages={pkgCards} />
        </div>
      </section>
    </>
  )
}
