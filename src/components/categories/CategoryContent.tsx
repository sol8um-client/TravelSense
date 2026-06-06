"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  MapPin,
  Package,
  Clock,
  Sparkles,
  MessageCircle,
} from "lucide-react"
import { getCategoryBySlug } from "@/config/categories"
import { formatCurrency } from "@/lib/utils"
import { PageHero } from "@/components/shared/PageHero"
import { SectionWave } from "@/components/shared/SectionWave"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
  }),
}

/** Plain (serializable) package shape handed down from the server page. */
export interface PackageItem {
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

export default function CategoryContent({
  slug,
  packages,
}: {
  slug: string
  packages: PackageItem[]
}) {
  // Re-resolve the full category here so the icon component + highlights + color
  // never have to cross the server→client boundary (only the slug + the plain
  // package list do). The config just imports lucide icons, safe on the client.
  const category = getCategoryBySlug(slug)
  if (!category) return null
  const Icon = category.icon

  return (
    <>
      {/* ── HERO - shared site hero with the category chip ───────────────── */}
      <PageHero
        eyebrow="Travel category"
        title={category.title}
        subtitle={category.longDescription}
        crumb={category.title}
      >
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/65 px-4 py-2 font-body text-[12.5px] font-medium text-primary shadow-[0_6px_18px_rgba(11,20,38,0.06)] backdrop-blur-md">
          <Icon className="h-4 w-4 text-secondary" strokeWidth={1.9} />
          {category.description}
        </span>
      </PageHero>

      {/* ── WHAT TO EXPECT + POPULAR DESTINATIONS on a light band ────────── */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          {/* What to expect */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              What to expect
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Crafted for{" "}
              <span className="italic font-normal text-secondary">every kind of escape.</span>
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.highlights.map((highlight, i) => (
              <motion.div
                key={highlight}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="glass-panel group flex items-start gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.color.gradient} font-body text-[13px] font-semibold text-white shadow-sm`}
                >
                  {i + 1}
                </span>
                <span className="font-body text-[14px] leading-relaxed text-foreground/80">
                  {highlight}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Popular destinations */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-16 max-w-2xl"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Where travellers go
            </p>
            <h2
              className="mt-3 font-heading text-[1.7rem] font-medium leading-[1.1] tracking-[-0.02em] text-primary sm:text-[2.1rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Popular{" "}
              <span className="italic font-normal text-secondary">destinations.</span>
            </h2>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3">
            {category.popularDestinations.map((dest, i) => (
              <motion.span
                key={dest}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="glass-pill inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-[13.5px] font-medium text-primary"
              >
                <MapPin className="h-3.5 w-3.5 text-secondary" strokeWidth={2} />
                {dest}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ── PACKAGES on a navy band ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[6%] top-[8%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
          <div
            className="absolute -left-[4%] bottom-[6%] h-[280px] w-[280px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(196,50,74,0.12), transparent 70%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              <Package className="h-3.5 w-3.5" strokeWidth={2} />
              Ready to book
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              {category.title}{" "}
              <span className="italic font-normal text-accent">packages.</span>
            </h2>
          </motion.div>

          {packages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="glass-dark mt-10 rounded-[24px] p-12 text-center"
            >
              <Package className="mx-auto h-10 w-10 text-white/25" strokeWidth={1.5} />
              <p className="glass-text mx-auto mt-4 max-w-md font-body text-[14.5px] leading-relaxed text-white/65">
                Packages coming soon. Contact us for custom{" "}
                {category.title.toLowerCase()} packages.
              </p>
              <Link
                href="/consultation"
                className="btn btn-primary mt-6 inline-flex"
                style={{ padding: "13px 24px", fontSize: 13 }}
              >
                Plan a custom trip
                <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
            </motion.div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg, i) => {
                const imgUrl =
                  pkg.heroImage ||
                  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"

                return (
                  <motion.div
                    key={pkg._id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="glass-dark group block h-full overflow-hidden rounded-[22px] transition-all duration-300 hover:-translate-y-1.5"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/70 via-[#0A1425]/10 to-transparent" />
                        {pkg.featured && (
                          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent/95 px-2.5 py-1 font-body text-[10.5px] font-semibold text-primary shadow-sm">
                            <Sparkles className="h-3 w-3" strokeWidth={2} />
                            Featured
                          </span>
                        )}
                        {pkg.destination && (
                          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 font-body text-[11px] text-white/85 backdrop-blur-sm">
                            <MapPin className="h-3 w-3" strokeWidth={2} />
                            {pkg.destination.name}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="glass-text font-heading text-[16.5px] font-semibold tracking-[-0.01em] text-white transition-colors group-hover:text-accent-light">
                          {pkg.title}
                        </h3>
                        <p className="glass-text mt-1.5 line-clamp-2 font-body text-[13px] leading-relaxed text-white/55">
                          {pkg.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5">
                          <span className="inline-flex items-center gap-1.5 font-body text-[12px] text-white/50">
                            <Clock className="h-3.5 w-3.5" strokeWidth={1.9} />
                            {typeof pkg.duration === "string"
                              ? pkg.duration
                              : `${pkg.duration.days} Days / ${pkg.duration.nights} Nights`}
                          </span>
                          <div className="text-right">
                            {pkg.discountedPrice ? (
                              <div className="flex items-center gap-2">
                                <span className="font-body text-[11px] text-white/30 line-through">
                                  {formatCurrency(pkg.price)}
                                </span>
                                <span className="font-body text-[14px] font-semibold text-accent-light">
                                  {formatCurrency(pkg.discountedPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-body text-[14px] font-semibold text-white/75">
                                {formatCurrency(pkg.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="glass-dark mt-14 rounded-[28px] p-8 text-center md:p-12"
          >
            <h2
              className="glass-text font-heading text-[1.7rem] font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-[2.2rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Ready to start your {category.title.toLowerCase()}{" "}
              <span className="italic font-normal text-accent">journey?</span>
            </h2>
            <p className="glass-text mx-auto mt-3 max-w-xl font-body text-[14.5px] leading-[1.65] text-white/60 md:text-[15.5px]">
              Get a personalized itinerary crafted by our travel experts. Book a
              free consultation today.
            </p>
            <div className="mt-7 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              <Link href="/consultation" className="btn btn-primary" style={{ padding: "15px 30px", fontSize: 14 }}>
                <MessageCircle size={16} strokeWidth={1.8} />
                Book a consultation
                <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-[15px] font-body text-[14px] font-semibold text-white/75 transition-all hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
              >
                Browse all packages
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
