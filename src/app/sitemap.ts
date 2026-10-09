import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mahoganybeachroatan.com';
  const locales = ['en', 'es', 'zh'];
  const routes = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];
  const topicRoutes = ['/roatan-cruise-ports', '/isla-tropicale-roatan'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
      });
    }
    for (const route of topicRoutes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return sitemap;
}
