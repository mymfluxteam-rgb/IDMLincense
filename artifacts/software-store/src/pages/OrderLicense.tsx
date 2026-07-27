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

const products = [
  { value: 'idm', label: 'Internet Download Manager (IDM) — $24.95', buyUrl: 'https://www.internetdownloadmanager.com/register.html' },
  { value: 'winrar', label: 'WinRAR — $29.00', buyUrl: 'https://www.win-rar.com/register.html' },
];

export default function OrderLicense() {
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
        <h1 className="text-2xl font-bold mb-2">You're one click away!</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          We've noted your request for <strong>{selectedProduct.label.split(' —')[0]}</strong>. Complete
          your purchase on the official publisher website below. Your license key will be emailed to{' '}
          <strong>{email}</strong> after payment.
        </p>
        <Button asChild size="lg" className="gap-2 w-full mb-3">
          <a href={selectedProduct.buyUrl} target="_blank" rel="noopener noreferrer">
            Complete Purchase on Official Site <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { setSubmitted(false); setSelected(''); setEmail(''); }}>
          Start over
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-14 max-w-4xl">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-4 text-xs font-semibold uppercase tracking-wide">Secure Ordering</Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Order a License</h1>
        <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
          Select your software, enter your email, and we'll guide you to the official purchase page.
          Your license key is delivered instantly after payment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Form */}
        <Card className="md:col-span-3 border-2">
          <CardHeader>
            <CardTitle className="text-lg">License Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="product">Software Product</Label>
                <Select value={selected} onValueChange={setSelected}>
                  <SelectTrigger id="product" className="h-11">
                    <SelectValue placeholder="Select a product…" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Your Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">License key will be sent here after purchase.</p>
              </div>

              <Button type="submit" className="w-full h-11 gap-2" disabled={!selected || !email}>
                Proceed to Purchase <ExternalLink className="h-4 w-4" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                You'll be redirected to the official publisher's secure checkout.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Side info */}
        <div className="md:col-span-2 space-y-4">
          {[
            { icon: ShieldCheck, color: 'text-green-500', title: 'Genuine Licenses', body: 'Every license is purchased directly from the official publisher — no grey market, no risk.' },
            { icon: Clock, color: 'text-blue-500', title: 'Instant Delivery', body: 'License keys are emailed within minutes of payment confirmation.' },
            { icon: Mail, color: 'text-purple-500', title: 'Support Included', body: 'Our team is available to help with installation and activation.' },
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
            Have questions?{' '}
            <Link href="/contact" className="text-primary underline underline-offset-2 hover:no-underline">
              Contact our support team
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
