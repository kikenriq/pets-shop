/**
 * Canonical origin for metadata, Open Graph images and JSON-LD.
 *
 * Hardcoding a domain means OG tags point at the wrong host on preview
 * deploys and break locally, so this reads whatever the platform exposes and
 * falls back to localhost for `npm run dev`.
 *
 * Precedence: an explicit override first, then the host's own variable.
 *   NEXT_PUBLIC_SITE_URL                  set it yourself to force a value
 *   URL                                   Netlify, production
 *   VERCEL_PROJECT_PRODUCTION_URL         Vercel, production (no protocol)
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const netlify = process.env.URL;
  if (netlify) return netlify.replace(/\/$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;

  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Pet's Shop";
