import { defineField, defineType } from "sanity"

export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          "North India",
          "South India",
          "East India",
          "West India",
          "Central India",
          "North East India",
          "Southeast Asia",
          "Europe",
          "Middle East",
          "Africa",
          "Americas",
          "Oceania",
        ],
      },
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      initialValue: "India",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Beach", value: "beach" },
          { title: "Mountain", value: "mountain" },
          { title: "Heritage", value: "heritage" },
          { title: "Wildlife", value: "wildlife" },
          { title: "Adventure", value: "adventure" },
          { title: "Spiritual", value: "spiritual" },
          { title: "Honeymoon", value: "honeymoon" },
          { title: "Family", value: "family" },
        ],
      },
    }),
    defineField({
      name: "bestTimeToVisit",
      title: "Best Time to Visit",
      type: "string",
    }),
    defineField({
      name: "weather",
      title: "Weather Info",
      type: "string",
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "startingPrice",
      title: "Starting Price (INR)",
      type: "number",
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      fields: [
        { name: "lat", title: "Latitude", type: "number" },
        { name: "lng", title: "Longitude", type: "number" },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "region", media: "heroImage" },
  },
  orderings: [
    { title: "Name", name: "name", by: [{ field: "name", direction: "asc" }] },
  ],
})
