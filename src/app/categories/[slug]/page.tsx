import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, MapPin, Star, Package, Clock } from "lucide-react"
import {
  travelCategories,
  getCategoryBySlug,
} from "@/config/categories"
import {
  sanityClient,
  packagesByCategoryQuery,
  urlFor,
} from "@/lib/sanity"
import {
  generatePageMetadata,
  breadcrumbSchema,
} from "@/lib/seo"
import { formatCurrency } from "@/lib/utils"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"

export const revalidate = 3600

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

// ─── Placeholder packages ───────────────────────────────────────────────────

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

function getPlaceholderPackages(categorySlug: string): PackageItem[] {
  const pkgMap: Record<string, PackageItem[]> = {
    leisure: [
      {
        _id: "lp1",
        title: "Kashmir Standard — Pahalgam, Gulmarg & Srinagar",
        slug: "kashmir-standard-pahalgam-gulmarg-srinagar",
        description: "Experience the paradise on earth with visits to Pahalgam, Gulmarg, and Srinagar over 7 days of scenic beauty and serenity.",
        category: "leisure",
        duration: "7 Days / 6 Nights",
        price: 28000,
        discountedPrice: 24500,
        heroImage: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&h=400&fit=crop",
        featured: true,
        destination: { name: "Kashmir", slug: "kashmir", region: "North India" },
      },
      {
        _id: "lp2",
        title: "Himachal Classic — Shimla, Manali & Dharamshala",
        slug: "himachal-classic-shimla-manali-dharamshala",
        description: "Explore the best of Himachal Pradesh from the colonial charm of Shimla to the adventure hub of Manali and spiritual Dharamshala.",
        category: "leisure",
        duration: "8 Days / 7 Nights",
        price: 22000,
        discountedPrice: 19500,
        heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop",
        destination: { name: "Himachal Pradesh", slug: "himachal-pradesh", region: "North India" },
      },
      {
        _id: "lp3",
        title: "Kerala Backwaters & Spices — Kochi to Kovalam",
        slug: "kerala-backwaters-spices-kochi-to-kovalam",
        description: "Journey through God's Own Country from the spice markets of Kochi to the tranquil backwaters and the beaches of Kovalam.",
        category: "leisure",
        duration: "7 Days / 6 Nights",
        price: 25000,
        discountedPrice: 22000,
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
        destination: { name: "Kerala", slug: "kerala", region: "South India" },
      },
      {
        _id: "lp4",
        title: "Goa Beach & Heritage — Complete Experience",
        slug: "goa-beach-heritage-complete-experience",
        description: "Discover the best of Goa with pristine beaches, Portuguese heritage, vibrant nightlife, and delicious coastal cuisine.",
        category: "leisure",
        duration: "5 Days / 4 Nights",
        price: 15000,
        discountedPrice: 12500,
        heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
        destination: { name: "Goa", slug: "goa", region: "West India" },
      },
      {
        _id: "lp5",
        title: "Char Dham Yatra by Helicopter — 6 Days Premium Pilgrimage",
        slug: "char-dham-yatra-by-helicopter-6-days-premium-pilgrimage",
        description: "Premium helicopter pilgrimage covering all four sacred Char Dham sites in Uttarakhand with luxury accommodation and VIP darshan.",
        category: "leisure",
        duration: "6 Days / 5 Nights",
        price: 200000,
        discountedPrice: 195000,
        heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
        featured: true,
        destination: { name: "Uttarakhand", slug: "uttarakhand", region: "North India" },
      },
    ],
    adventure: [
      {
        _id: "ap1",
        title: "Ladakh Complete Circuit — Leh, Nubra, Pangong & Kargil",
        slug: "ladakh-complete-circuit-leh-nubra-pangong-kargil",
        description: "The ultimate Ladakh adventure covering Leh, Nubra Valley, Pangong Lake, and Kargil with high-altitude passes and stunning landscapes.",
        category: "adventure",
        duration: "9 Days / 8 Nights",
        price: 35000,
        discountedPrice: 31000,
        heroImage: "https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?w=600&h=400&fit=crop",
        featured: true,
        destination: { name: "Leh-Ladakh", slug: "leh-ladakh", region: "North India" },
      },
      {
        _id: "ap2",
        title: "Kashmir with Gurez Valley — Extended Offbeat",
        slug: "kashmir-with-gurez-valley-extended-offbeat",
        description: "Go beyond the usual Kashmir trail with an extended journey into the remote and breathtaking Gurez Valley.",
        category: "adventure",
        duration: "10 Days / 9 Nights",
        price: 38000,
        discountedPrice: 34000,
        heroImage: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&h=400&fit=crop",
        destination: { name: "Kashmir", slug: "kashmir", region: "North India" },
      },
      {
        _id: "ap3",
        title: "Northeast Discovery — Assam, Meghalaya & Darjeeling",
        slug: "northeast-discovery-assam-meghalaya-darjeeling",
        description: "Discover the enchanting Northeast with tea gardens of Assam, living root bridges of Meghalaya, and the hill charm of Darjeeling.",
        category: "adventure",
        duration: "10 Days / 9 Nights",
        price: 35000,
        discountedPrice: 31500,
        heroImage: "https://images.unsplash.com/photo-1600075009920-c85a3a3f29c8?w=600&h=400&fit=crop",
        destination: { name: "Assam", slug: "assam", region: "Northeast India" },
      },
    ],
    educational: [
      {
        _id: "ep1",
        title: "Golden Triangle Explorer — Delhi, Agra & Jaipur",
        slug: "golden-triangle-explorer-delhi-agra-jaipur",
        description: "Explore India's iconic Golden Triangle with guided heritage walks through Delhi, the Taj Mahal in Agra, and royal palaces of Jaipur.",
        category: "educational",
        duration: "5 Days / 4 Nights",
        price: 18000,
        discountedPrice: 15500,
        heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
        featured: true,
        destination: { name: "Golden Triangle", slug: "golden-triangle", region: "North India" },
      },
      {
        _id: "ep2",
        title: "Uttarakhand Heritage & Nature — Nainital to Haridwar",
        slug: "uttarakhand-heritage-nature-nainital-to-haridwar",
        description: "A journey combining natural beauty and spiritual heritage from the lakes of Nainital to the sacred ghats of Haridwar.",
        category: "educational",
        duration: "7 Days / 6 Nights",
        price: 20000,
        discountedPrice: 17500,
        heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
        destination: { name: "Uttarakhand", slug: "uttarakhand", region: "North India" },
      },
      {
        _id: "ep3",
        title: "Royal Rajasthan — Jaipur to Jaisalmer Circuit",
        slug: "royal-rajasthan-jaipur-to-jaisalmer-circuit",
        description: "Traverse the royal heritage of Rajasthan from the Pink City of Jaipur through Jodhpur to the golden dunes of Jaisalmer.",
        category: "educational",
        duration: "8 Days / 7 Nights",
        price: 32000,
        discountedPrice: 28000,
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop",
        destination: { name: "Rajasthan", slug: "rajasthan", region: "North India" },
      },
    ],
    sports: [
      {
        _id: "sp1",
        title: "Ladakh Complete Circuit — Leh, Nubra, Pangong & Kargil",
        slug: "ladakh-complete-circuit-leh-nubra-pangong-kargil",
        description: "The ultimate Ladakh adventure with biking, trekking, and high-altitude challenges across Leh, Nubra Valley, Pangong Lake, and Kargil.",
        category: "sports",
        duration: "9 Days / 8 Nights",
        price: 35000,
        heroImage: "https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?w=600&h=400&fit=crop",
        featured: true,
        destination: { name: "Leh-Ladakh", slug: "leh-ladakh", region: "North India" },
      },
      {
        _id: "sp2",
        title: "Northeast Discovery — Assam, Meghalaya & Darjeeling",
        slug: "northeast-discovery-assam-meghalaya-darjeeling",
        description: "Trekking-focused exploration through the Northeast with challenging trails in Meghalaya, tea garden walks, and Darjeeling hill treks.",
        category: "sports",
        duration: "10 Days / 9 Nights",
        price: 35000,
        heroImage: "https://images.unsplash.com/photo-1600075009920-c85a3a3f29c8?w=600&h=400&fit=crop",
        destination: { name: "Assam", slug: "assam", region: "Northeast India" },
      },
    ],
  }
  return pkgMap[categorySlug] || []
}

// ─── Data Fetching ──────────────────────────────────────────────────────────

async function getCategoryPackages(
  categorySlug: string
): Promise<PackageItem[]> {
  try {
    const packages = await sanityClient.fetch(packagesByCategoryQuery, {
      category: categorySlug,
    })
    if (!packages || packages.length === 0)
      return getPlaceholderPackages(categorySlug)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return packages.map((pkg: any) => ({
      ...pkg,
      heroImage: pkg.heroImage
        ? urlFor(pkg.heroImage).width(600).height(400).url()
        : undefined,
    }))
  } catch {
    return getPlaceholderPackages(categorySlug)
  }
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

  const packages = await getCategoryPackages(slug)
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

            {packages.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
                <Package className="mx-auto h-10 w-10 text-white/20" />
                <p className="mt-4 text-white/50">
                  Packages coming soon. Contact us for custom {category.title.toLowerCase()} packages.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => {
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
