// ─── Destinations ────────────────────────────────────────────────────────────

export const allDestinationsQuery = `
  *[_type == "destination" && published == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    heroImage,
    region,
    country,
    category,
    bestTimeToVisit,
    startingPrice,
    featured,
    highlights
  }
`

export const destinationBySlugQuery = `
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    longDescription,
    heroImage,
    gallery,
    region,
    country,
    category,
    bestTimeToVisit,
    weather,
    highlights,
    startingPrice,
    coordinates,
    featured,
    "packages": *[_type == "package" && references(^._id) && published == true] {
      _id,
      title,
      "slug": slug.current,
      description,
      category,
      duration,
      price,
      discountedPrice,
      heroImage,
      difficulty,
      featured
    }
  }
`

export const destinationSlugsQuery = `
  *[_type == "destination" && published == true].slug.current
`

// ─── Packages ────────────────────────────────────────────────────────────────

export const allPackagesQuery = `
  *[_type == "package" && published == true] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    duration,
    price,
    discountedPrice,
    heroImage,
    difficulty,
    featured,
    highlights,
    destination-> {
      name,
      "slug": slug.current,
      region
    }
  }
`

export const packageBySlugQuery = `
  *[_type == "package" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    duration,
    price,
    discountedPrice,
    heroImage,
    images,
    inclusions,
    exclusions,
    itinerary,
    difficulty,
    groupSize,
    highlights,
    featured,
    destination-> {
      _id,
      name,
      "slug": slug.current,
      region,
      country,
      heroImage
    }
  }
`

export const packageSlugsQuery = `
  *[_type == "package" && published == true].slug.current
`

export const packagesByCategoryQuery = `
  *[_type == "package" && published == true && category == $category] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    duration,
    price,
    discountedPrice,
    heroImage,
    difficulty,
    featured,
    destination-> { name, "slug": slug.current, region }
  }
`

export const packagesByDestinationQuery = `
  *[_type == "package" && published == true && destination->slug.current == $destinationSlug] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    duration,
    price,
    discountedPrice,
    heroImage,
    difficulty,
    featured,
    destination-> { name, "slug": slug.current, region }
  }
`

// ─── Blog ────────────────────────────────────────────────────────────────────

export const allBlogPostsQuery = `
  *[_type == "blog" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    tags,
    readTime,
    featured,
    publishedAt,
    author-> { name, image }
  }
`

export const blogPostBySlugQuery = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    body,
    category,
    tags,
    readTime,
    featured,
    publishedAt,
    author-> { name, image, bio },
    "relatedPosts": *[_type == "blog" && slug.current != $slug && category == ^.category] | order(publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      category,
      readTime,
      publishedAt,
      author-> { name, image }
    }
  }
`

export const blogSlugsQuery = `
  *[_type == "blog" && defined(publishedAt)].slug.current
`

// ─── Testimonials ────────────────────────────────────────────────────────────

export const allTestimonialsQuery = `
  *[_type == "testimonial" && published == true] | order(_createdAt desc) {
    _id,
    name,
    location,
    image,
    rating,
    content,
    destination,
    packageTitle,
    featured
  }
`

export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && published == true && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    name,
    location,
    image,
    rating,
    content,
    destination,
    packageTitle
  }
`

// ─── Gallery ─────────────────────────────────────────────────────────────────

export const allGalleryQuery = `
  *[_type == "gallery"] | order(order asc) {
    _id,
    title,
    image,
    description,
    category,
    destination,
    featured
  }
`

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const allFaqsQuery = `
  *[_type == "faq" && published == true] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`
