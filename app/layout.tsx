import type { Metadata } from "next";
import { Poppins, Fira_Code } from 'next/font/google';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // choose what you need
  variable: '--font-poppins',    // optional for CSS variables
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
});


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
      <body className={`${poppins.variable} ${firaCode.variable}`}>
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