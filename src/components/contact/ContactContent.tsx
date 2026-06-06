"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  Clock,
  ShieldCheck,
} from "lucide-react"
import ContactForm from "@/components/contact/ContactForm"
import PageHero from "@/components/shared/PageHero"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"
import { SectionWave } from "@/components/shared/SectionWave"
import { waHref } from "@/lib/whatsapp"

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/* The four ways to reach a real human - mirrors the contact details kept from
   the old ContactInfo (phone/WhatsApp, email, registered office) plus the map
   "visit" hook, restyled as liquid-glass cards. */
const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 80874 53658",
    blurb: "Quick replies, usually within 30 minutes.",
    href: waHref("Hi TravelSense, I'd like to know more about your travel services."),
    cta: "Chat now",
    external: true,
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 80874 53658",
    blurb: "Speak to a travel expert, Mon to Sat.",
    href: "tel:+918087453658",
    cta: "Place a call",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "travelsensepvtltd@gmail.com",
    blurb: "We reply to every message within a day.",
    href: "mailto:travelsensepvtltd@gmail.com",
    cta: "Write to us",
    external: false,
  },
  {
    icon: MapPin,
    label: "Visit",
    value: "Sangamner, Ahmednagar, Maharashtra 422605, India",
    blurb: "Registered office. Find us on the map below.",
    href: "#location",
    cta: "See location",
    external: false,
  },
] as const

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/travelsense.in" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/travelsensein" },
  { icon: Twitter, label: "X (Twitter)", href: "https://twitter.com/travelsensein" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/travelsense-in" },
] as const

export default function ContactContent() {
  return (
    <>
      {/* ── HERO - shared PageHero, trust chips kept as children ─────────────── */}
      <PageHero
        eyebrow="Get in touch"
        title="Let's"
        accent="talk."
        subtitle="Questions, ideas, or ready to plan? A real person reads every message and gets back to you, usually within a day."
        crumb="Contact"
      >
        {[
          { icon: MessageCircle, label: "WhatsApp in ~30 min" },
          { icon: Clock, label: "Replies within a day" },
          { icon: ShieldCheck, label: "Real humans, no bots" },
        ].map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/65 px-3.5 py-1.5 font-body text-[12.5px] font-medium text-primary shadow-[0_6px_18px_rgba(11,20,38,0.06)] backdrop-blur-md"
          >
            <c.icon className="h-3.5 w-3.5 text-secondary" strokeWidth={1.9} />
            {c.label}
          </span>
        ))}
      </PageHero>

      {/* ── REACH US - glass method cards + the contact form ─────────────────── */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          {/* left: contact method cards */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Reach us your way
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Pick a channel that{" "}
              <span className="italic font-normal text-secondary">suits you.</span>
            </h2>
            <p className="mt-3 max-w-md font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              WhatsApp for the fastest reply, or call, email and visit - whatever feels right.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {contactMethods.map((m, i) => {
                const inner = (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                      <m.icon className="h-6 w-6" strokeWidth={1.7} />
                    </div>
                    <h3 className="mt-4 font-heading text-[16px] font-semibold tracking-[-0.01em] text-primary">
                      {m.label}
                    </h3>
                    <p className="mt-1 font-body text-[13.5px] font-medium leading-snug text-foreground/80 break-words">
                      {m.value}
                    </p>
                    <p className="mt-2 font-body text-[12.5px] leading-relaxed text-muted-foreground">
                      {m.blurb}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 font-body text-[12.5px] font-semibold text-secondary">
                      {m.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </>
                )

                const className =
                  "glass-panel group block h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"

                /* WhatsApp routes through WhatsAppLink so the analytics event fires. */
                if (m.label === "WhatsApp") {
                  return (
                    <motion.div key={m.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
                      <WhatsAppLink
                        source="contact-method-card"
                        message="Hi TravelSense, I'd like to know more about your travel services."
                        className={className}
                      >
                        {inner}
                      </WhatsAppLink>
                    </motion.div>
                  )
                }

                return (
                  <motion.a
                    key={m.label}
                    href={m.href}
                    target={m.external ? "_blank" : undefined}
                    rel={m.external ? "noopener noreferrer" : undefined}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className={className}
                  >
                    {inner}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* right: the contact form in a glass card */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel rounded-[28px] p-6 shadow-[0_30px_80px_rgba(11,20,38,0.16)] sm:p-8"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Send a message
            </p>
            <h2
              className="mt-3 font-heading text-[1.6rem] font-medium leading-[1.1] tracking-[-0.02em] text-primary sm:text-[2rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Tell us about your trip.
            </h2>
            <p className="mt-2 font-body text-[14px] leading-[1.6] text-muted-foreground">
              Fill out the form and we will respond within 24 hours.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ── LOCATION + SOCIAL - navy band ────────────────────────────────────── */}
      <section id="location" className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-24" style={{ scrollMarginTop: "calc(var(--nav-h) + 12px)" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[6%] top-[8%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
          <div className="absolute -left-[4%] bottom-[6%] h-[280px] w-[280px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(196,50,74,0.12), transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              Where to find us
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Our{" "}
              <span className="italic font-normal text-accent">location.</span>
            </h2>
            <p className="mt-3 font-body text-[14.5px] leading-[1.65] text-white/55">
              Pune, Maharashtra, India
            </p>
          </motion.div>

          {/* map embed in a dark glass frame */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-10 overflow-hidden rounded-[24px] glass-dark p-2"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.68092556046!2d73.72287834081918!3d18.524600199498765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
              title="TravelSense office location - Pune, Maharashtra, India"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full rounded-[16px]"
            />
          </motion.div>

          {/* social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Follow along
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/55 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  <social.icon className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA - "Prefer to chat now?" navy band ────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0A1425" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 20% 20%, rgba(196,50,74,0.16), transparent 60%), radial-gradient(ellipse 600px 400px at 85% 90%, rgba(27,45,78,0.6), transparent 60%)",
          }}
        />
        <div className="relative z-[2] mx-auto max-w-[680px] px-6 py-[clamp(64px,9vw,96px)] text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="font-heading text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.025em] text-white"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Prefer to chat{" "}
            <span className="italic font-normal" style={{ color: "var(--secondary-glow)" }}>now?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mx-auto mt-4 max-w-[440px] font-body text-[15.5px] leading-[1.7] text-[rgba(208,213,220,0.7)]"
          >
            Message a real travel expert on WhatsApp, or book a free consultation and we will
            plan the whole thing with you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <WhatsAppLink source="contact-cta" className="btn btn-primary" style={{ padding: "15px 30px", fontSize: 14 }}>
              <MessageCircle size={16} strokeWidth={1.8} /> Chat on WhatsApp
            </WhatsAppLink>
            <Link href="/consultation" className="btn btn-ghost" style={{ padding: "15px 28px", fontSize: 14 }}>
              Plan my trip
              <ArrowRight size={15} strokeWidth={1.8} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
