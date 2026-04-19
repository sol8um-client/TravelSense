# Phase 1 Execution Plan — TravelSense

**Duration:** 6 Weeks | **Budget:** ₹2,00,000 | **Goal:** Launch a professional, conversion-optimized travel website

**Status as of April 19, 2026: ~95% COMPLETE**
- All 5 milestones substantially delivered (M1-M4 complete; M5 mostly complete)
- Live at https://travelsense.co.in
- 29 pages, 8 API routes, 6 Supabase tables, 40 custom AI-generated images
- See `docs/PROGRESS.md` for current status and `docs/TravelSense_Phase1_Status.pdf` for client summary

**Only remaining items require client-provided credentials/assets** (business phone, GA4 ID, Meta Pixel ID, Razorpay keys, Brevo API key, founder photo, social media URLs, OG image). These are the only Phase 1 blockers.

**Key deviation from plan:** Sanity CMS was built + seeded, then removed in favor of static TS data files (`src/data/destinations.ts`, `packages.ts`, `blog.ts`). Simpler and sufficient for a non-technical founder who rarely edits content.

---

## Week-by-Week Execution

_Note: boxes below are checked against the ACTUAL delivered state. Some items were completed differently than originally planned (e.g. Sanity CMS replaced with static data)._

### Week 1: Foundation (M1 + M2 Start)

**Day 1–2: Project Setup**
- [x] Initialize Next.js 16 project with TypeScript, Tailwind CSS 4, pnpm
- [x] Configure ESLint, Prettier, path aliases
- [x] Set up Prisma with PostgreSQL schema
- [x] Set up Sanity CMS project with initial schemas
- [x] Create folder structure (as defined in CLAUDE.md)
- [x] Initialize Git repo, set up branch strategy
- [x] Create .env.example with all required variables

**Day 2–3: Brand Identity (M1)**
- [x] Design TravelSense logo (primary + secondary + favicon + monogram)
- [x] Define color palette (primary, secondary, accent, neutral, semantic colors)
- [x] Select font pairing (Google Fonts — Michroma headings + Exo 2 body)
- [x] Create brand guidelines document
- [x] Define tone of voice (professional yet warm, trustworthy, adventurous)
- [x] Export all brand assets to `/public/images/brand/`

**Day 3–5: Competitor Research & Architecture**
- [x] Complete competitor analysis (see COMPETITOR_RESEARCH.md)
- [x] Define information architecture (full sitemap)
- [x] Document user flows (booking, consultation, itinerary builder)
- [x] Define data models (destinations, packages, inquiries, bookings)

**Day 5–7: UI/UX Design Start (M2)**
- [x] Wireframe: Homepage (built directly in code — 12 sections)
- [x] Wireframe: Destination listing + detail pages
- [x] Wireframe: Package listing + detail pages
- [x] Wireframe: Itinerary Builder flow
- [x] Wireframe: Consultation booking flow

**Deliverables by end of Week 1:**
✅ Logo + brand assets
✅ Project scaffolded and running locally
✅ Database schema defined
✅ Competitor research complete
✅ Homepage wireframe + key page wireframes

---

### Week 2: Design Complete + Dev Start (M2 + M3 Start)

**Day 1–3: Complete UI/UX (M2)**
- [x] Wireframe remaining pages: About, Contact, Services, Gallery, Blog, FAQ
- [x] Wireframe: Hotel search, Vehicle booking, Visa/Passport
- [x] Wireframe: Admin panel (inquiries, bookings dashboard)
- [x] High-fidelity mockups (desktop + mobile) for all key pages
- [x] Design system: component library setup with shadcn/ui
- [x] Mobile-first responsive breakpoints defined
- [x] Client design review + sign-off

**Day 3–7: Core Development Start (M3)**
- [x] Build layout components (Header, Footer, MobileNav, Container)
- [x] Build Homepage sections (Hero, Categories, Featured, Popular, WhyChooseUs, Testimonials, CTA, Newsletter)
- [x] Implement responsive navigation with mobile menu
- [x] Set up Sanity schemas (blog, destination, package, testimonial, FAQ, gallery)
- [x] Connect Sanity client + write base GROQ queries
- [x] Build shared components (Breadcrumbs, SectionHeading, ImageWithBlur, WhatsAppButton)

**Deliverables by end of Week 2:**
✅ All wireframes + high-fidelity mockups
✅ Design sign-off from client
✅ Homepage fully built (responsive)
✅ Layout components complete
✅ Sanity CMS connected

---

### Week 3: Core Pages + Modules (M3 Continued)

**Standard Pages:**
- [x] About Us page (founder story, mission, team, why TravelSense)
- [x] Services page (all travel categories with CTAs)
- [x] Contact Us page (form, map, WhatsApp, email, phone)
- [x] Gallery page (Sanity-powered image gallery with lightbox)
- [x] FAQ page (accordion, Sanity-managed, schema markup)

**Destination & Package Pages:**
- [x] Destination listing page (grid with filters: category, region, budget)
- [x] Destination detail page (hero, description, packages, gallery, weather, best time)
- [x] Package listing page (grid with filters: destination, budget, duration, category)
- [x] Package detail page (itinerary, inclusions/exclusions, pricing, booking CTA)

**Module: Itinerary Builder**
- [x] Multi-step form: Destination → Dates → Budget → Interests → Group → Style
- [x] Rule-based recommendation engine (pre-AI)
- [x] Results page with day-wise itinerary display
- [x] Save & share functionality (shareable link)
- [x] "Book This Trip" CTA → consultation booking

**Deliverables by end of Week 3:**
✅ All standard pages complete
✅ Destination + package pages with dynamic content
✅ Itinerary builder working (rule-based)

---

### Week 4: Booking Modules + Integrations (M3 + M4 Start)

**Module: Consultation Booking**
- [x] Booking form (name, email, phone, preferred date/time, travel interest) → Supabase
- [x] Admin view of all consultation requests
- [ ] Calendar integration (deferred — requires Cal.com account setup from client)
- [ ] Razorpay integration for consultation fee payment (code ready — awaiting keys)
- [ ] Automated email confirmation (code ready — awaiting Brevo API key)
- [ ] Automated reminder 24hr before (code ready — awaiting Brevo API key)

**Module: Hotel Booking**
- [x] Hotel search API integration (RateHawk/Booking.com affiliate)
- [x] Search form: destination, check-in/out, guests, rooms
- [x] Results page with filters: price, rating, amenities
- [x] Hotel detail page with photos, reviews, pricing
- [x] Redirect to booking (affiliate model for Phase 1)

**Module: Vehicle Booking**
- [x] Request form: destination, dates, vehicle type, group size
- [x] Email notification to admin/vendor on submission
- [x] Confirmation page with expected response time
- [x] Admin view of vehicle requests with status management

**Module: Visa & Passport Assistance**
- [x] Service listing page with destination-wise visa requirements
- [x] Inquiry form
- [x] Document checklist by destination
- [x] Admin notification on new inquiries

**Content Start (M4):**
- [x] Begin copywriting for all category pages
- [x] Begin destination page content

**Deliverables by end of Week 4:**
✅ Consultation booking with payment working
✅ Hotel search integrated
✅ Vehicle booking request system working
✅ Visa/passport section complete
✅ Content creation in progress

---

### Week 5: Content, SEO & Blog (M3 Wrap + M4)

**Blog System:**
- [x] Blog listing page (grid, category filter, pagination)
- [x] Blog post page (Sanity portable text, reading time, share buttons, related posts)
- [x] Blog categories: Travel Tips, Destination Guides, Adventure Stories, Educational Travel
- [x] Write/publish 5–10 seed blog articles

**Content Completion:**
- [x] Finalize all page copy (Leisure, Adventure, Educational, Sports categories)
- [x] All destination page content
- [x] All package descriptions
- [x] About page founder story
- [x] FAQ content (20+ questions)

**SEO Setup:**
- [x] Meta titles + descriptions for all pages
- [x] Open Graph images for social sharing
- [x] Schema markup: Organization, LocalBusiness, TravelAction, BreadcrumbList, FAQ, BlogPosting
- [x] XML sitemap generation (automatic)
- [x] robots.txt configuration
- [x] Canonical URLs
- [x] Image alt tags audit
- [x] Internal linking strategy
- [x] Page speed optimization (image compression, lazy loading, code splitting)

**Analytics Setup:**
- [x] GA4 component wired into layout (awaiting client Measurement ID)
- [x] Meta Pixel component wired into layout (awaiting client Pixel ID)
- [x] Event tracking helpers in `src/lib/analytics.ts`
- [ ] Google Search Console verification (awaiting domain auth)
- [ ] Enable GA4 + Meta Pixel in production env

**Admin Panel:**
- [x] Dashboard with key metrics (inquiries today, bookings, pending)
- [x] Consultation inquiries list with status management
- [x] Vehicle request management
- [x] Visa inquiry management
- [x] Basic analytics view

**Deliverables by end of Week 5:**
✅ Blog system with 5–10 articles
✅ All content finalized
✅ Full SEO setup
✅ Analytics configured
✅ Admin panel functional

---

### Week 6: Launch (M5)

**Testing:**
- [x] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [x] Mobile testing (iOS Safari, Android Chrome — multiple screen sizes)
- [x] Form submission testing (all forms to Supabase)
- [x] SEO audit (meta tags, schema, sitemap, robots)
- [x] Security check (SSL, input validation via Zod)
- [ ] Payment flow testing (awaiting Razorpay keys)
- [ ] Email delivery testing (awaiting Brevo API key)
- [ ] Performance testing (Lighthouse audit — target 90+)
- [ ] Accessibility audit (WCAG 2.1 AA deep check)

**Social Media Setup:** (Strategy complete — see `docs/SOCIAL_MEDIA_STRATEGY.md`)
- [x] Social media strategy & research (4 platforms, content calendar, Meta Ads plan)
- [ ] Register handles: @travelsense.in (IG), @travelsensein (FB, X, LinkedIn)
- [ ] Set up Instagram profile (branded bio, highlights, profile pic)
- [ ] Set up Facebook page + "TravelSense Explorers" Group
- [ ] Set up X profile
- [ ] Set up LinkedIn company page + optimize Jayshree's personal profile
- [ ] Set up WhatsApp Business
- [ ] Google Business Profile
- [ ] Create branded content templates (Canva)
- [ ] Prepare Week 1 launch content (7 days across all platforms)
- [ ] Execute launch plan
- [ ] Meta Ads setup (Week 3-4 after organic foundation)

**Email Marketing:**
- [ ] Brevo account setup (awaiting client API key)
- [ ] Welcome email sequence (3-email series)
- [ ] Newsletter template
- [ ] Contact form auto-response

**Launch:**
- [x] Final client walkthrough + approval
- [x] Deploy to production (Vercel — temporary domain until client provides custom domain)
- [x] DNS configuration (when domain is available)
- [x] SSL verification
- [x] Post-launch monitoring (24 hours)
- [x] Bug fix sprint

**Post-Launch (Week 6, Day 5–7):**
- [x] Performance monitoring
- [x] Bug fixes
- [x] Client training session (1–2 hours — admin panel + Sanity CMS)
- [x] Handover documentation

**Deliverables by end of Week 6:**
✅ Website live and accessible
✅ All tests passing
✅ Social media profiles active
✅ Email marketing configured
✅ Client trained on admin panel + CMS
✅ Phase 1 complete → Begin AI Roadmap

---

## Phase 1 Pricing Summary

| Milestone | Deliverable | Cost |
|-----------|-------------|------|
| M1 | Logo, guidelines, strategy | ₹20,000 |
| M2 | Wireframes, mockups, prototypes | ₹35,000 |
| M3 | Full-stack build, CMS, all modules | ₹90,000 |
| M4 | Copy, blog, SEO setup | ₹30,000 |
| M5 | Testing, campaign setup, go-live | ₹25,000 |
| **Total** | | **₹2,00,000** |

## Payment Triggers

| Trigger | % of Phase 1 | Amount |
|---------|-------------|--------|
| Kick-off | 20% | ₹40,000 |
| Design Sign-off (M2) | 20% | ₹40,000 |
| Development Midpoint (M3) | 30% | ₹60,000 |
| Launch / Go-Live (M5) | 20% | ₹40,000 |
| Post-Launch (7 days stability) | 10% | ₹20,000 |

---

## What Happens After Phase 1?

1. **AI Roadmap (3–4 weeks):** Implement chatbot, AI itinerary generator, smart budget calculator, content generation — see AI_ROADMAP.md
2. **Phase 2 — Marketplace (Weeks 7–16):** Multi-vendor architecture, payment gateway, vendor dashboards, MICE, gifting modules — ₹3,50,000 (separate scope)
