import { defineArrayMember, defineField, defineType } from "sanity";

// Reusable localized field helpers (kept local to this schema)
const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "de", title: "German", type: "string" }),
      defineField({ name: "en", title: "English", type: "string" }),
    ],
  });

const localizedText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "de", title: "German", type: "text", rows: 3 }),
      defineField({ name: "en", title: "English", type: "text", rows: 3 }),
    ],
  });

const PAGE_OPTIONS = [
  { title: "Activities", value: "activities" },
  { title: "The Region", value: "region" },
  { title: "About OLVIOS", value: "about" },
  { title: "Practical Information", value: "practicalInformation" },
  { title: "Contact", value: "contact" },
];

const LAYOUT_OPTIONS = [
  { title: "Cards (responsive grid)", value: "cards" },
  { title: "Numbered list", value: "list" },
  { title: "Timeline (chronological)", value: "timeline" },
  { title: "Prose paragraphs", value: "paragraphs" },
];

// Item inside a section (used by cards, list, timeline layouts)
const sectionItem = defineArrayMember({
  type: "object",
  fields: [
    localizedString("eyebrow", "Eyebrow / number"),
    localizedString("title", "Title"),
    localizedText("text", "Body text"),
    defineField({
      name: "meta",
      title: "Meta tags",
      description: "Short info tags shown on cards (e.g. duration, terrain). Add one per language.",
      type: "object",
      fields: [
        defineField({ name: "de", title: "German tags", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "en", title: "English tags", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    localizedText("note", "Note (highlighted callout)"),
    defineField({ name: "href", title: "Link URL", type: "string" }),
    localizedString("linkLabel", "Link label"),
  ],
});

// One content section
const section = defineArrayMember({
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Anchor ID",
      type: "string",
      description: 'Used as the URL anchor (e.g. "hiking" → #hiking). Lowercase, no spaces.',
      validation: (r) => r.required(),
    }),
    localizedString("eyebrow", "Eyebrow"),
    localizedString("title", "Section title"),
    localizedText("intro", "Introduction paragraph"),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      description: "Controls how section content is rendered on the page.",
      options: { list: LAYOUT_OPTIONS, layout: "radio" },
    }),
    // Items — for cards, list, timeline
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      hidden: ({ parent }) => (parent as any)?.layout === "paragraphs",
      of: [sectionItem],
    }),
    // Paragraphs — for prose layout
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      hidden: ({ parent }) => (parent as any)?.layout !== "paragraphs",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "de", title: "German", type: "text", rows: 4 }),
            defineField({ name: "en", title: "English", type: "text", rows: 4 }),
          ],
        }),
      ],
    }),
    localizedText("note", "Section-level note (info box)"),
  ],
});

export default defineType({
  name: "page",
  title: "Content Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description:
        'The URL path segment for this page. Must match one of the known routes (activities, region, about, practical-information, contact).',
      options: { source: "title.de", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    // SEO
    localizedString("seoTitle", "SEO title (<title>)"),
    localizedText("seoDescription", "SEO description (<meta description>)"),
    // Page hero header
    localizedString("eyebrow", "Eyebrow (hero header label)"),
    localizedString("title", "Page title"),
    localizedText("intro", "Introduction paragraph"),
    // Stat cards in the hero
    defineField({
      name: "highlights",
      title: "Highlight stats",
      description: "Up to 3 stat cards shown in the page hero.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [localizedString("value", "Value"), localizedString("label", "Label")],
        }),
      ],
    }),
    // Content sections
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [section],
    }),
    // Closing CTA banner
    defineField({
      name: "closing",
      title: "Closing CTA",
      type: "object",
      fields: [
        localizedString("eyebrow", "Eyebrow"),
        localizedString("title", "Title"),
        localizedText("text", "Body text"),
        localizedString("action", "Button label"),
        defineField({
          name: "hrefPageId",
          title: "Link to page",
          type: "string",
          description: "Which internal page the button links to.",
          options: { list: PAGE_OPTIONS },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title.de", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title: title ?? slug, subtitle: `/${slug}/` }),
  },
});
