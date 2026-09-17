import { notFound } from "next/navigation";
import { getPortfolioItemCategories, getPortfolioItem, getPortfolioItems, getMediaUrl } from "@/lib/wordpress";
import { getPortfolioMedia } from "@/lib/portfoliomedia";
import PortfolioDetail from "./PortfolioDetail";
import type { Metadata } from "next";
import { Locale, locales, SITE_URL, getLocalizedPath } from "@/lib/i18n";

type Params = { locale: string; slug: string };

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) => {
      const items = await getPortfolioItems(locale as Locale);
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
  const project = await getPortfolioItem(locale, resolvedParams.slug);

  if (!project) {
    return {};
  }

  const title = project.acf?.meta_title || project.title?.rendered || "Portfolio";
  const description = project.acf?.meta_description || "";
  const keywords = project.acf?.meta_keywords || "";

  let ogImageUrl = "";
  if (project.acf?.ogimage) {
    const media = await getMediaUrl(project.acf?.ogimage);
    ogImageUrl = media?.source_url || "";
  }

  const metadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical: SITE_URL + getLocalizedPath(`/portafolio/${resolvedParams.slug}`, locale),
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
          alt: project.title?.rendered || "Portfolio project",
        },
      ],
    };
  }
  return metadata;
}

export default async function Page(props: { params: Promise<Params> }) {
  const { locale: rawLocale, slug } = await props.params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const project = await getPortfolioItem(locale, slug);
  if (!project) {
    notFound();
  }
  const projectCategories = await getPortfolioItemCategories(locale, project['portfolio-category'] || []);

  const { mainImage, gallery } = await getPortfolioMedia(project);

  return <PortfolioDetail project={project} categories={projectCategories} mainImage={mainImage} gallery={gallery} locale={locale} />;
}