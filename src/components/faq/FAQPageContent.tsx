"use client"

import { motion } from "framer-motion"
import Link from "next/link"
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
                href="https://wa.me/91XXXXXXXXXX"
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
