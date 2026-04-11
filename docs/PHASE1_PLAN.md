# Phase 1 Execution Plan — TravelSense

**Duration:** 6 Weeks | **Budget:** ₹2,00,000 | **Goal:** Launch a professional, conversion-optimized travel website

---

## Week-by-Week Execution

### Week 1: Foundation (M1 + M2 Start)

**Day 1–2: Project Setup**
- [x] Initialize Next.js 16 project with TypeScript, Tailwind CSS 4, pnpm
- [x] Configure ESLint, Prettier, path aliases
- [ ] Set up Prisma with PostgreSQL schema
- [ ] Set up Sanity CMS project with initial schemas
- [x] Create folder structure (as defined in CLAUDE.md)
- [ ] Initialize Git repo, set up branch strategy
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
- [ ] Define information architecture (full sitemap)
- [ ] Document user flows (booking, consultation, itinerary builder)
- [ ] Define data models (destinations, packages, inquiries, bookings)

**Day 5–7: UI/UX Design Start (M2)**
- [x] Wireframe: Homepage (built directly in code — 12 sections)
- [ ] Wireframe: Destination listing + detail pages
- [ ] Wireframe: Package listing + detail pages
- [ ] Wireframe: Itinerary Builder flow
- [ ] Wireframe: Consultation booking flow

**Deliverables by end of Week 1:**
✅ Logo + brand assets
✅ Project scaffolded and running locally
✅ Database schema defined
✅ Competitor research complete
✅ Homepage wireframe + key page wireframes

---

### Week 2: Design Complete + Dev Start (M2 + M3 Start)

**Day 1–3: Complete UI/UX (M2)**
- [ ] Wireframe remaining pages: About, Contact, Services, Gallery, Blog, FAQ
- [ ] Wireframe: Hotel search, Vehicle booking, Visa/Passport
- [ ] Wireframe: Admin panel (inquiries, bookings dashboard)
- [ ] High-fidelity mockups (desktop + mobile) for all key pages
- [ ] Design system: component library setup with shadcn/ui
- [ ] Mobile-first responsive breakpoints defined
- [ ] Client design review + sign-off

**Day 3–7: Core Development Start (M3)**
- [ ] Build layout components (Header, Footer, MobileNav, Container)
- [ ] Build Homepage sections (Hero, Categories, Featured, Popular, WhyChooseUs, Testimonials, CTA, Newsletter)
- [ ] Implement responsive navigation with mobile menu
- [ ] Set up Sanity schemas (blog, destination, package, testimonial, FAQ, gallery)
- [ ] Connect Sanity client + write base GROQ queries
- [ ] Build shared components (Breadcrumbs, SectionHeading, ImageWithBlur, WhatsAppButton)

**Deliverables by end of Week 2:**
✅ All wireframes + high-fidelity mockups
✅ Design sign-off from client
✅ Homepage fully built (responsive)
✅ Layout components complete
✅ Sanity CMS connected

---

### Week 3: Core Pages + Modules (M3 Continued)

**Standard Pages:**
- [ ] About Us page (founder story, mission, team, why TravelSense)
- [ ] Services page (all travel categories with CTAs)
- [ ] Contact Us page (form, map, WhatsApp, email, phone)
- [ ] Gallery page (Sanity-powered image gallery with lightbox)
- [ ] FAQ page (accordion, Sanity-managed, schema markup)

**Destination & Package Pages:**
- [ ] Destination listing page (grid with filters: category, region, budget)
- [ ] Destination detail page (hero, description, packages, gallery, weather, best time)
- [ ] Package listing page (grid with filters: destination, budget, duration, category)
- [ ] Package detail page (itinerary, inclusions/exclusions, pricing, booking CTA)

**Module: Itinerary Builder**
- [ ] Multi-step form: Destination → Dates → Budget → Interests → Group → Style
- [ ] Rule-based recommendation engine (pre-AI)
- [ ] Results page with day-wise itinerary display
- [ ] Save & share functionality (shareable link)
- [ ] "Book This Trip" CTA → consultation booking

**Deliverables by end of Week 3:**
✅ All standard pages complete
✅ Destination + package pages with dynamic content
✅ Itinerary builder working (rule-based)

---

### Week 4: Booking Modules + Integrations (M3 + M4 Start)

**Module: Consultation Booking**
- [ ] Calendar integration (Cal.com embed or custom with available slots)
- [ ] Booking form (name, email, phone, preferred date/time, travel interest)
- [ ] Razorpay integration for consultation fee payment
- [ ] Automated email confirmation (Brevo)
- [ ] Automated reminder (24hr before)
- [ ] Admin view of all consultation requests

**Module: Hotel Booking**
- [ ] Hotel search API integration (RateHawk/Booking.com affiliate)
- [ ] Search form: destination, check-in/out, guests, rooms
- [ ] Results page with filters: price, rating, amenities
- [ ] Hotel detail page with photos, reviews, pricing
- [ ] Redirect to booking (affiliate model for Phase 1)

**Module: Vehicle Booking**
- [ ] Request form: destination, dates, vehicle type, group size
- [ ] Email notification to admin/vendor on submission
- [ ] Confirmation page with expected response time
- [ ] Admin view of vehicle requests with status management

**Module: Visa & Passport Assistance**
- [ ] Service listing page with destination-wise visa requirements
- [ ] Inquiry form
- [ ] Document checklist by destination
- [ ] Admin notification on new inquiries

**Content Start (M4):**
- [ ] Begin copywriting for all category pages
- [ ] Begin destination page content

**Deliverables by end of Week 4:**
✅ Consultation booking with payment working
✅ Hotel search integrated
✅ Vehicle booking request system working
✅ Visa/passport section complete
✅ Content creation in progress

---

### Week 5: Content, SEO & Blog (M3 Wrap + M4)

**Blog System:**
- [ ] Blog listing page (grid, category filter, pagination)
- [ ] Blog post page (Sanity portable text, reading time, share buttons, related posts)
- [ ] Blog categories: Travel Tips, Destination Guides, Adventure Stories, Educational Travel
- [ ] Write/publish 5–10 seed blog articles

**Content Completion:**
- [ ] Finalize all page copy (Leisure, Adventure, Educational, Sports categories)
- [ ] All destination page content
- [ ] All package descriptions
- [ ] About page founder story
- [ ] FAQ content (20+ questions)

**SEO Setup:**
- [ ] Meta titles + descriptions for all pages
- [ ] Open Graph images for social sharing
- [ ] Schema markup: Organization, LocalBusiness, TravelAction, BreadcrumbList, FAQ, BlogPosting
- [ ] XML sitemap generation (automatic)
- [ ] robots.txt configuration
- [ ] Canonical URLs
- [ ] Image alt tags audit
- [ ] Internal linking strategy
- [ ] Page speed optimization (image compression, lazy loading, code splitting)

**Analytics Setup:**
- [ ] Google Analytics 4 configuration
- [ ] Google Search Console verification
- [ ] Meta Pixel installation
- [ ] Event tracking: page views, form submissions, CTA clicks, consultation bookings

**Admin Panel:**
- [ ] Dashboard with key metrics (inquiries today, bookings, pending)
- [ ] Consultation inquiries list with status management
- [ ] Vehicle request management
- [ ] Visa inquiry management
- [ ] Basic analytics view

**Deliverables by end of Week 5:**
✅ Blog system with 5–10 articles
✅ All content finalized
✅ Full SEO setup
✅ Analytics configured
✅ Admin panel functional

---

### Week 6: Launch (M5)

**Testing:**
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome — multiple screen sizes)
- [ ] Form submission testing (all forms)
- [ ] Payment flow testing (Razorpay)
- [ ] Email delivery testing (all automated emails)
- [ ] Performance testing (Lighthouse audit — target 90+)
- [ ] SEO audit (meta tags, schema, sitemap, robots)
- [ ] Accessibility audit (WCAG 2.1 AA check)
- [ ] Security check (SSL, input validation, API rate limiting)

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
- [ ] Brevo account setup
- [ ] Welcome email sequence (3-email series)
- [ ] Newsletter template
- [ ] Contact form auto-response

**Launch:**
- [ ] Final client walkthrough + approval
- [ ] Deploy to production (Vercel — temporary domain until client provides custom domain)
- [ ] DNS configuration (when domain is available)
- [ ] SSL verification
- [ ] Post-launch monitoring (24 hours)
- [ ] Bug fix sprint

**Post-Launch (Week 6, Day 5–7):**
- [ ] Performance monitoring
- [ ] Bug fixes
- [ ] Client training session (1–2 hours — admin panel + Sanity CMS)
- [ ] Handover documentation

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
