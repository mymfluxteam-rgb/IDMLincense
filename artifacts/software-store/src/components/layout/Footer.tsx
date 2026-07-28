import { Link } from 'wouter';
import { Download, ShieldCheck } from 'lucide-react';
import { useGeo } from '@/context/GeoContext';
import { translations } from '@/context/translations';

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

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
            {/* Telegram support link */}
            <a
              href="https://t.me/NetCodeShop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 rounded-lg bg-[#229ED9]/15 hover:bg-[#229ED9]/25 border border-[#229ED9]/30 text-[#229ED9] text-xs font-semibold px-3 py-2 transition-colors"
            >
              <TelegramIcon className="h-3.5 w-3.5 shrink-0" />
              {locale === 'my' ? 'Telegram ပံ့ပိုးမှု' : 'Support on Telegram'}
            </a>
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
                <Link href="/terms-of-service" className="hover:text-primary transition-colors">{t.legal[0]}</Link>
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
