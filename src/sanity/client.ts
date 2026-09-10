import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

// Public/read client — no token needed since the dataset is public-read by
// default and none of this content (trainers, gallery, quotes, testimonials)
// is sensitive. `useCdn: true` serves fast, edge-cached reads; combined with
// each fetch's own `next.revalidate` window (see queries.ts consumers), an
// admin edit in Studio still reaches the live site automatically within
// that window, with no redeploy.
export const sanityClient = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
