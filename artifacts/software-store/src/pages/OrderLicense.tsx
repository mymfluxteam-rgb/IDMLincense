import { useState } from 'react';
import { ShieldCheck, Clock, Mail, KeyRound, QrCode, Copy, Check as CheckIcon } from 'lucide-react';
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
import { translations } from '@/context/translations';

const PRICING = {
  idm: {
    '1year':   { USD: 5.95,  MMK: 25000 },
    lifetime:  { USD: 11.90, MMK: 50000 },
  },
  winrar: {
    '1year':   { USD: 5.95,  MMK: 25000 },
    lifetime:  { USD: 11.90, MMK: 50000 },
  },
} as const;

const productOptions = [
  { value: 'idm',    displayName: 'Internet Download Manager (IDM)', icon: '⚡' },
  { value: 'winrar', displayName: 'WinRAR',                           icon: '📦' },
];

export default function OrderLicense() {
  const { locale, currency } = useGeo();
  const t = translations[locale].orderLicense;

  const [product,     setProduct]     = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [email,       setEmail]       = useState('');
  const [hwid,        setHwid]        = useState('');
  const [submitted,   setSubmitted]   = useState(false);
  const [showKbzQr,   setShowKbzQr]   = useState(false);
  const [showWaveQr,  setShowWaveQr]  = useState(false);
  const [copiedKbz,   setCopiedKbz]   = useState(false);
  const [copiedWave,  setCopiedWave]  = useState(false);

  const copyToClipboard = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 2000);
    });
  };

  const licenseOptions = [
    { value: '1year',    label: locale === 'my' ? 'တစ်နှစ်'     : '1 Year'   },
    { value: 'lifetime', label: locale === 'my' ? 'တစ်သက်တာ'   : 'Lifetime'  },
  ];

  const fmtPrice = (usd: number, mmk: number) =>
    currency === 'MMK' ? `K ${mmk.toLocaleString()}` : `$${usd.toFixed(2)}`;

  const selectedProduct     = productOptions.find(p => p.value === product);
  const selectedLicenseOpt  = licenseOptions.find(l => l.value === licenseType);
  const selectedPrice       = product && licenseType
    ? fmtPrice(
        PRICING[product as keyof typeof PRICING][licenseType as '1year' | 'lifetime'].USD,
        PRICING[product as keyof typeof PRICING][licenseType as '1year' | 'lifetime'].MMK,
      )
    : null;

  const reset = () => {
    setSubmitted(false); setProduct(''); setLicenseType(''); setEmail(''); setHwid('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product && licenseType && email && hwid) setSubmitted(true);
  };

  /* ── Success screen ─────────────────────────────────────────────── */
  if (submitted && selectedProduct && selectedLicenseOpt) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">{t.successTitle}</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          {t.successSub(selectedProduct.displayName, email)}
        </p>
        <div className="rounded-lg border bg-muted/40 p-4 text-left text-sm space-y-2.5 mb-6">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground shrink-0">
              {locale === 'my' ? 'ထုတ်ကုန်' : 'Product'}
            </span>
            <span className="font-medium text-right">{selectedProduct.displayName}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground shrink-0">
              {locale === 'my' ? 'လိုင်စင်' : 'License'}
            </span>
            <span className="font-medium">{selectedLicenseOpt.label}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground shrink-0">
              {locale === 'my' ? 'ဈေးနှုန်း' : 'Price'}
            </span>
            <span className="font-bold text-primary">{selectedPrice}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground shrink-0">HWID</span>
            <span className="font-mono text-xs break-all">{hwid}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={reset}>{t.startOver}</Button>
      </div>
    );
  }

  /* ── Order form ─────────────────────────────────────────────────── */
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

              {/* Product */}
              <div className="space-y-2">
                <Label htmlFor="product">{t.productLabel}</Label>
                <Select value={product} onValueChange={(v) => { setProduct(v); setLicenseType(''); }}>
                  <SelectTrigger id="product" className="h-11">
                    <SelectValue placeholder={t.productPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {productOptions.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.icon}  {p.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* License type */}
              <div className="space-y-2">
                <Label>{locale === 'my' ? 'လိုင်စင် အမျိုးအစား' : 'License Type'}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {licenseOptions.map((opt) => {
                    const prices = product
                      ? PRICING[product as keyof typeof PRICING]?.[opt.value as '1year' | 'lifetime']
                      : null;
                    const priceStr = prices ? fmtPrice(prices.USD, prices.MMK) : null;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setLicenseType(opt.value)}
                        className={`rounded-lg border-2 p-3 text-left transition-all ${
                          licenseType === opt.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/40'
                        }`}
                      >
                        <div className="font-semibold text-sm">{opt.label}</div>
                        {priceStr ? (
                          <div className="text-primary font-bold text-lg mt-0.5">{priceStr}</div>
                        ) : (
                          <div className="text-muted-foreground text-xs mt-0.5">
                            {locale === 'my' ? 'ထုတ်ကုန် ရွေးပါ' : 'select product first'}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Email */}
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

              {/* HWID */}
              <div className="space-y-2">
                <Label htmlFor="hwid" className="flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-primary" />
                  HWID (Hardware ID)
                </Label>
                <Input
                  id="hwid"
                  type="text"
                  placeholder={
                    locale === 'my'
                      ? 'License tool မှ HWID ကူးယူ ထည့်ပါ…'
                      : 'Paste your HWID from the license tool…'
                  }
                  value={hwid}
                  onChange={(e) => setHwid(e.target.value)}
                  required
                  className="h-11 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  {locale === 'my'
                    ? 'License software ဖွင့်ပြီး ပြထားသော HWID ကို ကူးယူပါ'
                    : 'Open the license software, then copy the HWID shown there'}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-11 gap-2"
                disabled={!product || !licenseType || !email || !hwid}
              >
                {t.submitBtn}
              </Button>

              <p className="text-xs text-muted-foreground text-center">{t.submitNote}</p>
            </form>
          </CardContent>
        </Card>

        {/* Side info */}
        <div className="md:col-span-2 space-y-4">
          {[
            { icon: ShieldCheck, color: 'text-green-500', title: t.sideTitle1, body: t.sideBody1 },
            { icon: Clock,       color: 'text-blue-500',  title: t.sideTitle2, body: t.sideBody2 },
            { icon: Mail,        color: 'text-purple-500',title: t.sideTitle3, body: t.sideBody3 },
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

      {/* ── Myanmar Payment Methods ────────────────────────────────── */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl">💳</span>
          <h2 className="text-lg font-bold">
            {locale === 'my' ? 'မြန်မာ ငွေပေးချေနည်းများ' : 'Myanmar Payment Methods'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* KBZ Pay */}
          <div className="rounded-xl border-2 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-lg font-bold text-blue-700 dark:text-blue-300 shrink-0">K</div>
              <div>
                <p className="font-bold text-sm">KBZ Pay</p>
                <p className="text-xs text-muted-foreground">
                  {locale === 'my' ? 'U Nyi Ye Lin' : 'U Nyi Ye Lin'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3">
              <span className="font-mono text-lg font-bold tracking-wider select-all flex-1">686022905</span>
              <button
                type="button"
                onClick={() => copyToClipboard('686022905', setCopiedKbz)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={locale === 'my' ? 'ကူးယူ' : 'Copy'}
              >
                {copiedKbz ? <CheckIcon className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => setShowKbzQr(v => !v)}
            >
              <QrCode className="h-4 w-4" />
              {showKbzQr
                ? (locale === 'my' ? 'QR ကုဒ် ပိတ်မည်' : 'Hide QR Code')
                : (locale === 'my' ? 'QR ကုဒ် ကြည့်မည်' : 'Show QR Code')}
            </Button>

            {showKbzQr && (
              <div className="flex flex-col items-center pt-1">
                <img
                  src="/kbzpay-qr.png"
                  alt="KBZ Pay QR Code"
                  className="w-48 h-48 object-contain rounded-xl border"
                />
                <p className="text-xs text-muted-foreground mt-2">U Nyi Ye Lin (*2905)</p>
              </div>
            )}
          </div>

          {/* Wave Money */}
          <div className="rounded-xl border-2 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-lg font-bold text-orange-700 dark:text-orange-300 shrink-0">W</div>
              <div>
                <p className="font-bold text-sm">Wave Money</p>
                <p className="text-xs text-muted-foreground">
                  {locale === 'my' ? 'Nyi Ye Lin' : 'Nyi Ye Lin'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3">
              <span className="font-mono text-lg font-bold tracking-wider select-all flex-1">771180852</span>
              <button
                type="button"
                onClick={() => copyToClipboard('771180852', setCopiedWave)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={locale === 'my' ? 'ကူးယူ' : 'Copy'}
              >
                {copiedWave ? <CheckIcon className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => setShowWaveQr(v => !v)}
            >
              <QrCode className="h-4 w-4" />
              {showWaveQr
                ? (locale === 'my' ? 'QR ကုဒ် ပိတ်မည်' : 'Hide QR Code')
                : (locale === 'my' ? 'QR ကုဒ် ကြည့်မည်' : 'Show QR Code')}
            </Button>

            {showWaveQr && (
              <div className="flex flex-col items-center pt-1">
                <img
                  src="/wavemoney-qr.png"
                  alt="Wave Money QR Code"
                  className="w-48 h-48 object-contain rounded-xl border"
                />
                <p className="text-xs text-muted-foreground mt-2">Nyi Ye Lin (09771180852)</p>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          {locale === 'my'
            ? 'ငွေပေးချေပြီးနောက် ငွေပေးချေမှု screenshot နှင့်အတူ ကျွန်ုပ်တို့ support team ကို ဆက်သွယ်ပါ'
            : 'After payment, send your payment screenshot to our support team to confirm and process your order.'}
        </p>
      </div>
    </div>
  );
}
