import { generatePageMetadata } from "@/lib/seo"
import { supabase } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

export const metadata = generatePageMetadata({
  title: "Bookings | TravelSense Admin",
  description: "Manage consultation bookings and vehicle requests",
  path: "/admin/bookings",
  noIndex: true,
})

/* ── Placeholder data ── */

const PLACEHOLDER_CONSULTATIONS = [
  { id: "1", name: "Priya Sharma", email: "priya@example.com", phone: "+91 98765 43210", preferred_date: "2026-04-05", preferred_time: "10:00 AM", interests: "Leisure, Beach", status: "NEW", created_at: "2026-03-30T10:30:00Z" },
  { id: "2", name: "Rahul Mehta", email: "rahul@example.com", phone: "+91 87654 32109", preferred_date: "2026-04-07", preferred_time: "2:00 PM", interests: "Adventure, Trekking", status: "IN_PROGRESS", created_at: "2026-03-29T15:20:00Z" },
  { id: "3", name: "Anita Desai", email: "anita@example.com", phone: "+91 76543 21098", preferred_date: "2026-04-10", preferred_time: "11:00 AM", interests: "Educational, Heritage", status: "RESPONDED", created_at: "2026-03-28T09:15:00Z" },
]

const PLACEHOLDER_VEHICLES = [
  { id: "1", name: "Vikram Singh", email: "vikram@example.com", destination: "Manali", vehicle_type: "SUV", group_size: 6, status: "NEW", created_at: "2026-03-30T14:45:00Z" },
  { id: "2", name: "Neha Patel", email: "neha@example.com", destination: "Rajasthan", vehicle_type: "Tempo Traveller", group_size: 12, status: "IN_PROGRESS", created_at: "2026-03-29T08:00:00Z" },
  { id: "3", name: "Arjun Reddy", email: "arjun@example.com", destination: "Kerala", vehicle_type: "Sedan", group_size: 4, status: "CLOSED", created_at: "2026-03-27T16:30:00Z" },
]

/* ── Data fetching ── */

interface ConsultationBooking {
  id: string
  name: string
  email: string
  phone: string | null
  preferred_date: string | null
  preferred_time: string | null
  interests: string | null
  status: string
  created_at: string
}

interface VehicleRequest {
  id: string
  name: string
  email: string
  destination: string | null
  vehicle_type: string | null
  group_size: number | null
  status: string
  created_at: string
}

async function getConsultationBookings(): Promise<ConsultationBooking[]> {
  if (!supabase) return PLACEHOLDER_CONSULTATIONS as ConsultationBooking[]

  const sb = supabase
  const { data } = await sb
    .from("consultation_bookings")
    .select("id, name, email, phone, preferred_date, preferred_time, interests, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50)

  return (data ?? []) as ConsultationBooking[]
}

async function getVehicleRequests(): Promise<VehicleRequest[]> {
  if (!supabase) return PLACEHOLDER_VEHICLES as VehicleRequest[]

  const sb = supabase
  const { data } = await sb
    .from("vehicle_requests")
    .select("id, name, email, destination, vehicle_type, group_size, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50)

  return (data ?? []) as VehicleRequest[]
}

/* ── Page component ── */

export default async function BookingsPage() {
  const [consultations, vehicleRequests] = await Promise.all([
    getConsultationBookings(),
    getVehicleRequests(),
  ])
  const isPlaceholder = !supabase

  return (
    <div className="space-y-8">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl font-semibold text-white">Bookings</h1>
        <p className="mt-1 text-sm text-white/40">
          Consultation bookings and vehicle requests
        </p>
      </div>

      {isPlaceholder && (
        <div className="rounded-lg border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-3">
          <p className="text-sm text-[#D4A853]">
            Database not configured &mdash; showing placeholder data.
          </p>
        </div>
      )}

      <Tabs defaultValue="consultations" className="w-full">
        <TabsList className="bg-[#0D1A30] border border-white/10">
          <TabsTrigger
            value="consultations"
            className="text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            Consultations ({consultations.length})
          </TabsTrigger>
          <TabsTrigger
            value="vehicles"
            className="text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            Vehicle Requests ({vehicleRequests.length})
          </TabsTrigger>
        </TabsList>

        {/* Consultations tab */}
        <TabsContent value="consultations">
          <div className="rounded-xl border border-white/10 bg-[#0D1A30]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/40">Name</TableHead>
                  <TableHead className="text-white/40">Email</TableHead>
                  <TableHead className="text-white/40">Phone</TableHead>
                  <TableHead className="text-white/40">Preferred Date</TableHead>
                  <TableHead className="text-white/40">Time</TableHead>
                  <TableHead className="text-white/40">Interests</TableHead>
                  <TableHead className="text-white/40">Status</TableHead>
                  <TableHead className="text-white/40">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consultations.map((item) => (
                  <TableRow key={item.id} className="border-white/10">
                    <TableCell className="text-white">{item.name}</TableCell>
                    <TableCell className="text-white/70">{item.email}</TableCell>
                    <TableCell className="text-white/70">{item.phone ?? "—"}</TableCell>
                    <TableCell className="text-white/70">
                      {item.preferred_date
                        ? formatDate(item.preferred_date, { format: "medium" })
                        : "—"}
                    </TableCell>
                    <TableCell className="text-white/70">{item.preferred_time ?? "—"}</TableCell>
                    <TableCell className="max-w-[150px] truncate text-white/70">
                      {item.interests ?? "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.status ?? "NEW"} />
                    </TableCell>
                    <TableCell className="text-white/40">
                      {formatDate(item.created_at, { format: "medium" })}
                    </TableCell>
                  </TableRow>
                ))}
                {consultations.length === 0 && (
                  <TableRow className="border-white/10">
                    <TableCell colSpan={8} className="py-8 text-center text-white/40">
                      No consultation bookings yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Vehicle Requests tab */}
        <TabsContent value="vehicles">
          <div className="rounded-xl border border-white/10 bg-[#0D1A30]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/40">Name</TableHead>
                  <TableHead className="text-white/40">Email</TableHead>
                  <TableHead className="text-white/40">Destination</TableHead>
                  <TableHead className="text-white/40">Vehicle Type</TableHead>
                  <TableHead className="text-white/40">Group Size</TableHead>
                  <TableHead className="text-white/40">Status</TableHead>
                  <TableHead className="text-white/40">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleRequests.map((item) => (
                  <TableRow key={item.id} className="border-white/10">
                    <TableCell className="text-white">{item.name}</TableCell>
                    <TableCell className="text-white/70">{item.email}</TableCell>
                    <TableCell className="text-white/70">{item.destination ?? "—"}</TableCell>
                    <TableCell className="text-white/70">{item.vehicle_type ?? "—"}</TableCell>
                    <TableCell className="text-white/70">{item.group_size ?? "—"}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status ?? "NEW"} />
                    </TableCell>
                    <TableCell className="text-white/40">
                      {formatDate(item.created_at, { format: "medium" })}
                    </TableCell>
                  </TableRow>
                ))}
                {vehicleRequests.length === 0 && (
                  <TableRow className="border-white/10">
                    <TableCell colSpan={7} className="py-8 text-center text-white/40">
                      No vehicle requests yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
