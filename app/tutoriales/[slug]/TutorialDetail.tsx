"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { Tutorial } from "@/types/wordpress";
import Prism from "prismjs";
type Props = {
  tutorial: Tutorial;
};

export default function TutorialDetail({ tutorial } : Props) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
        Prism.highlightAll();
    }
}, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <Link href="/tutoriales">
          <Button variant="ghost" className="mb-8 gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Volver a Tutoriales
          </Button>
        </Link>

        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">{tutorial.acf?.nivel}</Badge>
              <Badge>{tutorial.acf?.duration}</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{tutorial.title.rendered}</h1>
            <p className="text-xl text-muted-foreground">{tutorial.acf.description}</p>
          </div>

          {/* YouTube Video */}
          <div className="rounded-xl overflow-hidden mb-12 shadow-2xl aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${tutorial.acf?.video_id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="p-8">
                <div className="prose prose-lg max-w-none dark:prose-invert tutocontent" dangerouslySetInnerHTML={{ __html: tutorial.acf?.content || '' }}>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Temas cubiertos</h3>
                <ul className="space-y-3">
                  {tutorial.acf.topics?.map((topic, index) => (
                    <li key={`topic-${index}`} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-muted-foreground">{topic.topic}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
