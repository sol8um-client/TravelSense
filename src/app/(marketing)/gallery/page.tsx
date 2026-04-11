import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { GalleryGrid, GALLERY_ITEMS } from "@/components/gallery/GalleryGrid"
import { GalleryCTA } from "@/components/gallery/GalleryCTA"

/* ═══════════════════════════════════════════════════════
   METADATA
   ═══════════════════════════════════════════════════════ */

export const metadata: Metadata = generatePageMetadata({
  title: "Gallery | TravelSense",
  description:
    "Explore stunning travel photography from across India and beyond. From Goa beaches to Ladakh mountains, see the world through the TravelSense lens.",
  path: "/gallery",
})

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#0A1425]">
      {/* Hero */}
      <PageHero
        title="Gallery"
        subtitle="Explore the world through our lens"
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=600&fit=crop"
      >
        <Breadcrumbs items={[{ label: "Gallery", href: "/gallery" }]} />
      </PageHero>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <GalleryGrid items={GALLERY_ITEMS} />
      </section>

      {/* CTA Section */}
      <GalleryCTA />
    </main>
  )
}
