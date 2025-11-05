import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Code2, Palette, Database, Smartphone, Award, Coffee } from "lucide-react";

export default function About() {
  const technologies = [
    { name: "React & Next.js", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "SQL & NoSQL", level: 85 },
  ];

  const interests = [
    { icon: Code2, title: "Desarrollo Web", description: "Creación de aplicaciones modernas" },
    { icon: Palette, title: "UI/UX Design", description: "Diseño de interfaces intuitivas" },
    { icon: Database, title: "Backend", description: "APIs y bases de datos" },
    { icon: Smartphone, title: "Responsive", description: "Diseño móvil primero" },
  ];

  const certifications = [
    { title: "Full Stack Web Development", issuer: "freeCodeCamp", year: "2023" },
    { title: "React Professional", issuer: "Meta", year: "2023" },
    { title: "AWS Solutions Architect", issuer: "Amazon", year: "2022" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Sobre mí</h1>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Full Stack Developer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Soy un desarrollador Full Stack apasionado por crear soluciones web innovadoras.
              Con más de 5 años de experiencia, me especializo en React, Next.js y Node.js.
              Me encanta aprender nuevas tecnologías y compartir conocimientos a través de tutoriales.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              Filosofía
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Creo en el código limpio, las mejores prácticas y el aprendizaje continuo.
              Mi enfoque se centra en crear aplicaciones escalables, mantenibles y centradas en el usuario.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Tecnologías</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {technologies.map((tech) => (
                <div key={tech.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{tech.name}</span>
                    <span className="text-muted-foreground">{tech.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${tech.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Intereses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {interests.map((interest) => (
            <Card key={interest.title}>
              <CardHeader>
                <interest.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">{interest.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{interest.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Certificaciones</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <Card key={cert.title}>
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">{cert.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <Badge variant="secondary" className="mt-2">{cert.year}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
