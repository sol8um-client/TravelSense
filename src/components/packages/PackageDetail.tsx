"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ChevronUp,
  Check,
  X as XIcon,
  Clock,
  Users,
  MapPin,
  Mountain,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface ItineraryDay {
  day: number
  title: string
  description: string
  activities?: string[]
}

export interface PackageDetailData {
  _id: string
  title: string
  slug: string
  description: string
  category?: string
  duration?: { days: number; nights: number }
  price?: number
  discountedPrice?: number
  heroImage?: string
  images?: string[]
  inclusions?: string[]
  exclusions?: string[]
  itinerary?: ItineraryDay[]
  difficulty?: string
  groupSize?: { min?: number; max?: number }
  highlights?: string[]
  featured?: boolean
  destination?: {
    _id: string
    name: string
    slug: string
    region?: string
    country?: string
    heroImage?: string
  }
}

interface PackageDetailProps {
  pkg: PackageDetailData
}

/* ─── Itinerary Accordion Item ────────────────────────────────────────────── */

function ItineraryItem({ item, isOpen, onToggle }: { item: ItineraryDay; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-white/15">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C4324A]/10 text-sm font-medium text-[#C4324A]">
          {item.day}
        </span>
        <span className="flex-1 text-sm font-medium text-white">
          {item.title}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-white/40" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white/40" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-4 pb-4 pt-3">
              <p className="text-sm text-white/60 leading-relaxed">
                {item.description}
              </p>
              {item.activities && item.activities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.activities.map((act, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main Component ──────────────────────────────────────────────────────── */

export function PackageDetail({ pkg }: PackageDetailProps) {
  const [openDay, setOpenDay] = useState<number | null>(
    pkg.itinerary && pkg.itinerary.length > 0 ? pkg.itinerary[0].day : null
  )
  const leadModal = useLeadModal()

  const hasDiscount =
    pkg.discountedPrice && pkg.price && pkg.discountedPrice < pkg.price
  const discountPercent = hasDiscount
    ? Math.round(((pkg.price! - pkg.discountedPrice!) / pkg.price!) * 100)
    : 0

  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-10">
      {/* Main content — 2 columns on desktop */}
      <div className="lg:col-span-2 space-y-16">
        {/* Overview */}
        <section>
          <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
            Overview
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">{pkg.description}</p>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pkg.duration && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <Clock className="mx-auto h-5 w-5 text-[#D4A853]" />
                <p className="mt-2 text-sm font-medium text-white">
                  {pkg.duration.days}D / {pkg.duration.nights}N
                </p>
                <p className="text-xs text-white/40">Duration</p>
              </div>
            )}
            {pkg.difficulty && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <Mountain className="mx-auto h-5 w-5 text-[#D4A853]" />
                <p className="mt-2 text-sm font-medium text-white">
                  {pkg.difficulty}
                </p>
                <p className="text-xs text-white/40">Difficulty</p>
              </div>
            )}
            {pkg.groupSize && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <Users className="mx-auto h-5 w-5 text-[#D4A853]" />
                <p className="mt-2 text-sm font-medium text-white">
                  {pkg.groupSize.min || 2}–{pkg.groupSize.max || 20}
                </p>
                <p className="text-xs text-white/40">Group Size</p>
              </div>
            )}
            {pkg.destination && (
              <Link
                href={`/destinations/${pkg.destination.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-colors hover:border-[#D4A853]/30 hover:bg-white/[0.08]"
              >
                <MapPin className="mx-auto h-5 w-5 text-[#D4A853]" />
                <p className="mt-2 text-sm font-medium text-white">
                  {pkg.destination.name}
                </p>
                <p className="text-xs text-white/40">Destination</p>
              </Link>
            )}
          </div>
        </section>

        {/* Highlights */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-normal tracking-wide text-white">
              Highlights
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {pkg.highlights.map((h, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[#C4324A]/20 bg-[#C4324A]/10 px-4 py-2 text-sm text-white/80"
                >
                  {h}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Itinerary */}
        {pkg.itinerary && pkg.itinerary.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-normal tracking-wide text-white">
              Day-by-Day Itinerary
            </h2>
            <div className="mt-6 space-y-3">
              {pkg.itinerary.map((item) => (
                <ItineraryItem
                  key={item.day}
                  item={item}
                  isOpen={openDay === item.day}
                  onToggle={() =>
                    setOpenDay(openDay === item.day ? null : item.day)
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* Inclusions / Exclusions */}
        {(pkg.inclusions?.length || pkg.exclusions?.length) && (
          <section className="grid gap-6 sm:grid-cols-2">
            {pkg.inclusions && pkg.inclusions.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-heading text-lg font-normal tracking-wide text-white">
                  Inclusions
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {pkg.exclusions && pkg.exclusions.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-heading text-lg font-normal tracking-wide text-white">
                  Exclusions
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Gallery */}
        {pkg.images && pkg.images.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-normal tracking-wide text-white">
              Gallery
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pkg.images.map((img, i) => (
                <div
                  key={i}
                  className="group relative aspect-[3/2] overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={img}
                    alt={`${pkg.title} photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Pricing sidebar — sticky on desktop */}
      <div className="mt-10 lg:mt-0">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            {/* Price */}
            <div className="text-center">
              {hasDiscount ? (
                <>
                  <span className="rounded-full bg-[#C4324A]/10 px-3 py-1 text-xs font-medium text-[#C4324A]">
                    {discountPercent}% OFF
                  </span>
                  <div className="mt-3">
                    <span className="text-sm text-white/40 line-through">
                      {formatCurrency(pkg.price!)}
                    </span>
                    <p className="text-3xl font-medium text-[#C4324A]">
                      {formatCurrency(pkg.discountedPrice!)}
                    </p>
                  </div>
                </>
              ) : pkg.price ? (
                <p className="text-3xl font-medium text-[#C4324A]">
                  {formatCurrency(pkg.price)}
                </p>
              ) : (
                <p className="text-lg text-white/60">Price on request</p>
              )}
              <p className="mt-1 text-xs text-white/40">per person</p>
            </div>

            {/* Quick info */}
            <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-white/60">
              {pkg.duration && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-white/30" />
                    Duration
                  </span>
                  <span className="text-white/80">
                    {pkg.duration.days}D / {pkg.duration.nights}N
                  </span>
                </div>
              )}
              {pkg.difficulty && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Mountain className="h-4 w-4 text-white/30" />
                    Difficulty
                  </span>
                  <span className="text-white/80">{pkg.difficulty}</span>
                </div>
              )}
              {pkg.groupSize && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-white/30" />
                    Group Size
                  </span>
                  <span className="text-white/80">
                    {pkg.groupSize.min || 2}–{pkg.groupSize.max || 20} people
                  </span>
                </div>
              )}
              {pkg.category && (
                <div className="flex items-center justify-between">
                  <span>Category</span>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/80">
                    {pkg.category}
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => leadModal.open(`package-${pkg.slug}`)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C4324A] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#C4324A]/90"
            >
              Book This Package
              <ArrowRight className="h-4 w-4" />
            </button>

            <Link
              href="/consultation"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
            >
              Need help deciding?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
