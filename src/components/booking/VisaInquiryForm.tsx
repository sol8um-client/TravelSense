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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
}

const inputStyles = cn(
  "mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30",
  "focus-visible:border-[#C4324A] focus-visible:ring-[#C4324A]/20"
)

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
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.div
        variants={fadeUp}
        custom={0}
        className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 md:p-8"
      >
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Name */}
          <motion.div variants={fadeUp} custom={1}>
            <Label htmlFor="visa-name" className="text-white/70 font-body text-sm">
              Full Name
            </Label>
            <Input
              id="visa-name"
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
              <Label htmlFor="visa-email" className="text-white/70 font-body text-sm">
                Email Address
              </Label>
              <Input
                id="visa-email"
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
              <Label htmlFor="visa-phone" className="text-white/70 font-body text-sm">
                Phone Number
              </Label>
              <Input
                id="visa-phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                aria-label="Phone number"
                className={inputStyles}
              />
            </motion.div>
          </div>

          {/* Destination + Travel Date */}
          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div variants={fadeUp} custom={4}>
              <Label
                htmlFor="visa-destination"
                className="text-white/70 font-body text-sm"
              >
                Destination Country
              </Label>
              <Input
                id="visa-destination"
                name="destination"
                required
                value={form.destination}
                onChange={handleChange}
                placeholder="e.g., Thailand, USA, UK"
                aria-label="Destination country"
                className={inputStyles}
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={5}>
              <Label
                htmlFor="visa-date"
                className="text-white/70 font-body text-sm"
              >
                Travel Date
              </Label>
              <Input
                id="visa-date"
                name="travelDate"
                type="date"
                required
                value={form.travelDate}
                onChange={handleChange}
                aria-label="Travel date"
                className={cn(inputStyles, "[color-scheme:dark]")}
              />
            </motion.div>
          </div>

          {/* Number of Travelers */}
          <motion.div variants={fadeUp} custom={6}>
            <Label
              htmlFor="visa-travelers"
              className="text-white/70 font-body text-sm"
            >
              Number of Travelers
            </Label>
            <Input
              id="visa-travelers"
              name="numberOfTravelers"
              type="number"
              required
              min={1}
              max={20}
              value={form.numberOfTravelers}
              onChange={handleChange}
              placeholder="How many people need visa assistance?"
              aria-label="Number of travelers"
              className={inputStyles}
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp} custom={7}>
            <Label htmlFor="visa-message" className="text-white/70 font-body text-sm">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="visa-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Passport nationality, visa type needed, any prior rejections, etc."
              rows={4}
              aria-label="Additional details"
              className={cn(inputStyles, "resize-none")}
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeUp} custom={8}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
              size="lg"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Visa Inquiry
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  )
}
