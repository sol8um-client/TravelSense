import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityClient, packageBySlugQuery, packageSlugsQuery, urlFor } from "@/lib/sanity"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { PackageDetail, type PackageDetailData } from "@/components/packages/PackageDetail"

export const revalidate = 3600

/* ─── Static params ───────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  try {
    const slugs: string[] = await sanityClient.fetch(packageSlugsQuery)
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

/* ─── Dynamic metadata ────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const pkg = await sanityClient.fetch(packageBySlugQuery, { slug })
    if (!pkg) {
      return generatePageMetadata({
        title: "Package Not Found | TravelSense",
        description: "The requested travel package could not be found.",
        path: `/packages/${slug}`,
      })
    }
    const ogImage = pkg.heroImage
      ? urlFor(pkg.heroImage).width(1200).height(630).url()
      : undefined
    return generatePageMetadata({
      title: `${pkg.title} | TravelSense`,
      description: pkg.description,
      path: `/packages/${slug}`,
      image: ogImage,
    })
  } catch {
    return generatePageMetadata({
      title: "Travel Package | TravelSense",
      description: "Explore curated travel packages with TravelSense.",
      path: `/packages/${slug}`,
    })
  }
}

/* ─── Helper: safe image URL ──────────────────────────────────────────────── */

function getImageUrl(source: unknown, w: number, h: number): string | null {
  if (!source) return null
  try {
    return urlFor(source).width(w).height(h).url()
  } catch {
    return null
  }
}

/* ─── Data fetching ───────────────────────────────────────────────────────── */

async function getPackage(slug: string): Promise<PackageDetailData | null> {
  try {
    const raw = await sanityClient.fetch(packageBySlugQuery, { slug })
    if (!raw) return null

    return {
      _id: raw._id,
      title: raw.title,
      slug: raw.slug,
      description: raw.description,
      category: raw.category,
      duration: raw.duration,
      price: raw.price,
      discountedPrice: raw.discountedPrice,
      heroImage: getImageUrl(raw.heroImage, 1600, 900) || undefined,
      images: raw.images
        ? (raw.images as unknown[])
            .map((img) => getImageUrl(img, 800, 600))
            .filter(Boolean) as string[]
        : undefined,
      inclusions: raw.inclusions,
      exclusions: raw.exclusions,
      itinerary: raw.itinerary,
      difficulty: raw.difficulty,
      groupSize: raw.groupSize,
      highlights: raw.highlights,
      featured: raw.featured,
      destination: raw.destination
        ? {
            _id: raw.destination._id,
            name: raw.destination.name,
            slug: raw.destination.slug,
            region: raw.destination.region,
            country: raw.destination.country,
            heroImage: getImageUrl(raw.destination.heroImage, 800, 600) || undefined,
          }
        : undefined,
    }
  } catch {
    return null
  }
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pkg = await getPackage(slug)

  if (!pkg) notFound()

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
          ...(pkg.heroImage && { image: pkg.heroImage }),
          ...(pkg.destination && {
            touristType: pkg.category,
            itinerary: pkg.itinerary
              ? {
                  "@type": "ItemList",
                  numberOfItems: pkg.itinerary.length,
                  itemListElement: pkg.itinerary.map((item) => ({
                    "@type": "ListItem",
                    position: item.day,
                    name: item.title,
                  })),
                }
              : undefined,
          }),
          ...(pkg.price && {
            offers: {
              "@type": "Offer",
              price: pkg.discountedPrice || pkg.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />

      {/* Hero */}
      <PageHero
        title={pkg.title}
        subtitle={
          pkg.destination
            ? `${pkg.destination.name}${pkg.destination.region ? ` · ${pkg.destination.region}` : ""}`
            : undefined
        }
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
          <PackageDetail pkg={pkg} />
        </div>
      </section>
    </>
  )
}
