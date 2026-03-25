// ---------------------------------------------------------------------------
// Shared TypeScript types and interfaces for TravelSense
// ---------------------------------------------------------------------------

/** Base fields shared by most database-backed entities. */
export interface BaseEntity {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ---------------------------------------------------------------------------
// Destination
// ---------------------------------------------------------------------------

export interface Destination extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  country: string;
  state?: string;
  city?: string;
  continent: Continent;
  images: ImageAsset[];
  coverImage: string;
  coordinates: Coordinates;
  bestTimeToVisit: string;
  averageBudget: number;
  currency: string;
  language: string[];
  timezone: string;
  highlights: string[];
  tags: string[];
  isFeatured: boolean;
  isPopular: boolean;
  rating: number;
  reviewCount: number;
  packages?: Package[];
}

export type Continent =
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Africa"
  | "Oceania"
  | "Antarctica";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
}

// ---------------------------------------------------------------------------
// Package
// ---------------------------------------------------------------------------

export interface Package extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: TravelCategoryType;
  destinationId: string;
  destination?: Destination;
  images: ImageAsset[];
  coverImage: string;
  duration: PackageDuration;
  price: PackagePrice;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  highlights: string[];
  difficulty?: DifficultyLevel;
  groupSize: GroupSize;
  mealPlan: MealPlanType;
  accommodation: AccommodationType;
  transport: TransportType[];
  startDates: string[];
  isFeatured: boolean;
  isPopular: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  status: "draft" | "published" | "archived";
}

export type TravelCategoryType =
  | "leisure"
  | "adventure"
  | "educational"
  | "sports";

export type DifficultyLevel = "Easy" | "Moderate" | "Challenging" | "Extreme";

export type MealPlanType =
  | "none"
  | "breakfast"
  | "half_board"
  | "full_board"
  | "all_inclusive";

export type AccommodationType =
  | "hotel"
  | "resort"
  | "homestay"
  | "hostel"
  | "camp"
  | "villa"
  | "cruise";

export type TransportType =
  | "flight"
  | "train"
  | "bus"
  | "car"
  | "ferry"
  | "bike"
  | "walking";

export interface PackageDuration {
  days: number;
  nights: number;
}

export interface PackagePrice {
  /** Base price per person in INR */
  basePrice: number;
  /** Discounted price per person in INR (if applicable) */
  discountedPrice?: number;
  /** Percentage discount */
  discountPercent?: number;
  /** Price for children (if different) */
  childPrice?: number;
  /** Additional cost for single occupancy */
  singleSupplement?: number;
}

export interface GroupSize {
  min: number;
  max: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: ("breakfast" | "lunch" | "dinner")[];
  accommodation?: string;
  transport?: string;
  image?: string;
}

// ---------------------------------------------------------------------------
// Booking
// ---------------------------------------------------------------------------

export interface Booking extends BaseEntity {
  bookingNumber: string;
  userId: string;
  packageId: string;
  package?: Package;
  travelers: Traveler[];
  travelDate: string;
  returnDate: string;
  totalAmount: number;
  paidAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  contactInfo: ContactInfo;
  mealPlan: MealPlanType;
  accommodation: AccommodationType;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "completed"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "unpaid" | "partial" | "paid" | "refunded";

export interface Traveler {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  idType?: "passport" | "aadhar" | "pan" | "driving_license";
  idNumber?: string;
  isChild: boolean;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

// ---------------------------------------------------------------------------
// Inquiry
// ---------------------------------------------------------------------------

export interface Inquiry extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  destination?: string;
  category?: TravelCategoryType;
  travelDate?: string;
  travelers?: number;
  budget?: number;
  message: string;
  source: InquirySource;
  status: InquiryStatus;
  assignedTo?: string;
  notes?: string;
}

export type InquirySource =
  | "website"
  | "whatsapp"
  | "phone"
  | "email"
  | "referral"
  | "social_media";

export type InquiryStatus = "new" | "in_progress" | "responded" | "closed";

// ---------------------------------------------------------------------------
// Testimonial
// ---------------------------------------------------------------------------

export interface Testimonial extends BaseEntity {
  name: string;
  avatar?: string;
  location: string;
  rating: number;
  review: string;
  packageId?: string;
  packageTitle?: string;
  destinationName?: string;
  travelDate?: string;
  isFeatured: boolean;
  isApproved: boolean;
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images: ImageAsset[];
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  readTime: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date | string;
  views: number;
  relatedPackages?: string[];
}

export interface BlogAuthor {
  name: string;
  avatar?: string;
  bio?: string;
}

export type BlogCategory =
  | "travel_tips"
  | "destination_guides"
  | "adventure_stories"
  | "culture"
  | "food"
  | "packing_guides"
  | "travel_news"
  | "budget_travel";

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export interface FAQ extends BaseEntity {
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
  isPublished: boolean;
}

export type FAQCategory =
  | "general"
  | "booking"
  | "payment"
  | "cancellation"
  | "visa"
  | "packages"
  | "itinerary"
  | "transport"
  | "accommodation";

// ---------------------------------------------------------------------------
// Hotel
// ---------------------------------------------------------------------------

export interface Hotel extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates: Coordinates;
  images: ImageAsset[];
  coverImage: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  rating: number;
  reviewCount: number;
  amenities: string[];
  roomTypes: RoomType[];
  checkInTime: string;
  checkOutTime: string;
  contactPhone: string;
  contactEmail: string;
  isFeatured: boolean;
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  pricePerNight: number;
  amenities: string[];
  images: ImageAsset[];
  available: boolean;
}

// ---------------------------------------------------------------------------
// Vehicle
// ---------------------------------------------------------------------------

export interface Vehicle extends BaseEntity {
  name: string;
  type: VehicleType;
  description: string;
  images: ImageAsset[];
  seatingCapacity: number;
  luggageCapacity: number;
  pricePerDay: number;
  pricePerKm: number;
  features: string[];
  isAcAvailable: boolean;
  fuelType: "petrol" | "diesel" | "cng" | "electric";
  isAvailable: boolean;
}

export type VehicleType =
  | "sedan"
  | "suv"
  | "hatchback"
  | "minivan"
  | "tempo_traveller"
  | "bus"
  | "luxury";

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export interface GalleryItem extends BaseEntity {
  title: string;
  description?: string;
  image: ImageAsset;
  category: TravelCategoryType | "general";
  destination?: string;
  isFeatured: boolean;
  order: number;
}

// ---------------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------------

export interface NewsletterSubscriber extends BaseEntity {
  email: string;
  name?: string;
  isActive: boolean;
  subscribedAt: Date | string;
}

// ---------------------------------------------------------------------------
// Search & Filters
// ---------------------------------------------------------------------------

export interface SearchFilters {
  query?: string;
  category?: TravelCategoryType;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  minRating?: number;
  difficulty?: DifficultyLevel;
  mealPlan?: MealPlanType;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}

export type SortOption =
  | "recommended"
  | "price_asc"
  | "price_desc"
  | "duration_asc"
  | "duration_desc"
  | "rating_desc"
  | "newest";

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ---------------------------------------------------------------------------
// API Response
// ---------------------------------------------------------------------------

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
