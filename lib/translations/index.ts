import en from './en';
import es from './es';
import { Locale } from '@/lib/i18n';

const translations = { en, es } as const;

export type Translations = typeof en;

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en;
}
