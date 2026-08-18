import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanity);
export const urlFor = (source: any) => builder.image(source);

export const q = {
  featuredPackages: `*[_type == "package" && featured == true]{
    _id, slug, title, summary, heroImage, specs
  }`,
  allPackages: `*[_type == "package"] | order(specs.priceFrom asc){
    _id, slug, title, summary, heroImage, specs
  }`,
  packageBySlug: `*[_type == "package" && slug.current == $slug][0]{
    _id, slug, title, summary, heroImage, heroVideo, specs, itinerary, included, notIncluded
  }`,
  practicalInfo: `*[_type == "practicalInfo"][0]`,
  siteSettings: `*[_type == "siteSettings"][0]`,
};