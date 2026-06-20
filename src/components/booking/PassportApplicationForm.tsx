"use client"

import { useState, type CSSProperties } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, ChevronDown } from "lucide-react"
import { toast } from "sonner"

const GOLD = "#C9A24B"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const labelStyle: CSSProperties = {
  fontFamily: "var(--font-mono-tech)",
  fontSize: 8.5,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(208,213,220,0.5)",
}

const fieldStyle: CSSProperties = {
  height: 46,
  borderRadius: 11,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.04)",
  padding: "0 14px",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  color: "#fff",
  outline: "none",
}

export default function PassportApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    applicationType: "fresh",
    passportType: "normal",
    city: "",
    dateOfBirth: "",
    message: "",
  })

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/passport-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed")
      toast.success("Passport application submitted!", {
        description:
          "Our passport experts will review your request and guide you through every step.",
      })
      setForm({
        name: "",
        email: "",
        phone: "",
        applicationType: "fresh",
        passportType: "normal",
        city: "",
        dateOfBirth: "",
        message: "",
      })
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
    >
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        style={{
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.04)",
          padding: "clamp(24px, 3vw, 36px)",
        }}
      >
        {/* Full name */}
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={labelStyle}>Full name (as on documents)</span>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            aria-label="Full name"
            className="glass-field-dark"
            style={fieldStyle}
          />
        </label>

        {/* Email */}
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={labelStyle}>Email</span>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            aria-label="Email"
            className="glass-field-dark"
            style={fieldStyle}
          />
        </label>

        {/* Phone */}
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={labelStyle}>Phone</span>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 ·····"
            aria-label="Phone"
            className="glass-field-dark"
            style={fieldStyle}
          />
        </label>

        {/* City */}
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={labelStyle}>City (nearest passport office)</span>
          <input
            type="text"
            name="city"
            required
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Jaipur"
            aria-label="City"
            className="glass-field-dark"
            style={fieldStyle}
          />
        </label>

        {/* Application type */}
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={labelStyle}>Application type</span>
          <div style={{ position: "relative" }}>
            <select
              name="applicationType"
              value={form.applicationType}
              onChange={handleChange}
              aria-label="Application type"
              className="glass-field-dark"
              style={{ ...fieldStyle, width: "100%", appearance: "none", paddingRight: 34 }}
            >
              <option value="fresh">Fresh passport (new)</option>
              <option value="reissue">Re-issue / renewal</option>
            </select>
            <ChevronDown
              size={15}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(208,213,220,0.6)", pointerEvents: "none" }}
            />
          </div>
        </label>

        {/* Passport type (normal/tatkal) */}
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={labelStyle}>Processing</span>
          <div style={{ position: "relative" }}>
            <select
              name="passportType"
              value={form.passportType}
              onChange={handleChange}
              aria-label="Processing speed"
              className="glass-field-dark"
              style={{ ...fieldStyle, width: "100%", appearance: "none", paddingRight: 34 }}
            >
              <option value="normal">Normal</option>
              <option value="tatkal">Tatkal (urgent)</option>
            </select>
            <ChevronDown
              size={15}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(208,213,220,0.6)", pointerEvents: "none" }}
            />
          </div>
        </label>

        {/* Date of birth */}
        <label
          className="sm:col-span-2"
          style={{ display: "flex", flexDirection: "column", gap: 7 }}
        >
          <span style={labelStyle}>Date of birth (optional)</span>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            aria-label="Date of birth"
            className="glass-field-dark [color-scheme:dark]"
            style={fieldStyle}
          />
        </label>

        {/* Message */}
        <label
          className="sm:col-span-2"
          style={{ display: "flex", flexDirection: "column", gap: 7 }}
        >
          <span style={labelStyle}>Anything we should know?</span>
          <textarea
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder="Lost passport, name change, address change, urgent travel dates…"
            aria-label="Notes"
            className="glass-field-dark"
            style={{ ...fieldStyle, height: "auto", padding: 12, resize: "vertical" }}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary sm:col-span-2"
          style={{ justifyContent: "center", padding: "15px" }}
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Submit application
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
      <p
        style={{
          margin: "16px auto 0",
          maxWidth: 440,
          textAlign: "center",
          fontSize: 11.5,
          lineHeight: 1.6,
          color: "rgba(208,213,220,0.4)",
        }}
      >
        <span style={{ color: GOLD }}>TravelSense</span> handles the full file -
        form-filling, document checklist, appointment slot and police-verification
        guidance included.
      </p>
    </motion.div>
  )
}
