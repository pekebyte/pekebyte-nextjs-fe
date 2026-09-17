import type { Metadata } from "next";
import "prismjs/themes/prism-tomorrow.css";
import { Poppins, Fira_Code } from 'next/font/google';
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import { GoogleAnalytics } from '@next/third-parties/google'
import { locales, SITE_URL } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  return {
    metadataBase: new URL(SITE_URL),
    title: "Pekebyte - Full Stack Developer",
    description: isEs
      ? "Portafolio y tutoriales de desarrollo web"
      : "Web development portfolio and tutorials",
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const lang = locale === 'es' ? 'es' : 'en';

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${poppins.variable} ${firaCode.variable}`}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Navigation locale={lang} />
          {children}
        </TooltipProvider>
      </body>
      <GoogleAnalytics gaId="G-EF72Q8YR64" />
    </html>
  );
}