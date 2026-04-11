import { generatePageMetadata } from "@/lib/seo"
import { supabase } from "@/lib/supabase"
import { StatCard } from "@/components/admin/StatCard"
import { TrendingUp, CalendarDays, MapPin, GitBranch } from "lucide-react"

export const metadata = generatePageMetadata({
  title: "Analytics | TravelSense Admin",
  description: "TravelSense analytics and insights",
  path: "/admin/analytics",
  noIndex: true,
})

/* ── Placeholder data ── */

const PLACEHOLDER_METRICS = {
  leadsThisMonth: 18,
  leadsThisWeek: 6,
  topDestinations: [
    { destination: "Goa", count: 8 },
    { destination: "Manali", count: 5 },
    { destination: "Rajasthan", count: 4 },
    { destination: "Kerala", count: 3 },
    { destination: "Dubai", count: 2 },
  ],
}

/* ── Data fetching ── */

async function getAnalytics() {
  if (!supabase) return PLACEHOLDER_METRICS

  const sb = supabase
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [monthResult, weekResult, destinationsResult] = await Promise.all([
    sb
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth),
    sb
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfWeek),
    sb
      .from("leads")
      .select("destination")
      .not("destination", "is", null)
      .order("created_at", { ascending: false })
      .limit(200),
  ])

  // Aggregate top destinations
  const destCounts: Record<string, number> = {}
  for (const row of destinationsResult.data ?? []) {
    const dest = (row.destination as string) ?? ""
    if (dest) destCounts[dest] = (destCounts[dest] ?? 0) + 1
  }
  const topDestinations = Object.entries(destCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([destination, count]) => ({ destination, count }))

  return {
    leadsThisMonth: monthResult.count ?? 0,
    leadsThisWeek: weekResult.count ?? 0,
    topDestinations,
  }
}

/* ── Page component ── */

export default async function AnalyticsPage() {
  const analytics = await getAnalytics()
  const isPlaceholder = !supabase

  return (
    <div className="space-y-8">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-white/40">
          Lead metrics and destination insights
        </p>
      </div>

      {isPlaceholder && (
        <div className="rounded-lg border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-3">
          <p className="text-sm text-[#D4A853]">
            Database not configured &mdash; showing placeholder data.
          </p>
        </div>
      )}

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          label="Leads This Month"
          value={analytics.leadsThisMonth}
        />
        <StatCard
          icon={CalendarDays}
          label="Leads This Week"
          value={analytics.leadsThisWeek}
        />
        <StatCard
          icon={MapPin}
          label="Top Destination"
          value={analytics.topDestinations[0]?.destination ?? "—"}
        />
        <StatCard
          icon={GitBranch}
          label="Conversion Funnel"
          value="Phase 2"
        />
      </div>

      {/* Top destinations */}
      <div className="rounded-xl border border-white/10 bg-[#0D1A30] p-6">
        <h2 className="mb-4 text-lg font-medium text-white">Top Destinations</h2>
        {analytics.topDestinations.length > 0 ? (
          <div className="space-y-3">
            {analytics.topDestinations.map((dest, i) => {
              const maxCount = analytics.topDestinations[0]?.count ?? 1
              const pct = Math.round((dest.count / maxCount) * 100)
              return (
                <div key={dest.destination} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">
                      {i + 1}. {dest.destination}
                    </span>
                    <span className="text-white/40">{dest.count} leads</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-[#C4324A]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-white/40">No destination data available</p>
        )}
      </div>

      {/* Chart placeholders */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-[#0D1A30]">
          <div className="text-center">
            <div className="mb-2 text-3xl text-white/20">
              <TrendingUp className="mx-auto h-10 w-10" />
            </div>
            <p className="text-sm text-white/30">Lead Trend Chart</p>
            <p className="mt-1 text-xs text-white/20">Coming in Phase 2</p>
          </div>
        </div>
        <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-[#0D1A30]">
          <div className="text-center">
            <div className="mb-2 text-3xl text-white/20">
              <GitBranch className="mx-auto h-10 w-10" />
            </div>
            <p className="text-sm text-white/30">Conversion Funnel</p>
            <p className="mt-1 text-xs text-white/20">Coming in Phase 2</p>
          </div>
        </div>
      </div>
    </div>
  )
}
