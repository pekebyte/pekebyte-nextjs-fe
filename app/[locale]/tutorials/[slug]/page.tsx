import { notFound } from "next/navigation";
import { getTutorial, getTutorials, getMediaUrl } from "@/lib/wordpress";
import TutorialDetail from "./TutorialDetail";
import type { Metadata } from "next";
import { Locale, locales, SITE_URL, getLocalizedPath } from "@/lib/i18n";

type Params = { locale: string; slug: string };

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) => {
      const items = await getTutorials(locale as Locale);
      return items.map((item) => ({
        locale,
        slug: item.slug,
      }));
    })
  );
  return params.flat();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale === 'es' ? 'es' : 'en') as Locale;
  const tutorial = await getTutorial(locale, resolvedParams.slug);

  if (!tutorial) {
    return {};
  }

  const title = tutorial.acf?.meta_title || tutorial.title?.rendered || "Tutorial";
  const description = tutorial.acf?.meta_description || "";
  const keywords = tutorial.acf?.meta_keywords || "";

  let ogImageUrl = "";
  if (tutorial.acf?.ogimage) {
    const media = await getMediaUrl(tutorial.acf?.ogimage);
    ogImageUrl = media?.source_url || "";
  }

  const metadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical: SITE_URL + getLocalizedPath(`/tutorials/${resolvedParams.slug}`, locale),
    },
  };

  if (ogImageUrl != "") {
    metadata.openGraph = {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: tutorial.title?.rendered || "Tutorial",
        },
      ],
    };
  }
  return metadata;
}

export default async function TutorialDetailPage(props: { params: Promise<Params> }) {
  const { locale: rawLocale, slug } = await props.params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const tutorial = await getTutorial(locale, slug);
  if (!tutorial) {
    notFound();
  }

  return <TutorialDetail tutorial={tutorial} locale={locale} />;
}