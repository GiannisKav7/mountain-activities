import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanitySettings, SanitySiteContent, SanityPage, SanityPackage } from "./sanityTypes";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanity);
export const urlFor = (source: any) => builder.image(source);

// Returns true when both Sanity env vars are present.
export const isSanityConfigured = () =>
  !!(import.meta.env.PUBLIC_SANITY_PROJECT_ID && import.meta.env.PUBLIC_SANITY_DATASET);

// Fetch from Sanity, returning null on any error (missing env vars, network, etc.)
export async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await sanity.fetch<T>(query, params ?? {});
  } catch {
    return null;
  }
}

// GROQ queries
export const q = {
  // Homepage + nav/footer site copy
  siteContent: `*[_type == "siteContent"][0]`,

  // Global settings (brand, SEO defaults, address, etc.)
  siteSettings: `*[_type == "siteSettings"][0]`,

  // Featured packages for the homepage grid
  featuredPackages: `*[_type == "package" && featured == true]{
    _id, slug, title, summary, heroImage, specs
  }`,

  // All packages ordered by price (for the all-packages listing)
  allPackages: `*[_type == "package"] | order(specs.priceFrom asc){
    _id, slug, title, summary, heroImage, specs
  }`,

  // All package slugs — used by getStaticPaths
  allPackageSlugs: `*[_type == "package"]{ "slug": slug.current }`,

  // Single package detail
  packageBySlug: `*[_type == "package" && slug.current == $slug][0]{
    _id, slug, title, summary, heroImage, heroVideo, specs,
    itinerary, included, notIncluded, gallery, seoTitle, seoDescription
  }`,

  // All content page slugs — used by getStaticPaths
  allPageSlugs: `*[_type == "page"]{ "slug": slug.current }`,

  // Single content page by slug
  pageBySlug: `*[_type == "page" && slug.current == $slug][0]`,
};

// Convenience typed wrappers

export const fetchSiteContent = () =>
  safeFetch<SanitySiteContent>(q.siteContent);

export const fetchSiteSettings = () =>
  safeFetch<SanitySettings>(q.siteSettings);

export const fetchPageBySlug = (slug: string) =>
  safeFetch<SanityPage>(q.pageBySlug, { slug });

export const fetchPackageBySlug = (slug: string) =>
  safeFetch<SanityPackage>(q.packageBySlug, { slug });
