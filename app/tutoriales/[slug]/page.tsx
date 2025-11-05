import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTutorial, getTutorials } from "@/lib/wordpress";
import { ArrowLeft, Clock, TrendingUp } from "lucide-react";

export async function generateStaticParams() {
  const tutorials = await getTutorials();
  return tutorials.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

function formatContent(content: string) {
  return content.split('\n').map((line, index) => {
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
    }
    if (line.startsWith('```')) {
      return null;
    }
    if (line.trim() === '') {
      return <br key={index} />;
    }
    const codeMatch = line.match(/`([^`]+)`/g);
    if (codeMatch) {
      const parts = line.split(/`([^`]+)`/);
      return (
        <p key={index} className="mb-4">
          {parts.map((part, i) => 
            i % 2 === 1 ? <code key={i} className="bg-muted px-1 py-0.5 rounded">{part}</code> : part
          )}
        </p>
      );
    }
    return <p key={index} className="mb-4">{line}</p>;
  });
}

export default async function TutorialDetail({
  params,
}: {
  params: { slug: string };
}) {
  const tutorial = await getTutorial(params.slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/tutorials">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Tutoriales
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{tutorial.title.rendered}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge>{tutorial.acf.category}</Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {tutorial.acf.level}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {tutorial.acf.duration}
            </Badge>
          </div>

          <p className="text-lg text-muted-foreground mb-8">{tutorial.acf.description}</p>

          {tutorial.acf.video_id && (
            <div className="aspect-video mb-8 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${tutorial.acf.video_id}`}
                title={tutorial.title.rendered}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {tutorial.acf.content && formatContent(tutorial.acf.content)}
          </div>
        </div>

        <div className="lg:col-span-1">
          {tutorial.acf.topics && tutorial.acf.topics.length > 0 && (
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Temas Cubiertos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tutorial.acf.topics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
