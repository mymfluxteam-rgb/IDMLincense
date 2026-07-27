import { ExternalLink, Download, ShieldCheck, Star, Zap, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';

const products = [
  {
    id: 'idm',
    name: 'Internet Download Manager',
    shortName: 'IDM',
    version: '6.42',
    category: 'Utilities',
    description:
      'Internet Download Manager is a powerful download accelerator that increases download speeds by up to 5 times, resumes and schedules downloads, and integrates seamlessly with all major browsers.',
    features: ['Up to 5× faster downloads', 'Resume broken downloads', 'Browser integration', 'Scheduler & queue'],
    trialUrl: 'https://www.internetdownloadmanager.com/download.html',
    purchaseUrl: 'https://www.internetdownloadmanager.com/register.html',
    badge: 'Most Popular',
    badgeVariant: 'default' as const,
    icon: '⚡',
    gradient: 'from-blue-500/10 to-indigo-500/10',
    accent: 'bg-blue-500',
  },
  {
    id: 'winrar',
    name: 'WinRAR',
    shortName: 'WinRAR',
    version: '7.10',
    category: 'Compression',
    description:
      'WinRAR is a powerful archive manager that supports RAR, ZIP, and over a dozen other formats. Compress, encrypt, package and backup your files with ease.',
    features: ['RAR & ZIP support', 'AES-256 encryption', 'Multi-volume archives', 'Command-line interface'],
    trialUrl: 'https://www.win-rar.com/download.html',
    purchaseUrl: 'https://www.win-rar.com/register.html',
    badge: 'Trusted Worldwide',
    badgeVariant: 'secondary' as const,
    icon: '📦',
    gradient: 'from-orange-500/10 to-red-500/10',
    accent: 'bg-orange-500',
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Official Sources Only', color: 'text-green-500' },
  { icon: Zap, label: 'Instant License Delivery', color: 'text-yellow-500' },
  { icon: Clock, label: '24/7 Support', color: 'text-blue-500' },
  { icon: Star, label: '4.9 / 5 Rating', color: 'text-purple-500' },
];

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background py-20 md:py-32">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(to right,rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.15) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/60" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <Badge
            variant="outline"
            className="mb-6 border-primary/60 text-primary bg-primary/20 backdrop-blur px-3 py-1 text-xs font-semibold tracking-wide uppercase"
          >
            Official Software Downloads
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Download &amp; License<br />
            <span className="text-primary">Professional Software</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Get genuine licenses for the world's most trusted software tools. Official downloads,
            instant delivery, and dedicated support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2 shadow-md">
              <a href="#products">
                <Download className="h-4 w-4" /> Browse Software
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-background/30 text-background hover:bg-background/10 hover:text-background">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-5 max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustBadges.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Icon className={`h-4 w-4 ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Available Software</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            All products are sourced directly from official publishers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`flex flex-col overflow-hidden border-2 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br ${product.gradient}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl select-none">{product.icon}</div>
                    <div>
                      <CardTitle className="text-xl leading-tight">{product.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs font-mono">v{product.version}</Badge>
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <Badge variant={product.badgeVariant} className="shrink-0 text-xs">
                    {product.badge}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                <ul className="space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <div className={`h-1.5 w-1.5 rounded-full ${product.accent} shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4 border-t bg-background/50 gap-3 flex-wrap">
                <Button asChild variant="default" className="flex-1 gap-2 min-w-0">
                  <a href={product.trialUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 shrink-0" />
                    Free Trial
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1 gap-2 min-w-0">
                  <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer">
                    Buy License <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 rounded-xl border bg-primary/5 p-6 md:p-8 text-center">
          <h3 className="text-lg font-bold mb-2">Need help choosing or purchasing?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our support team is available to guide you through the licensing process.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="default" size="sm" className="gap-2">
              <Link href="/how-to-purchase">
                How to Purchase <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
