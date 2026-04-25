"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Printer, ArrowLeft, Plus, Trash2 } from "lucide-react"
import { company } from "@/config/company"

interface LineItem {
  id: number
  description: string
  hsn: string
  pax: number
  rate: number
}

const STATE_GST_RATE = 0.025 // 2.5% CGST + 2.5% SGST = 5% intra-state
const INTER_GST_RATE = 0.05 // 5% IGST inter-state

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

export default function InvoicePage() {
  const [today, setToday] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [invoiceNo, setInvoiceNo] = useState("")
  const [interState, setInterState] = useState(false)

  const [items, setItems] = useState<LineItem[]>([
    {
      id: 1,
      description:
        "Kashmir Classic Family — 7D/6N\nSrinagar (3N) · Pahalgam (2N) · Sonmarg (1N)\nTravel: 12 Mar 2026 — 18 Mar 2026",
      hsn: company.sacCode,
      pax: 4,
      rate: 27500,
    },
  ])

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
    const subtotal = items.reduce((s, it) => s + it.pax * it.rate, 0)
    const cgst = interState ? 0 : subtotal * STATE_GST_RATE
    const sgst = interState ? 0 : subtotal * STATE_GST_RATE
    const igst = interState ? subtotal * INTER_GST_RATE : 0
    const grand = subtotal + cgst + sgst + igst
    return { subtotal, cgst, sgst, igst, grand }
  }, [items, interState])

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)

  const updateItem = (id: number, key: keyof LineItem, val: string | number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: val } : it)))
  }
  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), description: "[Package name + dates + route]", hsn: company.sacCode, pax: 1, rate: 0 },
    ])
  }
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
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
          <span className="doc-chrome-hint">Edit fields · Toggle inter-state · Add line items</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11.5px] text-white/80 hover:bg-white/10">
            <input
              type="checkbox"
              checked={interState}
              onChange={(e) => setInterState(e.target.checked)}
              className="h-3.5 w-3.5 accent-[#C4324A]"
            />
            Inter-state (IGST)
          </label>
          <button onClick={handlePrint} className="doc-print-btn">
            <Printer className="h-4 w-4" strokeWidth={2} />
            Print / Save as PDF
          </button>
        </div>
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
                style={{ height: 64, width: "auto", objectFit: "contain" }}
              />
              <div>
                <div
                  className="font-heading text-[24px] font-medium tracking-[-0.015em] leading-none"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                >
                  Travel
                  <em className="italic font-normal" style={{ color: "#FFB3A3" }}>
                    Sense
                  </em>
                </div>
                <div
                  className="mt-2 text-[8.5px] font-body font-semibold tracking-[0.22em] uppercase"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Private Limited
                </div>
              </div>
            </div>

            <div className="text-right">
              <div
                className="font-heading text-[34px] font-medium tracking-[-0.025em] leading-none"
                style={{ fontVariationSettings: "'opsz' 144", color: "#FFB3A3" }}
              >
                <em>invoice.</em>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-right text-[10.5px] leading-[1.5]">
                <span className="font-body font-semibold tracking-[0.18em] uppercase text-white/55">Invoice #</span>
                <span className="font-mono text-white" suppressHydrationWarning>
                  {invoiceNo || "—"}
                </span>
                <span className="font-body font-semibold tracking-[0.18em] uppercase text-white/55">Date</span>
                <span className="text-white" suppressHydrationWarning>
                  {today || "—"}
                </span>
                <span className="font-body font-semibold tracking-[0.18em] uppercase text-white/55">Due</span>
                <span className="text-white" suppressHydrationWarning>
                  {dueDate || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand rule */}
        <div className="lh-rule" />

        {/* Body */}
        <div className="lh-body" style={{ paddingTop: 28, paddingBottom: 28, minHeight: "auto" }}>
          {/* Bill From / Bill To */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-2">
                Bill From
              </div>
              <div className="text-[11.5px] leading-[1.6]">
                <div className="font-heading font-medium" style={{ fontSize: 14 }}>
                  {company.legalName}
                </div>
                <div className="text-[#5A6478]">
                  {company.office.block.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-[10.5px]">
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478]">CIN: </span>
                  <span>{company.cin}</span>
                </div>
                <div className="text-[10.5px]">
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478]">PAN: </span>
                  <span>{company.pan}</span>
                </div>
                <div className="mt-1.5 text-[10.5px] text-[#5A6478]">
                  {company.contact.email} · {company.contact.phone}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-2">
                Bill To
              </div>
              <div className="text-[11.5px] leading-[1.7]">
                <div
                  className="font-heading font-medium"
                  style={{ fontSize: 14 }}
                  contentEditable
                  suppressContentEditableWarning
                >
                  [Client Name]
                </div>
                <div contentEditable suppressContentEditableWarning>
                  [Address line 1]
                </div>
                <div contentEditable suppressContentEditableWarning>
                  [City, State — PIN]
                </div>
                <div className="mt-1.5">
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478] text-[10.5px]">Phone: </span>
                  <span className="text-[10.5px]" contentEditable suppressContentEditableWarning>
                    [+91 XXXXX XXXXX]
                  </span>
                </div>
                <div>
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478] text-[10.5px]">Email: </span>
                  <span className="text-[10.5px]" contentEditable suppressContentEditableWarning>
                    [client@email.com]
                  </span>
                </div>
                <div className="mt-1">
                  <span className="font-semibold tracking-[0.12em] uppercase text-[#5A6478] text-[10.5px]">Place of Supply: </span>
                  <span className="text-[10.5px]" contentEditable suppressContentEditableWarning>
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
                <th style={{ width: "44%" }}>Description</th>
                <th style={{ width: "12%" }}>HSN/SAC</th>
                <th style={{ width: "10%" }}>Pax</th>
                <th style={{ width: "16%" }}>Rate / Pax</th>
                <th style={{ width: "18%" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id}>
                  <td>
                    <div className="text-[11px] text-[#8A929E] font-semibold mb-0.5">{idx + 1}</div>
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
                      className="w-full bg-transparent text-center text-[11.5px] outline-none focus:bg-[#C4324A]/10 rounded px-1 py-0.5"
                      value={it.hsn}
                      onChange={(e) => updateItem(it.id, "hsn", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      className="w-16 bg-transparent text-center text-[11.5px] outline-none focus:bg-[#C4324A]/10 rounded px-1 py-0.5"
                      value={it.pax}
                      onChange={(e) => updateItem(it.id, "pax", Number(e.target.value) || 0)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      className="w-full bg-transparent text-center text-[11.5px] tabular-nums outline-none focus:bg-[#C4324A]/10 rounded px-1 py-0.5"
                      value={it.rate}
                      onChange={(e) => updateItem(it.id, "rate", Number(e.target.value) || 0)}
                    />
                  </td>
                  <td className="font-medium tabular-nums">
                    {fmt(it.pax * it.rate)}
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(it.id)}
                        className="doc-no-print ml-2 inline-flex h-5 w-5 items-center justify-center rounded text-[#C4324A] hover:bg-[#C4324A]/10"
                        title="Remove"
                      >
                        <Trash2 className="h-3 w-3" strokeWidth={2} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addItem}
            className="doc-no-print mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#C4324A] hover:text-[#A12A3D]"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Add line item
          </button>

          {/* Totals */}
          <div className="inv-totals">
            <div className="inv-totals-row">
              <span className="text-[#5A6478]">Subtotal</span>
              <span className="tabular-nums font-medium">{fmt(totals.subtotal)}</span>
            </div>
            {!interState && (
              <>
                <div className="inv-totals-row">
                  <span className="text-[#5A6478]">CGST @ 2.5%</span>
                  <span className="tabular-nums">{fmt(totals.cgst)}</span>
                </div>
                <div className="inv-totals-row">
                  <span className="text-[#5A6478]">SGST @ 2.5%</span>
                  <span className="tabular-nums">{fmt(totals.sgst)}</span>
                </div>
              </>
            )}
            {interState && (
              <div className="inv-totals-row">
                <span className="text-[#5A6478]">IGST @ 5%</span>
                <span className="tabular-nums">{fmt(totals.igst)}</span>
              </div>
            )}
            <div className="inv-totals-row grand">
              <span>
                <em className="italic font-normal" style={{ color: "#FFB3A3" }}>
                  Total due
                </em>
              </span>
              <span className="tabular-nums">{fmt(totals.grand)}</span>
            </div>
          </div>

          {/* Amount in words */}
          <div className="mt-4 rounded-md border border-dashed border-[#0A1425]/15 bg-[#FAF8F4] px-4 py-2.5">
            <div className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-1">
              Amount in words
            </div>
            <div className="font-heading text-[13px] italic text-[#0A1425]">
              Indian Rupees {numberToWords(totals.grand)} Only
            </div>
          </div>

          {/* Payment + Bank details */}
          <div className="mt-7 grid grid-cols-2 gap-6">
            <div>
              <div className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-2">
                Bank details
              </div>
              <div className="text-[11px] leading-[1.6]">
                <div>
                  <span className="font-semibold text-[#5A6478]">Account Name: </span>
                  <span>{company.bank.accountName}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#5A6478]">Bank: </span>
                  <span>{company.bank.bankName}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#5A6478]">A/C No: </span>
                  <span>{company.bank.accountNumber}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#5A6478]">IFSC: </span>
                  <span>{company.bank.ifsc}</span>
                </div>
                <div className="mt-1">
                  <span className="font-semibold text-[#5A6478]">UPI: </span>
                  <span>{company.bank.upi}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[9.5px] font-body font-semibold tracking-[0.22em] uppercase text-[#C4324A] mb-2">
                Payment terms
              </div>
              <div
                className="text-[11px] leading-[1.6] text-[#5A6478]"
                contentEditable
                suppressContentEditableWarning
              >
                <p>50% advance to confirm booking · balance 21 days before departure.</p>
                <p className="mt-1.5">Cancellation: 30+ days — 50% retention · 15-30 days — 75% · 0-15 days — 100%.</p>
                <p className="mt-1.5">All bookings governed by TravelSense Terms of Service at travelsense.co.in/terms-of-service.</p>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-9 flex items-end justify-between">
            <div className="text-[10.5px] text-[#5A6478] italic max-w-[55%]">
              We sincerely thank you for choosing TravelSense. For any questions about this invoice,
              please reply to {company.contact.email} within 7 days.
            </div>
            <div className="text-right">
              <div className="inv-stamp">authorised.</div>
              <div className="border-t border-[#0A1425]/30 mt-1 pt-1.5 text-[10.5px] tracking-[0.18em] uppercase font-semibold text-[#0A1425]">
                For {company.signOffName}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="lh-footer" style={{ padding: "16px 36px 18px" }}>
          <div className="flex items-center justify-between gap-4 text-[9.5px] tracking-[0.18em] uppercase text-white/60">
            <span>HSN / SAC: {company.sacCode} — {company.sacDescription}</span>
            <span style={{ color: "#FFB3A3" }}>{company.contact.website}</span>
            <span>This is a computer-generated invoice</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
