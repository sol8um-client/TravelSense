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
  { title: "Home", href: "/" },
  { title: "Destinations", href: "/destinations" },
  {
    title: "Categories",
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
        title: "Educational",
        href: "/categories/educational",
        description: "Learning-focused travel experiences",
      },
      {
        title: "Sports",
        href: "/categories/sports",
        description: "Sports events and active holidays",
      },
    ],
  },
  { title: "Packages", href: "/packages" },
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
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export const footerNavItems: FooterNavSection = {
  categories: [
    { title: "Leisure Travel", href: "/categories/leisure" },
    { title: "Adventure Travel", href: "/categories/adventure" },
    { title: "Educational Travel", href: "/categories/educational" },
    { title: "Sports Travel", href: "/categories/sports" },
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
