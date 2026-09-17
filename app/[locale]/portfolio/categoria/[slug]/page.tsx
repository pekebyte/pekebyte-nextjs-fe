import { Suspense } from "react";
import PortfolioClient from "../../portfolio-client";
import { getPortfolioItems, getPortfolioCategories } from "@/lib/wordpress";
import { getPortfolioMedia } from "@/lib/portfoliomedia";
import { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

export const revalidate = 3600;

export default async function CategoryPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await props.params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = getTranslations(locale);

  const categories = await getPortfolioCategories(locale);
  const found = categories.find(c => c.slug === slug);
  const categoryId = found ? String(found.id) : undefined;
  const items = await getPortfolioItems(locale, categoryId);

  const media = await Promise.all(
    items.map(async (item) => {
      const result = await getPortfolioMedia(item);
      return { id: item.id, mainImage: result.mainImage, gallery: result.gallery };
    })
  );

  return (
    <Suspense fallback={<div>{t.loading.projects}</div>}>
      <PortfolioClient categories={categories} items={items} media={media} categorySlug={slug} locale={locale} />
    </Suspense>
  );
}