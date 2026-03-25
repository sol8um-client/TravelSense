import Link from "next/link"
import {
  Palmtree,
  Mountain,
  GraduationCap,
  ArrowRight,
} from "lucide-react"
import { type FC } from "react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"
import { SectionHeading } from "@/components/shared/SectionHeading"

const categories = [
  {
    title: "Leisure",
    slug: "leisure",
    icon: Palmtree,
    description:
      "Unwind on pristine beaches, explore charming hill stations, and indulge in luxury resorts crafted for relaxation.",
    gradient: "from-sky-500/80 to-primary",
    hoverGradient: "group-hover:from-sky-500 group-hover:to-primary-dark",
  },
  {
    title: "Education",
    slug: "education",
    icon: GraduationCap,
    description:
      "Inspire young minds with curated field trips, heritage walks, and cultural immersion programs across India and beyond.",
    gradient: "from-violet-500/80 to-indigo-700",
    hoverGradient: "group-hover:from-violet-500 group-hover:to-indigo-600",
  },
  {
    title: "Adventure",
    slug: "adventure",
    icon: Mountain,
    description:
      "Scale peaks, raft through rapids, and trek ancient trails. Fuel your adrenaline with handpicked adventure escapes.",
    gradient: "from-emerald-500/80 to-accent-dark",
    hoverGradient: "group-hover:from-emerald-500 group-hover:to-accent",
  },
]

const CategoryCard: FC<(typeof categories)[number]> = ({
  title,
  slug,
  icon: Icon,
  description,
  gradient,
  hoverGradient,
}) => {
  return (
    <Link
      href={`/categories/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Gradient header */}
      <div
        className={cn(
          "relative flex h-44 items-center justify-center bg-gradient-to-br transition-all duration-500",
          gradient,
          hoverGradient
        )}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />
        </div>
        {/* Decorative circle */}
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-white/5" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-secondary">
          Explore {title}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default function Categories() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container>
        <SectionHeading
          title="Travel Your Way"
          subtitle="Whether you seek relaxation, knowledge, or adrenaline, we have a journey designed just for you."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} {...category} />
          ))}
        </div>
      </Container>
    </section>
  )
}
