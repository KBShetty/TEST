/**
 * Sanity Studio configuration — mounted at /studio (see
 * src/app/studio/[[...tool]]/page.tsx). This IS the client's no-code admin
 * panel for trainers, gallery photos/videos, motivational quotes, and
 * testimonials: upload/edit/delete here, and it reaches the live site
 * automatically within the site's revalidation window (~60s), no redeploy.
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET to be
 * set in .env.local — see .env.example for setup instructions.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "aurea-fitness-studio",
  title: "Aurea Fitness — Content",
  projectId,
  dataset,
  basePath: "/studio",
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
