import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTutorials, getTutorialCategories } from "@/lib/wordpress";
import { Clock, TrendingUp } from "lucide-react";
import { Suspense } from "react";

export const revalidate = 3600;

async function TutorialsGrid({ category }: { category?: string }) {
  const tutorials = await getTutorials(category);
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map((tutorial) => (
        <Link key={tutorial.id} href={`/tutorials/${tutorial.slug}`}>
          <Card className="hover-scale h-full">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={tutorial.acf.thumbnail?.url || tutorial._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'}
                alt={tutorial.acf.thumbnail?.alt || tutorial.title.rendered}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{tutorial.title.rendered}</CardTitle>
              <CardDescription className="line-clamp-2">{tutorial.acf.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{tutorial.acf.category}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {tutorial.acf.duration}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {tutorial.acf.level}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default async function Tutorials({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categories = await getTutorialCategories();
  const selectedCategory = searchParams.category || 'Todos';

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Tutoriales</h1>
      <p className="text-muted-foreground mb-8">
        Aprende desarrollo web con mis tutoriales paso a paso
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            asChild
            variant={selectedCategory === category ? "default" : "outline"}
          >
            <Link href={`/tutorials${category !== 'Todos' ? `?category=${category}` : ''}`}>
              {category}
            </Link>
          </Button>
        ))}
      </div>

      <Suspense fallback={<div>Cargando tutoriales...</div>}>
        <TutorialsGrid category={selectedCategory !== 'Todos' ? selectedCategory : undefined} />
      </Suspense>
    </div>
  );
}
