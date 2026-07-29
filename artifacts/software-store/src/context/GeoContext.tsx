import React, { createContext, useContext, useEffect, useState } from 'react';
import { type Currency, type Locale } from './translations';

interface GeoState {
  locale: Locale;
  currency: Currency;
  country: string | null;
  loading: boolean;
  setLocale: (l: Locale) => void;
  setCurrency: (c: Currency) => void;
}

const GeoContext = createContext<GeoState>({
  locale: 'en',
  currency: 'USD',
  country: null,
  loading: true,
  setLocale: () => {},
  setCurrency: () => {},
});

const LS_LOCALE = 'softstore_locale';
const LS_CURRENCY = 'softstore_currency';

function getStored<T extends string>(key: string, fallback: T): T {
  try {
    return (localStorage.getItem(key) as T) ?? fallback;
  } catch {
    return fallback;
  }
}

/** Map a country code to the best default locale */
function countryToLocale(code: string): Locale {
  if (code === 'MM') return 'my';
  if (code === 'TH') return 'th';
  if (['CN', 'HK', 'TW', 'MO'].includes(code)) return 'zh';
  if (code === 'JP') return 'ja';
  if (code === 'KR') return 'ko';
  return 'en';
}

/** Map a country code to the best default currency */
function countryToCurrency(code: string): Currency {
  if (code === 'MM') return 'MMK';
  if (code === 'TH') return 'THB';
  if (['CN', 'MO'].includes(code)) return 'CNY';
  if (code === 'JP') return 'JPY';
  if (code === 'KR') return 'KRW';
  if (code === 'SG') return 'SGD';
  // EU countries → EUR
  const euCountries = ['DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT', 'PT', 'FI', 'IE',
    'GR', 'LU', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY', 'HR'];
  if (euCountries.includes(code)) return 'EUR';
  return 'USD';
}

export function GeoProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getStored<Locale>(LS_LOCALE, 'en'));
  const [currency, setCurrencyState] = useState<Currency>(() => getStored<Currency>(LS_CURRENCY, 'USD'));
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only auto-detect if the user has never manually set a preference
    const hadLocale = Boolean(localStorage.getItem(LS_LOCALE));
    const hadCurrency = Boolean(localStorage.getItem(LS_CURRENCY));

    if (hadLocale && hadCurrency) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000); // 5 s timeout

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((r) => r.json())
      .then((data: { country_code?: string }) => {
        const code = data.country_code ?? '';
        setCountry(code);
        if (!hadLocale) {
          const detectedLocale = countryToLocale(code);
          setLocaleState(detectedLocale);
          localStorage.setItem(LS_LOCALE, detectedLocale);
        }
        if (!hadCurrency) {
          const detectedCurrency = countryToCurrency(code);
          setCurrencyState(detectedCurrency);
          localStorage.setItem(LS_CURRENCY, detectedCurrency);
        }
      })
      .catch(() => {
        // Silently fall back to defaults
      })
      .finally(() => {
        clearTimeout(timer);
        setLoading(false);
      });

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem(LS_LOCALE, l); } catch {}
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try { localStorage.setItem(LS_CURRENCY, c); } catch {}
  };

  return (
    <GeoContext.Provider value={{ locale, currency, country, loading, setLocale, setCurrency }}>
      {children}
    </GeoContext.Provider>
  );
}

export function useGeo() {
  return useContext(GeoContext);
}
