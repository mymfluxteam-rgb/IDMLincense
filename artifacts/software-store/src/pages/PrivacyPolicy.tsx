import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const LAST_UPDATED = 'July 27, 2025';
const CONTACT_EMAIL = 'mahar80729@gmail.com';
const BRAND = 'SoftStore';
const SITE_URL = 'https://softstore.replit.app';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-14 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <Badge variant="outline" className="mb-4 text-xs font-semibold uppercase tracking-wide">
          Legal
        </Badge>
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Last updated: <span className="font-medium text-foreground">{LAST_UPDATED}</span>
        </p>
      </div>

      <div className="prose prose-sm max-w-none dark:prose-invert space-y-8 text-sm leading-relaxed text-foreground">

        {/* Introduction */}
        <section>
          <p className="text-muted-foreground">
            {BRAND} ("{BRAND}", "we", "us", or "our") operates the website at{' '}
            <a href={SITE_URL} className="text-primary underline underline-offset-2">{SITE_URL}</a>{' '}
            (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or make a purchase. Please read this policy
            carefully. If you disagree with its terms, please discontinue use of the Service.
          </p>
        </section>

        <Separator />

        {/* 1. Information We Collect */}
        <section>
          <h2 className="text-lg font-bold mb-3">1. Information We Collect</h2>

          <h3 className="font-semibold mb-2">1.1 Information You Provide Directly</h3>
          <p className="text-muted-foreground mb-3">
            When you contact us, place an order, or use our support form, we may collect:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
            <li>Full name</li>
            <li>Email address</li>
            <li>Message content and support inquiry details</li>
            <li>Software product and license type requested</li>
            <li>Hardware ID (HWID) used for license activation</li>
          </ul>

          <h3 className="font-semibold mb-2">1.2 Information Collected Automatically</h3>
          <p className="text-muted-foreground mb-3">
            When you access the Service, certain information may be collected automatically, including:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>IP address and approximate geographic location</li>
            <li>Browser type, version, and language</li>
            <li>Device type and operating system</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referring URL and exit pages</li>
            <li>Date and time of your visit</li>
          </ul>
        </section>

        <Separator />

        {/* 2. Cookies */}
        <section>
          <h2 className="text-lg font-bold mb-3">2. Cookies and Tracking Technologies</h2>
          <p className="text-muted-foreground mb-3">
            We use cookies and similar tracking technologies to enhance your experience on our Service.
          </p>

          <h3 className="font-semibold mb-2">Types of Cookies We Use</h3>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>
              <strong className="text-foreground">Essential Cookies:</strong> Required for the website
              to function properly (e.g., remembering your language and currency preferences).
            </li>
            <li>
              <strong className="text-foreground">Analytics Cookies:</strong> Help us understand how
              visitors interact with our website so we can improve functionality and content.
            </li>
            <li>
              <strong className="text-foreground">Preference Cookies:</strong> Remember your settings
              (such as selected language and currency) across sessions.
            </li>
          </ul>

          <p className="text-muted-foreground mt-3">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being
            sent. However, some features of the Service may not function properly if cookies are
            disabled.
          </p>
        </section>

        <Separator />

        {/* 3. How We Use Your Information */}
        <section>
          <h2 className="text-lg font-bold mb-3">3. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-3">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>To process and fulfill license orders and deliver license keys</li>
            <li>To respond to your support inquiries and contact form submissions</li>
            <li>To verify hardware IDs (HWIDs) for license activation</li>
            <li>To send transactional emails related to your order or inquiry</li>
            <li>To improve and optimize the functionality of our website</li>
            <li>To detect, prevent, and address technical issues or fraudulent activity</li>
            <li>To comply with applicable laws and regulations</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            We do <strong className="text-foreground">not</strong> sell, rent, or share your personal
            information with third parties for their own marketing purposes.
          </p>
        </section>

        <Separator />

        {/* 4. Data Sharing */}
        <section>
          <h2 className="text-lg font-bold mb-3">4. Data Sharing and Disclosure</h2>
          <p className="text-muted-foreground mb-3">
            We may share your information only in the following limited circumstances:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>
              <strong className="text-foreground">Service Providers:</strong> With trusted third-party
              vendors who assist in operating our website and conducting our business (e.g., email
              delivery services), provided those parties agree to keep this information confidential.
            </li>
            <li>
              <strong className="text-foreground">Legal Requirements:</strong> If required by law,
              court order, or governmental authority.
            </li>
            <li>
              <strong className="text-foreground">Business Transfers:</strong> In connection with a
              merger, acquisition, or sale of assets, your information may be transferred as part of
              that transaction.
            </li>
          </ul>
        </section>

        <Separator />

        {/* 5. Third-Party Services */}
        <section>
          <h2 className="text-lg font-bold mb-3">5. Third-Party Services</h2>
          <p className="text-muted-foreground mb-3">
            Our Service provides links to or facilitates purchases through official publisher websites,
            including:
          </p>
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
          <p className="text-muted-foreground">
            These third-party websites have their own privacy policies. We are not responsible for the
            privacy practices of these external sites and encourage you to review their policies before
            providing any personal information.
          </p>
        </section>

        <Separator />

        {/* 6. Data Retention */}
        <section>
          <h2 className="text-lg font-bold mb-3">6. Data Retention</h2>
          <p className="text-muted-foreground">
            We retain personal data only for as long as necessary to fulfil the purposes for which it
            was collected, including for the purposes of satisfying any legal, accounting, or reporting
            requirements. Contact form submissions and order records are typically retained for up to
            24 months, after which they are securely deleted.
          </p>
        </section>

        <Separator />

        {/* 7. Data Security */}
        <section>
          <h2 className="text-lg font-bold mb-3">7. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational security measures to protect your
            personal information against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the Internet or electronic storage is 100% secure.
            While we strive to use commercially acceptable means to protect your data, we cannot
            guarantee absolute security.
          </p>
        </section>

        <Separator />

        {/* 8. Your Rights */}
        <section>
          <h2 className="text-lg font-bold mb-3">8. Your Rights</h2>
          <p className="text-muted-foreground mb-3">
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>
              <strong className="text-foreground">Access:</strong> Request a copy of the personal
              data we hold about you.
            </li>
            <li>
              <strong className="text-foreground">Correction:</strong> Request correction of
              inaccurate or incomplete data.
            </li>
            <li>
              <strong className="text-foreground">Deletion:</strong> Request deletion of your personal
              data, subject to certain legal obligations.
            </li>
            <li>
              <strong className="text-foreground">Objection:</strong> Object to processing of your
              personal data in certain circumstances.
            </li>
            <li>
              <strong className="text-foreground">Portability:</strong> Request transfer of your data
              to another service provider where technically feasible.
            </li>
          </ul>
          <p className="text-muted-foreground mt-3">
            To exercise any of these rights, please contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>.
          </p>
        </section>

        <Separator />

        {/* 9. Children's Privacy */}
        <section>
          <h2 className="text-lg font-bold mb-3">9. Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our Service is not directed to individuals under the age of 13. We do not knowingly collect
            personal information from children under 13. If you become aware that a child has provided
            us with personal data, please contact us and we will take steps to delete such information.
          </p>
        </section>

        <Separator />

        {/* 10. Changes */}
        <section>
          <h2 className="text-lg font-bold mb-3">10. Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify you of any changes by
            posting the new policy on this page and updating the "Last updated" date at the top. You
            are advised to review this Privacy Policy periodically for any changes. Continued use of
            the Service after changes are posted constitutes your acceptance of those changes.
          </p>
        </section>

        <Separator />

        {/* 11. Contact */}
        <section>
          <h2 className="text-lg font-bold mb-3">11. Contact Us</h2>
          <p className="text-muted-foreground mb-2">
            If you have any questions, concerns, or requests regarding this Privacy Policy, please
            contact us:
          </p>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground space-y-1">
            <p><strong className="text-foreground">{BRAND}</strong></p>
            <p>
              Email:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
