import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Coffee, Zap, Award } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {

  const title = "Pekebyte - Sobre mí";
  const description = "Conoce más sobre Pekebyte, su misión, visión y el equipo detrás del desarrollo web y contenido tecnológico de vanguardia.";
  const keywords = "Sobre mí, Misión, Visión, Equipo, Pekebyte";
  const ogImageUrl = "/metadata/about.jpg"

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

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-fade-in">
            Sobre mí
          </h1>

          <div className="prose prose-lg max-w-none animate-fade-in-up">
            <Card className="p-8 mb-8 bg-[var(--gradient-card)]">
              <div className="flex items-start gap-6">
                <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Code2 className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Desarrollador Full Stack</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Soy Pedro Molina, desarrollador full stack con más de 10 años construyendo software a medida para clientes internacionales. Mi trabajo se centra en dos áreas: desarrollo WordPress para clientes (plugins, temas, arquitecturas headless) y desarrollo de productos Shopify con integraciones de IA, incluyendo SizeWizard, mi propia app publicada en la Shopify App Store. <br /><br />
                    Actualmente disponible para proyectos freelance y colaboraciones con agencias.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Tecnologías</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Frontend:</strong> React, TypeScript, Next.js, Tailwind CSS</li>
                  <li>• <strong>Backend:</strong> Node.js, Express, Laravel, PHP</li>
                  <li>• <strong>Bases de datos:</strong> PostgreSQL, MongoDB, MySQL</li>
                  <li>• <strong>DevOps y herramientas:</strong> Git, GitHub, AWS, DigitalOcean</li>
                  <li>• <strong>Otros:</strong> WordPress (temas y plugins personalizados), Shopify (apps con React + Remix)</li>
                </ul>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Intereses</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Desarrollo web moderno y tecnologías emergentes</li>
                  <li>• Arquitectura de software y buenas prácticas de diseño</li>
                  <li>• Open source</li>
                  <li>• Educación y mentoría en programación</li>
                  <li>• Exploración de nuevas herramientas y frameworks</li>
                </ul>
              </Card>
            </div>

            <Card className="p-8 bg-[var(--gradient-card)]">
              <h3 className="text-2xl font-bold mb-4">Mi filosofía</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Creo en el poder del código limpio, las buenas prácticas y el aprendizaje continuo. Mi objetivo es desarrollar aplicaciones que destaquen por su rendimiento, mantenibilidad y accesibilidad, brindando soluciones sostenibles y escalables en el tiempo.<br /><br />
                Si tienes un proyecto de WordPress o Shopify que necesita IA bien integrada, <Link href="/contact"><u>hablemos</u></Link>.
              </p>
            </Card>

            {/* Certifications Section */}
            <div className="mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Certificaciones</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">2026</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Claude Code 101</h3>
                  <p className="text-muted-foreground mb-3">Anthropic</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación en el uso de agentes de IA como Claude Code en el flujo de trabajo diario.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">2025</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Working with the OpenAI API</h3>
                  <p className="text-muted-foreground mb-3">Datacamp</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación en el uso de la API de OpenAI para integrar modelos de lenguaje en aplicaciones web.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="secondary">2025</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Prompt Engineering with the OpenAI API</h3>
                  <p className="text-muted-foreground mb-3">Datacamp</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación en diseño y optimización de prompts para mejorar la interacción con modelos de lenguaje.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">2018</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">React Web Development</h3>
                  <p className="text-muted-foreground mb-3">Udemy</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación en desarrollo de aplicaciones web con React, incluyendo hooks, state management y routing.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="secondary">2017</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Android Development</h3>
                  <p className="text-muted-foreground mb-3">Udemy</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación en desarrollo de aplicaciones móviles para Android utilizando Java y Android Studio.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="secondary">2017</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Swift Development</h3>
                  <p className="text-muted-foreground mb-3">Udemy</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación en desarrollo de aplicaciones móviles para iOS utilizando Swift y Xcode.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
