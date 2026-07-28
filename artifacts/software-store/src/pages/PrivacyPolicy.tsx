import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGeo } from '@/context/GeoContext';
import { translations } from '@/context/translations';
import { Link } from 'wouter';

const CONTACT_EMAIL = 'mahar80729@gmail.com';
const BRAND = 'SoftStore';
const SITE_URL = 'https://softstore.replit.app';

export default function PrivacyPolicy() {
  const { locale } = useGeo();
  const t = translations[locale].privacyPolicy;

  return (
    <div className="container mx-auto px-4 py-14 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <Badge variant="outline" className="mb-4 text-xs font-semibold uppercase tracking-wide">
          {t.badge}
        </Badge>
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t.title}</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {t.lastUpdatedLabel}{' '}
          <span className="font-medium text-foreground">{t.lastUpdatedDate}</span>
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-foreground">

        {/* Introduction */}
        <section>
          <p className="text-muted-foreground">{t.intro}</p>
        </section>

        <Separator />

        {/* 1. Information We Collect */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s1Title}</h2>

          <h3 className="font-semibold mb-2">{t.s1aTitle}</h3>
          <p className="text-muted-foreground mb-3">{t.s1aIntro}</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
            {t.s1aItems.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h3 className="font-semibold mb-2">{t.s1bTitle}</h3>
          <p className="text-muted-foreground mb-3">{t.s1bIntro}</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            {t.s1bItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <Separator />

        {/* 2. Cookies */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s2Title}</h2>
          <p className="text-muted-foreground mb-3">{t.s2Intro}</p>
          <h3 className="font-semibold mb-2">{t.s2TypesTitle}</h3>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-3">
            {t.s2Types.map(([label, body]) => (
              <li key={label}>
                <strong className="text-foreground">{label}:</strong> {body}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">{t.s2Note}</p>
        </section>

        <Separator />

        {/* 3. How We Use */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s3Title}</h2>
          <p className="text-muted-foreground mb-3">{t.s3Intro}</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-3">
            {t.s3Items.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="text-muted-foreground">{t.s3Note}</p>
        </section>

        <Separator />

        {/* 4. Data Sharing */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s4Title}</h2>
          <p className="text-muted-foreground mb-3">{t.s4Intro}</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            {t.s4Items.map(([label, body]) => (
              <li key={label}>
                <strong className="text-foreground">{label}:</strong> {body}
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        {/* 5. Third-Party */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s5Title}</h2>
          <p className="text-muted-foreground mb-3">{t.s5Intro}</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-3">
            <li>
              <a href="https://www.internetdownloadmanager.com" target="_blank" rel="noopener noreferrer"
                className="text-primary underline underline-offset-2">
                internetdownloadmanager.com
              </a>{' '}(Tonec Inc.)
            </li>
            <li>
              <a href="https://www.win-rar.com" target="_blank" rel="noopener noreferrer"
                className="text-primary underline underline-offset-2">
                win-rar.com
              </a>{' '}(win.rar GmbH)
            </li>
          </ul>
          <p className="text-muted-foreground">{t.s5Note}</p>
        </section>

        <Separator />

        {/* 6. Retention */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s6Title}</h2>
          <p className="text-muted-foreground">{t.s6Body}</p>
        </section>

        <Separator />

        {/* 7. Security */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s7Title}</h2>
          <p className="text-muted-foreground">{t.s7Body}</p>
        </section>

        <Separator />

        {/* 8. Rights */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s8Title}</h2>
          <p className="text-muted-foreground mb-3">{t.s8Intro}</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-3">
            {t.s8Items.map(([label, body]) => (
              <li key={label}>
                <strong className="text-foreground">{label}:</strong> {body}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">
            {t.s8Note(CONTACT_EMAIL).split(CONTACT_EMAIL)[0]}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
            {t.s8Note(CONTACT_EMAIL).split(CONTACT_EMAIL)[1]}
          </p>
        </section>

        <Separator />

        {/* 9. Children */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s9Title}</h2>
          <p className="text-muted-foreground">{t.s9Body}</p>
        </section>

        <Separator />

        {/* 10. Changes */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s10Title}</h2>
          <p className="text-muted-foreground">{t.s10Body}</p>
        </section>

        <Separator />

        {/* 11. Contact */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s11Title}</h2>
          <p className="text-muted-foreground mb-2">{t.s11Intro}</p>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground space-y-1">
            <p><strong className="text-foreground">{BRAND}</strong></p>
            <p>
              {t.s11EmailLabel}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </section>

        <Separator />

        <div className="pt-2">
          <Link href="/" className="text-sm text-primary underline underline-offset-2 hover:no-underline">
            ← {locale === 'my' ? 'ပင်မ စာမျက်နှာ' : 'Back to Home'}
          </Link>
        </div>

      </div>
    </div>
  );
}
