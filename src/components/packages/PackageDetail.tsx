"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Check,
  X as XIcon,
  Clock,
  Users,
  MapPin,
  Mountain,
  Calendar,
  ArrowRight,
  Star,
  Sparkles,
  Info,
  CalendarClock,
  FileText,
  Download,
  Route as RouteIcon,
  ChevronRight,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface ItineraryDay {
  day: number
  title: string
  description: string
  activities?: string[]
  meals?: string
  accommodation?: string
  elevation?: string
  distance?: string
  highlight?: string
  image?: string
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
  rating?: number
  reviewCount?: number
  vehiclePricing?: {
    categories: string[]
    rows: { vehicle: string; prices: number[] }[]
    note?: string
  }
  transparencyNote?: string
  experienceStory?: string
  seasonalAdvisories?: string[]
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

/* ─── Meal icons helper ──────────────────────────────────────────────────── */

function MealIcons({ meals }: { meals: string }) {
  const lower = meals.toLowerCase()
  return (
    <div className="flex items-center gap-2">
      {lower.includes("breakfast") && (
        <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-400">
          <span role="img" aria-label="breakfast">🍳</span> Breakfast
        </span>
      )}
      {lower.includes("lunch") && (
        <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-1 text-xs text-orange-400">
          <span role="img" aria-label="lunch">🍽️</span> Lunch
        </span>
      )}
      {lower.includes("dinner") && (
        <span className="flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-400">
          <span role="img" aria-label="dinner">🌙</span> Dinner
        </span>
      )}
    </div>
  )
}

/* ─── Progress Tracker ───────────────────────────────────────────────────── */

function ProgressTracker({
  totalDays,
  activeDay,
  onDotClick,
}: {
  totalDays: number
  activeDay: number
  onDotClick: (day: number) => void
}) {
  return (
    <div className="mb-10 flex flex-col items-center gap-3">
      <p className="font-body text-[10.5px] font-semibold tracking-[0.28em] uppercase text-[#D4A853]">
        Day {activeDay} of {totalDays}
      </p>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1
          const isActive = day === activeDay
          const isPast = day < activeDay
          return (
            <button
              key={day}
              onClick={() => onDotClick(day)}
              className={`group relative h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "scale-125 border-[#C4324A] bg-[#C4324A] shadow-[0_0_12px_rgba(196,50,74,0.5)]"
                  : isPast
                    ? "border-[#D4A853] bg-[#D4A853]/60"
                    : "border-white/20 bg-transparent hover:border-white/40"
              }`}
              aria-label={`Go to day ${day}`}
            >
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#C4324A]"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Single Itinerary Day Card ──────────────────────────────────────────── */

function ItineraryDayCard({
  item,
  index,
  total,
}: {
  item: ItineraryDay
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="relative">
      {/* Timeline connector */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C4324A]/40 via-[#D4A853]/30 to-[#C4324A]/40 md:left-1/2 md:-translate-x-px" />

      {/* Day number badge on the timeline */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute left-6 top-6 z-10 -translate-x-1/2 md:left-1/2"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#C4324A] to-[#D4A853] text-sm font-bold text-white shadow-lg shadow-[#C4324A]/30">
          {item.day}
        </div>
      </motion.div>

      {/* Card content — alternating layout */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={`relative ml-14 md:ml-0 md:w-[calc(50%-40px)] ${
          isEven ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
        }`}
      >
        <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur transition-all duration-500 hover:border-[#D4A853]/30 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-[#C4324A]/5">
          {/* Day image */}
          {item.image && (
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/90 via-[#0A1425]/20 to-transparent" />

              {/* Highlight badge */}
              {item.highlight && (
                <div className="absolute bottom-3 left-3 right-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#C4324A] px-3 py-1.5 text-xs font-medium text-white shadow-lg shadow-[#D4A853]/30"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {item.highlight}
                  </motion.div>
                </div>
              )}

              {/* Elevation & distance badges on image */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                {item.elevation && (
                  <span className="flex items-center gap-1 rounded-full bg-[#0A1425]/70 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm">
                    <span role="img" aria-label="elevation">⛰️</span> {item.elevation}
                  </span>
                )}
                {item.distance && (
                  <span className="flex items-center gap-1 rounded-full bg-[#0A1425]/70 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm">
                    <span role="img" aria-label="distance">🚗</span> {item.distance}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Text content */}
          <div className="p-5">
            <h3 className="font-heading text-xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              {item.description}
            </p>

            {/* Activities as tags */}
            {item.activities && item.activities.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.activities.map((act, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60 transition-colors hover:border-[#C4324A]/20 hover:bg-[#C4324A]/10 hover:text-white/80"
                  >
                    {act}
                  </span>
                ))}
              </div>
            )}

            {/* Meals + Accommodation row */}
            <div className="mt-4 flex flex-col gap-2.5">
              {item.meals && <MealIcons meals={item.meals} />}
              {item.accommodation && (
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <span role="img" aria-label="accommodation">🏨</span>
                  <span>{item.accommodation}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spacing between cards */}
      {index < total - 1 && <div className="h-8 md:h-12" />}
    </div>
  )
}

/* ─── Route-at-a-glance (whole route on one screen) ──────────────────────── */

// Derive a short stop label from a day title (text before the first separator).
function shortStop(title: string): string {
  const cut = title.split(/\s+[—·–-]\s+| with | via | to | & /i)[0].trim()
  const cleaned = cut
    .replace(/^(Arrive|Arrival in|Depart|Departure from|Drive to|Fly to|Transfer to|Explore|Discover)\s+/i, "")
    .trim()
  return (cleaned || cut).length > 22 ? `${(cleaned || cut).slice(0, 22)}…` : cleaned || cut
}

function RouteMap({
  itinerary,
  onSelect,
}: {
  itinerary: ItineraryDay[]
  onSelect: (day: number) => void
}) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center gap-2">
        <RouteIcon className="h-4 w-4 text-[#D4A853]" />
        <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#D4A853]">
          Route at a glance
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-y-3">
        {itinerary.map((d, i) => (
          <div key={d.day} className="flex items-center">
            <button
              onClick={() => onSelect(d.day)}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 transition-colors hover:border-[#D4A853]/40 hover:bg-white/[0.08]"
              title={d.title}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C4324A] to-[#D4A853] text-[11px] font-bold text-white">
                {d.day}
              </span>
              <span className="whitespace-nowrap text-xs text-white/70 group-hover:text-white">
                {shortStop(d.title)}
              </span>
            </button>
            {i < itinerary.length - 1 && (
              <ChevronRight className="mx-0.5 h-3.5 w-3.5 shrink-0 text-white/25" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Component ──────────────────────────────────────────────────────── */

export function PackageDetail({ pkg }: PackageDetailProps) {
  const [activeDay, setActiveDay] = useState(1)
  const leadModal = useLeadModal()
  const itineraryRef = useRef<HTMLDivElement>(null)

  const hasDiscount =
    pkg.discountedPrice && pkg.price && pkg.discountedPrice < pkg.price
  const discountPercent = hasDiscount
    ? Math.round(((pkg.price! - pkg.discountedPrice!) / pkg.price!) * 100)
    : 0

  // International packages get a Visa & Passport section + forms.
  const isInternational =
    pkg.destination?.region === "International" ||
    (!!pkg.destination?.country && pkg.destination.country !== "India")
  const visaCountry = pkg.destination?.country || pkg.destination?.name

  const handleDotClick = (day: number) => {
    setActiveDay(day)
    // Scroll to the day's card
    if (itineraryRef.current) {
      const cards = itineraryRef.current.querySelectorAll("[data-day]")
      const target = Array.from(cards).find(
        (el) => (el as HTMLElement).dataset.day === String(day)
      )
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-10">
      {/* Main content — 2 columns on desktop */}
      <div className="lg:col-span-2 space-y-16">
        {/* Overview */}
        <section>
          <h2 className="hx font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.1] text-white md:text-4xl">
            <em className="italic font-normal text-[#FFB3A3]">Overview.</em>
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">{pkg.description}</p>

          {/* Experience story — evocative branded narrative */}
          {pkg.experienceStory && (
            <div className="mt-6 rounded-2xl border border-[#D4A853]/20 bg-gradient-to-br from-[#D4A853]/[0.07] to-transparent p-5">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#D4A853]" />
                <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#D4A853]">
                  The Experience
                </p>
              </div>
              <p className="text-[15px] leading-relaxed text-white/75">
                {pkg.experienceStory}
              </p>
            </div>
          )}

          {/* Transparency note — honest disclosure (pricing basis, taxi, group vs private) */}
          {pkg.transparencyNote && (
            <div className="mt-5 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#2BA5A5]" />
              <div>
                <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#2BA5A5]">
                  Good to know — full transparency
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  {pkg.transparencyNote}
                </p>
              </div>
            </div>
          )}

          {/* Seasonal advisories */}
          {pkg.seasonalAdvisories && pkg.seasonalAdvisories.length > 0 && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-[#E8923E]" />
                <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#E8923E]">
                  Seasonal advisory
                </p>
              </div>
              <ul className="space-y-2">
                {pkg.seasonalAdvisories.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed text-white/60"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8923E]/70" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

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

          {/* Rating */}
          {pkg.rating && pkg.reviewCount && (
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(pkg.rating!)
                        ? "fill-[#D4A853] text-[#D4A853]"
                        : i < pkg.rating!
                          ? "fill-[#D4A853]/50 text-[#D4A853]"
                          : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/60">
                {pkg.rating} ({pkg.reviewCount} reviews)
              </span>
            </div>
          )}
        </section>

        {/* Highlights */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <section>
            <h2 className="hx font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.1] text-white md:text-4xl">
              <em className="italic font-normal text-[#FFB3A3]">Highlights.</em>
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

        {/* ─── GAMIFIED ITINERARY ─────────────────────────────────────── */}
        {pkg.itinerary && pkg.itinerary.length > 0 && (
          <section>
            <h2 className="hx font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.08] text-white md:text-4xl">
              Your journey, <em className="italic font-normal text-[#FFB3A3]">day by day.</em>
            </h2>
            <p className="mt-2 text-sm text-white/40">
              {pkg.itinerary.length} days of carefully crafted experiences
            </p>

            {/* Route at a glance — the whole route on one screen (MoM: route map on 1 page) */}
            <RouteMap itinerary={pkg.itinerary} onSelect={handleDotClick} />

            {/* Progress tracker */}
            <div className="mt-8">
              <ProgressTracker
                totalDays={pkg.itinerary.length}
                activeDay={activeDay}
                onDotClick={handleDotClick}
              />
            </div>

            {/* Timeline */}
            <div ref={itineraryRef} className="relative">
              {pkg.itinerary.map((item, index) => (
                <div
                  key={item.day}
                  data-day={item.day}
                  onMouseEnter={() => setActiveDay(item.day)}
                >
                  <ItineraryDayCard
                    item={item}
                    index={index}
                    total={pkg.itinerary!.length}
                  />
                </div>
              ))}

              {/* Timeline end dot */}
              <div className="absolute left-6 bottom-0 z-10 -translate-x-1/2 md:left-1/2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A853] to-[#C4324A]">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Inclusions / Exclusions */}
        {(pkg.inclusions?.length || pkg.exclusions?.length) && (
          <section className="grid gap-6 sm:grid-cols-2">
            {pkg.inclusions && pkg.inclusions.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-heading text-xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
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
                <h3 className="font-heading text-xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
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

        {/* Visa & Passport (international packages) — MoM: attach forms along details */}
        {isInternational && (
          <section>
            <h2 className="hx font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.1] text-white md:text-4xl">
              <em className="italic font-normal text-[#FFB3A3]">Visa &amp; Passport.</em>
            </h2>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm leading-relaxed text-white/65">
                This is an international trip{visaCountry ? ` to ${visaCountry}` : ""}. Our team
                handles your visa documentation and passport guidance end-to-end — we share the
                country-specific document checklist, fill in the application forms for you, and
                track the file until your visa is stamped.
              </p>
              <ul className="mt-4 space-y-2.5">
                <li className="flex items-start gap-2 text-sm text-white/60">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  Passport must be valid for at least 6 months beyond your return date, with 2+
                  blank pages.
                </li>
                <li className="flex items-start gap-2 text-sm text-white/60">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  Country-specific visa fee, processing time and the full document list are on
                  our Visa &amp; Passport page.
                </li>
                <li className="flex items-start gap-2 text-sm text-white/60">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  We complete the visa application form on your behalf — you only provide the
                  documents.
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/visa-passport"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#2BA5A5] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2BA5A5]/90"
                >
                  <FileText className="h-4 w-4" />
                  View visa checklist &amp; fees
                </Link>
                <a
                  href="/forms/TravelSense-Visa-Passport-Forms.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm text-white/75 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                  Download visa &amp; passport forms
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Per-Vehicle Pricing (South India rate cards) */}
        {pkg.vehiclePricing && pkg.vehiclePricing.rows.length > 0 && (
          <section>
            <h2 className="hx font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.1] text-white md:text-4xl">
              <em className="italic font-normal text-[#FFB3A3]">Package Pricing.</em>
            </h2>
            <p className="mt-2 text-sm text-white/50">
              Whole-group package price by vehicle and hotel category — choose
              the group size and comfort level that suits you.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-heading text-xs font-medium uppercase tracking-wide text-white/50">
                      Vehicle / Group
                    </th>
                    {pkg.vehiclePricing.categories.map((c) => (
                      <th
                        key={c}
                        className="px-4 py-3 text-right font-heading text-xs font-medium uppercase tracking-wide text-white/50"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pkg.vehiclePricing.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 font-medium text-white/80">
                        {row.vehicle}
                      </td>
                      {row.prices.map((p, pi) => (
                        <td
                          key={pi}
                          className="px-4 py-3 text-right text-white/70"
                        >
                          {formatCurrency(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pkg.vehiclePricing.note && (
              <p className="mt-3 text-xs text-white/40">
                {pkg.vehiclePricing.note}
              </p>
            )}
          </section>
        )}

        {/* Gallery */}
        {pkg.images && pkg.images.length > 0 && (
          <section>
            <h2 className="hx font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.1] text-white md:text-4xl">
              <em className="italic font-normal text-[#FFB3A3]">Gallery.</em>
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
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/80 capitalize">
                    {pkg.category}
                  </span>
                </div>
              )}
              {pkg.rating && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-white/30" />
                    Rating
                  </span>
                  <span className="text-white/80">
                    {pkg.rating} / 5.0
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
