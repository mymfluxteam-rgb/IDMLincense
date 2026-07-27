import { Link, useLocation } from 'wouter';
import { Download, Menu, X, ShieldCheck, Globe, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useGeo } from '@/context/GeoContext';
import { translations, type Locale, type Currency } from '@/context/translations';

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { locale, currency, setLocale, setCurrency } = useGeo();
  const t = translations[locale].nav;
  const ui = translations[locale];

  const navItems = [
    { href: '/', label: t.download },
    { href: '/order-license', label: t.orderLicense },
    { href: '/pricing', label: t.pricing },
    { href: '/how-to-purchase', label: t.howToPurchase },
    { href: '/contact', label: t.contact },
  ];

  const isActive = (href: string) =>
    href === '/' ? location === '/' : location.startsWith(href);

  const locales: { value: Locale; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'my', label: 'မြန်မာ' },
  ];

  const currencies: { value: Currency; label: string }[] = [
    { value: 'USD', label: 'USD $' },
    { value: 'MMK', label: 'MMK K' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm group-hover:shadow-md transition-shadow">
            <Download className="h-4 w-4" />
          </div>
          <div className="leading-none hidden sm:block">
            <span className="font-bold tracking-tight text-foreground block">{ui.brand}</span>
            <span className="text-[10px] text-muted-foreground font-medium tracking-wide">{ui.brandSub}</span>
          </div>
          <span className="font-bold tracking-tight text-foreground sm:hidden">{ui.brand}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                isActive(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language + Currency switcher (desktop) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {/* Language */}
          <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-0.5">
            <Globe className="h-3.5 w-3.5 text-muted-foreground ml-1.5" />
            {locales.map((l) => (
              <button
                key={l.value}
                onClick={() => setLocale(l.value)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  locale === l.value
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Currency */}
          <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-0.5">
            <DollarSign className="h-3.5 w-3.5 text-muted-foreground ml-1" />
            {currencies.map((c) => (
              <button
                key={c.value}
                onClick={() => setCurrency(c.value)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  currency === c.value
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {c.value}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden h-9 w-9 shrink-0"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="xl:hidden border-t border-border/60 bg-background/98 backdrop-blur px-4 py-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile lang/currency row */}
          <div className="pt-3 mt-2 border-t border-border/60 flex flex-wrap gap-3 px-3">
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-0.5">
                {locales.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLocale(l.value)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      locale === l.value
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
              <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-0.5">
                {currencies.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCurrency(c.value)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      currency === c.value
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {c.value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground px-3">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500 shrink-0" />
            {t.safeVerified}
          </div>
        </div>
      )}
    </header>
  );
}
