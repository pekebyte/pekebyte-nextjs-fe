"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { PortfolioTechnology } from "@/types/wordpress";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type MediaEntry = {
  id: number;
  mainImage: any;
  gallery: any[];
};

export default function PortfolioClient({
  categories,
  items,
  media,
  categorySlug,
}: {
  categories: Category[];
  items: any[];
  media: MediaEntry[];
  categorySlug?: string;
}) {
    const selectedCategory = categorySlug || "Todos";
    const mediaMap = new Map(media.map(m => [m.id, m]));

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">Portafolio</h1>
                <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up">
                    Explora mis proyectos y casos de estudio
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    <Button
                        variant={selectedCategory === "Todos" ? "default" : "outline"}
                    >
                        <Link href="/portafolio">
                            Todos
                        </Link>
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            asChild
                            variant={selectedCategory === category.slug ? "default" : "outline"}
                        >
                            <Link href={`/portafolio/categoria/${category.slug}`}>
                                {category.name}
                            </Link>
                        </Button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => {
                        const { mainImage } = mediaMap.get(item.id) || { mainImage: null, gallery: [] };
                        return (
                            <Link
                                key={item.id}
                                href={`/portafolio/${item.slug}`}
                                className="group animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={mainImage?.source_url || "/placeholder.svg"}
                                            alt={mainImage?.alt_text || ""}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                                            <ExternalLink className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle>{item.title.rendered}</CardTitle>
                                        <CardDescription>{item.acf.short_description || item.acf.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {item.acf.technologies?.map((tech : PortfolioTechnology, index: number) => (
                                                <Badge key={`tech-${index}`} variant="secondary">
                                                    {tech.technology}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div >
    );
}
