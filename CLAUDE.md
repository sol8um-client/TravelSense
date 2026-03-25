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

## Current Status

- [x] **M1: Brand Identity** — COMPLETE
  - [x] Logo design (logo-blue-bg.png, logo-final-nobg.png, SVG variants)
  - [x] Color palette (Midnight Voyager: #0B1426, #C4324A, #D4A853, #8A929E)
  - [x] Typography (Michroma headings, Exo 2 body)
  - [x] Brand guidelines
  - [x] Competitor research
  - [x] Project scaffolding
- [x] **M2: UI/UX Design** — IN PROGRESS (Homepage complete)
  - [x] Homepage design — full landing page with 12 sections
  - [ ] Remaining pages (About, Contact, Destinations, Packages, etc.)
- [ ] **M3: Website Development** — IN PROGRESS (Homepage)
  - [x] Homepage landing page — fully functional with animations
  - [x] 3D WebGL globe — NASA-textured frosted globe with flight arcs (react-three-fiber)
  - [x] Mobile responsive (flip cards, touch support)
  - [x] Header + Footer with logo
  - [ ] Remaining pages and modules
- [ ] **M4: Content & SEO** — NOT STARTED
- [ ] **M5: Launch & QA** — NOT STARTED
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
- Globe hidden on mobile (lg+ breakpoint, too GPU-heavy for mobile)
