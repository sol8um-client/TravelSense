"use client"

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, CheckCircle, MapPin, Calendar, User, Phone, Mail, MessageSquare, Loader2 } from "lucide-react"
import { submitLead } from "@/lib/supabase"

/* ═══════════════════════════════════════════════════════
   CONTEXT — global open/close state for all CTAs
   ═══════════════════════════════════════════════════════ */

interface LeadModalContextType {
  open: (ctaLocation?: string) => void
  close: () => void
  isOpen: boolean
}

const LeadModalContext = createContext<LeadModalContextType>({
  open: () => {},
  close: () => {},
  isOpen: false,
})

export const useLeadModal = () => useContext(LeadModalContext)

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [ctaLocation, setCtaLocation] = useState("website")

  const openModal = useCallback((cta?: string) => {
    setCtaLocation(cta || "website")
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => setIsOpen(false), [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <LeadModalContext.Provider value={{ open: openModal, close: closeModal, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && <LeadCaptureModal ctaLocation={ctaLocation} onClose={closeModal} />}
      </AnimatePresence>
    </LeadModalContext.Provider>
  )
}

/* ═══════════════════════════════════════════════════════
   MODAL COMPONENT
   ═══════════════════════════════════════════════════════ */

function LeadCaptureModal({ ctaLocation, onClose }: { ctaLocation: string; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    travel_date: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!form.name.trim()) return setError("Please enter your name")
    if (!form.phone.trim() || form.phone.trim().length < 10) return setError("Please enter a valid phone number")

    setSubmitting(true)
    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        destination: form.destination.trim() || undefined,
        travel_date: form.travel_date || undefined,
        message: form.message.trim() || undefined,
        cta_location: ctaLocation,
        source: "website",
      })
      setSubmitted(true)
      setTimeout(() => onClose(), 3000)
    } catch {
      setError("Something went wrong. Please try again or call us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const popularDestinations = [
    "Bali", "Dubai", "Maldives", "Thailand", "Europe", "Kashmir",
    "Goa", "Rajasthan", "Kerala", "Singapore", "Sri Lanka", "Vietnam",
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#0B1426] to-[#1B2D4E] px-6 py-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-white text-lg font-heading tracking-wider">
            Start Your Journey
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Tell us about your dream trip — we&apos;ll handle the rest.
          </p>
        </div>

        {/* Success State */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            </motion.div>
            <h3 className="text-xl font-heading text-[#0B1426] mt-4 tracking-wider">
              Thank You!
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Our travel expert will reach out to you within 30 minutes.
            </p>
          </motion.div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name — Required */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name *"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C4324A] focus:ring-1 focus:ring-[#C4324A]/20 transition-colors"
              />
            </div>

            {/* Phone — Required */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C4324A] focus:ring-1 focus:ring-[#C4324A]/20 transition-colors"
              />
            </div>

            {/* Email — Optional */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C4324A] focus:ring-1 focus:ring-[#C4324A]/20 transition-colors"
              />
            </div>

            {/* Destination — Optional with popular chips */}
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Dream Destination (optional)"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C4324A] focus:ring-1 focus:ring-[#C4324A]/20 transition-colors"
                />
              </div>
              {/* Quick pick chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {popularDestinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, destination: dest }))}
                    className={`px-2.5 py-1 text-[10px] rounded-full border transition-colors ${
                      form.destination === dest
                        ? "bg-[#C4324A] text-white border-[#C4324A]"
                        : "border-gray-200 text-gray-500 hover:border-[#C4324A]/40 hover:text-[#C4324A]"
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Date — Optional */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                name="travel_date"
                value={form.travel_date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C4324A] focus:ring-1 focus:ring-[#C4324A]/20 transition-colors"
              />
            </div>

            {/* Message — Optional */}
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Anything else? (optional)"
                rows={2}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C4324A] focus:ring-1 focus:ring-[#C4324A]/20 transition-colors resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#C4324A] to-[#a82940] text-white py-3.5 rounded-lg text-sm font-medium tracking-wider uppercase hover:from-[#a82940] hover:to-[#8f2236] transition-all duration-300 disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Get Free Consultation
                </>
              )}
            </button>

            <p className="text-[10px] text-gray-400 text-center">
              We&apos;ll call you within 30 minutes · No spam · 100% free
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

export default LeadCaptureModal
