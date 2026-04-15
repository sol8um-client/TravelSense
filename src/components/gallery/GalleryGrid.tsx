"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { X, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type GalleryCategory =
  | "Destinations"
  | "Adventure"
  | "Culture"
  | "Nature"
  | "Food"

interface GalleryItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: GalleryCategory
  destination: string
}

interface GalleryGridProps {
  items: GalleryItem[]
  className?: string
}

/* ═══════════════════════════════════════════════════════
   GALLERY DATA — 20 curated India travel photos
   ═══════════════════════════════════════════════════════ */

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Shikara on Dal Lake",
    description:
      "Glide across the mirror-still waters of Dal Lake in a hand-painted shikara as the Zabarwan mountains reflect in the morning haze.",
    imageUrl:
      "https://images.unsplash.com/photo-1597074866923-dc0589150458?w=800&h=600&fit=crop",
    category: "Destinations",
    destination: "Srinagar, Kashmir",
  },
  {
    id: "2",
    title: "Pangong Tso at Dawn",
    description:
      "The mesmerizing blue waters of Pangong Lake stretch endlessly against stark Ladakhi mountains, shifting from azure to turquoise with the light.",
    imageUrl:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
    category: "Nature",
    destination: "Ladakh",
  },
  {
    id: "3",
    title: "Golden Fort of Jaisalmer",
    description:
      "Rising like a mirage from the Thar Desert, Jaisalmer Fort glows with golden sandstone as the last light of day washes over its ramparts.",
    imageUrl:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
    category: "Destinations",
    destination: "Jaisalmer, Rajasthan",
  },
  {
    id: "4",
    title: "Alleppey Houseboat Cruise",
    description:
      "Drift through the tranquil backwaters of Alleppey on a traditional kettuvallam, surrounded by lush paddy fields and coconut palms.",
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    category: "Nature",
    destination: "Alleppey, Kerala",
  },
  {
    id: "5",
    title: "Golden Hour at Palolem",
    description:
      "Silhouettes of fishing boats frame the setting sun at Palolem Beach, one of South Goa's most serene stretches of coastline.",
    imageUrl:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    category: "Destinations",
    destination: "Goa",
  },
  {
    id: "6",
    title: "Roopkund Trek Trail",
    description:
      "Trekkers navigate alpine meadows dotted with wildflowers en route to the mysterious Skeleton Lake, high in the Garhwal Himalayas.",
    imageUrl:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",
    category: "Adventure",
    destination: "Uttarakhand",
  },
  {
    id: "7",
    title: "Evening Aarti at Dashashwamedh",
    description:
      "Flames dance in synchronized rhythm as priests perform the ancient Ganga Aarti ceremony on the sacred ghats of Varanasi.",
    imageUrl:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop",
    category: "Culture",
    destination: "Varanasi, Uttar Pradesh",
  },
  {
    id: "8",
    title: "Nohkalikai Falls",
    description:
      "India's tallest plunge waterfall cascades into an emerald pool far below, framed by the misty cliffs of Cherrapunji.",
    imageUrl:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
    category: "Nature",
    destination: "Cherrapunji, Meghalaya",
  },
  {
    id: "9",
    title: "Holi Festival of Colors",
    description:
      "Clouds of vivid gulal fill the air as revelers celebrate the festival of colors in the narrow lanes of Pushkar.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
    category: "Culture",
    destination: "Pushkar, Rajasthan",
  },
  {
    id: "10",
    title: "Chandni Chowk Street Food",
    description:
      "From piping-hot paranthas to crispy jalebis, the bustling lanes of Old Delhi serve up centuries of culinary tradition.",
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",
    category: "Food",
    destination: "Old Delhi",
  },
  {
    id: "11",
    title: "Khardung La Pass",
    description:
      "Prayer flags snap in the thin mountain air at one of the world's highest motorable passes, a rite of passage for every Ladakh road-tripper.",
    imageUrl:
      "https://images.unsplash.com/photo-1600298882525-15c423be972e?w=800&h=600&fit=crop",
    category: "Adventure",
    destination: "Leh, Ladakh",
  },
  {
    id: "12",
    title: "Kedarnath Temple",
    description:
      "Nestled against a backdrop of snow-capped peaks, Kedarnath Temple stands as one of the holiest Char Dham pilgrimage sites.",
    imageUrl:
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?w=800&h=600&fit=crop",
    category: "Culture",
    destination: "Kedarnath, Uttarakhand",
  },
  {
    id: "13",
    title: "Tea Plantations at Sunrise",
    description:
      "Endless rolling hills carpeted in emerald-green tea gardens catch the first golden rays, a photographer's dream in Munnar.",
    imageUrl:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    category: "Nature",
    destination: "Munnar, Kerala",
  },
  {
    id: "14",
    title: "Key Monastery",
    description:
      "Perched on a hilltop at 4,166 metres, Key Monastery is the largest and oldest in Spiti Valley, a living museum of Tibetan Buddhism.",
    imageUrl:
      "https://images.unsplash.com/photo-1574236170880-fae743734954?w=800&h=600&fit=crop",
    category: "Destinations",
    destination: "Spiti Valley, Himachal Pradesh",
  },
  {
    id: "15",
    title: "Traditional Kerala Sadhya",
    description:
      "A feast of over 24 dishes served on a fresh banana leaf — the vegetarian Sadhya is Kerala's most celebrated culinary tradition.",
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    category: "Food",
    destination: "Kochi, Kerala",
  },
  {
    id: "16",
    title: "White Water Rafting",
    description:
      "Navigating the exhilarating Grade III and IV rapids of the Ganges in Rishikesh, the adventure capital of India.",
    imageUrl:
      "https://images.unsplash.com/photo-1530866495561-507c83ccd1d0?w=800&h=600&fit=crop",
    category: "Adventure",
    destination: "Rishikesh, Uttarakhand",
  },
  {
    id: "17",
    title: "Virupaksha Temple Complex",
    description:
      "The surreal boulder-strewn landscape of Hampi frames the towering gopuram of Virupaksha, a living relic of the Vijayanagara Empire.",
    imageUrl:
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&h=600&fit=crop",
    category: "Culture",
    destination: "Hampi, Karnataka",
  },
  {
    id: "18",
    title: "Radhanagar Beach",
    description:
      "Powder-white sand meets crystal-clear turquoise water at Asia's most celebrated beach on Havelock Island.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    category: "Destinations",
    destination: "Havelock Island, Andaman",
  },
  {
    id: "19",
    title: "Darjeeling Chai Stall",
    description:
      "Steaming cups of hand-rolled Darjeeling tea served from a hillside stall, with Kanchenjunga peeking through the morning clouds.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "Food",
    destination: "Darjeeling, West Bengal",
  },
  {
    id: "20",
    title: "Paragliding over Solang Valley",
    description:
      "Soar above pine forests and snow-dusted peaks on a tandem paragliding flight from one of India's most popular adventure hubs.",
    imageUrl:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop",
    category: "Adventure",
    destination: "Manali, Himachal Pradesh",
  },
]

/* ═══════════════════════════════════════════════════════
   FILTER TABS
   ═══════════════════════════════════════════════════════ */

const FILTER_OPTIONS: Array<{
  label: string
  value: GalleryCategory | "All"
}> = [
  { label: "All", value: "All" },
  { label: "Destinations", value: "Destinations" },
  { label: "Adventure", value: "Adventure" },
  { label: "Culture", value: "Culture" },
  { label: "Nature", value: "Nature" },
  { label: "Food", value: "Food" },
]

const CATEGORY_COLORS: Record<GalleryCategory, string> = {
  Destinations: "bg-[#D4A853]/90 text-[#0A1425]",
  Adventure: "bg-[#C4324A]/90 text-white",
  Culture: "bg-[#8A9BB5]/90 text-[#0A1425]",
  Nature: "bg-emerald-600/90 text-white",
  Food: "bg-amber-600/90 text-white",
}

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: { duration: 0.25 },
  },
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const lightboxVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
}

/* ═══════════════════════════════════════════════════════
   GALLERY GRID COMPONENT
   ═══════════════════════════════════════════════════════ */

export function GalleryGrid({ items, className }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<
    GalleryCategory | "All"
  >("All")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(
    null
  )

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((item) => item.category === activeFilter)

  const handleOpen = useCallback((item: GalleryItem) => {
    setSelectedItem(item)
    document.body.style.overflow = "hidden"
  }, [])

  const handleClose = useCallback(() => {
    setSelectedItem(null)
    document.body.style.overflow = ""
  }, [])

  return (
    <section className={cn("relative", className)}>
      {/* ── Filter Tabs ── */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            className={cn(
              "relative rounded-full px-5 py-2 font-body text-sm font-medium tracking-wide transition-all duration-300",
              activeFilter === option.value
                ? "bg-[#C4324A] text-white shadow-lg shadow-[#C4324A]/25"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
            )}
          >
            {option.label}
            {activeFilter === option.value && (
              <motion.div
                layoutId="gallery-filter-indicator"
                className="absolute inset-0 rounded-full bg-[#C4324A]"
                style={{ zIndex: -1 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Photo Count ── */}
      <p className="mb-6 text-center font-body text-sm text-[#8A9BB5]">
        Showing {filteredItems.length} photo
        {filteredItems.length !== 1 ? "s" : ""}
      </p>

      {/* ── Masonry Grid ── */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => handleOpen(item)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Empty State ── */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="font-body text-white/40">
            No photos found for this category.
          </p>
        </div>
      )}

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   GALLERY CARD
   ═══════════════════════════════════════════════════════ */

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem
  index: number
  onClick: () => void
}) {
  // Vary aspect ratios for masonry effect
  const aspectClass =
    index % 5 === 0
      ? "aspect-[3/4]"
      : index % 3 === 0
        ? "aspect-[4/5]"
        : "aspect-[4/3]"

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      className="group relative cursor-pointer overflow-hidden rounded-lg break-inside-avoid"
      onClick={onClick}
    >
      <div className={cn("relative w-full overflow-hidden", aspectClass)}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 font-body text-xs font-semibold tracking-wide backdrop-blur-sm",
              CATEGORY_COLORS[item.category]
            )}
          >
            {item.category}
          </span>
        </div>

        {/* Title + Destination overlay on hover */}
        <div className="absolute right-0 bottom-0 left-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="font-heading text-sm font-normal tracking-wide text-white md:text-base">
            {item.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-white/70">
            <MapPin className="h-3 w-3 text-[#C4324A]" />
            <span className="font-body text-xs">{item.destination}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   LIGHTBOX MODAL
   ═══════════════════════════════════════════════════════ */

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem
  onClose: () => void
}) {
  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Content */}
      <motion.div
        variants={lightboxVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-[#0A1425]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video w-full">
          <Image
            src={item.imageUrl.replace(
              "w=800&h=600",
              "w=1200&h=800"
            )}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                "inline-block rounded-full px-4 py-1.5 font-body text-xs font-semibold tracking-wide backdrop-blur-sm",
                CATEGORY_COLORS[item.category]
              )}
            >
              {item.category}
            </span>
          </div>
        </div>

        {/* Info panel */}
        <div className="p-6 md:p-8">
          <h2 className="font-heading text-lg font-normal tracking-wide text-white md:text-xl">
            {item.title}
          </h2>
          <div className="mt-2 flex items-center gap-1.5 text-[#D4A853]">
            <MapPin className="h-4 w-4" />
            <span className="font-body text-sm font-medium">
              {item.destination}
            </span>
          </div>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/60 md:text-base">
            {item.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
