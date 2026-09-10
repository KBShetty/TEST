import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./env";

const builder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * Build a Sanity CDN image URL from an image field's asset reference.
 * Returns null when Sanity isn't configured or the source is missing, so
 * every caller can fall back to a static image instead of rendering a
 * broken <img>.
 */
export function urlFor(source: Image | null | undefined) {
  if (!builder || !source) return null;
  return builder.image(source);
}
