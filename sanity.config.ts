import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import packageSchema from "./sanity/schemas/packages";
import siteContentSchema from "./sanity/schemas/siteContent";

export default defineConfig({
  name: "default",
  title: "Mountain Activities",
  projectId: "hcb5g1w0",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [packageSchema, siteContentSchema],
  },
});
