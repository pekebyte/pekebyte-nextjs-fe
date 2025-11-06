import { notFound } from "next/navigation";
import { getPortfolioItemCategories, getPortfolioItem, getPortfolioItems, getMediaUrl } from "@/lib/wordpress";
import PortfolioDetail from "./PortfolioDetail";
import type { Metadata } from "next";

type Category = {
  id: number;
  name: string;
  slug: string;
};

export async function generateStaticParams() {
  const items = await getPortfolioItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Desempaquetar la promesa de params
  const resolvedParams = await params;
  const project = await getPortfolioItem(resolvedParams.slug);

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
  };
  
  if (ogImageUrl!="") {
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

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = await getPortfolioItem(slug);
  const projectCategories = await getPortfolioItemCategories(project['portfolio-category'] || []);
  if (!project) {
    notFound();
  }

  return <PortfolioDetail project={project} categories={projectCategories} />;
}
