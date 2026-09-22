import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Cookie, Scale, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale, getLocalizedPath, buildAlternates } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  const title = isEs
    ? "Política de privacidad y cookies — Pekebyte"
    : "Privacy and cookie policy — Pekebyte";
  const description = isEs
    ? "Cómo se gestionan los datos personales y las cookies en pekebyte.com, incluido el uso de Google Analytics y Consent Mode."
    : "How personal data and cookies are handled on pekebyte.com, including Google Analytics and Consent Mode.";

  return {
    title,
    description,
    alternates: buildAlternates("/privacy", locale as Locale),
  };
}

const Privacy = async ({ params }: Props) => {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 animate-fade-in">
            {t.privacy.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-8 animate-fade-in-up">
            {t.privacy.lastUpdated}
          </p>

          <div className="space-y-6 animate-fade-in-up">
            <Card className="p-8">
              <p className="text-muted-foreground leading-relaxed">{t.privacy.intro}</p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{t.privacy.analyticsTitle}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{t.privacy.analyticsText}</p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-2xl font-bold">{t.privacy.cookiesTitle}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{t.privacy.cookiesText}</p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{t.privacy.rightsTitle}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{t.privacy.rightsText}</p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="default" asChild>
                <Link href={getLocalizedPath("/", locale)}>{t.privacy.backHome}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={getLocalizedPath("/contact", locale)}>
                  <Mail className="h-4 w-4 mr-1" />
                  {t.contact.title}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;