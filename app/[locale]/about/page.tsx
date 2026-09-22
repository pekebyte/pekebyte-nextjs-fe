import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Coffee, Zap, Award } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale, getLocalizedPath, buildAlternates } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  const title = isEs ? "Sobre Pedro Molina — Desarrollador Full Stack, WordPress & Shopify" : "About Pedro Molina — Full Stack Developer, WordPress & Shopify";
  const description = isEs
    ? "Desarrollador full stack senior con más de 10 años de experiencia construyendo plugins de WordPress, arquitecturas headless y apps de Shopify con integración de IA para clientes internacionales."
    : "Senior full-stack developer with 10+ years of experience building WordPress plugins, headless architectures, and AI-integrated Shopify apps for international clients.";
  const keywords = isEs
    ? "desarrollador full stack, plugins WordPress, apps Shopify, integración de IA, arquitectura headless"
    : "full stack developer, WordPress plugins, Shopify apps, AI integration, headless architecture";
  const ogImageUrl = "/metadata/about.jpg";

  return {
    title,
    description,
    keywords,
    alternates: buildAlternates("/about", locale as Locale),
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "About page" }],
    },
  };
}

const About = async ({ params }: Props) => {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'es' ? 'es' : 'en') as Locale;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-fade-in">
            {t.about.title}
          </h1>

          <div className="prose prose-lg max-w-none animate-fade-in-up">
            <Card className="p-8 mb-8 bg-[var(--gradient-card)]">
              <div className="flex items-start gap-6">
                <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Code2 className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">{t.about.role}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                    {t.about.bio}
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">{t.about.technologies}</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>{t.about.frontend}:</strong> React, TypeScript, Next.js, Tailwind CSS</li>
                  <li>• <strong>{t.about.backend}:</strong> Node.js, Express, Laravel, PHP</li>
                  <li>• <strong>{t.about.databases}:</strong> PostgreSQL, MongoDB, MySQL</li>
                  <li>• <strong>{t.about.devops}:</strong> Git, GitHub, AWS, DigitalOcean</li>
                  <li>• <strong>{t.about.other}:</strong> WordPress (custom themes & plugins), Shopify (apps with React + Remix)</li>
                </ul>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{t.about.interests}</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  {t.about.interestsList.map((interest, index) => (
                    <li key={`interest-${index}`}>• {interest}</li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="p-8 bg-[var(--gradient-card)]">
              <h3 className="text-2xl font-bold mb-4">{t.about.philosophy}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t.about.philosophyText}<br /><br />
                {locale === 'es' ? (
                  <>Si tienes un proyecto de WordPress o Shopify que necesita IA bien integrada, <Link href={getLocalizedPath("/contact", locale)}><u>hablemos</u></Link>.</>
                ) : (
                  <>If you have a WordPress or Shopify project that needs well-integrated AI, <Link href={getLocalizedPath("/contact", locale)}><u>let&apos;s talk</u></Link>.</>
                )}
              </p>
            </Card>

            {/* Certifications Section */}
            <div className="mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">{t.about.certifications}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">2026</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Claude Code 101</h3>
                  <p className="text-muted-foreground mb-3">Anthropic</p>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Certificación en el uso de agentes de IA como Claude Code en el flujo de trabajo diario.'
                      : 'Certification in the use of AI agents like Claude Code in the daily workflow.'}
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">2025</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Working with the OpenAI API</h3>
                  <p className="text-muted-foreground mb-3">Datacamp</p>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Certificación en el uso de la API de OpenAI para integrar modelos de lenguaje en aplicaciones web.'
                      : 'Certification in using the OpenAI API to integrate language models into web applications.'}
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="secondary">2025</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Prompt Engineering with the OpenAI API</h3>
                  <p className="text-muted-foreground mb-3">Datacamp</p>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Certificación en diseño y optimización de prompts para mejorar la interacción con modelos de lenguaje.'
                      : 'Certification in designing and optimizing prompts to improve interaction with language models.'}
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">2018</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">React Web Development</h3>
                  <p className="text-muted-foreground mb-3">Udemy</p>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Certificación en desarrollo de aplicaciones web con React, incluyendo hooks, state management y routing.'
                      : 'Certification in web application development with React, including hooks, state management, and routing.'}
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="secondary">2017</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Android Development</h3>
                  <p className="text-muted-foreground mb-3">Udemy</p>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Certificación en desarrollo de aplicaciones móviles para Android utilizando Java y Android Studio.'
                      : 'Certification in mobile application development for Android using Java and Android Studio.'}
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="secondary">2017</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Swift Development</h3>
                  <p className="text-muted-foreground mb-3">Udemy</p>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Certificación en desarrollo de aplicaciones móviles para iOS utilizando Swift y Xcode.'
                      : 'Certification in mobile application development for iOS using Swift and Xcode.'}
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;