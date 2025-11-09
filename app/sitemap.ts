import { MetadataRoute } from 'next';
import { getPortfolioItems, getTutorials } from '@/lib/wordpress';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pekebyte.com';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: baseUrl + '/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: baseUrl + '/portafolio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: baseUrl + '/tutoriales',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: baseUrl + '/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  try {
    const portfolioItems = await getPortfolioItems();
    const portfolioPages: MetadataRoute.Sitemap = portfolioItems.map((item) => ({
      url: baseUrl + '/portafolio/' + item.slug,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const tutorials = await getTutorials();
    const tutorialPages: MetadataRoute.Sitemap = tutorials.map((item) => ({
      url: baseUrl + '/tutoriales/' + item.slug,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const allPages = staticPages.concat(portfolioPages).concat(tutorialPages);
    return allPages;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}