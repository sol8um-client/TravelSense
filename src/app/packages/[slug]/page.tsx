import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { PackageDetail, type PackageDetailData } from "@/components/packages/PackageDetail"
import { packages } from "@/data/packages"

/* ─── Static params ───────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }))
}

/* ─── Dynamic metadata ────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pkg = packages.find((p) => p.slug === slug)

  if (!pkg) {
    return generatePageMetadata({
      title: "Package Not Found | TravelSense",
      description: "The requested travel package could not be found.",
      path: `/packages/${slug}`,
    })
  }

  return generatePageMetadata({
    title: `${pkg.title} | TravelSense`,
    description: pkg.description,
    path: `/packages/${slug}`,
    image: pkg.heroImage,
  })
}

/* ─── Map static package to PackageDetailData ─────────────────────────────── */

function toDetailData(
  pkg: (typeof packages)[number]
): PackageDetailData {
  return {
    _id: pkg.slug,
    title: pkg.title,
    slug: pkg.slug,
    description: pkg.description,
    category: pkg.category,
    duration: pkg.duration,
    price: pkg.price,
    discountedPrice: pkg.discountedPrice,
    heroImage: pkg.heroImage,
    images: pkg.images,
    inclusions: pkg.inclusions,
    exclusions: pkg.exclusions,
    itinerary: pkg.itinerary,
    difficulty: pkg.difficulty,
    groupSize: pkg.groupSize,
    highlights: pkg.highlights,
    featured: pkg.featured,
    rating: pkg.rating,
    reviewCount: pkg.reviewCount,
    destination: {
      _id: pkg.destinationSlug,
      name: pkg.destinationName,
      slug: pkg.destinationSlug,
    },
  }
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pkg = packages.find((p) => p.slug === slug)

  if (!pkg) notFound()

  const detailData = toDetailData(pkg)

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Packages", url: "/packages" },
          { name: pkg.title, url: `/packages/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: pkg.title,
          description: pkg.description,
          image: pkg.heroImage,
          touristType: pkg.category,
          itinerary: {
            "@type": "ItemList",
            numberOfItems: pkg.itinerary.length,
            itemListElement: pkg.itinerary.map((item) => ({
              "@type": "ListItem",
              position: item.day,
              name: item.title,
            })),
          },
          offers: {
            "@type": "Offer",
            price: pkg.discountedPrice || pkg.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        }}
      />

      {/* Hero */}
      <PageHero
        title={pkg.title}
        subtitle={pkg.destinationName}
        backgroundImage={pkg.heroImage}
      >
        <Breadcrumbs
          items={[
            { label: "Packages", href: "/packages" },
            { label: pkg.title, href: `/packages/${slug}` },
          ]}
        />
      </PageHero>

      {/* Detail content */}
      <section className="bg-[#0A1425] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <PackageDetail pkg={detailData} />
        </div>
      </section>
    </>
  )
}
