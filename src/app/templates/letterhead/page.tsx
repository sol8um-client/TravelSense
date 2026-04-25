"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Printer, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { company } from "@/config/company"

interface Sections {
  date: boolean
  reference: boolean
  recipient: boolean
  subject: boolean
  body: boolean
  closing: boolean
  footerOffice: boolean
  footerContact: boolean
  footerStatutory: boolean
}

const ed = { contentEditable: true, suppressContentEditableWarning: true } as const

export default function LetterheadPage() {
  const [today, setToday] = useState("")
  const [refNo, setRefNo] = useState("")

  const [sections, setSections] = useState<Sections>({
    date: true,
    reference: true,
    recipient: true,
    subject: true,
    body: true,
    closing: true,
    footerOffice: true,
    footerContact: true,
    footerStatutory: true,
  })

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

  const hide = (k: keyof Sections) => setSections((p) => ({ ...p, [k]: false }))
  const show = (k: keyof Sections) => setSections((p) => ({ ...p, [k]: true }))

  const allFooterHidden = !sections.footerOffice && !sections.footerContact && !sections.footerStatutory

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
          <span className="doc-chrome-hint">Click any text to edit · Click × to delete a section</span>
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
              <Image
                src="/images/brand/logo-final-nobg.png"
                alt="TravelSense"
                width={220}
                height={70}
                priority
                unoptimized
                style={{ height: 44, width: "auto", objectFit: "contain" }}
              />
              <div>
                <div
                  className="font-heading text-[26px] font-medium tracking-[-0.015em] leading-none"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                  {...ed}
                >
                  TravelSense
                </div>
                <div
                  className="mt-2 text-[9px] font-body font-semibold tracking-[0.22em] uppercase"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                  {...ed}
                >
                  Private Limited
                </div>
              </div>
            </div>

            <div className="text-right text-[11.5px] leading-[1.6] text-white/75">
              {sections.date && (
                <div className="doc-section">
                  <button onClick={() => hide("date")} className="doc-del" title="Remove date" aria-label="Remove date" style={{ top: -2, right: -28 }}>
                    ×
                  </button>
                  <div
                    className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#FFB3A3]"
                    {...ed}
                  >
                    Date
                  </div>
                  <div key={`date-${today}`} className="mt-1" suppressHydrationWarning {...ed}>
                    {today || "—"}
                  </div>
                </div>
              )}
              {sections.reference && (
                <div className="doc-section mt-3">
                  <button onClick={() => hide("reference")} className="doc-del" title="Remove reference" aria-label="Remove reference" style={{ top: -2, right: -28 }}>
                    ×
                  </button>
                  <div
                    className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#FFB3A3]"
                    {...ed}
                  >
                    Reference
                  </div>
                  <div key={`ref-${refNo}`} className="mt-1 font-mono" suppressHydrationWarning {...ed}>
                    {refNo || "—"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Brand rule */}
        <div className="lh-rule" />

        {/* Body */}
        <div className="lh-body">
          {/* Recipient block */}
          {sections.recipient && (
            <div className="doc-section text-[12px] leading-[1.7]">
              <button
                onClick={() => hide("recipient")}
                className="doc-del"
                title="Remove recipient block"
                aria-label="Remove recipient block"
              >
                ×
              </button>
              <div
                className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A]"
                {...ed}
              >
                To
              </div>
              <div className="mt-1.5 space-y-0.5">
                <div className="font-medium" {...ed}>
                  Mr. / Ms. [Recipient Name]
                </div>
                <div {...ed}>[Designation]</div>
                <div {...ed}>[Company / Organisation]</div>
                <div {...ed}>[Street Address]</div>
                <div {...ed}>[City, State — PIN]</div>
              </div>
            </div>
          )}

          {/* Subject line */}
          {sections.subject && (
            <div className="doc-section mt-7 text-[12.5px]">
              <button
                onClick={() => hide("subject")}
                className="doc-del"
                title="Remove subject line"
                aria-label="Remove subject line"
              >
                ×
              </button>
              <span
                className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mr-2.5"
                {...ed}
              >
                Subject:
              </span>
              <span
                className="font-heading font-medium tracking-[-0.01em]"
                style={{ fontSize: 14 }}
                {...ed}
              >
                [Brief one-line subject of this letter]
              </span>
            </div>
          )}

          {/* Salutation + Body */}
          {sections.body && (
            <div className="doc-section mt-6 text-[12.5px] leading-[1.75]">
              <button
                onClick={() => hide("body")}
                className="doc-del"
                title="Remove body"
                aria-label="Remove body"
              >
                ×
              </button>
              <p {...ed}>Dear [Recipient],</p>
              <div className="mt-4 space-y-3.5" {...ed}>
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
          )}

          {/* Closing */}
          {sections.closing && (
            <div className="doc-section mt-10 text-[12.5px] leading-[1.7]">
              <button
                onClick={() => hide("closing")}
                className="doc-del"
                title="Remove closing"
                aria-label="Remove closing"
              >
                ×
              </button>
              <p {...ed}>Warm regards,</p>
              <div className="mt-12">
                <div
                  className="font-heading font-medium tracking-[-0.01em]"
                  style={{ fontSize: 16 }}
                  {...ed}
                >
                  {company.founder.name}
                </div>
                <div
                  className="text-[10.5px] font-body font-semibold tracking-[0.18em] uppercase mt-1"
                  style={{ color: "#5A6478" }}
                  {...ed}
                >
                  {company.founder.title} · {company.legalName}
                </div>
              </div>
            </div>
          )}

          {/* Restore-section bar — only when something is hidden */}
          {(!sections.recipient ||
            !sections.subject ||
            !sections.body ||
            !sections.closing ||
            !sections.date ||
            !sections.reference) && (
            <div className="doc-no-print mt-8 flex flex-wrap gap-2 border-t border-dashed border-[#C4324A]/20 pt-4">
              <span className="text-[10px] font-body font-semibold tracking-[0.18em] uppercase text-[#5A6478] mr-1 self-center">
                Restore:
              </span>
              {!sections.date && (
                <button onClick={() => show("date")} className="doc-add">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Date
                </button>
              )}
              {!sections.reference && (
                <button onClick={() => show("reference")} className="doc-add">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Reference
                </button>
              )}
              {!sections.recipient && (
                <button onClick={() => show("recipient")} className="doc-add">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Recipient
                </button>
              )}
              {!sections.subject && (
                <button onClick={() => show("subject")} className="doc-add">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Subject line
                </button>
              )}
              {!sections.body && (
                <button onClick={() => show("body")} className="doc-add">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Body
                </button>
              )}
              {!sections.closing && (
                <button onClick={() => show("closing")} className="doc-add">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Closing
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer band — anchored to bottom of A4. Each column individually deletable. */}
        {!allFooterHidden && (
          <footer className="lh-footer">
            <div className="lh-footer-grid">
              {sections.footerOffice && (
                <div className="doc-section">
                  <button
                    onClick={() => hide("footerOffice")}
                    className="doc-del"
                    title="Remove office column"
                    aria-label="Remove office column"
                    style={{ top: -4, right: -4 }}
                  >
                    ×
                  </button>
                  <div className="lh-footer-label" {...ed}>Registered Office</div>
                  <div className="lh-footer-value whitespace-pre-line" {...ed}>
                    {[company.legalName, ...company.office.block].join("\n")}
                  </div>
                </div>
              )}
              {sections.footerContact && (
                <div className="doc-section">
                  <button
                    onClick={() => hide("footerContact")}
                    className="doc-del"
                    title="Remove contact column"
                    aria-label="Remove contact column"
                    style={{ top: -4, right: -4 }}
                  >
                    ×
                  </button>
                  <div className="lh-footer-label" {...ed}>Reach Us</div>
                  <div className="lh-footer-value whitespace-pre-line" {...ed}>
                    {[company.contact.phone, company.contact.email, company.contact.website].join("\n")}
                  </div>
                </div>
              )}
              {sections.footerStatutory && (
                <div className="doc-section">
                  <button
                    onClick={() => hide("footerStatutory")}
                    className="doc-del"
                    title="Remove statutory column"
                    aria-label="Remove statutory column"
                    style={{ top: -4, right: -4 }}
                  >
                    ×
                  </button>
                  <div className="lh-footer-label" {...ed}>Statutory</div>
                  <div className="lh-footer-value whitespace-pre-line" {...ed}>
                    {[`CIN: ${company.cin}`, `PAN: ${company.pan}`, `TAN: ${company.tan}`].join("\n")}
                  </div>
                </div>
              )}
            </div>
          </footer>
        )}

        {/* Restore footer columns */}
        {(!sections.footerOffice || !sections.footerContact || !sections.footerStatutory) && (
          <div className="doc-no-print px-9 py-3 bg-[#0B1626] border-t border-white/5 flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-body font-semibold tracking-[0.18em] uppercase text-white/45 mr-1">
              Restore footer:
            </span>
            {!sections.footerOffice && (
              <button onClick={() => show("footerOffice")} className="doc-add">
                <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Office
              </button>
            )}
            {!sections.footerContact && (
              <button onClick={() => show("footerContact")} className="doc-add">
                <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Reach Us
              </button>
            )}
            {!sections.footerStatutory && (
              <button onClick={() => show("footerStatutory")} className="doc-add">
                <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Statutory
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
