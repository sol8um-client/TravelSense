import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"
import { GalleryContent } from "@/components/gallery/GalleryContent"

/* ═══════════════════════════════════════════════════════
   METADATA
   ═══════════════════════════════════════════════════════ */

export const metadata: Metadata = generatePageMetadata({
  title: "Gallery",
  description:
    "Explore stunning travel photography from across India and beyond. From Goa beaches to Ladakh mountains, see the world through the TravelSense lens.",
  path: "/gallery",
})

/* ═══════════════════════════════════════════════════════
   PAGE - (marketing) layout already renders Header/Footer
   ═══════════════════════════════════════════════════════ */

export default function GalleryPage() {
  return <GalleryContent />
}
