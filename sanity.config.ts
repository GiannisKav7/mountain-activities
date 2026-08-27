import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import packageSchema from "./sanity/schemas/packages";
import pageSchema from "./sanity/schemas/page";
import siteContentSchema from "./sanity/schemas/siteContent";
import siteSettingsSchema from "./sanity/schemas/siteSettings";

export default defineConfig({
  name: "default",
  title: "Mountain Activities",
  projectId: "hcb5g1w0",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [siteSettingsSchema, siteContentSchema, pageSchema, packageSchema],
  },
});
