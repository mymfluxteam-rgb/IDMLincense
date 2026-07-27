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

const reasons = [
  'License activation help',
  'Download / installation issue',
  'Order & payment inquiry',
  'License key not received',
  'Refund request',
  'General question',
];

export default function Contact() {
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
        <h1 className="text-2xl font-bold mb-2">Message Received!</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Thank you, <strong>{form.name}</strong>. We've received your message and will respond to{' '}
          <strong>{form.email}</strong> within 24 hours.
        </p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', reason: '', message: '' }); }}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-14 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-4 text-xs font-semibold uppercase tracking-wide">We're Here to Help</Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Contact Support Team</h1>
        <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
          Have a question about licensing, downloads, or activation? Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Form */}
        <Card className="md:col-span-3 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
              Send a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Contact</Label>
                <Select value={form.reason} onValueChange={(v) => setForm({ ...form, reason: v })}>
                  <SelectTrigger id="reason" className="h-11">
                    <SelectValue placeholder="Select a reason…" />
                  </SelectTrigger>
                  <SelectContent>
                    {reasons.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail…"
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
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Side */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-lg border bg-muted/30 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-blue-500" />
              <p className="font-semibold text-sm">Response Time</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We typically respond within <strong>2–24 hours</strong> on business days.
              For urgent license issues, mention "URGENT" in your message.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-5">
            <p className="font-semibold text-sm mb-2">Common Quick Answers</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/how-to-purchase" className="text-primary underline underline-offset-2 hover:no-underline">
                  How do I buy a license?
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-primary underline underline-offset-2 hover:no-underline">
                  What are the prices?
                </Link>
              </li>
              <li>
                <Link href="/order-license" className="text-primary underline underline-offset-2 hover:no-underline">
                  I want to order a license now
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border bg-primary/5 p-5">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Note:</strong> For issues specific to the software itself (bugs,
              crashes), please also consult the official publisher support pages:{' '}
              <a href="https://www.internetdownloadmanager.com/support.html" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">IDM Support</a>
              {' '}or{' '}
              <a href="https://www.win-rar.com/support.html" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">WinRAR Support</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
