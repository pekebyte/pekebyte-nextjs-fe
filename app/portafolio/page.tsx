import { Suspense } from "react";
import PortfolioClient from "./portfolio-client";
import type { Metadata } from "next";
import { getPortfolioItems, getPortfolioCategories } from "@/lib/wordpress";
import { getPortfolioMedia } from "@/lib/portfoliomedia";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {

  const title = "Pekebyte - Portafolio";
  const description = "Explora los proyectos destacados de Pekebyte, demostrando habilidades en desarrollo web, diseño y soluciones digitales innovadoras.";
  const keywords = "Portfolio, Proyectos, Desarrollo Web, Diseño, Soluciones Digitales, Pekebyte";
  const ogImageUrl = "/metadata/portafolio.jpg"

  const metadata: Metadata = {
    title,
    description,
    keywords,
  };

  metadata.openGraph = {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Portfolio page",
        },
      ],
    };

  return metadata;
}

export default async function PortfolioPage() {
  const [categories, items] = await Promise.all([
    getPortfolioCategories(),
    getPortfolioItems(),
  ]);

  const media = await Promise.all(
    items.map(async (item) => {
      const result = await getPortfolioMedia(item);
      return { id: item.id, mainImage: result.mainImage, gallery: result.gallery };
    })
  );

  return (
    <Suspense fallback={<div>Cargando proyectos...</div>}>
      <PortfolioClient categories={categories} items={items} media={media} />
    </Suspense>
  );
}
