import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { getPortfolioItems, getPortfolioCategories } from "@/lib/wordpress";
import { Suspense } from "react";

export const revalidate = 3600; // Revalidate every hour

async function PortfolioGrid({ category }: { category?: string }) {
  const items = await getPortfolioItems(category);
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="hover-scale overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={item.acf.image?.url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'}
              alt={item.acf.image?.alt || item.title.rendered}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle>{item.title.rendered}</CardTitle>
            <CardDescription>{item.acf.short_description || item.acf.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {item.acf.technologies?.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/portfolio/${item.slug}`}>Ver Detalles</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default async function Portfolio({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categories = await getPortfolioCategories();
  const selectedCategory = searchParams.category || 'Todos';

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
      <p className="text-muted-foreground mb-8">
        Explora mis proyectos y casos de estudio
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            asChild
            variant={selectedCategory === category ? "default" : "outline"}
          >
            <Link href={`/portfolio${category !== 'Todos' ? `?category=${category}` : ''}`}>
              {category}
            </Link>
          </Button>
        ))}
      </div>

      <Suspense fallback={<div>Cargando proyectos...</div>}>
        <PortfolioGrid category={selectedCategory !== 'Todos' ? selectedCategory : undefined} />
      </Suspense>
    </div>
  );
}
