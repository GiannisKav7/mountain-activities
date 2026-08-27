import { defineArrayMember, defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "de", title: "German", type: "string" },
      { name: "en", title: "English", type: "string" },
    ],
  });

const localizedText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "de", title: "German", type: "text", rows: 3 },
      { name: "en", title: "English", type: "text", rows: 3 },
    ],
  });

export default defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    localizedString("title", "Title"),
    defineField({ name: "slug", type: "slug", options: { source: "title.de", maxLength: 96 } }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroVideo", title: "Hero video URL", type: "url" }),
    localizedText("summary", "Summary"),
    defineField({
      name: "specs",
      title: "Specs",
      type: "object",
      fields: [
        localizedString("duration", "Duration"),
        localizedString("accommodation", "Accommodation"),
        defineField({ name: "difficultyRating", title: "Difficulty (1–5)", type: "number" }),
        localizedString("activityType", "Activity type"),
        defineField({ name: "priceFrom", title: "Price from (€)", type: "number" }),
      ],
    }),
    // Day-by-day itinerary
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "day", title: "Day number", type: "number" }),
            localizedString("title", "Day title"),
            localizedText("description", "Description"),
          ],
        }),
      ],
    }),
    // What's included / not included
    defineField({
      name: "included",
      title: "Included",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "de", title: "German", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        }),
      ],
    }),
    defineField({
      name: "notIncluded",
      title: "Not included",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "de", title: "German", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        }),
      ],
    }),
    // Additional gallery images
    defineField({
      name: "gallery",
      title: "Gallery images",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", type: "image", options: { hotspot: true } }),
            localizedString("alt", "Alt text"),
          ],
        }),
      ],
    }),
    // Per-package SEO
    localizedString("seoTitle", "SEO title"),
    localizedText("seoDescription", "SEO description"),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "title.de", media: "heroImage" },
    prepare: ({ title, media }) => ({ title, media }),
  },
});
