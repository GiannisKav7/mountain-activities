import { mkdir, readFile, writeFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);

async function loadExport(path, exportName) {
  const source = await readFile(new URL(path, root), "utf8");
  const expression = source
    .replace(/export type[\s\S]*?\n};\s*/, "")
    .replace(new RegExp(`export const ${exportName}(?::[^=]+)?\\s*=\\s*`), "return ")
    .trim();

  // These local files contain data literals only; evaluating them avoids duplicating content.
  return Function(expression)();
}

const [de, en, demoPackages] = await Promise.all([
  loadExport("src/i18n/de.ts", "de"),
  loadExport("src/i18n/en.ts", "en"),
  loadExport("src/lib/demoPackages.ts", "demoPackages"),
]);

const localized = (deValue, enValue) => ({ de: deValue, en: enValue });
const localizedList = (deItems, enItems, key = "text") =>
  deItems.map((item, index) => ({ [key]: localized(item, enItems[index]) }));

const siteContent = {
  navigation: {
    packages: localized(de.nav.packages, en.nav.packages),
    whyGreece: localized(de.nav.whyGreece, en.nav.whyGreece),
    practicalInfo: localized(de.nav.practicalInfo, en.nav.practicalInfo),
    contact: localized(de.nav.contact, en.nav.contact),
  },
  inquireLabel: { label: localized(de.cta.inquire, en.cta.inquire) },
  footer: {
    tagline: localized(de.footer.tagline, en.footer.tagline),
    quickLinks: localized(de.footer.quickLinks, en.footer.quickLinks),
    contact: localized(de.footer.contact, en.footer.contact),
    rights: localized(de.footer.rights, en.footer.rights),
  },
  home: {
    hero: {
      kicker: localized(de.home.hero.kicker, en.home.hero.kicker),
      title: localized(de.home.hero.title, en.home.hero.title),
      subtitle: localized(de.home.hero.subtitle, en.home.hero.subtitle),
      ctaPrimary: localized(de.home.hero.ctaPrimary, en.home.hero.ctaPrimary),
      ctaSecondary: localized(de.home.hero.ctaSecondary, en.home.hero.ctaSecondary),
      stats: de.home.hero.stats.map((stat, index) => ({ value: localized(stat.value, en.home.hero.stats[index].value), label: localized(stat.label, en.home.hero.stats[index].label) })),
    },
    gallery: {
      cta: localized(de.home.gallery.cta, en.home.gallery.cta),
      caption: localized(de.home.gallery.caption, en.home.gallery.caption),
      alt: localizedList(de.home.gallery.alt, en.home.gallery.alt),
    },
    welcome: {
      eyebrow: localized(de.home.welcome.eyebrow, en.home.welcome.eyebrow),
      title: localized(de.home.welcome.title, en.home.welcome.title),
      body: localized(de.home.welcome.body, en.home.welcome.body),
    },
    philosophy: {
      eyebrow: localized(de.home.philosophy.eyebrow, en.home.philosophy.eyebrow),
      title: localized(de.home.philosophy.title, en.home.philosophy.title),
      body: localized(de.home.philosophy.body, en.home.philosophy.body),
      pillars: de.home.philosophy.pillars.map((pillar, index) => ({ title: localized(pillar.title, en.home.philosophy.pillars[index].title), text: localized(pillar.text, en.home.philosophy.pillars[index].text) })),
    },
    packages: {
      heading: localized(de.home.packages.heading, en.home.packages.heading),
      subtitle: localized(de.home.packages.subtitle, en.home.packages.subtitle),
      difficulty: localized(de.home.packages.difficulty, en.home.packages.difficulty),
      viewAll: localized(de.home.packages.viewAll, en.home.packages.viewAll),
    },
  },
};

const documents = [
  {
    _id: "site-content",
    _type: "siteContent",
    title: "Website content",
    ...siteContent,
  },
  ...demoPackages.de.map((dePackage) => {
    const enPackage = demoPackages.en.find((item) => item.slug === dePackage.slug);

    if (!enPackage) {
      throw new Error(`Missing English package for "${dePackage.slug}".`);
    }

    return {
      _id: `package-${dePackage.slug}`,
      _type: "package",
      title: { de: dePackage.title, en: enPackage.title },
      slug: { _type: "slug", current: dePackage.slug },
      summary: { de: dePackage.summary, en: enPackage.summary },
      specs: {
        duration: { de: dePackage.duration, en: enPackage.duration },
        accommodation: { de: dePackage.accommodation, en: enPackage.accommodation },
        difficultyRating: dePackage.difficulty,
        activityType: { de: dePackage.activityType, en: enPackage.activityType },
        priceFrom: dePackage.priceFrom,
      },
      featured: true,
    };
  }),
];

const outputDirectory = new URL("../import/", import.meta.url);
const outputFile = new URL("initial-content.ndjson", outputDirectory);

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, `${documents.map((document) => JSON.stringify(document)).join("\n")}\n`);

console.log(`Wrote ${documents.length} documents to ${outputFile.pathname}`);
