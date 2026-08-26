import { defineArrayMember, defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "de", title: "German", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "en", title: "English", type: "string", validation: (rule) => rule.required() }),
    ],
  });

const localizedText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "de", title: "German", type: "text", rows: 4, validation: (rule) => rule.required() }),
      defineField({ name: "en", title: "English", type: "text", rows: 4, validation: (rule) => rule.required() }),
    ],
  });

export default defineType({
  name: "siteContent",
  title: "Site Content",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Website content", validation: (rule) => rule.required() }),
    defineField({
      name: "navigation",
      type: "object",
      fields: [
        localizedString("packages", "Packages"),
        localizedString("whyGreece", "Why Greece"),
        localizedString("practicalInfo", "Practical information"),
        localizedString("contact", "Contact"),
      ],
    }),
    defineField({ name: "inquireLabel", title: "Inquiry button", type: "object", fields: [localizedString("label", "Label")] }),
    defineField({
      name: "footer",
      type: "object",
      fields: [
        localizedText("tagline", "Tagline"),
        localizedString("quickLinks", "Quick links"),
        localizedString("contact", "Contact"),
        localizedString("rights", "Copyright notice"),
      ],
    }),
    defineField({
      name: "home",
      title: "Homepage",
      type: "object",
      fields: [
        defineField({
          name: "hero",
          type: "object",
          fields: [
            localizedString("kicker", "Kicker"),
            localizedString("title", "Title"),
            localizedText("subtitle", "Subtitle"),
            localizedString("ctaPrimary", "Primary button"),
            localizedString("ctaSecondary", "Secondary button"),
            defineField({
              name: "stats",
              type: "array",
              of: [defineArrayMember({ type: "object", fields: [localizedString("value", "Value"), localizedString("label", "Label")] })],
            }),
          ],
        }),
        defineField({
          name: "gallery",
          type: "object",
          fields: [
            localizedString("cta", "Button"),
            localizedString("caption", "Caption"),
            defineField({ name: "alt", title: "Image alt text", type: "array", of: [defineArrayMember({ type: "object", fields: [localizedString("text", "Text")] })] }),
          ],
        }),
        defineField({ name: "welcome", type: "object", fields: [localizedString("eyebrow", "Eyebrow"), localizedString("title", "Title"), localizedText("body", "Body")] }),
        defineField({
          name: "philosophy",
          type: "object",
          fields: [
            localizedString("eyebrow", "Eyebrow"),
            localizedString("title", "Title"),
            localizedText("body", "Body"),
            defineField({ name: "pillars", type: "array", of: [defineArrayMember({ type: "object", fields: [localizedString("title", "Title"), localizedText("text", "Text")] })] }),
          ],
        }),
        defineField({ name: "packages", type: "object", fields: [localizedString("heading", "Heading"), localizedText("subtitle", "Subtitle"), localizedString("difficulty", "Difficulty label"), localizedString("viewAll", "View all button")] }),
      ],
    }),
  ],
});
