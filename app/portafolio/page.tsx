import { Suspense } from "react";
import PortfolioClient from "./portfolio-client";

export const revalidate = 3600; // Revalidate every hour

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Cargando proyectos...</div>}>
      <PortfolioClient />
    </Suspense>
  );
}
