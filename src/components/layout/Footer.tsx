"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { footerNavItems } from "@/config/navigation"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/layout/Container"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "Instagram",
      href: siteConfig.social.instagram,
      icon: Instagram,
    },
    {
      name: "Facebook",
      href: siteConfig.social.facebook,
      icon: Facebook,
    },
    {
      name: "LinkedIn",
      href: siteConfig.social.linkedin,
      icon: Linkedin,
    },
  ]

  const footerColumns = Object.entries(footerNavItems) as [
    string,
    { title: string; href: string }[],
  ][]

  const columnLabels: Record<string, string> = {
    categories: "Categories",
    services: "Services",
    company: "Company",
  }

  return (
    <footer className="relative overflow-hidden footer-gradient noise-overlay dot-grid-overlay text-white">
      {/* Decorative accent blobs */}
      <div className="absolute top-16 right-[5%] h-[300px] w-[300px] rounded-full bg-secondary/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 left-[8%] h-[250px] w-[250px] rounded-full bg-primary-light/[0.15] blur-[120px] pointer-events-none" />

      {/* Main Footer */}
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-2">
              <Image
                src="/images/brand/logo-blue-bg.png"
                alt="TravelSense"
                width={160}
                height={90}
                className="h-12 w-auto logo-embossed"
              />
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-[1.8] text-white/50 font-light tracking-wide">
              Your journey, thoughtfully crafted. We specialize in curated
              travel experiences across leisure, adventure, educational, and
              sports categories.
            </p>

            {/* Contact Details */}
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-3 text-[13px] text-white/45 font-light tracking-wide transition-colors hover:text-secondary"
              >
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-[13px] text-white/45 font-light tracking-wide transition-colors hover:text-secondary"
              >
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                {siteConfig.contact.email}
              </a>
              <div className="flex items-start gap-3 text-[13px] text-white/45 font-light tracking-wide">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                {siteConfig.contact.address ?? "Pune, Maharashtra, India"}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-all duration-200 hover:bg-secondary hover:text-white hover:scale-110"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerColumns.map(([key, items]) => (
            <div key={key} className="lg:col-span-2">
              <h3 className="text-[10.5px] font-body font-semibold uppercase tracking-[0.24em] text-white/70">
                {columnLabels[key] ?? key}
              </h3>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-white/40 font-light tracking-wide transition-colors duration-200 hover:text-secondary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="md:col-span-2 lg:col-span-4">
            <h3 className="hx font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.1] text-white">
              Travel <em className="italic font-normal text-[#FFB3A3]">inspiration.</em>
            </h3>
            <p className="mt-4 text-[13px] text-white/40 font-light tracking-wide leading-[1.7]">
              Get curated travel ideas, exclusive deals, and expert tips
              delivered to your inbox.
            </p>
            <form
              className="mt-5 flex gap-2"
              onSubmit={async (e) => {
                e.preventDefault()
                if (!newsletterEmail || isSubmitting) return
                setIsSubmitting(true)
                try {
                  await new Promise((resolve) => setTimeout(resolve, 800))
                  toast.success("You're subscribed!", {
                    description: "You'll receive curated travel inspiration in your inbox.",
                  })
                  setNewsletterEmail("")
                } catch {
                  toast.error("Something went wrong. Please try again.")
                } finally {
                  setIsSubmitting(false)
                }
              }}
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-11 w-full rounded-lg border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/40 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="metallic-cta inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-medium text-white disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>
            <p className="mt-3 text-xs text-white/40">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-white/50">
              &copy; {currentYear} {siteConfig.name} by{" "}
              {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-xs text-white/50 transition-colors hover:text-white/80"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-xs text-white/50 transition-colors hover:text-white/80"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
