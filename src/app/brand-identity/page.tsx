"use client"

import { useState } from "react"

const palettes = [
  {
    id: "A",
    name: "Midnight Voyager",
    tag: "⭐ Recommended",
    description: "Deep navy + silver + compass red. Pulls the red from your logo's compass needle as the CTA accent. Maximum trust + premium feel.",
    bestFor: "Balanced positioning — premium travel + tech innovation. Best all-rounder.",
    colors: [
      { name: "Deep Midnight Navy", hex: "#0B1426", role: "Primary — hero sections, headers, footers" },
      { name: "Steel Navy", hex: "#1B2D4E", role: "Cards, secondary backgrounds, hover states" },
      { name: "Brushed Silver", hex: "#B0B8C4", role: "Borders, metadata, subtle UI elements" },
      { name: "Pearl Gray", hex: "#E8ECF0", role: "Light backgrounds, card surfaces, dividers" },
      { name: "Compass Red", hex: "#C4324A", role: "CTAs, active states, key highlights" },
      { name: "Warm Gold", hex: "#D4A853", role: "Premium badges, star ratings, special callouts" },
      { name: "Soft Cream", hex: "#FAF8F4", role: "Main page background" },
      { name: "Rich Charcoal", hex: "#1A1A2E", role: "Headings, body text" },
      { name: "Slate Gray", hex: "#64748B", role: "Captions, secondary text" },
    ],
  },
  {
    id: "B",
    name: "Arctic Explorer",
    tag: "Tech-Clean",
    description: "Apple-inspired ultra-clean aesthetic. Charcoal + pure white + electric blue. Your metallic logo shines on stark white.",
    bestFor: "Positioning as a TECH company that does travel — like Airbnb, not a hotel chain.",
    colors: [
      { name: "Rich Charcoal", hex: "#1C1C2E", role: "Primary — headings, nav bar" },
      { name: "Graphite", hex: "#374151", role: "Secondary text, icons" },
      { name: "Cool Silver", hex: "#94A3B8", role: "Borders, metadata, subtle UI" },
      { name: "Electric Blue", hex: "#2563EB", role: "CTAs, links, active states" },
      { name: "Sky Blue", hex: "#60A5FA", role: "Hover states, info badges" },
      { name: "Compass Rose", hex: "#E63946", role: "Notifications, alerts, urgent highlights" },
      { name: "Pure White", hex: "#FFFFFF", role: "Main page background" },
      { name: "Ice Gray", hex: "#F1F5F9", role: "Alternate sections, card surfaces" },
    ],
  },
  {
    id: "C",
    name: "Golden Compass",
    tag: "Luxury",
    description: "Deep navy + burnished gold + burgundy. Maximum Indian cultural resonance — Navy (Krishna) + Gold (Lakshmi) + Burgundy (heritage textiles).",
    bestFor: "High-net-worth Indian travelers. Premium luxury positioning.",
    colors: [
      { name: "Deep Navy", hex: "#0F2B44", role: "Primary — dominant brand color" },
      { name: "Burnished Gold", hex: "#C9A96E", role: "Premium elements, borders, icons" },
      { name: "Pale Gold", hex: "#E8D5B5", role: "Subtle backgrounds, card tints" },
      { name: "Deep Burgundy", hex: "#7A2038", role: "CTAs — from compass red family" },
      { name: "Rose", hex: "#D4917B", role: "Hover states, soft highlights" },
      { name: "Warm Ivory", hex: "#FBF7F0", role: "Main page background" },
      { name: "Near Black", hex: "#1A1420", role: "Headings, body text" },
      { name: "Warm Gray", hex: "#8B7E74", role: "Captions, metadata" },
    ],
  },
  {
    id: "D",
    name: "Future Forward",
    tag: "Bold & Dark",
    description: "Dark mode native. Space dark + neon teal + electric amber. For a brand that wants to scream 'we are the future.'",
    bestFor: "Young, tech-savvy travelers (25-40). Disruptor positioning vs traditional agencies.",
    colors: [
      { name: "Space Dark", hex: "#0A0E1A", role: "Primary dark background" },
      { name: "Deep Slate", hex: "#151B2B", role: "Cards, panels on dark" },
      { name: "Neon Teal", hex: "#00D4AA", role: "Primary CTAs, active states" },
      { name: "Electric Amber", hex: "#FFBE0B", role: "Secondary actions, star ratings" },
      { name: "Signal Red", hex: "#FF3F5C", role: "From compass — urgent actions, sale badges" },
      { name: "White", hex: "#F0F0F0", role: "Main text on dark" },
      { name: "Muted Silver", hex: "#8892A4", role: "Secondary text on dark" },
      { name: "Off White", hex: "#FAFAF8", role: "Light mode fallback background" },
    ],
  },
  {
    id: "E",
    name: "Nature Luxe",
    tag: "Eco-Premium",
    description: "Deep emerald + warm copper + cream. Earth tones meet sophistication. Stands out from the sea of blue travel brands.",
    bestFor: "Eco-tourism, nature travel, heritage experiences. Total visual differentiation.",
    colors: [
      { name: "Deep Emerald", hex: "#064E3B", role: "Primary — headers, nav, key sections" },
      { name: "Forest", hex: "#166534", role: "Hover states, secondary areas" },
      { name: "Warm Copper", hex: "#B87333", role: "Accents, icons, borders" },
      { name: "Sand", hex: "#D4B896", role: "Soft backgrounds, card tints" },
      { name: "Terra Red", hex: "#C0392B", role: "CTAs — from compass needle family" },
      { name: "Warm Linen", hex: "#F8F4EE", role: "Main page background" },
      { name: "Deep Brown", hex: "#2C1810", role: "Headings, body text" },
      { name: "Olive Gray", hex: "#6B7056", role: "Captions, metadata" },
    ],
  },
]

const taglines = [
  {
    primary: "Sense the World.",
    description: "Plays on brand name. 'Sense' = see + feel + intelligence. 3 words, sticks instantly.",
    tier: 1,
  },
  {
    primary: "See First. Travel Smart.",
    description: "'See First' = AR/VR preview. 'Travel Smart' = human guidance. Action-oriented.",
    tier: 1,
  },
  {
    primary: "Preview. Plan. Experience.",
    description: "Tells the complete product story: AR preview → assistant plans → you travel.",
    tier: 1,
  },
  {
    primary: "Future of Travel",
    description: "Your original idea. Bold, simple, positions as innovator. Strong for campaigns.",
    tier: 2,
  },
  {
    primary: "Your World, Previewed.",
    description: "Intimate + ambitious + tech. Creates curiosity about the AR feature.",
    tier: 2,
  },
  {
    primary: "See Beyond. Travel Beyond.",
    description: "Parallel structure, easy to remember. Double 'Beyond' is sticky.",
    tier: 2,
  },
  {
    primary: "Explore with Insight.",
    description: "'Insight' = visual sense (AR) + intelligence (smart guidance). Dual meaning.",
    tier: 2,
  },
  {
    primary: "Don't Just Travel. TravelSense.",
    description: "Turns the brand name into a verb. Bold, memorable, slightly cheeky.",
    tier: 3,
  },
  {
    primary: "Your Compass in a Digital World.",
    description: "References the compass in the logo. Bridges physical travel + digital tech.",
    tier: 3,
  },
  {
    primary: "Where Technology Guides Your Journey.",
    description: "'Guides' = both the tech AND the 24/7 human assistants. Descriptive.",
    tier: 3,
  },
]

function ColorSwatch({ color }: { color: { name: string; hex: string; role: string } }) {
  const isLight = ["#FFFFFF", "#FAF8F4", "#FBF7F0", "#F8F4EE", "#FAFAF8", "#F0F0F0", "#F1F5F9", "#E8ECF0", "#E8D5B5", "#D4B896"].includes(color.hex)

  return (
    <div className="group">
      <div
        className="h-20 rounded-lg shadow-sm ring-1 ring-black/5 mb-2 flex items-end p-2 transition-transform group-hover:scale-105"
        style={{ backgroundColor: color.hex }}
      >
        <span className={`text-[10px] font-mono ${isLight ? "text-gray-600" : "text-white/80"}`}>
          {color.hex}
        </span>
      </div>
      <p className="text-xs font-semibold text-gray-800">{color.name}</p>
      <p className="text-[10px] text-gray-500 mt-0.5">{color.role}</p>
    </div>
  )
}

function PalettePreview({ palette }: { palette: typeof palettes[0] }) {
  const primary = palette.colors[0]
  const accent = palette.colors.find(c => c.role.includes("CTA")) || palette.colors[4]
  const bg = palette.colors.find(c => c.role.includes("Main page")) || palette.colors[palette.colors.length - 3]

  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5"
      style={{ backgroundColor: bg.hex }}
    >
      {/* Header bar */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: primary.hex }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white/80 text-xs font-bold">TS</span>
          </div>
          <span className="text-white/90 text-sm font-medium tracking-wider">TRAVELSENSE</span>
        </div>
        <div className="flex gap-4">
          <span className="text-white/50 text-xs">Destinations</span>
          <span className="text-white/50 text-xs">Experiences</span>
          <span className="text-white/50 text-xs">AR Preview</span>
          <span className="text-white/50 text-xs">About</span>
        </div>
      </div>

      {/* Hero area */}
      <div className="px-6 py-10 text-center">
        <h3 className="text-2xl font-semibold mb-2" style={{ color: primary.hex }}>
          See First. Travel Smart.
        </h3>
        <p className="text-sm mb-6" style={{ color: palette.colors.find(c => c.role.includes("Caption") || c.role.includes("secondary text") || c.role.includes("Secondary text"))?.hex || "#64748B" }}>
          Experience destinations through AR before you book. With 24/7 personal travel guidance.
        </p>
        <button
          className="px-6 py-2.5 rounded-lg text-white text-sm font-medium shadow-md transition-transform hover:scale-105"
          style={{ backgroundColor: accent.hex }}
        >
          Explore Destinations →
        </button>
      </div>

      {/* Cards */}
      <div className="px-6 pb-6 grid grid-cols-3 gap-3">
        {["Bali, Indonesia", "Santorini, Greece", "Jaipur, India"].map((dest) => (
          <div key={dest} className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: palette.colors.find(c => c.role.includes("card") || c.role.includes("Card") || c.role.includes("Alternate"))?.hex || "#fff" }}>
            <div className="h-16" style={{ backgroundColor: primary.hex, opacity: 0.15 }} />
            <div className="p-3">
              <p className="text-xs font-semibold" style={{ color: primary.hex }}>{dest}</p>
              <p className="text-[10px] mt-1" style={{ color: palette.colors.find(c => c.role.includes("Caption") || c.role.includes("secondary text") || c.role.includes("Secondary text"))?.hex || "#64748B" }}>
                From ₹45,000
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BrandIdentityPage() {
  const [selectedPalette, setSelectedPalette] = useState<string>("A")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-3">TravelSense Brand Identity</p>
          <h1 className="text-4xl font-bold mb-3">Color Palettes & Taglines</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            5 palette directions designed to complement the finalized metallic visor + compass logo.
            Each pulls the compass red as a CTA accent for brand harmony.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Palette selector tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {palettes.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPalette(p.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedPalette === p.id
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 ring-1 ring-gray-200"
              }`}
            >
              {p.id}. {p.name}
              <span className={`ml-2 text-xs ${selectedPalette === p.id ? "text-yellow-400" : "text-gray-400"}`}>
                {p.tag}
              </span>
            </button>
          ))}
        </div>

        {palettes
          .filter((p) => p.id === selectedPalette)
          .map((palette) => (
            <div key={palette.id} className="space-y-10">
              {/* Palette header */}
              <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Palette {palette.id}: {palette.name}
                    </h2>
                    <p className="text-gray-500 mt-1 max-w-2xl">{palette.description}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    {palette.tag}
                  </span>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Best for:</strong> {palette.bestFor}
                  </p>
                </div>
              </div>

              {/* Color swatches */}
              <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Full Color Palette</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                  {palette.colors.map((color) => (
                    <ColorSwatch key={color.hex} color={color} />
                  ))}
                </div>
              </div>

              {/* Quick strip preview */}
              <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Color Strip</h3>
                <div className="flex rounded-xl overflow-hidden shadow-md h-16">
                  {palette.colors.map((color, i) => (
                    <div
                      key={color.hex}
                      className="flex-1 relative group cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name} — ${color.hex}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <span className="text-white text-[9px] font-mono">{color.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Website preview */}
              <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Website Preview</h3>
                <PalettePreview palette={palette} />
              </div>

              {/* CTA button preview */}
              <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Button & UI Element Preview</h3>
                <div className="grid grid-cols-2 gap-8">
                  {/* Light background buttons */}
                  <div className="p-6 rounded-xl" style={{ backgroundColor: palette.colors.find(c => c.role.includes("Main page"))?.hex || "#fff" }}>
                    <p className="text-xs font-medium text-gray-500 mb-4">ON LIGHT BACKGROUND</p>
                    <div className="space-y-3">
                      {palette.colors
                        .filter(c => c.role.includes("CTA") || c.role.includes("active"))
                        .slice(0, 3)
                        .map((color) => (
                          <button
                            key={color.hex}
                            className="w-full px-5 py-2.5 rounded-lg text-white text-sm font-medium shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          >
                            {color.name} — Book Now →
                          </button>
                        ))}
                      <button
                        className="w-full px-5 py-2.5 rounded-lg text-sm font-medium ring-1"
                        style={{
                          color: palette.colors[0].hex,
                          borderColor: palette.colors[0].hex,
                        }}
                      >
                        Outline — Learn More
                      </button>
                    </div>
                  </div>

                  {/* Dark background buttons */}
                  <div className="p-6 rounded-xl" style={{ backgroundColor: palette.colors[0].hex }}>
                    <p className="text-xs font-medium text-white/40 mb-4">ON DARK BACKGROUND</p>
                    <div className="space-y-3">
                      {palette.colors
                        .filter(c => c.role.includes("CTA") || c.role.includes("active"))
                        .slice(0, 3)
                        .map((color) => (
                          <button
                            key={color.hex + "-dark"}
                            className="w-full px-5 py-2.5 rounded-lg text-white text-sm font-medium shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          >
                            {color.name} — Book Now →
                          </button>
                        ))}
                      <button className="w-full px-5 py-2.5 rounded-lg text-sm font-medium ring-1 ring-white/30 text-white/80">
                        Outline — Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Taglines section */}
        <div className="mt-16">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-10 text-white mb-8">
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-3">Tagline Options</p>
            <h2 className="text-3xl font-bold mb-2">Which Line Sticks?</h2>
            <p className="text-gray-400 max-w-xl">
              Each tagline serves a different purpose. You can use multiple across different touchpoints.
            </p>
          </div>

          {/* Tier 1 */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">
              🥇 Tier 1 — Top Recommendations
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {taglines
                .filter((t) => t.tier === 1)
                .map((t) => (
                  <div key={t.primary} className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Tagline display — dark */}
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl lg:text-3xl font-bold text-white tracking-wide">
                            {t.primary}
                          </p>
                          <p className="text-gray-500 text-xs mt-4 tracking-[0.2em] uppercase">TravelSense</p>
                        </div>
                      </div>
                      {/* Description */}
                      <div className="p-8 flex flex-col justify-center">
                        <span className="text-yellow-600 text-xs font-bold uppercase tracking-wider mb-2">Top Pick</span>
                        <p className="text-gray-600 text-sm leading-relaxed">{t.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">
              🥈 Tier 2 — Strong Contenders
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {taglines
                .filter((t) => t.tier === 2)
                .map((t) => (
                  <div key={t.primary} className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-100">
                    <p className="text-xl font-bold text-gray-900 mb-2">{t.primary}</p>
                    <p className="text-gray-500 text-sm">{t.description}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Tier 3 */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">
              🥉 Tier 3 — Bold / Unconventional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {taglines
                .filter((t) => t.tier === 3)
                .map((t) => (
                  <div key={t.primary} className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-gray-100">
                    <p className="text-lg font-bold text-gray-900 mb-2">{t.primary}</p>
                    <p className="text-gray-500 text-xs">{t.description}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Usage strategy */}
          <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Suggested Tagline Pairing Strategy</h3>
            <p className="text-gray-500 text-sm mb-6">Use different taglines for different touchpoints:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { where: "Logo lockup", tagline: "Sense the World." },
                { where: "Website hero", tagline: "See First. Travel Smart." },
                { where: "App Store", tagline: "Preview. Plan. Experience." },
                { where: "Business cards", tagline: "Sense the World." },
                { where: "Marketing campaigns", tagline: "Future of Travel" },
                { where: "Social media bio", tagline: "See Beyond. Travel Beyond." },
              ].map((item) => (
                <div key={item.where} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">{item.where}</p>
                  <p className="text-sm font-semibold text-gray-800">{item.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
