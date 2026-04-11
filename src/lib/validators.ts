import { z } from "zod/v4"

// ─── Contact Form ───────────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// ─── Consultation Booking ───────────────────────────────────────────────────

export const consultationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  travelInterest: z.string().min(1, "Please select your travel interest"),
  message: z.string().optional(),
})

export type ConsultationFormData = z.infer<typeof consultationFormSchema>

// ─── Newsletter ─────────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z.email("Please enter a valid email"),
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>

// ─── Vehicle Request ────────────────────────────────────────────────────────

export const vehicleRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  destination: z.string().min(2, "Please enter the destination"),
  travelDates: z.string().min(1, "Please enter travel dates"),
  vehicleType: z.enum(["SEDAN", "SUV", "VAN", "BUS", "TEMPO_TRAVELLER"]),
  groupSize: z.number().int().min(1).max(50),
  message: z.string().optional(),
})

export type VehicleRequestFormData = z.infer<typeof vehicleRequestSchema>

// ─── Visa Inquiry ───────────────────────────────────────────────────────────

export const visaInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  destination: z.string().min(2, "Please enter the destination country"),
  travelDate: z.string().min(1, "Please select a travel date"),
  numberOfTravelers: z.number().int().min(1).max(20),
  message: z.string().optional(),
})

export type VisaInquiryFormData = z.infer<typeof visaInquirySchema>

// ─── Itinerary Builder ──────────────────────────────────────────────────────

export const itineraryFormSchema = z.object({
  destination: z.string().min(2, "Please enter a destination"),
  startDate: z.string().min(1, "Please select a start date"),
  duration: z.number().int().min(1).max(30),
  budget: z.number().min(5000, "Minimum budget is Rs 5,000"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  travelers: z.number().int().min(1).max(20),
  travelStyle: z.enum(["budget", "standard", "premium", "luxury"]).optional(),
})

export type ItineraryFormData = z.infer<typeof itineraryFormSchema>
