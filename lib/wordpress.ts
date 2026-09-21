import { PortfolioItem, Tutorial, Page, ACFImageTwo } from '@/types/wordpress';
import { Locale } from '@/lib/i18n';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost/wp-json/wp/v2';

type Category = {
  id: number;
  name: string;
  slug: string;
};

function langParam(locale: Locale): string {
  return `&lang=${locale}`;
}

function localeFromLink(link: string | undefined): Locale {
  if (!link) return 'en';
  try {
    const first = new URL(link).pathname.split('/')[1];
    return first === 'es' ? 'es' : 'en';
  } catch {
    return 'en';
  }
}

function filterByLocale<T extends { link?: string }>(items: T[], locale: Locale): T[] {
  return items.filter((item) => localeFromLink(item.link) === locale);
}

async function fetchAPI(endpoint: string, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(`${WP_API_URL}${endpoint}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    console.error(`Failed to fetch ${endpoint}:`, res.statusText);
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

// Portfolio Functions
export async function getPortfolioItems(locale: Locale, category?: string): Promise<PortfolioItem[]> {
  const categoryQuery = category && category !== 'Todos' ? `&portfolio-category=${category}` : '';
  const data = await fetchAPI(`/portfolio?_embed${categoryQuery}&per_page=100${langParam(locale)}`);
  return filterByLocale(data, locale);
}

export async function getPortfolioItem(locale: Locale, slug: string): Promise<PortfolioItem | undefined> {
  const data = await fetchAPI(`/portfolio?slug=${slug}&_embed${langParam(locale)}`);
  const item = data[0];
  return item && localeFromLink(item.link) === locale ? item : undefined;
}

export async function getPortfolioCategories(locale: Locale): Promise<Category[]> {
  const data = await fetchAPI(`/portfolio-category?_embed&per_page=100${langParam(locale)}`);
  return data;
}

export async function getPortfolioItemCategories(locale: Locale, categoryIds: number[]): Promise<Category[]> {
  const data = await fetchAPI(`/portfolio-category?_embed&include=${categoryIds.join(',')}${langParam(locale)}`);
  return data;
}

// Tutorial Functions
export async function getTutorials(locale: Locale, category?: string): Promise<Tutorial[]> {
  const categoryQuery = category && category !== 'Todos' ? `&tutorial-category=${category}` : '';
  let data = await fetchAPI(`/tutorial?_embed${categoryQuery}&per_page=100${langParam(locale)}`);
  data = await Promise.all(
    data.map(async (tutorial: Tutorial) => {
      tutorial.acf.thumbnail_url = await getMediaUrl(tutorial.acf.thumbnail);
      return tutorial;
    })
  );
  return filterByLocale(data, locale);
}

export async function getTutorial(locale: Locale, slug: string): Promise<Tutorial | undefined> {
  const data = await fetchAPI(`/tutorial?slug=${slug}&_embed${langParam(locale)}`);
  const item = data[0];
  return item && localeFromLink(item.link) === locale ? item : undefined;
}

export async function getTutorialCategories(locale: Locale): Promise<Category[]> {
  const data = await fetchAPI(`/tutorial-category?_embed&per_page=100${langParam(locale)}`);
  return data;
}

// Page Functions
export async function getPage(locale: Locale, slug: string): Promise<Page> {
  const data = await fetchAPI(`/pages?slug=${slug}${langParam(locale)}`);
  return data[0];
}

// Contact Form
export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(`${WP_API_URL.replace('/wp/v2', '')}/contact-form-7/v1/contact-forms/YOUR_FORM_ID/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}

export async function getMediaUrl(id: number): Promise<ACFImageTwo | null> {
  const data = await fetchAPI(`/media/${id}`);
  return data || null;
}
