import Image from "next/image"

const v3Concepts = [
  {
    id: "F",
    slug: "f",
    name: "The Connected Glasses",
    description:
      "Smart AR/VR glasses where the left lens is standard (tech) and the right lens is shaped like a location pin (travel destination). The bridge between the lenses is a heartbeat/pulse line — representing 24/7 HUMAN personal assistance at the center of everything. Signal dots from the temple arm suggest smart connectivity.",
    pillars: [
      { icon: "👓", label: "AR/VR Innovation", detail: "The glasses themselves = tech platform" },
      { icon: "📍", label: "Travel Destinations", detail: "Right lens shaped as location pin" },
      { icon: "💓", label: "Human Assistance", detail: "Heartbeat pulse bridge = real people, 24/7" },
    ],
    vibe: "Tech-Forward, Human-Centered, Modern",
    palette: "Deep Navy #0F2B44 + Gold #C9A96E",
    whyItWorks:
      "This is the ONLY concept that has all three brand pillars in one single mark: glasses = AR/VR, pin-lens = travel, heartbeat bridge = human touch. And it does it with extreme minimalism — single line weight, no fills.",
    files: {
      darkIcon: "f1-connected-glasses-icon.svg",
      lightIcon: "f2-connected-glasses-light.svg",
      wordmark: "f3-connected-glasses-wordmark.svg",
    },
  },
  {
    id: "A",
    slug: "a",
    name: "The Explorer's Lens",
    description:
      "Full smart glasses from front view. The LEFT lens contains a globe (world/destinations). The RIGHT lens contains a human figure silhouette (personal assistant). The bridge is a clean arch. Signal dots suggest connectivity. The most intuitive, immediately readable version.",
    pillars: [
      { icon: "🌍", label: "World in Left Lens", detail: "Globe meridians = destinations worldwide" },
      { icon: "👤", label: "Human in Right Lens", detail: "Person silhouette = your dedicated guide" },
      { icon: "📡", label: "Smart Connectivity", detail: "Signal dots = AR/VR tech platform" },
    ],
    vibe: "Intuitive, Bold, Globally-Minded",
    palette: "Deep Navy #0F2B44 + Gold #C9A96E",
    whyItWorks:
      "Most literal and immediately understood. A viewer instantly gets: 'This is a tech company (glasses) that shows me the world (globe) with a personal guide (human).' Zero ambiguity. Strong at any size.",
    files: {
      darkIcon: "a1-explorer-lens-icon.svg",
      lightIcon: "a2-explorer-lens-light.svg",
      wordmark: "a3-explorer-lens-wordmark.svg",
    },
  },
  {
    id: "C",
    slug: "c",
    name: "The Guided View",
    description:
      "Instead of full glasses, this uses a SINGLE AR lens (like a smart monocle) containing a location pin. Signal arcs radiate upward from the lens — reading as both 'connectivity' AND 'expanding horizons'. A human figure dot is tethered to the lens by a connection line, showing the ever-present guide.",
    pillars: [
      { icon: "🔭", label: "Single AR Lens", detail: "Focused, singular vision = premium" },
      { icon: "📶", label: "Signal = Horizons", detail: "Arcs read as tech AND as expanding world" },
      { icon: "🧑‍💼", label: "Tethered Guide", detail: "Human dot connected to the lens = always there" },
    ],
    vibe: "Abstract, Premium, Unique",
    palette: "Deep Navy #0F2B44 + Gold #C9A96E",
    whyItWorks:
      "The most distinctive and premium-feeling concept. The single lens is a strong differentiator — no other travel brand uses this form. The signal arcs are beautiful and have dual meaning. But it's more abstract, requiring a beat longer to 'get'.",
    files: {
      darkIcon: "c1-guided-view-icon.svg",
      lightIcon: "c2-guided-view-light.svg",
      wordmark: "c3-guided-view-wordmark.svg",
    },
  },
]

const taglineOptions = [
  {
    tagline: "See It. Feel It. Live It.",
    explanation:
      "See = AR/VR preview | Feel = personal human guidance | Live = the actual travel. Covers ALL three pillars in 6 words. Maps the customer journey: see → feel → live.",
    rank: 1,
  },
  {
    tagline: "See First. Go Further.",
    explanation:
      "See First = AR/VR preview destinations before you go. Go Further = we take you beyond ordinary travel with personal guidance. Just 5 words, aspirational and actionable.",
    rank: 2,
  },
  {
    tagline: "Guided by Heart. Powered by Vision.",
    explanation:
      "Heart = 24/7 human assistance. Vision = AR/VR tech. Puts humans first (differentiator). Elegant contrast structure.",
    rank: 3,
  },
  {
    tagline: "Experience First. Travel Next.",
    explanation:
      "Perfectly describes AR/VR value prop — experience the destination virtually, then travel there for real. Unexpected word order makes it sticky.",
    rank: 4,
  },
  {
    tagline: "Smart Vision. Human Heart.",
    explanation:
      "Shortest way to say both USPs. Four words, perfect contrast. Smart Vision = AR/VR + innovation. Human Heart = 24/7 personal assistance.",
    rank: 5,
  },
]

export default function LogoConceptsPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Header */}
      <div className="bg-[#0F2B44] text-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[4px] text-[#C9A96E] mb-3">
            Brand Identity — V3 Concepts
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold">
            Travel<span className="text-[#C9A96E]">Sense</span> Logo Concepts
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-3xl">
            3 concepts built around the brand&apos;s actual DNA: AR/VR technology + 24/7 human personal assistance + innovative travel. Each logo tells the complete brand story.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Brand DNA */}
        <div className="mb-16 rounded-2xl border-2 border-[#C9A96E]/30 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-[#0F2B44] mb-4">What the Logo Must Communicate</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-[#0F2B44] to-[#1a3d5c] p-6 text-white">
              <p className="text-3xl mb-2">👓</p>
              <h3 className="font-bold text-lg text-[#C9A96E]">AR/VR Innovation</h3>
              <p className="text-white/70 text-sm mt-1">
                Smart glasses / VR technology integrated into the travel experience. See destinations before you visit.
              </p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-[#0F2B44] to-[#1a3d5c] p-6 text-white">
              <p className="text-3xl mb-2">🤝</p>
              <h3 className="font-bold text-lg text-[#C9A96E]">24/7 Human Assistance</h3>
              <p className="text-white/70 text-sm mt-1">
                Real human travel guides available around the clock. Not bots — actual people who care about your journey.
              </p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-[#0F2B44] to-[#1a3d5c] p-6 text-white">
              <p className="text-3xl mb-2">🚀</p>
              <h3 className="font-bold text-lg text-[#C9A96E]">Rising Travel Company</h3>
              <p className="text-white/70 text-sm mt-1">
                Modern, innovative, forward-thinking. Not another generic travel agency — a tech-powered platform.
              </p>
            </div>
          </div>
        </div>

        {/* Concepts */}
        <div className="space-y-20">
          {v3Concepts.map((concept, index) => (
            <ConceptCard key={concept.id} concept={concept} rank={index + 1} />
          ))}
        </div>

        {/* Side by Side Comparison */}
        <div className="mt-20 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
            All 3 Concepts — Side by Side
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Compare icons on both light and dark backgrounds
          </p>

          {/* Light background */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {v3Concepts.map((c) => (
              <div key={c.id} className="flex flex-col items-center gap-4 rounded-xl bg-[#F8F6F3] p-6">
                <Image
                  src={`/images/brand/concepts-v3/${c.files.lightIcon}`}
                  alt={c.name}
                  width={120}
                  height={120}
                  className="h-[120px] w-[120px]"
                />
                <div className="text-center">
                  <span className="text-sm font-bold text-gray-800 block">{c.name}</span>
                  <span className="text-xs text-gray-500">{c.vibe}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dark background */}
          <div className="rounded-xl bg-[#0F2B44] p-8">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-6 text-center">On Dark Background</p>
            <div className="grid grid-cols-3 gap-8">
              {v3Concepts.map((c) => (
                <div key={c.id} className="flex flex-col items-center gap-4">
                  <Image
                    src={`/images/brand/concepts-v3/${c.files.darkIcon}`}
                    alt={c.name}
                    width={120}
                    height={120}
                    className="h-[120px] w-[120px]"
                  />
                  <span className="text-xs text-white/60">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wordmark Comparison */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">
            Full Wordmark Preview
          </h2>
          <div className="space-y-6">
            {v3Concepts.map((concept) => (
              <div key={concept.id} className="rounded-xl border border-gray-100 p-6">
                <p className="text-xs font-bold text-[#C9A96E] mb-3">Concept {concept.id} — {concept.name}</p>
                <Image
                  src={`/images/brand/concepts-v3/${concept.files.wordmark}`}
                  alt={`${concept.name} full wordmark`}
                  width={480}
                  height={120}
                  className="h-20 w-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Taglines */}
        <div className="mt-16 rounded-2xl border-2 border-[#C9A96E]/30 bg-white p-8 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
            Tagline Options
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Each tagline reflects: AR/VR + Human Assistance + Travel — ranked by recommendation
          </p>

          <div className="space-y-4">
            {taglineOptions.map((t) => (
              <div key={t.rank} className={`rounded-xl border p-6 ${t.rank === 1 ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-gray-100'}`}>
                <div className="flex items-start gap-4">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${t.rank === 1 ? 'bg-[#C9A96E] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {t.rank}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F2B44]">&ldquo;{t.tagline}&rdquo;</h3>
                    <p className="text-sm text-gray-600 mt-1">{t.explanation}</p>
                  </div>
                  {t.rank === 1 && (
                    <span className="ml-auto shrink-0 rounded-full bg-[#C9A96E] px-3 py-1 text-xs font-bold text-white">
                      RECOMMENDED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Framework */}
        <div className="mt-12 rounded-2xl bg-[#0F2B44] p-8 text-white">
          <h2 className="font-heading text-xl font-bold mb-6 text-[#C9A96E]">
            Which Concept to Choose?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 p-6">
              <p className="text-[#C9A96E] font-bold mb-2">Choose F (Connected Glasses) if:</p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• You want ALL 3 pillars in ONE mark</li>
                <li>• The heartbeat/human angle is your main differentiator</li>
                <li>• You want the most meaningful, storytelling logo</li>
                <li>• You prefer subtle cleverness over literal depiction</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 p-6">
              <p className="text-[#C9A96E] font-bold mb-2">Choose A (Explorer&apos;s Lens) if:</p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Instant understanding matters most</li>
                <li>• You want people to &ldquo;get it&rdquo; in 1 second</li>
                <li>• The globe = world travel is important to show</li>
                <li>• You want bold and confident, not subtle</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 p-6">
              <p className="text-[#C9A96E] font-bold mb-2">Choose C (Guided View) if:</p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• You want the most unique, standout mark</li>
                <li>• Premium/abstract positioning appeals to you</li>
                <li>• The signal arcs / expanding horizons idea resonates</li>
                <li>• You want to be unlike any other travel brand</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConceptCard({ concept, rank }: { concept: typeof v3Concepts[number]; rank: number }) {
  const medals = ["🥇", "🥈", "🥉"]

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Concept header */}
      <div className="bg-gradient-to-r from-[#0F2B44] to-[#1a3d5c] p-6 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{medals[rank - 1]}</span>
          <div>
            <p className="text-xs text-[#C9A96E] font-bold uppercase tracking-wider">Concept {concept.id} — Rank #{rank}</p>
            <h3 className="font-heading text-2xl font-bold">{concept.name}</h3>
          </div>
          <span className="ml-auto text-xs text-white/40">{concept.palette}</span>
        </div>
      </div>

      <div className="p-8">
        {/* Description */}
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">{concept.description}</p>

        {/* Three pillars in this concept */}
        <div className="grid gap-3 md:grid-cols-3 mb-8">
          {concept.pillars.map((p) => (
            <div key={p.label} className="rounded-lg border border-[#C9A96E]/20 bg-[#C9A96E]/5 p-4">
              <p className="text-xl mb-1">{p.icon}</p>
              <p className="font-bold text-sm text-[#0F2B44]">{p.label}</p>
              <p className="text-xs text-gray-600 mt-0.5">{p.detail}</p>
            </div>
          ))}
        </div>

        {/* Why it works */}
        <div className="rounded-lg border-l-4 border-[#C9A96E] bg-[#0F2B44]/5 p-4 mb-8">
          <p className="text-xs font-bold text-[#0F2B44] uppercase tracking-wider mb-1">Why This Works</p>
          <p className="text-sm text-gray-700">{concept.whyItWorks}</p>
        </div>

        {/* Visual showcase */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Dark icon */}
          <div className="rounded-xl bg-[#0F2B44] p-8 flex flex-col items-center">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Dark Background</p>
            <Image
              src={`/images/brand/concepts-v3/${concept.files.darkIcon}`}
              alt={`${concept.name} dark`}
              width={140}
              height={140}
              className="h-[140px] w-[140px]"
            />
          </div>

          {/* Light icon */}
          <div className="rounded-xl bg-[#F8F6F3] border border-gray-100 p-8 flex flex-col items-center">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Light Background</p>
            <Image
              src={`/images/brand/concepts-v3/${concept.files.lightIcon}`}
              alt={`${concept.name} light`}
              width={140}
              height={140}
              className="h-[140px] w-[140px]"
            />
          </div>

          {/* Scale test */}
          <div className="rounded-xl border border-gray-100 p-8 flex flex-col items-center">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Scale Test</p>
            <div className="flex items-end gap-4 flex-wrap justify-center">
              {[96, 64, 48, 32, 24, 16].map((s) => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <Image
                    src={`/images/brand/concepts-v3/${concept.files.darkIcon}`}
                    alt=""
                    width={s}
                    height={s}
                    style={{ height: s, width: s }}
                  />
                  <span className="text-[9px] text-gray-400">{s}px</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wordmark */}
        <div className="mt-6 rounded-xl border border-gray-100 p-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Full Wordmark + Tagline</p>
          <Image
            src={`/images/brand/concepts-v3/${concept.files.wordmark}`}
            alt={`${concept.name} wordmark`}
            width={480}
            height={120}
            className="h-24 w-auto"
          />
        </div>
      </div>
    </div>
  )
}
