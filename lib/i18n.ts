export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split('/')[1];
  if (locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/');
  if (locales.includes(segments[1] as Locale)) {
    return '/' + segments.slice(2).join('/');
  }
  return pathname;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path === '/' ? '' : path}`;
}

export function getAlternateLinks(pathname: string) {
  const path = getPathWithoutLocale(pathname);
  return locales.map((locale) => ({
    locale,
    href: getLocalizedPath(path, locale),
  }));
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

export const SITE_URL = 'https://pekebyte.com';

export function buildAlternates(path: string, locale: Locale) {
  return {
    canonical: SITE_URL + getLocalizedPath(path, locale),
    languages: Object.fromEntries(
      locales.map((loc) => [loc, SITE_URL + getLocalizedPath(path, loc)])
    ),
  };
}
