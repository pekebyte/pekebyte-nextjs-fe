import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {

  const title = "Pekebyte - No Encontrado";
  const description = "La página que buscas no se ha encontrado.";
  const keywords = "Portfolio, Proyectos, Desarrollo Web, Diseño, Soluciones Digitales, Pekebyte";
  const ogImageUrl = "/metadata/404.jpg"

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

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
}
