import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ShieldCheck, Clock, Mail, KeyRound, QrCode, Copy, Check as CheckIcon,
  X, Wallet, Globe, Send, ChevronLeft, ExternalLink, Loader2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Link } from 'wouter';
import { useGeo } from '@/context/GeoContext';
import { translations } from '@/context/translations';

/* ── Constants ─────────────────────────────────────────────────────────────── */

const PRICING = {
  idm:    { '1year': { USD: 5.95,  MMK: 25000 }, lifetime: { USD: 11.90, MMK: 50000 } },
  winrar: { '1year': { USD: 5.95,  MMK: 25000 }, lifetime: { USD: 11.90, MMK: 50000 } },
} as const;

const PRODUCT_OPTIONS = [
  { value: 'idm',    displayName: 'Internet Download Manager (IDM)', icon: '⚡' },
  { value: 'winrar', displayName: 'WinRAR',                           icon: '📦' },
];

const TELEGRAM_USERNAME = 'NetCodeShop';
const TELEGRAM_WEB_URL  = `https://t.me/${TELEGRAM_USERNAME}`;

const KBZ_NUMBER  = '09686022905';
const WAVE_NUMBER = '09771180852';

const CRYPTO_ASSETS = [
  {
    id: 'btc',
    label: 'Bitcoin',
    ticker: 'BTC',
    network: 'Bitcoin Network',
    address: 'bc1qff7tyhcxemcw643d9lmseu3txwpx8347z4d9uh',
    color: 'text-orange-500',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    icon: '₿',
    trustLink: 'https://link.trustwallet.com/send?asset=c0&address=bc1qff7tyhcxemcw643d9lmseu3txwpx8347z4d9uh',
  },
  {
    id: 'usdt-bep20',
    label: 'USDT',
    ticker: 'USDT',
    network: 'BEP-20 (BNB Smart Chain)',
    address: '0x71A0Bd652DCD54B404Ac8E7D80743692CdCc190a',
    color: 'text-yellow-500',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    icon: '₮',
    trustLink: 'https://link.trustwallet.com/send?asset=c20000714_t0x55d398326f99059fF775485246999027B3197955&address=0x71A0Bd652DCD54B404Ac8E7D80743692CdCc190a',
  },
  {
    id: 'usdt-trc20',
    label: 'USDT',
    ticker: 'USDT',
    network: 'TRC-20 (TRON)',
    address: '0x71A0Bd652DCD54B404Ac8E7D80743692CdCc190a',
    color: 'text-red-500',
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    icon: '₮',
    trustLink: 'https://link.trustwallet.com/send?asset=c195_tTR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t&address=0x71A0Bd652DCD54B404Ac8E7D80743692CdCc190a',
  },
  {
    id: 'usdt-erc20',
    label: 'USDT',
    ticker: 'USDT',
    network: 'ERC-20 (Ethereum)',
    address: '0x71A0Bd652DCD54B404Ac8E7D80743692CdCc190a',
    color: 'text-blue-500',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    icon: '₮',
    trustLink: 'https://link.trustwallet.com/send?asset=c60_t0xdAC17F958D2ee523a2206206994597C13D831ec7&address=0x71A0Bd652DCD54B404Ac8E7D80743692CdCc190a',
  },
] as const;

/* ── Windows SVG icon (reused from Home) ──────────────────────────────────── */
const WindowsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 88 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.202zm35.67 33.529.028 34.453L.028 75.48.026 45.7zm4.326-38.951L87.314 0v41.527l-47.318.376zm47.329 39.26-.011 41.34-47.318-6.678-.066-34.739z"/>
  </svg>
);

type Step = 'form' | 'payment';
type PaymentMethod = 'myanmar' | 'international' | null;

/* ── Main component ───────────────────────────────────────────────────────── */
export default function OrderLicense() {
  const { locale, currency } = useGeo();
  const t = translations[locale].orderLicense;
  const isMy = locale === 'my';

  /* form */
  const [step,        setStep]        = useState<Step>('form');
  const [product,     setProduct]     = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [email,       setEmail]       = useState('');
  const [hwid,        setHwid]        = useState('');

  /* payment */
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [qrModal,       setQrModal]       = useState<'kbz' | 'wave' | null>(null);

  /* copy states */
  const [copiedKbz,  setCopiedKbz]  = useState(false);
  const [copiedWave, setCopiedWave] = useState(false);
  const [copiedCrypto, setCopiedCrypto] = useState<Record<string, boolean>>({});
  const [telegramMsgCopied, setTelegramMsgCopied] = useState(false);

  /* tx polling */
  const [txStatus,  setTxStatus]  = useState<'idle' | 'polling' | 'detected'>('idle');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Derived ── */
  const licenseOptions = [
    { value: '1year',    label: isMy ? 'တစ်နှစ်'   : '1 Year'   },
    { value: 'lifetime', label: isMy ? 'တစ်သက်တာ' : 'Lifetime'  },
  ];
  const fmtPrice = (usd: number, mmk: number) =>
    currency === 'MMK' ? `K ${mmk.toLocaleString()}` : `$${usd.toFixed(2)}`;
  const selectedProduct    = PRODUCT_OPTIONS.find(p => p.value === product);
  const selectedLicenseOpt = licenseOptions.find(l => l.value === licenseType);
  const selectedPrice      = product && licenseType
    ? fmtPrice(
        PRICING[product as keyof typeof PRICING][licenseType as '1year' | 'lifetime'].USD,
        PRICING[product as keyof typeof PRICING][licenseType as '1year' | 'lifetime'].MMK,
      )
    : null;

  /* ── QR modal lock ── */
  useEffect(() => {
    if (!qrModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setQrModal(null); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [qrModal]);

  /* ── Clipboard helpers ── */
  const copy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 2000);
    });
  };
  const copyCrypto = (id: string, address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedCrypto(p => ({ ...p, [id]: true }));
      setTimeout(() => setCopiedCrypto(p => ({ ...p, [id]: false })), 2000);
    });
  };

  /* ── Telegram message builder ── */
  const buildTelegramMessage = useCallback((method: string) => {
    const lines = [
      '🛒 New License Order — SoftStore',
      '',
      `📦 Product: ${selectedProduct?.displayName ?? product}`,
      `📋 License: ${selectedLicenseOpt?.label ?? licenseType}`,
      `💰 Price:   ${selectedPrice}`,
      `📧 Email:   ${email}`,
      `🔑 HWID:    ${hwid}`,
      '',
      `💳 Payment: ${method}`,
      '',
      'Please process my order. Thank you! 🙏',
    ];
    return lines.join('\n');
  }, [selectedProduct, selectedLicenseOpt, selectedPrice, email, hwid, product, licenseType]);

  /* ── Open Telegram with order details pre-filled in the chat box ── */
  const openTelegramWithOrder = useCallback((paymentLabel: string) => {
    const msg     = buildTelegramMessage(paymentLabel);
    const encoded = encodeURIComponent(msg);

    // tg:// deep-link: opens native Telegram app with message pre-filled
    // Falls back to Telegram Web (no pre-fill) if the app isn't installed
    const deepLink = `tg://resolve?domain=${TELEGRAM_USERNAME}&text=${encoded}`;
    const webLink  = `${TELEGRAM_WEB_URL}?text=${encoded}`;

    // Attempt native app via hidden anchor (avoids popup-blocker on tg://)
    const anchor = document.createElement('a');
    anchor.href = deepLink;
    anchor.rel  = 'noopener noreferrer';
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // After 600 ms open the web fallback so the chat is reachable even if
    // the Telegram app is not installed or the tg:// protocol wasn't handled
    setTimeout(() => {
      window.open(webLink, '_blank', 'noopener,noreferrer');
    }, 600);

    // Keep clipboard copy as a last-resort fallback
    navigator.clipboard.writeText(msg).catch(() => {});

    setTelegramMsgCopied(true);
    setTimeout(() => setTelegramMsgCopied(false), 5000);
  }, [buildTelegramMessage]);

  /* ── Crypto tx polling ── */
  const startPolling = useCallback(() => {
    if (txStatus === 'polling') return;
    setTxStatus('polling');
    const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
    let attempts = 0;
    pollRef.current = setInterval(async () => {
      attempts++;
      if (attempts > 40) { // stop after ~10 min
        clearInterval(pollRef.current!);
        setTxStatus('idle');
        return;
      }
      try {
        const res = await fetch(
          `${API_BASE}api/verify-tx?chain=btc&address=${CRYPTO_ASSETS[0].address}`,
          { signal: AbortSignal.timeout(8000) },
        );
        if (res.ok) {
          const data = await res.json();
          if (data.confirmed) {
            clearInterval(pollRef.current!);
            setTxStatus('detected');
            // Auto-open Telegram on detection
            openTelegramWithOrder(isMy ? 'Crypto (auto-detect)' : 'International Crypto Payment');
          }
        }
      } catch { /* network hiccup, keep polling */ }
    }, 15_000);
  }, [txStatus, buildTelegramMessage]);

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  /* ── Handlers ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product && licenseType && email && hwid) setStep('payment');
  };
  const reset = () => {
    setStep('form'); setPaymentMethod(null);
    setProduct(''); setLicenseType(''); setEmail(''); setHwid('');
    setTxStatus('idle'); if (pollRef.current) clearInterval(pollRef.current);
  };

  /* ════════════════════════════════════════════════════════════════════════
     RENDER: FORM STEP
  ════════════════════════════════════════════════════════════════════════ */
  if (step === 'form') {
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
          {/* ── Order form ── */}
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
                      {PRODUCT_OPTIONS.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.icon}  {p.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* License type */}
                <div className="space-y-2">
                  <Label>{isMy ? 'လိုင်စင် အမျိုးအစား' : 'License Type'}</Label>
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
                          {priceStr
                            ? <div className="text-primary font-bold text-lg mt-0.5">{priceStr}</div>
                            : <div className="text-muted-foreground text-xs mt-0.5">{isMy ? 'ထုတ်ကုန် ရွေးပါ' : 'select product first'}</div>
                          }
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">{t.emailLabel}</Label>
                  <Input
                    id="email" type="email" placeholder={t.emailPlaceholder}
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required className="h-11"
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
                    id="hwid" type="text"
                    placeholder={isMy ? 'License tool မှ HWID ကူးယူ ထည့်ပါ…' : 'Paste your HWID from the license tool…'}
                    value={hwid} onChange={(e) => setHwid(e.target.value)}
                    required className="h-11 font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    {isMy ? 'License software ဖွင့်ပြီး ပြထားသော HWID ကို ကူးယူပါ' : 'Open the license software, then copy the HWID shown there'}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 gap-2"
                  disabled={!product || !licenseType || !email || !hwid}
                >
                  {isMy ? 'ဆက်လက်ဆောင်ရွက်မည်' : 'Continue to Payment'} →
                </Button>
                <p className="text-xs text-muted-foreground text-center">{t.submitNote}</p>
              </form>
            </CardContent>
          </Card>

          {/* ── Side info ── */}
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
              </Link>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════════════
     RENDER: PAYMENT STEP
  ════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="container mx-auto px-4 py-14 max-w-3xl">

      {/* Back + order summary */}
      <button
        onClick={() => { setStep('form'); setPaymentMethod(null); }}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        {isMy ? 'ပြန်သွား' : 'Back to order form'}
      </button>

      {/* Order summary card */}
      <Card className="mb-8 border-2 border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <CheckIcon className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm">{isMy ? 'မှာယူမှု အသင့်' : 'Order ready — choose how to pay'}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {[
              { label: isMy ? 'ထုတ်ကုန်' : 'Product',  value: selectedProduct?.displayName ?? '' },
              { label: isMy ? 'လိုင်စင်' : 'License',  value: selectedLicenseOpt?.label ?? '' },
              { label: isMy ? 'ဈေးနှုန်း' : 'Price',  value: selectedPrice ?? '' },
              { label: 'Email',                          value: email },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</p>
                <p className="font-semibold text-sm break-all">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Payment method selector ── */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-1">{isMy ? 'ငွေပေးချေနည်း ရွေးပါ' : 'Select Payment Method'}</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {isMy ? 'သင့်နှင့် အဆင်ပြေသော ငွေပေးချေနည်းကို ရွေးချယ်ပါ' : 'Choose the option that works best for you'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Myanmar */}
          <button
            onClick={() => setPaymentMethod('myanmar')}
            className={`rounded-xl border-2 p-5 text-left transition-all duration-200 ${
              paymentMethod === 'myanmar'
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50 hover:bg-muted/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🇲🇲</span>
              <div>
                <p className="font-bold">{isMy ? 'မြန်မာ ငွေပေးချေနည်း' : 'Myanmar Payment'}</p>
                <p className="text-xs text-muted-foreground">KBZ Pay · Wave Money</p>
              </div>
              {paymentMethod === 'myanmar' && (
                <div className="ml-auto h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <CheckIcon className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isMy ? 'KBZ Pay သို့မဟုတ် Wave Money ဖြင့် ပေးချေပြီး Telegram မှ order ပြုလုပ်ပါ' : 'Pay via KBZ Pay or Wave Money, then complete order on Telegram'}
            </p>
          </button>

          {/* International */}
          <button
            onClick={() => setPaymentMethod('international')}
            className={`rounded-xl border-2 p-5 text-left transition-all duration-200 ${
              paymentMethod === 'international'
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50 hover:bg-muted/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Globe className="h-7 w-7 text-blue-500 shrink-0" />
              <div>
                <p className="font-bold">{isMy ? 'နိုင်ငံတကာ ငွေပေးချေနည်း' : 'International Payment'}</p>
                <p className="text-xs text-muted-foreground">BTC · USDT (BEP-20 / TRC-20 / ERC-20)</p>
              </div>
              {paymentMethod === 'international' && (
                <div className="ml-auto h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <CheckIcon className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isMy ? 'Cryptocurrency ဖြင့် ပေးချေပြီး auto-detect မှ confirm ပြုသည်' : 'Pay with cryptocurrency — auto-detected and confirmed'}
            </p>
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MYANMAR PAYMENT SECTION
      ════════════════════════════════════════════════════════════════ */}
      {paymentMethod === 'myanmar' && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {isMy ? 'ငွေပေးချေရန်' : 'Make Payment'}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* KBZ Pay */}
            <div className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-400" />
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white font-extrabold text-sm">KBZ</span>
                  </div>
                  <div>
                    <p className="font-bold">KBZ Pay</p>
                    <p className="text-xs text-muted-foreground">U Nyi Ye Lin</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                    {isMy ? 'ဖုန်းနံပါတ်' : 'Account Number'}
                  </p>
                  <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-4 py-3">
                    <span className="font-mono text-xl font-bold tracking-widest select-all flex-1">{KBZ_NUMBER}</span>
                    <button
                      onClick={() => copy(KBZ_NUMBER, setCopiedKbz)}
                      className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                        copiedKbz ? 'bg-green-100 dark:bg-green-900 text-green-600' : 'bg-background border hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {copiedKbz ? <CheckIcon className="h-4 w-4" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  {copiedKbz && <p className="text-xs text-green-600 mt-1 font-medium">✓ {isMy ? 'ကူးယူပြီး' : 'Copied!'}</p>}
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2 h-9" onClick={() => setQrModal('kbz')}>
                  <QrCode className="h-4 w-4" />
                  {isMy ? 'QR ကုဒ် ကြည့်မည်' : 'Show QR Code'}
                </Button>
              </div>
            </div>

            {/* Wave Money */}
            <div className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-amber-400" />
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white font-extrabold text-xs">WAVE</span>
                  </div>
                  <div>
                    <p className="font-bold">Wave Money</p>
                    <p className="text-xs text-muted-foreground">Nyi Ye Lin</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                    {isMy ? 'ဖုန်းနံပါတ်' : 'Account Number'}
                  </p>
                  <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-4 py-3">
                    <span className="font-mono text-xl font-bold tracking-widest select-all flex-1">{WAVE_NUMBER}</span>
                    <button
                      onClick={() => copy(WAVE_NUMBER, setCopiedWave)}
                      className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                        copiedWave ? 'bg-green-100 dark:bg-green-900 text-green-600' : 'bg-background border hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {copiedWave ? <CheckIcon className="h-4 w-4" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  {copiedWave && <p className="text-xs text-green-600 mt-1 font-medium">✓ {isMy ? 'ကူးယူပြီး' : 'Copied!'}</p>}
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2 h-9" onClick={() => setQrModal('wave')}>
                  <QrCode className="h-4 w-4" />
                  {isMy ? 'QR ကုဒ် ကြည့်မည်' : 'Show QR Code'}
                </Button>
              </div>
            </div>
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2.5 rounded-xl bg-muted/40 border px-4 py-3.5">
            <span className="text-base mt-0.5 shrink-0">📋</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isMy
                ? 'ငွေပေးချေပြီးနောက် "Proceed to Purchase" ကိုနှိပ်ပါ — မှာယူမှုအသေးစိတ်နှင့်အတူ Telegram သို့ ဆက်သွယ်ပေးမည်'
                : 'After payment, click "Proceed to Purchase" below — your order details will be sent to our Telegram team automatically.'}
            </p>
          </div>

          {/* Proceed button */}
          <div className="space-y-2">
            <Button
              className="w-full h-12 gap-2 text-base font-bold shadow-md"
              onClick={() => openTelegramWithOrder(isMy ? 'KBZ Pay / Wave Money' : 'Myanmar Payment (KBZ Pay / Wave Money)')}
            >
              <Send className="h-5 w-5 shrink-0" />
              {isMy ? 'Telegram မှ Order ပြုလုပ်မည်' : 'Proceed to Purchase via Telegram'}
            </Button>
            {telegramMsgCopied && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 px-4 py-2.5 text-sm text-green-700 dark:text-green-400">
                <CheckIcon className="h-4 w-4 shrink-0" />
                <span>
                  {isMy
                    ? 'မှာယူမှုအသေးစိတ် Telegram တွင် အော်တိုဖြည့်သွင်းပြီ — "Send" ကိုနှိပ်ပါ'
                    : 'Telegram opened with your order pre-filled — just tap Send!'}
                </span>
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" className="w-full" onClick={reset}>
            {isMy ? 'အစမှ ပြန်စမည်' : 'Start over'}
          </Button>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          INTERNATIONAL (CRYPTO) PAYMENT SECTION
      ════════════════════════════════════════════════════════════════ */}
      {paymentMethod === 'international' && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {isMy ? 'Crypto လိပ်စာများ' : 'Crypto Addresses'}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-sm text-muted-foreground">
            {isMy
              ? 'အောက်ပါ cryptocurrency လိပ်စာများထဲမှ တစ်ခုကို ရွေးချယ်ပြီး ငွေပေးချေပါ'
              : 'Send the exact purchase amount to any address below. Payment is auto-detected.'}
          </p>

          <div className="space-y-3">
            {CRYPTO_ASSETS.map((asset) => (
              <div
                key={asset.id}
                className={`rounded-xl border-2 ${asset.border} ${asset.bg} p-4`}
              >
                <div className="flex items-start gap-3">
                  <div className={`text-2xl font-black ${asset.color} select-none w-8 text-center shrink-0 mt-0.5`}>
                    {asset.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm">{asset.label}</span>
                      <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">
                        {asset.ticker}
                      </Badge>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${asset.color}`}>
                        {asset.network}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/70 rounded-lg px-3 py-2 mt-1">
                      <code className="text-xs font-mono break-all flex-1 select-all leading-relaxed">
                        {asset.address}
                      </code>
                      <button
                        onClick={() => copyCrypto(asset.id, asset.address)}
                        className={`shrink-0 h-7 w-7 rounded-md flex items-center justify-center transition-all ${
                          copiedCrypto[asset.id]
                            ? 'bg-green-100 dark:bg-green-900 text-green-600'
                            : 'border hover:bg-muted text-muted-foreground'
                        }`}
                        title={isMy ? 'ကူးယူ' : 'Copy address'}
                      >
                        {copiedCrypto[asset.id] ? <CheckIcon className="h-3.5 w-3.5" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Trust Wallet deeplink */}
                <div className="mt-3 flex justify-end">
                  <a
                    href={asset.trustLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${asset.color} hover:underline`}
                  >
                    <Wallet className="h-3.5 w-3.5" />
                    {isMy ? 'Trust Wallet ဖြင့် ပေးပို့' : 'Send via Trust Wallet'}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Auto-detection panel */}
          <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center gap-2">
              {txStatus === 'polling' && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
              {txStatus === 'detected' && <CheckIcon className="h-4 w-4 text-green-500" />}
              {txStatus === 'idle' && <Wallet className="h-4 w-4 text-muted-foreground" />}
              <p className="text-sm font-semibold">
                {txStatus === 'idle'    && (isMy ? 'ပေးချေမှု စစ်ဆေးခြင်း' : 'Payment Auto-Detection')}
                {txStatus === 'polling' && (isMy ? 'ပေးချေမှု စစ်ဆေးနေဆဲ…' : 'Checking for payment…')}
                {txStatus === 'detected' && (isMy ? 'ပေးချေမှု တွေ့ရှိပြီ!' : 'Payment detected!')}
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {txStatus === 'idle' && (isMy
                ? 'ငွေပေးချေပြီးနောက် "စစ်ဆေးမည်" ကိုနှိပ်ပါ — system မှ auto-detect ပြုသည်'
                : 'After sending payment, click "Start Checking" to auto-detect your transaction.')}
              {txStatus === 'polling' && (isMy
                ? 'Blockchain ကို ၁၅ စက္ကန့်တစ်ကြိမ် စစ်ဆေးနေသည်…'
                : 'Checking the blockchain every 15 seconds…')}
              {txStatus === 'detected' && (isMy
                ? 'Telegram ဖွင့်ပြီး order ကို ဆက်လက်ဆောင်ရွက်ပါ'
                : 'Telegram opened — paste your order details to complete the purchase.')}
            </p>
            {txStatus === 'idle' && (
              <Button size="sm" className="w-full gap-2" onClick={startPolling}>
                <Loader2 className="h-4 w-4" />
                {isMy ? 'စစ်ဆေးမည်' : 'Start Checking'}
              </Button>
            )}
            {txStatus === 'polling' && (
              <Button size="sm" variant="outline" className="w-full" onClick={() => { clearInterval(pollRef.current!); setTxStatus('idle'); }}>
                {isMy ? 'ရပ်မည်' : 'Stop Checking'}
              </Button>
            )}
            {txStatus === 'detected' && (
              <Button
                size="sm"
                className="w-full gap-2"
                onClick={() => openTelegramWithOrder(isMy ? 'Crypto (auto-detect)' : 'International Crypto Payment')}
              >
                <Send className="h-4 w-4" />
                {isMy ? 'Telegram ဖွင့်မည်' : 'Open Telegram'}
              </Button>
            )}
          </div>

          {/* Manual proceed */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              {isMy ? 'သို့မဟုတ် ကိုယ်တိုင် Telegram မှ order ပြုလုပ်နိုင်သည်' : 'Or send order details to Telegram manually after payment:'}
            </p>
            <Button
              variant="outline"
              className="w-full h-11 gap-2 font-semibold"
              onClick={() => openTelegramWithOrder(isMy ? 'Crypto' : 'International Crypto Payment')}
            >
              <Send className="h-4 w-4 shrink-0" />
              {isMy ? 'Telegram မှ ဆက်လက်ဆောင်ရွက်မည်' : 'Send Order to Telegram'}
            </Button>
            {telegramMsgCopied && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 px-4 py-2.5 text-sm text-green-700 dark:text-green-400">
                <CheckIcon className="h-4 w-4 shrink-0" />
                <span>
                  {isMy
                    ? 'မှာယူမှုအသေးစိတ် ကူးယူပြီး — Telegram တွင် paste လုပ်ပြီး send ပါ'
                    : 'Order details copied! Paste and send in the Telegram chat.'}
                </span>
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" className="w-full" onClick={reset}>
            {isMy ? 'အစမှ ပြန်စမည်' : 'Start over'}
          </Button>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          QR CODE MODAL
      ════════════════════════════════════════════════════════════════ */}
      {qrModal && (() => {
        const isKbz      = qrModal === 'kbz';
        const accentFrom = isKbz ? 'from-blue-500'   : 'from-orange-500';
        const accentTo   = isKbz ? 'to-blue-400'     : 'to-amber-400';
        const badgeBg    = isKbz ? 'bg-blue-600'     : 'bg-orange-500';
        const badgeLabel = isKbz ? 'KBZ'             : 'WAVE';
        const methodName = isKbz ? 'KBZ Pay'         : 'Wave Money';
        const holderName = isKbz ? 'U Nyi Ye Lin'    : 'Nyi Ye Lin';
        const accountNo  = isKbz ? KBZ_NUMBER        : WAVE_NUMBER;
        const accountSub = isKbz ? 'KBZ Pay · *2905' : 'Wave Money · 09771180852';
        const imgSrc     = isKbz ? '/kbzpay-qr.png'  : '/wavemoney-qr.png';

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
            onClick={() => setQrModal(null)}
          >
            <div
              className="relative w-full max-w-sm rounded-3xl bg-card shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${accentFrom} ${accentTo}`} />
              <button
                onClick={() => setQrModal(null)}
                className="absolute top-3.5 right-3.5 h-8 w-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="px-7 pt-6 pb-8 flex flex-col items-center gap-5">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl ${badgeBg} flex items-center justify-center shrink-0 shadow-sm`}>
                    <span className="text-white font-extrabold text-xs">{badgeLabel}</span>
                  </div>
                  <div>
                    <p className="font-bold text-base">{methodName}</p>
                    <p className="text-xs text-muted-foreground">{holderName}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-inner">
                  <img src={imgSrc} alt={`${methodName} QR Code`} className="w-72 h-72 object-contain" draggable={false} />
                </div>
                <div className="w-full text-center space-y-1.5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {isMy ? 'ဖုန်းနံပါတ်' : 'Account Number'}
                  </p>
                  <p className="font-mono text-3xl font-bold tracking-widest select-all">{accountNo}</p>
                  <p className="text-xs text-muted-foreground">{accountSub}</p>
                </div>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  {isMy ? 'Payment app ဖွင့်ပြီး QR ကုဒ်ကို scan ပါ' : 'Open your payment app and scan the QR code above'}
                </p>
                <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => setQrModal(null)}>
                  <X className="h-3.5 w-3.5" />
                  {isMy ? 'ပိတ်မည်' : 'Close'}
                </Button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
