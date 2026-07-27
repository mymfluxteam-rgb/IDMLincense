import { Check, ExternalLink, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { useGeo } from '@/context/GeoContext';
import { translations, formatPrice } from '@/context/translations';

export default function Pricing() {
  const { locale, currency } = useGeo();
  const t = translations[locale].pricing;

  const plans = [
    {
      name: 'Internet Download Manager',
      icon: '⚡',
      description: t.lifetimeLicense,
      usdPrice: 24.95,
      highlight: false,
      featureKey: 'idm' as const,
      trialUrl: 'https://www.internetdownloadmanager.com/download.html',
      buyUrl: 'https://www.internetdownloadmanager.com/register.html',
      badge: null as null | string,
    },
    {
      name: 'WinRAR',
      icon: '📦',
      description: t.singleUser,
      usdPrice: 29.0,
      highlight: true,
      featureKey: 'winrar' as const,
      trialUrl: 'https://www.win-rar.com/download.html',
      buyUrl: 'https://www.win-rar.com/register.html',
      badge: 'Best Value',
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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {plans.map((plan) => {
          const features = t.features[plan.featureKey];
          const displayPrice = formatPrice(plan.usdPrice, currency);
          return (
            <Card
              key={plan.name}
              className={`flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.highlight ? 'border-2 border-primary shadow-lg' : 'border-2 hover:border-primary/40'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <Badge className="text-xs font-semibold">{plan.badge}</Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{plan.icon}</span>
                  <div>
                    <CardTitle className="text-lg leading-tight">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">{plan.description}</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold tracking-tight">{displayPrice}</span>
                  <span className="text-sm text-muted-foreground">{t.oneTime}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
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
                  <a href={plan.buyUrl} target="_blank" rel="noopener noreferrer">
                    {t.buyBtn(displayPrice)} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
                  <a href={plan.trialUrl} target="_blank" rel="noopener noreferrer">
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
