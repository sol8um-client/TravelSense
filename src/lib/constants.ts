/** Indian Rupee symbol */
export const CURRENCY_SYMBOL = "₹";

/** Default currency code */
export const DEFAULT_CURRENCY = "INR";

/** Number of items per page in paginated lists */
export const ITEMS_PER_PAGE = 12;

/** Base consultation fee in INR */
export const CONSULTATION_FEE = 500;

/** WhatsApp number for customer support */
export const WHATSAPP_NUMBER = "+91-XXXXXXXXXX";

/** Support email address */
export const SUPPORT_EMAIL = "hello@travelsense.in";

/** Maximum file upload size in bytes (5 MB) */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/** Allowed image MIME types for uploads */
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

/** Maximum number of travelers per booking */
export const MAX_TRAVELERS = 20;

/** Minimum number of travelers per booking */
export const MIN_TRAVELERS = 1;

/** Minimum advance booking days */
export const MIN_ADVANCE_BOOKING_DAYS = 3;

/** Number of featured packages shown on the homepage */
export const FEATURED_PACKAGES_COUNT = 6;

/** Number of featured destinations shown on the homepage */
export const FEATURED_DESTINATIONS_COUNT = 8;

/** Number of testimonials shown on the homepage */
export const FEATURED_TESTIMONIALS_COUNT = 4;

/** Number of blog posts shown on the homepage */
export const FEATURED_BLOG_POSTS_COUNT = 3;

/** Price range filter bounds in INR */
export const PRICE_RANGE = {
  min: 0,
  max: 500000,
  step: 1000,
} as const;

/** Duration filter options in days */
export const DURATION_OPTIONS = [
  { label: "1-3 Days", min: 1, max: 3 },
  { label: "4-6 Days", min: 4, max: 6 },
  { label: "7-10 Days", min: 7, max: 10 },
  { label: "11-15 Days", min: 11, max: 15 },
  { label: "15+ Days", min: 15, max: Infinity },
] as const;

/** Rating filter options */
export const RATING_OPTIONS = [
  { label: "4.5 & above", value: 4.5 },
  { label: "4.0 & above", value: 4.0 },
  { label: "3.5 & above", value: 3.5 },
  { label: "3.0 & above", value: 3.0 },
] as const;

/** Sort options for package listings */
export const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Duration: Short to Long", value: "duration_asc" },
  { label: "Duration: Long to Short", value: "duration_desc" },
  { label: "Rating: High to Low", value: "rating_desc" },
  { label: "Newest First", value: "newest" },
] as const;

/** Difficulty levels for adventure packages */
export const DIFFICULTY_LEVELS = [
  "Easy",
  "Moderate",
  "Challenging",
  "Extreme",
] as const;

/** Meal plan options */
export const MEAL_PLANS = [
  { label: "No Meals", value: "none" },
  { label: "Breakfast Only", value: "breakfast" },
  { label: "Half Board (Breakfast + Dinner)", value: "half_board" },
  { label: "Full Board (All Meals)", value: "full_board" },
  { label: "All Inclusive", value: "all_inclusive" },
] as const;

/** Booking status values */
export const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "completed",
  "cancelled",
  "refunded",
] as const;

/** Inquiry status values */
export const INQUIRY_STATUSES = [
  "new",
  "in_progress",
  "responded",
  "closed",
] as const;

/** Brand colors for programmatic access — Palette A: Midnight Voyager */
export const BRAND_COLORS = {
  primary: "#0B1426",
  primaryLight: "#1B2D4E",
  secondary: "#C4324A",
  accent: "#D4A853",
  silver: "#B0B8C4",
  pearl: "#E8ECF0",
  white: "#FFFFFF",
  offWhite: "#FAF8F4",
  lightGray: "#E8ECF0",
  dark: "#1A1A2E",
} as const;

/** Social media sharing platforms */
export const SHARE_PLATFORMS = [
  "whatsapp",
  "facebook",
  "twitter",
  "linkedin",
  "email",
  "copy",
] as const;

/** Animation duration presets in milliseconds */
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/** Breakpoints matching Tailwind defaults */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
