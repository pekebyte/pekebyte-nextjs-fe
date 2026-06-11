"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

type Category = {
    id: number;
    name: string;
    slug: string;
};

export default function TutorialClient({
    categories,
    tutorials,
    categorySlug,
}: {
    categories: Category[];
    tutorials: any[];
    categorySlug?: string;
}) {
    const selectedCategory = categorySlug || "Todos";

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">Tutoriales</h1>
                <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up">
                    Aprende desarrollo web con videos y ejemplos de código
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    <Button
                        variant={selectedCategory === "Todos" ? "default" : "outline"}
                    >
                        <Link href="/tutoriales">
                            Todos
                        </Link>
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            asChild
                            variant={selectedCategory === category.slug ? "default" : "outline"}
                        >
                            <Link href={`/tutoriales/categoria/${category.slug}`}>
                                {category.name}
                            </Link>
                        </Button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorials.map((item, index) => {
                        return (
                            <Link
                                key={item.id}
                                href={`/tutoriales/${item.slug}`}
                                className="group animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={item.acf.thumbnail_url?.source_url || "/placeholder.svg"}
                                            alt={item.acf.thumbnail_url?.alt_text || ""}
                                            fill
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                                                <Play className="h-8 w-8 text-white fill-white ml-1" />
                                            </div>
                                        </div>
                                        <Badge className="absolute top-4 right-4">{item.acf.duration}</Badge>
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="outline">{item.acf?.nivel}</Badge>
                                        </div>
                                        <CardTitle className="group-hover:text-primary transition-colors">
                                            {item.title.rendered}
                                        </CardTitle>
                                        <CardDescription>{item.acf.short_description || item.acf.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div >
    );
}
