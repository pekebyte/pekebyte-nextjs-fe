"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPortfolioMedia } from "@/lib/portfoliomedia";

export default function PortfolioDetail({ project }) {
  const { mainImage, gallery } = getPortfolioMedia(project);

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/portafolio">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Portafolio
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{project.title.rendered}</h1>
          <Badge className="mb-4">{project.acf.category}</Badge>
          <p className="text-muted-foreground mb-6">{project.acf.description}</p>

          {gallery.length > 0 && (
            <Carousel className="w-full">
              <CarouselContent>
                {gallery.map((media, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={media.source_url || "/placeholder.svg"}
                        alt={media.alt_text || `Media`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {gallery.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          )}
        </div>

        <div className="space-y-6">
          {project.acf.features?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {project.acf.features.map((item, index) => (
                    <li key={index}>{item.feature}</li>
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
                {project.acf.technologies?.map((tech, index) => (
                    <Badge key={`tech-${index}`} variant="secondary">
                      {tech.technology}
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            {project.acf.demo_link && (
              <Button asChild className="flex-1">
                <a
                  href={project.acf.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver Demo
                </a>
              </Button>
            )}
            {project.acf.github_link && (
              <Button asChild variant="outline" className="flex-1">
                <a
                  href={project.acf.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
