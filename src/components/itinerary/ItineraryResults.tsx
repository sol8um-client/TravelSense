"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { toast } from "sonner"
import { MapPin, Clock, ArrowRight, MessageCircle, Share2, Check, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDuration } from "@/lib/utils"

interface Recommendation {
  title: string
  destination: string
  duration: number
  price: number
  matchScore: number
  slug?: string
}

interface ItineraryResultsProps {
  recommendations: Recommendation[]
  message: string
  shareUrl?: string
}

const SAVED_KEY = "travelsense_saved_itineraries"

export default function ItineraryResults({
  recommendations,
  message,
  shareUrl,
}: ItineraryResultsProps) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleShare() {
    const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "")
    if (!url) return
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My TravelSense Itinerary",
          text: "Check out the travel packages TravelSense recommended for me.",
          url,
        })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Shareable link copied to clipboard.")
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.error("Could not share the link.")
    }
  }

  function handleSave() {
    if (typeof window === "undefined") return
    try {
      const url = shareUrl || window.location.href
      const existing: string[] = JSON.parse(
        localStorage.getItem(SAVED_KEY) || "[]"
      )
      if (!existing.includes(url)) {
        existing.push(url)
        localStorage.setItem(SAVED_KEY, JSON.stringify(existing))
      }
      setSaved(true)
      toast.success("Itinerary saved to this device.")
    } catch {
      toast.error("Could not save the itinerary.")
    }
  }
  if (!recommendations || recommendations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
          <MapPin className="h-7 w-7 text-white/30" />
        </div>
        <h3 className="mt-4 font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white">
          No Matches Found
        </h3>
        <p className="mx-auto mt-2 max-w-md font-body text-sm text-white/50">
          {message ||
            "We could not find packages matching your criteria. Try adjusting your budget or interests, or contact us for a custom itinerary."}
        </p>
        <Button
          asChild
          className="mt-6 bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
        >
          <Link href="/contact">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Us
          </Link>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6 text-center">
        <h3 className="font-heading text-xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-2xl">
          Recommended Packages
        </h3>
        {message && (
          <p className="mt-2 font-body text-sm text-white/50">{message}</p>
        )}
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleShare}
            className="border-white/15 bg-white/5 font-body text-white/80 hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Share2 className="mr-1.5 h-3.5 w-3.5" />
            )}
            {copied ? "Link Copied" : "Share"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleSave}
            disabled={saved}
            className="border-white/15 bg-white/5 font-body text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-60"
          >
            {saved ? (
              <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Bookmark className="mr-1.5 h-3.5 w-3.5" />
            )}
            {saved ? "Saved" : "Save Itinerary"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((pkg, index) => (
          <motion.div
            key={`${pkg.title}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:border-[#C4324A]/30 md:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-heading text-base font-medium tracking-[-0.015em] leading-[1.15] text-white">
                    {pkg.title}
                  </h4>
                  {pkg.matchScore >= 80 && (
                    <Badge className="border-[#D4A853]/30 bg-[#D4A853]/10 font-body text-[#D4A853]">
                      {pkg.matchScore}% Match
                    </Badge>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-white/50">
                  <span className="flex items-center gap-1 font-body text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {pkg.destination}
                  </span>
                  <span className="flex items-center gap-1 font-body text-sm">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDuration(pkg.duration)}
                  </span>
                </div>

                {/* Match Score Bar */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        pkg.matchScore >= 80
                          ? "bg-emerald-400"
                          : pkg.matchScore >= 60
                            ? "bg-[#D4A853]"
                            : "bg-white/30"
                      )}
                      style={{ width: `${pkg.matchScore}%` }}
                    />
                  </div>
                  <span className="font-body text-xs text-white/40">
                    {pkg.matchScore}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 sm:ml-6">
                <p className="font-heading text-lg font-normal text-[#D4A853]">
                  {formatCurrency(pkg.price)}
                </p>
                <p className="font-body text-xs text-white/40">per person</p>
                <div className="flex gap-2">
                  {pkg.slug ? (
                    <Button
                      asChild
                      size="sm"
                      className="bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
                    >
                      <Link href={`/packages/${pkg.slug}`}>
                        View Package
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      className="bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
                    >
                      <Link href="/contact">
                        Contact Us
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
