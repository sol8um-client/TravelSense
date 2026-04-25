import Link from "next/link"
import type { Metadata } from "next"
import { FileText, Receipt, Printer, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Document Templates | TravelSense",
  description: "TravelSense letterhead and invoice templates — fill in, print, save as PDF.",
  robots: { index: false, follow: false },
}

const templates = [
  {
    href: "/templates/letterhead",
    icon: FileText,
    eyebrow: "Official Communications",
    title: "Letterhead",
    description:
      "Branded A4 letterhead for proposals, official letters, partner communications, and supplier correspondence. Editable inline, prints clean to PDF.",
    accent: "#C4324A",
  },
  {
    href: "/templates/invoice",
    icon: Receipt,
    eyebrow: "Billing",
    title: "Invoice",
    description:
      "GST-compliant travel invoice with line items, auto-totals, CGST/SGST breakdown, payment terms, and bank details. HSN/SAC 998552 (travel agency services).",
    accent: "#D4A853",
  },
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[#0A1425] py-20 px-6 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-[10.5px] font-body font-semibold tracking-[0.28em] uppercase text-[#E8485E]">
          Internal · Documents
        </p>
        <h1 className="hx mt-3 font-heading text-4xl font-medium tracking-[-0.02em] leading-[1.04] md:text-5xl">
          Document <em className="italic font-normal text-[#FFB3A3]">templates.</em>
        </h1>
        <p className="mt-4 max-w-2xl text-white/60 leading-relaxed">
          Pre-formatted, brand-styled, and print-ready. Open any template, edit
          the fields inline, then click <span className="text-[#FFB3A3] font-medium">Print / Save as PDF</span>{" "}
          to generate the final document.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {templates.map((t) => {
            const Icon = t.icon
            return (
              <Link
                key={t.href}
                href={t.href}
                className="group relative overflow-hidden rounded-2xl glass-card-dark p-7 transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-60 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
                  }}
                />
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${t.accent}1A, ${t.accent}33)`,
                    border: `1px solid ${t.accent}55`,
                    color: t.accent,
                  }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p
                  className="mt-5 text-[10px] font-body font-semibold tracking-[0.24em] uppercase"
                  style={{ color: t.accent }}
                >
                  {t.eyebrow}
                </p>
                <h2 className="hx mt-2 font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.1] text-white">
                  {t.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {t.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                  Open template
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-14 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-sm text-white/55">
          <div className="flex items-start gap-3">
            <Printer className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" />
            <div>
              <p className="font-medium text-white/80">How to use:</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 leading-relaxed">
                <li>Open the template you need.</li>
                <li>Click any field to edit — type your client&apos;s details, package info, dates, amounts.</li>
                <li>Click <span className="text-[#FFB3A3]">Print / Save as PDF</span> at the top.</li>
                <li>In the print dialog, choose <span className="text-white/80">Save as PDF</span> as the destination.</li>
                <li>The PDF saves at A4 size with proper margins, ready to send.</li>
              </ol>
              <p className="mt-3 text-xs text-white/40">
                Your edits are session-only — opening a fresh template gives you a blank starting point.
                Keep your saved PDFs filed in your client folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
