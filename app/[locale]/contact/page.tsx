import ContactClient from "./contact-client";
import type { Metadata } from "next";
import { Locale, buildAlternates } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  const title = isEs ? "Contacta a Pedro Molina — Desarrollador WordPress, Shopify & IA" : "Contact Pedro Molina — WordPress, Shopify & AI Developer";
  const description = isEs
    ? "Ponte en contacto con Pedro Molina para hablar sobre tu proyecto de WordPress, Shopify o integración de IA. Disponible para proyectos freelance y colaboraciones con agencias."
    : "Get in touch with Pedro Molina to discuss your WordPress, Shopify, or AI-integrated project. Available for freelance work and agency collaborations.";
  const keywords = isEs
    ? "contactar desarrollador, contratar desarrollador WordPress, contratar desarrollador Shopify, desarrollador freelance, integración de IA"
    : "contact developer, hire WordPress developer, hire Shopify developer, freelance developer, AI integration";
  const ogImageUrl = isEs ? "/metadata/contacto.jpg" : "/metadata/contacto.jpeg";

  return {
    title,
    description,
    keywords,
    alternates: buildAlternates("/contact", locale as Locale),
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "About page" }],
    },
  };
}

export default function Contact({ params }: Props) {
  return <ContactClient params={params} />;
}