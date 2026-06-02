import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, MapPin, Star, Package, Clock } from "lucide-react"
import {
  travelCategories,
  getCategoryBySlug,
} from "@/config/categories"
import { packages } from "@/data/packages"
import { getDestinationBySlug } from "@/data/destinations"
import {
  generatePageMetadata,
  breadcrumbSchema,
} from "@/lib/seo"
import { formatCurrency } from "@/lib/utils"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"

export const dynamic = "force-static"

// ─── Static Params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return travelCategories.map((c) => ({ slug: c.slug }))
}

// ─── Dynamic Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) {
    return generatePageMetadata({
      title: "Category Not Found | TravelSense",
      description: "The category you are looking for does not exist.",
      path: `/categories/${slug}`,
    })
  }
  return generatePageMetadata({
    title: `${category.title} | TravelSense`,
    description: category.longDescription,
    path: `/categories/${category.slug}`,
  })
}

// ─── Package item shape for the category grid ───────────────────────────────

interface PackageItem {
  _id: string
  title: string
  slug: string
  description: string
  category: string
  duration: string | { days: number; nights: number }
  price: number
  discountedPrice?: number
  heroImage?: string
  difficulty?: string
  featured?: boolean
  destination?: { name: string; slug: string; region: string }
}

// ─── Real package filtering by category ─────────────────────────────────────
// Pulls live packages from src/data and filters by the category slug, so a
// click on Adventure / Leisure / Educational shows exactly those packages.

function getCategoryPackages(categorySlug: string): PackageItem[] {
  return packages
    .filter((p) => p.category === categorySlug)
    .map((p) => {
      const dest = getDestinationBySlug(p.destinationSlug)
      return {
        _id: p.slug,
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
        destination: {
          name: p.destinationName,
          slug: p.destinationSlug,
          region: dest?.region ?? "",
        },
      }
    })
    // Featured first, then by price ascending
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price)
    })
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) notFound()

  const categoryPackages = getCategoryPackages(slug)
  const Icon = category.icon

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
          { name: category.title, url: `/categories/${category.slug}` },
        ])}
      />

      {/* Hero */}
      <PageHero
        title={category.title}
        subtitle={category.longDescription}
        backgroundImage={`https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=600&fit=crop`}
      >
        <div className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3 backdrop-blur-sm">
          <Icon className="h-6 w-6 text-white" />
          <span className="font-body text-sm text-white/70">
            {category.description}
          </span>
        </div>
      </PageHero>

      <div className="bg-[#0A1425]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Categories", href: "/categories" },
              { label: category.title, href: `/categories/${category.slug}` },
            ]}
            className="mb-12"
          />

          {/* ── Highlights Section ─────────────────────────────────────── */}
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <Star className="h-5 w-5 text-[#D4A853]" />
              <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
                What to Expect
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${category.color.gradient} text-xs font-medium text-white`}>
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/70">{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Popular Destinations ───────────────────────────────────── */}
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#C4324A]" />
              <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
                Popular Destinations
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {category.popularDestinations.map((dest) => (
                <div
                  key={dest}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur transition-colors hover:border-[#C4324A]/30"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#C4324A]" />
                  <span className="text-sm text-white/70">{dest}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Related Packages ───────────────────────────────────────── */}
          <section className="mb-8">
            <div className="mb-8 flex items-center gap-3">
              <Package className="h-5 w-5 text-[#8A9BB5]" />
              <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
                {category.title} Packages
              </h2>
            </div>

            {categoryPackages.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
                <Package className="mx-auto h-10 w-10 text-white/20" />
                <p className="mt-4 text-white/50">
                  Packages coming soon. Contact us for custom {category.title.toLowerCase()} packages.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryPackages.map((pkg) => {
                  const imgUrl =
                    pkg.heroImage ||
                    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"

                  return (
                    <Link
                      key={pkg._id}
                      href={`/packages/${pkg.slug}`}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:border-[#C4324A]/30 hover:bg-white/[0.07]"
                    >
                      {/* Image */}
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={imgUrl}
                          alt={pkg.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/60 to-transparent" />
                        {pkg.featured && (
                          <span className="absolute top-3 right-3 rounded-full bg-[#D4A853]/90 px-2.5 py-0.5 text-xs font-medium text-[#0A1425]">
                            Featured
                          </span>
                        )}
                        {pkg.destination && (
                          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white/80 backdrop-blur-sm">
                            <MapPin className="h-3 w-3" />
                            {pkg.destination.name}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-heading text-base font-medium tracking-[-0.015em] leading-[1.15] text-white transition-colors group-hover:text-[#C4324A]">
                          {pkg.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm text-white/50">
                          {pkg.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                          <div className="flex items-center gap-1 text-xs text-white/40">
                            <Clock className="h-3 w-3" />
                            {typeof pkg.duration === "string"
                              ? pkg.duration
                              : `${pkg.duration.days} Days / ${pkg.duration.nights} Nights`}
                          </div>
                          <div className="text-right">
                            {pkg.discountedPrice ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white/30 line-through">
                                  {formatCurrency(pkg.price)}
                                </span>
                                <span className="text-sm font-medium text-[#D4A853]">
                                  {formatCurrency(pkg.discountedPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm font-medium text-white/70">
                                {formatCurrency(pkg.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] p-8 text-center backdrop-blur md:p-12">
            <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl">
              Ready to Start Your {category.title} Journey?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base">
              Get a personalized itinerary crafted by our travel experts. Book a
              free consultation today.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 rounded-full bg-[#C4324A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#A32A3E]"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                Browse All Packages
              </Link>
            </div>
          </div>

          <div className="pb-8" />
        </div>
      </div>
    </>
  )
}
