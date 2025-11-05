import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Coffee, Zap, Award } from "lucide-react";

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
                    Apasionado por crear soluciones web elegantes y eficientes. Me especializo en 
                    tecnologías modernas como React, TypeScript, Node.js y más. Siempre en busca 
                    de nuevos desafíos y oportunidades para aprender.
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
                  <li>• React & TypeScript</li>
                  <li>• Node.js & Express</li>
                  <li>• PostgreSQL & MongoDB</li>
                  <li>• Tailwind CSS</li>
                  <li>• Git & GitHub</li>
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
                  <li>• Desarrollo web moderno</li>
                  <li>• Arquitectura de software</li>
                  <li>• Open source</li>
                  <li>• Educación en programación</li>
                  <li>• Nuevas tecnologías</li>
                </ul>
              </Card>
            </div>

            <Card className="p-8 bg-[var(--gradient-card)]">
              <h3 className="text-2xl font-bold mb-4">Mi filosofía</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Creo en el código limpio, las mejores prácticas y el aprendizaje continuo. 
                Mi objetivo es crear aplicaciones que no solo funcionen bien, sino que también 
                sean mantenibles, escalables y accesibles para todos.
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
                    <Badge variant="secondary">2024</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">React Advanced Certification</h3>
                  <p className="text-muted-foreground mb-3">Meta (Facebook)</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación avanzada en React, hooks, performance optimization y arquitectura de componentes.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="secondary">2023</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Full Stack Web Development</h3>
                  <p className="text-muted-foreground mb-3">freeCodeCamp</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación completa en desarrollo full stack con Node.js, Express, MongoDB y React.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">2023</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">TypeScript Professional</h3>
                  <p className="text-muted-foreground mb-3">Microsoft</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación profesional en TypeScript, tipos avanzados, genéricos y mejores prácticas.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="secondary">2022</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">JavaScript Algorithms</h3>
                  <p className="text-muted-foreground mb-3">freeCodeCamp</p>
                  <p className="text-sm text-muted-foreground">
                    Certificación en algoritmos y estructuras de datos con JavaScript.
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
