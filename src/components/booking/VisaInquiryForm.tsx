"use client"

import { useState, type CSSProperties } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
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

export default function VisaInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    numberOfTravelers: "",
    message: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/visa-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          numberOfTravelers: Number(form.numberOfTravelers),
        }),
      })
      if (!res.ok) throw new Error("Failed")
      toast.success("Visa inquiry submitted!", {
        description:
          "Our visa experts will review your request and get back to you shortly.",
      })
      setForm({
        name: "",
        email: "",
        phone: "",
        destination: "",
        travelDate: "",
        numberOfTravelers: "",
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
          <span style={labelStyle}>Full name</span>
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

        {/* Destination */}
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={labelStyle}>Destination</span>
          <input
            type="text"
            name="destination"
            required
            value={form.destination}
            onChange={handleChange}
            placeholder="e.g. France"
            aria-label="Destination"
            className="glass-field-dark"
            style={fieldStyle}
          />
        </label>

        {/* Travel date */}
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={labelStyle}>Travel date</span>
          <input
            type="date"
            name="travelDate"
            required
            value={form.travelDate}
            onChange={handleChange}
            aria-label="Travel date"
            className="glass-field-dark [color-scheme:dark]"
            style={fieldStyle}
          />
        </label>

        {/* Number of travellers */}
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={labelStyle}>Travellers</span>
          <input
            type="number"
            name="numberOfTravelers"
            required
            min={1}
            max={20}
            value={form.numberOfTravelers}
            onChange={handleChange}
            placeholder="How many people?"
            aria-label="Number of travellers"
            className="glass-field-dark"
            style={fieldStyle}
          />
        </label>

        {/* Message */}
        <label
          className="sm:col-span-2"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          <span style={labelStyle}>Tell us about your trip</span>
          <textarea
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder="Travel dates, who's travelling, anything we should know…"
            aria-label="Tell us about your trip"
            className="glass-field-dark"
            style={{
              ...fieldStyle,
              height: "auto",
              padding: 12,
              resize: "vertical",
            }}
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
              Submit inquiry
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
        <span style={{ color: GOLD }}>TravelSense</span> handles the full file —
        paperwork, appointments and form-filling included.
      </p>
    </motion.div>
  )
}
