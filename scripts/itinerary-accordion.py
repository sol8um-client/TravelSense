# -*- coding: utf-8 -*-
"""Redesign the package itinerary from a long zigzag timeline (full image per day)
into a compact collapsible accordion — the whole route fits one screen, expand a
day on demand. Client repeatedly asked to keep the itinerary on a single page."""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
PATH = r'E:\TravelSense\travelsense\src\components\packages\PackageDetail.tsx'
c = open(PATH, encoding='utf-8').read()

def repl(old, new, label, count=1):
    global c
    if old not in c:
        print("!! NOT FOUND:", label); sys.exit(1)
    c = c.replace(old, new, count)
    print("ok:", label)

# 1) imports: framer (drop useInView, add AnimatePresence) + add ChevronDown
repl('import { motion, useInView } from "framer-motion"',
     'import { motion, AnimatePresence } from "framer-motion"', "framer import")
repl('  Route as RouteIcon,\n  ChevronRight,\n} from "lucide-react"',
     '  Route as RouteIcon,\n  ChevronRight,\n  ChevronDown,\n} from "lucide-react"', "ChevronDown import")

# 2) remove ProgressTracker + ItineraryDayCard (everything between their first
#    comment marker and the Route-at-a-glance marker)
start = c.index('/* ─── Progress Tracker')
end = c.index('/* ─── Route-at-a-glance')
c = c[:start] + c[end:]
print("ok: removed ProgressTracker + ItineraryDayCard")

# 3) insert the new ItineraryAccordion right before the Main Component marker
ACC = '''/* ─── Compact day-by-day accordion (whole itinerary fits one screen) ─────── */

function ItineraryAccordion({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [openDays, setOpenDays] = useState<Set<number>>(
    () => new Set(itinerary.length ? [itinerary[0].day] : [])
  )
  const rowRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const toggle = (day: number) =>
    setOpenDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) next.delete(day)
      else next.add(day)
      return next
    })

  const openAndScroll = (day: number) => {
    setOpenDays((prev) => new Set(prev).add(day))
    setTimeout(
      () =>
        rowRefs.current[day]?.scrollIntoView({ behavior: "smooth", block: "center" }),
      60
    )
  }

  const allOpen = openDays.size === itinerary.length
  const toggleAll = () =>
    setOpenDays(allOpen ? new Set() : new Set(itinerary.map((d) => d.day)))

  return (
    <div className="mt-6">
      {/* Route at a glance — the whole route on one screen */}
      <RouteMap itinerary={itinerary} onSelect={openAndScroll} />

      {/* Expand / collapse control */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-white/40">Tap a day to see the details</p>
        <button
          onClick={toggleAll}
          className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/70 transition-colors hover:border-[#D4A853]/30 hover:text-white"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {/* Accordion rows */}
      <div className="mt-3 space-y-2">
        {itinerary.map((item) => {
          const open = openDays.has(item.day)
          return (
            <div
              key={item.day}
              ref={(el) => {
                rowRefs.current[item.day] = el
              }}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                open
                  ? "border-[#D4A853]/30 bg-white/[0.05]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              {/* Header row */}
              <button
                onClick={() => toggle(item.day)}
                className="flex w-full items-center gap-3 p-4 text-left"
                aria-expanded={open}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C4324A] to-[#D4A853] text-xs font-bold text-white">
                  {item.day}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-heading text-base font-medium tracking-[-0.01em] text-white">
                    {item.title}
                  </h3>
                  {item.highlight && !open && (
                    <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-[#D4A853]/80">
                      <Sparkles className="h-3 w-3 shrink-0" />
                      {item.highlight}
                    </p>
                  )}
                </div>
                {item.distance && (
                  <span className="hidden shrink-0 items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/50 sm:flex">
                    <span role="img" aria-label="distance">🚗</span> {item.distance}
                  </span>
                )}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded body */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 sm:pl-16">
                      {item.image && (
                        <div className="relative mb-3 aspect-[16/9] max-h-44 overflow-hidden rounded-xl">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 640px"
                          />
                        </div>
                      )}
                      <p className="text-sm leading-relaxed text-white/60">
                        {item.description}
                      </p>
                      {item.activities && item.activities.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.activities.map((act, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60"
                            >
                              {act}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                        {item.meals && <MealIcons meals={item.meals} />}
                        {item.accommodation && (
                          <div className="flex items-center gap-1.5 text-xs text-white/50">
                            <span role="img" aria-label="accommodation">🏨</span>
                            <span>{item.accommodation}</span>
                          </div>
                        )}
                        {item.elevation && (
                          <div className="flex items-center gap-1.5 text-xs text-white/50">
                            <span role="img" aria-label="elevation">⛰️</span>
                            <span>{item.elevation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

'''
repl('/* ─── Main Component', ACC + '/* ─── Main Component', "insert ItineraryAccordion")

# 4) remove main-component state (activeDay + itineraryRef) and handleDotClick
repl('  const [activeDay, setActiveDay] = useState(1)\n', '', "remove activeDay state")
repl('  const itineraryRef = useRef<HTMLDivElement>(null)\n', '', "remove itineraryRef")
repl('''  const handleDotClick = (day: number) => {
    setActiveDay(day)
    // Scroll to the day's card
    if (itineraryRef.current) {
      const cards = itineraryRef.current.querySelectorAll("[data-day]")
      const target = Array.from(cards).find(
        (el) => (el as HTMLElement).dataset.day === String(day)
      )
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }
''', '', "remove handleDotClick")

# 5) replace the itinerary render block with <ItineraryAccordion />
old_render = '''            {/* Route at a glance — the whole route on one screen (MoM: route map on 1 page) */}
            <RouteMap itinerary={pkg.itinerary} onSelect={handleDotClick} />

            {/* Progress tracker */}
            <div className="mt-8">
              <ProgressTracker
                totalDays={pkg.itinerary.length}
                activeDay={activeDay}
                onDotClick={handleDotClick}
              />
            </div>

            {/* Timeline */}
            <div ref={itineraryRef} className="relative">
              {pkg.itinerary.map((item, index) => (
                <div
                  key={item.day}
                  data-day={item.day}
                  onMouseEnter={() => setActiveDay(item.day)}
                >
                  <ItineraryDayCard
                    item={item}
                    index={index}
                    total={pkg.itinerary!.length}
                  />
                </div>
              ))}

              {/* Timeline end dot */}
              <div className="absolute left-6 bottom-0 z-10 -translate-x-1/2 md:left-1/2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A853] to-[#C4324A]">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>'''
repl(old_render, '            <ItineraryAccordion itinerary={pkg.itinerary} />', "swap render to accordion")

open(PATH, 'w', encoding='utf-8').write(c)
print("\nDone.")
