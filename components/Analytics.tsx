'use client';

import { useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { gtagConsent, useConsent } from '@/lib/consent';

const GA4_ID = 'G-EF72Q8YR64';

export default function Analytics() {
  const consent = useConsent();
  const enabled = consent === 'accepted';

  useEffect(() => {
    if (enabled) {
      gtagConsent('granted');
    }
  }, [enabled]);

  if (!enabled) return null;

  return <GoogleAnalytics gaId={GA4_ID} />;
}