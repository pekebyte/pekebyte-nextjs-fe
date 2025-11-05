"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "@/src/hooks/use-toast";
import { submitContactForm } from "@/lib/wordpress";

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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Contacto</h1>
      <p className="text-muted-foreground mb-8">
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
          <Card>
            <CardHeader>
              <Mail className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="mailto:contacto@pekebyte.com" className="text-primary hover:underline">
                contacto@pekebyte.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Teléfono</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="tel:+34600000000" className="text-primary hover:underline">
                +34 600 000 000
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MapPin className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Madrid, España</p>
            </CardContent>
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
  );
}
