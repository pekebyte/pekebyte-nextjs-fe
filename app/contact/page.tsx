"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, MapPin, Youtube } from "lucide-react";
import { toast } from "@/src/hooks/use-toast";
import { submitContactForm } from "@/lib/wordpress";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      toast({
        title: "Mensaje enviado",
        description: "Te responderé lo antes posible.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Contacto
          </h1>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up">
            ¿Tienes un proyecto en mente? ¡Hablemos!
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Envíame un mensaje</CardTitle>
                <CardDescription>
                  Completa el formulario y te responderé lo antes posible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Asunto</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Github</h3>
                    <Link href="https://www.github.com/pekebyte" target="_blank" className="text-primary hover:underline">pekebyte</Link>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Linkedin</h3>
                    <Link href="https://www.linkedin.com/in/pamolinaf" target="_blank" className="text-primary hover:underline">pamolinaf</Link>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Youtube className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Youtube</h3>
                    <Link href="https://www.youtube.com/@Pekebyte" target="_blank" className="text-primary hover:underline">Pekebyte</Link>
                  </div>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Disponibilidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Actualmente disponible para proyectos freelance y colaboraciones.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
