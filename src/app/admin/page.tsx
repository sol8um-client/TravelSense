import { generatePageMetadata } from "@/lib/seo"
import { supabase } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"
import { StatCard } from "@/components/admin/StatCard"
import { StatusBadge } from "@/components/admin/StatusBadge"
import {
  Users,
  MessageSquare,
  CalendarCheck,
  Car,
  FileText,
  Mail,
} from "lucide-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

export const metadata = generatePageMetadata({
  title: "Admin Dashboard | TravelSense",
  description: "TravelSense admin dashboard",
  path: "/admin",
  noIndex: true,
})

/* ── Placeholder data when Supabase is not configured ── */

const PLACEHOLDER_STATS = {
  leads: 24,
  contactInquiries: 8,
  consultationBookings: 5,
  vehicleRequests: 3,
  visaInquiries: 6,
  newsletterSubscribers: 42,
}

const PLACEHOLDER_RECENT = [
  { id: "1", name: "Priya Sharma", email: "priya@example.com", source: "Contact Form", status: "NEW", created_at: "2026-03-30T10:30:00Z" },
  { id: "2", name: "Rahul Mehta", email: "rahul@example.com", source: "Consultation", status: "IN_PROGRESS", created_at: "2026-03-29T15:20:00Z" },
  { id: "3", name: "Anita Desai", email: "anita@example.com", source: "Vehicle Request", status: "NEW", created_at: "2026-03-29T09:15:00Z" },
  { id: "4", name: "Vikram Singh", email: "vikram@example.com", source: "Visa Inquiry", status: "RESPONDED", created_at: "2026-03-28T14:45:00Z" },
  { id: "5", name: "Neha Patel", email: "neha@example.com", source: "Lead", status: "NEW", created_at: "2026-03-28T08:00:00Z" },
]

/* ── Data fetching ── */

async function getStats() {
  if (!supabase) return PLACEHOLDER_STATS

  const sb = supabase

  const tables = [
    { key: "leads", table: "leads" },
    { key: "contactInquiries", table: "contact_inquiries" },
    { key: "consultationBookings", table: "consultation_bookings" },
    { key: "vehicleRequests", table: "vehicle_requests" },
    { key: "visaInquiries", table: "visa_inquiries" },
    { key: "newsletterSubscribers", table: "newsletter_subscribers" },
  ] as const

  const results = await Promise.all(
    tables.map(({ table }) =>
      sb.from(table).select("*", { count: "exact", head: true })
    )
  )

  const stats: Record<string, number> = {}
  tables.forEach(({ key }, i) => {
    stats[key] = results[i].count ?? 0
  })

  return stats as unknown as typeof PLACEHOLDER_STATS
}

async function getRecentActivity() {
  if (!supabase) return PLACEHOLDER_RECENT

  const sb = supabase

  // Fetch the 5 most recent leads
  const { data: leads } = await sb
    .from("leads")
    .select("id, name, email, source, created_at")
    .order("created_at", { ascending: false })
    .limit(5)

  return (leads ?? []).map((lead) => ({
    ...lead,
    status: "NEW",
    source: lead.source ?? "Website",
  }))
}

/* ── Page component ── */

export default async function AdminDashboardPage() {
  const stats = await getStats()
  const recentActivity = await getRecentActivity()
  const isPlaceholder = !supabase

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/40">
          Overview of leads, inquiries, and bookings
        </p>
      </div>

      {/* Database not configured banner */}
      {isPlaceholder && (
        <div className="rounded-lg border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-3">
          <p className="text-sm text-[#D4A853]">
            Database not configured &mdash; showing placeholder data. Connect
            Supabase to see real metrics.
          </p>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Users} label="Total Leads" value={stats.leads} />
        <StatCard icon={MessageSquare} label="Contact Inquiries" value={stats.contactInquiries} />
        <StatCard icon={CalendarCheck} label="Consultation Bookings" value={stats.consultationBookings} />
        <StatCard icon={Car} label="Vehicle Requests" value={stats.vehicleRequests} />
        <StatCard icon={FileText} label="Visa Inquiries" value={stats.visaInquiries} />
        <StatCard icon={Mail} label="Newsletter Subscribers" value={stats.newsletterSubscribers} />
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-white/10 bg-[#0D1A30]">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-medium text-white">Recent Activity</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/40">Name</TableHead>
              <TableHead className="text-white/40">Email</TableHead>
              <TableHead className="text-white/40">Source</TableHead>
              <TableHead className="text-white/40">Status</TableHead>
              <TableHead className="text-white/40">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity.map((item) => (
              <TableRow key={item.id} className="border-white/10">
                <TableCell className="text-white">{item.name}</TableCell>
                <TableCell className="text-white/70">{item.email}</TableCell>
                <TableCell className="text-white/70">{item.source}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="text-white/40">
                  {formatDate(item.created_at, { format: "medium" })}
                </TableCell>
              </TableRow>
            ))}
            {recentActivity.length === 0 && (
              <TableRow className="border-white/10">
                <TableCell colSpan={5} className="py-8 text-center text-white/40">
                  No recent activity
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
