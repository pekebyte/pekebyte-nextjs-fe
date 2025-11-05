import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, BookOpen, Laptop } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Bienvenido a Pekebyte
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Full Stack Developer apasionado por crear experiencias web excepcionales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/portfolio">Ver Portfolio</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/tutorials">Explorar Tutoriales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardHeader>
                <Code2 className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>
                  Proyectos destacados y casos de estudio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/portfolio">Ver Proyectos</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <BookOpen className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Tutoriales</CardTitle>
                <CardDescription>
                  Guías y recursos de programación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/tutorials">Ver Tutoriales</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <Laptop className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Desarrollo</CardTitle>
                <CardDescription>
                  Soluciones web personalizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/contact">Contactar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
