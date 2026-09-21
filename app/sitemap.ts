import { MetadataRoute } from 'next';
import { getPortfolioItems, getTutorials } from '@/lib/wordpress';
import { locales, getLocalizedPath, Locale } from '@/lib/i18n';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pekebyte.com';

  const staticPaths = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/tutorials', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  // Static pages share the same path across locales, so we can declare alternates.
  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap((page) =>
    locales.map((locale) => ({
      url: baseUrl + getLocalizedPath(page.path, locale as Locale),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, baseUrl + getLocalizedPath(page.path, loc as Locale)])
        ),
      },
    }))
  );

  try {
    const dynamicPages: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
      const portfolioItems = await getPortfolioItems(locale as Locale);
      portfolioItems.forEach((item) => {
        dynamicPages.push({
          url: baseUrl + getLocalizedPath(`/portfolio/${item.slug}`, locale as Locale),
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });

      const tutorials = await getTutorials(locale as Locale);
      tutorials.forEach((item) => {
        dynamicPages.push({
          url: baseUrl + getLocalizedPath(`/tutorials/${item.slug}`, locale as Locale),
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    }

    return staticPages.concat(dynamicPages);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}