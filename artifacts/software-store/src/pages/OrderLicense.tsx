import { useState } from 'react';
import { ExternalLink, ShieldCheck, Clock, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'wouter';
import { useGeo } from '@/context/GeoContext';
import { translations, formatPrice } from '@/context/translations';

export default function OrderLicense() {
  const { locale, currency } = useGeo();
  const t = translations[locale].orderLicense;

  const products = [
    {
      value: 'idm',
      label: `Internet Download Manager (IDM) — ${formatPrice(24.95, currency)}`,
      buyUrl: 'https://www.internetdownloadmanager.com/register.html',
      displayName: 'Internet Download Manager (IDM)',
    },
    {
      value: 'winrar',
      label: `WinRAR — ${formatPrice(29.0, currency)}`,
      buyUrl: 'https://www.win-rar.com/register.html',
      displayName: 'WinRAR',
    },
  ];

  const [selected, setSelected] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedProduct = products.find((p) => p.value === selected);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected && email) setSubmitted(true);
  };

  if (submitted && selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">{t.successTitle}</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          {t.successSub(selectedProduct.displayName, email)}
        </p>
        <Button asChild size="lg" className="gap-2 w-full mb-3">
          <a href={selectedProduct.buyUrl} target="_blank" rel="noopener noreferrer">
            {t.completePurchase} <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSubmitted(false);
            setSelected('');
            setEmail('');
          }}
        >
          {t.startOver}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-14 max-w-4xl">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-4 text-xs font-semibold uppercase tracking-wide">
          {t.badge}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{t.title}</h1>
        <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">{t.sub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Form */}
        <Card className="md:col-span-3 border-2">
          <CardHeader>
            <CardTitle className="text-lg">{t.formTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="product">{t.productLabel}</Label>
                <Select value={selected} onValueChange={setSelected}>
                  <SelectTrigger id="product" className="h-11">
                    <SelectValue placeholder={t.productPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">{t.emailHint}</p>
              </div>

              <Button type="submit" className="w-full h-11 gap-2" disabled={!selected || !email}>
                {t.submitBtn} <ExternalLink className="h-4 w-4" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">{t.submitNote}</p>
            </form>
          </CardContent>
        </Card>

        {/* Side info */}
        <div className="md:col-span-2 space-y-4">
          {[
            { icon: ShieldCheck, color: 'text-green-500', title: t.sideTitle1, body: t.sideBody1 },
            { icon: Clock, color: 'text-blue-500', title: t.sideTitle2, body: t.sideBody2 },
            { icon: Mail, color: 'text-purple-500', title: t.sideTitle3, body: t.sideBody3 },
          ].map(({ icon: Icon, color, title, body }) => (
            <div key={title} className="flex gap-3 rounded-lg border bg-muted/30 p-4">
              <Icon className={`h-5 w-5 ${color} shrink-0 mt-0.5`} />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{body}</p>
              </div>
            </div>
          ))}
          <div className="rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground">
            {t.sideNote}{' '}
            <Link href="/contact" className="text-primary underline underline-offset-2 hover:no-underline">
              {t.contactLink}
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
