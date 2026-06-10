"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Heart,
  Compass,
  MapPin,
  Star,
  Users,
  PlaneTakeoff,
  PhoneCall,
  Cake,
  Hotel,
  ArrowRight,
  Phone,
  Quote,
  Check,
  Sparkles,
} from "lucide-react"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"
import PageHero from "@/components/shared/PageHero"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"
import { SectionWave } from "@/components/shared/SectionWave"

/* ─── Animation variants ─────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/* ─── Content ────────────────────────────────────────────────────── */

// "Travel is about ___" - the human stakes, shown as a quiet pill row.
const stakes = ["Dreams", "Celebrations", "Family time", "Once-in-a-lifetime moments"]

// The team behind every itinerary, shown as role chips.
const roles = [
  "Travel experts",
  "Destination specialists",
  "Visa consultants",
  "Customer support",
  "Holiday planners",
]

// The four real moments that define TravelSense (lightly tightened for web pace).
const moments: {
  icon: typeof PlaneTakeoff
  title: string
  place: string
  body: string[]
  takeaway: string
}[] = [
  {
    icon: PlaneTakeoff,
    title: "The 1:00 AM airport call",
    place: "A cancelled flight, past midnight",
    body: [
      "One night, a traveller reached the airport ready to begin a long-awaited trip. Everything was planned, confirmed, on schedule. Then, minutes before departure, the flight was cancelled.",
      "It was already past midnight. The queues were growing, the options were thin - and at around 1:00 AM, our phone rang.",
      "There was never a question of waiting until morning. While the traveller waited, we worked the phones - airline desks, alternate routes, every schedule we could find. Within a short while a new arrangement was secured, and the journey was back on track.",
    ],
    takeaway: "Our work doesn't end when a ticket is issued. Sometimes, that's exactly when it begins.",
  },
  {
    icon: PhoneCall,
    title: "A crisis solved from another country",
    place: "Leading a group in Nepal, on WhatsApp calls",
    body: [
      "One of the hardest situations we've handled came while we were leading a tour group in Nepal. It had already been a long day of sightseeing, transfers and check-ins - and our international roaming had stopped working. A WhatsApp call was our only reliable line.",
      "Late that evening, a traveller messaged with urgent news: their flight to Himachal Pradesh had been cancelled. We were in another country, on patchy connectivity - but our responsibility hadn't changed.",
      "Over those WhatsApp calls we coordinated alternatives, explored routes and kept communicating until arrangements were made. The traveller continued their journey without major disruption. Most never saw the scramble behind the scenes.",
    ],
    takeaway: "Great support is often invisible. Travellers simply remember that someone was there.",
  },
  {
    icon: Cake,
    title: "A celebration to remember in Andaman",
    place: "A wedding anniversary, quietly arranged",
    body: [
      "Not every moment we treasure comes from solving a problem. Some come from creating joy.",
      "A couple travelling with us were celebrating their wedding anniversary in the Andaman Islands. Quietly, without telling them, our team coordinated with the hotel to arrange a cake and a small celebration - the timing, the presentation, the surprise.",
      "When they returned that evening and discovered it, their reaction was priceless. It wasn't grand. It wasn't expensive. But it was thoughtful.",
    ],
    takeaway: "Years later, travellers forget room numbers and flight times. They never forget how someone made them feel.",
  },
  {
    icon: Hotel,
    title: "When we stepped in, in person",
    place: "Srinagar - taking ownership, not forwarding it",
    body: [
      "A traveller was staying at a beautiful hotel in Srinagar, but kept facing slow service and delayed responses. When they told us, we had two choices: forward the complaint and wait - or take ownership.",
      "We chose to take ownership. Our local representative visited the hotel in person, met the management, explained the concerns in detail, and followed up until things changed.",
      "The difference was immediate - prompt service and personal attention for the rest of the stay.",
    ],
    takeaway: "What mattered most wasn't just fixing the issue. It was showing the traveller that someone would stand beside them.",
  },
]

// "Our promise" - what you actually get with TravelSense.
const promises = [
  "Celebrates your milestones",
  "Solves the unexpected",
  "Answers the late-night calls",
  "Stands behind every booking",
  "Treats your trip as their own",
]

/* ─── Component ──────────────────────────────────────────────────── */

export default function AboutContent() {
  const { open } = useLeadModal()
  const [imgError, setImgError] = useState(true)

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <PageHero
        eyebrow="About TravelSense"
        title={
          <>
            Travel, the{" "}
            <span className="italic font-normal text-secondary">human</span> way.
          </>
        }
        subtitle="Booking a flight or a hotel takes only a few clicks today. The one thing all that technology made harder to find is genuine human support - and that is exactly what TravelSense exists to bring back."
        crumb="About"
      >
        {[
          { icon: Compass, label: "500+ trips planned" },
          { icon: MapPin, label: "50+ destinations" },
          { icon: Star, label: "Real humans, 24/7" },
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

      {/* ═══════════ WHY WE EXIST - the belief ═══════════ */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary"
          >
            Why we exist
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.12] tracking-[-0.02em] text-primary sm:text-[2.5rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Travel is never just flights and{" "}
            <span className="italic font-normal text-secondary">hotels.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl space-y-4 font-body text-[15px] leading-[1.8] text-muted-foreground sm:text-[16px]"
          >
            <p>
              Travel has changed dramatically. Endless websites, endless reviews, thousands of
              options at our fingertips. Yet despite all of it, one thing has quietly become hard to
              find: genuine human support.
            </p>
            <p>
              We believe a journey is about dreams, about celebrations, about family time, about
              once-in-a-lifetime moments - and when something unexpected happens, it is about knowing
              there is someone you can trust. That belief is what inspired TravelSense: a place where
              no traveller is ever a booking reference number, where every journey begins with a
              conversation, and a real person is always ready to help.
            </p>
          </motion.div>

          {/* the human stakes, as a quiet pill row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-2.5"
          >
            {stakes.map((s) => (
              <span
                key={s}
                className="glass-panel inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-[13px] font-medium text-primary"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} />
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ MEET THE PEOPLE ═══════════ */}
      <section className="bg-brand-mesh px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* Team / founder portrait (glass-framed) with graceful fallback */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="glass-panel relative overflow-hidden rounded-[28px] p-2.5 shadow-[0_30px_80px_rgba(11,20,38,0.18)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-primary/10">
                {!imgError ? (
                  <Image
                    src="/images/about/team.jpg"
                    alt="The TravelSense team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0A1425] via-[#122040] to-[#0A1425]">
                    <div
                      className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(196,50,74,0.18), rgba(212,168,83,0.12) 60%, transparent)",
                      }}
                    />
                    <div className="relative px-6 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 ring-1 ring-white/15">
                        <Users className="h-9 w-9 text-accent/75" strokeWidth={1.4} />
                      </div>
                      <h3 className="mt-5 font-heading text-lg font-medium tracking-[-0.015em] text-white">
                        The people behind TravelSense
                      </h3>
                      <p className="mx-auto mt-3 max-w-[260px] font-body text-xs leading-relaxed text-white/45">
                        A team photo lives here - real faces, ready to help.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl glass-pill px-4 py-3 sm:block">
              <p className="font-heading text-xl font-medium leading-none text-primary">Real</p>
              <p className="mt-1 font-body text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                People, not bots
              </p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Meet the people
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              The people behind your{" "}
              <span className="italic font-normal text-secondary">journey.</span>
            </h2>
            <div className="mt-6 space-y-4 font-body text-[14.5px] leading-[1.75] text-muted-foreground sm:text-[15px]">
              <p>
                Behind every itinerary is a team that genuinely cares about creating exceptional
                experiences. Destinations may change - our mission never does: to make every
                traveller feel supported, valued and cared for, from the first conversation to the
                last sunset.
              </p>
            </div>

            {/* role chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span
                  key={r}
                  className="inline-flex items-center rounded-full border border-secondary/20 bg-white/70 px-3 py-1.5 font-body text-[12.5px] font-medium text-primary backdrop-blur-md"
                >
                  {r}
                </span>
              ))}
            </div>

            {/* pull quote */}
            <div className="mt-7 flex gap-3 rounded-2xl border-l-2 border-secondary/50 bg-white/55 p-5 backdrop-blur-md">
              <Quote className="h-5 w-5 shrink-0 text-secondary/70" strokeWidth={1.8} />
              <p className="font-heading text-[17px] font-medium leading-[1.4] tracking-[-0.01em] text-primary sm:text-[19px]">
                For us, travel planning is not a transaction. It is a{" "}
                <span className="italic font-normal text-secondary">responsibility.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ═══════════ MOMENTS THAT DEFINE TRAVELSENSE ═══════════ */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute right-[6%] top-[8%] h-[320px] w-[320px] rounded-full bg-primary-light/20 blur-[100px]" />
          <div
            className="absolute -left-[4%] bottom-[6%] h-[300px] w-[300px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(212,168,83,0.10), transparent 70%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              Moments that define us
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.5rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Anyone can promise good{" "}
              <span className="italic font-normal text-accent">service.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-white/55">
              These are the moments that show who we really are - real travellers, real situations,
              real people behind the scenes.
            </p>
          </motion.div>

          {/* story cards */}
          <div className="mt-14 space-y-6">
            {moments.map((m, i) => (
              <motion.article
                key={m.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="glass-dark group relative overflow-hidden rounded-[22px] p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-6 select-none font-heading text-[7rem] italic font-normal leading-none text-white/[0.04] sm:text-[9rem]"
                >
                  {`0${i + 1}`}
                </span>
                <div className="relative flex flex-col gap-5 sm:flex-row sm:gap-7">
                  {/* icon column */}
                  <div className="shrink-0">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl text-accent transition-transform duration-500 group-hover:scale-105"
                      style={{ background: "rgba(212,168,83,0.12)", border: "1px solid rgba(212,168,83,0.24)", boxShadow: "inset 0 1px 0 rgba(255,235,190,0.18)" }}
                    >
                      <m.icon className="h-6 w-6" strokeWidth={1.6} />
                    </div>
                  </div>
                  {/* text */}
                  <div className="min-w-0">
                    <span className="font-body text-[11.5px] font-semibold uppercase tracking-[0.16em] text-accent/80">
                      {m.place}
                    </span>
                    <h3 className="mt-1.5 font-heading text-[20px] font-medium tracking-[-0.015em] text-white sm:text-[24px]">
                      {m.title}
                    </h3>
                    <div className="mt-3 space-y-3 font-body text-[13.5px] leading-[1.75] text-white/65 sm:text-[14.5px]">
                      {m.body.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                    {/* takeaway */}
                    <p className="mt-5 border-t border-white/10 pt-4 font-heading text-[15px] font-medium italic leading-[1.5] text-accent-light sm:text-[16.5px]">
                      {m.takeaway}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SectionWave from="#0A1425" to="#F4F6F9" flip />

      {/* ═══════════ OUR PROMISE ═══════════ */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Our promise
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-primary sm:text-[2.5rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              More than an itinerary. A team that{" "}
              <span className="italic font-normal text-secondary">shows up.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              When you choose TravelSense, you get a dedicated team that genuinely cares about your
              journey - and treats your trip as if it were their own.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((p, i) => (
              <motion.div
                key={p}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="glass-panel flex items-center gap-3 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Check className="h-4 w-4" strokeWidth={2.6} />
                </span>
                <p className="font-body text-[14.5px] font-medium leading-snug text-primary">{p}</p>
              </motion.div>
            ))}

            {/* closing promise tile */}
            <motion.div
              custom={promises.length}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative overflow-hidden rounded-2xl p-5 text-white sm:col-span-2 lg:col-span-1"
              style={{ background: "linear-gradient(135deg, #122040, #0A1425)" }}
            >
              <Heart className="h-5 w-5 text-secondary-glow" strokeWidth={1.8} />
              <p className="mt-3 font-body text-[14px] leading-[1.6] text-white/80">
                Leisure, adventure, a celebration, business or family - our promise stays the same:
                smooth, memorable and worry-free.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-20 sm:px-6 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 20% 20%, rgba(196,50,74,0.16), transparent 60%), radial-gradient(ellipse 600px 400px at 85% 90%, rgba(27,45,78,0.6), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent"
          >
            Let&apos;s plan your next journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.025em] text-white sm:text-[2.9rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            One conversation. One seamless{" "}
            <span className="italic font-normal text-secondary-glow">journey.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-4 max-w-xl font-body text-[15px] leading-[1.7] text-white/65 sm:text-[16px]"
          >
            The world is full of extraordinary places. Our job is to help you experience them with
            confidence - with one dedicated travel expert beside you the whole way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <button type="button" onClick={() => open("about-cta")} className="btn btn-primary">
              Start planning
              <ArrowRight className="h-4 w-4" />
            </button>
            <WhatsAppLink source="about-cta" className="btn btn-ghost">
              <Phone className="h-4 w-4" strokeWidth={1.6} />
              Talk to a human
            </WhatsAppLink>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 font-heading text-[15px] font-medium tracking-[0.04em] text-white/80"
          >
            TravelSense <span className="text-white/35">&mdash;</span>{" "}
            <span className="text-accent">Human. Personal. Everywhere.</span>
          </motion.p>
        </div>
      </section>
    </>
  )
}
