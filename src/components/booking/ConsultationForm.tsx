"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const TIME_OPTIONS = [
  { value: "", label: "Select preferred time" },
  { value: "morning", label: "Morning (9 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM - 5 PM)" },
  { value: "evening", label: "Evening (5 PM - 8 PM)" },
]

const INTERESTS = [
  { id: "leisure", label: "Leisure" },
  { id: "adventure", label: "Adventure" },
  { id: "educational", label: "Educational" },
  { id: "sports", label: "Sports" },
]

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

const selectStyles = cn(
  "mt-1.5 flex h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white shadow-xs transition-[color,box-shadow] outline-none",
  "focus-visible:border-[#C4324A] focus-visible:ring-[3px] focus-visible:ring-[#C4324A]/20"
)

export default function ConsultationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    interests: [] as string[],
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

  function handleInterestToggle(interest: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          travelInterest: form.interests.join(", "),
        }),
      })
      if (!res.ok) throw new Error("Failed")
      toast.success("Consultation request submitted!", {
        description: "Redirecting to confirmation page...",
      })
      setTimeout(() => {
        router.push("/consultation/confirmation")
      }, 2000)
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
            <Label htmlFor="cons-name" className="text-white/70 font-body text-sm">
              Full Name
            </Label>
            <Input
              id="cons-name"
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
              <Label htmlFor="cons-email" className="text-white/70 font-body text-sm">
                Email Address
              </Label>
              <Input
                id="cons-email"
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
              <Label htmlFor="cons-phone" className="text-white/70 font-body text-sm">
                Phone Number
              </Label>
              <Input
                id="cons-phone"
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

          {/* Date + Time */}
          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div variants={fadeUp} custom={4}>
              <Label
                htmlFor="cons-date"
                className="text-white/70 font-body text-sm"
              >
                Preferred Date
              </Label>
              <Input
                id="cons-date"
                name="preferredDate"
                type="date"
                required
                value={form.preferredDate}
                onChange={handleChange}
                aria-label="Preferred date"
                className={cn(inputStyles, "[color-scheme:dark]")}
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={5}>
              <Label
                htmlFor="cons-time"
                className="text-white/70 font-body text-sm"
              >
                Preferred Time
              </Label>
              <select
                id="cons-time"
                name="preferredTime"
                required
                value={form.preferredTime}
                onChange={handleChange}
                aria-label="Preferred time"
                className={cn(
                  selectStyles,
                  !form.preferredTime && "text-white/30"
                )}
              >
                {TIME_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-[#0A1425] text-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Interests */}
          <motion.div variants={fadeUp} custom={6}>
            <Label className="text-white/70 font-body text-sm">
              Travel Interests
            </Label>
            <div className="mt-2 flex flex-wrap gap-4">
              {INTERESTS.map((interest) => (
                <label
                  key={interest.id}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Checkbox
                    checked={form.interests.includes(interest.id)}
                    onCheckedChange={() => handleInterestToggle(interest.id)}
                    className="border-white/20 data-[state=checked]:border-[#C4324A] data-[state=checked]:bg-[#C4324A]"
                  />
                  <span className="font-body text-sm text-white/70">
                    {interest.label}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp} custom={7}>
            <Label htmlFor="cons-message" className="text-white/70 font-body text-sm">
              Message (Optional)
            </Label>
            <Textarea
              id="cons-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your dream trip, destinations of interest, group size, etc."
              rows={4}
              aria-label="Message"
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
                  Book Free Consultation
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  )
}
