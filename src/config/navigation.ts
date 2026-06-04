export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
  external?: boolean;
}

export interface FooterNavSection {
  [key: string]: NavItem[];
}

export const mainNavItems: NavItem[] = [
  { title: "Destinations", href: "/destinations" },
  {
    title: "Experiences",
    href: "/categories",
    children: [
      {
        title: "Leisure",
        href: "/categories/leisure",
        description: "Relaxing getaways and beach holidays",
      },
      {
        title: "Adventure",
        href: "/categories/adventure",
        description: "Trekking, rafting, and outdoor thrills",
      },
      {
        title: "All Packages",
        href: "/packages",
        description: "Browse every curated itinerary",
      },
    ],
  },
  { title: "How it works", href: "/#how-it-works" },
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Itinerary Builder",
        href: "/itinerary-builder",
        description: "Create your perfect trip plan",
      },
      {
        title: "Hotel Booking",
        href: "/hotels",
        description: "Find and book the best hotels",
      },
      {
        title: "Vehicle Booking",
        href: "/vehicles",
        description: "Book transport for your trip",
      },
      {
        title: "Visa & Passport",
        href: "/visa-passport",
        description: "Hassle-free travel documentation",
      },
    ],
  },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export const footerNavItems: FooterNavSection = {
  categories: [
    { title: "Leisure Travel", href: "/categories/leisure" },
    { title: "Adventure Travel", href: "/categories/adventure" },
  ],
  services: [
    { title: "Travel Packages", href: "/packages" },
    { title: "Itinerary Builder", href: "/itinerary-builder" },
    { title: "Hotel Booking", href: "/hotels" },
    { title: "Vehicle Booking", href: "/vehicles" },
    { title: "Visa & Passport", href: "/visa-passport" },
    { title: "Travel Consultation", href: "/consultation" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Blog", href: "/blog" },
    { title: "Gallery", href: "/gallery" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact", href: "/contact" },
  ],
};
