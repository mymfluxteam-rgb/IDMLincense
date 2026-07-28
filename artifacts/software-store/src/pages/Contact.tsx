import { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle, Send } from 'lucide-react';

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      setError('Contact form is not configured yet. Please try again later.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: form.reason ? `[SoftStore] ${form.reason} — from ${form.name}` : `[SoftStore] New message from ${form.name}`,
          reason: form.reason,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.errors?.[0]?.message ?? 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full h-11 gap-2"
                disabled={!form.name || !form.email || !form.message || loading}
              >
                <Mail className="h-4 w-4" />
                {loading ? 'Sending…' : t.submitBtn}
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

          <div className="rounded-lg border bg-[#229ED9]/10 border-[#229ED9]/30 p-5 space-y-3">
            <div className="flex items-start gap-2">
              <TelegramIcon className="h-4 w-4 text-[#229ED9] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">{t.noteTitle}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{t.noteBody}</p>
              </div>
            </div>
            <a
              href="https://t.me/NetCodeShop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#229ED9] hover:bg-[#1a8ec4] text-white text-sm font-semibold py-2.5 px-4 transition-colors"
            >
              <TelegramIcon className="h-4 w-4" />
              {t.telegramLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
