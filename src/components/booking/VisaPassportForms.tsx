"use client"

import { useState, type CSSProperties } from "react"
import { FileText, BookUser } from "lucide-react"
import VisaInquiryForm from "./VisaInquiryForm"
import PassportApplicationForm from "./PassportApplicationForm"

const GOLD = "#C9A24B"

type Tab = "visa" | "passport"

function tabStyle(active: boolean): CSSProperties {
  return {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 9999,
    padding: "10px 18px",
    fontFamily: "var(--font-body)",
    fontSize: 13.5,
    fontWeight: 600,
    transition: "all .25s cubic-bezier(0.22,1,0.36,1)",
    border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.16)"}`,
    background: active ? GOLD : "rgba(255,255,255,0.05)",
    color: active ? "#0A1425" : "rgba(255,255,255,0.7)",
    boxShadow: active ? "0 8px 22px rgba(201,162,75,0.3)" : "none",
  }
}

export default function VisaPassportForms() {
  const [tab, setTab] = useState<Tab>("visa")

  return (
    <div>
      {/* Tab switch */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 26,
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setTab("visa")} style={tabStyle(tab === "visa")}>
          <FileText size={15} strokeWidth={1.8} />
          Visa inquiry
        </button>
        <button onClick={() => setTab("passport")} style={tabStyle(tab === "passport")}>
          <BookUser size={15} strokeWidth={1.8} />
          Passport application
        </button>
      </div>

      {tab === "visa" ? <VisaInquiryForm /> : <PassportApplicationForm />}
    </div>
  )
}
