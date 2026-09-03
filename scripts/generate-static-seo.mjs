// Post-build step: writes per-route dist/<route>/index.html copies with the
// correct canonical/og:url baked in. vercel.json has explicit rewrites
// mapping each of these exact routes to their index.html — keep both in sync
// when adding/removing static pages or data-driven slugs.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const siteUrl = 'https://www.dasevents.in';

function extractValues(filePath, key) {
  const src = readFileSync(filePath, 'utf8');
  const re = new RegExp(`${key}:\\s*'([^']+)'`, 'g');
  return [...new Set([...src.matchAll(re)].map((m) => m[1]))];
}

const blogSlugs = extractValues(join(root, 'src/data/blog.js'), 'id');
const corporateSlugs = extractValues(join(root, 'src/data/corporate-events.js'), 'id');
const socialSlugs = extractValues(join(root, 'src/data/social-events.js'), 'id');
const serviceSlugs = extractValues(join(root, 'src/data/service-details.js'), 'slug');

const staticRoutes = [
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
];

const routes = [
  ...staticRoutes,
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  ...corporateSlugs.map((slug) => `/corporate-events/${slug}`),
  ...socialSlugs.map((slug) => `/social-events/${slug}`),
  ...serviceSlugs.map((slug) => `/services/${slug}`),
];

const template = readFileSync(join(distDir, 'index.html'), 'utf8');

for (const route of routes) {
  const canonicalUrl = `${siteUrl}${route}`;
  const html = template
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

  const outDir = join(distDir, route.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
}

console.log(`generate-static-seo: wrote ${routes.length} route(s) with corrected canonical tags.`);
