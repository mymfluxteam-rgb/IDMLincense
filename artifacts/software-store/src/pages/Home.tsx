import { Download, ShieldCheck, Star, Zap, Clock, ArrowRight, KeyRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { useGeo } from '@/context/GeoContext';
import { translations, formatPrice } from '@/context/translations';

/** Simple Windows logo icon (four-pane flag) */
const WindowsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 88 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.202zm35.67 33.529.028 34.453L.028 75.48.026 45.7zm4.326-38.951L87.314 0v41.527l-47.318.376zm47.329 39.26-.011 41.34-47.318-6.678-.066-34.739z"/>
  </svg>
);

/** Mega cloud icon */
const MegaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 15.67c0 .195-.077.382-.215.52l-2.23 2.23a.735.735 0 0 1-.52.215.735.735 0 0 1-.52-.215L12 16.01l-2.41 2.41a.735.735 0 0 1-.52.215.735.735 0 0 1-.52-.215l-2.23-2.23a.735.735 0 0 1-.215-.52c0-.195.077-.382.215-.52L8.73 13.24 6.32 10.83a.735.735 0 0 1-.215-.52c0-.195.077-.382.215-.52l2.23-2.23a.735.735 0 0 1 .52-.215c.195 0 .382.077.52.215L12 10.01l2.41-2.41a.735.735 0 0 1 .52-.215c.195 0 .382.077.52.215l2.23 2.23c.138.138.215.325.215.52 0 .195-.077.382-.215.52l-2.41 2.41 2.41 2.41c.138.138.215.325.215.52z"/>
  </svg>
);

const trustIcons = [ShieldCheck, Zap, Clock, Star];
const trustColors = ['text-green-500', 'text-yellow-500', 'text-blue-500', 'text-purple-500'];

const MEGA_LICENSE_X64 = 'https://mega.nz/file/jlxxiKoL#VJpj11uOnzt4VKTLkF6yOAc7_kvix5s_5gLB509cNJY';
const MEGA_LICENSE_X86 = 'https://mega.nz/file/jlxxiKoL#VJpj11uOnzt4VKTLkF6yOAc7_kvix5s_5gLB509cNJY';

const products = [
  {
    id: 'idm',
    name: 'Internet Download Manager',
    shortName: 'IDM',
    version: '6.42',
    usdPrice: 5.95,
    badge: 'Most Popular',
    badgeVariant: 'default' as const,
    icon: '⚡',
    gradient: 'from-blue-500/10 to-indigo-500/10',
    accent: 'bg-blue-500',
    x64Url: 'https://www.internetdownloadmanager.com/download.html',
    x86Url: 'https://www.internetdownloadmanager.com/download.html',
    purchaseUrl: 'https://www.internetdownloadmanager.com/register.html',
    descKey: 'idm' as const,
    featureKey: 'idm' as const,
  },
  {
    id: 'winrar',
    name: 'WinRAR',
    shortName: 'WinRAR',
    version: '7.10',
    usdPrice: 5.95,
    badge: 'Trusted Worldwide',
    badgeVariant: 'secondary' as const,
    icon: '📦',
    gradient: 'from-orange-500/10 to-red-500/10',
    accent: 'bg-orange-500',
    x64Url: 'https://www.rarlab.com/rar/winrar-x64-710.exe',
    x86Url: 'https://www.rarlab.com/rar/wrar710.exe',
    purchaseUrl: 'https://www.win-rar.com/register.html',
    descKey: 'winrar' as const,
    featureKey: 'winrar' as const,
  },
];

const productDescriptions = {
  en: {
    idm: 'Internet Download Manager is a powerful download accelerator that increases download speeds by up to 5 times, resumes and schedules downloads, and integrates seamlessly with all major browsers.',
    winrar: 'WinRAR is a powerful archive manager that supports RAR, ZIP, and over a dozen other formats. Compress, encrypt, package and backup your files with ease.',
  },
  my: {
    idm: 'Internet Download Manager သည် ဒေါင်းလုပ် အမြန်နှုန်းကို ၅ ဆ အထိ တိုးမြှင့်ပေး၍ ဒေါင်းလုပ်များကို ဆက်ဆွဲ၊ အချိန်ဆွဲနိုင်ပြီး ထိပ်တန်း ဘရောင်ဇာများနှင့် ချောမွေ့စွာ ပေါင်းစည်းနိုင်သော ဒေါင်းလုပ် အရှိန်မြှင့်ကိရိယာ ဖြစ်သည်။',
    winrar: 'WinRAR သည် RAR၊ ZIP နှင့် ဖော်မတ် ၁၂ မျိုးကျော်ကို ပံ့ပိုးသည့် ပါဝါဖြည့် အာကိုင်ဗ် မန်နေဂျာ ဖြစ်သည်။ ဖိုင်များကို ဖိသိပ်၊ ကုဒ်ဝှက်၊ ထုပ်ပိုး နှင့် backup ယူနိုင်သည်။',
  },
};

export default function Home() {
  const { locale, currency } = useGeo();
  const t = translations[locale].home;
  const trustKeys = ['official', 'instant', 'support', 'rating'] as const;

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background py-20 md:py-32">
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
            {t.heroBadge}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {t.heroTitle}
            <br />
            <span className="text-primary">{t.heroAccent}</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2 shadow-md">
              <a href="#products">
                <Download className="h-4 w-4" /> {t.browseSoftware}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-background/30 text-background hover:bg-background/10 hover:text-background"
            >
              <Link href="/pricing">{t.viewPricing}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-5 max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustKeys.map((key, i) => {
              const Icon = trustIcons[i];
              return (
                <div key={key} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Icon className={`h-4 w-4 ${trustColors[i]}`} />
                  {t.trust[key]}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{t.availableTitle}</h2>
          <p className="text-muted-foreground text-sm md:text-base">{t.availableSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => {
            const features = t.features[product.featureKey];
            const description = productDescriptions[locale][product.descKey];
            return (
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
                          <Badge variant="outline" className="text-xs font-mono">
                            v{product.version}
                          </Badge>
                          <Badge variant="outline" className="text-xs font-semibold">
                            {formatPrice(product.usdPrice, currency)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Badge variant={product.badgeVariant} className="shrink-0 text-xs">
                      {product.badge}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  <ul className="space-y-1.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <div className={`h-1.5 w-1.5 rounded-full ${product.accent} shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 border-t bg-background/50 flex-col gap-3">
                  {/* Architecture download buttons */}
                  <div className="w-full space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      <WindowsIcon className="h-3 w-3" />
                      {locale === 'my' ? 'Windows ဒေါင်းလုပ်' : 'Windows Download'}
                    </p>
                    <div className="flex gap-2 w-full">
                      <Button asChild variant="default" size="sm" className="flex-1 gap-1.5 font-semibold">
                        <a href={product.x64Url} target="_blank" rel="noopener noreferrer">
                          <WindowsIcon className="h-3.5 w-3.5 shrink-0" />
                          <Download className="h-3 w-3 shrink-0" />
                          64-bit
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="flex-1 gap-1.5 font-semibold">
                        <a href={product.x86Url} target="_blank" rel="noopener noreferrer">
                          <WindowsIcon className="h-3.5 w-3.5 shrink-0" />
                          <Download className="h-3 w-3 shrink-0" />
                          32-bit
                        </a>
                      </Button>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="w-full border border-dashed">
                    <Link href="/order-license">{t.buyLicense}</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* License Software Download — standalone card */}
        <div className="mt-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Left: title + steps */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 shrink-0">
                      <KeyRound className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-tight">
                        {locale === 'my' ? 'လိုင်စင် ဆော့ဖ်ဝဲ ဒေါင်းလုပ်' : 'License Software Download'}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {locale === 'my' ? 'ဝယ်ယူပြီးသောသူများအတွက်' : 'For customers who have already purchased'}
                      </p>
                    </div>
                  </div>
                  <ol className="space-y-2">
                    {[
                      locale === 'my' ? 'Tool ကို ဒေါင်းလုပ်ဆွဲပြီး ဖွင့်ပါ' : 'Download the tool and open it',
                      locale === 'my' ? 'HWID ကို ကူးယူပြီး မှာယူမှု field တွင် ဖြည့်သွင်းကာ မှတ်ပုံတင်ပါ' : 'Copy the HWID and fill it in the order field and register',
                      locale === 'my' ? 'ထို့နောက် Telegram မှတဆင့် ကျွန်ုပ်တို့ team သို့ ပေးပို့ပါ' : 'Then send it to our team via Telegram',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                {/* Right: architecture download buttons */}
                <div className="md:w-64 shrink-0 space-y-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <WindowsIcon className="h-3 w-3 text-primary" />
                    {locale === 'my' ? 'Mega မှ ဒေါင်းလုပ်' : 'Download via Mega'}
                  </p>
                  <Button asChild className="w-full gap-2 h-11 font-semibold shadow-md">
                    <a
                      href={MEGA_LICENSE_X64}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WindowsIcon className="h-4 w-4 shrink-0" />
                      <Download className="h-4 w-4 shrink-0" />
                      {locale === 'my' ? '၆၄-ဘစ် (Mega)' : '64-bit — Mega'}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full gap-2 h-11 font-semibold">
                    <a
                      href={MEGA_LICENSE_X86}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WindowsIcon className="h-4 w-4 shrink-0" />
                      <Download className="h-4 w-4 shrink-0" />
                      {locale === 'my' ? '၃၂-ဘစ် (Mega)' : '32-bit — Mega'}
                    </a>
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                    {locale === 'my' ? 'Mega မှတဆင့် လုံခြုံစိတ်ချစွာ ဒေါင်းလုပ်ဆွဲနိုင်သည်' : 'Securely hosted on Mega cloud'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA strip */}
        <div className="mt-12 rounded-xl border bg-primary/5 p-6 md:p-8 text-center">
          <h3 className="text-lg font-bold mb-2">{t.needHelp}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t.needHelpSub}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="default" size="sm" className="gap-2">
              <Link href="/how-to-purchase">
                {t.howToPurchase} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/contact">{t.contactSupport}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
