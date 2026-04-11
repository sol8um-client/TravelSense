import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Mountain, ArrowRight, Star } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export interface PackageCardData {
  _id: string
  title: string
  slug: string
  description: string
  category?: string
  duration?: { days: number; nights: number }
  price?: number
  discountedPrice?: number
  heroImage?: string
  difficulty?: string
  featured?: boolean
  highlights?: string[]
  destination?: {
    name: string
    slug: string
    region?: string
  }
}

interface PackageCardProps {
  pkg: PackageCardData
}

export function PackageCard({ pkg }: PackageCardProps) {
  const {
    title,
    slug,
    description,
    category,
    duration,
    price,
    discountedPrice,
    heroImage,
    difficulty,
    featured,
    destination,
  } = pkg

  const hasDiscount = discountedPrice && price && discountedPrice < price
  const discountPercent = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0

  return (
    <Link href={`/packages/${slug}`} className="group block">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:border-[#C4324A]/30 hover:shadow-lg hover:shadow-[#C4324A]/5">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0D1A30] to-[#0A1425]">
              <Mountain className="h-12 w-12 text-white/20" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/80 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {featured && (
              <span className="flex items-center gap-1 rounded-full bg-[#D4A853]/90 px-2.5 py-1 text-xs font-medium text-[#0A1425]">
                <Star className="h-3 w-3" />
                Featured
              </span>
            )}
            {category && (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80 backdrop-blur">
                {category}
              </span>
            )}
          </div>

          {/* Discount badge */}
          {hasDiscount && (
            <span className="absolute top-3 right-3 rounded-full bg-[#C4324A] px-2.5 py-1 text-xs font-medium text-white">
              {discountPercent}% OFF
            </span>
          )}

          {/* Duration badge at bottom of image */}
          {duration && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#0A1425]/70 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
              <Clock className="h-3 w-3" />
              {duration.days}D / {duration.nights}N
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-heading text-base font-normal tracking-wide text-white md:text-lg">
            {title}
          </h3>

          {destination && (
            <div className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
              <MapPin className="h-3 w-3" />
              {destination.name}
              {destination.region && ` · ${destination.region}`}
            </div>
          )}

          <p className="mt-2 line-clamp-2 flex-1 text-sm text-white/50">
            {description}
          </p>

          {/* Bottom row: difficulty + price */}
          <div className="mt-4 flex items-end justify-between">
            {difficulty && (
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  difficulty === "Easy"
                    ? "bg-green-500/10 text-green-400"
                    : difficulty === "Moderate"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : difficulty === "Challenging"
                        ? "bg-orange-500/10 text-orange-400"
                        : "bg-red-500/10 text-red-400"
                }`}
              >
                {difficulty}
              </span>
            )}

            <div className="text-right">
              {hasDiscount ? (
                <>
                  <span className="block text-xs text-white/40 line-through">
                    {formatCurrency(price)}
                  </span>
                  <span className="text-lg font-medium text-[#C4324A]">
                    {formatCurrency(discountedPrice)}
                  </span>
                </>
              ) : price ? (
                <span className="text-lg font-medium text-[#C4324A]">
                  {formatCurrency(price)}
                </span>
              ) : (
                <span className="text-sm text-white/40">Price on request</span>
              )}
              <span className="block text-xs text-white/30">per person</span>
            </div>
          </div>

          <div className="mt-4 flex items-center text-sm font-medium text-[#C4324A] transition-colors group-hover:text-[#C4324A]/80">
            View Details
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}
