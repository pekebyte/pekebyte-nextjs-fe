import { notFound } from "next/navigation";
import { getTutorial, getTutorials, getMediaUrl } from "@/lib/wordpress";
import TutorialDetail from "./TutorialDetail";
import type { Metadata } from "next";

type Category = {
  id: number;
  name: string;
  slug: string;
};

export async function generateStaticParams() {
  const items = await getTutorials();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Desempaquetar la promesa de params
  const resolvedParams = await params;
  const tutorial = await getTutorial(resolvedParams.slug);

  if (!tutorial) {
    return {};
  }

  const title = tutorial.acf?.meta_title || tutorial.title?.rendered || "Portfolio";
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
          alt: tutorial.title?.rendered || "Tutorial",
        },
      ],
    };
  }
  return metadata;
}

export default async function TutorialDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const tutorial = await getTutorial(slug);
  if (!tutorial) {
    notFound();
  }

  return <TutorialDetail tutorial={tutorial} />;
}