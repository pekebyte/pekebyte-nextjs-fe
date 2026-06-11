import { Suspense } from "react";
import PortfolioClient from "../../portfolio-client";

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  return (
    <Suspense fallback={<div>Cargando proyectos...</div>}>
      <PortfolioClient categorySlug={slug} />
    </Suspense>
  );
}
