import { SearchX } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function EmptyState({
  title = "Nothing found",
  description = "Try adjusting your search or filters.",
  icon,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 text-center", className)}>
      <div className="mb-4 rounded-full bg-white/5 p-4">
        {icon || <SearchX className="h-8 w-8 text-white/30" />}
      </div>
      <h3 className="font-heading text-lg font-normal tracking-wide text-white/80">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-white/40">{description}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}
