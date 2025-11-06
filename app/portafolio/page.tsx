import { Suspense } from "react";
import PortfolioClient from "./portfolio-client";
import type { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {

  const title = "Pekebyte - Portafolio";
  const description = "Explora los proyectos destacados de Pekebyte, demostrando habilidades en desarrollo web, diseño y soluciones digitales innovadoras.";
  const keywords = "Portfolio, Proyectos, Desarrollo Web, Diseño, Soluciones Digitales, Pekebyte";
  const ogImageUrl = "/metadata/portafolio.jpg"

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

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Cargando proyectos...</div>}>
      <PortfolioClient />
    </Suspense>
  );
}
