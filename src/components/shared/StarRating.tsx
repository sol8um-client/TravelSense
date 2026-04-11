import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  max?: number
  size?: "sm" | "md"
  className?: string
}

export function StarRating({ rating, max = 5, size = "sm", className }: StarRatingProps) {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5"

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating)
        const half = !filled && i < rating
        return (
          <Star
            key={i}
            className={cn(
              iconSize,
              filled
                ? "fill-[#D4A853] text-[#D4A853]"
                : half
                  ? "fill-[#D4A853]/50 text-[#D4A853]"
                  : "fill-transparent text-white/20"
            )}
          />
        )
      })}
    </div>
  )
}
