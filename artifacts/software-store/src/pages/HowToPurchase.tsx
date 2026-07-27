import { ShoppingCart, Mail, KeyRound, MonitorSmartphone, HelpCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const steps = [
  {
    number: '01',
    icon: ShoppingCart,
    color: 'bg-blue-500/10 text-blue-500',
    title: 'Choose Your Software',
    body: 'Browse our catalog and select the software you need — Internet Download Manager (IDM) or WinRAR. Click "Buy License" to go to the official publisher\'s secure checkout page.',
  },
  {
    number: '02',
    icon: MonitorSmartphone,
    color: 'bg-purple-500/10 text-purple-500',
    title: 'Try Before You Buy (Optional)',
    body: 'Both IDM and WinRAR offer free trial versions. Download and test the software before committing to a purchase. Trials are fully functional with minor reminders to register.',
  },
  {
    number: '03',
    icon: ShoppingCart,
    color: 'bg-green-500/10 text-green-500',
    title: 'Complete Payment',
    body: 'On the official publisher website, fill in your name, email address, and payment details. Both publishers accept major credit/debit cards and PayPal. Payment is processed securely via SSL.',
  },
  {
    number: '04',
    icon: Mail,
    color: 'bg-yellow-500/10 text-yellow-500',
    title: 'Receive Your License Key',
    body: 'After payment is confirmed, you\'ll receive an email with your unique license/serial key. Check your spam folder if it doesn\'t arrive within 10 minutes.',
  },
  {
    number: '05',
    icon: KeyRound,
    color: 'bg-red-500/10 text-red-500',
    title: 'Activate Your Software',
    body: 'Open the installed software, navigate to Registration (IDM: Help → Register; WinRAR: Help → Enter license key), and enter the key exactly as provided. You\'re fully licensed!',
  },
];

const faqs = [
  {
    q: 'Is it safe to buy from the official publisher websites?',
    a: 'Yes — both internetdownloadmanager.com and win-rar.com are the official publisher websites. They use industry-standard SSL encryption for all transactions.',
  },
  {
    q: 'Can I use one license on multiple computers?',
    a: 'A standard single-user license covers one PC. Both publishers offer multi-user or business licenses if you need more activations.',
  },
  {
    q: 'What if I lose my license key?',
    a: 'Check your purchase email. If you can\'t find it, contact the publisher\'s support team with your order details — they can re-send it.',
  },
  {
    q: 'Do I need to pay again after an update?',
    a: 'No. Both IDM and WinRAR offer lifetime licenses that include all future updates at no additional cost.',
  },
];

export default function HowToPurchase() {
  return (
    <div className="container mx-auto px-4 py-14 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 text-xs font-semibold uppercase tracking-wide">Step-by-Step Guide</Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">How to Purchase a License</h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          Follow these five simple steps to get your genuine software license quickly and securely.
        </p>
      </div>

      {/* Steps */}
      <div className="relative space-y-6 mb-16">
        {/* Vertical connector line */}
        <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-border hidden md:block" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="relative flex gap-5 md:gap-6">
              {/* Icon circle */}
              <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-background shadow-sm ${step.color} font-bold text-xs`}>
                <Icon className="h-5 w-5" />
              </div>
              {/* Content */}
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
        <h2 className="font-bold text-base mb-4 text-center">Ready to get started?</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="sm" className="gap-2">
            <a href="https://www.internetdownloadmanager.com/register.html" target="_blank" rel="noopener noreferrer">
              Buy IDM License <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button asChild size="sm" variant="outline" className="gap-2">
            <a href="https://www.win-rar.com/register.html" target="_blank" rel="noopener noreferrer">
              Buy WinRAR License <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border p-5 bg-muted/30">
              <h3 className="font-semibold text-sm mb-1.5">{faq.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">Still have questions?</p>
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">Contact Support Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
