import { notFound } from "next/navigation";
import { getPortfolioItem, getPortfolioItems } from "@/lib/wordpress";
import PortfolioDetail from "./PortfolioDetail";

export async function generateStaticParams() {
  const items = await getPortfolioItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await getPortfolioItem(params.slug);

  if (!project) {
    notFound();
  }

  return <PortfolioDetail project={project} />;
}
