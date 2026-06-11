import { Suspense } from "react";
import TutorialClient from "../../tutorial-client";
import { getTutorialCategories, getTutorials } from "@/lib/wordpress";

export const revalidate = 3600;

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const categories = await getTutorialCategories();
  const found = categories.find(c => c.slug === slug);
  const categoryId = found ? String(found.id) : undefined;
  const tutorials = await getTutorials(categoryId);

  return (
    <Suspense fallback={<div>Cargando tutoriales...</div>}>
      <TutorialClient categories={categories} tutorials={tutorials} categorySlug={slug} />
    </Suspense>
  );
}
