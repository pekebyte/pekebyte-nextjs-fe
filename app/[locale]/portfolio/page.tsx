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

  const title = isEs ? "Pekebyte - Portafolio" : "Pekebyte - Portfolio";
  const description = isEs
    ? "Explora los proyectos destacados de Pekebyte, demostrando habilidades en desarrollo web, diseño y soluciones digitales innovadoras."
    : "Explore Pekebyte's featured projects, showcasing skills in web development, design, and innovative digital solutions.";
  const keywords = isEs
    ? "Portfolio, Proyectos, Desarrollo Web, Diseño, Soluciones Digitales, Pekebyte"
    : "Portfolio, Projects, Web Development, Design, Digital Solutions, Pekebyte";
  const ogImageUrl = "/metadata/portafolio.jpg";

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