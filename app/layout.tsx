import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/src/components/ui/toaster";
import { Toaster as Sonner } from "@/src/components/ui/sonner";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import Navigation from "@/src/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pekebyte - Full Stack Developer",
  description: "Portfolio y tutoriales de desarrollo web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Navigation />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}