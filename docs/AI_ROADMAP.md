# AI Integration Roadmap — TravelSense

**Timeline:** Post Phase 1 Launch (Before Phase 2)
**Estimated Duration:** 3–4 weeks of iterative implementation
**Tech Stack:** Claude API (primary), OpenAI API (fallback), Vercel AI SDK, n8n, Vector DB

---

## Philosophy

TravelSense's AI layer is not a gimmick — it's the core competitive moat. No small/mid-size Indian travel brand has AI-powered trip planning, conversational booking, or intelligent content generation. This positions TravelSense **2–3 years ahead** of most competitors in the curated travel space.

The AI features should feel magical to the user while being practical and revenue-driving for the business.

---

## Implementation Priorities

### Phase AI-1: Chatbot Assistant (Week 1)
**Impact: HIGH | Effort: MEDIUM**

**What it does:**
- Floating chat widget on all pages (bottom-right)
- Handles common traveler queries 24/7 without human intervention
- Can answer: destination FAQs, package details, visa requirements, booking process
- Escalates to human (WhatsApp/email) for complex queries
- Can schedule consultation calls directly

**Technical Architecture:**
```
User Message → Vercel AI SDK → Claude API
                                    ↓
                            RAG Context Layer
                            (TravelSense content indexed in vector DB)
                                    ↓
                            Structured Response
                            → Display in chat UI
                            → Optional: trigger booking/scheduling action
```

**Implementation:**
1. Index all TravelSense content (destinations, packages, FAQs, blog posts) into vector DB (Pinecone/Qdrant)
2. Build chat UI component with streaming responses (Vercel AI SDK)
3. Create system prompt with TravelSense brand voice, service boundaries, escalation rules
4. Add conversation memory (per-session context window)
5. Track analytics: queries, resolution rate, escalation rate, booking triggers

**Revenue Impact:**
- Reduces response time from hours to seconds
- Captures leads 24/7 (especially late-night browsing travelers)
- Pre-qualifies inquiries before consultation calls

---

### Phase AI-2: AI Itinerary Generator (Week 1–2)
**Impact: HIGH | Effort: MEDIUM**

**What it does:**
- Enhances the existing rule-based itinerary builder with AI intelligence
- Takes: destination, budget range, duration, travel dates, interests, group type, travel style
- Generates: day-wise itinerary with activities, hotel suggestions, transport, estimated costs
- Output is shareable (link, PDF, WhatsApp) and saveable
- Option to "Book This Trip" → leads to consultation

**Technical Architecture:**
```
User Inputs (form) → API Route → Claude API
                                      ↓
                              System Prompt with:
                              - Destination knowledge (from Sanity CMS)
                              - Pricing data (from DB)
                              - Seasonal/weather context
                              - Local expertise rules
                                      ↓
                              Structured JSON Output
                              → Parse into itinerary UI
                              → Generate shareable card/PDF
```

**Prompt Engineering:**
- Few-shot examples of high-quality itineraries
- Budget-aware recommendations (budget/mid-range/luxury tiers)
- Seasonal intelligence (monsoon activities, winter treks, festival timing)
- Category-specific recommendations (adventure activities, educational visits, sports events)

**Revenue Impact:**
- Viral shareable itineraries drive organic traffic
- Each itinerary is a warm lead → consultation booking
- Demonstrates expertise and builds trust before any human interaction

---

### Phase AI-3: Smart Budget Calculator (Week 2)
**Impact: MEDIUM-HIGH | Effort: LOW-MEDIUM**

**What it does:**
- AI-powered cost estimation for any trip
- Inputs: destination, duration, group size, travel style (budget/comfort/luxury), dates
- Outputs: itemized estimate (flights, hotels, food, activities, transport, visa, misc)
- Provides range (low–high) with confidence indicators
- Adjusts for seasonality, demand patterns

**Technical Architecture:**
```
User Inputs → Claude API with pricing context
                    ↓
            Structured JSON:
            {
              flight_estimate: { low: X, high: Y },
              hotel_per_night: { low: X, high: Y },
              food_per_day: { low: X, high: Y },
              activities: { low: X, high: Y },
              transport: { low: X, high: Y },
              visa: X,
              miscellaneous: X,
              total: { low: X, high: Y }
            }
            → Render in interactive UI with sliders
```

**Revenue Impact:**
- Removes "how much will this cost?" barrier (biggest hesitation for travelers)
- Position TravelSense as transparent and trustworthy
- Budget ranges lead to "Get Exact Quote" → consultation

---

### Phase AI-4: Auto Content Generation (Week 2–3)
**Impact: MEDIUM | Effort: MEDIUM**

**What it does:**
- Generate first drafts of destination descriptions, blog articles, social media captions
- Founder reviews and approves before publishing (human-in-the-loop)
- Maintains brand voice and SEO optimization
- Integrated with Sanity CMS workflow

**Technical Architecture:**
```
Content Request (admin panel)
    → Claude API with:
       - Brand voice guidelines
       - SEO keywords
       - Target audience
       - Content type (blog/destination/social)
    → Draft generated
    → Saved as draft in Sanity
    → Founder reviews → approves → publishes
```

**Workflow (n8n):**
1. Admin triggers content generation (topic, keywords, type)
2. n8n calls Claude API with structured prompt
3. Draft saved to Sanity as "pending review"
4. Notification sent to founder (WhatsApp/email)
5. Founder reviews in Sanity Studio → approves/edits → publish

**Revenue Impact:**
- 10x content velocity (from 2–4 posts/month to 20+)
- Better SEO coverage → more organic traffic → more bookings
- Consistent content cadence without founder's time bottleneck

---

### Phase AI-5: Dynamic Recommendations (Week 3–4)
**Impact: MEDIUM | Effort: HIGH**

**What it does:**
- Personalized destination, package, and content recommendations
- Based on: browsing behavior, search queries, past interactions, similar user patterns
- Shows on: homepage, destination pages, sidebar, email newsletters

**Technical Architecture:**
```
User Behavior Tracking (anonymous session-level)
    → Event logging (page views, searches, time-on-page, interests selected)
    → Recommendation API
    → Claude API with user context + available content
    → Ranked recommendations
    → Render in UI (carousel, sidebar, email)
```

**Note:** This requires accumulated user data. Start collecting behavioral events from Phase 1 launch. Implement recommendation logic once there's sufficient data (100+ sessions).

---

### Phase AI-6: Predictive Pricing (Future)
**Impact: HIGH | Effort: HIGH**

**Deferred until Phase 2 marketplace is live.** Requires:
- Historical booking data
- Seasonal demand patterns
- Competitor pricing feeds
- Payment transaction data

---

## Architecture Decisions

### Why Claude API as Primary?
1. Superior reasoning for complex trip planning
2. Better at maintaining brand voice in content generation
3. Stronger structured output for itinerary/budget JSON
4. Sol8um's existing expertise with Claude API

### Why Vercel AI SDK?
1. Native Next.js integration
2. Built-in streaming support
3. Easy provider switching (Claude ↔ OpenAI)
4. Edge runtime support for low-latency responses

### Why n8n for Automation?
1. Visual workflow builder (founder can see what's happening)
2. Self-hostable (data stays controlled)
3. Integrates with Sanity, Brevo, WhatsApp, Razorpay
4. No vendor lock-in

### AI-Ready Architecture Principles
Even in Phase 1 (before AI features are live), the codebase should:
1. Store all user interactions in a way that's useful for future personalization
2. Structure Sanity content with rich metadata (tags, categories, difficulty, budget tier) for RAG
3. Use API routes that can be extended with AI middleware
4. Keep prompt templates in a dedicated `/prompts` directory for versioning
5. Design the itinerary builder form to collect inputs that map to AI prompt variables

---

## Cost Estimates

| Feature | Claude API Cost (Est./Month) | Notes |
|---------|------------------------------|-------|
| Chatbot | $50–$150 | Depends on traffic; cache common responses |
| Itinerary Generator | $30–$100 | ~200–500 generations/month at launch |
| Budget Calculator | $20–$50 | Lightweight prompts, cacheable |
| Content Generation | $20–$50 | ~50–100 articles/month |
| Recommendations | $30–$80 | Batch processing, not real-time |
| **Total Estimated** | **$150–$430/month** | Scales with usage |

**Note:** Costs will be scoped and quoted separately to the client per the proposal terms.

---

## Success Metrics

| Feature | KPI | Target (3 months post-launch) |
|---------|-----|-------------------------------|
| Chatbot | Query resolution rate | > 70% without human escalation |
| Chatbot | Lead capture rate | > 15% of chat sessions → contact info captured |
| Itinerary Generator | Itineraries generated/month | > 500 |
| Itinerary Generator | Share rate | > 20% of generated itineraries shared |
| Budget Calculator | Usage/month | > 300 calculations |
| Content Generation | Articles published/month | > 15 (vs 2–4 manual) |
| Overall | Consultation bookings from AI features | > 30% of total consultations |
