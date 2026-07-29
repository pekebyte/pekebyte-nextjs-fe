import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HandbagIcon, PanelsTopLeftIcon , Rocket, Sparkles } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  const title = "Pekebyte - Inicio";
  const description = "Bienvenido a Pekebyte, tu destino para desarrollo web, tutoriales de programación y contenido tecnológico de vanguardia.";
  const keywords = "Desarrollo Web, Tutoriales, Programación, Tecnología, Pekebyte";
  const ogImageUrl = "/metadata/home.jpg"

  const metadata: Metadata = {
    title,
    description,
    keywords,
  };

  metadata.openGraph = {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Portfolio page",
        },
      ],
    };

  return metadata;
}

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
              Pedro Molina
            </h1>
            <h2 className="text-3xl font-bold mb-4">Shopify & WordPress Developer especializado en apps con IA</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
              Ayudo a negocios a construir productos WordPress y Shopify que integran IA de verdad, no un chatbot añadido a última hora. 10+ años construyendo software para clientes internacionales.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
              <Link href="/portafolio">
                <Button size="lg" variant="outline" className="gap-2 cursor-pointer">
                  <Rocket className="h-5 w-5" />
                  Ver Portfolio
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="gap-2 cursor-pointer">
                  <Sparkles className="h-5 w-5" />
                  Hablemos de tu proyecto
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
                <HandbagIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Shopify+IA</h3>
              <p className="text-muted-foreground">
                Apps publicadas en la Shopify App Store con integraciones de OpenAI, como SizeWizard.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[var(--gradient-card)]">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <PanelsTopLeftIcon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">WordPress a medida</h3>
              <p className="text-muted-foreground">
                Plugins, temas y arquitecturas headless con Next.js para clientes internacionales.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[var(--gradient-card)]">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Disponible ahora</h3>
              <p className="text-muted-foreground">
                Abierto a proyectos freelance y colaboraciones con agencias.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;