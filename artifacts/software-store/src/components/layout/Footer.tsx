import { Link } from 'wouter';
import { Download, ShieldCheck } from 'lucide-react';
import { useGeo } from '@/context/GeoContext';
import { translations } from '@/context/translations';

export function Footer() {
  const { locale } = useGeo();
  const t = translations[locale].footer;
  const nav = translations[locale].nav;

  const navLinks = [
    { href: '/', label: nav.download },
    { href: '/order-license', label: nav.orderLicense },
    { href: '/pricing', label: nav.pricing },
    { href: '/how-to-purchase', label: nav.howToPurchase },
    { href: '/contact', label: nav.contact },
  ];

  const officialLinks = [
    { href: 'https://www.internetdownloadmanager.com', label: 'IDM Official Site' },
    { href: 'https://www.win-rar.com', label: 'WinRAR Official Site' },
  ];

  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Download className="h-4 w-4" />
              </div>
              <span className="font-bold tracking-tight">{translations[locale].brand}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{t.tagline}</p>
            <div className="flex items-center gap-1.5 mt-4 text-xs text-green-600 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t.officialOnly}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">{t.navTitle}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Sites */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">{t.officialTitle}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {officialLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">{t.legalTitle}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">{t.legal[0]}</a>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">{t.legal[1]}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>{t.copyright(new Date().getFullYear())}</span>
          <span className="text-center">
            {t.trademark}
          </span>
        </div>
      </div>
    </footer>
  );
}
