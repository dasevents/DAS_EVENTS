import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.dasevents.in';
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

    const pageUrl = new URL(normalizedPath, SITE_URL).toString();
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