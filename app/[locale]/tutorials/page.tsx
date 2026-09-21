import { Suspense } from "react";
import TutorialClient from "./tutorial-client";
import type { Metadata } from "next";
import { getTutorialCategories, getTutorials } from "@/lib/wordpress";
import { Locale, buildAlternates } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  const title = isEs ? "Pekebyte - Tutoriales" : "Pekebyte - Tutorials";
  const description = isEs
    ? "Descubre tutoriales detallados de Pekebyte sobre desarrollo web, diseño y soluciones digitales para mejorar tus habilidades técnicas."
    : "Discover detailed Pekebyte tutorials on web development, design, and digital solutions to improve your technical skills.";
  const keywords = isEs
    ? "Tutoriales, Desarrollo Web, Diseño, Soluciones Digitales, Pekebyte"
    : "Tutorials, Web Development, Design, Digital Solutions, Pekebyte";
  const ogImageUrl = "/metadata/tutoriales.jpg";

  return {
    title,
    description,
    keywords,
    alternates: buildAlternates("/tutorials", locale as Locale),
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Tutorials page" }],
    },
  };
}

export default async function TutorialesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = getTranslations(locale);

  const [categories, tutorials] = await Promise.all([
    getTutorialCategories(locale),
    getTutorials(locale),
  ]);

  return (
    <Suspense fallback={<div>{t.loading.tutorials}</div>}>
      <TutorialClient categories={categories} tutorials={tutorials} locale={locale} />
    </Suspense>
  );
}