import { defineField, defineType } from "sanity"

export const travelPackage = defineType({
  name: "package",
  title: "Travel Package",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
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
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Leisure", value: "leisure" },
          { title: "Adventure", value: "adventure" },
          { title: "Educational", value: "educational" },
          { title: "Sports", value: "sports" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "object",
      fields: [
        { name: "days", title: "Days", type: "number", validation: (Rule) => Rule.required().min(1) },
        { name: "nights", title: "Nights", type: "number", validation: (Rule) => Rule.required().min(0) },
      ],
    }),
    defineField({
      name: "price",
      title: "Price per Person (INR)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discountedPrice",
      title: "Discounted Price (INR)",
      type: "number",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "exclusions",
      title: "Exclusions",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", title: "Day", type: "number" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "activities", title: "Activities", type: "array", of: [{ type: "string" }] },
            { name: "meals", title: "Meals Included", type: "array", of: [{ type: "string" }] },
            { name: "accommodation", title: "Accommodation", type: "string" },
          ],
          preview: {
            select: { title: "title", day: "day" },
            prepare({ title, day }) {
              return { title: `Day ${day}: ${title || "Untitled"}` }
            },
          },
        },
      ],
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: ["Easy", "Moderate", "Challenging", "Extreme"],
      },
    }),
    defineField({
      name: "groupSize",
      title: "Group Size",
      type: "object",
      fields: [
        { name: "min", title: "Min", type: "number" },
        { name: "max", title: "Max", type: "number" },
      ],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
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
    select: {
      title: "title",
      destination: "destination.name",
      price: "price",
      media: "heroImage",
    },
    prepare({ title, destination, price, media }) {
      return {
        title: title || "Untitled",
        subtitle: `${destination || "Unknown"} — Rs ${price?.toLocaleString("en-IN") || "N/A"}`,
        media,
      }
    },
  },
})
