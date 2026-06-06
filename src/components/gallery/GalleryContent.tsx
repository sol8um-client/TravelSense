"use client"

import { motion } from "framer-motion"
import { Camera, MapPin, Images } from "lucide-react"
import { PageHero } from "@/components/shared/PageHero"
import { GalleryGrid, GALLERY_ITEMS } from "@/components/gallery/GalleryGrid"
import { GalleryCTA } from "@/components/gallery/GalleryCTA"

export function GalleryContent() {
  return (
    <>
      {/* ── HERO - shared site hero ──────────────────────────────────────── */}
      <PageHero
        eyebrow="Through our lens"
        title="The TravelSense"
        accent="gallery."
        subtitle="Postcards from across India and beyond - from Goa's golden coast to the high passes of Ladakh."
        crumb="Gallery"
      >
        {[
          { icon: Images, label: `${GALLERY_ITEMS.length} photographs` },
          { icon: MapPin, label: "Across India & beyond" },
          { icon: Camera, label: "Shot on real trips" },
        ].map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/65 px-3.5 py-1.5 font-body text-[12.5px] font-medium text-primary shadow-[0_6px_18px_rgba(11,20,38,0.06)] backdrop-blur-md"
          >
            <c.icon className="h-3.5 w-3.5 text-secondary" strokeWidth={1.9} />
            {c.label}
          </span>
        ))}
      </PageHero>

      {/* ── GALLERY GRID - glass masonry on light ────────────────────────── */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Moments worth keeping
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Browse the collection.
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              Filter by mood, then tap any photo to see it full-frame with the story behind it.
            </p>
          </motion.div>

          <div className="mt-12">
            <GalleryGrid items={GALLERY_ITEMS} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <GalleryCTA />
    </>
  )
}
