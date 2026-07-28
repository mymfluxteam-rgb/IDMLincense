import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGeo } from '@/context/GeoContext';
import { translations } from '@/context/translations';
import { Link } from 'wouter';

const CONTACT_EMAIL = 'mahar80729@gmail.com';
const BRAND = 'SoftStore';

export default function TermsOfService() {
  const { locale } = useGeo();
  const t = translations[locale].termsOfService;

  return (
    <div className="container mx-auto px-4 py-14 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <Badge variant="outline" className="mb-4 text-xs font-semibold uppercase tracking-wide">
          {t.badge}
        </Badge>
        <div className="flex items-center gap-3 mb-3">
          <FileText className="h-8 w-8 text-primary flex-shrink-0" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t.title}</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {t.lastUpdatedLabel}{' '}
          <span className="font-medium text-foreground">{t.lastUpdatedDate}</span>
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-foreground">

        {/* Intro */}
        <section>
          <p className="text-muted-foreground">{t.intro}</p>
        </section>

        <Separator />

        {/* 1 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s1Title}</h2>
          <p className="text-muted-foreground">{t.s1Body}</p>
        </section>

        <Separator />

        {/* 2 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s2Title}</h2>
          <p className="text-muted-foreground">{t.s2Body}</p>
        </section>

        <Separator />

        {/* 3 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s3Title}</h2>
          <p className="text-muted-foreground mb-3">{t.s3Intro}</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            {t.s3Items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <Separator />

        {/* 4 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s4Title}</h2>
          <p className="text-muted-foreground mb-3">{t.s4Intro}</p>
          <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
            {t.s4Steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <Separator />

        {/* 5 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s5Title}</h2>
          <p className="text-muted-foreground">{t.s5Body}</p>
        </section>

        <Separator />

        {/* 6 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s6Title}</h2>
          <p className="text-muted-foreground">{t.s6Body}</p>
        </section>

        <Separator />

        {/* 7 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s7Title}</h2>
          <p className="text-muted-foreground">{t.s7Body}</p>
        </section>

        <Separator />

        {/* 8 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s8Title}</h2>
          <p className="text-muted-foreground mb-3">{t.s8Intro}</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            {t.s8Items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <Separator />

        {/* 9 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s9Title}</h2>
          <p className="text-muted-foreground">{t.s9Body}</p>
        </section>

        <Separator />

        {/* 10 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s10Title}</h2>
          <p className="text-muted-foreground">{t.s10Body}</p>
        </section>

        <Separator />

        {/* 11 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s11Title}</h2>
          <p className="text-muted-foreground">{t.s11Body}</p>
        </section>

        <Separator />

        {/* 12 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s12Title}</h2>
          <p className="text-muted-foreground">{t.s12Body}</p>
        </section>

        <Separator />

        {/* 13 */}
        <section>
          <h2 className="text-lg font-bold mb-3">{t.s13Title}</h2>
          <p className="text-muted-foreground mb-2">{t.s13Intro}</p>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground space-y-1">
            <p><strong className="text-foreground">{BRAND}</strong></p>
            <p>
              {t.s13EmailLabel}{' '}
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
