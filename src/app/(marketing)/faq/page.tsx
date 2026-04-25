import { generatePageMetadata, faqSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import FAQPageContent from "@/components/faq/FAQPageContent"

/* ─── FAQ Data ───────────────────────────────────────────────────────── */

const faqs = [
  // General
  {
    question: "What is TravelSense?",
    answer:
      "TravelSense is a curated travel platform based in Sangamner, Maharashtra. We specialize in crafting personalized leisure, adventure, educational, and sports travel experiences for individuals, families, and corporate groups across India and internationally.",
    category: "General",
  },
  {
    question: "How is TravelSense different from online travel agencies like MakeMyTrip?",
    answer:
      "Unlike large OTAs that overwhelm you with thousands of generic listings, TravelSense offers a consultation-first approach. You speak with a real travel expert who understands your preferences, budget, and travel style before anything is booked. Every itinerary is handcrafted, not auto-generated.",
    category: "General",
  },
  {
    question: "Which destinations does TravelSense cover?",
    answer:
      "We cover all major domestic destinations across India — from Goa and Kerala to Ladakh and the Northeast — as well as popular international destinations including Southeast Asia, Europe, the Middle East, and more. If there is a place you want to go, we can plan it.",
    category: "General",
  },
  {
    question: "Do I need to visit your office to book a trip?",
    answer:
      "Not at all. Everything can be done online or over the phone. Book a free consultation call through our website, and our travel experts will guide you through the entire process remotely.",
    category: "General",
  },
  // Booking
  {
    question: "How do I book a trip with TravelSense?",
    answer:
      "Start by booking a free consultation on our website. During the call, share your destination preferences, budget, dates, and interests. Our team will then create a personalized itinerary for your review. Once you approve and make the initial payment, your trip is confirmed.",
    category: "Booking",
  },
  {
    question: "How far in advance should I book my trip?",
    answer:
      "We recommend booking at least 3 to 4 weeks in advance for domestic trips and 6 to 8 weeks for international travel. For peak seasons like summer holidays, Diwali, or year-end, booking 2 to 3 months ahead is ideal to secure the best rates and availability.",
    category: "Booking",
  },
  {
    question: "Can I book a trip for a large group?",
    answer:
      "Absolutely. We handle group bookings for families, friends, corporate teams, and special occasions. Group packages come with dedicated coordination, bulk pricing, and customized activities. Contact us with your group size and we will create a tailored proposal.",
    category: "Booking",
  },
  {
    question: "Can I make changes to my booking after confirmation?",
    answer:
      "Yes, modifications are possible depending on the service provider policies. Changes to dates, hotels, or activities may incur additional charges. Contact our support team as early as possible and we will do our best to accommodate your request.",
    category: "Booking",
  },
  // Payment
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, net banking, debit cards, credit cards, and bank transfers. International payments are processed through Stripe. All transactions are secured with industry-standard encryption.",
    category: "Payment",
  },
  {
    question: "Is there an option for EMI or installment payments?",
    answer:
      "Yes, we offer EMI options through select credit cards and payment partners for packages above a certain value. During the booking process, our team will walk you through available EMI plans so you can choose what works best for your budget.",
    category: "Payment",
  },
  {
    question: "When do I need to make the full payment?",
    answer:
      "Typically, a 30% advance is required at the time of booking confirmation. The remaining balance is due 15 days before your travel date. For last-minute bookings, full payment may be required upfront. Exact terms are shared during the booking process.",
    category: "Payment",
  },
  // Cancellation
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellation charges depend on how close to the travel date you cancel. Generally: more than 30 days before departure incurs minimal charges, 15 to 30 days incurs 25% of the package cost, 7 to 14 days incurs 50%, and less than 7 days incurs 75% or more. Specific terms are outlined in your booking confirmation.",
    category: "Cancellation",
  },
  {
    question: "How long does it take to receive a refund?",
    answer:
      "Refunds are processed within 7 to 10 business days after cancellation approval. The amount credited depends on the cancellation charges applicable. Refunds are sent back to the original payment method used during booking.",
    category: "Cancellation",
  },
  {
    question: "Can I reschedule my trip instead of cancelling?",
    answer:
      "Yes, rescheduling is often a better option than cancelling. Subject to availability, we can move your travel dates with minimal rescheduling fees. Contact us at least 15 days before your original departure date for the smoothest experience.",
    category: "Cancellation",
  },
  // Packages
  {
    question: "Can I customize a travel package?",
    answer:
      "Every TravelSense package is fully customizable. You can adjust the destination, duration, accommodation type, activities, meals, and transportation based on your preferences. Our consultation process is designed around understanding exactly what you want.",
    category: "Packages",
  },
  {
    question: "What is typically included in a travel package?",
    answer:
      "Standard inclusions are accommodation, airport or station transfers, sightseeing as per itinerary, breakfast (or meals as specified), and a dedicated trip coordinator. Some packages also include flights, travel insurance, and activity tickets. Exact inclusions are clearly listed in your itinerary document.",
    category: "Packages",
  },
  {
    question: "What is not included in the packages?",
    answer:
      "Unless explicitly mentioned, packages typically exclude airfare or train tickets, personal expenses, tips and gratuities, travel insurance, visa fees, and any activities not listed in the itinerary. We provide a detailed inclusion and exclusion list with every quote.",
    category: "Packages",
  },
  {
    question: "Do you offer packages for solo travelers?",
    answer:
      "Yes, we create tailored packages for solo travelers with curated experiences, safe accommodation recommendations, and optional group departure options. Solo travel is one of the fastest-growing segments we serve, and we ensure the experience is both enriching and secure.",
    category: "Packages",
  },
]

/* ─── Metadata ───────────────────────────────────────────────────────── */

export const metadata = generatePageMetadata({
  title: "FAQ — TravelSense",
  description:
    "Find answers to common questions about TravelSense — booking, payments, cancellations, packages, and more. Everything you need to know before you travel.",
  path: "/faq",
})

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function FAQPage() {
  return (
    <>
      <JsonLd
        data={faqSchema(
          faqs.map((f) => ({ question: f.question, answer: f.answer }))
        )}
      />
      <FAQPageContent faqs={faqs} />
    </>
  )
}
