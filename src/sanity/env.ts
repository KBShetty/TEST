// Central place for Sanity environment configuration. Pulls from
// NEXT_PUBLIC_* vars so both the Studio config (root sanity.config.ts) and
// the app's server components can read the same values.
//
// These are unset until the client creates a free Sanity project and fills
// in .env.local — see .env.example for the exact variable names and a link
// to sign up. Nothing in this file throws if they're missing; every fetch
// that depends on Sanity is written to fall back to static content instead
// (see src/content/*-fallback.ts and the components that consume them).

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
// Pinned API version (a date string) — pin rather than "latest" so Sanity's
// API can evolve without silently changing this app's query behavior.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

// True once the client has actually configured a project — every fetch
// helper checks this before calling Sanity at all, so an unconfigured
// project degrades straight to fallback content instead of erroring.
export const isSanityConfigured = Boolean(projectId);
