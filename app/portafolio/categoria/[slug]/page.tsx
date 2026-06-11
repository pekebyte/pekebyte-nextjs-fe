import { Suspense } from "react";
import PortfolioClient from "../../portfolio-client";
import { getPortfolioItems, getPortfolioCategories } from "@/lib/wordpress";
import { getPortfolioMedia } from "@/lib/portfoliomedia";

export const revalidate = 3600;

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const categories = await getPortfolioCategories();
  const found = categories.find(c => c.slug === slug);
  const categoryId = found ? String(found.id) : undefined;
  const items = await getPortfolioItems(categoryId);

  const media = await Promise.all(
    items.map(async (item) => {
      const result = await getPortfolioMedia(item);
      return { id: item.id, mainImage: result.mainImage, gallery: result.gallery };
    })
  );

  return (
    <Suspense fallback={<div>Cargando proyectos...</div>}>
      <PortfolioClient categories={categories} items={items} media={media} categorySlug={slug} />
    </Suspense>
  );
}
