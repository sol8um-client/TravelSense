import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number | string
  className?: string
}

export function StatCard({ icon: Icon, label, value, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-white/10 bg-[#0D1A30] p-6 transition-colors hover:border-white/20",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/5">
          <Icon className="h-6 w-6 text-[#8A9BB5]" />
        </div>
        <div>
          <p className="text-sm text-white/40">{label}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}
