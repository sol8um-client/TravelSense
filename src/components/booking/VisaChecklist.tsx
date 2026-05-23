"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, FileText, Clock, BadgeInfo } from "lucide-react"
import { cn } from "@/lib/utils"

type VisaRegion = "Asia" | "Europe" | "Australia & NZ" | "Americas"

interface VisaChecklistEntry {
  region: VisaRegion
  destination: string
  flag: string
  visaType: string
  processingTime: string
  validity: string
  documents: string[]
  note?: string
}

/**
 * Document checklist by destination (Phase 1 — Passport & Visa Assistance).
 * Grouped by region: Asia / Europe / Australia & NZ / Americas.
 * Indicative document lists; exact requirements are confirmed by the
 * TravelSense visa team per applicant and embassy update.
 */
const VISA_CHECKLISTS: VisaChecklistEntry[] = [
  // ────────────── ASIA ──────────────
  {
    region: "Asia",
    destination: "Thailand",
    flag: "\u{1F1F9}\u{1F1ED}",
    visaType: "Visa on Arrival / e-Visa",
    processingTime: "3–5 working days (e-Visa)",
    validity: "60 days, single entry",
    documents: [
      "Passport valid for at least 6 months with 2 blank pages",
      "2 recent passport-size photos (white background, 35×45 mm)",
      "Confirmed return flight tickets",
      "Hotel booking confirmation for the entire stay",
      "Bank statement of the last 6 months (min. balance ₹50,000+)",
      "Completed visa application form",
      "Proof of sufficient funds (cash / forex card)",
    ],
  },
  {
    region: "Asia",
    destination: "Dubai (UAE)",
    flag: "\u{1F1E6}\u{1F1EA}",
    visaType: "e-Visa (Tourist)",
    processingTime: "3–4 working days",
    validity: "30 / 60 days, single or multiple entry",
    documents: [
      "Passport valid for at least 6 months with 2 blank pages",
      "Coloured passport scan (first and last page)",
      "Recent passport-size photo (white background)",
      "Confirmed return flight tickets",
      "Hotel booking confirmation",
      "Travel insurance covering the UAE",
    ],
    note: "UAE visas are usually processed by the airline or a registered agent — TravelSense handles the full application for you.",
  },
  {
    region: "Asia",
    destination: "Singapore",
    flag: "\u{1F1F8}\u{1F1EC}",
    visaType: "e-Visa (Tourist)",
    processingTime: "3–5 working days",
    validity: "Up to 30 days per visit",
    documents: [
      "Passport valid for at least 6 months",
      "Recent passport-size photo (white background, 35×45 mm)",
      "Completed Form 14A",
      "Confirmed return flight tickets",
      "Hotel booking / host's address in Singapore",
      "Bank statement of the last 3 months",
      "Covering letter with travel itinerary",
    ],
  },
  {
    region: "Asia",
    destination: "Malaysia",
    flag: "\u{1F1F2}\u{1F1FE}",
    visaType: "e-Visa / eNTRI",
    processingTime: "2–4 working days",
    validity: "eNTRI 15 days / e-Visa 30 days",
    documents: [
      "Passport valid for at least 6 months",
      "Recent digital passport-size photo (white background)",
      "Confirmed return / onward flight tickets",
      "Hotel booking confirmation",
      "Proof of sufficient funds (bank statement)",
    ],
  },
  {
    region: "Asia",
    destination: "Sri Lanka",
    flag: "\u{1F1F1}\u{1F1F0}",
    visaType: "ETA (Electronic Travel Authorisation)",
    processingTime: "1–3 working days",
    validity: "30 days, double entry",
    documents: [
      "Passport valid for at least 6 months",
      "Confirmed return flight tickets",
      "Proof of accommodation",
      "Completed ETA application",
    ],
  },
  {
    region: "Asia",
    destination: "Indonesia (Bali)",
    flag: "\u{1F1EE}\u{1F1E9}",
    visaType: "Visa on Arrival / e-VoA",
    processingTime: "On arrival or 2–3 days (e-VoA)",
    validity: "30 days, extendable once",
    documents: [
      "Passport valid for at least 6 months with 2 blank pages",
      "Confirmed return / onward flight tickets",
      "Hotel booking confirmation",
      "Proof of sufficient funds",
    ],
  },
  {
    region: "Asia",
    destination: "Vietnam",
    flag: "\u{1F1FB}\u{1F1F3}",
    visaType: "e-Visa",
    processingTime: "3–5 working days",
    validity: "90 days, single or multiple entry",
    documents: [
      "Passport valid for at least 6 months",
      "Scanned passport data page",
      "Recent digital passport-size photo (white background, no glasses)",
      "Confirmed travel dates and entry/exit points",
    ],
  },
  {
    region: "Asia",
    destination: "Japan",
    flag: "\u{1F1EF}\u{1F1F5}",
    visaType: "Tourist Visa (single / multiple entry)",
    processingTime: "5–7 working days",
    validity: "15–90 days per visit",
    documents: [
      "Passport valid for the duration of stay",
      "Completed visa application form",
      "Recent photo (45×45 mm, white background)",
      "Day-wise itinerary in Japan",
      "Confirmed flight bookings",
      "Hotel bookings for the entire stay",
      "Bank statements of the last 6 months",
      "Income tax returns (last 2 years)",
    ],
  },
  {
    region: "Asia",
    destination: "South Korea",
    flag: "\u{1F1F0}\u{1F1F7}",
    visaType: "K-ETA / Short-stay Tourist (C-3-9)",
    processingTime: "5–10 working days",
    validity: "90 days per visit",
    documents: [
      "Passport valid for at least 6 months",
      "Completed visa application form",
      "Recent photo (35×45 mm, white background)",
      "Confirmed flight and hotel bookings",
      "Bank statements of the last 3-6 months",
      "Income tax returns (last 2 years)",
      "Employment / business proof",
      "Day-wise itinerary",
    ],
  },
  {
    region: "Asia",
    destination: "Hong Kong",
    flag: "\u{1F1ED}\u{1F1F0}",
    visaType: "Pre-arrival Registration (PAR) for Indian passport holders",
    processingTime: "1-2 working days (online)",
    validity: "14 days per visit, 6-month PAR validity",
    documents: [
      "Passport valid for at least 6 months",
      "Online PAR application via Hong Kong Immigration",
      "Confirmed return tickets",
      "Hotel booking",
    ],
    note: "Indian passport holders need a free Pre-arrival Registration — no embassy visit required.",
  },
  {
    region: "Asia",
    destination: "Maldives",
    flag: "\u{1F1F2}\u{1F1FB}",
    visaType: "Free Visa on Arrival",
    processingTime: "On arrival",
    validity: "30 days",
    documents: [
      "Passport valid for at least 6 months",
      "Confirmed return ticket",
      "Resort booking confirmation",
      "Proof of sufficient funds (~USD 100/day)",
      "Imuga online travel declaration (within 96 hours of arrival)",
    ],
  },

  // ────────────── EUROPE ──────────────
  {
    region: "Europe",
    destination: "Schengen (Europe)",
    flag: "\u{1F1EA}\u{1F1FA}",
    visaType: "Schengen Short-Stay Visa (Type C)",
    processingTime: "15 working days (can extend to 30–45)",
    validity: "Up to 90 days within 180 days",
    documents: [
      "Passport valid 3+ months beyond departure, with 2 blank pages",
      "2 recent photos (35×45 mm, Schengen specification)",
      "Completed Schengen application form",
      "Travel medical insurance — min. €30,000 coverage",
      "Confirmed flight reservations (round trip)",
      "Hotel bookings for the entire stay",
      "Bank statements of the last 6 months",
      "Income tax returns (last 2–3 years)",
      "Employment proof / leave letter / business registration",
      "Day-wise travel itinerary and cover letter",
    ],
    note: "Apply through the consulate of the country where you spend the most nights. Biometric enrolment is required.",
  },
  {
    region: "Europe",
    destination: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    visaType: "Standard Visitor Visa",
    processingTime: "3 weeks (standard)",
    validity: "6 months / 2 / 5 / 10 years",
    documents: [
      "Passport valid for the duration of stay with a blank page",
      "Recent digital photo meeting UK specifications",
      "Completed online application + biometric appointment",
      "Bank statements of the last 6 months",
      "Income tax returns (last 2 years) / Form 16",
      "Employment proof — letter, salary slips, or business registration",
      "Confirmed flight and hotel bookings",
      "Detailed day-wise travel itinerary",
      "Cover letter explaining the purpose of the visit",
    ],
    note: "Biometric enrolment at a VFS centre is mandatory. TravelSense books your appointment and reviews the full file before submission.",
  },
  {
    region: "Europe",
    destination: "Switzerland (non-Schengen variant)",
    flag: "\u{1F1E8}\u{1F1ED}",
    visaType: "Schengen Type C via Switzerland",
    processingTime: "15 working days",
    validity: "Up to 90 days within 180 days",
    documents: [
      "Passport valid 3+ months beyond departure",
      "2 Schengen-spec photos (35×45 mm)",
      "Travel medical insurance — min. €30,000",
      "Confirmed flights and hotels",
      "Bank statements (6 months)",
      "Income tax returns (3 years)",
      "Employment / business proof",
      "Detailed itinerary",
    ],
    note: "Switzerland is in the Schengen Area — same visa, but apply at the Swiss consulate if Switzerland is your primary destination.",
  },

  // ────────────── AUSTRALIA & NZ ──────────────
  {
    region: "Australia & NZ",
    destination: "Australia",
    flag: "\u{1F1E6}\u{1F1FA}",
    visaType: "Visitor Visa (Subclass 600)",
    processingTime: "2–4 weeks",
    validity: "3 / 6 / 12 months",
    documents: [
      "Passport valid for the duration of stay",
      "Recent digital passport-size photo",
      "Completed online application (ImmiAccount)",
      "Bank statements of the last 6 months",
      "Income tax returns (last 2 years)",
      "Employment / business proof",
      "Confirmed flight and hotel bookings",
      "Travel itinerary and cover letter",
    ],
  },
  {
    region: "Australia & NZ",
    destination: "New Zealand",
    flag: "\u{1F1F3}\u{1F1FF}",
    visaType: "Visitor Visa",
    processingTime: "20-30 working days",
    validity: "Up to 9 months per visit",
    documents: [
      "Passport valid for at least 3 months beyond departure",
      "Recent digital photo (35×45 mm)",
      "Completed online application (Immigration NZ)",
      "Bank statements (last 6 months)",
      "Income tax returns (last 2 years)",
      "Employment / business proof",
      "Confirmed flight bookings",
      "Accommodation and itinerary details",
      "Travel insurance",
    ],
  },

  // ────────────── AMERICAS ──────────────
  {
    region: "Americas",
    destination: "United States",
    flag: "\u{1F1FA}\u{1F1F8}",
    visaType: "B1/B2 Tourist Visa",
    processingTime: "Varies — interview wait + 1 week processing",
    validity: "Up to 10 years, multiple entry",
    documents: [
      "Passport valid for at least 6 months beyond stay",
      "DS-160 confirmation page",
      "Visa appointment confirmation (OFC + consulate)",
      "Recent 2×2 inch photo (white background)",
      "Bank statements of the last 6 months",
      "Income tax returns (last 3 years)",
      "Employment / business proof",
      "Property and asset documents (supporting ties to India)",
      "Travel itinerary and invitation letter (if applicable)",
    ],
    note: "A personal interview at the US Consulate is mandatory. We provide mock-interview preparation as part of our service.",
  },
  {
    region: "Americas",
    destination: "Canada",
    flag: "\u{1F1E8}\u{1F1E6}",
    visaType: "Visitor Visa (TRV)",
    processingTime: "6-10 weeks (varies)",
    validity: "Up to 10 years (passport-bound), 6 months per visit",
    documents: [
      "Passport valid for the duration of stay",
      "Completed online application (IRCC)",
      "Recent photo per IRCC specifications",
      "Biometric enrolment at VFS",
      "Bank statements of the last 6 months",
      "Income tax returns (last 2-3 years)",
      "Employment / business proof",
      "Confirmed flight and hotel bookings",
      "Travel itinerary and purpose-of-visit cover letter",
      "Strong ties to India (property, family, employment)",
    ],
    note: "Biometric enrolment is mandatory and valid for 10 years.",
  },
]

const REGIONS: VisaRegion[] = ["Asia", "Europe", "Australia & NZ", "Americas"]

export default function VisaChecklist() {
  const [activeRegion, setActiveRegion] = useState<VisaRegion>("Asia")
  const [selectedSlug, setSelectedSlug] = useState<string>("Thailand")

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
            Document lists are indicative. Exact requirements vary by applicant
            profile and the latest embassy guidelines — our visa team confirms
            your personal checklist once you submit an inquiry.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
