"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle } from "lucide-react"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { Button } from "@/components/ui/button"
import FAQAccordion, { type FAQItem } from "@/components/faq/FAQAccordion"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

interface FAQPageContentProps {
  faqs: FAQItem[]
}

export default function FAQPageContent({ faqs }: FAQPageContentProps) {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about planning your trip with TravelSense"
        backgroundImage="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&h=1080&fit=crop"
      >
        <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
      </PageHero>

      {/* FAQ Accordion Section */}
      <section className="bg-[#0A1425] px-4 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <FAQAccordion faqs={faqs} />
        </motion.div>
      </section>

      {/* ── Decorative Travel Image Banner ────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1425]">
        <div className="relative h-[220px] md:h-[300px]">
          <Image
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1920&h=600&fit=crop"
            alt="Traveler overlooking a scenic landscape"
            width={1920}
            height={600}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1425] via-[#0A1425]/50 to-[#0A1425]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="mx-auto max-w-lg px-4 text-center font-heading text-xl tracking-wide text-white md:text-2xl">
              Still curious? We are here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="bg-[#0D1A30] px-4 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#C4324A]/10">
            <MessageCircle className="h-6 w-6 text-[#C4324A]" />
          </div>

          <h2 className="font-heading text-2xl tracking-wide text-white md:text-3xl">
            Still Have Questions?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/50 md:text-base">
            Our travel experts are happy to help. Reach out and we will get back
            to you within a few hours.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  )
}
