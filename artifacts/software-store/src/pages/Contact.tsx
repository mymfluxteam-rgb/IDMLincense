import { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'wouter';
import { useGeo } from '@/context/GeoContext';
import { translations } from '@/context/translations';

export default function Contact() {
  const { locale } = useGeo();
  const t = translations[locale].contact;
  const nav = translations[locale].nav;

  const quickHrefs = ['/how-to-purchase', '/pricing', '/order-license'];

  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-lg text-center">
        <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t.successTitle}</h1>
        <p className="text-muted-foreground mb-6 text-sm">{t.successSub(form.name, form.email)}</p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', email: '', reason: '', message: '' });
          }}
        >
          {t.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-14 max-w-4xl">
      {/* Header */}
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
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
              {t.formTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.nameLabel}</Label>
                  <Input
                    id="name"
                    placeholder={t.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">{t.reasonLabel}</Label>
                <Select value={form.reason} onValueChange={(v) => setForm({ ...form, reason: v })}>
                  <SelectTrigger id="reason" className="h-11">
                    <SelectValue placeholder={t.reasonPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {t.reasons.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t.messageLabel}</Label>
                <Textarea
                  id="message"
                  placeholder={t.messagePlaceholder}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 gap-2"
                disabled={!form.name || !form.email || !form.message}
              >
                <Mail className="h-4 w-4" />
                {t.submitBtn}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Side */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-lg border bg-muted/30 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-blue-500" />
              <p className="font-semibold text-sm">{t.responseTitle}</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.responseBody}</p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-5">
            <p className="font-semibold text-sm mb-2">{t.quickTitle}</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {t.quickLinks.map((label, i) => (
                <li key={i}>
                  <Link
                    href={quickHrefs[i]}
                    className="text-primary underline underline-offset-2 hover:no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border bg-primary/5 p-5">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{t.noteTitle}</strong> {t.noteBody}{' '}
              <a
                href="https://www.internetdownloadmanager.com/support.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                IDM Support
              </a>{' '}
              {locale === 'my' ? 'သို့မဟုတ်' : 'or'}{' '}
              <a
                href="https://www.win-rar.com/support.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                WinRAR Support
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
