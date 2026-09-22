import { useSyncExternalStore } from 'react';

export const CONSENT_STORAGE_KEY = 'cookie-consent';

export type ConsentChoice = 'accepted' | 'denied';

type GtagWindow = {
  dataLayer?: object[];
  gtag?: (...args: unknown[]) => void;
};

const consentStatus = (value: 'granted' | 'denied') => ({
  ad_storage: value,
  ad_user_data: value,
  ad_personalization: value,
  analytics_storage: value,
});

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === 'accepted' || value === 'denied' ? value : null;
}

export function useConsent(): ConsentChoice | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

export function gtagConsent(value: 'granted' | 'denied') {
  if (typeof window === 'undefined') return;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  const status = consentStatus(value);
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', status);
  } else {
    w.dataLayer.push(['consent', 'update', status]);
  }
}

export function setConsent(choice: ConsentChoice) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  gtagConsent(choice === 'accepted' ? 'granted' : 'denied');
  listeners.forEach((listener) => listener());
}