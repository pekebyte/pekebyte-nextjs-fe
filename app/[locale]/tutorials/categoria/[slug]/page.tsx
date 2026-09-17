import { Suspense } from "react";
import TutorialClient from "../../tutorial-client";
import { getTutorialCategories, getTutorials } from "@/lib/wordpress";
import { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

export const revalidate = 3600;

export default async function CategoryPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await props.params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = getTranslations(locale);

  const categories = await getTutorialCategories(locale);
  const found = categories.find(c => c.slug === slug);
  const categoryId = found ? String(found.id) : undefined;
  const tutorials = await getTutorials(locale, categoryId);

  return (
    <Suspense fallback={<div>{t.loading.tutorials}</div>}>
      <TutorialClient categories={categories} tutorials={tutorials} categorySlug={slug} locale={locale} />
    </Suspense>
  );
}