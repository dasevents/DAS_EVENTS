import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { serviceDetails } from '../../data/service-details';

const SITE_URL = 'https://www.dasevents.in';
// Some services (e.g. corporate-events, social-events) have a richer dedicated top-level
// page — their /services/:slug page must canonicalize to that page, not to itself.
const SERVICE_CANONICAL_OVERRIDES = new Map(
  serviceDetails
    .filter((s) => s.to !== `/services/${s.slug}`)
    .map((s) => [`/services/${s.slug}`, s.to])
);
const STATIC_PATHS = new Set([
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/blog',
  '/corporate-events',
  '/social-events',
  '/contact',
  '/privacy',
  '/cookies',
  '/terms',
]);
const DYNAMIC_PATHS = [
  /^\/services\/[^/]+$/,
  /^\/blog\/[^/]+$/,
  /^\/corporate-events\/[^/]+$/,
  /^\/social-events\/[^/]+$/,
];

function isKnownPath(pathname) {
  return STATIC_PATHS.has(pathname) || DYNAMIC_PATHS.some((pattern) => pattern.test(pathname));
}

export default function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    const knownPath = isKnownPath(normalizedPath);
    const canonical = document.querySelector('link[rel="canonical"]');
    const robots = document.querySelector('meta[name="robots"]');
    const openGraphUrl = document.querySelector('meta[property="og:url"]');

    if (!knownPath) {
      canonical?.remove();
      openGraphUrl?.remove();
      robots?.setAttribute('content', 'noindex, nofollow');
      return;
    }

    const canonicalPath = SERVICE_CANONICAL_OVERRIDES.get(normalizedPath) ?? normalizedPath;
    const pageUrl = new URL(canonicalPath, SITE_URL).toString();
    const canonicalLink = canonical || document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = pageUrl;

    if (!canonical) {
      document.head.appendChild(canonicalLink);
    }

    openGraphUrl?.setAttribute('content', pageUrl);
    robots?.setAttribute('content', 'index, follow');
  }, [pathname]);

  return null;
}