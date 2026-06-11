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
import { PortfolioItem } from "@/types/wordpress";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type MediaItem = {
  source_url: string;
  alt_text?: string;
  mime_type?: string;
};

type Props = {
  project: PortfolioItem;
  categories: Category[];
  mainImage: MediaItem | null;
  gallery: MediaItem[];
};

export default function PortfolioDetail({ project, categories, mainImage, gallery } : Props) {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <Link href="/portafolio">
          <Button variant="ghost" className="mb-8 gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Volver al Portfolio
          </Button>
        </Link>

        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="mb-8">
            <div className="flex mb-8">
              {categories.map((category, index) => (
                <Badge key={`category-${index}`} variant="secondary" className="mb-4 mr-2">{category.name}</Badge>
              ))}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{project.title.rendered || ""}</h1>
            <p className="text-xl text-muted-foreground">{project.acf.short_description || ""}</p>
          </div>

          <div className="rounded-xl overflow-hidden mb-12 shadow-2xl">
            {gallery && gallery.length > 1 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {gallery.map((media, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        {media.mime_type?.startsWith("video/") ? (
                          <video
                            src={media.source_url}
                            controls
                            className="w-full h-full object-cover rounded-lg"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Image
                            src={media.source_url || "/placeholder.svg"}
                            alt={media.alt_text || `Media ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {gallery.length > 0 && (
                  <>
                    <CarouselPrevious className="left-4 cursor-pointer" />
                    <CarouselNext className="right-4 cursor-pointer" />
                  </>
                )}
              </Carousel>
            ) : mainImage ? (
              <img
                src={mainImage.source_url || "/placeholder.svg"}
                alt={mainImage.source_url || ""}
                className="w-full h-auto"
              />
            ) : null}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-4">Descripción</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.acf.description || ""}
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">Características</h2>
                <ul className="space-y-3">
                  {project.acf.features?.map((feature, index) => (
                    <li key={`feature-${index}`} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-muted-foreground">
                        {feature.feature || ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Tecnologías</h3>
                <div className="flex flex-wrap gap-2">
                  {project.acf.technologies?.map((tech, index) => (
                    <Badge key={`tech-${index}`} variant="outline">
                      {typeof tech === "string"
                        ? tech
                        : tech?.technology || JSON.stringify(tech)}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Enlaces</h3>
                <div className="space-y-3">
                  {project.acf.demo_link && (
                    <Button className="w-full gap-2" variant="default">
                      <Link
                        href={project.acf.demo_link}
                        target="_blank"
                        className="w-full flex justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Ver Demo
                      </Link>
                    </Button>
                  )}

                  {project.acf.github_link && (

                    <Button className="w-full gap-2 flex-1" variant="outline">
                      <Link
                        href={project.acf.github_link}
                        target="_blank"
                        className="w-full flex justify-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        Ver Código
                      </Link>
                    </Button>

                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
