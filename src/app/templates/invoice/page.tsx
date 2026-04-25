"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Printer, ArrowLeft, Plus, Trash2 } from "lucide-react"
import { company } from "@/config/company"

interface LineItem {
  id: number
  description: string
  qty: number
  rate: number
}

interface Tax {
  id: number
  label: string
  rate: number // percentage value (e.g. 5 = 5%)
}

interface Sections {
  amountInWords: boolean
  bankDetails: boolean
  paymentTerms: boolean
  signature: boolean
  thankYouNote: boolean
}

const numberToWords = (n: number): string => {
  if (n === 0) return "Zero"
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ]
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
  const inWords = (num: number): string => {
    if (num < 20) return a[num]
    if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "")
    if (num < 1000) return a[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + inWords(num % 100) : "")
    if (num < 100000) return inWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + inWords(num % 1000) : "")
    if (num < 10000000) return inWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + inWords(num % 100000) : "")
    return inWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + inWords(num % 10000000) : "")
  }
  return inWords(Math.floor(n))
}

const ed = { contentEditable: true, suppressContentEditableWarning: true } as const

export default function InvoicePage() {
  const [today, setToday] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [invoiceNo, setInvoiceNo] = useState("")

  const [items, setItems] = useState<LineItem[]>([
    {
      id: 1,
      description:
        "[Item or service description]\nAdd any sub-details, dates, or notes on subsequent lines.",
      qty: 1,
      rate: 0,
    },
  ])

  const [taxes, setTaxes] = useState<Tax[]>([
    { id: 1, label: "CGST", rate: 2.5 },
    { id: 2, label: "SGST", rate: 2.5 },
  ])

  const [sections, setSections] = useState<Sections>({
    amountInWords: true,
    bankDetails: true,
    paymentTerms: true,
    signature: true,
    thankYouNote: true,
  })

  useEffect(() => {
    const d = new Date()
    setToday(d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }))
    const due = new Date(d.getTime() + 7 * 24 * 60 * 60 * 1000)
    setDueDate(due.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }))
    const yy = String(d.getFullYear()).slice(-2)
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const seq = String(Math.floor(Math.random() * 9000) + 1000)
    setInvoiceNo(`TS/${yy}${mm}/${seq}`)
  }, [])

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + it.qty * it.rate, 0)
    const taxLines = taxes.map((t) => ({ ...t, amount: subtotal * (t.rate / 100) }))
    const taxTotal = taxLines.reduce((s, t) => s + t.amount, 0)
    const grand = subtotal + taxTotal
    return { subtotal, taxLines, grand }
  }, [items, taxes])

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)

  const updateItem = (id: number, key: keyof LineItem, val: string | number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: val } : it)))
  }
  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), description: "[Item or service description]", qty: 1, rate: 0 },
    ])
  }
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const addTax = () => {
    setTaxes((prev) => [...prev, { id: Date.now(), label: "Tax", rate: 5 }])
  }
  const removeTax = (id: number) => {
    setTaxes((prev) => prev.filter((t) => t.id !== id))
  }
  const updateTaxLabel = (id: number, label: string) => {
    setTaxes((prev) => prev.map((t) => (t.id === id ? { ...t, label } : t)))
  }
  const updateTaxRate = (id: number, rate: number) => {
    setTaxes((prev) => prev.map((t) => (t.id === id ? { ...t, rate } : t)))
  }

  const hideSection = (k: keyof Sections) => {
    setSections((prev) => ({ ...prev, [k]: false }))
  }

  const handlePrint = () => window.print()

  return (
    <div className="doc-workspace">
      {/* Toolbar */}
      <div className="doc-chrome">
        <div className="flex items-center gap-4">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Templates
          </Link>
          <span className="h-4 w-px bg-white/20" />
          <span className="doc-chrome-title">Invoice</span>
          <span className="doc-chrome-hint">
            Click any text to edit · Click × to delete · + to add rows or taxes
          </span>
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
                style={{ height: 42, width: "auto", objectFit: "contain" }}
              />
              <div>
                <div
                  className="font-heading text-[24px] font-medium tracking-[-0.015em] leading-none"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                  {...ed}
                >
                  TravelSense
                </div>
                <div
                  className="mt-2 text-[8.5px] font-body font-semibold tracking-[0.22em] uppercase"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                  {...ed}
                >
                  Private Limited
                </div>
              </div>
            </div>

            <div className="text-right">
              <div
                className="font-heading text-[34px] font-medium tracking-[-0.025em] leading-none"
                style={{ fontVariationSettings: "'opsz' 144", color: "#FFB3A3" }}
                {...ed}
              >
                <em>invoice.</em>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-right text-[10.5px] leading-[1.5]">
                <span className="font-body font-semibold tracking-[0.18em] uppercase text-white/55" {...ed}>
                  Invoice #
                </span>
                <span
                  key={`inv-${invoiceNo}`}
                  className="font-mono text-white"
                  suppressHydrationWarning
                  {...ed}
                >
                  {invoiceNo || "—"}
                </span>
                <span className="font-body font-semibold tracking-[0.18em] uppercase text-white/55" {...ed}>
                  Date
                </span>
                <span key={`date-${today}`} className="text-white" suppressHydrationWarning {...ed}>
                  {today || "—"}
                </span>
                <span className="font-body font-semibold tracking-[0.18em] uppercase text-white/55" {...ed}>
                  Due
                </span>
                <span key={`due-${dueDate}`} className="text-white" suppressHydrationWarning {...ed}>
                  {dueDate || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand rule */}
        <div className="lh-rule" />

        {/* Body */}
        <div className="lh-body" style={{ paddingTop: 28, paddingBottom: 28 }}>
          {/* Bill From / Bill To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div
                className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-2"
                {...ed}
              >
                Bill From
              </div>
              <div className="text-[11.5px] leading-[1.6]">
                <div className="font-heading font-medium" style={{ fontSize: 14 }} {...ed}>
                  {company.legalName}
                </div>
                <div className="text-[#5A6478] whitespace-pre-line" {...ed}>
                  {company.office.block.join("\n")}
                </div>
                <div className="mt-2 text-[10.5px]">
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478]" {...ed}>
                    CIN:
                  </span>{" "}
                  <span {...ed}>{company.cin}</span>
                </div>
                <div className="text-[10.5px]">
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478]" {...ed}>
                    PAN:
                  </span>{" "}
                  <span {...ed}>{company.pan}</span>
                </div>
                <div className="mt-1.5 text-[10.5px] text-[#5A6478]">
                  <span {...ed}>{company.contact.email}</span>
                  <span> · </span>
                  <span {...ed}>{company.contact.phone}</span>
                </div>
              </div>
            </div>

            <div>
              <div
                className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-2"
                {...ed}
              >
                Bill To
              </div>
              <div className="text-[11.5px] leading-[1.7]">
                <div className="font-heading font-medium" style={{ fontSize: 14 }} {...ed}>
                  [Client Name]
                </div>
                <div {...ed}>[Address line 1]</div>
                <div {...ed}>[City, State — PIN]</div>
                <div className="mt-1.5">
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478] text-[10.5px]" {...ed}>
                    Phone:
                  </span>{" "}
                  <span className="text-[10.5px]" {...ed}>
                    [+91 XXXXX XXXXX]
                  </span>
                </div>
                <div>
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478] text-[10.5px]" {...ed}>
                    Email:
                  </span>{" "}
                  <span className="text-[10.5px]" {...ed}>
                    [client@email.com]
                  </span>
                </div>
                <div className="mt-1">
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478] text-[10.5px]" {...ed}>
                    Place of Supply:
                  </span>{" "}
                  <span className="text-[10.5px]" {...ed}>
                    Maharashtra
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Line items table */}
          <table className="inv-table">
            <thead>
              <tr>
                <th style={{ width: "8%" }} {...ed}>#</th>
                <th style={{ width: "52%" }} {...ed}>Description</th>
                <th style={{ width: "10%" }} {...ed}>Qty</th>
                <th style={{ width: "14%" }} {...ed}>Unit Price</th>
                <th style={{ width: "16%" }} {...ed}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id}>
                  <td className="text-center text-[11.5px] text-[#8A929E] font-semibold">{idx + 1}</td>
                  <td>
                    <div
                      className="text-[12px] whitespace-pre-line leading-[1.5]"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateItem(it.id, "description", e.currentTarget.innerText)}
                    >
                      {it.description}
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      className="w-16 bg-transparent text-center text-[11.5px] outline-none focus:bg-[#C4324A]/10 rounded px-1 py-0.5"
                      value={it.qty}
                      onChange={(e) => updateItem(it.id, "qty", Number(e.target.value) || 0)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      className="w-full bg-transparent text-center text-[11.5px] tabular-nums outline-none focus:bg-[#C4324A]/10 rounded px-1 py-0.5"
                      value={it.rate}
                      onChange={(e) => updateItem(it.id, "rate", Number(e.target.value) || 0)}
                    />
                  </td>
                  <td className="font-medium tabular-nums">
                    <div className="flex items-center justify-end gap-2">
                      <span>{fmt(it.qty * it.rate)}</span>
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(it.id)}
                          className="doc-no-print inline-flex h-5 w-5 items-center justify-center rounded text-[#C4324A] hover:bg-[#C4324A]/10"
                          title="Remove row"
                          aria-label="Remove row"
                        >
                          <Trash2 className="h-3 w-3" strokeWidth={2} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={addItem} className="doc-add doc-no-print mt-2.5">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Add line item
          </button>

          {/* Totals — dynamic taxes */}
          <div className="inv-totals">
            <div className="inv-totals-row">
              <span className="text-[#5A6478]" {...ed}>Subtotal</span>
              <span className="tabular-nums font-medium">{fmt(totals.subtotal)}</span>
            </div>
            {totals.taxLines.map((t) => (
              <div key={t.id} className="inv-totals-row group">
                <span className="text-[#5A6478] flex items-center gap-1.5">
                  <span {...ed} onBlur={(e) => updateTaxLabel(t.id, e.currentTarget.innerText)}>
                    {t.label}
                  </span>
                  <span>@</span>
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    value={t.rate}
                    onChange={(e) => updateTaxRate(t.id, Number(e.target.value) || 0)}
                    className="w-12 bg-transparent text-right text-[11.5px] tabular-nums outline-none focus:bg-[#C4324A]/10 rounded px-1 py-0.5"
                  />
                  <span>%</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="tabular-nums">{fmt(t.amount)}</span>
                  <button
                    onClick={() => removeTax(t.id)}
                    className="doc-no-print inline-flex h-5 w-5 items-center justify-center rounded text-[#C4324A] hover:bg-[#C4324A]/10"
                    title="Remove tax"
                    aria-label="Remove tax"
                  >
                    <Trash2 className="h-3 w-3" strokeWidth={2} />
                  </button>
                </span>
              </div>
            ))}
            <div className="doc-no-print pt-1">
              <button onClick={addTax} className="doc-add">
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                Add tax / charge
              </button>
            </div>
            <div className="inv-totals-row grand">
              <span {...ed}>
                <em className="italic font-normal" style={{ color: "#FFB3A3" }}>
                  Total due
                </em>
              </span>
              <span className="tabular-nums">{fmt(totals.grand)}</span>
            </div>
          </div>

          {/* Amount in words — deletable */}
          {sections.amountInWords && (
            <div className="doc-section mt-4 rounded-md border border-dashed border-[#0A1425]/15 bg-[#FAF8F4] px-4 py-2.5">
              <button
                onClick={() => hideSection("amountInWords")}
                className="doc-del"
                title="Remove amount-in-words"
                aria-label="Remove amount-in-words"
              >
                ×
              </button>
              <div
                className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-1"
                {...ed}
              >
                Amount in words
              </div>
              <div className="font-heading text-[13px] italic text-[#0A1425]">
                Indian Rupees {numberToWords(totals.grand)} Only
              </div>
            </div>
          )}

          {/* Payment + Bank details — each block individually deletable */}
          {(sections.bankDetails || sections.paymentTerms) && (
            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.bankDetails && (
                <div className="doc-section">
                  <button
                    onClick={() => hideSection("bankDetails")}
                    className="doc-del"
                    title="Remove bank details"
                    aria-label="Remove bank details"
                  >
                    ×
                  </button>
                  <div
                    className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-2"
                    {...ed}
                  >
                    Bank details
                  </div>
                  <div className="text-[11px] leading-[1.6]">
                    <div>
                      <span className="font-semibold text-[#5A6478]" {...ed}>Account Name:</span>{" "}
                      <span {...ed}>{company.bank.accountName}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#5A6478]" {...ed}>Bank:</span>{" "}
                      <span {...ed}>{company.bank.bankName}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#5A6478]" {...ed}>A/C No:</span>{" "}
                      <span {...ed}>{company.bank.accountNumber}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#5A6478]" {...ed}>IFSC:</span>{" "}
                      <span {...ed}>{company.bank.ifsc}</span>
                    </div>
                    <div className="mt-1">
                      <span className="font-semibold text-[#5A6478]" {...ed}>UPI:</span>{" "}
                      <span {...ed}>{company.bank.upi}</span>
                    </div>
                  </div>
                </div>
              )}
              {sections.paymentTerms && (
                <div className="doc-section">
                  <button
                    onClick={() => hideSection("paymentTerms")}
                    className="doc-del"
                    title="Remove payment terms"
                    aria-label="Remove payment terms"
                  >
                    ×
                  </button>
                  <div
                    className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-2"
                    {...ed}
                  >
                    Payment terms
                  </div>
                  <div className="text-[11px] leading-[1.6] text-[#5A6478]" {...ed}>
                    <p>50% advance to confirm booking · balance 21 days before departure.</p>
                    <p className="mt-1.5">Cancellation: 30+ days — 50% retention · 15-30 days — 75% · 0-15 days — 100%.</p>
                    <p className="mt-1.5">All bookings governed by TravelSense Terms of Service at travelsense.co.in/terms-of-service.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Signature — deletable */}
          {sections.signature && (
            <div className="doc-section mt-9 flex flex-col-reverse sm:flex-row sm:items-end sm:justify-between gap-5">
              <button
                onClick={() => hideSection("signature")}
                className="doc-del"
                title="Remove signature block"
                aria-label="Remove signature"
                style={{ top: -8, right: -4 }}
              >
                ×
              </button>
              {sections.thankYouNote ? (
                <div className="doc-section text-[10.5px] text-[#5A6478] italic max-w-[55%]" {...ed}>
                  We sincerely thank you for choosing TravelSense. For any questions about this invoice,
                  please reply to {company.contact.email} within 7 days.
                  <button
                    onClick={() => hideSection("thankYouNote")}
                    className="doc-del"
                    title="Remove thank-you note"
                    aria-label="Remove thank-you note"
                    style={{ top: -10, right: -4 }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div />
              )}
              <div className="text-right">
                <div className="inv-stamp" {...ed}>authorised.</div>
                <div
                  className="border-t border-[#0A1425]/30 mt-1 pt-1.5 text-[10.5px] tracking-[0.18em] uppercase font-semibold text-[#0A1425]"
                  {...ed}
                >
                  For {company.signOffName}
                </div>
              </div>
            </div>
          )}

          {/* Restore-section bar — visible only on screen, only when something is hidden */}
          {(!sections.amountInWords ||
            !sections.bankDetails ||
            !sections.paymentTerms ||
            !sections.signature ||
            !sections.thankYouNote) && (
            <div className="doc-no-print mt-6 flex flex-wrap gap-2 border-t border-dashed border-[#C4324A]/20 pt-4">
              <span className="text-[10px] font-body font-semibold tracking-[0.18em] uppercase text-[#5A6478] mr-1 self-center">
                Restore:
              </span>
              {!sections.amountInWords && (
                <button
                  onClick={() => setSections((p) => ({ ...p, amountInWords: true }))}
                  className="doc-add"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Amount in words
                </button>
              )}
              {!sections.bankDetails && (
                <button
                  onClick={() => setSections((p) => ({ ...p, bankDetails: true }))}
                  className="doc-add"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Bank details
                </button>
              )}
              {!sections.paymentTerms && (
                <button
                  onClick={() => setSections((p) => ({ ...p, paymentTerms: true }))}
                  className="doc-add"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Payment terms
                </button>
              )}
              {!sections.signature && (
                <button
                  onClick={() => setSections((p) => ({ ...p, signature: true, thankYouNote: true }))}
                  className="doc-add"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Signature
                </button>
              )}
              {sections.signature && !sections.thankYouNote && (
                <button
                  onClick={() => setSections((p) => ({ ...p, thankYouNote: true }))}
                  className="doc-add"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Thank-you note
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="lh-footer" style={{ padding: "16px 36px 18px" }}>
          <div className="flex items-center justify-between gap-4 text-[9.5px] tracking-[0.18em] uppercase text-white/60">
            <span {...ed}>{company.legalName}</span>
            <span style={{ color: "#FFB3A3" }} {...ed}>{company.contact.website}</span>
            <span {...ed}>This is a computer-generated invoice</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
