import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  MapPin,
  Calendar,
  Cloud,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { sanityClient, destinationBySlugQuery, destinationSlugsQuery, urlFor } from "@/lib/sanity"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { formatCurrency } from "@/lib/utils"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"

export const revalidate = 3600

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface DestinationDetail {
  _id: string
  name: string
  slug: string
  description: string
  longDescription?: string
  heroImage?: unknown
  gallery?: unknown[]
  region: string
  country?: string
  category?: string
  bestTimeToVisit?: string
  weather?: {
    summer?: string
    winter?: string
    monsoon?: string
  }
  highlights?: string[]
  startingPrice?: number
  coordinates?: { lat: number; lng: number }
  featured?: boolean
  packages?: {
    _id: string
    title: string
    slug: string
    description: string
    category?: string
    duration?: { days: number; nights: number }
    price?: number
    discountedPrice?: number
    heroImage?: unknown
    difficulty?: string
    featured?: boolean
  }[]
}

/* ─── Static params ───────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  try {
    const slugs: string[] = await sanityClient.fetch(destinationSlugsQuery)
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
    const dest: DestinationDetail | null = await sanityClient.fetch(
      destinationBySlugQuery,
      { slug }
    )
    if (!dest) {
      return generatePageMetadata({
        title: "Destination Not Found | TravelSense",
        description: "The requested destination could not be found.",
        path: `/destinations/${slug}`,
      })
    }
    const ogImage = dest.heroImage
      ? urlFor(dest.heroImage).width(1200).height(630).url()
      : undefined
    return generatePageMetadata({
      title: `${dest.name} — Travel Guide | TravelSense`,
      description: dest.description,
      path: `/destinations/${slug}`,
      image: ogImage,
    })
  } catch {
    return generatePageMetadata({
      title: "Destination | TravelSense",
      description: "Explore amazing travel destinations with TravelSense.",
      path: `/destinations/${slug}`,
    })
  }
}

/* ─── Data fetching ───────────────────────────────────────────────────────── */

async function getDestination(slug: string): Promise<DestinationDetail | null> {
  try {
    const dest = await sanityClient.fetch(destinationBySlugQuery, { slug })
    return dest || null
  } catch {
    return null
  }
}

/* ─── Helper: build image URL ─────────────────────────────────────────────── */

function getImageUrl(source: unknown, w: number, h: number): string | null {
  if (!source) return null
  try {
    return urlFor(source).width(w).height(h).url()
  } catch {
    return null
  }
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const destination = await getDestination(slug)

  if (!destination) notFound()

  const heroUrl = getImageUrl(destination.heroImage, 1600, 900)

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Destinations", url: "/destinations" },
          { name: destination.name, url: `/destinations/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.description,
          ...(heroUrl && { image: heroUrl }),
        }}
      />

      {/* Hero */}
      <PageHero
        title={destination.name}
        subtitle={destination.description}
        backgroundImage={heroUrl || undefined}
      >
        <Breadcrumbs
          items={[
            { label: "Destinations", href: "/destinations" },
            { label: destination.name, href: `/destinations/${slug}` },
          ]}
        />
      </PageHero>

      {/* Quick info bar */}
      <section className="border-b border-white/5 bg-[#0D1A30] px-4 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 text-sm text-white/60 md:gap-10">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#C4324A]" />
            {destination.region}
            {destination.country && `, ${destination.country}`}
          </div>
          {destination.bestTimeToVisit && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#D4A853]" />
              Best time: {destination.bestTimeToVisit}
            </div>
          )}
          {destination.startingPrice && (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D4A853]" />
              Starting from{" "}
              <span className="font-medium text-[#C4324A]">
                {formatCurrency(destination.startingPrice)}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Overview */}
      {destination.longDescription && (
        <section className="bg-[#0A1425] px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
              Overview
            </h2>
            <div className="mt-6 whitespace-pre-line text-white/60 leading-relaxed">
              {destination.longDescription}
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      {destination.highlights && destination.highlights.length > 0 && (
        <section className="bg-[#0D1A30] px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
              Highlights
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {destination.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[#C4324A]/20 bg-[#C4324A]/10 px-4 py-2 text-sm text-white/80"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Weather */}
      {destination.weather && (
        <section className="bg-[#0A1425] px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
              Weather & Climate
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {destination.weather.summer && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-2 text-[#D4A853]">
                    <Cloud className="h-5 w-5" />
                    <h3 className="font-heading text-sm font-normal tracking-wide">
                      Summer
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-white/60">
                    {destination.weather.summer}
                  </p>
                </div>
              )}
              {destination.weather.monsoon && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-2 text-[#D4A853]">
                    <Cloud className="h-5 w-5" />
                    <h3 className="font-heading text-sm font-normal tracking-wide">
                      Monsoon
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-white/60">
                    {destination.weather.monsoon}
                  </p>
                </div>
              )}
              {destination.weather.winter && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-2 text-[#D4A853]">
                    <Cloud className="h-5 w-5" />
                    <h3 className="font-heading text-sm font-normal tracking-wide">
                      Winter
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-white/60">
                    {destination.weather.winter}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {destination.gallery && destination.gallery.length > 0 && (
        <section className="bg-[#0D1A30] px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
              Gallery
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destination.gallery.map((img, i) => {
                const url = getImageUrl(img, 600, 400)
                if (!url) return null
                return (
                  <div
                    key={i}
                    className="group relative aspect-[3/2] overflow-hidden rounded-xl border border-white/10"
                  >
                    <Image
                      src={url}
                      alt={`${destination.name} gallery ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Packages */}
      {destination.packages && destination.packages.length > 0 && (
        <section className="bg-[#0A1425] px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                Packages for {destination.name}
              </h2>
              <Link
                href={`/destinations/${slug}/packages`}
                className="hidden items-center gap-1 text-sm text-[#C4324A] transition-colors hover:text-[#C4324A]/80 md:flex"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destination.packages.slice(0, 6).map((pkg) => {
                const pkgImage = getImageUrl(pkg.heroImage, 600, 400)
                return (
                  <Link
                    key={pkg._id}
                    href={`/packages/${pkg.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#C4324A]/30"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {pkgImage ? (
                        <Image
                          src={pkgImage}
                          alt={pkg.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#0D1A30]">
                          <Sparkles className="h-8 w-8 text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/80 via-transparent to-transparent" />

                      {pkg.difficulty && (
                        <span className="absolute top-3 right-3 rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80 backdrop-blur">
                          {pkg.difficulty}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-heading text-base font-normal tracking-wide text-white">
                        {pkg.title}
                      </h3>
                      {pkg.duration && (
                        <p className="mt-1 text-xs text-white/50">
                          {pkg.duration.days} Days / {pkg.duration.nights} Nights
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-2">
                        {pkg.discountedPrice ? (
                          <>
                            <span className="text-sm font-medium text-[#C4324A]">
                              {formatCurrency(pkg.discountedPrice)}
                            </span>
                            <span className="text-xs text-white/40 line-through">
                              {formatCurrency(pkg.price || 0)}
                            </span>
                          </>
                        ) : pkg.price ? (
                          <span className="text-sm font-medium text-[#C4324A]">
                            {formatCurrency(pkg.price)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href={`/destinations/${slug}/packages`}
                className="inline-flex items-center gap-1 text-sm text-[#C4324A]"
              >
                View all packages
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#0D1A30] px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
            Ready to explore {destination.name}?
          </h2>
          <p className="mt-4 text-white/50">
            Let our travel experts craft the perfect itinerary for your trip.
          </p>
          <Link
            href="/consultation"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C4324A] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C4324A]/90"
          >
            Book a Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
