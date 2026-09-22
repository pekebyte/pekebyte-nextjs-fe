import { Suspense } from "react";
import PortfolioClient from "./portfolio-client";
import type { Metadata } from "next";
import { getPortfolioItems, getPortfolioCategories } from "@/lib/wordpress";
import { getPortfolioMedia } from "@/lib/portfoliomedia";
import { Locale, buildAlternates } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  const title = isEs ? "Portafolio — Pedro Molina, Desarrollador Shopify & WordPress" : "Portfolio — Pedro Molina, Shopify & WordPress Developer";
  const description = isEs
    ? "Proyectos destacados de Pedro Molina: apps de Shopify con integración de IA, sitios headless en WordPress y desarrollo full stack para clientes internacionales."
    : "Featured projects by Pedro Molina: AI-integrated Shopify apps, headless WordPress builds, and full stack development for international clients.";
  const keywords = isEs
  ? "portafolio Shopify, portafolio WordPress, apps con IA, proyectos full stack, WordPress headless"
  : "Shopify portfolio, WordPress portfolio, AI apps, full stack projects, headless WordPress";
  const ogImageUrl = isEs ? "/metadata/portafolio.jpg" : "/metadata/portfolio.jpeg";

  return {
    title,
    description,
    keywords,
    alternates: buildAlternates("/portfolio", locale as Locale),
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Portfolio page" }],
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = getTranslations(locale);

  const [categories, items] = await Promise.all([
    getPortfolioCategories(locale),
    getPortfolioItems(locale),
  ]);

  const media = await Promise.all(
    items.map(async (item) => {
      const result = await getPortfolioMedia(item);
      return { id: item.id, mainImage: result.mainImage, gallery: result.gallery };
    })
  );

  return (
    <Suspense fallback={<div>{t.loading.projects}</div>}>
      <PortfolioClient categories={categories} items={items} media={media} locale={locale} />
    </Suspense>
  );
}