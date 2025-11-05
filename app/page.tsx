import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Rocket, Sparkles } from "lucide-react";
import Image from "next/image";
const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-4">
              <Image src="/pekebytelogo.svg" alt="Pekebyte logo" width={400} height={170} className="max-w-96 text-primary animate-float" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Bienvenido a Pekebyte
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
              Desarrollo web, tutoriales y contenido de programación
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
              <Link href="/portfolio">
                <Button size="lg" className="gap-2">
                  <Rocket className="h-5 w-5" />
                  Ver Portfolio
                </Button>
              </Link>
              <Link href="/tutorials">
                <Button size="lg" variant="outline" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  Explorar Tutoriales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[var(--gradient-card)]">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Portfolio</h3>
              <p className="text-muted-foreground">
                Proyectos organizados por categorías con detalles técnicos y demos en vivo
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[var(--gradient-card)]">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Tutoriales</h3>
              <p className="text-muted-foreground">
                Contenido educativo con videos de YouTube y fragmentos de código prácticos
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[var(--gradient-card)]">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Desarrollo</h3>
              <p className="text-muted-foreground">
                Experiencia en desarrollo web moderno con las últimas tecnologías
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;