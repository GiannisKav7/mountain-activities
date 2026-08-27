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
    defineField({
      name: "title",
      type: "string",
      initialValue: "Website content",
      validation: (rule) => rule.required(),
    }),

    // ── Navigation ──────────────────────────────────────────────────
    defineField({
      name: "navigation",
      title: "Navigation labels",
      type: "object",
      fields: [
        localizedString("activities", "Activities"),
        localizedString("region", "The Region"),
        localizedString("about", "About"),
        localizedString("practicalInformation", "Practical Information"),
        localizedString("contact", "Contact"),
      ],
    }),

    defineField({
      name: "inquireLabel",
      title: "Inquiry button",
      type: "object",
      fields: [localizedString("label", "Label")],
    }),

    // ── Footer ──────────────────────────────────────────────────────
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        localizedText("tagline", "Tagline"),
        localizedString("quickLinks", "Quick links heading"),
        localizedString("contact", "Contact heading"),
        localizedText("contactText", "Contact column body text"),
        localizedString("rights", "Copyright notice"),
      ],
    }),

    // ── Homepage ────────────────────────────────────────────────────
    defineField({
      name: "home",
      title: "Homepage",
      type: "object",
      fields: [
        // SEO for the homepage
        defineField({
          name: "seo",
          title: "Homepage SEO",
          type: "object",
          fields: [
            localizedString("title", "Page title (<title>)"),
            localizedText("description", "Meta description"),
          ],
        }),

        // Hero section
        defineField({
          name: "hero",
          type: "object",
          fields: [
            localizedString("kicker", "Kicker badge"),
            localizedString("title", "Headline"),
            localizedText("subtitle", "Subtitle paragraph"),
            localizedString("ctaPrimary", "Primary button"),
            localizedString("ctaSecondary", "Secondary button"),
            defineField({
              name: "stats",
              title: "Stat cards",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [localizedString("value", "Value"), localizedString("label", "Label")],
                }),
              ],
            }),
          ],
        }),

        // Gallery section
        defineField({
          name: "gallery",
          type: "object",
          fields: [
            localizedString("caption", "Caption overlay (on first image)"),
            localizedString("cta", "Button label"),
            defineField({
              name: "images",
              title: "Gallery images",
              description: "Upload 4 images for the best layout. First image is large; last spans two columns.",
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
          ],
        }),

        // Welcome section
        defineField({
          name: "welcome",
          type: "object",
          fields: [
            localizedString("eyebrow", "Eyebrow"),
            localizedString("title", "Title"),
            localizedText("body", "Body"),
          ],
        }),

        // Philosophy section
        defineField({
          name: "philosophy",
          type: "object",
          fields: [
            localizedString("eyebrow", "Eyebrow"),
            localizedString("title", "Title"),
            localizedText("body", "Body"),
            defineField({
              name: "pillars",
              title: "Pillars",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          { title: "People / Groups", value: "users" },
                          { title: "House / Local", value: "home" },
                          { title: "Globe / Nature", value: "globe" },
                        ],
                        layout: "radio",
                      },
                    }),
                    localizedString("title", "Title"),
                    localizedText("text", "Text"),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Featured packages section labels
        defineField({
          name: "packages",
          title: "Featured packages section",
          type: "object",
          fields: [
            localizedString("heading", "Heading"),
            localizedText("subtitle", "Subtitle"),
            localizedString("difficulty", "Difficulty label"),
            localizedString("viewAll", "View all button"),
            localizedString("pricePrefix", 'Price prefix (e.g. "ab " / "from ")'),
          ],
        }),
      ],
    }),
  ],
});
