"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Accordion from "@radix-ui/react-accordion"
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
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3.5 pl-11 pr-4 font-body text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#C4324A]/40 focus:bg-white/[0.06]"
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
                ? "bg-[#C4324A] text-white shadow-lg shadow-[#C4324A]/20"
                : "bg-white/[0.05] text-white/50 hover:bg-white/[0.08] hover:text-white/70"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 text-center font-body text-sm text-white/40"
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
          >
            <Accordion.Root type="multiple" className="space-y-3">
              {filtered.map((faq, i) => (
                <Accordion.Item
                  key={`${faq.category}-${i}`}
                  value={`${faq.category}-${i}`}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.03] transition-colors data-[state=open]:border-[#C4324A]/25 data-[state=open]:bg-white/[0.05]"
                >
                  <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none md:px-6">
                    <span className="font-body text-sm font-medium leading-snug text-white/80 transition-colors group-data-[state=open]:text-white md:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-white/30 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#C4324A]" />
                  </Accordion.Trigger>

                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="border-t border-white/[0.06] px-5 pb-5 pt-4 md:px-6">
                      <p className="font-body text-sm leading-relaxed text-white/50">
                        {faq.answer}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
