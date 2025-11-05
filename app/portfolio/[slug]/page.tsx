import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { getPortfolioItem, getPortfolioItems } from "@/lib/wordpress";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";

export async function generateStaticParams() {
  const items = await getPortfolioItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function PortfolioDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getPortfolioItem(params.slug);

  if (!project) {
    notFound();
  }

  const mediaItems = project.acf.gallery || [project.acf.image];

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/portfolio">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Portfolio
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{project.title.rendered}</h1>
          <Badge className="mb-4">{project.acf.category}</Badge>
          <p className="text-muted-foreground mb-6">{project.acf.description}</p>

          {mediaItems.length > 0 && (
            <Carousel className="w-full">
              <CarouselContent>
                {mediaItems.map((media, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={media.url}
                        alt={media.alt || `Media ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {mediaItems.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          )}
        </div>

        <div className="space-y-6">
          {project.acf.features && project.acf.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {project.acf.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Tecnologías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.acf.technologies?.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            {project.acf.demo_link && (
              <Button asChild className="flex-1">
                <a href={project.acf.demo_link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver Demo
                </a>
              </Button>
            )}
            {project.acf.github_link && (
              <Button asChild variant="outline" className="flex-1">
                <a href={project.acf.github_link} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Ver Código
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
