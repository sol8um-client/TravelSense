"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Types ──────────────────────────────────────────────────────────── */

export interface FAQItem {
  question: string
  answer: string
  category: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [openKey, setOpenKey] = useState<string | null>(null)

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(faqs.map((f) => f.category)))
    return ["All", ...cats]
  }, [faqs])

  // Filter FAQs by category + search
  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCategory =
        activeCategory === "All" || faq.category === activeCategory
      const matchSearch =
        !search.trim() ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [faqs, activeCategory, search])

  return (
    <div className="mx-auto max-w-4xl">
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="glass-field w-full rounded-2xl py-3.5 pl-11 pr-4 font-body text-sm text-primary placeholder:text-muted-foreground outline-none transition-colors focus:border-secondary/40"
        />
      </div>

      {/* Category Tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 font-body text-sm font-medium transition-all duration-200",
              activeCategory === cat
                ? "bg-secondary text-white shadow-[0_8px_24px_rgba(196,50,74,0.28)]"
                : "glass-pill text-muted-foreground hover:text-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion - glass cards with smooth height motion */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 text-center font-body text-sm text-muted-foreground"
          >
            No questions match your search. Try a different term.
          </motion.p>
        ) : (
          <motion.div
            key={activeCategory + search}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {filtered.map((faq, i) => {
              const key = `${faq.category}-${i}`
              const isOpen = openKey === key
              return (
                <div
                  key={key}
                  className={cn(
                    "glass-panel overflow-hidden rounded-2xl transition-colors duration-300",
                    isOpen && "ring-1 ring-secondary/25"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none md:px-6"
                  >
                    <span
                      className={cn(
                        "font-body text-sm font-medium leading-snug transition-colors md:text-base",
                        isOpen ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-all duration-300",
                        isOpen ? "rotate-180 text-secondary" : "text-muted-foreground"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-secondary/10 px-5 pb-5 pt-4 md:px-6">
                          <p className="font-body text-sm leading-relaxed text-muted-foreground">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
