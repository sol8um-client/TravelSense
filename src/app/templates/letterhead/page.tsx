"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { company } from "@/config/company"

export default function LetterheadPage() {
  const [today, setToday] = useState("")
  const [refNo, setRefNo] = useState("")

  useEffect(() => {
    const d = new Date()
    setToday(
      d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    )
    const yy = String(d.getFullYear()).slice(-2)
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    const seq = String(Math.floor(Math.random() * 900) + 100)
    setRefNo(`TS/${yy}${mm}${dd}/${seq}`)
  }, [])

  const handlePrint = () => window.print()

  return (
    <div className="doc-workspace">
      {/* Toolbar — hidden on print */}
      <div className="doc-chrome">
        <div className="flex items-center gap-4">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Templates
          </Link>
          <span className="h-4 w-px bg-white/20" />
          <span className="doc-chrome-title">Letterhead</span>
          <span className="doc-chrome-hint">Click any field to edit · Print to save as PDF</span>
        </div>
        <button onClick={handlePrint} className="doc-print-btn">
          <Printer className="h-4 w-4" strokeWidth={2} />
          Print / Save as PDF
        </button>
      </div>

      {/* A4 page */}
      <div className="doc-page">
        {/* Top brand band */}
        <div className="lh-band">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Logo — clean container with proper aspect ratio (no embossed crop) */}
              <Image
                src="/images/brand/logo-final-nobg.png"
                alt="TravelSense"
                width={220}
                height={70}
                priority
                unoptimized
                style={{ height: 64, width: "auto", objectFit: "contain" }}
              />
              <div>
                <div
                  className="font-heading text-[26px] font-medium tracking-[-0.015em] leading-none"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                >
                  Travel
                  <em className="italic font-normal" style={{ color: "#FFB3A3" }}>
                    Sense
                  </em>
                </div>
                <div
                  className="mt-2 text-[9px] font-body font-semibold tracking-[0.22em] uppercase"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Private Limited
                </div>
              </div>
            </div>

            <div className="text-right text-[11.5px] leading-[1.6] text-white/75">
              <div className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#FFB3A3]">
                Date
              </div>
              <div
                key={`date-${today}`}
                className="mt-1"
                contentEditable
                suppressContentEditableWarning
                suppressHydrationWarning
              >
                {today || "—"}
              </div>
              <div className="mt-3 text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#FFB3A3]">
                Reference
              </div>
              <div
                key={`ref-${refNo}`}
                className="mt-1 font-mono"
                contentEditable
                suppressContentEditableWarning
                suppressHydrationWarning
              >
                {refNo || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Brand rule */}
        <div className="lh-rule" />

        {/* Body */}
        <div className="lh-body">
          {/* Recipient block */}
          <div className="text-[12px] leading-[1.7]">
            <div className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A]">
              To
            </div>
            <div className="mt-1.5 space-y-0.5">
              <div className="font-medium" contentEditable suppressContentEditableWarning>
                Mr. / Ms. [Recipient Name]
              </div>
              <div contentEditable suppressContentEditableWarning>
                [Designation]
              </div>
              <div contentEditable suppressContentEditableWarning>
                [Company / Organisation]
              </div>
              <div contentEditable suppressContentEditableWarning>
                [Street Address]
              </div>
              <div contentEditable suppressContentEditableWarning>
                [City, State — PIN]
              </div>
            </div>
          </div>

          {/* Subject line */}
          <div className="mt-7 text-[12.5px]">
            <span className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mr-2.5">
              Subject:
            </span>
            <span
              className="font-heading font-medium tracking-[-0.01em]"
              style={{ fontSize: 14 }}
              contentEditable
              suppressContentEditableWarning
            >
              [Brief one-line subject of this letter]
            </span>
          </div>

          {/* Salutation + Body */}
          <div className="mt-6 text-[12.5px] leading-[1.75]">
            <p contentEditable suppressContentEditableWarning>
              Dear [Recipient],
            </p>
            <div
              className="mt-4 space-y-3.5"
              contentEditable
              suppressContentEditableWarning
            >
              <p>
                Greetings from <span className="font-medium">TravelSense</span>!
              </p>
              <p>
                Thank you for considering us for your travel needs. This is a
                quick note to share more about [topic] and how we can help you
                plan a memorable journey.
              </p>
              <p>
                Type or paste your full letter content here. The full letterhead
                accommodates 250–400 words of body text comfortably. Adjust
                paragraphs as needed.
              </p>
              <p>
                Please feel free to reach out on any of our contact channels
                listed at the bottom of this page. Our team will personally
                respond within one working day.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div className="mt-10 text-[12.5px] leading-[1.7]">
            <p contentEditable suppressContentEditableWarning>
              Warm regards,
            </p>
            <div className="mt-12">
              <div
                className="font-heading font-medium tracking-[-0.01em]"
                style={{ fontSize: 16 }}
                contentEditable
                suppressContentEditableWarning
              >
                {company.founder.name}
              </div>
              <div
                className="text-[10.5px] font-body font-semibold tracking-[0.18em] uppercase mt-1"
                style={{ color: "#5A6478" }}
                contentEditable
                suppressContentEditableWarning
              >
                {company.founder.title} · {company.legalName}
              </div>
            </div>
          </div>
        </div>

        {/* Footer band — anchored to bottom of A4. All fields editable. */}
        <footer className="lh-footer">
          <div className="lh-footer-grid">
            <div>
              <div className="lh-footer-label">Registered Office</div>
              <div
                className="lh-footer-value whitespace-pre-line"
                contentEditable
                suppressContentEditableWarning
              >
                {[company.legalName, ...company.office.block].join("\n")}
              </div>
            </div>
            <div>
              <div className="lh-footer-label">Reach Us</div>
              <div
                className="lh-footer-value whitespace-pre-line"
                contentEditable
                suppressContentEditableWarning
              >
                {[company.contact.phone, company.contact.email, company.contact.website].join("\n")}
              </div>
            </div>
            <div>
              <div className="lh-footer-label">Statutory</div>
              <div
                className="lh-footer-value whitespace-pre-line"
                contentEditable
                suppressContentEditableWarning
              >
                {[`CIN: ${company.cin}`, `PAN: ${company.pan}`, `TAN: ${company.tan}`].join("\n")}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
