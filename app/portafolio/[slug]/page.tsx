import { notFound } from "next/navigation";
import { getPortfolioItemCategories, getPortfolioItem, getPortfolioItems } from "@/lib/wordpress";
import PortfolioDetail from "./PortfolioDetail";

export async function generateStaticParams() {
  const items = await getPortfolioItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = await getPortfolioItem(slug);
  const projectCategories = await getPortfolioItemCategories(project.categories || []);
  if (!project) {
    notFound();
  }

  return <PortfolioDetail project={project} categories={projectCategories} />;
}
