import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx and tailwind-merge.
 * Handles conditional classes and resolves conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indian Rupee currency.
 * Example: 25000 -> "₹25,000"
 */
export function formatCurrency(
  amount: number,
  options?: {
    showDecimal?: boolean;
    compact?: boolean;
  }
): string {
  const { showDecimal = false, compact = false } = options ?? {};

  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, "")} L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  }).format(amount);
}

/**
 * Format a date string or Date object into a human-readable format.
 */
export function formatDate(
  date: string | Date,
  options?: {
    format?: "short" | "medium" | "long" | "relative";
  }
): string {
  const { format = "medium" } = options ?? {};
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return "Invalid date";
  }

  if (format === "relative") {
    return getRelativeTime(d);
  }

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: "numeric", month: "short" },
    medium: { day: "numeric", month: "short", year: "numeric" },
    long: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  };

  return d.toLocaleDateString("en-IN", formatOptions[format]);
}

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours").
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const isFuture = diffMs < 0;
  const prefix = isFuture ? "in " : "";
  const suffix = isFuture ? "" : " ago";

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60)
    return `${prefix}${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}${suffix}`;
  if (diffHours < 24)
    return `${prefix}${diffHours} hour${diffHours > 1 ? "s" : ""}${suffix}`;
  if (diffDays < 7)
    return `${prefix}${diffDays} day${diffDays > 1 ? "s" : ""}${suffix}`;
  if (diffWeeks < 5)
    return `${prefix}${diffWeeks} week${diffWeeks > 1 ? "s" : ""}${suffix}`;
  if (diffMonths < 12)
    return `${prefix}${diffMonths} month${diffMonths > 1 ? "s" : ""}${suffix}`;
  return `${prefix}${diffYears} year${diffYears > 1 ? "s" : ""}${suffix}`;
}

/**
 * Truncate text to a specified length and append an ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
}

/**
 * Convert a string to a URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generate an array of page numbers for pagination.
 */
export function generatePagination(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

/**
 * Construct a full URL from a path and the site base URL.
 */
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Clamp a number between a min and max value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate the number of nights between two dates.
 */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffMs = checkOut.getTime() - checkIn.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Format a duration in days/nights (e.g., "5 Days / 4 Nights").
 */
export function formatDuration(days: number): string {
  const nights = days - 1;
  return `${days} Day${days > 1 ? "s" : ""} / ${nights} Night${nights > 1 ? "s" : ""}`;
}
