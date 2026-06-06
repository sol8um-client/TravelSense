import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Phone } from "lucide-react"
import { travelCategories } from "@/config/categories"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"

export const metadata: Metadata = generatePageMetadata({
  title: "Travel Categories",
  description:
    "Explore curated travel experiences across leisure and adventure. Find the trip style that fits you - planned end-to-end by a real human.",
  path: "/categories",
})

/* Short editorial taglines + reliable local hero art (mirrors the homepage
   Categories section so the standalone page stays on-brand and link-rot-free). */
const TAGLINE: Record<string, string> = {
  leisure: "Unwind & recharge",
  adventure: "Thrill & conquer",
}
const HERO_IMG: Record<string, string> = {
  leisure: "/images/generated/goa-hero.webp",
  adventure: "/images/generated/leh-ladakh-hero.webp",
}

export default function CategoriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
        ])}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section
        className="bg-brand-mesh"
        style={{ position: "relative", overflow: "hidden", padding: "clamp(120px, 16vw, 170px) 24px clamp(44px, 7vw, 78px)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-[12%] right-[6%] h-[360px] w-[360px] rounded-full bg-secondary/[0.06] blur-[110px]" />
          <div className="absolute bottom-0 left-[2%] h-[300px] w-[300px] rounded-full bg-primary/[0.05] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[760px] text-center">
          <p className="eyebrow justify-center">
            <span className="dot" /> How do you travel?
          </p>
          <h1 className="h-display mt-4 text-[clamp(2.4rem,6vw,4rem)]">
            Two ways to <em>explore.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.7] text-muted-foreground sm:text-[16.5px]">
            Every trip starts with how you want to feel. Pick your style - a real expert plans, books and
            stays with you the whole way.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {travelCategories.map((c) => {
              const Icon = c.icon
              const name = c.title.replace(" Travel", "")
              return (
                <a
                  key={c.id}
                  href={`#${c.slug}`}
                  className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-primary transition-transform hover:-translate-y-0.5"
                >
                  <Icon className="h-3.5 w-3.5 text-secondary" strokeWidth={1.8} />
                  {name}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORY SHOWCASES ═══════════ */}
      <section className="bg-brand-mesh" style={{ padding: "0 24px clamp(60px, 9vw, 110px)" }}>
        <div className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(52px,9vw,104px)]">
          {travelCategories.map((c, i) => {
            const flip = i % 2 === 1
            const Icon = c.icon
            const name = c.title.replace(" Travel", "")
            return (
              <div
                key={c.id}
                id={c.slug}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14"
                style={{ scrollMarginTop: "calc(var(--nav-h) + 12px)" }}
              >
                {/* ── Image (liquid-glass frame) ── */}
                <div className={flip ? "lg:order-2" : ""}>
                  <div className="glass-panel relative overflow-hidden rounded-[28px] p-2.5 shadow-[0_30px_80px_rgba(11,20,38,0.22)]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-primary/10">
                      <Image
                        src={HERO_IMG[c.slug] ?? c.image}
                        alt={name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 560px"
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-tr ${c.color.gradient} opacity-20`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/55 via-transparent to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl glass-pill">
                        <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
                      </div>
                      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full glass-pill px-3 py-1.5 text-[11px] font-semibold text-primary">
                        <span className="font-script text-[15px] leading-none text-secondary">{TAGLINE[c.slug] ?? name}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Copy ── */}
                <div className={flip ? "lg:order-1" : ""}>
                  <p className="font-tech text-[9px] uppercase tracking-[0.22em] text-silver-dark">
                    0{i + 1} - {c.description}
                  </p>
                  <h2
                    className="font-heading mt-2 text-[clamp(1.9rem,4vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.02em] text-primary"
                    style={{ fontVariationSettings: "'opsz' 144" }}
                  >
                    {name} <em className="font-normal italic text-secondary">travel.</em>
                  </h2>
                  <p className="mt-4 max-w-[480px] text-[15px] leading-[1.75] text-muted-foreground">
                    {c.longDescription}
                  </p>

                  {/* highlights */}
                  <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                    {c.highlights.slice(0, 6).map((h) => (
                      <div key={h} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-foreground/75">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        {h}
                      </div>
                    ))}
                  </div>

                  {/* popular destinations */}
                  <div className="mt-6">
                    <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-silver-dark">
                      <MapPin className="h-3.5 w-3.5 text-secondary" strokeWidth={1.8} />
                      Popular destinations
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.popularDestinations.map((d) => (
                        <span
                          key={d}
                          className="rounded-full border border-silver/30 bg-white/60 px-3 py-1.5 text-[12px] text-foreground/70 backdrop-blur-sm"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={c.href} className="btn btn-primary mt-7">
                    Explore {name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: "#0A1425" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 600px 400px at 20% 20%, rgba(196,50,74,0.16), transparent 60%), radial-gradient(ellipse 600px 400px at 85% 90%, rgba(27,45,78,0.6), transparent 60%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680, margin: "0 auto", padding: "clamp(64px,9vw,96px) 24px", textAlign: "center" }}>
          <h2
            className="font-heading"
            style={{ margin: 0, fontSize: "clamp(1.9rem,4vw,2.9rem)", fontWeight: 500, letterSpacing: "-0.025em", color: "#fff", fontVariationSettings: "'opsz' 144" }}
          >
            Not sure which fits you?{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary-glow)" }}>Let&apos;s talk.</em>
          </h2>
          <p style={{ margin: "16px auto 0", maxWidth: 440, fontSize: 15.5, lineHeight: 1.7, color: "rgba(208,213,220,0.7)" }}>
            Tell a real expert your vibe and budget - we&apos;ll match you to the perfect style and place.
          </p>
          <div style={{ marginTop: 30, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
            <WhatsAppLink source="categories-cta" className="btn btn-primary" style={{ padding: "15px 30px", fontSize: 14 }}>
              <Phone size={16} strokeWidth={1.5} /> Talk to a human
            </WhatsAppLink>
            <Link href="/consultation" className="btn btn-ghost" style={{ padding: "15px 28px", fontSize: 14 }}>
              Book a free consultation
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
