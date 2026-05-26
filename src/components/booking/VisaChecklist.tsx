"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, FileText, Clock, BadgeInfo, IndianRupee } from "lucide-react"
import { cn } from "@/lib/utils"

type VisaRegion =
  | "Asia & Middle East"
  | "Europe"
  | "Americas"
  | "Australia"
  | "Other"

interface VisaChecklistEntry {
  region: VisaRegion
  destination: string
  flag: string
  visaType: string
  processingTime: string
  validity: string
  visaFee?: string
  serviceCharge?: string
  documents: string[]
  note?: string
}

/**
 * Visa document & charges checklist by destination.
 * Data sourced from btwvisas.com country pages.
 * All figures are indicative and confirmed at the time of inquiry.
 */
const VISA_CHECKLISTS: VisaChecklistEntry[] = [
  // ────────────── ASIA & MIDDLE EAST ──────────────
  {
    region: "Asia & Middle East",
    destination: "Singapore",
    flag: "\u{1F1F8}\u{1F1EC}",
    visaType: "Tourist Visit Pass (TVP)",
    processingTime: "3–5 working days",
    validity: "30 days single entry / up to 2 years multiple entry",
    visaFee: "SGD 30 (~₹2,200)",
    serviceCharge: "₹1,900 + service ₹650–1,000",
    documents: [
      "Valid passport (6+ months validity, 2 blank pages)",
      "Completed Form 14A",
      "2 photographs (35×45 mm, white background)",
      "Travel insurance (min SGD 30,000)",
      "Hotel booking / accommodation proof",
      "Round-trip flight itinerary",
      "Day-by-day travel itinerary",
      "Bank statements (last 6 months)",
      "Salary slips + ITR (last 2-3 years)",
      "Employment letter / NOC on company letterhead",
      "Cover letter explaining purpose of visit",
    ],
    note: "E-Visa format (printed approval). Apply within 30 days before travel.",
  },
  {
    region: "Asia & Middle East",
    destination: "Thailand",
    flag: "\u{1F1F9}\u{1F1ED}",
    visaType: "Tourist / Business / Visa-on-Arrival",
    processingTime: "Fast-track e-Visa",
    validity: "15–90 days, single or multiple entry",
    visaFee: "₹300 (VoA) – ₹24,260 (multiple-entry)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Recent photograph (white background)",
      "Confirmed return air ticket",
      "Hotel voucher / accommodation proof",
      "Bank statements (last 6 months)",
    ],
    note: "Visa on Arrival pre-approval available at ₹300 — fastest route.",
  },
  {
    region: "Asia & Middle East",
    destination: "Malaysia",
    flag: "\u{1F1F2}\u{1F1FE}",
    visaType: "e-Visa / eNTRI (Tourist, Business, Work)",
    processingTime: "Fast-track",
    validity: "15–30 days (tourist), up to 12 months (work)",
    visaFee: "₹1,700 – ₹6,550 (inclusive)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Recent passport-size photograph",
      "Confirmed return flight ticket",
      "Hotel voucher / accommodation proof",
    ],
    note: "Non-English documents require certified English translation.",
  },
  {
    region: "Asia & Middle East",
    destination: "Vietnam",
    flag: "\u{1F1FB}\u{1F1F3}",
    visaType: "e-Visa (Tourist / Business)",
    processingTime: "Fast-track",
    validity: "30 days maximum stay",
    visaFee: "₹1,500 – ₹33,500 (inclusive)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Scanned passport bio-data page",
      "Recent digital photograph (no glasses)",
      "Confirmed return air ticket",
    ],
    note: "No refunds; date changes require fresh e-visa application.",
  },
  {
    region: "Asia & Middle East",
    destination: "Sri Lanka",
    flag: "\u{1F1F1}\u{1F1F0}",
    visaType: "ETA (Tourist / Business / Transit)",
    processingTime: "1–3 working days",
    validity: "2 days (transit) to 30 days",
    visaFee: "₹0 – ₹2,520 (inclusive)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Confirmed return flight ticket",
      "Proof of accommodation",
      "Completed ETA application",
    ],
    note: "All documents must be in English or certified translated.",
  },
  {
    region: "Asia & Middle East",
    destination: "Japan",
    flag: "\u{1F1EF}\u{1F1F5}",
    visaType: "Tourist Visa (Single / Multiple Entry up to 5 years)",
    processingTime: "~5 working days",
    validity: "3 months from issue; 90 days per visit",
    visaFee: "₹450 (single) / ₹500 (multi) embassy; ₹50 transit",
    serviceCharge: "VFS ₹800 + optional courier ₹550",
    documents: [
      "Valid passport (2 blank pages, valid beyond stay)",
      "Completed visa application form",
      "Photograph 45×35 mm (white background, 70-80% face visible)",
      "Passport bio-data page photocopy",
      "Flight itinerary (proof of bookings)",
      "Detailed daily itinerary with hotel addresses",
      "ITR or bank statements (last 6 months)",
      "Travel insurance (strongly recommended)",
      "Cover letter (optional but recommended)",
    ],
    note: "Fee refunded only if visa refused. No VoA for Indian passport holders.",
  },
  {
    region: "Asia & Middle East",
    destination: "Hong Kong",
    flag: "\u{1F1ED}\u{1F1F0}",
    visaType: "Pre-arrival Registration (PAR) for Indian passport holders",
    processingTime: "1–2 working days (online)",
    validity: "14 days per visit, 6-month PAR validity",
    visaFee: "Free – ₹500",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Online PAR application via HK Immigration",
      "Hotel voucher",
      "Confirmed return flight ticket",
    ],
    note: "Indian passport holders need a free Pre-arrival Registration online — no embassy visit required.",
  },
  {
    region: "Asia & Middle East",
    destination: "Taiwan",
    flag: "\u{1F1F9}\u{1F1FC}",
    visaType: "Online Travel Authorization (Tourist / Business / Study)",
    processingTime: "Normal or Express track",
    validity: "30 or 90 days",
    visaFee: "₹2,400 – ₹9,900 (inclusive)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Copy of any valid existing visa (US/Schengen/UK/Japan/Canada)",
      "Recent photograph",
      "Confirmed return flight ticket",
    ],
    note: "Status trackable online; visa digitally linked to passport.",
  },
  {
    region: "Asia & Middle East",
    destination: "UAE (Dubai)",
    flag: "\u{1F1E6}\u{1F1EA}",
    visaType: "Transit / Tourist Visa (Single Entry)",
    processingTime: "3–4 working days (normal); express available",
    validity: "48-hour / 96-hour transit, or 30/60-day tourist",
    visaFee: "₹5,026 (normal) – ₹5,904 (express)",
    serviceCharge: "Varies by application mode (airline / hotel / agency)",
    documents: [
      "Valid passport (6+ months validity)",
      "Coloured passport scan (first and last pages)",
      "2 identical photos (35×45 mm, white background)",
      "Confirmed flight tickets with onward journey details",
      "Hotel booking confirmation (if transit >24 hrs)",
      "Travel insurance covering the UAE",
    ],
    note: "Transit permit is non-extendable and non-renewable. Overstay attracts heavy fines.",
  },
  {
    region: "Asia & Middle East",
    destination: "Oman",
    flag: "\u{1F1F4}\u{1F1F2}",
    visaType: "e-Visa (Tourist / Business, Single Entry)",
    processingTime: "Fast-track",
    validity: "10 or 30 days",
    visaFee: "₹4,553 – ₹7,500 (inclusive)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Recent passport-size photograph",
      "Confirmed return flight ticket",
      "PAN card copy",
    ],
    note: "e-Visa digitally linked to passport; emailed after approval.",
  },
  {
    region: "Asia & Middle East",
    destination: "Bahrain",
    flag: "\u{1F1E7}\u{1F1ED}",
    visaType: "e-Visa (Tourist / Business, Single or Multiple Entry)",
    processingTime: "Standard / fast-track",
    validity: "7 / 14 / 30 / 90 days",
    visaFee: "₹6,200 – ₹18,000 (inclusive)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Recent passport-size photograph",
      "Confirmed return flight ticket",
      "Hotel booking confirmation",
    ],
  },

  // ────────────── EUROPE ──────────────
  {
    region: "Europe",
    destination: "Germany",
    flag: "\u{1F1E9}\u{1F1EA}",
    visaType: "Schengen Short-Stay Visa (Type C) — Tourist",
    processingTime: "15–20 working days (up to 30 peak)",
    validity: "Up to 90 days within any 180-day period",
    visaFee: "€90 (~₹8,280); €45 children 6-12; free under 6",
    serviceCharge: "VFS ₹1,722 (incl. GST) + courier ₹800",
    documents: [
      "Valid passport (3+ months validity, 2 blank pages)",
      "Completed VIDEX application form",
      "2 photographs (35×45 mm, biometric spec)",
      "Travel insurance (min €30,000 Schengen-wide)",
      "Hotel / accommodation proof for full stay",
      "Round-trip flight itinerary",
      "Day-by-day travel itinerary",
      "Bank statements + salary slips + ITR (3 years)",
      "Employment letter / student ID / retirement docs",
      "Cover letter explaining purpose and intent to return",
    ],
    note: "Germany must be the primary destination or first point of entry in your Schengen circuit.",
  },
  {
    region: "Europe",
    destination: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    visaType: "Schengen Short-Stay Visa (Type C) — Tourist",
    processingTime: "15 calendar days (up to 45 in complex cases)",
    validity: "Up to 90 days within any 180-day period",
    visaFee: "€90 (~₹7,800–8,100)",
    serviceCharge: "VFS €22 (~₹1,900–2,000); total ~₹9,800–10,200",
    documents: [
      "Valid passport (3+ months validity, 2 blank pages)",
      "2 photographs (35×45 mm, white background)",
      "Scanned passport bio-data page",
      "Completed CERFA application form",
      "Round-trip flight bookings",
      "Hotel reservation confirmation",
      "Travel medical insurance (€30,000+)",
      "Bank statements (last 6 months)",
      "Salary slips (last 3 months)",
      "Income tax returns (last 3 years)",
      "Cover letter + employment verification",
      "Proof of ties to India (property/employment/family)",
    ],
    note: "Apply via official france-visas.gouv.fr portal. Fee revised from €80 to €90 in June 2024.",
  },
  {
    region: "Europe",
    destination: "Italy",
    flag: "\u{1F1EE}\u{1F1F9}",
    visaType: "Schengen Visit Visa (Type C)",
    processingTime: "10–15 working days",
    validity: "6 months from issue; 90 days stay in any 180-day period",
    visaFee: "~₹6,355 (embassy)",
    serviceCharge: "VAC + biometric charges additional",
    documents: [
      "Valid passport (6+ months validity, 2 blank pages, ≤10 years old)",
      "Old passports",
      "Cover letter (purpose, duration, source of funds)",
      "Invitation letter from Italian host (if applicable)",
      "Round-trip flight booking + accommodation proof",
      "Medical travel insurance (min €30,000)",
      "Proof of occupation (employment letter / student ID / business docs)",
      "Bank statements (last 3 months) and ITR",
      "Biometric data submission at VAC",
      "Passport-size photographs",
    ],
    note: "Visit visa cannot be extended under normal circumstances; no paid work permitted.",
  },
  {
    region: "Europe",
    destination: "Spain",
    flag: "\u{1F1EA}\u{1F1F8}",
    visaType: "Schengen Short-Stay Visa (Type C) — Tourist",
    processingTime: "10–15 working days (up to 25 peak)",
    validity: "Up to 180 days from issue; 90 days in 180-day period",
    visaFee: "€90 (~₹8,300–8,920); €45 children 6-12",
    serviceCharge: "BLS International ₹1,675 (incl. GST)",
    documents: [
      "Valid passport (3+ months validity beyond travel)",
      "Completed Schengen visa application form",
      "2 photographs (35×45 mm, white background)",
      "Travel insurance (min €30,000 Schengen-wide)",
      "Hotel / accommodation proof",
      "Round-trip flight itinerary",
      "Day-by-day travel itinerary",
      "Bank statements + salary slips + ITR (2-3 years)",
      "Employment letter with NOC / business registration",
      "Cover letter explaining purpose and ties to India",
    ],
    note: "Processed through BLS International (not VFS).",
  },
  {
    region: "Europe",
    destination: "Switzerland",
    flag: "\u{1F1E8}\u{1F1ED}",
    visaType: "Schengen Type C Visitor Visa",
    processingTime: "~15 working days",
    validity: "3 months from issue; 90 days stay in any 180-day period",
    visaFee: "~₹6,690 (multiple-entry standard)",
    serviceCharge: "VAC service fee applies",
    documents: [
      "Valid passport (6+ months validity, 2+ blank pages)",
      "Cover letter with purpose, duration, source of funds",
      "Round-trip flight + accommodation booking",
      "Medical travel insurance (min €30,000)",
      "Invitation letter from Swiss host (if applicable)",
      "Proof of occupation (employment letter / business license)",
      "Financial documents (3-month bank statements, ITR)",
      "2 photographs (35×45 mm, white/grey background)",
      "Biometric submission at VAC (unless given in last 5 years)",
    ],
    note: "Permit cannot be extended under normal conditions; no paid work permitted.",
  },
  {
    region: "Europe",
    destination: "Netherlands",
    flag: "\u{1F1F3}\u{1F1F1}",
    visaType: "Schengen Short-Stay Visa (Type C)",
    processingTime: "15 days standard; 8 working days off-peak (Delhi)",
    validity: "Up to 90 days in 180-day period",
    visaFee: "€90 (~₹9,360); €45 children 6-12; free under 6",
    serviceCharge: "VFS ₹1,700–2,174 + courier ₹700 + SMS ₹150",
    documents: [
      "Valid passport (≤10 years old, 3+ months validity, 2 blank pages)",
      "Completed application form with unique code",
      "2 photographs (35×45 mm, white background)",
      "Travel insurance (min €30,000 Schengen-wide)",
      "Round-trip flight itinerary",
      "Accommodation proof for entire stay",
      "Bank statements (3-6 months, stamped)",
      "Salary slips (last 3 months) + Form 16",
      "Income tax returns",
      "Cover letter (1-2 pages, detailed)",
      "Employment letter with NOC / business registration / GST certificate",
      "Proof of legal residence (Aadhaar / Voter ID)",
    ],
    note: "Stricter documentation checks in 2026 — minor inconsistencies trigger system flags.",
  },
  {
    region: "Europe",
    destination: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    visaType: "Standard Visitor Visa (6 months; 2/5/10-year variants)",
    processingTime: "3-4 weeks standard; 5-7 days priority; 1 day super priority",
    validity: "6 months / 2 / 5 / 10 years",
    visaFee: "£127 (~₹15,435) 6-month; £475 (₹57,728) 2-yr; £848 (₹1,03,059) 5-yr; £1,059 (₹1,28,703) 10-yr",
    serviceCharge: "VFS service fee additional",
    documents: [
      "Valid passport (6+ months validity)",
      "2 photographs (35×45 mm)",
      "Bank statements (last 6 months)",
      "Proof of income (salary slips, ITR, employment letter)",
      "Travel bookings (flights and hotels)",
      "Proof of ties to India (property, family, employment)",
      "Detailed travel itinerary",
      "Cover letter explaining purpose of visit",
      "TB test certificate (for visas longer than 6 months)",
      "Invitation letter (if visiting family/friends)",
      "Sponsor's financial documents (if sponsored)",
      "Previous travel history / old passports",
    ],
    note: "From Jan 2026, English language requirement raised to CEFR B2 for some visa categories. Biometrics mandatory at VFS.",
  },

  // ────────────── AMERICAS ──────────────
  {
    region: "Americas",
    destination: "United States",
    flag: "\u{1F1FA}\u{1F1F8}",
    visaType: "B-1/B-2 Tourist/Business Visa (non-immigrant)",
    processingTime: "3.5 months (New Delhi); 9.5 months (Mumbai)",
    validity: "10 years multiple entry; up to 6 months per visit",
    visaFee: "USD 185 base + USD 250 integrity fee + USD 24 I-94 (~₹42,228)",
    serviceCharge: "VAC charges separate; total package ~₹42,000-45,000",
    documents: [
      "Valid passport (6+ months validity)",
      "DS-160 confirmation page with barcode",
      "Appointment confirmations (VAC + interview)",
      "Visa fee payment receipt",
      "Passport photo (51×51 mm, white background)",
      "Bank statements (6 months) and ITR (3 years)",
      "Employment letter on letterhead + salary slips (6 months)",
      "Property documents / investment statements (ties to India)",
      "Flight itinerary and hotel reservations",
      "Travel insurance",
      "Previous US visas / travel history",
      "Cover letter explaining purpose of visit",
    ],
    note: "New USD 250 Visa Integrity Fee effective Oct 2025. Interview Waiver now restricted to renewals only.",
  },
  {
    region: "Americas",
    destination: "Canada",
    flag: "\u{1F1E8}\u{1F1E6}",
    visaType: "Temporary Resident Visa (Visitor)",
    processingTime: "28 days (visitor) / 9 weeks (study) / 16 weeks (work)",
    validity: "Up to 10 years multiple entry; 6 months per visit",
    visaFee: "CAD 100 (~₹6,120) + biometrics CAD 85 (~₹5,200)",
    serviceCharge: "VFS service ~₹600-1,200; total ~₹12,000-12,500",
    documents: [
      "Valid passport (6+ months validity with blank page)",
      "Completed IMM 5257 application form",
      "2 recent passport-size photographs",
      "Bank statements (6 months)",
      "Income tax returns (last 3 years)",
      "Employment / business proof (NOC, business registration)",
      "Travel itinerary and accommodation bookings",
      "Biometrics submission at VFS",
      "Purpose-of-visit documentation",
      "Previous travel history / old passports",
      "Cover letter",
    ],
    note: "Biometric enrolment mandatory and valid for 10 years.",
  },

  // ────────────── AUSTRALIA ──────────────
  {
    region: "Australia",
    destination: "Australia",
    flag: "\u{1F1E6}\u{1F1FA}",
    visaType: "Visitor Visa (Subclass 600) — Tourist Stream",
    processingTime: "11 days (50% of apps); 23 days (90%); max 30 days",
    validity: "Up to 12 months multiple entry; 3 months stay per visit",
    visaFee: "AUD 190 (~₹13,200) offshore; AUD 475 (~₹32,900) onshore",
    serviceCharge: "Not separately itemized",
    documents: [
      "Valid Indian passport (12+ months validity)",
      "Completed online application via ImmiAccount",
      "2 photographs (35×45 mm)",
      "Bank statements (3-6 months) + salary slips + ITR",
      "Day-by-day travel itinerary",
      "Round-trip flight reservations",
      "Accommodation proof",
      "Employment NOC letter / company registration",
      "Cover letter explaining travel plans and ties to India",
      "Travel insurance (min AUD 5,000 recommended)",
    ],
    note: "Requirements vary by location and profession — consult a visa expert before applying.",
  },

  // ────────────── OTHER (Eurasia / Africa) ──────────────
  {
    region: "Other",
    destination: "Turkey",
    flag: "\u{1F1F9}\u{1F1F7}",
    visaType: "e-Visa (Tourist / Business / Study / Transit)",
    processingTime: "Online — usually instant to a few days",
    validity: "30 days maximum stay",
    visaFee: "₹8,471 – ₹24,100 (inclusive)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Confirmed return flight ticket",
      "Hotel booking / accommodation proof",
    ],
    note: "Additional documents may be required based on travel purpose.",
  },
  {
    region: "Other",
    destination: "Armenia",
    flag: "\u{1F1E6}\u{1F1F2}",
    visaType: "e-Visa (Tourist / Business, Single or Multiple Entry)",
    processingTime: "Standard online processing",
    validity: "21 to 120 days stay",
    visaFee: "₹1,500 – ₹2,650 (inclusive)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Confirmed air ticket",
      "Passport-size photograph",
      "Scanned application form copy",
    ],
    note: "Each traveller needs a separate e-visa; no amendments allowed after issue.",
  },
  {
    region: "Other",
    destination: "Azerbaijan",
    flag: "\u{1F1E6}\u{1F1FF}",
    visaType: "e-Visa / ASAN (Tourist / Business)",
    processingTime: "Normal or Urgent track",
    validity: "30 days maximum stay",
    visaFee: "₹1,932 (normal) – ₹5,040 (urgent)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Confirmed air ticket",
      "Passport-size photograph",
      "Hotel booking",
    ],
  },
  {
    region: "Other",
    destination: "Kenya",
    flag: "\u{1F1F0}\u{1F1EA}",
    visaType: "e-Visa (Tourist / Business, Single Entry)",
    processingTime: "Standard online processing",
    validity: "Up to 90 days stay",
    visaFee: "₹4,284 (inclusive)",
    serviceCharge: "Included in service package",
    documents: [
      "Valid passport (6+ months validity)",
      "Recent photograph",
      "Confirmed air ticket",
      "Yellow fever vaccination certificate",
      "Hotel voucher",
    ],
    note: "Yellow fever vaccination mandatory. e-Visa digitally linked to passport.",
  },
]

const REGIONS: VisaRegion[] = [
  "Asia & Middle East",
  "Europe",
  "Americas",
  "Australia",
  "Other",
]

export default function VisaChecklist() {
  const [activeRegion, setActiveRegion] = useState<VisaRegion>("Asia & Middle East")
  const [selectedSlug, setSelectedSlug] = useState<string>("Singapore")

  const regionEntries = useMemo(
    () => VISA_CHECKLISTS.filter((e) => e.region === activeRegion),
    [activeRegion]
  )

  const active =
    regionEntries.find((e) => e.destination === selectedSlug) || regionEntries[0]

  function pickRegion(r: VisaRegion) {
    setActiveRegion(r)
    const first = VISA_CHECKLISTS.find((e) => e.region === r)
    if (first) setSelectedSlug(first.destination)
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Region tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-white/10 pb-4">
        {REGIONS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => pickRegion(r)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-body text-xs font-medium transition-colors sm:text-sm",
              r === activeRegion
                ? "border-[#C4324A] bg-[#C4324A]/15 text-white"
                : "border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:text-white/80"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Destination chips within active region */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {regionEntries.map((entry) => (
          <button
            key={entry.destination}
            type="button"
            onClick={() => setSelectedSlug(entry.destination)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-body text-xs transition-colors sm:text-sm",
              entry.destination === active.destination
                ? "border-[#D4A853] bg-[#D4A853]/10 text-white"
                : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80"
            )}
          >
            <span role="img" aria-label={`${entry.destination} flag`}>
              {entry.flag}
            </span>
            {entry.destination}
          </button>
        ))}
      </div>

      {/* Checklist card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.destination}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8"
        >
          {/* Header — destination + visa type + meta */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-xl">
                <span className="mr-2" role="img" aria-hidden>
                  {active.flag}
                </span>
                {active.destination}
              </h3>
              <p className="mt-1 font-body text-sm text-[#D4A853]">
                {active.visaType}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-right">
              <span className="flex items-center justify-end gap-1.5 font-body text-xs text-white/55">
                <Clock className="h-3.5 w-3.5" />
                {active.processingTime}
              </span>
              <span className="flex items-center justify-end gap-1.5 font-body text-xs text-white/55">
                <BadgeInfo className="h-3.5 w-3.5" />
                {active.validity}
              </span>
            </div>
          </div>

          {/* Fees section */}
          {(active.visaFee || active.serviceCharge) && (
            <div className="mt-5 grid gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-2">
              {active.visaFee && (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4A853]/15">
                    <IndianRupee className="h-3.5 w-3.5 text-[#D4A853]" />
                  </span>
                  <div>
                    <p className="font-heading text-xs font-medium uppercase tracking-wide text-white/50">
                      Visa Fee
                    </p>
                    <p className="mt-0.5 font-body text-sm text-white/85">
                      {active.visaFee}
                    </p>
                  </div>
                </div>
              )}
              {active.serviceCharge && (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C4324A]/15">
                    <IndianRupee className="h-3.5 w-3.5 text-[#C4324A]" />
                  </span>
                  <div>
                    <p className="font-heading text-xs font-medium uppercase tracking-wide text-white/50">
                      Service Charge
                    </p>
                    <p className="mt-0.5 font-body text-sm text-white/85">
                      {active.serviceCharge}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Documents list */}
          <div className="mt-6">
            <p className="flex items-center gap-2 font-heading text-sm font-medium text-white">
              <FileText className="h-4 w-4 text-[#C4324A]" />
              Required Documents
            </p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {active.documents.map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-2.5 font-body text-sm text-white/70"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#C4324A]/15">
                    <Check className="h-2.5 w-2.5 text-[#C4324A]" />
                  </span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {active.note && (
            <div className="mt-5 rounded-xl border border-[#D4A853]/20 bg-[#D4A853]/5 px-4 py-3">
              <p className="font-body text-xs leading-relaxed text-[#D4A853]">
                {active.note}
              </p>
            </div>
          )}

          <p className="mt-5 font-body text-xs leading-relaxed text-white/35">
            Document lists and charges are indicative and based on the latest
            embassy / consulate guidelines. Final document checklist and fees
            are confirmed by our visa team once you submit an inquiry. All form
            filling is handled by TravelSense.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
