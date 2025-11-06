import { Suspense } from "react";
import TutorialClient from "./tutorial-client";
import type { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {

  const title = "Pekebyte - Tutoriales";
  const description = "Descubre tutoriales detallados de Pekebyte sobre desarrollo web, diseño y soluciones digitales para mejorar tus habilidades técnicas.";
  const keywords = "Tutoriales, Desarrollo Web, Diseño, Soluciones Digitales, Pekebyte";
  const ogImageUrl = "/metadata/tutoriales.jpg"

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
          alt: "Tutorials page",
        },
      ],
    };

  return metadata;
}

export default function TutorialesPage() {
  return (
    <Suspense fallback={<div>Cargando tutoriales...</div>}>
      <TutorialClient />
    </Suspense>
  );
}
