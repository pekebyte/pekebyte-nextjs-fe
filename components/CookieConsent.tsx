'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { setConsent, useConsent } from '@/lib/consent';
import { getLocalizedPath, type Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

export default function CookieConsent({ locale }: { locale: Locale }) {
  const consent = useConsent();
  const t = getTranslations(locale);

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.consent.ariaLabel}
      className="fixed bottom-4 inset-x-0 z-[100] px-4 animate-fade-in-up"
    >
      <div className="mx-auto max-w-xl rounded-lg border bg-popover text-popover-foreground p-6 shadow-lg">
        <p className="text-sm leading-relaxed">{t.consent.bannerText}</p>
        <Link
          href={getLocalizedPath('/privacy', locale)}
          className="text-sm text-primary underline underline-offset-4 hover:opacity-80"
        >
          {t.consent.linkText}
        </Link>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => setConsent('accepted')}
          >
            {t.consent.accept}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => setConsent('denied')}
          >
            {t.consent.reject}
          </Button>
        </div>
      </div>
    </div>
  );
}