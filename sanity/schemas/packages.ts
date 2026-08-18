import { defineField, defineType } from "sanity";

export default defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    defineField({ name: "title", type: "object", fields: [
      { name: "de", type: "string" }, { name: "en", type: "string" }
    ]}),
    defineField({ name: "slug", type: "slug", options: { source: "title.de", maxLength: 96 } }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroVideo", type: "url" }),
    defineField({ name: "summary", type: "object", fields: [
      { name: "de", type: "text" }, { name: "en", type: "text" }
    ]}),
    defineField({
      name: "specs",
      type: "object",
      fields: [
        { name: "duration", type: "string" },
        { name: "accommodation", type: "object", fields: [{ name: "de", type: "string" }, { name: "en", type: "string" }] },
        { name: "difficultyRating", type: "number" },
        { name: "activityType", type: "object", fields: [{ name: "de", type: "string" }, { name: "en", type: "string" }] },
        { name: "priceFrom", type: "number" },
      ],
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
  ],
});