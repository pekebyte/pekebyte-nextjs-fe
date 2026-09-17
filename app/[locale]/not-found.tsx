"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { getLocalizedPath, getLocaleFromPathname } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">{t.notFound.title}</h1>
        <h2 className="text-2xl font-semibold mb-4">{t.notFound.subtitle}</h2>
        <p className="text-muted-foreground mb-8">
          {t.notFound.description}
        </p>
        <Button asChild>
          <Link href={getLocalizedPath("/", locale)}>
            <Home className="mr-2 h-4 w-4" />
            {t.notFound.backHome}
          </Link>
        </Button>
      </div>
    </div>
  );
}