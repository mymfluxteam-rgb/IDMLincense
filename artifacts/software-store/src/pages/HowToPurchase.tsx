import { MonitorSmartphone, KeyRound, Send, Mail, Star, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useGeo } from '@/context/GeoContext';
import { translations } from '@/context/translations';

const stepIcons = [MonitorSmartphone, KeyRound, Send, Mail, Star];
const stepColors = [
  'bg-blue-500/10 text-blue-500',
  'bg-purple-500/10 text-purple-500',
  'bg-orange-500/10 text-orange-500',
  'bg-green-500/10 text-green-500',
  'bg-yellow-500/10 text-yellow-500',
];

export default function HowToPurchase() {
  const { locale } = useGeo();
  const t = translations[locale].howToPurchase;

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

      {/* Steps */}
      <div className="relative space-y-6 mb-16">
        <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-border hidden md:block" />
        {t.steps.map((step, i) => {
          const Icon = stepIcons[i];
          return (
            <div key={i} className="relative flex gap-5 md:gap-6">
              <div
                className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-background shadow-sm ${stepColors[i]}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{step.number}</span>
                  <h3 className="font-bold text-base">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="rounded-xl border bg-primary/5 p-6 mb-12">
        <h2 className="font-bold text-base mb-4 text-center">{t.readyTitle}</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="sm" className="gap-2">
            <Link href="/order-license">{t.buyIdm}</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="gap-2">
            <Link href="/order-license">{t.buyWinrar}</Link>
          </Button>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold">{t.faqTitle}</h2>
        </div>
        <div className="space-y-4">
          {t.faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border p-5 bg-muted/30">
              <h3 className="font-semibold text-sm mb-1.5">{faq.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">{t.stillHaveQ}</p>
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">{t.contactSupport}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
