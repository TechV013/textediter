/**
 * Site-wide configuration.
 * Secrets must never live here — use PUBLIC_* env vars.
 */
export const SITE_NAME = 'TextFixer';
export const SITE_TAGLINE = 'Fast, private, no-login text utilities.';
export const SITE_DESCRIPTION =
  'Clean, transform, analyze, extract, and compare text in your browser. No signup. No uploads for normal tools.';

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.PUBLIC_SITE_URL as string | undefined;
  return (fromEnv || 'https://textfixer.com').replace(/\/$/, '');
}

export function getContactEmail(): string {
  const fromEnv = import.meta.env.PUBLIC_CONTACT_EMAIL as string | undefined;
  return fromEnv || 'hello@textfixer.com';
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
