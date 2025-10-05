// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  const routes = [
    { url: '', changeFrequency: 'hourly' as const, priority: 1.0 },
    { url: '/deploy', changeFrequency: 'daily' as const, priority: 0.9 },
    { url: '/tokens', changeFrequency: 'hourly' as const, priority: 0.9 },
    { url: '/faq', changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: '/bunker', changeFrequency: 'weekly' as const, priority: 0.5 },
  ];

  return routes.map((r) => ({
    url: `${base}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
