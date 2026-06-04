"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const VEHICLE_TYPES = [
  { value: "", label: "Select vehicle type" },
  { value: "SEDAN", label: "Sedan (up to 4 pax)" },
  { value: "SUV", label: "SUV (up to 6 pax)" },
  { value: "TEMPO_TRAVELLER", label: "Tempo Traveller (12-18 pax)" },
  { value: "VAN", label: "Mini Bus (20-30 pax)" },
  { value: "BUS", label: "Luxury Coach (30-45 pax)" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
}

const inputStylesByVariant = {
  dark: cn(
    "mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30",
    "focus-visible:border-[#C4324A] focus-visible:ring-[#C4324A]/20"
  ),
  light: cn(
    "mt-1.5 h-11 rounded-[11px] border-[rgba(176,184,196,0.4)] bg-white text-foreground placeholder:text-silver-dark/70",
    "focus-visible:border-[#C4324A] focus-visible:ring-[#C4324A]/20"
  ),
}

const selectStylesByVariant = {
  dark: cn(
    "mt-1.5 flex h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white shadow-xs transition-[color,box-shadow] outline-none",
    "focus-visible:border-[#C4324A] focus-visible:ring-[3px] focus-visible:ring-[#C4324A]/20"
  ),
  light: cn(
    "mt-1.5 flex h-11 w-full rounded-[11px] border border-[rgba(176,184,196,0.4)] bg-white px-3.5 py-1 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none",
    "focus-visible:border-[#C4324A] focus-visible:ring-[3px] focus-visible:ring-[#C4324A]/20"
  ),
}

interface VehicleRequestFormProps {
  /** Visual treatment. "dark" (default) for navy sections, "light" for the
   *  cream/white redesigned request section. Submission logic is identical. */
  variant?: "dark" | "light"
}

export default function VehicleRequestForm({ variant = "dark" }: VehicleRequestFormProps) {
  const isLight = variant === "light"
  const inputStyles = inputStylesByVariant[variant]
  const selectStyles = selectStylesByVariant[variant]
  const labelClass = isLight
    ? "text-silver-dark font-tech text-[8.5px] tracking-[0.16em] uppercase"
    : "text-white/70 font-body text-sm"
  const placeholderMutedClass = isLight ? "text-silver-dark/70" : "text-white/30"
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDates: "",
    vehicleType: "",
    groupSize: "",
    message: "",
  })

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/vehicle-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          groupSize: Number(form.groupSize),
        }),
      })
      if (!res.ok) throw new Error("Failed")
      toast.success("Vehicle request submitted!", {
        description: "Our team will get back to you with availability and pricing.",
      })
      setForm({
        name: "",
        email: "",
        phone: "",
        destination: "",
        travelDates: "",
        vehicleType: "",
        groupSize: "",
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
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.div
        variants={fadeUp}
        custom={0}
        className={cn(
          "overflow-hidden",
          isLight
            ? "rounded-[22px] border border-[rgba(176,184,196,0.25)] bg-silver-mist p-6 md:p-[34px]"
            : "rounded-xl border border-white/10 bg-white/5 p-6 md:p-8"
        )}
      >
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Name */}
          <motion.div variants={fadeUp} custom={1}>
            <Label htmlFor="veh-name" className={labelClass}>
              Full Name
            </Label>
            <Input
              id="veh-name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              aria-label="Full name"
              className={inputStyles}
            />
          </motion.div>

          {/* Email + Phone */}
          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div variants={fadeUp} custom={2}>
              <Label htmlFor="veh-email" className={labelClass}>
                Email Address
              </Label>
              <Input
                id="veh-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-label="Email address"
                className={inputStyles}
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={3}>
              <Label htmlFor="veh-phone" className={labelClass}>
                Phone Number
              </Label>
              <Input
                id="veh-phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                aria-label="Phone number"
                className={inputStyles}
              />
            </motion.div>
          </div>

          {/* Destination + Travel Dates */}
          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div variants={fadeUp} custom={4}>
              <Label htmlFor="veh-destination" className={labelClass}>
                Destination
              </Label>
              <Input
                id="veh-destination"
                name="destination"
                required
                value={form.destination}
                onChange={handleChange}
                placeholder="e.g., Goa, Ladakh, Kerala"
                aria-label="Destination"
                className={inputStyles}
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={5}>
              <Label htmlFor="veh-dates" className={labelClass}>
                Travel Dates
              </Label>
              <Input
                id="veh-dates"
                name="travelDates"
                required
                value={form.travelDates}
                onChange={handleChange}
                placeholder="e.g., 15 Apr - 20 Apr 2026"
                aria-label="Travel dates"
                className={inputStyles}
              />
            </motion.div>
          </div>

          {/* Vehicle Type + Group Size */}
          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div variants={fadeUp} custom={6}>
              <Label htmlFor="veh-type" className={labelClass}>
                Vehicle Type
              </Label>
              <select
                id="veh-type"
                name="vehicleType"
                required
                value={form.vehicleType}
                onChange={handleChange}
                aria-label="Vehicle type"
                className={cn(
                  selectStyles,
                  !form.vehicleType && placeholderMutedClass
                )}
              >
                {VEHICLE_TYPES.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className={isLight ? "bg-white text-foreground" : "bg-[#0A1425] text-white"}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={fadeUp} custom={7}>
              <Label htmlFor="veh-group" className={labelClass}>
                Group Size
              </Label>
              <Input
                id="veh-group"
                name="groupSize"
                type="number"
                required
                min={1}
                max={50}
                value={form.groupSize}
                onChange={handleChange}
                placeholder="Number of travelers"
                aria-label="Group size"
                className={inputStyles}
              />
            </motion.div>
          </div>

          {/* Message */}
          <motion.div variants={fadeUp} custom={8}>
            <Label htmlFor="veh-message" className={labelClass}>
              Additional Details (Optional)
            </Label>
            <Textarea
              id="veh-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any special requirements, pickup location, etc."
              rows={4}
              aria-label="Additional details"
              className={cn(inputStyles, "resize-none")}
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeUp} custom={9}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full font-body text-white",
                isLight
                  ? "btn btn-primary h-auto rounded-full py-[15px]"
                  : "bg-[#C4324A] hover:bg-[#C4324A]/80"
              )}
              size="lg"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Vehicle Request
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  )
}
