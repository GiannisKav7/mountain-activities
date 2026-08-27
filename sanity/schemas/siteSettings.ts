import { defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "de", title: "German", type: "string", validation: (r) => r.required() }),
      defineField({ name: "en", title: "English", type: "string", validation: (r) => r.required() }),
    ],
  });

const localizedText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "de", title: "German", type: "text", rows: 3, validation: (r) => r.required() }),
      defineField({ name: "en", title: "English", type: "text", rows: 3, validation: (r) => r.required() }),
    ],
  });

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      description: 'Appears in the navbar logo, footer, and page title defaults. E.g. "OLVIOS".',
      validation: (r) => r.required(),
    }),
    localizedString("tagline", "Short tagline (navbar)"),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "email", title: "Email address", type: "email" }),
    defineField({ name: "phone", title: "Phone number", type: "string" }),
    localizedString("defaultSeoTitle", "Default SEO title"),
    localizedText("defaultSeoDescription", "Default SEO description"),
    localizedString("skipToContent", "Skip-to-content link label"),
    localizedString("onThisPage", '"On this page" navigation label'),
  ],
});
