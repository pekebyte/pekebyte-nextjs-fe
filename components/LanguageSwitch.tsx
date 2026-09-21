'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocalizedPath, getPathWithoutLocale, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LanguageSwitch = ({ locale, onNavigate }: { locale: Locale; onNavigate?: () => void }) => {
  const pathname = usePathname();
  const path = getPathWithoutLocale(pathname);

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full bg-muted p-1"
    >
      {locales.map((loc) => (
        <Link
          key={loc}
          href={getLocalizedPath(path, loc)}
          onClick={onNavigate}
          aria-current={loc === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-3 py-1 text-sm leading-none transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            loc === locale
              ? "bg-background text-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitch;