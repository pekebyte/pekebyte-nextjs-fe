"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPortfolioItems, getPortfolioCategories } from "@/lib/wordpress";
import { getPortfolioMedia } from "@/lib/portfoliomedia";

export default function PortfolioClient() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "Todos";

  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let [cats, projects] = await Promise.all([
        getPortfolioCategories(),
        getPortfolioItems(selectedCategory !== "Todos" ? selectedCategory : undefined),
      ]);
      cats = cats.filter(cat => cat !== "Sin categoría");
      setCategories(cats);
      setItems(projects);
      setLoading(false);
    }
    
    fetchData();
  }, [selectedCategory]);

  if (loading) {
    return <div>Cargando proyectos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Portafolio</h1>
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
            <Link href={`/portafolio${category !== "Todos" ? `?category=${category}` : ""}`}>
              {category}
            </Link>
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const { mainImage } = getPortfolioMedia(item);
          return (
            <Card key={item.id} className="hover-scale overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={mainImage?.source_url || "/placeholder.svg"}
                  alt={mainImage?.alt_text || ""}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <CardHeader>
                <CardTitle>{item.title.rendered}</CardTitle>
                <CardDescription>{item.acf.short_description || item.acf.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {item.acf.technologies?.map((tech, index) => (
                    <Badge key={`tech-${index}`} variant="secondary">
                      {tech.technology}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/portafolio/${item.slug}`}>Ver Detalles</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
