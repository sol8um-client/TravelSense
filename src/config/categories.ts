import {
  Palmtree,
  Mountain,
  GraduationCap,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export interface TravelCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  href: string;
  color: {
    bg: string;
    text: string;
    border: string;
    gradient: string;
    light: string;
  };
  image: string;
  highlights: string[];
  popularDestinations: string[];
}

export const travelCategories: TravelCategory[] = [
  {
    id: "leisure",
    title: "Leisure Travel",
    slug: "leisure",
    description: "Relaxing getaways and beach holidays",
    longDescription:
      "Unwind with carefully curated leisure experiences. From pristine beaches to serene hill stations, our leisure packages are designed to help you recharge and reconnect with what matters most.",
    icon: Palmtree,
    href: "/categories/leisure",
    color: {
      bg: "bg-blue-50",
      text: "text-[#1B4B7A]",
      border: "border-[#1B4B7A]",
      gradient: "from-[#1B4B7A] to-[#2BA5A5]",
      light: "#E8F0FE",
    },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    highlights: [
      "Beach resorts and island escapes",
      "Hill station retreats",
      "Spa and wellness packages",
      "Honeymoon specials",
      "Family vacation packages",
      "Luxury cruise experiences",
    ],
    popularDestinations: [
      "Goa",
      "Maldives",
      "Bali",
      "Kerala",
      "Andaman Islands",
      "Mauritius",
    ],
  },
  {
    id: "adventure",
    title: "Adventure Travel",
    slug: "adventure",
    description: "Trekking, rafting, and outdoor thrills",
    longDescription:
      "Push your boundaries with adrenaline-pumping adventures. Whether you seek high-altitude treks, white-water rapids, or jungle safaris, our adventure packages deliver unforgettable experiences for every thrill-seeker.",
    icon: Mountain,
    href: "/categories/adventure",
    color: {
      bg: "bg-amber-50",
      text: "text-[#E8923E]",
      border: "border-[#E8923E]",
      gradient: "from-[#E8923E] to-[#F0B56A]",
      light: "#FFF3E0",
    },
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
    highlights: [
      "Himalayan trekking expeditions",
      "White-water rafting trips",
      "Wildlife safari tours",
      "Paragliding and skydiving",
      "Scuba diving and snorkeling",
      "Rock climbing and rappelling",
    ],
    popularDestinations: [
      "Manali",
      "Rishikesh",
      "Ladakh",
      "Nepal",
      "Jim Corbett",
      "Coorg",
    ],
  },
  {
    id: "educational",
    title: "Educational Travel",
    slug: "educational",
    description: "Learning-focused travel experiences",
    longDescription:
      "Expand horizons through travel that educates and inspires. Our educational tours combine cultural immersion, historical exploration, and hands-on learning for students, educators, and lifelong learners alike.",
    icon: GraduationCap,
    href: "/categories/educational",
    color: {
      bg: "bg-teal-50",
      text: "text-[#2BA5A5]",
      border: "border-[#2BA5A5]",
      gradient: "from-[#2BA5A5] to-[#4DC9C9]",
      light: "#E0F7F7",
    },
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
    highlights: [
      "Heritage and cultural tours",
      "Student exchange programs",
      "Science and technology visits",
      "Astronomy and nature camps",
      "Language immersion trips",
      "Museum and art gallery tours",
    ],
    popularDestinations: [
      "Jaipur",
      "Varanasi",
      "Delhi",
      "Hampi",
      "Kolkata",
      "Mysore",
    ],
  },
  {
    id: "sports",
    title: "Sports Travel",
    slug: "sports",
    description: "Sports events and active holidays",
    longDescription:
      "Experience the thrill of world-class sporting events and active holidays. From cricket matches to marathon runs, our sports travel packages put you in the heart of the action with premium arrangements.",
    icon: Trophy,
    href: "/categories/sports",
    color: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-500",
      gradient: "from-indigo-600 to-purple-500",
      light: "#EDE7F6",
    },
    image: "https://images.unsplash.com/photo-1461896836934-bd45ba24e62c?w=800&h=600&fit=crop",
    highlights: [
      "Cricket World Cup packages",
      "Football league experiences",
      "Marathon and running events",
      "Golf tour packages",
      "Olympic Games trips",
      "Formula 1 Grand Prix tours",
    ],
    popularDestinations: [
      "Mumbai",
      "London",
      "Dubai",
      "Melbourne",
      "Singapore",
      "Barcelona",
    ],
  },
];

export function getCategoryBySlug(slug: string): TravelCategory | undefined {
  return travelCategories.find((category) => category.slug === slug);
}

export function getCategoryById(id: string): TravelCategory | undefined {
  return travelCategories.find((category) => category.id === id);
}
