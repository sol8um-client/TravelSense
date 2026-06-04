"""Replace the How-it-works + Categories sections in LandingPage.tsx with
faithful ports of the design handoff (sticky boarding-pass builder + sticky
visor-goggle glide). Anchored on the section comment markers so internal
whitespace never has to match."""

import io, sys

PATH = r"E:\TravelSense\travelsense\src\components\home\LandingPage.tsx"

NEW = r'''/* ═══════════════════════════════════════════════════════════════
   3b. HOW IT WORKS — sticky boarding-pass builder
       Faithful port of the prototype `HowItWorks` (home-sections-c.jsx).
       Scroll-pins for 460vh; one conversation assembles into a booked trip
       across four steps — Consult → Plan → Book → Travel.
   ═══════════════════════════════════════════════════════════════ */

const HIW_STEPS: { n: string; title: string; status: string; color: string }[] = [
  { n: "01", title: "Consult", status: "DRAFT", color: "#C4324A" },
  { n: "02", title: "Plan", status: "PLANNED", color: "#A8574E" },
  { n: "03", title: "Book", status: "CONFIRMED", color: "#1F8A7A" },
  { n: "04", title: "Travel", status: "BOARDING", color: "#1F8A5B" },
]
const HIW_PREFS = ["Beaches", "Hill air", "Mid-budget", "2 travellers", "Late March"]
const HIW_PLAN_ROWS: [string, string][] = [
  ["D1", "Arrive · beach sunset"],
  ["D2", "Spice plantation walk"],
  ["D3", "Backwater cruise"],
]
const HIW_BOOKED = ["Flights", "Stays", "Visa", "Transfers"]

/* The boarding-pass body morphs per scroll step. */
function PassBody({ step }: { step: number }) {
  if (step === 0)
    return (
      <div>
        <p className="m-0 mb-3 font-script text-[20px] text-secondary">tell us your vibe — no forms, just talk</p>
        <div className="flex flex-wrap gap-2">
          {HIW_PREFS.map((c, i) => (
            <span
              key={c}
              className="rounded-full border border-silver/40 bg-silver-mist px-3.5 py-[7px] text-[12.5px] text-foreground"
              style={{ animation: `fadeUp .5s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both` }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    )
  if (step === 1)
    return (
      <div className="relative pl-5">
        <div
          className="absolute left-[5px] top-2 bottom-2 w-0.5"
          style={{ background: "repeating-linear-gradient(180deg, rgba(176,184,196,0.5) 0 4px, transparent 4px 8px)" }}
        />
        {HIW_PLAN_ROWS.map((r, i) => (
          <div
            key={r[0]}
            className="relative flex items-center gap-3 py-2"
            style={{ animation: `fadeUp .5s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s both` }}
          >
            <span className="absolute -left-5 h-2.5 w-2.5 rounded-full border-2 border-secondary bg-white" />
            <span className="w-[22px] font-tech text-[10px] text-secondary">{r[0]}</span>
            <span className="text-[13.5px] text-foreground">{r[1]}</span>
          </div>
        ))}
      </div>
    )
  if (step === 2)
    return (
      <div className="relative">
        <div className="grid grid-cols-2 gap-2.5">
          {HIW_BOOKED.map((b, i) => (
            <div
              key={b}
              className="flex items-center gap-2.5 rounded-[11px] px-3 py-2.5"
              style={{
                border: "1px solid rgba(31,138,122,0.25)",
                background: "rgba(31,138,122,0.06)",
                animation: `fadeUp .45s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both`,
              }}
            >
              <CheckCircle className="h-4 w-4" style={{ color: "#1F8A5B" }} />
              <span className="text-[13px] text-foreground">{b}</span>
            </div>
          ))}
        </div>
        <div className="absolute -right-1 -top-4 rotate-[-14deg]" style={{ animation: "fadeUp .4s cubic-bezier(0.34,1.56,0.64,1) .2s both" }}>
          <span
            className="inline-block rounded-md font-tech text-[13px] tracking-[0.12em]"
            style={{ color: "#1F8A5B", border: "2.5px solid #1F8A5B", padding: "5px 10px", opacity: 0.85 }}
          >
            CONFIRMED
          </span>
        </div>
      </div>
    )
  return (
    <div className="flex flex-col gap-3">
      <div
        className="inline-flex items-center gap-2.5 self-start rounded-full px-4 py-2.5"
        style={{ background: "rgba(31,138,91,0.08)", border: "1px solid rgba(31,138,91,0.2)" }}
      >
        <span className="h-2 w-2 rounded-full" style={{ background: "#1F8A5B", boxShadow: "0 0 0 3px rgba(31,138,91,0.18)", animation: "pulseRing 2s cubic-bezier(0.22,1,0.36,1) infinite" }} />
        <span className="text-[12.5px] font-semibold" style={{ color: "#1F8A5B" }}>24/7 human on call — a travel expert is online</span>
      </div>
      <p className="m-0 font-script text-[24px] text-primary">bon voyage — we&apos;ve got you, the whole way.</p>
    </div>
  )
}

function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null)
  const leadModal = useLeadModal()
  const [t, setT] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const total = Math.max(1, el.offsetHeight - window.innerHeight)
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      setT(scrolled / total)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  const step = Math.min(3, Math.floor((t / 0.86) * 4))
  const railT = Math.min(1, t / 0.86)
  const cur = HIW_STEPS[step]
  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const total = Math.max(1, el.offsetHeight - window.innerHeight)
    window.scrollTo({ top: el.offsetTop + ((i + 0.5) / 4) * 0.86 * total, behavior: "smooth" })
  }

  return (
    <section ref={ref} id="how-it-works" className="relative bg-brand-mesh" style={{ height: "460vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 py-10 sm:px-8">
        {/* compact header */}
        <div className="max-w-[620px] text-center">
          <p className="m-0 font-body text-[10.5px] font-semibold uppercase tracking-[0.28em] text-secondary">How it works</p>
          <h2 className="mt-3 font-heading text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.04] tracking-[-0.025em] text-primary" style={{ fontVariationSettings: "'opsz' 144" }}>
            Watch your trip <em className="font-normal italic text-secondary">assemble itself.</em>
          </h2>
          <p className="mx-auto mt-3 max-w-[460px] text-[14.5px] leading-[1.65] text-muted-foreground">
            Keep scrolling — one conversation becomes a fully-booked trip, step by step.
          </p>
        </div>

        {/* thin progress rail */}
        <div className="my-[34px] w-full max-w-[540px]">
          <div className="mb-3.5 flex justify-between">
            {HIW_STEPS.map((s, i) => (
              <button key={s.n} onClick={() => jump(i)} className="flex flex-1 cursor-pointer flex-col items-center gap-[3px]">
                <span className="font-tech text-[8.5px] tracking-[0.16em]" style={{ color: i <= step ? s.color : "var(--silver-dark)", transition: "color .3s" }}>{s.n}</span>
                <span className="font-heading text-[15px] font-medium" style={{ color: i === step ? "var(--primary)" : i < step ? "var(--muted-foreground)" : "var(--silver-dark)", transition: "color .3s" }}>{s.title}</span>
              </button>
            ))}
          </div>
          <div className="relative h-[3px] rounded-sm" style={{ background: "rgba(176,184,196,0.3)" }}>
            <div className="absolute left-0 top-0 h-full rounded-sm" style={{ width: `${railT * 100}%`, background: "linear-gradient(90deg, #C4324A, #A8574E 45%, #1F8A7A 75%, #1F8A5B)" }} />
            <div
              className="absolute top-1/2 flex h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
              style={{ left: `${railT * 100}%`, border: `2px solid ${cur.color}`, boxShadow: `0 2px 10px ${cur.color}66`, transition: "border-color .3s" }}
            >
              <span className="h-[5px] w-[5px] rounded-full" style={{ background: cur.color }} />
            </div>
          </div>
        </div>

        {/* boarding pass */}
        <div className="relative flex w-full max-w-[700px] overflow-hidden rounded-[20px] bg-white" style={{ boxShadow: "0 24px 64px rgba(11,20,38,0.14)", border: "1px solid rgba(176,184,196,0.2)" }}>
          <div className="min-w-0 flex-1 px-5 py-6 sm:px-[26px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image src="/images/brand/logo-emblem.png" alt="" width={22} height={22} className="h-[22px] w-auto" />
                <span className="font-tech text-[8.5px] uppercase tracking-[0.2em] text-silver-dark">Boarding Pass</span>
              </div>
              <span className="rounded-full px-2.5 py-[5px] font-tech text-[9px] tracking-[0.14em] text-white" style={{ background: cur.color, transition: "background .4s" }}>{cur.status}</span>
            </div>
            <div className="my-[18px] flex items-center gap-4 border-b border-dashed pb-4" style={{ borderColor: "rgba(176,184,196,0.4)" }}>
              <div>
                <div className="font-tech text-[8px] tracking-[0.14em] text-silver-dark">FROM</div>
                <div className="font-heading text-[26px] font-semibold leading-none text-primary">PNQ</div>
              </div>
              <svg width="60" height="20" viewBox="0 0 60 20" className="shrink-0"><path d="M2 10h44M40 4l8 6-8 6" stroke="var(--secondary)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="2" cy="10" r="2.5" fill="var(--secondary)" /></svg>
              <div>
                <div className="font-tech text-[8px] tracking-[0.14em] text-silver-dark">TO</div>
                <div className="font-heading text-[26px] font-semibold leading-none" style={{ color: step === 0 ? "var(--silver)" : "var(--primary)", transition: "color .4s" }}>{step === 0 ? "• • •" : "GOA"}</div>
              </div>
            </div>
            <div key={step} className="fade-up min-h-[120px]">
              <PassBody step={step} />
            </div>
          </div>
          <div className="relative flex w-[94px] shrink-0 flex-col items-center justify-between border-l-2 border-dashed py-5" style={{ borderColor: "rgba(176,184,196,0.5)", background: "linear-gradient(180deg, #FAFBFC, #EEF1F5)" }}>
            <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full" style={{ background: "#F4EFE6" }} />
            <span className="absolute -left-2 -bottom-2 h-4 w-4 rounded-full" style={{ background: "#F4EFE6" }} />
            <div className="text-center">
              <div className="font-tech text-[7.5px] tracking-[0.12em] text-silver-dark">STEP</div>
              <div className="font-heading text-[30px] font-semibold leading-none" style={{ color: cur.color, transition: "color .4s" }}>{cur.n}</div>
            </div>
            <div className="flex h-10 gap-0.5">{Array.from({ length: 8 }).map((_, b) => <span key={b} className="bg-primary" style={{ width: b % 3 === 0 ? 2.5 : 1.5, opacity: b % 2 ? 0.5 : 0.85 }} />)}</div>
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full" style={{ background: step >= 2 ? "#1F8A5B" : "rgba(176,184,196,0.3)", transition: "background .4s" }}><Check className="h-[15px] w-[15px] text-white" strokeWidth={2.4} /></span>
          </div>
        </div>

        {/* scroll hint / CTA */}
        <div className="mt-7 flex h-11 items-center justify-center">
          {railT < 1 ? (
            <div className="flex flex-col items-center gap-[5px] text-silver-dark" style={{ animation: "scrollNudge 2.4s cubic-bezier(0.22,1,0.36,1) infinite" }}>
              <span className="font-tech text-[9px] uppercase tracking-[0.28em]">scroll</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A929E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </div>
          ) : (
            <button onClick={() => leadModal.open("how-it-works")} className="btn btn-primary fade-up px-[26px] py-[13px] text-[13.5px]">
              Start your journey <ArrowRight className="h-[15px] w-[15px]" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3c. CATEGORIES — sticky visor-goggle glide
       Faithful port of the prototype `Categories` (home-sections-a.jsx).
       Scroll-pins for 320vh; one goggle glides left → centre → right,
       cross-fading the framed destination photo + copy per category.
   ═══════════════════════════════════════════════════════════════ */

const CAT_VISOR_NORM = "M 0.03750 0.53030 C 0.01875 0.33333 0.10625 0.15152 0.23125 0.12121 C 0.40625 0.06818 0.61250 0.06061 0.75625 0.12879 C 0.88125 0.18182 0.97500 0.27273 0.95313 0.43939 C 0.93750 0.63636 0.86563 0.76515 0.77500 0.79545 C 0.71250 0.81818 0.66563 0.81818 0.62188 0.77273 C 0.57500 0.71970 0.54375 0.67424 0.50000 0.67424 C 0.45625 0.67424 0.42500 0.71970 0.37813 0.77273 C 0.33438 0.82576 0.26875 0.87879 0.19688 0.85606 C 0.11875 0.83333 0.05625 0.71970 0.03750 0.53030 Z"
const CAT_VISOR_VB = "M 12 70 C 6 44 34 20 74 16 C 130 9 196 8 242 17 C 282 24 312 36 305 58 C 300 84 277 101 248 105 C 228 108 213 108 199 102 C 184 95 174 89 160 89 C 146 89 136 95 121 102 C 107 109 86 116 63 113 C 38 110 18 95 12 70 Z"

const CATS: { title: string; place: string; tagline: string; coord: string; desc: string; image: string; num: string; stat: string; accent: string; slug: string }[] = [
  { title: "Leisure", place: "Goa", tagline: "Unwind & recharge", coord: "15.29°N · 73.97°E", desc: "Pristine beaches, luxury resorts and serene hill stations — for those who travel to breathe.", image: "/images/generated/goa-hero.webp", num: "01", stat: "70+ packages", accent: "#C4324A", slug: "leisure" },
  { title: "Education", place: "Varanasi", tagline: "Learn & grow", coord: "25.31°N · 83.01°E", desc: "Heritage walks, cultural immersions and field trips that turn the world into your classroom.", image: "/images/generated/varanasi-hero.webp", num: "02", stat: "20+ programs", accent: "#1F8A7A", slug: "educational" },
  { title: "Adventure", place: "Leh-Ladakh", tagline: "Thrill & conquer", coord: "34.15°N · 77.57°E", desc: "Scale peaks, raft rapids, trek ancient trails. For those who travel to feel truly alive.", image: "/images/generated/leh-ladakh-hero.webp", num: "03", stat: "25+ experiences", accent: "#A8574E", slug: "adventure" },
]

/* Visor-goggle framed image (brand's signature lens shape). The drop-shadow lives
   on the navy backing layer (sibling), never on the clipped photo — Chrome drops a
   clip-path when a filter sits on the clipped element or any ancestor. */
function VisorImage({ img, width = 392, flip = false, bgSize = "cover" }: { img: string; width?: number; flip?: boolean; bgSize?: string }) {
  const uid = useId().replace(/:/g, "")
  const h = width * (132 / 320)
  const flipT = flip ? "scaleX(-1)" : "none"
  return (
    <div className="relative" style={{ width, height: h }}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={`vg-${uid}`} clipPathUnits="objectBoundingBox"><path d={CAT_VISOR_NORM} /></clipPath>
        </defs>
      </svg>
      <svg width={width} height={h} viewBox="0 0 320 132" preserveAspectRatio="none" className="absolute inset-0 overflow-visible" style={{ transform: flipT, filter: "drop-shadow(0 18px 30px rgba(11,20,38,0.22)) drop-shadow(0 4px 8px rgba(11,20,38,0.14))", zIndex: 1 }}>
        <path d={CAT_VISOR_VB} fill="#0A1425" />
      </svg>
      <div className="absolute inset-0" style={{ zIndex: 2, transform: flipT, clipPath: `url(#vg-${uid})`, WebkitClipPath: `url(#vg-${uid})`, backgroundImage: `url(${img})`, backgroundSize: bgSize, backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ transform: flipT }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(168deg, rgba(255,255,255,0.18) 0%, transparent 42%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(11,20,38,0.28) 100%)" }} />
        </div>
      </div>
      <svg width={width} height={h} viewBox="0 0 320 132" preserveAspectRatio="none" className="absolute inset-0 overflow-visible" style={{ transform: flipT, zIndex: 3 }}>
        <defs>
          <linearGradient id={`vgm-${uid}`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#F4F6F9" /><stop offset="48%" stopColor="#C8CDD5" /><stop offset="58%" stopColor="#C0C5CD" /><stop offset="100%" stopColor="#AAB0BA" />
          </linearGradient>
        </defs>
        <path d={CAT_VISOR_VB} fill="none" stroke={`url(#vgm-${uid})`} strokeWidth="8" strokeLinejoin="round" />
        <path d={CAT_VISOR_VB} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinejoin="round" style={{ transformBox: "fill-box", transformOrigin: "center", transform: "scale(0.972)" }} />
      </svg>
    </div>
  )
}

function CategoriesSection() {
  const ref = useRef<HTMLElement>(null)
  const [t, setT] = useState(0)
  const [vw, setVw] = useState(1280)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const total = Math.max(1, el.offsetHeight - window.innerHeight)
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      setT(scrolled / total)
    }
    const onResize = () => {
      setVw(window.innerWidth)
      onScroll()
    }
    onResize()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])
  const idx = Math.min(CATS.length - 1, Math.floor((t / 0.92) * CATS.length))
  const c = CATS[idx]
  const flip = idx % 2 === 1
  const xpos = idx === 0 ? -22 : idx === CATS.length - 1 ? 22 : 0
  const goggleW = Math.min(392, Math.round(vw * 0.84))
  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const total = Math.max(1, el.offsetHeight - window.innerHeight)
    window.scrollTo({ top: el.offsetTop + ((i + 0.5) / CATS.length) * 0.92 * total, behavior: "smooth" })
  }

  return (
    <section ref={ref} className="relative bg-white" style={{ height: "320vh" }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* header */}
        <div className="shrink-0 pt-[6vh] text-center">
          <p className="eyebrow justify-center text-secondary"><span className="dot" /> How do you travel?</p>
          <h2 className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl">Three ways to <em>explore.</em></h2>
        </div>

        {/* visor band — goggle glides left → centre → right */}
        <div className="relative min-h-0 flex-1">
          <span
            key={`ghost-${idx}`}
            aria-hidden
            className="fade-in-soft pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-heading font-medium leading-none"
            style={{ fontSize: "min(40vh, 380px)", color: "transparent", WebkitTextStroke: `1.5px ${c.accent}14`, zIndex: 1 }}
          >
            {c.num}
          </span>

          <div className="absolute left-1/2 top-1/2" style={{ zIndex: 3, transform: `translate(calc(-50% + ${xpos}vw), -50%)`, transition: "transform .75s cubic-bezier(0.22,1,0.36,1)" }}>
            <div key={`vis-${idx}`} className="fade-in-soft flex flex-col items-center gap-4">
              <VisorImage img={c.image} width={goggleW} flip={flip} />
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-4" style={{ background: `linear-gradient(90deg, transparent, ${c.accent})` }} />
                  <span className="font-heading text-[18px] font-medium italic leading-none text-primary" style={{ fontVariationSettings: "'opsz' 144" }}>{c.place}</span>
                  <span className="h-px w-4" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />
                </div>
                <span className="font-tech text-[8.5px] uppercase tracking-[0.22em] text-silver-dark">{c.coord}</span>
              </div>
            </div>
          </div>
        </div>

        {/* text band */}
        <div key={`txt-${idx}`} className="fade-in-soft mx-auto max-w-[480px] shrink-0 px-8 text-center">
          <p className="m-0 text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: `${c.accent}cc` }}>{c.tagline}</p>
          <h3 className="mt-1.5 font-heading text-[34px] font-medium tracking-[-0.02em] text-primary" style={{ fontVariationSettings: "'opsz' 144" }}>{c.title}</h3>
          <p className="mx-auto mt-2.5 max-w-[420px] text-[14px] leading-[1.65] text-muted-foreground">{c.desc}</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link href={`/categories/${c.slug}`} className="link-underline inline-flex items-center gap-2 text-[14px] font-semibold text-primary">Explore {c.title} <ArrowRight className="h-4 w-4" /></Link>
            <span className="rounded-full px-3 py-1.5 text-[10.5px] font-medium tracking-[0.06em]" style={{ background: `${c.accent}0D`, border: `1px solid ${c.accent}20`, color: c.accent }}>{c.stat}</span>
          </div>
        </div>

        {/* stepper + progress */}
        <div className="flex shrink-0 flex-col items-center gap-3.5 pt-[22px] pb-[5vh]">
          <div className="flex justify-center gap-2.5">
            {CATS.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => jump(i)}
                className="flex cursor-pointer items-center gap-2.5 rounded-full px-4 py-2"
                style={{ border: `1px solid ${i === idx ? cat.accent : "rgba(176,184,196,0.3)"}`, background: i === idx ? `${cat.accent}0e` : "#fff", transition: "all .3s cubic-bezier(0.22,1,0.36,1)" }}
              >
                <span className="h-[7px] w-[7px] rounded-full" style={{ background: i === idx ? cat.accent : "rgba(176,184,196,0.5)", transition: "background .3s" }} />
                <span className="font-body text-[12.5px] font-semibold" style={{ color: i === idx ? "var(--primary)" : "var(--silver-dark)", transition: "color .3s" }}>{cat.title}</span>
              </button>
            ))}
          </div>
          <div className="h-[3px] w-[220px] overflow-hidden rounded-sm" style={{ background: "rgba(176,184,196,0.3)" }}>
            <div className="h-full" style={{ width: `${Math.min(100, (t / 0.92) * 100)}%`, background: `linear-gradient(90deg, ${CATS[0].accent}, ${c.accent})`, transition: "width .15s linear" }} />
          </div>
        </div>
      </div>
    </section>
  )
}

'''

with io.open(PATH, "r", encoding="utf-8") as f:
    text = f.read()

i_hiw = text.index("3b. HOW IT WORKS")
start = text.rfind("/*", 0, i_hiw)
i_dest = text.index("4. DESTINATIONS")
end = text.rfind("/*", 0, i_dest)

if start == -1 or end == -1 or end <= start:
    print("ANCHOR FAIL", start, end)
    sys.exit(1)

removed = text[start:end]
new_text = text[:start] + NEW + text[end:]

with io.open(PATH, "w", encoding="utf-8", newline="") as f:
    f.write(new_text)

print("OK")
print("removed_chars", len(removed))
print("new_chars", len(NEW))
print("removed_head:", removed[:60].replace(chr(10), " | "))
print("removed_tail:", removed[-60:].replace(chr(10), " | "))
