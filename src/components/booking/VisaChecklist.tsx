"use client"

import { useState, useMemo, type CSSProperties } from "react"
import { Check, FileText, Clock, BadgeInfo } from "lucide-react"

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

/* Passport-spread palette - all-navy + gold-foil + aged cream + cherry ink. */
const NAVY = "#0A1425"
const GOLD = "#C9A24B"
const CHERRY = "#C4324A"
const PAPER = "#F4ECD8"

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
    note: "Visa on Arrival pre-approval available at ₹300 - fastest route.",
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
    note: "Indian passport holders need a free Pre-arrival Registration online - no embassy visit required.",
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
    visaType: "Schengen Short-Stay Visa (Type C) - Tourist",
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
    visaType: "Schengen Short-Stay Visa (Type C) - Tourist",
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
    visaType: "Schengen Short-Stay Visa (Type C) - Tourist",
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
    note: "Stricter documentation checks in 2026 - minor inconsistencies trigger system flags.",
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
    visaType: "Visitor Visa (Subclass 600) - Tourist Stream",
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
    note: "Requirements vary by location and profession - consult a visa expert before applying.",
  },

  // ────────────── OTHER (Eurasia / Africa) ──────────────
  {
    region: "Other",
    destination: "Turkey",
    flag: "\u{1F1F9}\u{1F1F7}",
    visaType: "e-Visa (Tourist / Business / Study / Transit)",
    processingTime: "Online - usually instant to a few days",
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

/* ── Inked entry stamp - rotated cherry-ink circular stamp with a textPath arc ── */
function Stamp({ country }: { country: string }) {
  const label = country.split(" ")[0].slice(0, 9).toUpperCase()
  return (
    <div
      style={{
        position: "relative",
        width: 110,
        height: 110,
        transform: "rotate(-13deg)",
        opacity: 0.82,
      }}
    >
      <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
        <circle cx="60" cy="60" r="52" fill="none" stroke={CHERRY} strokeWidth="2.5" />
        <circle
          cx="60"
          cy="60"
          r="44"
          fill="none"
          stroke={CHERRY}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <path
          id={`stamparc-${label}`}
          d="M60 18 a42 42 0 0 1 0 84 a42 42 0 0 1 0 -84"
          fill="none"
        />
        <text
          fill={CHERRY}
          fontFamily="var(--font-mono-tech), Michroma, sans-serif"
          fontSize="8.5"
          letterSpacing="2"
        >
          <textPath href={`#stamparc-${label}`} startOffset="6%">
            ENTRY · TRAVELSENSE · VISA
          </textPath>
        </text>
        <text
          x="60"
          y="56"
          textAnchor="middle"
          fill={CHERRY}
          fontFamily="var(--font-heading), Fraunces, serif"
          fontWeight="600"
          fontSize="15"
          letterSpacing="0.5"
        >
          {label}
        </text>
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fill={CHERRY}
          fontFamily="var(--font-mono-tech), Michroma, sans-serif"
          fontSize="7"
          letterSpacing="1.5"
        >
          APPROVED
        </text>
        <path
          d="M44 80 L52 86 L76 64"
          fill="none"
          stroke={CHERRY}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

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

  const monoLabel: CSSProperties = {
    fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
    textTransform: "uppercase",
  }

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      {/* region tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          paddingBottom: 18,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {REGIONS.map((r) => {
          const on = r === activeRegion
          return (
            <button
              key={r}
              type="button"
              onClick={() => pickRegion(r)}
              style={{
                cursor: "pointer",
                borderRadius: 9999,
                padding: "8px 16px",
                fontFamily: "var(--font-body)",
                fontSize: 12.5,
                fontWeight: 600,
                transition: "all .25s",
                border: `1px solid ${on ? CHERRY : "rgba(255,255,255,0.12)"}`,
                background: on ? "rgba(196,50,74,0.16)" : "rgba(255,255,255,0.04)",
                color: on ? "#fff" : "rgba(208,213,220,0.6)",
              }}
            >
              {r}
            </button>
          )
        })}
      </div>

      {/* country flag chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          marginTop: 18,
        }}
      >
        {regionEntries.map((e) => {
          const on = e.destination === active.destination
          return (
            <button
              key={e.destination}
              type="button"
              onClick={() => setSelectedSlug(e.destination)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 7,
                borderRadius: 9999,
                padding: "7px 14px",
                fontFamily: "var(--font-body)",
                fontSize: 12.5,
                transition: "all .25s",
                border: `1px solid ${on ? GOLD : "rgba(255,255,255,0.12)"}`,
                background: on ? "rgba(201,162,75,0.12)" : "rgba(255,255,255,0.04)",
                color: on ? "#fff" : "rgba(208,213,220,0.65)",
              }}
            >
              <span style={{ fontSize: 15 }} role="img" aria-label={`${e.destination} flag`}>
                {e.flag}
              </span>
              {e.destination}
            </button>
          )
        })}
      </div>

      {/* the passport spread */}
      <div
        key={active.destination}
        className="passport-spread"
        style={{
          marginTop: 34,
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          background: PAPER,
          boxShadow: "0 40px 90px rgba(0,0,0,0.5)",
          border: "8px solid #0A1425",
          backgroundImage:
            "radial-gradient(circle, rgba(10,20,37,0.04) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          animation: "fadeUp .5s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {/* spine */}
        <div
          className="passport-spine"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 30,
            transform: "translateX(-50%)",
            background:
              "linear-gradient(90deg, transparent, rgba(10,20,37,0.16) 45%, rgba(10,20,37,0.16) 55%, transparent)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* LEFT page */}
        <div
          className="passport-page passport-page-left"
          style={{
            padding: "clamp(24px, 3vw, 38px)",
            position: "relative",
            borderRight: "1px dashed rgba(10,20,37,0.15)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p
              style={{
                ...monoLabel,
                margin: 0,
                fontSize: 8,
                letterSpacing: "0.24em",
                color: "rgba(10,20,37,0.4)",
              }}
            >
              TYPE P · {active.region.toUpperCase()}
            </p>
            <p
              style={{
                ...monoLabel,
                margin: 0,
                fontSize: 8,
                letterSpacing: "0.24em",
                color: "rgba(10,20,37,0.4)",
              }}
            >
              VISA
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18 }}>
            <span style={{ fontSize: 44, lineHeight: 1 }} role="img" aria-hidden>
              {active.flag}
            </span>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading), Georgia, serif",
                  fontSize: 26,
                  fontWeight: 500,
                  color: NAVY,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                {active.destination}
              </h3>
              <p style={{ margin: "5px 0 0", fontSize: 12.5, color: CHERRY, fontWeight: 500 }}>
                {active.visaType}
              </p>
            </div>
          </div>

          <div
            style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12 }}
          >
            {(
              [
                [Clock, "Processing", active.processingTime],
                [BadgeInfo, "Validity", active.validity],
              ] as const
            ).map(([Icon, k, v]) => (
              <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <Icon size={15} stroke={NAVY} style={{ marginTop: 2, opacity: 0.6 }} />
                <div>
                  <div
                    style={{
                      ...monoLabel,
                      fontSize: 7.5,
                      letterSpacing: "0.16em",
                      color: "rgba(10,20,37,0.45)",
                    }}
                  >
                    {k}
                  </div>
                  <div style={{ fontSize: 13.5, color: NAVY, marginTop: 2 }}>{v}</div>
                </div>
              </div>
            ))}
          </div>

          {/* fee tiles */}
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {(
              [
                ["Visa fee", active.visaFee, GOLD],
                ["Service", active.serviceCharge, CHERRY],
              ] as const
            ).map(([k, v, c]) => (
              <div
                key={k}
                style={{
                  borderRadius: 12,
                  border: `1px solid ${c}33`,
                  background: `${c}10`,
                  padding: "11px 13px",
                }}
              >
                <div
                  style={{ ...monoLabel, fontSize: 7, letterSpacing: "0.14em", color: c }}
                >
                  {k}
                </div>
                <div style={{ marginTop: 4, fontSize: 12.5, fontWeight: 500, color: NAVY }}>
                  {v || "Confirmed on inquiry"}
                </div>
              </div>
            ))}
          </div>

          {/* stamp */}
          <div className="passport-stamp" style={{ position: "absolute", right: 18, bottom: 14 }}>
            <Stamp country={active.destination} />
          </div>
        </div>

        {/* RIGHT page */}
        <div
          className="passport-page passport-page-right"
          style={{ padding: "clamp(24px, 3vw, 38px)", position: "relative" }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              margin: 0,
              fontFamily: "var(--font-heading), serif",
              fontSize: 16,
              fontWeight: 500,
              color: NAVY,
            }}
          >
            <FileText size={16} stroke={CHERRY} />
            Required documents
          </p>
          <ul
            style={{
              margin: "16px 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 9,
            }}
          >
            {active.documents.map((d) => (
              <li
                key={d}
                style={{
                  display: "flex",
                  gap: 9,
                  fontSize: 12.5,
                  lineHeight: 1.4,
                  color: "rgba(10,20,37,0.75)",
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: "rgba(196,50,74,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <Check size={10} stroke={CHERRY} strokeWidth={2.4} />
                </span>
                {d}
              </li>
            ))}
          </ul>

          {active.note && (
            <div
              style={{
                marginTop: 16,
                borderRadius: 12,
                border: `1px solid ${GOLD}40`,
                background: `${GOLD}12`,
                padding: "11px 14px",
              }}
            >
              <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: "#8a6a1f" }}>
                {active.note}
              </p>
            </div>
          )}

          <p
            style={{
              margin: "14px 0 0",
              fontSize: 10,
              lineHeight: 1.5,
              color: "rgba(10,20,37,0.4)",
            }}
          >
            Indicative figures based on latest embassy guidelines. Final checklist and
            fees confirmed on inquiry. All form-filling handled by TravelSense.
          </p>
        </div>
      </div>

      {/* spread is a 2-up grid on desktop; stacks on small screens */}
      <style>{`
        .passport-spread {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 720px) {
          .passport-spread { grid-template-columns: 1fr; }
          .passport-page-left { border-right: none !important; border-bottom: 1px dashed rgba(10,20,37,0.15); }
          .passport-spine { display: none; }
          .passport-stamp { right: 14px !important; bottom: 10px !important; }
        }
      `}</style>
    </div>
  )
}
