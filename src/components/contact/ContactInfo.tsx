"use client"

import { motion } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"
import Link from "next/link"
import { waHref } from "@/lib/whatsapp"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
}

const contactDetails = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 80874 53658",
    href: waHref(),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "travelsensepvtltd@gmail.com",
    href: "mailto:travelsensepvtltd@gmail.com",
    external: false,
  },
  {
    icon: MapPin,
    label: "Registered Office",
    value: "Sangamner, Ahmednagar, Maharashtra 422605, India",
    href: undefined,
    external: false,
  },
]

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/travelsense.in",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/travelsensein",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    href: "https://twitter.com/travelsensein",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/travelsense-in",
  },
]

export default function ContactInfo() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="space-y-6"
    >
      {/* Contact details card */}
      <motion.div
        variants={fadeUp}
        custom={0}
        className="overflow-hidden rounded-2xl glass-card-dark/80 backdrop-blur-sm p-6 sm:p-8"
      >
        <h2 className="font-heading text-xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
          Contact Information
        </h2>
        <p className="mt-2 font-body text-sm text-white/50">
          Reach out to us through any of these channels.
        </p>

        <div className="mt-8 space-y-6">
          {contactDetails.map((item) => {
            const content = (
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <item.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-0.5 font-body text-sm text-white/80">
                    {item.value}
                  </p>
                </div>
              </div>
            )

            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="block transition-opacity hover:opacity-80"
              >
                {content}
              </Link>
            ) : (
              <div key={item.label}>{content}</div>
            )
          })}
        </div>
      </motion.div>

      {/* WhatsApp CTA */}
      <motion.div variants={fadeUp} custom={1}>
        <WhatsAppLink
          source="contact-info"
          message="Hi TravelSense, I'd like to know more about your travel services."
          className="flex items-center gap-4 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-5 transition-colors hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/20">
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
          </div>
          <div>
            <p className="font-heading text-sm font-medium tracking-[-0.015em] leading-[1.15] text-white">
              Chat on WhatsApp
            </p>
            <p className="mt-0.5 font-body text-xs text-white/50">
              Quick responses, usually within 30 minutes
            </p>
          </div>
        </WhatsAppLink>
      </motion.div>

      {/* Social links */}
      <motion.div
        variants={fadeUp}
        custom={2}
        className="overflow-hidden rounded-2xl glass-card-dark/80 backdrop-blur-sm p-6 sm:p-8"
      >
        <h3 className="font-heading text-sm font-medium tracking-[-0.015em] leading-[1.15] text-white">
          Follow Us
        </h3>
        <div className="mt-4 flex gap-3">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <social.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
