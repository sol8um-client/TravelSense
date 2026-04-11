"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Calendar,
  IndianRupee,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Send,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import ItineraryResults from "@/components/itinerary/ItineraryResults"

const STEPS = [
  { label: "Destination", icon: MapPin },
  { label: "Budget", icon: IndianRupee },
  { label: "Interests", icon: Sparkles },
]

const TRAVEL_STYLES = [
  { value: "budget", label: "Budget", description: "Best value for money" },
  { value: "standard", label: "Standard", description: "Comfort & convenience" },
  { value: "premium", label: "Premium", description: "Elevated experiences" },
  { value: "luxury", label: "Luxury", description: "No compromises" },
]

const INTERESTS = [
  { id: "nature", label: "Nature" },
  { id: "culture", label: "Culture" },
  { id: "adventure", label: "Adventure" },
  { id: "food", label: "Food" },
  { id: "shopping", label: "Shopping" },
  { id: "nightlife", label: "Nightlife" },
  { id: "history", label: "History" },
  { id: "wellness", label: "Wellness" },
  { id: "photography", label: "Photography" },
]

const inputStyles = cn(
  "mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30",
  "focus-visible:border-[#C4324A] focus-visible:ring-[#C4324A]/20"
)

const selectStyles = cn(
  "mt-1.5 flex h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white shadow-xs transition-[color,box-shadow] outline-none",
  "focus-visible:border-[#C4324A] focus-visible:ring-[3px] focus-visible:ring-[#C4324A]/20"
)

interface Recommendation {
  title: string
  destination: string
  duration: number
  price: number
  matchScore: number
  slug?: string
}

export default function ItineraryForm() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState<{
    recommendations: Recommendation[]
    message: string
  } | null>(null)

  const [form, setForm] = useState({
    destination: "",
    duration: "",
    budget: "",
    travelStyle: "standard",
    interests: [] as string[],
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleInterestToggle(interest: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  function canProceed(): boolean {
    if (step === 0) return form.destination.length >= 2 && Number(form.duration) >= 1
    if (step === 1) return Number(form.budget) >= 5000
    if (step === 2) return form.interests.length >= 1
    return false
  }

  function nextStep() {
    if (canProceed() && step < STEPS.length - 1) setStep((s) => s + 1)
  }

  function prevStep() {
    if (step > 0) setStep((s) => s - 1)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canProceed()) return
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: form.destination,
          duration: Number(form.duration),
          budget: Number(form.budget),
          travelStyle: form.travelStyle,
          interests: form.interests,
          startDate: new Date().toISOString().split("T")[0],
          travelers: 1,
        }),
      })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setResults(data.data)
      toast.success("Itinerary recommendations ready!")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    i <= step
                      ? "border-[#C4324A] bg-[#C4324A] text-white"
                      : "border-white/20 bg-white/5 text-white/40"
                  )}
                >
                  <s.icon className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "mt-2 font-body text-xs transition-colors",
                    i <= step ? "text-white" : "text-white/40"
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-2 mt-[-20px] h-0.5 flex-1">
                  <div
                    className={cn(
                      "h-full rounded-full transition-colors",
                      i < step ? "bg-[#C4324A]" : "bg-white/10"
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 md:p-8">
        <form onSubmit={onSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Destination */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="font-heading text-lg font-normal tracking-wide text-white">
                    Where do you want to go?
                  </h3>
                  <p className="mt-1 font-body text-sm text-white/50">
                    Enter your dream destination and trip duration.
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="itin-dest"
                    className="text-white/70 font-body text-sm"
                  >
                    Destination
                  </Label>
                  <Input
                    id="itin-dest"
                    name="destination"
                    required
                    value={form.destination}
                    onChange={handleChange}
                    placeholder="e.g., Goa, Ladakh, Bali, Europe"
                    aria-label="Destination"
                    className={inputStyles}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="itin-duration"
                    className="text-white/70 font-body text-sm"
                  >
                    Duration (days)
                  </Label>
                  <Input
                    id="itin-duration"
                    name="duration"
                    type="number"
                    required
                    min={1}
                    max={30}
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="Number of days"
                    aria-label="Trip duration in days"
                    className={inputStyles}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget & Style */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="font-heading text-lg font-normal tracking-wide text-white">
                    What is your budget?
                  </h3>
                  <p className="mt-1 font-body text-sm text-white/50">
                    Set your budget per person and preferred travel style.
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="itin-budget"
                    className="text-white/70 font-body text-sm"
                  >
                    Budget per Person (INR)
                  </Label>
                  <Input
                    id="itin-budget"
                    name="budget"
                    type="number"
                    required
                    min={5000}
                    step={1000}
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g., 25000"
                    aria-label="Budget in INR"
                    className={inputStyles}
                  />
                  {form.budget && Number(form.budget) >= 5000 && (
                    <p className="mt-1 font-body text-xs text-[#D4A853]">
                      {formatCurrency(Number(form.budget))} per person
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-white/70 font-body text-sm">
                    Travel Style
                  </Label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {TRAVEL_STYLES.map((style) => (
                      <button
                        key={style.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            travelStyle: style.value,
                          }))
                        }
                        className={cn(
                          "rounded-xl border p-3 text-left transition-colors",
                          form.travelStyle === style.value
                            ? "border-[#C4324A] bg-[#C4324A]/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <p
                          className={cn(
                            "font-body text-sm font-medium",
                            form.travelStyle === style.value
                              ? "text-white"
                              : "text-white/70"
                          )}
                        >
                          {style.label}
                        </p>
                        <p className="mt-0.5 font-body text-xs text-white/40">
                          {style.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Interests */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="font-heading text-lg font-normal tracking-wide text-white">
                    What are you interested in?
                  </h3>
                  <p className="mt-1 font-body text-sm text-white/50">
                    Select one or more interests to personalize your itinerary.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {INTERESTS.map((interest) => {
                    const isSelected = form.interests.includes(interest.id)
                    return (
                      <label
                        key={interest.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                          isSelected
                            ? "border-[#C4324A] bg-[#C4324A]/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() =>
                            handleInterestToggle(interest.id)
                          }
                          className="border-white/20 data-[state=checked]:border-[#C4324A] data-[state=checked]:bg-[#C4324A]"
                        />
                        <span
                          className={cn(
                            "font-body text-sm",
                            isSelected ? "text-white" : "text-white/60"
                          )}
                        >
                          {interest.label}
                        </span>
                      </label>
                    )
                  })}
                </div>

                {form.interests.length > 0 && (
                  <p className="font-body text-xs text-[#D4A853]">
                    {form.interests.length} interest
                    {form.interests.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={step === 0}
              className="font-body text-white/60 hover:text-white"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
              >
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!canProceed() || isSubmitting}
                className="bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Build Itinerary
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {results && (
        <div className="mt-12">
          <ItineraryResults
            recommendations={results.recommendations}
            message={results.message}
          />
        </div>
      )}
    </div>
  )
}
