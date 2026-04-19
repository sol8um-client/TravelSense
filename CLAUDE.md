# CLAUDE.md — TravelSense Travel Platform

## Project Identity

- **Project Name:** TravelSense
- **Brand Name:** TravelSense (by V9 Travels)
- **Client:** Jayshree Lakhotiya — V9 Travels, Pune
- **Technology Partner:** Sol8um — AI Infrastructure & Automation Agency
- **Project Start:** March 2026
- **Current Phase:** Phase 1 (Weeks 1–6)

---

## Project Context

TravelSense is a tech-enabled travel platform being built for Jayshree Lakhotiya of V9 Travels (Pune). The client is currently operational in leisure & individual travel (offline/semi-digital) and wants to go fully digital with a phased platform build — starting with a professional travel website (Phase 1), then evolving into a full marketplace (Phase 2), with AI capabilities integrated post-launch.

The founder is **non-technical**. Sol8um manages everything end-to-end: brand, design, development, content, marketing, AI, and infrastructure. Full IP ownership stays with the client.

### What Makes This Project Different

This is NOT another generic travel booking site. TravelSense must feel like a **premium, founder-led travel brand** — not a clone of MakeMyTrip or TravelTriangle. The platform should:

1. Feel personal, curated, and trustworthy (founder's personality should shine through)
2. Serve multiple travel categories: Leisure, Adventure, Educational, Sports
3. Have a conversion-optimized UX that makes booking/consultation dead simple
4. Be built for scale — Phase 2 marketplace + AI features are coming
5. Be SEO-first from day one (server-side rendering, schema markup, content strategy)
6. Outclass competitors in design quality, speed, and user experience

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js (App Router, Server Components, SSR/SSG) |
| Styling | Tailwind CSS 4 + shadcn/ui components |
| Backend | Node.js (Next.js API Routes for Phase 1, can extract to Express/FastAPI later) |
| Database | PostgreSQL (primary) + Redis (caching) |
| ORM | Prisma |
| CMS | Sanity (headless CMS — founder-friendly content management) |
| Hosting | Vercel (Phase 1) → AWS (Phase 2 if needed) |
| CDN | Vercel Edge Network / Cloudflare |
| Payment Gateway | Razorpay (primary) + Stripe (international) — Phase 1 only for consultation payments |
| Email | Brevo (transactional + marketing) |
| Analytics | Google Analytics 4 + Google Search Console + Meta Pixel |
| Maps | Google Maps API |
| Calendar | Cal.com or Calendly embed for consultation booking |
| AI (Roadmap) | Claude API / OpenAI API + n8n for workflow automation |
| 3D Graphics | three.js + @react-three/fiber + @react-three/drei |
| Animation | Framer Motion (framer-motion) |
| Package Manager | pnpm |
| Language | TypeScript (strict mode) |

---

## Folder Structure

```
travelsense/
├── CLAUDE.md                          # This file — project context for Claude Code
├── README.md                          # Project README with setup instructions
├── .env.example                       # Environment variable template
├── .env.local                         # Local env vars (gitignored)
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.mjs
├── prettier.config.mjs
├── eslint.config.mjs
│
├── prisma/
│   ├── schema.prisma                  # Database schema
│   ├── seed.ts                        # Seed data (destinations, packages, FAQs)
│   └── migrations/                    # Auto-generated migrations
│
├── sanity/
│   ├── sanity.config.ts               # Sanity studio config
│   ├── sanity.cli.ts
│   ├── schemas/                       # Content schemas (blog, destination, package, testimonial)
│   │   ├── index.ts
│   │   ├── blog.ts
│   │   ├── destination.ts
│   │   ├── package.ts
│   │   ├── testimonial.ts
│   │   ├── faq.ts
│   │   └── gallery.ts
│   └── lib/
│       ├── client.ts                  # Sanity client
│       └── queries.ts                 # GROQ queries
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml                    # Auto-generated
│   ├── fonts/                         # Self-hosted fonts
│   ├── images/
│   │   ├── brand/                     # Logo files, brand assets
│   │   ├── destinations/              # Destination hero images
│   │   ├── categories/                # Category icons/images
│   │   └── misc/                      # Other static images
│   └── og/                            # Open Graph images
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout (fonts, metadata, analytics)
│   │   ├── page.tsx                   # Homepage
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── (marketing)/               # Marketing pages group
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   └── faq/page.tsx
│   │   │
│   │   ├── destinations/              # Destination pages (SEO-critical)
│   │   │   ├── page.tsx               # All destinations listing
│   │   │   └── [slug]/
│   │   │       ├── page.tsx           # Individual destination page
│   │   │       └── packages/page.tsx  # Packages for this destination
│   │   │
│   │   ├── categories/                # Travel categories
│   │   │   ├── page.tsx               # All categories
│   │   │   ├── leisure/page.tsx
│   │   │   ├── adventure/page.tsx
│   │   │   ├── educational/page.tsx
│   │   │   └── sports/page.tsx
│   │   │
│   │   ├── packages/                  # Travel packages
│   │   │   ├── page.tsx               # All packages listing
│   │   │   └── [slug]/page.tsx        # Individual package detail
│   │   │
│   │   ├── itinerary-builder/         # Personalized itinerary builder
│   │   │   └── page.tsx
│   │   │
│   │   ├── consultation/              # Travel consultation booking
│   │   │   ├── page.tsx               # Booking page with calendar
│   │   │   └── confirmation/page.tsx
│   │   │
│   │   ├── hotels/                    # Hotel booking (API-based)
│   │   │   ├── page.tsx               # Search & browse
│   │   │   └── [id]/page.tsx          # Hotel detail
│   │   │
│   │   ├── vehicles/                  # Vehicle booking (request-based)
│   │   │   └── page.tsx
│   │   │
│   │   ├── visa-passport/             # Visa & passport assistance
│   │   │   └── page.tsx
│   │   │
│   │   ├── blog/                      # Blog (Sanity-powered)
│   │   │   ├── page.tsx               # Blog listing
│   │   │   └── [slug]/page.tsx        # Individual post
│   │   │
│   │   ├── api/                       # API routes
│   │   │   ├── contact/route.ts       # Contact form submission
│   │   │   ├── consultation/route.ts  # Consultation booking
│   │   │   ├── itinerary/route.ts     # Itinerary builder logic
│   │   │   ├── vehicle-request/route.ts
│   │   │   ├── visa-inquiry/route.ts
│   │   │   ├── newsletter/route.ts
│   │   │   ├── hotels/route.ts        # Hotel search proxy
│   │   │   └── webhook/
│   │   │       └── razorpay/route.ts  # Payment webhook
│   │   │
│   │   └── admin/                     # Admin panel (protected)
│   │       ├── layout.tsx
│   │       ├── page.tsx               # Dashboard
│   │       ├── inquiries/page.tsx     # View consultation & vehicle requests
│   │       ├── bookings/page.tsx      # View bookings
│   │       └── analytics/page.tsx     # Basic analytics view
│   │
│   ├── components/
│   │   ├── ui/                        # shadcn/ui primitives (button, card, dialog, etc.)
│   │   ├── layout/                    # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Container.tsx
│   │   ├── home/                      # Homepage sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Categories.tsx
│   │   │   ├── FeaturedDestinations.tsx
│   │   │   ├── PopularPackages.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── NewsletterSignup.tsx
│   │   ├── destinations/
│   │   │   ├── DestinationCard.tsx
│   │   │   ├── DestinationHero.tsx
│   │   │   └── DestinationGrid.tsx
│   │   ├── packages/
│   │   │   ├── PackageCard.tsx
│   │   │   ├── PackageFilters.tsx
│   │   │   └── PackageDetail.tsx
│   │   ├── itinerary/
│   │   │   ├── ItineraryForm.tsx
│   │   │   ├── ItineraryResults.tsx
│   │   │   └── ItineraryShareCard.tsx
│   │   ├── booking/
│   │   │   ├── ConsultationForm.tsx
│   │   │   ├── VehicleRequestForm.tsx
│   │   │   └── PaymentButton.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogGrid.tsx
│   │   │   └── BlogContent.tsx
│   │   └── shared/
│   │       ├── SEOHead.tsx
│   │       ├── Breadcrumbs.tsx
│   │       ├── ImageWithBlur.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── StarRating.tsx
│   │       └── WhatsAppButton.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts                   # Utility functions (cn, formatCurrency, etc.)
│   │   ├── constants.ts               # App-wide constants
│   │   ├── db.ts                      # Prisma client singleton
│   │   ├── sanity.ts                  # Sanity client + image builder
│   │   ├── razorpay.ts               # Razorpay SDK init
│   │   ├── brevo.ts                   # Brevo email client
│   │   ├── analytics.ts              # Analytics helpers
│   │   ├── seo.ts                     # SEO metadata generators
│   │   └── validators.ts             # Zod schemas for form validation
│   │
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollDirection.ts
│   │   └── useDebounce.ts
│   │
│   ├── types/
│   │   ├── index.ts                   # Shared types
│   │   ├── destination.ts
│   │   ├── package.ts
│   │   ├── booking.ts
│   │   └── itinerary.ts
│   │
│   └── config/
│       ├── site.ts                    # Site metadata (name, description, URLs)
│       ├── navigation.ts              # Nav menu structure
│       └── categories.ts              # Travel category definitions
│
├── scripts/
│   ├── seed-database.ts               # Database seeding script
│   └── generate-sitemap.ts            # Sitemap generation
│
├── docs/
│   ├── COMPETITOR_RESEARCH.md         # Competitor analysis
│   ├── PHASE1_PLAN.md                 # Phase 1 milestone plan
│   ├── AI_ROADMAP.md                  # AI integration roadmap
│   ├── BRAND_GUIDELINES.md            # Brand identity reference
│   └── API_DOCS.md                    # Internal API documentation
│
└── tests/
    ├── components/                    # Component tests
    └── api/                           # API route tests
```

---

## Phase 1 — Milestone Breakdown (Weeks 1–6)

### M1: Brand Identity & Strategy (Week 1) — ₹20,000

**Deliverables:**
- Logo design (primary, secondary, favicon, monogram)
- Color palette (primary, secondary, accent, neutrals)
- Typography system (headings + body)
- Brand guidelines document
- Tone of voice document
- Competitor analysis report

**Tasks:**
1. Design TravelSense logo (modern, premium, travel-themed)
2. Define color palette that conveys trust, adventure, warmth
3. Select font pairing (Google Fonts preferred for web performance)
4. Create brand guidelines document
5. Complete competitor research and analysis
6. Set up project repository with initial folder structure

### M2: UI/UX Design (Weeks 1–2) — ₹35,000

**Deliverables:**
- Information architecture (sitemap + page hierarchy)
- Wireframes for all pages & modules
- High-fidelity mockups (desktop + mobile)
- Mobile-first responsive design system
- Design sign-off from client

**Tasks:**
1. Map full information architecture
2. Wireframe all core pages (Home, About, Services, Contact, Destinations, Packages, Blog, FAQ)
3. Wireframe all modules (Itinerary Builder, Consultation Booking, Hotel Search, Vehicle Booking, Visa/Passport)
4. Create high-fidelity mockups in Figma/code
5. Build responsive design system with Tailwind

### M3: Website Development (Weeks 2–5) — ₹90,000

**Deliverables:**
- Full frontend build (all pages, responsive)
- Backend APIs + CMS integration
- Itinerary builder module
- Consultation booking module (with calendar + payment)
- Hotel booking integration (third-party API)
- Vehicle booking request system
- Visa/passport assistance page
- All standard pages (Home, About, Services, Gallery, Contact, Blog, FAQ)

**Key Technical Tasks:**
1. Set up Next.js project with TypeScript, Tailwind, shadcn/ui
2. Configure Prisma + PostgreSQL
3. Set up Sanity CMS with schemas
4. Build all page layouts (mobile-first)
5. Implement itinerary builder (destination → budget → dates → interests → recommendations)
6. Integrate consultation booking (calendar API + Razorpay)
7. Integrate hotel search API (RateHawk/Booking.com affiliate)
8. Build vehicle request form with vendor notification system
9. Build admin panel for managing inquiries and bookings
10. Implement responsive navigation, footer, CTAs

### M4: Content & SEO (Weeks 4–5) — ₹30,000

**Deliverables:**
- Copy for all pages (all 4 categories: Leisure, Adventure, Educational, Sports)
- Destination pages with rich content
- Package listings with detailed descriptions
- 5–10 seed blog articles
- Full on-page SEO setup
- Schema markup (Organization, LocalBusiness, TravelAction, BreadcrumbList, FAQ, BlogPosting)
- GA4 + GSC + Meta Pixel configured

### M5: Launch & QA (Week 6) — ₹25,000

**Deliverables:**
- End-to-end testing (all flows, all devices)
- Social media profiles setup (Instagram, Facebook, LinkedIn)
- Email marketing setup (Brevo — welcome sequence, newsletter)
- Launch campaign prep
- Post-launch bug fixes + QA

---

## AI Integration Roadmap (Post Phase 1 Launch, Pre Phase 2)

After Phase 1 website is live and stable, implement these AI features iteratively:

### Priority 1: AI Chatbot Assistant
- 24/7 conversational travel assistant
- Handles: trip queries, booking support, destination FAQs, consultation scheduling
- Tech: Claude API with RAG over TravelSense content
- Widget: floating chat button on all pages

### Priority 2: AI Itinerary Generator
- Auto-generate personalized trip plans
- Inputs: destination, budget, duration, interests, travel style
- Output: day-wise itinerary with hotel/activity suggestions
- Enhances the existing rule-based itinerary builder with AI intelligence

### Priority 3: Smart Budget Calculator
- AI-powered cost estimation for trips
- Factors: flights, hotels, food, activities, season, preferences
- Provides range estimates with confidence levels

### Priority 4: Auto Content Generation
- AI-generated destination descriptions, blog drafts, social media content
- Claude API integration with Sanity CMS
- Human review before publishing (founder approval gate)

### Priority 5: Dynamic Recommendations
- Personalized destination, package, and product recommendations
- Based on user behavior, browsing history, preferences
- Requires user tracking + recommendation engine

### Priority 6: Predictive Pricing
- Dynamic pricing suggestions based on seasonality, demand, booking trends
- Requires historical data collection first (begins accumulating in Phase 1)

**AI Tech Stack:**
- Claude API (primary) / OpenAI API (fallback)
- n8n for workflow automation
- Vector database (Pinecone/Qdrant) for RAG
- Vercel AI SDK for streaming responses in UI

---

## Competitor Landscape

### Tier 1: Major OTAs (Indirect Competition)
| Platform | Strengths | Weakness vs TravelSense |
|----------|-----------|------------------------|
| MakeMyTrip | 60% market share, massive inventory, brand trust | Impersonal, overwhelming, no curation, no founder story |
| Goibibo | Strong mobile UX, budget segment | No premium feel, no personalization |
| Yatra | Corporate + leisure, strong B2B | Dated UI, no unique experience layer |
| Cleartrip | Clean UI, Flipkart-backed | Limited packages, no consultation |
| EaseMyTrip | Price-competitive, zero convenience fee | No premium positioning, no content |
| Ixigo | AI-driven fare alerts, trains focus | Aggregator only, no end-to-end service |

### Tier 2: Curated Travel Platforms (Direct Competition)
| Platform | Model | What TravelSense Can Do Better |
|----------|-------|-------------------------------|
| TravelTriangle | Marketplace connecting travelers with 650+ local agents | More personal, founder-led, AI-powered itineraries instead of manual agent quotes |
| Thrillophilia | 12,000+ experiences, adventure-focused, AI itinerary tools | Broader categories (not just adventure), more personalized consultation |
| Pickyourtrail | DIY customizable vacation packages, international focus | Domestic + international, consultation-first approach, AI budget calculator |
| Holidify | Content-led destination discovery + itineraries | Better booking integration, not just content — actual end-to-end service |
| TripFactory | Package holidays with customization | More transparent, tech-forward, AI-enhanced |

### Tier 3: Women-Led / Niche Travel (Inspiration)
| Platform | Niche |
|----------|-------|
| Wandering Jane | Solo women travelers, curated itineraries with local female experts |
| F5 Escapes | All-women fixed departure tours + customized itineraries |
| WOW Club (Women On Wanderlust) | Women-only group travel since 2005, 125+ trips/year |
| Wovoyage | Women-friendly accommodation, group departures |
| Ecoplore | Eco-friendly stays aggregator (UN-recognized) |

### TravelSense Competitive Edge
1. **Founder-led trust**: Jayshree's personal brand + story (not faceless corporate)
2. **AI-first approach**: Claude-powered itinerary generation, chatbot, budget calculator (no competitor in India has this at a small travel brand level)
3. **Multi-category coverage**: Leisure + Adventure + Educational + Sports in one platform
4. **Consultation-first model**: Book a call before booking a trip — builds trust for the Indian market
5. **Content + Commerce**: Rich destination content driving SEO → conversion (not just listings)
6. **Phase 2 marketplace**: Destination-based product marketplace is unique positioning

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page Load Speed | < 3 seconds (LCP) |
| Performance Score | Lighthouse 90+ |
| Mobile Responsive | Full responsive across all breakpoints |
| SEO | SSR/SSG, schema markup, meta tags, sitemap, robots.txt |
| Security | SSL/TLS, data encryption (AES-256), RBAC, input sanitization |
| Uptime | 99.5% |
| Backups | Automated daily database backups, 30-day retention |
| Accessibility | WCAG 2.1 AA compliance |
| Browser Support | Chrome, Firefox, Safari, Edge (last 2 versions) |

---

## Coding Standards & Conventions

### Naming
- **Files/folders:** `kebab-case` (e.g., `itinerary-builder`, `vehicle-request`)
- **Components:** `PascalCase` (e.g., `DestinationCard.tsx`, `HeroSection.tsx`)
- **Functions/variables:** `camelCase`
- **Constants:** `UPPER_SNAKE_CASE`
- **Types/interfaces:** `PascalCase` with prefix for interfaces (`IDestination` or just `Destination`)
- **API routes:** `kebab-case` matching URL paths
- **Database tables:** `snake_case` (Prisma handles mapping)
- **CSS classes:** Tailwind utility classes (no custom CSS unless absolutely necessary)

### Code Quality
- TypeScript strict mode — no `any` types
- All components must be typed with Props interfaces
- Use Server Components by default, Client Components only when needed (interactivity, hooks)
- Extract reusable logic into custom hooks
- Validate all user inputs with Zod schemas
- Error boundaries on all route segments
- Loading states for all async operations

### Git Conventions
- Branch naming: `feature/`, `fix/`, `content/`, `chore/`
- Commit messages: conventional commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`)
- PR required for main branch (once team grows)

### Component Patterns
```tsx
// Standard component template
import { type FC } from 'react'

interface DestinationCardProps {
  title: string
  slug: string
  image: string
  description: string
  startingPrice?: number
}

export const DestinationCard: FC<DestinationCardProps> = ({
  title,
  slug,
  image,
  description,
  startingPrice,
}) => {
  return (
    // Component JSX
  )
}
```

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# Email (Brevo)
BREVO_API_KEY=

# Google
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Meta
NEXT_PUBLIC_META_PIXEL_ID=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=TravelSense

# AI (Roadmap)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
```

---

## Key Decisions & Constraints

1. **Local development first** — no domain yet, deploy when client provides domain
2. **Phase 1 only** — no marketplace features, no vendor system, no multi-user roles beyond admin
3. **Hotel booking = API-based** — no proprietary inventory (use RateHawk/Booking.com affiliate API)
4. **Vehicle booking = manual** — request form → vendor gets notified → manual confirmation
5. **Content in English only**
6. **Sol8um handles all content creation** — client only reviews/approves
7. **48-hour review windows** — auto-approval after 72 hours (per contract)
8. **Sanity CMS** — must be founder-friendly (she's non-technical)
9. **AI integration comes after Phase 1 launch** — but architecture should be AI-ready from day one

---

## Getting Started

```bash
# Clone and install
git clone <repo-url>
cd travelsense
pnpm install

# Set up environment
cp .env.example .env.local
# Fill in all required values

# Set up database
pnpm prisma generate
pnpm prisma migrate dev

# Seed initial data
pnpm run seed

# Start development
pnpm dev
```

---

## Current Status — Phase 1 ~95% Complete (as of April 19, 2026)

- [x] **M1: Brand Identity** — COMPLETE
  - [x] Logo design (logo-blue-bg.png, logo-final-nobg.png, SVG variants)
  - [x] Color palette (Midnight Voyager: #0A1425, #C4324A, #D4A853, #8A9BB5)
  - [x] Typography (Michroma headings weight 400, Exo 2 body 300-700)
  - [x] Brand guidelines
  - [x] Competitor research
  - [x] Project scaffolding
- [x] **M2: UI/UX Design** — COMPLETE
  - [x] Homepage — 12 sections with 3D globe, animations
  - [x] All destination pages (listing + 20 detail pages)
  - [x] All package pages (listing + 13 detail pages with gamified visual itinerary)
  - [x] All blog pages (listing + 8 detail pages)
  - [x] All category pages (4 categories)
  - [x] All marketing pages (About, Contact, Services, Gallery, FAQ, Privacy, Terms)
  - [x] All booking/form pages (Consultation, Vehicles, Visa, Itinerary Builder, Hotels)
  - [x] Admin panel (Dashboard, Inquiries, Bookings, Analytics)
- [x] **M3: Website Development** — COMPLETE
  - [x] Homepage with animations + 3D globe (NASA texture, pins, arcs)
  - [x] All 29 pages built and responsive
  - [x] 8 API routes with Zod validation → Supabase
  - [x] 6 Supabase tables with RLS policies
  - [x] Lead capture modal on all CTAs
  - [x] Admin middleware with cookie-based auth
  - [x] Custom error.tsx, loading.tsx, not-found.tsx
  - [x] Framer Motion animations sitewide
  - [x] Deployed to Vercel — https://travelsense.co.in
  - [x] GitHub repo — https://github.com/sol8um-client/TravelSense
- [x] **M4: Content & SEO** — COMPLETE
  - [x] All destination pages with rich content (descriptions, highlights, tips, experiences)
  - [x] 13 packages with day-by-day itineraries (incl. Char Dham Helicopter 6D)
  - [x] 8 full blog articles (400-600 words each with HTML content)
  - [x] 40 custom AI-generated images (Nano Banana 2) for location accuracy
  - [x] Image optimization pipeline (PNG → WebP, 140MB → 7MB)
  - [x] Auto-generated sitemap.xml, robots.txt
  - [x] JSON-LD schemas (Organization, Service, Breadcrumbs)
  - [x] Open Graph tags, meta tags sitewide
  - [x] GA4 + Meta Pixel components ready (awaiting client IDs)
  - [x] **Sanity CMS dependency REMOVED** — content moved to `src/data/` static files
- [x] **M5: Launch & QA** — MOSTLY COMPLETE
  - [x] Social media strategy document (4-platform, content calendar, Meta Ads plan)
  - [x] End-to-end build verification (all pages return 200, forms tested to Supabase)
  - [x] Client delivery status PDF (`docs/TravelSense_Phase1_Status.pdf`)
  - [ ] Social media profile creation (needs client-provided handles)
  - [ ] Email marketing setup via Brevo (needs client API key)
- [ ] **Awaiting Client Inputs** — ONLY remaining Phase 1 blockers
  - [ ] Business phone/WhatsApp number (placeholder in 7 files)
  - [ ] GA4 Measurement ID (G-XXXXXXXXXX)
  - [ ] Meta Pixel ID
  - [ ] Razorpay Key ID + Secret
  - [ ] Brevo API key
  - [ ] Jayshree's founder photo (fallback globe icon in place)
  - [ ] Social media profile URLs
  - [ ] Brand OG image (1200×630)
- [ ] **AI Roadmap** — PLANNED (Post Phase 1 Launch)

---

## Session Log — March 24, 2026

### Homepage Landing Page — Complete Visual Overhaul

**What was built:**
- 12-section landing page in `src/components/home/LandingPage.tsx` (~1600 lines)
- 3D WebGL globe component in `src/components/home/Globe3D.tsx` using react-three-fiber
- Premium metallic text effects (refined 2-layer shadow system)
- Scroll-triggered reveal animations (fade, slide, scale, stagger)
- Framer Motion animations throughout (parallax, word cycling, counters, spring physics)

**Sections:** Hero (3D globe + metallic titles + word cycling + trust stats) → Trust Marquee → Problem (orbiting chaos + error toasts) → How It Works (4 steps + SVG path + mini timeline) → Categories (3 cards with Ken Burns) → Destinations (4 photo cards with tilt) → USP/Real Humans (chat mockup + read receipts) → What Sets Us Apart (3D flip cards) → Coming Soon (holographic borders) → Testimonials (card shuffle + star fill) → CTA (world map dots) → Newsletter

**Dependencies added:** three, @react-three/fiber, @react-three/drei, @types/three

**Key design decisions:**
- Font weights: headings use font-normal (not bold) for elegance
- Metallic text: 2-layer shadow (not 4-layer) for cleaner look
- Globe: NASA-textured frosted glass sphere with flight arcs and destination dots
- Mobile: 3D globe hidden (lg+ only), flip cards tap-to-toggle, reduced animations
- Hero subtitle: "Your next adventure is just one conversation away"

**Known issues to address:**
- Images need real photos (currently using placeholder paths)

---

## Session Log — March 25, 2026

### 3D Globe — Complete Redesign (Multiple Iterations)

**What was done:**
- Complete rewrite of `Globe3D.tsx` — went through 8+ iterations to match a reference design
- Researched top travel company UIs (Airbnb, Booking, Skyscanner, Stripe globe, GitHub globe)
- Determined that NO major travel platform uses a 3D globe — this is TravelSense's differentiator

**Final Globe Architecture (4 clean layers only):**
1. **Textured Globe Sphere** — NASA Blue Marble earth texture (`public/textures/earth-light.jpg`) with custom frosted-glass GLSL shader. Continents appear as darker silver areas on a light silver-blue ocean. Custom rim shader for visible edge boundary.
2. **Atmosphere Glow** — Single unified BackSide shader sphere (radius 1.3), smooth gradient from blue haze → white, blends into the white page background.
3. **Destination Dots** — 20 small spheres with pulsing ring animations at key cities. Cherry (#C4324A) for featured/Asian destinations, Blue (#1B2D4E) for international.
4. **Flight Route Arcs** — 9 animated QuadraticBezierCurve3 arcs with draw-on animation and traveling glow dots. Cherry pink color matching the brand.

**What was REMOVED (compared to v1):**
- ~~Hand-coded continent line outlines~~ → replaced with NASA texture
- ~~Complex 3D icons (palm trees, mountains, temples, skylines, compass)~~ → replaced with simple dots
- ~~Grid lines (equator, latitude, meridians)~~
- ~~Clouds, particles, sparkles~~
- ~~Headset/plane icons on arcs~~ → replaced with simple glow dots
- ~~Orbital flight path rings~~
- ~~Random fill circles for continents~~

**Files changed:**
- `src/components/home/Globe3D.tsx` — complete rewrite (~300 lines, was 870+)
- `src/components/home/LandingPage.tsx` — moved dot grid/constellation to right side only (away from globe area), adjusted globe container positioning
- `public/textures/earth-light.jpg` — NEW: NASA Blue Marble texture (1.4MB, public domain)

**Research findings (saved for future reference):**
- Stripe globe: ~60K hexagonal dots, sunflower spiral, PNG-derived continents, colored arcs
- GitHub globe: 5 layers, ~12K InstancedMesh dots, blue spikes + pink arcs
- COBE library: ~5KB lightweight dot-globe (potential future alternative)
- Airbnb Lava icons: 3D clay-like animated category icons (new format)
- Booking.com palette: deep navy + gold/yellow (matches our brand)
- No Indian travel platform uses 3D globe — genuine differentiator for TravelSense

**Design decisions:**
- Used NASA texture instead of dot-sphere (matches reference design better)
- Cherry/pink arcs (brand secondary color, adds warmth and energy)
- Blue + gold dot markers (brand palette, no random colors)
- Frosted glass aesthetic (premium, modern, clean)
- Globe visible on ALL viewports including mobile — lower DPR + reduced effects for performance

---

## Session Log — March 28, 2026

### Lead Capture + Supabase + Deployment

**Lead capture system:**
- Created `src/components/shared/LeadCaptureModal.tsx` — modal form with name, email, phone, destination, travel dates, message
- Wired to ALL CTA buttons: "Start Planning", "Explore Destinations", "Book Consultation", newsletter, CTA section
- Form submits to Supabase `leads` table via `@supabase/supabase-js`
- Created `src/lib/supabase.ts` — Supabase client singleton
- Mobile fix: form now scrollable with visible close button (sticky top-right X)

**Supabase setup:**
- Project URL: `https://rkalfwndmrhkqctzmgpe.supabase.co`
- Table: `leads` (id, name, email, phone, destination, travel_dates, message, source, created_at)
- RLS policy: anon insert only

**Deployment:**
- GitHub: `sol8um-client/TravelSense` (main branch)
- Vercel: `sol8um-7719s-projects/travelsense`
- Domain: `travelsense.co.in` (connected via Vercel)
- Git identity: Sol8um / sol8um@gmail.com
- Fixed TypeScript build error in `brand-identity/page.tsx` (ringColor → outline style)

### Globe — Continued Refinements

**Issues fixed:**
- Vertical white line in hero — globe canvas container right edge was visible; fixed by extending container to `lg:right-[-20%]` with `overflow-hidden`
- Globe shifted left 10% per user request
- Location pins replacing plain dots — 3D cone+sphere pin markers oriented outward via quaternion
- Flight arcs faded — fixed draw-on animation cycle so arcs stay visible 80% of the time (was disappearing too quickly)
- Mobile globe: now visible on all viewports with performance optimizations (DPR 1, no post-processing, no Float, no Stars, low-power GPU preference)

### Mobile / Responsive Fixes

**Hero section:**
- All 4 trust stats now visible in 2x2 grid on mobile (was overflowing)
- "Explore Destinations" button reduced size on desktop
- Globe visible on mobile with lower quality settings

**Typography:**
- "See it · Feel it · Live it" — increased visibility: text-secondary/40 → /60, size 9px → 10-11px
- Subtitle em dash removed: "— we handle" → ". We handle"

**Wave section breaks:**
- Fixed broken wave SVG effects between sections on mobile

**Lead form mobile:**
- Modal scrollable with `overflow-y-auto max-h-[90vh]`
- Close button sticky at top-right, always visible
- Form fields stack properly on small screens

### Files Changed This Session
- `src/components/shared/LeadCaptureModal.tsx` — NEW
- `src/lib/supabase.ts` — NEW
- `src/components/home/LandingPage.tsx` — lead form integration, CTA wiring, mobile fixes, tagline visibility
- `src/components/home/Globe3D.tsx` — mobile support, pin markers, arc visibility, positioning
- `src/app/brand-identity/page.tsx` — TypeScript fix (ringColor)
- `docs/PROGRESS.md` — NEW tracking file
- `docs/PHASE1_PLAN.md` — checked off completed tasks
- `.env.local` — Supabase credentials (gitignored)

---

## Session Log — March 29, 2026

### "How It Works" Section — Scroll Animation & Emotional Color Journey

**What was done:**
- Upgraded "How It Works" section from `useInView` (fires once) to `useScroll` + `useTransform` for scroll-linked progressive animation
- SVG dashed path draws progressively as user scrolls, connecting all 4 steps
- Path uses gradient stroke transitioning red → green across the emotional journey
- Floating decorative elements around steps (chat bubbles, VISA cards, keys, sparkles)
- Step circles reveal progressively with scroll progress thresholds
- Implemented for both desktop (horizontal) and mobile (vertical S-curve) layouts

**Emotional color palette across steps:**
- Step 1 (Consult): Cherry Red `#C4324A` — confused, needs help
- Step 2 (Plan): Terracotta `#A8574E` — warming up, getting excited
- Step 3 (Book): Sage Jade `#4A9E7E` — confident, everything's handled
- Step 4 (Travel): Deep Emerald `#2D8B6A` — joyful, exploring

**Design details:**
- SVG gradient path with node dots at each step connection point
- Traveling glow dot animation along the path
- Path weaves under all step icon circles (z-index layering with opaque backgrounds)
- Concentric radar rings on Step 1 (Consult)
- Step decorations colored to match their respective step (not all red)
- Mobile: vertical S-curve path with same gradient, node dots, and glow dot
- Icons: Headphones → FileText → Plane → Globe
- Timeline: Day 1 (red) → Day 2 (terracotta) → Day 3 (green)

### Hero CTA Buttons — Consistent Sizing

**What was done:**
- Made "Start Planning" and "Explore Destinations" buttons identical in size
- Removed `font-heading` (Michroma) from outline button — both now use body font
- Made ChevronRight icon absolute-positioned to not affect button width
- Set explicit `h-[38px] sm:h-[50px]` on both buttons for exact height matching
- Set `sm:min-w-[230px]` on both for equal width on desktop
- Both buttons now exactly 230px × 50px on desktop
- Verified consistent on mobile

**Files changed:**
- `src/components/home/LandingPage.tsx` — How It Works overhaul, CTA button sizing
- `src/app/globals.css` — no net changes (border reverted)

### Social Media Strategy — Complete Research & Plan

**What was created:**
- `docs/SOCIAL_MEDIA_STRATEGY.md` — comprehensive 12-section strategy document

**Strategy covers:**
1. Handle names: `@travelsense.in` (IG) / `@travelsensein` (FB, X, LinkedIn)
2. Bios for all 4 platforms + founder LinkedIn bio
3. Brand positioning & voice guide
4. Platform-specific strategies (Instagram primary, Facebook community, LinkedIn founder-led, X brand voice)
5. 6 content pillars with % allocation
6. Hashtag strategy (branded: #TravelWithSense, #TravelSenseStories, #CuratedByTravelSense)
7. Complete Week 1 launch plan (day-by-day for all platforms)
8. Full 1-month content calendar (April 2026, 4 weeks + wrap)
9. Engagement growth playbook (zero ad spend tactics)
10. Meta Ads lead generation strategy (3-stage funnel, Rs 500-1K/day starting budget)
11. KPIs and success metrics (Month 1, 3, 6 targets)
12. Tools & setup checklist

**Key research findings:**
- TravelSense India (TSI) already exists in Delhi — avoid @travelsenseindia handle
- 60% of Indians find travel ideas on social media; 80% find booking stressful
- India is Tier 3 on Meta Ads — CPL Rs 200-500, very cost-effective
- Carousels get highest engagement on IG (1.92%), Reels get highest reach
- LinkedIn founder personal profile gets 5-10x company page reach
- WhatsApp click-to-chat is the highest-converting CTA in India

**Deployment:**
- Committed and deployed all changes to travelsense.co.in via Vercel

---

## Session Log — April 11-19, 2026

### Phase 1 Completion Sprint — All Pages + Content + Imagery

**What was built (condensed, across 7 sessions):**

**Pages & Components (all 29 pages):**
- Destination pages: 20 static detail pages from `src/data/destinations.ts` (no Sanity)
- Package pages: 13 detail pages with **gamified visual itinerary** — zigzag timeline, day images, meal/accommodation icons, elevation badges, progress tracker, scroll-triggered animations
- Blog pages: 8 full articles (400-600 words each) with HTML content, author cards, related posts
- Category pages: Leisure / Adventure / Educational / Sports with tailored packages
- Marketing pages: About (Jayshree founder story + 5-milestone timeline), Contact (Google Maps Pune), Services, FAQ, Gallery (20 photos in 6 categories), Privacy, Terms
- Booking forms: Consultation, Vehicle Request, Visa Inquiry, Newsletter, Contact, Itinerary Builder, Hotels Interest
- Admin panel: Dashboard, Inquiries, Bookings, Analytics (cookie-based password auth)
- Custom error.tsx, loading.tsx, not-found.tsx

**Backend:**
- 8 API routes with Zod validation → Supabase
- 6 Supabase tables: leads, contact_inquiries, consultation_bookings, vehicle_requests, visa_inquiries, newsletter_subscribers
- RLS policies for anon insert/select

**Content Architecture Shift — Sanity removed:**
- Built full Sanity schemas + seeded 20 destinations, 13 packages, 8 blogs (ran for ~4 days)
- Then **removed Sanity dependency entirely** — content moved to static TS files in `src/data/`
- Reason: added complexity without value for non-technical founder who rarely edits content
- Sanity code still in repo under `sanity/` but unused — can re-wire if ever needed

**Imagery Overhaul:**
- First pass: Unsplash URLs across all pages (some mismatched)
- Second pass: 40 custom AI-generated images via Nano Banana 2 (Flow Labs) for location accuracy
- Shot-list approach: 20 destination heroes + 8 blog covers + 12 package day images
- Pipeline: `scripts/optimize-images.py` converts PNG → WebP at right dimensions, compresses 140MB → 7MB (95% reduction)
- Stored in `/public/images/generated/<slug>.webp`
- Remaining gallery/secondary images still Unsplash

**SEO & Performance:**
- Auto-generated sitemap.xml + robots.txt
- JSON-LD schemas (Organization, Service, Breadcrumbs) sitewide
- GA4 + Meta Pixel components ready (awaiting client IDs)

**Client Deliverable:**
- `docs/TravelSense_Phase1_Status.pdf` — 1-page delivery summary (via `scripts/generate-phase1-pdf.py` using ReportLab)
- Lists all delivered items in a clean brand-styled table

**Files changed this sprint (major):**
- `src/data/destinations.ts` — NEW (20 destinations, 1460 lines)
- `src/data/packages.ts` — NEW (13 packages, 1893 lines)
- `src/data/blog.ts` — NEW (8 articles, 623 lines)
- `src/components/packages/PackageDetail.tsx` — REDESIGNED (gamified zigzag itinerary, 608 lines)
- `public/images/generated/*.webp` — 40 new custom images
- `src/middleware.ts` — NEW (admin password auth)
- `src/app/robots.ts`, `src/app/sitemap.ts` — NEW
- `src/components/analytics/GoogleAnalytics.tsx`, `MetaPixel.tsx` — NEW
- All ~29 page files updated
- All form components + 8 API routes + ContactInfo + Footer phone/social fields

**Known remaining items (awaiting client):**
1. Business phone/WhatsApp number
2. GA4 + Meta Pixel IDs
3. Razorpay keys
4. Brevo API key
5. Jayshree founder photo
6. Social media profile URLs
7. OG share image (1200×630)

**Next session priorities:**
- Plug in client credentials as they arrive
- Phase 2 planning (marketplace, AI features)
