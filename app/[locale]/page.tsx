import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HandbagIcon, PanelsTopLeftIcon, Rocket, Sparkles } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { Locale, getLocalizedPath, buildAlternates } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  const title = isEs ? "Pedro Molina — Desarrollador Shopify, WordPress & IA" : "Pedro Molina — Shopify, WordPress & AI Developer";
  const description = isEs
    ? "Desarrollador full stack senior especializado en productos WordPress y Shopify con integración real de IA para clientes internacionales. 10+ años de experiencia, arquitectura headless y apps publicadas en Shopify."
    : "Senior full-stack developer building AI-integrated WordPress and Shopify products for international clients. 10+ years of experience, headless architecture, and published Shopify apps.";
  const keywords = isEs
    ? "desarrollador Shopify, desarrollador WordPress, integración de IA, WordPress headless, desarrollador full stack"
    : "Shopify developer, WordPress developer, AI integration, headless WordPress, full stack developer";
  const ogImageUrl = "/metadata/home.jpg";

  return {
    title,
    description,
    keywords,
    alternates: buildAlternates("/", locale as Locale),
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Home page" }],
    },
  };
}

const Home = async ({ params }: Props) => {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-4">
              <Image src="/pekebytelogo.svg" alt="Pekebyte logo" width={400} height={170} className="max-w-96 text-primary animate-float" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.home.title}
            </h1>
            <h2 className="text-3xl font-bold mb-4">{t.home.subtitle}</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
              {t.home.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
              <Link href={getLocalizedPath("/portfolio", locale)}>
                <Button size="lg" variant="outline" className="gap-2 cursor-pointer">
                  <Rocket className="h-5 w-5" />
                  {t.home.viewPortfolio}
                </Button>
              </Link>
              <Link href={getLocalizedPath("/contact", locale)}>
                <Button size="lg" className="gap-2 cursor-pointer">
                  <Sparkles className="h-5 w-5" />
                  {t.home.letsTalk}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[var(--gradient-card)]">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <HandbagIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.home.shopifyIa}</h3>
              <p className="text-muted-foreground">
                {t.home.shopifyDesc}
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[var(--gradient-card)]">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <PanelsTopLeftIcon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.home.wordpressCustom}</h3>
              <p className="text-muted-foreground">
                {t.home.wordpressDesc}
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[var(--gradient-card)]">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.home.availableNow}</h3>
              <p className="text-muted-foreground">
                {t.home.availableDesc}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;