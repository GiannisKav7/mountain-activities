// TypeScript types for Sanity CMS document shapes.
// These mirror the Sanity schemas in sanity/schemas/.

export type Localized<T = string> = { de: T; en: T };

// siteSettings document
export type SanitySettings = {
  brandName: string;
  tagline?: Localized;
  address?: string;
  email?: string;
  phone?: string;
  defaultSeoTitle?: Localized;
  defaultSeoDescription?: Localized;
  skipToContent?: Localized;
  onThisPage?: Localized;
};

// siteContent document — navigation + footer + all homepage sections
export type SanitySiteContent = {
  navigation?: {
    activities?: Localized;
    region?: Localized;
    about?: Localized;
    practicalInformation?: Localized;
    contact?: Localized;
  };
  inquireLabel?: { label?: Localized };
  footer?: {
    tagline?: Localized;
    quickLinks?: Localized;
    contact?: Localized;
    contactText?: Localized;
    rights?: Localized;
  };
  home?: {
    seo?: { title?: Localized; description?: Localized };
    hero?: {
      kicker?: Localized;
      title?: Localized;
      subtitle?: Localized;
      ctaPrimary?: Localized;
      ctaSecondary?: Localized;
      stats?: Array<{ _key: string; value?: Localized; label?: Localized }>;
    };
    gallery?: {
      caption?: Localized;
      cta?: Localized;
      images?: Array<{
        _key: string;
        image?: any; // Sanity image reference
        alt?: Localized;
      }>;
    };
    welcome?: {
      eyebrow?: Localized;
      title?: Localized;
      body?: Localized;
    };
    philosophy?: {
      eyebrow?: Localized;
      title?: Localized;
      body?: Localized;
      pillars?: Array<{
        _key: string;
        icon?: string;
        title?: Localized;
        text?: Localized;
      }>;
    };
    packages?: {
      heading?: Localized;
      subtitle?: Localized;
      difficulty?: Localized;
      viewAll?: Localized;
      pricePrefix?: Localized;
    };
  };
};

// page document — content pages (activities, region, about, etc.)
export type SanityPageItem = {
  _key: string;
  eyebrow?: Localized;
  title?: Localized;
  text?: Localized;
  meta?: { de?: string[]; en?: string[] };
  note?: Localized;
  href?: string;
  linkLabel?: Localized;
};

export type SanityPageSection = {
  _key: string;
  id: string;
  eyebrow?: Localized;
  title?: Localized;
  intro?: Localized;
  layout?: "cards" | "list" | "timeline" | "paragraphs";
  items?: SanityPageItem[];
  paragraphs?: Array<{ _key: string; de?: string; en?: string }>;
  note?: Localized;
};

export type SanityPage = {
  _id: string;
  slug: { current: string };
  seoTitle?: Localized;
  seoDescription?: Localized;
  eyebrow?: Localized;
  title?: Localized;
  intro?: Localized;
  highlights?: Array<{ _key: string; value?: Localized; label?: Localized }>;
  sections?: SanityPageSection[];
  closing?: {
    eyebrow?: Localized;
    title?: Localized;
    text?: Localized;
    action?: Localized;
    hrefPageId?: string;
  };
};

// package document
export type SanityPackage = {
  _id: string;
  slug: { current: string };
  title?: Localized;
  summary?: Localized;
  heroImage?: any;
  heroVideo?: string;
  specs?: {
    duration?: Localized;
    accommodation?: Localized;
    difficultyRating?: number;
    activityType?: Localized;
    priceFrom?: number;
  };
  itinerary?: Array<{
    _key: string;
    day?: number;
    title?: Localized;
    description?: Localized;
  }>;
  included?: Array<{ _key: string; de?: string; en?: string }>;
  notIncluded?: Array<{ _key: string; de?: string; en?: string }>;
  gallery?: Array<{ _key: string; image?: any; alt?: Localized }>;
  seoTitle?: Localized;
  seoDescription?: Localized;
  featured?: boolean;
};
