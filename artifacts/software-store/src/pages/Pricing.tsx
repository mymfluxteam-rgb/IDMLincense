import { Check, ExternalLink, HelpCircle, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'wouter';
import { useGeo } from '@/context/GeoContext';
import { translations } from '@/context/translations';

// Fixed prices — keyed by package then currency
const PRICES = {
  '1year': {
    MMK: { original: 30000, discounted: 25000, savings: 5000 },
    USD: { original: 7.14, discounted: 5.95, savings: 1.19 },
  },
  lifetime: {
    MMK: { original: 60000, discounted: 50000, savings: 10000 },
    USD: { original: 14.28, discounted: 11.90, savings: 2.38 },
  },
} as const;

function fmtMMK(n: number) {
  return `K ${n.toLocaleString()}`;
}
function fmtUSD(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function Pricing() {
  const { locale, currency } = useGeo();
  const t = translations[locale].pricing;

  const packages = [
    {
      key: '1year' as const,
      term: t.term1Year,
      sub: t.term1YearSub,
      highlight: false,
      badge: null as string | null,
    },
    {
      key: 'lifetime' as const,
      term: t.termLifetime,
      sub: t.termLifetimeSub,
      highlight: true,
      badge: locale === 'my' ? 'အကောင်းဆုံး' : 'Best Value',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-14 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 text-xs font-semibold uppercase tracking-wide">
          {t.badge}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{t.title}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">{t.sub}</p>
      </div>

      {/* Package cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {packages.map((pkg) => {
          const prices = PRICES[pkg.key][currency];
          const features = t.features[pkg.key];

          const originalDisplay = currency === 'MMK' ? fmtMMK(prices.original) : fmtUSD(prices.original);
          const discountedDisplay = currency === 'MMK' ? fmtMMK(prices.discounted) : fmtUSD(prices.discounted);
          const savingsDisplay = currency === 'MMK' ? fmtMMK(prices.savings) : fmtUSD(prices.savings);

          return (
            <Card
              key={pkg.key}
              className={`flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                pkg.highlight
                  ? 'border-2 border-primary shadow-lg'
                  : 'border-2 hover:border-primary/40'
              }`}
            >
              {/* Best Value badge */}
              {pkg.badge && (
                <div className="absolute top-4 right-4">
                  <Badge className="text-xs font-semibold">{pkg.badge}</Badge>
                </div>
              )}

              <CardHeader className="pb-3">
                {/* Term title */}
                <div className="mb-3">
                  <h2 className="text-2xl font-extrabold tracking-tight">{pkg.term}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{pkg.sub}</p>
                </div>

                {/* Discount ribbon */}
                <div className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-full px-3 py-1 text-xs font-bold w-fit mb-3">
                  <Tag className="h-3 w-3" />
                  {t.discountBadge}
                </div>

                {/* Original price (strikethrough) */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {t.originalLabel}
                  </span>
                  <span className="text-base text-muted-foreground line-through decoration-red-500 decoration-2">
                    {originalDisplay}
                  </span>
                </div>

                {/* Discounted price */}
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mr-1">
                    {t.yourPrice}
                  </span>
                  <span className="text-4xl font-extrabold tracking-tight text-primary">
                    {discountedDisplay}
                  </span>
                  <span className="text-sm text-muted-foreground">{t.oneTime}</span>
                </div>

                {/* Savings callout */}
                <div className="mt-2 inline-flex items-center gap-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-md px-2.5 py-1 text-xs font-semibold w-fit">
                  ✓ {t.save(savingsDisplay)}
                </div>
              </CardHeader>

              <CardContent className="flex-1 pt-0">
                <ul className="space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-2 pt-4 border-t">
                <Button asChild className="w-full gap-2">
                  <a href={t.buyUrlIdm} target="_blank" rel="noopener noreferrer">
                    {t.buyBtn(discountedDisplay)} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
                  <a href={t.trialUrlIdm} target="_blank" rel="noopener noreferrer">
                    {t.trialBtn}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* FAQ hint */}
      <div className="rounded-xl border bg-muted/40 p-6 text-center">
        <HelpCircle className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
        <h3 className="font-semibold mb-1">{t.notSure}</h3>
        <p className="text-sm text-muted-foreground mb-4">{t.notSureSub}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="sm" variant="default">
            <Link href="/how-to-purchase">{t.howToPurchase}</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/contact">{t.contact}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
