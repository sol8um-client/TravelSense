-- ============================================================
-- TravelSense — Supabase Table Creation Script
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Contact Inquiries
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- 2. Consultation Bookings
CREATE TABLE IF NOT EXISTS consultation_bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_date text,
  preferred_time text,
  interests text[],
  message text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- 3. Vehicle Requests
CREATE TABLE IF NOT EXISTS vehicle_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  destination text,
  travel_dates text,
  vehicle_type text,
  group_size integer,
  message text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- 4. Visa Inquiries
CREATE TABLE IF NOT EXISTS visa_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  destination text,
  travel_date text,
  number_of_travelers integer DEFAULT 1,
  message text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- 5. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- Row Level Security (RLS) Policies
-- Allow anonymous inserts (website forms), restrict reads to service role
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for website form submissions)
CREATE POLICY "Allow anonymous insert" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert" ON consultation_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert" ON vehicle_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert" ON visa_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Allow anonymous select (for admin panel — in Phase 2, restrict to authenticated users)
CREATE POLICY "Allow anonymous select" ON contact_inquiries FOR SELECT USING (true);
CREATE POLICY "Allow anonymous select" ON consultation_bookings FOR SELECT USING (true);
CREATE POLICY "Allow anonymous select" ON vehicle_requests FOR SELECT USING (true);
CREATE POLICY "Allow anonymous select" ON visa_inquiries FOR SELECT USING (true);
CREATE POLICY "Allow anonymous select" ON newsletter_subscribers FOR SELECT USING (true);

-- Allow upsert for newsletter (handles duplicate email gracefully)
CREATE POLICY "Allow anonymous update" ON newsletter_subscribers FOR UPDATE USING (true);
