import { Link } from 'wouter';
import { Download, ShieldCheck } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Download Software' },
  { href: '/order-license', label: 'Order License' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/how-to-purchase', label: 'How to Purchase License' },
  { href: '/contact', label: 'Contact Support Team' },
];

const officialLinks = [
  { href: 'https://www.internetdownloadmanager.com', label: 'IDM Official Site' },
  { href: 'https://www.win-rar.com', label: 'WinRAR Official Site' },
];

const legalLinks = [
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Refund Policy' },
];

export function Footer() {
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
              <span className="font-bold tracking-tight">SoftStore</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Official software downloads and genuine licensing for IDM and WinRAR. Instant delivery, verified sources.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-xs text-green-600 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              Official sources only
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Navigation</h3>
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
            <h3 className="font-semibold mb-4 text-sm">Official Publisher Sites</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {officialLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {legalLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} className="hover:text-primary transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} SoftStore. All rights reserved.</span>
          <span>
            All software is property of their respective publishers.{' '}
            <a href="https://www.internetdownloadmanager.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IDM</a>
            {' & '}
            <a href="https://www.win-rar.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WinRAR</a>
            {' are registered trademarks.'}
          </span>
        </div>
      </div>
    </footer>
  );
}
