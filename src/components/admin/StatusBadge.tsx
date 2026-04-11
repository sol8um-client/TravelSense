import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  NEW: { bg: "bg-[#C4324A]/20", text: "text-[#C4324A]", label: "New" },
  IN_PROGRESS: { bg: "bg-[#D4A853]/20", text: "text-[#D4A853]", label: "In Progress" },
  RESPONDED: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Responded" },
  CLOSED: { bg: "bg-white/10", text: "text-white/50", label: "Closed" },
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.NEW

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        style.bg,
        style.text,
        className
      )}
    >
      {style.label}
    </span>
  )
}
