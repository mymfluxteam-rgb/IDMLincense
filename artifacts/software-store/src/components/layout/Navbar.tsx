import { Link, useLocation } from 'wouter';
import { Download, Menu, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Download Software' },
  { href: '/order-license', label: 'Order License' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/how-to-purchase', label: 'How to Purchase License' },
  { href: '/contact', label: 'Contact Support Team' },
];

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? location === '/' : location.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm group-hover:shadow-md transition-shadow">
            <Download className="h-4 w-4" />
          </div>
          <div className="leading-none">
            <span className="font-bold tracking-tight text-foreground">SoftStore</span>
            <span className="hidden sm:block text-[10px] text-muted-foreground font-medium tracking-wide">Digital Software Marketplace</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
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

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/98 backdrop-blur px-4 py-4 space-y-1 shadow-lg">
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
          <div className="pt-3 mt-3 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground px-3">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500 shrink-0" />
            Official downloads only — safe &amp; verified
          </div>
        </div>
      )}
    </header>
  );
}
