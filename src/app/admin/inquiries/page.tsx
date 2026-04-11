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
  title: "Inquiries | TravelSense Admin",
  description: "Manage contact and visa inquiries",
  path: "/admin/inquiries",
  noIndex: true,
})

/* ── Placeholder data ── */

const PLACEHOLDER_CONTACT = [
  { id: "1", name: "Priya Sharma", email: "priya@example.com", phone: "+91 98765 43210", subject: "Group Trip to Goa", status: "NEW", created_at: "2026-03-30T10:30:00Z" },
  { id: "2", name: "Rahul Mehta", email: "rahul@example.com", phone: "+91 87654 32109", subject: "Corporate Offsite", status: "IN_PROGRESS", created_at: "2026-03-29T15:20:00Z" },
  { id: "3", name: "Anita Desai", email: "anita@example.com", phone: "+91 76543 21098", subject: "Honeymoon Package", status: "RESPONDED", created_at: "2026-03-28T09:15:00Z" },
  { id: "4", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 65432 10987", subject: "Family Vacation", status: "CLOSED", created_at: "2026-03-27T14:45:00Z" },
]

const PLACEHOLDER_VISA = [
  { id: "1", name: "Neha Patel", email: "neha@example.com", phone: "+91 98765 12345", destination: "Thailand", status: "NEW", created_at: "2026-03-30T08:00:00Z" },
  { id: "2", name: "Arjun Reddy", email: "arjun@example.com", phone: "+91 87654 23456", destination: "Singapore", status: "IN_PROGRESS", created_at: "2026-03-29T11:30:00Z" },
  { id: "3", name: "Kavita Joshi", email: "kavita@example.com", phone: "+91 76543 34567", destination: "Dubai", status: "RESPONDED", created_at: "2026-03-28T16:00:00Z" },
]

/* ── Data fetching ── */

interface ContactInquiry {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  status: string
  created_at: string
}

interface VisaInquiry {
  id: string
  name: string
  email: string
  phone: string | null
  destination: string | null
  status: string
  created_at: string
}

async function getContactInquiries(): Promise<ContactInquiry[]> {
  if (!supabase) return PLACEHOLDER_CONTACT as ContactInquiry[]

  const sb = supabase
  const { data } = await sb
    .from("contact_inquiries")
    .select("id, name, email, phone, subject, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50)

  return (data ?? []) as ContactInquiry[]
}

async function getVisaInquiries(): Promise<VisaInquiry[]> {
  if (!supabase) return PLACEHOLDER_VISA as VisaInquiry[]

  const sb = supabase
  const { data } = await sb
    .from("visa_inquiries")
    .select("id, name, email, phone, destination, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50)

  return (data ?? []) as VisaInquiry[]
}

/* ── Page component ── */

export default async function InquiriesPage() {
  const [contactInquiries, visaInquiries] = await Promise.all([
    getContactInquiries(),
    getVisaInquiries(),
  ])
  const isPlaceholder = !supabase

  return (
    <div className="space-y-8">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl font-semibold text-white">Inquiries</h1>
        <p className="mt-1 text-sm text-white/40">
          Contact and visa inquiries from the website
        </p>
      </div>

      {isPlaceholder && (
        <div className="rounded-lg border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-3">
          <p className="text-sm text-[#D4A853]">
            Database not configured &mdash; showing placeholder data.
          </p>
        </div>
      )}

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="bg-[#0D1A30] border border-white/10">
          <TabsTrigger
            value="contact"
            className="text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            Contact Inquiries ({contactInquiries.length})
          </TabsTrigger>
          <TabsTrigger
            value="visa"
            className="text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            Visa Inquiries ({visaInquiries.length})
          </TabsTrigger>
        </TabsList>

        {/* Contact Inquiries tab */}
        <TabsContent value="contact">
          <div className="rounded-xl border border-white/10 bg-[#0D1A30]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/40">Name</TableHead>
                  <TableHead className="text-white/40">Email</TableHead>
                  <TableHead className="text-white/40">Phone</TableHead>
                  <TableHead className="text-white/40">Subject</TableHead>
                  <TableHead className="text-white/40">Status</TableHead>
                  <TableHead className="text-white/40">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactInquiries.map((item) => (
                  <TableRow key={item.id} className="border-white/10">
                    <TableCell className="text-white">{item.name}</TableCell>
                    <TableCell className="text-white/70">{item.email}</TableCell>
                    <TableCell className="text-white/70">{item.phone ?? "—"}</TableCell>
                    <TableCell className="text-white/70">{item.subject ?? "—"}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status ?? "NEW"} />
                    </TableCell>
                    <TableCell className="text-white/40">
                      {formatDate(item.created_at, { format: "medium" })}
                    </TableCell>
                  </TableRow>
                ))}
                {contactInquiries.length === 0 && (
                  <TableRow className="border-white/10">
                    <TableCell colSpan={6} className="py-8 text-center text-white/40">
                      No contact inquiries yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Visa Inquiries tab */}
        <TabsContent value="visa">
          <div className="rounded-xl border border-white/10 bg-[#0D1A30]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/40">Name</TableHead>
                  <TableHead className="text-white/40">Email</TableHead>
                  <TableHead className="text-white/40">Phone</TableHead>
                  <TableHead className="text-white/40">Destination</TableHead>
                  <TableHead className="text-white/40">Status</TableHead>
                  <TableHead className="text-white/40">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visaInquiries.map((item) => (
                  <TableRow key={item.id} className="border-white/10">
                    <TableCell className="text-white">{item.name}</TableCell>
                    <TableCell className="text-white/70">{item.email}</TableCell>
                    <TableCell className="text-white/70">{item.phone ?? "—"}</TableCell>
                    <TableCell className="text-white/70">{item.destination ?? "—"}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status ?? "NEW"} />
                    </TableCell>
                    <TableCell className="text-white/40">
                      {formatDate(item.created_at, { format: "medium" })}
                    </TableCell>
                  </TableRow>
                ))}
                {visaInquiries.length === 0 && (
                  <TableRow className="border-white/10">
                    <TableCell colSpan={6} className="py-8 text-center text-white/40">
                      No visa inquiries yet
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
