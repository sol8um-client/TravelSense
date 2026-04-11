"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { X, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type GalleryCategory = "Leisure" | "Adventure" | "Educational" | "Sports"

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
   PLACEHOLDER DATA
   ═══════════════════════════════════════════════════════ */

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Sunset over Palolem Beach",
    description:
      "Golden hour at one of Goa's most serene beaches. The gentle waves and swaying palms create an unforgettable tropical escape.",
    imageUrl:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    category: "Leisure",
    destination: "Goa",
  },
  {
    id: "2",
    title: "Pangong Tso at Dawn",
    description:
      "The mesmerizing blue waters of Pangong Lake stretch endlessly against the stark Ladakhi mountains, a sight that leaves every traveler speechless.",
    imageUrl:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop",
    category: "Adventure",
    destination: "Ladakh",
  },
  {
    id: "3",
    title: "Hawa Mahal in Morning Light",
    description:
      "The Palace of Winds stands tall in the Pink City, its 953 windows casting intricate shadows as the morning sun illuminates Jaipur's heritage.",
    imageUrl:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop",
    category: "Educational",
    destination: "Jaipur",
  },
  {
    id: "4",
    title: "Kerala Backwater Houseboat",
    description:
      "Drift through the tranquil backwaters of Alleppey on a traditional kettuvallam, surrounded by lush green paddy fields and coconut palms.",
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
    category: "Leisure",
    destination: "Kerala",
  },
  {
    id: "5",
    title: "Skiing in Gulmarg",
    description:
      "Fresh powder on the slopes of Gulmarg, Kashmir's premier winter sports destination with some of the best skiing terrain in Asia.",
    imageUrl:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=400&fit=crop",
    category: "Sports",
    destination: "Gulmarg",
  },
  {
    id: "6",
    title: "Valley of Flowers Trek",
    description:
      "A UNESCO World Heritage Site bursting with alpine wildflowers, the Valley of Flowers in Uttarakhand is a trekker's paradise.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    category: "Adventure",
    destination: "Uttarakhand",
  },
  {
    id: "7",
    title: "Taj Mahal at Sunrise",
    description:
      "The iconic monument of love bathed in the soft pink hues of dawn. An experience that transcends every photograph ever taken.",
    imageUrl:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
    category: "Educational",
    destination: "Agra",
  },
  {
    id: "8",
    title: "Surfing at Varkala Cliffs",
    description:
      "Catching waves beneath the dramatic red laterite cliffs of Varkala, where adventure meets the Arabian Sea.",
    imageUrl:
      "https://images.unsplash.com/photo-1502680390548-bdbac40c7a7a?w=600&h=400&fit=crop",
    category: "Sports",
    destination: "Varkala",
  },
  {
    id: "9",
    title: "Munnar Tea Plantations",
    description:
      "Endless rolling hills carpeted in emerald green tea gardens. Munnar's plantations are a feast for the senses and a photographer's dream.",
    imageUrl:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop",
    category: "Leisure",
    destination: "Munnar",
  },
  {
    id: "10",
    title: "Hampi's Ancient Ruins",
    description:
      "The surreal boulder-strewn landscape of Hampi houses remnants of the mighty Vijayanagara Empire, a UNESCO treasure waiting to be explored.",
    imageUrl:
      "https://images.unsplash.com/photo-1590050752117-238cb20e10fa?w=600&h=400&fit=crop",
    category: "Educational",
    destination: "Hampi",
  },
  {
    id: "11",
    title: "River Rafting in Rishikesh",
    description:
      "Navigating the exhilarating rapids of the Ganges in Rishikesh, the adventure capital of India, surrounded by forested Himalayan foothills.",
    imageUrl:
      "https://images.unsplash.com/photo-1530866495561-507c83e6a9da?w=600&h=400&fit=crop",
    category: "Adventure",
    destination: "Rishikesh",
  },
  {
    id: "12",
    title: "Desert Safari in Jaisalmer",
    description:
      "Camel rides across the golden Thar Desert dunes as the sun sets behind ancient Rajasthani forts. A timeless experience.",
    imageUrl:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop",
    category: "Adventure",
    destination: "Jaisalmer",
  },
  {
    id: "13",
    title: "Cricket at Dharamshala Stadium",
    description:
      "The world's most scenic cricket ground, nestled in the Himalayas with snow-capped peaks as the backdrop to every boundary.",
    imageUrl:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
    category: "Sports",
    destination: "Dharamshala",
  },
  {
    id: "14",
    title: "Andaman Island Diving",
    description:
      "Crystal-clear waters teeming with vibrant coral reefs and marine life. Havelock Island offers some of the best diving in South Asia.",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    category: "Sports",
    destination: "Andaman Islands",
  },
  {
    id: "15",
    title: "Udaipur Lake Palace",
    description:
      "The floating palace on Lake Pichola embodies royal Rajasthani grandeur. Udaipur's City of Lakes never fails to enchant visitors.",
    imageUrl:
      "https://images.unsplash.com/photo-1585135497273-1a86d9d1e0a3?w=600&h=400&fit=crop",
    category: "Leisure",
    destination: "Udaipur",
  },
]

/* ═══════════════════════════════════════════════════════
   FILTER TABS
   ═══════════════════════════════════════════════════════ */

const FILTER_OPTIONS: Array<{ label: string; value: GalleryCategory | "All" }> = [
  { label: "All", value: "All" },
  { label: "Leisure", value: "Leisure" },
  { label: "Adventure", value: "Adventure" },
  { label: "Educational", value: "Educational" },
  { label: "Sports", value: "Sports" },
]

const CATEGORY_COLORS: Record<GalleryCategory, string> = {
  Leisure: "bg-[#D4A853]/90 text-[#0A1425]",
  Adventure: "bg-[#C4324A]/90 text-white",
  Educational: "bg-[#8A9BB5]/90 text-[#0A1425]",
  Sports: "bg-emerald-600/90 text-white",
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
  const [activeFilter, setActiveFilter] = useState<GalleryCategory | "All">("All")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

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
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />
            )}
          </button>
        ))}
      </div>

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
            <MapPin className="h-3 w-3" />
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
            src={item.imageUrl.replace("w=600&h=400", "w=1200&h=800")}
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
