/**
 * Catch-all route mounting Sanity Studio at /studio. This is the client's
 * admin panel — no separate custom admin UI is built for trainers/gallery/
 * quotes/testimonials, Studio itself is it. Access is gated by each editor's
 * own Sanity account (invited at sanity.io/manage), not by app-level auth.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
