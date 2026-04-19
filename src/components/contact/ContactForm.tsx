"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { contactFormSchema, type ContactFormData } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const SUBJECTS = [
  { value: "", label: "Select a subject" },
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Trip Planning", label: "Trip Planning" },
  { value: "Feedback", label: "Feedback" },
  { value: "Partnership", label: "Partnership" },
  { value: "Other", label: "Other" },
] as const

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    const result = contactFormSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactFormData
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      toast.success("Message sent!", {
        description: "We'll get back to you within 24 hours.",
      })

      setForm({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (err) {
      toast.error("Failed to send message", {
        description:
          err instanceof Error
            ? err.message
            : "Please try again or reach out to us directly.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div
        variants={fadeUp}
        custom={0}
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A1425]/80 backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <h2 className="font-heading text-xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
            Send Us a Message
          </h2>
          <p className="mt-2 font-body text-sm text-white/50">
            Fill out the form below and we will respond within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Name */}
            <motion.div variants={fadeUp} custom={1}>
              <Label htmlFor="name" className="text-white/70">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                className={cn(
                  "mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30",
                  "focus-visible:border-secondary focus-visible:ring-secondary/20",
                  errors.name && "border-red-500"
                )}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} custom={2}>
              <Label htmlFor="email" className="text-white/70">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                className={cn(
                  "mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30",
                  "focus-visible:border-secondary focus-visible:ring-secondary/20",
                  errors.email && "border-red-500"
                )}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeUp} custom={3}>
              <Label htmlFor="phone" className="text-white/70">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                aria-invalid={!!errors.phone}
                className={cn(
                  "mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30",
                  "focus-visible:border-secondary focus-visible:ring-secondary/20",
                  errors.phone && "border-red-500"
                )}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
              )}
            </motion.div>

            {/* Subject */}
            <motion.div variants={fadeUp} custom={4}>
              <Label htmlFor="subject" className="text-white/70">
                Subject
              </Label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={!!errors.subject}
                className={cn(
                  "mt-1.5 flex h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white shadow-xs transition-[color,box-shadow] outline-none",
                  "focus-visible:border-secondary focus-visible:ring-[3px] focus-visible:ring-secondary/20",
                  !form.subject && "text-white/30",
                  errors.subject && "border-red-500"
                )}
              >
                {SUBJECTS.map((s) => (
                  <option
                    key={s.value}
                    value={s.value}
                    className="bg-[#0A1425] text-white"
                  >
                    {s.label}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeUp} custom={5}>
              <Label htmlFor="message" className="text-white/70">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows={5}
                aria-invalid={!!errors.message}
                className={cn(
                  "mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30 resize-none",
                  "focus-visible:border-secondary focus-visible:ring-secondary/20",
                  errors.message && "border-red-500"
                )}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp} custom={6}>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={submitting}
                className="w-full font-body"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}
