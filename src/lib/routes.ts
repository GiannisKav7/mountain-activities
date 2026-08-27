// Supported language codes. Used throughout the site for routing and i18n.
export type Lang = "de" | "en";

// All page IDs used across the site.
// Add a new ID here when you add a new content page.
export const pageIds = [
  "activities",
  "region",
  "about",
  "practicalInformation",
  "contact",
] as const;

export type PageId = (typeof pageIds)[number];

// Maps each page ID to the slug that appears in the URL.
// "practicalInformation" gets a hyphenated slug so the URL stays readable.
export const pageSlugs: Record<PageId, string> = {
  activities: "activities",
  region: "region",
  about: "about",
  practicalInformation: "practical-information",
  contact: "contact",
};

// Reverse-lookup: URL slug → PageId (e.g. "practical-information" → "practicalInformation")
export const slugToPageId: Record<string, PageId> = Object.fromEntries(
  Object.entries(pageSlugs).map(([id, slug]) => [slug, id as PageId]),
);

// Pages shown in the main nav bar (contact is displayed separately as a CTA button).
export const primaryNavigation: PageId[] = [
  "activities",
  "region",
  "about",
  "practicalInformation",
];

// Returns the home path for a given language, e.g. "/de/"
export function getHomePath(lang: Lang) {
  return `/${lang}/`;
}

// Returns the full path for a content page, e.g. "/de/activities/"
export function getPagePath(lang: Lang, pageId: PageId) {
  return `/${lang}/${pageSlugs[pageId]}/`;
}

// Flips the language prefix in the current URL so the language switcher
// always points to the same page in the other language.
// Example: "/de/activities/" → "/en/activities/"
export function getLanguageSwitchPath(pathname: string, lang: Lang) {
  const targetLang = lang === "de" ? "en" : "de";
  const suffix = pathname.replace(/^\/(de|en)(?=\/|$)/, "");
  return `/${targetLang}${suffix || "/"}`;
}
