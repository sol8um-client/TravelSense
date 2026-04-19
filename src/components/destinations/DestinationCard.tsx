import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, ArrowRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export interface DestinationCardData {
  _id: string
  name: string
  slug: string
  description: string
  heroImage?: string
  region: string
  country?: string
  startingPrice?: number
  highlights?: string[]
  featured?: boolean
}

interface DestinationCardProps {
  destination: DestinationCardData
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const {
    name,
    slug,
    description,
    heroImage,
    region,
    startingPrice,
    highlights,
    featured,
  } = destination

  return (
    <Link href={`/destinations/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:border-[#C4324A]/30 hover:shadow-lg hover:shadow-[#C4324A]/5">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0D1A30] to-[#0A1425]">
              <MapPin className="h-12 w-12 text-white/20" />
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425] via-transparent to-transparent opacity-80" />

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[#D4A853]/90 px-2.5 py-1 text-xs font-medium text-[#0A1425]">
              <Star className="h-3 w-3" />
              Featured
            </div>
          )}

          {/* Price badge */}
          {startingPrice && (
            <div className="absolute top-3 right-3 rounded-full bg-[#0A1425]/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              From {formatCurrency(startingPrice)}
            </div>
          )}

          {/* Bottom overlay text */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-heading text-xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-2xl">
              {name}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
              <MapPin className="h-3.5 w-3.5" />
              {region}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="line-clamp-2 text-sm text-white/60">
            {description}
          </p>

          {highlights && highlights.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {highlights.slice(0, 3).map((h, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/50"
                >
                  {h}
                </span>
              ))}
              {highlights.length > 3 && (
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/40">
                  +{highlights.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center text-sm font-medium text-[#C4324A] transition-colors group-hover:text-[#C4324A]/80">
            Explore
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}
