export type Locale = 'en' | 'my';
export type Currency = 'USD' | 'MMK';

/** Approximate display rate — for UI only, not a live rate */
export const MMK_RATE = 4200;

export function formatPrice(usdAmount: number, currency: Currency): string {
  if (currency === 'MMK') {
    const mmk = Math.round(usdAmount * MMK_RATE / 100) * 100;
    return `K ${mmk.toLocaleString()}`;
  }
  return `$${usdAmount.toFixed(2)}`;
}

export const translations = {
  en: {
    brand: 'SoftStore',
    brandSub: 'Digital Software Marketplace',

    nav: {
      download: 'Download Software',
      orderLicense: 'Order License',
      pricing: 'Pricing',
      howToPurchase: 'How to Purchase License',
      contact: 'Contact Support Team',
      safeVerified: 'Official downloads only — safe & verified',
    },

    home: {
      heroBadge: 'Official Software Downloads',
      heroTitle: 'Download & License',
      heroAccent: 'Professional Software',
      heroSub:
        "Get genuine licenses for the world's most trusted software tools. Official downloads, instant delivery, and dedicated support.",
      browseSoftware: 'Browse Software',
      viewPricing: 'View Pricing',
      trust: {
        official: 'Official Sources Only',
        instant: 'Instant License Delivery',
        support: '24/7 Support',
        rating: '4.9 / 5 Rating',
      },
      availableTitle: 'Available Software',
      availableSub: 'All products are sourced directly from official publishers.',
      freeTrial: 'Free Trial',
      buyLicense: 'Buy License',
      features: {
        idm: ['Up to 5× faster downloads', 'Resume broken downloads', 'Browser integration', 'Scheduler & queue'],
        winrar: ['RAR & ZIP support', 'AES-256 encryption', 'Multi-volume archives', 'Command-line interface'],
      },
      needHelp: 'Need help choosing or purchasing?',
      needHelpSub: 'Our support team is available to guide you through the licensing process.',
      howToPurchase: 'How to Purchase',
      contactSupport: 'Contact Support',
    },

    pricing: {
      badge: 'Transparent Pricing',
      title: 'Simple, Discounted Pricing',
      sub: 'No subscriptions, no hidden fees. Choose a 1-year or lifetime license at a special discounted rate.',
      term1Year: '1 Year',
      termLifetime: 'Lifetime',
      term1YearSub: 'Valid for 12 months from activation',
      termLifetimeSub: 'One-time payment — own it forever',
      discountBadge: '~16.67% OFF',
      originalLabel: 'Original',
      yourPrice: 'Your Price',
      save: (amount: string) => `Save ${amount}`,
      oneTime: 'one-time',
      buyBtn: (price: string) => `Buy License — ${price}`,
      trialBtn: 'Download Free Trial first',
      notSure: 'Not sure which to buy?',
      notSureSub: "Read our step-by-step purchase guide or reach out — we'll help you pick the right license.",
      howToPurchase: 'How to Purchase',
      contact: 'Contact Support',
      features: {
        '1year': [
          '1-year license key',
          'All updates during the license period',
          '1 PC activation',
          'Browser integration (Chrome, Firefox, Edge)',
          'Download scheduler & queue',
          'Technical support',
        ],
        lifetime: [
          'Lifetime license key',
          'All future updates included — forever',
          '1 PC activation',
          'Browser integration (Chrome, Firefox, Edge)',
          'Download scheduler & queue',
          'Priority support',
        ],
      },
      buyUrlIdm: 'https://www.internetdownloadmanager.com/register.html',
      buyUrlWinrar: 'https://www.win-rar.com/register.html',
      trialUrlIdm: 'https://www.internetdownloadmanager.com/download.html',
      trialUrlWinrar: 'https://www.win-rar.com/download.html',
    },

    orderLicense: {
      badge: 'Secure Ordering',
      title: 'Order a License',
      sub: "Select your software, enter your email, and we'll guide you to the official purchase page. Your license key is delivered instantly after payment.",
      formTitle: 'License Request',
      productLabel: 'Software Product',
      productPlaceholder: 'Select a product…',
      emailLabel: 'Your Email Address',
      emailPlaceholder: 'you@example.com',
      emailHint: 'License key will be sent here after purchase.',
      submitBtn: 'Proceed to Purchase',
      submitNote: "You'll be redirected to the official publisher's secure checkout.",
      successTitle: "You're one click away!",
      successSub: (productName: string, email: string) =>
        `We've noted your request for ${productName}. Complete your purchase on the official publisher website below. Your license key will be emailed to ${email} after payment.`,
      completePurchase: 'Complete Purchase on Official Site',
      startOver: 'Start over',
      sideTitle1: 'Genuine Licenses',
      sideBody1: 'Every license is purchased directly from the official publisher — no grey market, no risk.',
      sideTitle2: 'Instant Delivery',
      sideBody2: 'License keys are emailed within minutes of payment confirmation.',
      sideTitle3: 'Support Included',
      sideBody3: 'Our team is available to help with installation and activation.',
      sideNote: 'Have questions?',
      contactLink: 'Contact our support team',
    },

    howToPurchase: {
      badge: 'Step-by-Step Guide',
      title: 'How to Purchase a License',
      sub: 'Follow these five simple steps to get your genuine software license quickly and securely.',
      steps: [
        {
          number: '01',
          title: 'Install and Open the License Software',
          body: 'Download our license tool from the "License Software Download" section on the home page. Install and open it — it will display your unique HWID.',
        },
        {
          number: '02',
          title: 'Copy Your HWID and Place Your Order',
          body: 'Copy the HWID shown in the license tool. Go to Order License, select your product and license type, then fill in your email and HWID to submit your order.',
        },
        {
          number: '03',
          title: 'Contact Our Team via Telegram',
          body: 'After placing your order, contact our support team on Telegram with your order details. Our team will verify and confirm your request.',
        },
        {
          number: '04',
          title: 'Complete Payment and Receive Your License Key',
          body: "After payment is confirmed, our team will send you a valid license key to your registered email address. Check your spam folder if it doesn't arrive within 10 minutes.",
        },
        {
          number: '05',
          title: 'Enter the Key and Unlock Full Features',
          body: 'Enter the license key in the software registration field (IDM: Help → Register; WinRAR: Help → Enter license key). Once activated, all premium features are unlocked — no more trial limitations.',
        },
      ],
      readyTitle: 'Ready to get started?',
      buyIdm: 'Order IDM License',
      buyWinrar: 'Order WinRAR License',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
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
          a: "Check your purchase email. If you can't find it, contact the publisher's support team with your order details — they can re-send it.",
        },
        {
          q: 'Do I need to pay again after an update?',
          a: 'No. Both IDM and WinRAR offer lifetime licenses that include all future updates at no additional cost.',
        },
      ],
      stillHaveQ: 'Still have questions?',
      contactSupport: 'Contact Support Team',
    },

    contact: {
      badge: "We're Here to Help",
      title: 'Contact Support Team',
      sub: "Have a question about licensing, downloads, or activation? Fill out the form below and we'll get back to you within 24 hours.",
      formTitle: 'Send a Message',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      reasonLabel: 'Reason for Contact',
      reasonPlaceholder: 'Select a reason…',
      messageLabel: 'Message',
      messagePlaceholder: 'Describe your issue in detail…',
      submitBtn: 'Send Message',
      successTitle: 'Message Received!',
      successSub: (name: string, email: string) =>
        `Thank you, ${name}. We've received your message and will respond to ${email} within 24 hours.`,
      sendAnother: 'Send another message',
      responseTitle: 'Response Time',
      responseBody: 'We typically respond within 2–24 hours on business days. For urgent license issues, mention "URGENT" in your message.',
      quickTitle: 'Common Quick Answers',
      quickLinks: [
        'How do I buy a license?',
        'What are the prices?',
        'I want to order a license now',
      ],
      noteTitle: 'Note:',
      noteBody: 'For issues specific to the software itself (bugs, crashes), please also consult the official publisher support pages:',
      reasons: [
        'License activation help',
        'Download / installation issue',
        'Order & payment inquiry',
        'License key not received',
        'General question',
      ],
    },

    footer: {
      tagline: 'Official software downloads and genuine licensing for IDM and WinRAR. Instant delivery, verified sources.',
      officialOnly: 'Official sources only',
      navTitle: 'Navigation',
      officialTitle: 'Official Publisher Sites',
      legalTitle: 'Legal',
      legal: ['Terms of Service'],
      copyright: (year: number) => `© ${year} SoftStore. All rights reserved.`,
      trademark: 'All software is property of their respective publishers. IDM & WinRAR are registered trademarks.',
    },

    privacyPolicy: {
      badge: 'Legal',
      title: 'Privacy Policy',
      lastUpdatedLabel: 'Last updated:',
      lastUpdatedDate: 'July 27, 2025',
      intro: 'SoftStore ("SoftStore", "we", "us", or "our") operates this website (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or submit a contact request. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Service.',

      s1Title: '1. Information We Collect',
      s1aTitle: '1.1 Information You Provide Directly',
      s1aIntro: 'When you contact us, place an order, or use our support form, we may collect:',
      s1aItems: [
        'Full name',
        'Email address',
        'Message content and support inquiry details',
        'Software product and license type requested',
        'Hardware ID (HWID) used for license activation',
      ],
      s1bTitle: '1.2 Information Collected Automatically',
      s1bIntro: 'When you access the Service, certain information may be collected automatically, including:',
      s1bItems: [
        'IP address and approximate geographic location',
        'Browser type, version, and language',
        'Device type and operating system',
        'Pages visited and time spent on each page',
        'Referring URL and exit pages',
        'Date and time of your visit',
      ],

      s2Title: '2. Cookies and Tracking Technologies',
      s2Intro: 'We use cookies and similar tracking technologies to enhance your experience on our Service.',
      s2TypesTitle: 'Types of Cookies We Use',
      s2Types: [
        ['Essential Cookies', 'Required for the website to function properly (e.g., remembering your language and currency preferences).'],
        ['Analytics Cookies', 'Help us understand how visitors interact with our website so we can improve functionality and content.'],
        ['Preference Cookies', 'Remember your settings (such as selected language and currency) across sessions.'],
      ] as [string, string][],
      s2Note: 'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of the Service may not function properly if cookies are disabled.',

      s3Title: '3. How We Use Your Information',
      s3Intro: 'We use the information we collect for the following purposes:',
      s3Items: [
        'To process and fulfill license orders and deliver license keys',
        'To respond to your support inquiries and contact form submissions',
        'To verify hardware IDs (HWIDs) for license activation',
        'To send transactional emails related to your order or inquiry',
        'To improve and optimize the functionality of our website',
        'To detect, prevent, and address technical issues or fraudulent activity',
        'To comply with applicable laws and regulations',
      ],
      s3Note: 'We do not sell, rent, or share your personal information with third parties for their own marketing purposes.',
      s3NoteStrong: 'We do not',

      s4Title: '4. Data Sharing and Disclosure',
      s4Intro: 'We may share your information only in the following limited circumstances:',
      s4Items: [
        ['Service Providers', 'With trusted third-party vendors who assist in operating our website and conducting our business (e.g., email delivery services), provided those parties agree to keep this information confidential.'],
        ['Legal Requirements', 'If required by law, court order, or governmental authority.'],
        ['Business Transfers', 'In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.'],
      ] as [string, string][],

      s5Title: '5. Third-Party Services',
      s5Intro: 'Our Service provides links to or facilitates purchases through official publisher websites, including:',
      s5Note: 'These third-party websites have their own privacy policies. We are not responsible for the privacy practices of these external sites and encourage you to review their policies before providing any personal information.',

      s6Title: '6. Data Retention',
      s6Body: 'We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Contact form submissions and order records are typically retained for up to 24 months, after which they are securely deleted.',

      s7Title: '7. Data Security',
      s7Body: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.',

      s8Title: '8. Your Rights',
      s8Intro: 'Depending on your location, you may have the following rights regarding your personal data:',
      s8Items: [
        ['Access', 'Request a copy of the personal data we hold about you.'],
        ['Correction', 'Request correction of inaccurate or incomplete data.'],
        ['Deletion', 'Request deletion of your personal data, subject to certain legal obligations.'],
        ['Objection', 'Object to processing of your personal data in certain circumstances.'],
        ['Portability', 'Request transfer of your data to another service provider where technically feasible.'],
      ] as [string, string][],
      s8Note: (email: string) => `To exercise any of these rights, please contact us at ${email}.`,

      s9Title: "9. Children's Privacy",
      s9Body: 'Our Service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal data, please contact us and we will take steps to delete such information.',

      s10Title: '10. Changes to This Privacy Policy',
      s10Body: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes. Continued use of the Service after changes are posted constitutes your acceptance of those changes.',

      s11Title: '11. Contact Us',
      s11Intro: 'If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:',
      s11EmailLabel: 'Email:',
    },

    termsOfService: {
      badge: 'Legal',
      title: 'Terms of Service',
      lastUpdatedLabel: 'Last updated:',
      lastUpdatedDate: 'July 27, 2025',
      intro: 'Please read these Terms of Service ("Terms") carefully before using the SoftStore website (the "Service"). By accessing or using our Service, you agree to be bound by these Terms. If you do not agree, please discontinue use of the Service.',

      s1Title: '1. Acceptance of Terms',
      s1Body: 'By accessing or using SoftStore, you confirm that you are at least 18 years of age, have read and understood these Terms, and agree to be bound by them. If you are using the Service on behalf of a business or organization, you represent that you have authority to bind that entity to these Terms.',

      s2Title: '2. About Our Service',
      s2Body: 'SoftStore facilitates the purchase and delivery of genuine software license keys for products including Internet Download Manager (IDM) and WinRAR. We act as an authorized reseller and order facilitator. All software products remain the intellectual property of their respective publishers. Completing a purchase through SoftStore grants you a license from the official publisher — it does not transfer ownership of the software.',

      s3Title: '3. Pricing & Payment',
      s3Intro: 'All prices displayed on the website are in US Dollars (USD) unless otherwise indicated. Burmese Kyat (MMK) pricing shown is for reference only, based on an approximate display rate. By placing an order, you agree to the following:',
      s3Items: [
        'Prices are subject to change without prior notice.',
        'Payment must be completed in full before a license key is issued.',
        'We reserve the right to cancel any order we are unable to fulfill.',
        'You are responsible for any applicable taxes or fees imposed by your local jurisdiction.',
      ],

      s4Title: '4. Order Process',
      s4Intro: 'Our order process works as follows:',
      s4Steps: [
        'Submit your order via the Order License page with your email address and Hardware ID (HWID).',
        'Our team verifies your request and confirms availability.',
        'You complete payment via the method agreed upon with our support team.',
        'Upon payment confirmation, your license key is delivered to your registered email address.',
      ],

      s5Title: '5. License Key Delivery',
      s5Body: 'License keys are typically delivered within minutes to a few hours of confirmed payment, depending on verification requirements. Keys are sent to the email address provided at the time of order. Please check your spam or junk folder if you do not receive your key within the expected time. SoftStore is not responsible for delivery failures caused by incorrect email addresses provided by the customer.',

      s6Title: '6. All Sales Are Final',
      s6Body: 'Due to the digital and non-returnable nature of software license keys, all sales are final. Once a license key has been delivered to your email address, no refund or exchange will be provided. If you believe there is an error with your key (e.g., the key does not activate), please contact our support team within 48 hours of delivery and we will investigate and provide a resolution.',

      s7Title: '7. Intellectual Property',
      s7Body: 'All software products available through SoftStore are the intellectual property of their respective publishers — Tonec Inc. (Internet Download Manager) and win.rar GmbH (WinRAR). The SoftStore name, logo, and website content are owned by SoftStore. You may not copy, reproduce, distribute, or create derivative works from any content on this website without prior written permission.',

      s8Title: '8. Acceptable Use',
      s8Intro: 'When using our Service, you agree that you will not:',
      s8Items: [
        'Resell, redistribute, or transfer any license key purchased through SoftStore to a third party.',
        'Attempt to use a single license key on more than the permitted number of devices.',
        'Provide false or misleading information when placing an order.',
        'Use the Service for any unlawful, fraudulent, or harmful purpose.',
        'Attempt to gain unauthorized access to our systems or disrupt the Service.',
      ],

      s9Title: '9. Disclaimer of Warranties',
      s9Body: 'The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. SoftStore does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of the Service is at your sole risk.',

      s10Title: '10. Limitation of Liability',
      s10Body: 'To the maximum extent permitted by applicable law, SoftStore and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. In any event, our total liability to you for any claim arising out of or relating to these Terms or the Service shall not exceed the amount you paid for the transaction giving rise to the claim.',

      s11Title: '11. Changes to These Terms',
      s11Body: 'We reserve the right to modify these Terms at any time. When we make changes, we will update the "Last updated" date at the top of this page. Your continued use of the Service after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.',

      s12Title: '12. Governing Law',
      s12Body: 'These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or the Service shall be resolved through good-faith negotiation. If a dispute cannot be resolved through negotiation, it shall be submitted to the appropriate courts of competent jurisdiction.',

      s13Title: '13. Contact Us',
      s13Intro: 'If you have any questions or concerns about these Terms of Service, please contact us:',
      s13EmailLabel: 'Email:',
    },

    langLabel: 'Language',
    currencyLabel: 'Currency',
  },

  // ─── Burmese ─────────────────────────────────────────────────────────────────
  my: {
    brand: 'SoftStore',
    brandSub: 'ဒစ်ဂျစ်တယ် ဆော့ဖ်ဝဲ ဈေးကွက်',

    nav: {
      download: 'ဆော့ဖ်ဝဲ ဒေါင်းလုပ်',
      orderLicense: 'လိုင်စင် မှာယူ',
      pricing: 'စျေးနှုန်း',
      howToPurchase: 'လိုင်စင် ဝယ်နည်း',
      contact: 'ပံ့ပိုးရေး ဆက်သွယ်',
      safeVerified: 'တရားဝင် ဒေါင်းလုပ်များသာ — လုံခြုံပြီး စစ်ဆေးပြီး',
    },

    home: {
      heroBadge: 'တရားဝင် ဆော့ဖ်ဝဲ ဒေါင်းလုပ်',
      heroTitle: 'ဒေါင်းလုပ် & လိုင်စင်',
      heroAccent: 'ပရော်ဖက်ရှင်နယ် ဆော့ဖ်ဝဲ',
      heroSub:
        'ကမ္ဘာ့အယုံကြည်ဆုံး ဆော့ဖ်ဝဲ ကိရိယာများအတွက် တရားဝင် လိုင်စင်များ ရယူပါ။ တရားဝင် ဒေါင်းလုပ်၊ ချက်ချင်း ပို့ဆောင်မှု နှင့် 헌身ပေးသည့် ပံ့ပိုးကူညီမှု။',
      browseSoftware: 'ဆော့ဖ်ဝဲ ကြည့်ရှု',
      viewPricing: 'စျေးနှုန်း ကြည့်',
      trust: {
        official: 'တရားဝင် ရင်းမြစ်များသာ',
        instant: 'လိုင်စင် ချက်ချင်း ပို့ဆောင်',
        support: '၂၄/၇ ပံ့ပိုးမှု',
        rating: '၄.၉ / ၅ အဆင့်သတ်မှတ်',
      },
      availableTitle: 'ရရှိနိုင်သော ဆော့ဖ်ဝဲများ',
      availableSub: 'ထုတ်ကုန်များအားလုံးကို တရားဝင် ထုတ်ဝေသူများထံမှ တိုက်ရိုက် ရယူသည်။',
      freeTrial: 'အခမဲ့ စမ်းသုံး',
      buyLicense: 'လိုင်စင် ဝယ်ယူ',
      features: {
        idm: ['ဒေါင်းလုပ် ၅ ဆ ပိုမြန်', 'ကျိုးထွက်မှုများ ဆက်ဒေါင်းလုပ်', 'ဘရောင်ဇာ ပေါင်းစည်း', 'အချိန်ဆွဲ & တန်းစီ'],
        winrar: ['RAR & ZIP ပံ့ပိုး', 'AES-256 ကုဒ်ဝှက်', 'အများပိုင်း သိမ်းဆည်း', 'Command-line အင်တာဖေ့စ်'],
      },
      needHelp: 'ရွေးချယ်ရန် သို့မဟုတ် ဝယ်ယူရန် အကူအညီ လိုသလား?',
      needHelpSub: 'ကျွန်ုပ်တို့ ပံ့ပိုးရေးအဖွဲ့သည် လိုင်စင်ရယူသည့် လုပ်ငန်းစဉ်တလျှောက် လမ်းညွှန်ပေးရန် အသင့်ရှိသည်။',
      howToPurchase: 'ဝယ်နည်း',
      contactSupport: 'ပံ့ပိုးရေး ဆက်သွယ်',
    },

    pricing: {
      badge: 'ဈေးနှုန်း ပွင့်လင်းမြင်သာမှု',
      title: 'လျှော့ဈေး ဈေးနှုန်းများ',
      sub: 'စာရင်းသွင်းမှုများ၊ သိမ်ဝှက်ကြေးများ မရှိ။ တစ်နှစ် သို့မဟုတ် တစ်သက်တာ လိုင်စင်ကို အထူး လျှော့ဈေးဖြင့် ရယူပါ။',
      term1Year: 'တစ်နှစ်',
      termLifetime: 'တစ်သက်တာ',
      term1YearSub: 'အသက်သွင်းသည့် နေ့မှ ၁၂ လ အတွက် သုံးနိုင်သည်',
      termLifetimeSub: 'တစ်ကြိမ် ပေးချေ — အမြဲပိုင်ဆိုင်သည်',
      discountBadge: '~၁၆.၆၇% လျှော့',
      originalLabel: 'မူရင်းဈေး',
      yourPrice: 'သင့်ဈေး',
      save: (amount: string) => `${amount} သက်သာ`,
      oneTime: 'တစ်ကြိမ်တည်း',
      buyBtn: (price: string) => `လိုင်စင် ဝယ်ယူ — ${price}`,
      trialBtn: 'ဦးစွာ အခမဲ့ စမ်းသုံး ဒေါင်းလုပ်',
      notSure: 'ဘယ်ဟာ ဝယ်ရမလဲ မသေချာဘူးလား?',
      notSureSub: 'ကျွန်ုပ်တို့ အဆင့်ဆင့် ဝယ်ယူနည်းလမ်းညွှန်ကို ဖတ်ပါ သို့မဟုတ် ဆက်သွယ်ပါ — မှန်ကန်သော လိုင်စင် ရွေးချယ်ရန် ကူညီပေးမည်။',
      howToPurchase: 'ဝယ်ယူနည်း',
      contact: 'ပံ့ပိုးရေး ဆက်သွယ်',
      features: {
        '1year': [
          'တစ်နှစ် လိုင်စင်သော့',
          'လိုင်စင် ကာလအတွင်း အပ်ဒိတ်များ အားလုံး ပါဝင်',
          'PC ၁ လုံး အသက်သွင်းနိုင်',
          'ဘရောင်ဇာ ပေါင်းစည်း (Chrome, Firefox, Edge)',
          'ဒေါင်းလုပ် အချိန်ဆွဲ & တန်းစီ',
          'နည်းပညာ ပံ့ပိုးမှု',
        ],
        lifetime: [
          'တစ်သက်တာ လိုင်စင်သော့',
          'အနာဂတ် အပ်ဒိတ်များ အားလုံး — အမြဲ ပါဝင်',
          'PC ၁ လုံး အသက်သွင်းနိုင်',
          'ဘရောင်ဇာ ပေါင်းစည်း (Chrome, Firefox, Edge)',
          'ဒေါင်းလုပ် အချိန်ဆွဲ & တန်းစီ',
          'ဦးစားပေး ပံ့ပိုးမှု',
        ],
      },
      buyUrlIdm: 'https://www.internetdownloadmanager.com/register.html',
      buyUrlWinrar: 'https://www.win-rar.com/register.html',
      trialUrlIdm: 'https://www.internetdownloadmanager.com/download.html',
      trialUrlWinrar: 'https://www.win-rar.com/download.html',
    },

    orderLicense: {
      badge: 'လုံခြုံသော မှာယူမှု',
      title: 'လိုင်စင် မှာယူရန်',
      sub: 'ဆော့ဖ်ဝဲ ရွေးချယ်၊ အီးမေးလ် ထည့်သွင်းပြီး တရားဝင် ဝယ်ယူသည့် စာမျက်နှာသို့ လမ်းညွှန်ပေးမည်။ ပေးချေပြီးနောက် လိုင်စင်သော့ ချက်ချင်း ပေးပို့သည်။',
      formTitle: 'လိုင်စင် တောင်းဆိုမှု',
      productLabel: 'ဆော့ဖ်ဝဲ ထုတ်ကုန်',
      productPlaceholder: 'ထုတ်ကုန် ရွေးချယ်ပါ…',
      emailLabel: 'သင့် အီးမေးလ် လိပ်စာ',
      emailPlaceholder: 'you@example.com',
      emailHint: 'ဝယ်ယူပြီးနောက် လိုင်စင်သော့ ဤနေရာသို့ ပေးပို့မည်',
      submitBtn: 'ဝယ်ယူသည့်နေရာသို့ ဆက်သွယ်',
      submitNote: 'တရားဝင် ထုတ်ဝေသူ၏ လုံခြုံသော ငွေပေးချေမှု စာမျက်နှာသို့ ပို့ဆောင်ပေးမည်။',
      successTitle: 'တစ်ကလစ်သာ ကျန်တော့သည်!',
      successSub: (productName: string, email: string) =>
        `${productName} အတွက် သင့် တောင်းဆိုမှုကို မှတ်တမ်းတင်ပြီး။ အောက်ပါ တရားဝင် ထုတ်ဝေသူ ဝဘ်ဆိုဒ်တွင် ဝယ်ယူမှု ပြီးအောင် လုပ်ဆောင်ပါ။ ငွေပေးချေပြီးနောက် လိုင်စင်သော့ ${email} သို့ ပေးပို့မည်။`,
      completePurchase: 'တရားဝင် ဆိုဒ်တွင် ဝယ်ယူမှု ပြီးအောင် လုပ်',
      startOver: 'ပြန်စမည်',
      sideTitle1: 'တရားဝင် လိုင်စင်များ',
      sideBody1: 'လိုင်စင်တိုင်းကို တရားဝင် ထုတ်ဝေသူထံမှ တိုက်ရိုက် ဝယ်ယူသည် — မြောက်မြားစွာ ဈေးကွက် မဟုတ်၊ အန္တရာယ် မရှိ',
      sideTitle2: 'ချက်ချင်း ပို့ဆောင်',
      sideBody2: 'ငွေပေးချေမှု အတည်ပြုချက်ရပြီး မိနစ်ပိုင်းအတွင်း လိုင်စင်သော့ ပေးပို့သည်',
      sideTitle3: 'ပံ့ပိုးမှု ပါဝင်',
      sideBody3: 'ထည့်သွင်းခြင်းနှင့် အသက်သွင်းခြင်းအတွက် ကူညီရန် ကျွန်ုပ်တို့ အဖွဲ့ အသင့်ရှိသည်',
      sideNote: 'မေးခွန်းများ ရှိပါသလား?',
      contactLink: 'ပံ့ပိုးရေးအဖွဲ့ ဆက်သွယ်ပါ',
    },

    howToPurchase: {
      badge: 'အဆင့်ဆင့် လမ်းညွှန်',
      title: 'လိုင်စင် ဝယ်ယူနည်း',
      sub: 'တရားဝင် ဆော့ဖ်ဝဲ လိုင်စင် မြန်မြန်ဆန်ဆန် လုံခြုံစွာ ရရှိရန် ဤရိုးရှင်းသော အဆင့် ၅ ဆင့်ကို လိုက်နာပါ။',
      steps: [
        {
          number: '၀၁',
          title: 'လိုင်စင် ဆော့ဖ်ဝဲ ထည့်သွင်းပြီး ဖွင့်ပါ',
          body: 'ပင်မစာမျက်နှာ "License Software Download" အပိုင်းမှ license tool ကို ဒေါင်းလုပ်ဆွဲပါ။ ထည့်သွင်းပြီး ဖွင့်လျှင် သင့် HWID ကို ပြပါမည်။',
        },
        {
          number: '၀၂',
          title: 'HWID ကူးယူပြီး မှာယူမှု ဖောင် ဖြည့်ပါ',
          body: 'License tool တွင် ပြထားသော HWID ကို ကူးယူပါ။ Order License တွင် ထုတ်ကုန်၊ လိုင်စင် အမျိုးအစား၊ အီးမေးလ် နှင့် HWID ဖြည့်သွင်းပြီး မှာယူမှု ပေးပို့ပါ။',
        },
        {
          number: '၀၃',
          title: 'Telegram မှတဆင့် ကျွန်ုပ်တို့ team ကို ဆက်သွယ်ပါ',
          body: 'မှာယူမှု ပေးပို့ပြီးနောက် Telegram တွင် ကျွန်ုပ်တို့ ပံ့ပိုးရေးအဖွဲ့ကို မှာယူမှု အသေးစိတ်နှင့် ဆက်သွယ်ပါ။ ကျွန်ုပ်တို့ အဖွဲ့ စစ်ဆေးပြီး အတည်ပြုပေးမည်။',
        },
        {
          number: '၀၄',
          title: 'ငွေပေးချေပြီးနောက် လိုင်စင်သော့ လက်ခံရယူပါ',
          body: 'ငွေပေးချေမှု အတည်ပြုပြီးနောက် ကျွန်ုပ်တို့ အဖွဲ့သည် လိုင်စင်သော့ကို မှတ်ပုံတင်ထားသော အီးမေးလ် လိပ်စာသို့ ပေးပို့မည်။ မိနစ် ၁၀ အတွင်း မရောက်လျှင် spam folder စစ်ဆေးပါ။',
        },
        {
          number: '၀၅',
          title: 'သော့ ထည့်သွင်းပြီး features အပြည့် ရယူပါ',
          body: 'ဆော့ဖ်ဝဲ မှတ်ပုံတင်ခြင်း field တွင် လိုင်စင်သော့ ထည့်သွင်းပါ (IDM: Help → Register; WinRAR: Help → Enter license key)။ အသက်သွင်းပြီးသောအခါ premium features အားလုံး ရရှိမည် — trial ကန့်သတ်ချက်များ ပျောက်သွားမည်။',
        },
      ],
      readyTitle: 'စတင်ရန် အသင့်ဖြစ်ပြီလား?',
      buyIdm: 'IDM လိုင်စင် မှာယူ',
      buyWinrar: 'WinRAR လိုင်စင် မှာယူ',
      faqTitle: 'မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများ',
      faqs: [
        {
          q: 'တရားဝင် ထုတ်ဝေသူ ဝဘ်ဆိုဒ်မှ ဝယ်ယူခြင်း လုံခြုံပါသလား?',
          a: 'ဟုတ်ကဲ့ — internetdownloadmanager.com နှင့် win-rar.com နှစ်ခုစလုံးသည် တရားဝင် ထုတ်ဝေသူ ဝဘ်ဆိုဒ်များဖြစ်ပြီး SSL ကုဒ်ဝှက်မှု အပြည့်အဝ အသုံးပြုသည်။',
        },
        {
          q: 'ကွန်ပျူတာ တစ်လုံးထက်ပို၍ လိုင်စင် တစ်ခုကိုပဲ သုံးနိုင်မလား?',
          a: 'စံ တစ်ဦးချင်း လိုင်စင်သည် PC တစ်လုံးကို ခြုံငုံသည်။ ထည့်သွင်းမှု ပိုများလိုလျှင် ထုတ်ဝေသူများတွင် အများသုံး/ စီးပွားရေး လိုင်စင်များ ရရှိနိုင်သည်။',
        },
        {
          q: 'လိုင်စင်သော့ ပျောက်ဆုံးသွားလျှင် ဘာလုပ်ရမလဲ?',
          a: 'ဝယ်ယူမှု အီးမေးလ် စစ်ဆေးပါ။ မတွေ့ပါက ထုတ်ဝေသူ ပံ့ပိုးရေးအဖွဲ့ကို မှာယူမှု အသေးစိတ်နှင့် ဆက်သွယ်ပါ — ပြန်ပေးပို့ပေးနိုင်သည်။',
        },
        {
          q: 'အပ်ဒိတ်တစ်ခုပြီးတစ်ခု ထပ်မံ ပေးချေရပါသလား?',
          a: 'မလိုပါ။ IDM နှင့် WinRAR နှစ်ခုစလုံးသည် မည်သည့် နောက်ထပ် ကုန်ကျစရိတ်မှ မပါဘဲ အနာဂတ် အပ်ဒိတ်များ အားလုံး ပါဝင်သည့် တစ်သက်တာ လိုင်စင်ကို ပေးသည်။',
        },
      ],
      stillHaveQ: 'မေးခွန်းများ ဆက်လက် ရှိသေးသလား?',
      contactSupport: 'ပံ့ပိုးရေးအဖွဲ့ ဆက်သွယ်',
    },

    contact: {
      badge: 'ကူညီရန် အသင့်ရှိသည်',
      title: 'ပံ့ပိုးရေးအဖွဲ့ ဆက်သွယ်ရန်',
      sub: 'လိုင်စင်၊ ဒေါင်းလုပ် သို့မဟုတ် အသက်သွင်းခြင်းနှင့် ပတ်သက်ပြီး မေးခွန်းများ ရှိပါသလား? အောက်ပါ ဖောင် ဖြည့်သွင်းပါ — ၂၄ နာရီအတွင်း ပြန်ကြားပေးမည်။',
      formTitle: 'မက်ဆေ့ ပေးပို့ပါ',
      nameLabel: 'အမည် အပြည့်အစုံ',
      namePlaceholder: 'သင့် နာမည်',
      emailLabel: 'အီးမေးလ် လိပ်စာ',
      emailPlaceholder: 'you@example.com',
      reasonLabel: 'ဆက်သွယ်ရသည့် အကြောင်း',
      reasonPlaceholder: 'အကြောင်းရင်း ရွေးချယ်ပါ…',
      messageLabel: 'မက်ဆေ့',
      messagePlaceholder: 'သင့် ပြဿနာ အသေးစိတ် ဖော်ပြပါ…',
      submitBtn: 'မက်ဆေ့ ပေးပို့',
      successTitle: 'မက်ဆေ့ ရောက်ရှိပြီ!',
      successSub: (name: string, email: string) =>
        `ကျေးဇူးတင်ပါသည်၊ ${name}။ သင့် မက်ဆေ့ ရောက်ရှိပြီဖြစ်ပြီး ${email} သို့ ၂၄ နာရီအတွင်း ပြန်ကြားပေးမည်။`,
      sendAnother: 'နောက်ထပ် မက်ဆေ့ ပေးပို့',
      responseTitle: 'တုံ့ပြန်သည့် အချိန်',
      responseBody: 'လုပ်ငန်းနေ့များတွင် ၂–၂၄ နာရီအတွင်း ပုံမှန် တုံ့ပြန်သည်။ အရေးပေါ် လိုင်စင် ကိစ္စများအတွက် မက်ဆေ့တွင် "URGENT" ဖော်ပြပါ။',
      quickTitle: 'မကြာခဏ မေးသော မေးခွန်းများ',
      quickLinks: [
        'လိုင်စင် ဘယ်လို ဝယ်ရမလဲ?',
        'စျေးနှုန်းများ ဘယ်လောက်ကျ?',
        'လိုင်စင် ဇာတ်မှာ မှာယူချင်သည်',
      ],
      noteTitle: 'မှတ်ချက်:',
      noteBody: 'ဆော့ဖ်ဝဲကိုယ်တိုင်နှင့် ပတ်သက်သော ပြဿနာများ (bug၊ crash) အတွက် တရားဝင် ထုတ်ဝေသူ ပံ့ပိုးရေး စာမျက်နှာများကိုပါ ဆက်သွယ်ပါ:',
      reasons: [
        'လိုင်စင် အသက်သွင်းရန် ကူညီမှု',
        'ဒေါင်းလုပ် / ထည့်သွင်းခြင်း ပြဿနာ',
        'မှာယူမှု & ငွေပေးချေမှု စုံစမ်း',
        'လိုင်စင်သော့ မရရှိ',
        'အထွေထွေ မေးခွန်း',
      ],
    },

    footer: {
      tagline: 'IDM နှင့် WinRAR အတွက် တရားဝင် ဆော့ဖ်ဝဲ ဒေါင်းလုပ်နှင့် လိုင်စင်။ ချက်ချင်း ပို့ဆောင်၊ စစ်ဆေးပြီးသော ရင်းမြစ်များ။',
      officialOnly: 'တရားဝင် ရင်းမြစ်များသာ',
      navTitle: 'လမ်းညွှန်',
      officialTitle: 'တရားဝင် ထုတ်ဝေသူ ဆိုဒ်များ',
      legalTitle: 'ဥပဒေရေးရာ',
      legal: ['ဝန်ဆောင်မှု စည်းကမ်းချက်'],
      copyright: (year: number) => `© ${year} SoftStore။ မူပိုင်ခွင့် အားလုံး ရယူထားသည်။`,
      trademark: 'ဆော့ဖ်ဝဲများအားလုံးသည် မိမိဆိုင်ရာ ထုတ်ဝေသူများ၏ ပစ္စည်းများဖြစ်သည်။ IDM & WinRAR သည် မှတ်ပုံတင်ထားသော ကုန်အမှတ်တံဆိပ်များ ဖြစ်သည်။',
    },

    privacyPolicy: {
      badge: 'ဥပဒေရေးရာ',
      title: 'ကိုယ်ရေးကိုယ်တာ မူဝါဒ',
      lastUpdatedLabel: 'နောက်ဆုံး ပြင်ဆင်သည့် နေ့:',
      lastUpdatedDate: 'ဇူလိုင် ၂၇၊ ၂၀၂၅',
      intro: 'SoftStore ("SoftStore"၊ "ကျွန်ုပ်တို့") သည် ဤဝဘ်ဆိုဒ် ("ဝန်ဆောင်မှု") ကို လည်ပတ်သည်။ ဤ ကိုယ်ရေးကိုယ်တာ မူဝါဒ သည် သင် ကျွန်ုပ်တို့ ဝဘ်ဆိုဒ်ကို သုံးသောအခါ သို့မဟုတ် ဆက်သွယ်ရေး ဖောင် တင်သောအခါ သင့်အချက်အလက်ကို မည်သို့ စုဆောင်း၊ အသုံးပြု၊ ထုတ်ဖော်ပြောကြားကြောင်းကို ရှင်းလင်းပါသည်။ ဤ မူဝါဒကို ဂရုတစိုက် ဖတ်ပါ။ မတ်သင့်ဟု ထင်ပါက ဝန်ဆောင်မှုကို မသုံးပါနှင့်။',

      s1Title: '၁။ ကျွန်ုပ်တို့ စုဆောင်းသော အချက်အလက်များ',
      s1aTitle: '၁.၁ သင် တိုက်ရိုက် ပေးသော အချက်အလက်',
      s1aIntro: 'သင် ကျွန်ုပ်တို့ကို ဆက်သွယ်သောအခါ၊ မှာယူမှု ပြုလုပ်သောအခါ သို့မဟုတ် ပံ့ပိုးရေး ဖောင် သုံးသောအခါ အောက်ပါ အချက်အလက်များ စုဆောင်းနိုင်သည်:',
      s1aItems: [
        'အမည် အပြည့်အစုံ',
        'အီးမေးလ် လိပ်စာ',
        'မက်ဆေ့ အကြောင်းအရာ နှင့် ပံ့ပိုးရေး စုံစမ်းမှု အသေးစိတ်',
        'တောင်းဆိုသော ဆော့ဖ်ဝဲ ထုတ်ကုန် နှင့် လိုင်စင် အမျိုးအစား',
        'လိုင်စင် အသက်သွင်းရန် အသုံးပြုသော Hardware ID (HWID)',
      ],
      s1bTitle: '၁.၂ အလိုအလျောက် စုဆောင်းသော အချက်အလက်',
      s1bIntro: 'ဝန်ဆောင်မှုကို ဝင်ရောက်သောအခါ အောက်ပါ အချက်အလက်အချို့ကို အလိုအလျောက် စုဆောင်းနိုင်သည်:',
      s1bItems: [
        'IP လိပ်စာ နှင့် မြေပုံပေါ် တည်နေရာ (အနီးစပ်ဆုံး)',
        'ဘရောင်ဇာ အမျိုးအစား၊ ဗားရှင်း နှင့် ဘာသာစကား',
        'စက်ပစ္စည်း အမျိုးအစား နှင့် လည်ပတ်မှု စနစ်',
        'သွားရောက်သော စာမျက်နှာများ နှင့် တစ်ခုချင်းစီတွင် ကြာချိန်',
        'လွှဲပြောင်းလာသော URL နှင့် ထွက်ခွာသော စာမျက်နှာ',
        'သွားရောက်သော ရက်စွဲ နှင့် အချိန်',
      ],

      s2Title: '၂။ Cookie နှင့် Tracking နည်းပညာများ',
      s2Intro: 'ဝန်ဆောင်မှုပေါ်တွင် သင့် အတွေ့အကြုံ တိုးမြင့်စေရန် Cookie နှင့် ဆင်တူသည့် Tracking နည်းပညာများ အသုံးပြုသည်။',
      s2TypesTitle: 'ကျွန်ုပ်တို့ အသုံးပြုသော Cookie အမျိုးအစားများ',
      s2Types: [
        ['မရှိမဖြစ် Cookie များ', 'ဝဘ်ဆိုဒ် မှန်ကန်စွာ လည်ပတ်နိုင်ရန် လိုအပ်သည် (ဥပမာ — ဘာသာစကား နှင့် ငွေကြေး ရွေးချယ်မှု မှတ်သားထားခြင်း)။'],
        ['Analytics Cookie များ', 'ဝဘ်ဆိုဒ် လုပ်ဆောင်ချက် နှင့် အကြောင်းအရာ ပိုမိုကောင်းမွန်အောင် လာရောက်သူများ မည်သို့ ဆက်သွယ်ကြောင်း နားလည်ရန် ကူညီသည်။'],
        ['Preference Cookie များ', 'ဘာသာစကား နှင့် ငွေကြေး ကဲ့သို့သော သင့် ဆက်တင်များကို Session များ တစ်ခုမှ တစ်ခုသို့ မှတ်သားထားသည်။'],
      ] as [string, string][],
      s2Note: 'Cookie အားလုံးကို ငြင်းဆန်ရန် သို့မဟုတ် Cookie ပေးပို့သောအခါ ညွှန်ပြရန် ဘရောင်ဇာကို ညွှန်ကြားနိုင်သည်။ သို့သော် Cookie ပိတ်ထားပါက ဝန်ဆောင်မှုအချို့ မှန်ကန်စွာ လည်ပတ်မည် မဟုတ်ပေ။',

      s3Title: '၃။ သင့် အချက်အလက်ကို မည်သို့ အသုံးပြုသည်',
      s3Intro: 'ကျွန်ုပ်တို့ စုဆောင်းသော အချက်အလက်ကို အောက်ပါ ရည်ရွယ်ချက်များအတွက် အသုံးပြုသည်:',
      s3Items: [
        'လိုင်စင် မှာယူမှုများ ဆောင်ရွက်ပြီး လိုင်စင်သော့များ ပေးပို့ရန်',
        'ပံ့ပိုးရေး စုံစမ်းမှုများ နှင့် ဆက်သွယ်ရေး ဖောင် တင်မှုများကို တုံ့ပြန်ရန်',
        'လိုင်စင် အသက်သွင်းမှုအတွက် Hardware ID (HWID) စစ်ဆေးရန်',
        'မှာယူမှု သို့မဟုတ် စုံစမ်းမှုနှင့် ဆက်စပ်သော Transactional အီးမေးလ်များ ပေးပို့ရန်',
        'ဝဘ်ဆိုဒ် လုပ်ဆောင်ချက် ပိုမိုကောင်းမွန်အောင် ပြင်ဆင်ရန်',
        'နည်းပညာ ပြဿနာများ သို့မဟုတ် လိမ်လည်မှုဆိုင်ရာ လုပ်ဆောင်ချက်များ တွေ့ရှိ၊ တားဆီး၊ ဖြေရှင်းရန်',
        'သက်ဆိုင်ရာ ဥပဒေ နှင့် စည်းမျဉ်းများ လိုက်နာရန်',
      ],
      s3Note: 'ကျွန်ုပ်တို့သည် သင့် ကိုယ်ရေးကိုယ်တာ အချက်အလက်ကို တတိယ ပါတီများ၏ ကိုယ်ပိုင် စျေးကွက်ချဲ့ ရည်ရွယ်ချက်များအတွက် ရောင်း၊ ငှား သို့မဟုတ် မျှဝေမည် မဟုတ်ပေ။',
      s3NoteStrong: 'မည်သည့် အတွက်မျှ မရောင်းပေ',

      s4Title: '၄။ အချက်အလက် မျှဝေမှု နှင့် ထုတ်ဖော်ပြောကြားမှု',
      s4Intro: 'အောက်ပါ ကန့်သတ်ထားသော အခြေအနေများတွင်သာ သင့် အချက်အလက်ကို မျှဝေနိုင်သည်:',
      s4Items: [
        ['ဝန်ဆောင်မှု ပေးသူများ', 'ကျွန်ုပ်တို့ ဝဘ်ဆိုဒ် လည်ပတ်ရာတွင် ကူညီသော ယုံကြည်ရသည့် တတိယ ပါတီ ကုမ္ပဏီများနှင့် (ဥပမာ — အီးမေးလ် ပေးပို့ရေး ဝန်ဆောင်မှုများ)၊ ထိုပါတီများသည် ဤ အချက်အလက်ကို လျှို့ဝှက်ထားရမည်ဟု သဘောတူသည်ကို အဓိကထားသည်။'],
        ['ဥပဒေ လိုအပ်ချက်', 'ဥပဒေ၊ တရားရုံး အမိန့် သို့မဟုတ် အစိုးရ အာဏာပိုင်က လိုအပ်ပါက။'],
        ['စီးပွားရေး လွှဲပြောင်းမှု', 'ပေါင်းစည်းမှု၊ ဝယ်ယူမှု သို့မဟုတ် ပိုင်ဆိုင်မှု ရောင်းချမှုနှင့် ဆက်နွှယ်၍ သင့် အချက်အလက်ကို ထိုသဘောတူညီချက်၏ တစ်စိတ်တစ်ပိုင်းအနေဖြင့် လွှဲပြောင်းနိုင်သည်။'],
      ] as [string, string][],

      s5Title: '၅။ တတိယ ပါတီ ဝန်ဆောင်မှုများ',
      s5Intro: 'ကျွန်ုပ်တို့ ဝန်ဆောင်မှုသည် တရားဝင် ထုတ်ဝေသူ ဝဘ်ဆိုဒ်များကို လင့်ခ်ချိတ်ဆက်ခြင်း သို့မဟုတ် ဝယ်ယူမှု ဆောင်ရွက်ပေးသည်၊ ၎င်းတို့မှာ:',
      s5Note: 'ဤ တတိယ ပါတီ ဝဘ်ဆိုဒ်များတွင် ၎င်းတို့၏ ကိုယ်ပိုင် ကိုယ်ရေးကိုယ်တာ မူဝါဒ ရှိသည်။ ကျွန်ုပ်တို့သည် ဤ ပြင်ပ ဆိုဒ်များ၏ ကိုယ်ရေးကိုယ်တာ အလေ့အကျင့်များအတွက် တာဝန်မယူဘဲ ကိုယ်ရေးကိုယ်တာ အချက်အလက် ပေးမတိုင်မှီ ၎င်းတို့၏ မူဝါဒများ ဖတ်ရှုရန် တိုက်တွန်းသည်။',

      s6Title: '၆။ အချက်အလက် သိမ်းဆည်းကာလ',
      s6Body: 'ကျွန်ုပ်တို့သည် ကိုယ်ရေးကိုယ်တာ ဒေတာကို စုဆောင်းရသည့် ရည်ရွယ်ချက်များ ဖြည့်ဆည်းရန် လိုအပ်သည့် ကာလ၊ ဥပဒေ၊ စာရင်းကိုင် သို့မဟုတ် အစီရင်ခံမှု လိုအပ်ချက်များ ပြည့်မီသည့် ကာလ ထိသာ သိမ်းဆည်းသည်။ ဆက်သွယ်ရေး ဖောင် တင်မှုများ နှင့် မှာယူမှု မှတ်တမ်းများကို ပုံမှန်အားဖြင့် ၂၄ လ အထိ သိမ်းဆည်းပြီးနောက် လုံခြုံစွာ ဖျက်ပစ်သည်။',

      s7Title: '၇။ ဒေတာ လုံခြုံရေး',
      s7Body: 'ကျွန်ုပ်တို့သည် သင့် ကိုယ်ရေးကိုယ်တာ အချက်အလက်ကို ခွင့်ပြုချက်မရှိဘဲ ဝင်ရောက်ခြင်း၊ ပြောင်းလဲခြင်း၊ ထုတ်ဖော်ပြောကြားခြင်း သို့မဟုတ် ဖျက်ဆီးခြင်းကို ကာကွယ်ရန် သင့်လျော်သော နည်းပညာဆိုင်ရာ နှင့် အဖွဲ့အစည်းဆိုင်ရာ လုံခြုံရေး အစီအမံများ ချမှတ်ထားသည်။ သို့သော် အင်တာနက်မှတဆင့် ပေးပို့ခြင်း သို့မဟုတ် ဒစ်ဂျစ်တယ် သိမ်းဆည်းမှုနှင့် ဆက်ဆံသည့် မည်သည့် နည်းလမ်းမျှ ၁၀၀% လုံခြုံမည် မဟုတ်ပေ။ ကျွန်ုပ်တို့သည် ဒေတာ ကာကွယ်ရန် စီးပွားဖြစ် လက်ခံနိုင်သော နည်းလမ်းများ အသုံးပြုရန် ကြိုးစားသော်လည်း အပြည့်အဝ လုံခြုံမှုကို အာမခံနိုင်မည် မဟုတ်ပေ။',

      s8Title: '၈။ သင့် အခွင့်အရေးများ',
      s8Intro: 'သင် နေထိုင်ရာ နေရာပေါ် မူတည်၍ သင့် ကိုယ်ရေးကိုယ်တာ ဒေတာနှင့် ပတ်သက်ပြီး အောက်ပါ အခွင့်အရေးများ ရှိနိုင်သည်:',
      s8Items: [
        ['ဝင်ရောက်ကြည့်ရှုခွင့်', 'ကျွန်ုပ်တို့ ထိန်းသိမ်းထားသော သင့် ကိုယ်ရေးကိုယ်တာ ဒေတာ မိတ္တူ တောင်းဆိုနိုင်သည်။'],
        ['ပြင်ဆင်ခွင့်', 'မမှန်ကန်သော သို့မဟုတ် မပြည့်စုံသော ဒေတာ ပြင်ဆင်ရန် တောင်းဆိုနိုင်သည်။'],
        ['ဖျက်သိမ်းခွင့်', 'ဥပဒေ ဆိုင်ရာ တာဝန်ဝတ္တရားအချို့ကို ခြွင်းချက်ထား၍ သင့် ကိုယ်ရေးကိုယ်တာ ဒေတာ ဖျက်သိမ်းရန် တောင်းဆိုနိုင်သည်။'],
        ['ကန့်ကွက်ခွင့်', 'အချို့ အခြေအနေများတွင် သင့် ကိုယ်ရေးကိုယ်တာ ဒေတာ စီမံဆောင်ရွက်ခြင်းကို ကန့်ကွက်နိုင်သည်။'],
        ['လွှဲပြောင်းခွင့်', 'နည်းပညာ အရ ဖြစ်နိုင်ပါက ဒေတာကို အခြား ဝန်ဆောင်မှု ပေးသူထံ လွှဲပြောင်းရန် တောင်းဆိုနိုင်သည်။'],
      ] as [string, string][],
      s8Note: (email: string) => `ဤ အခွင့်အရေးများ ထိုးကြွင်းရန် ${email} တွင် ကျွန်ုပ်တို့ကို ဆက်သွယ်ပါ။`,

      s9Title: '၉။ ကလေးများ၏ ကိုယ်ရေးကိုယ်တာ',
      s9Body: 'ကျွန်ုပ်တို့ ဝန်ဆောင်မှုသည် အသက် ၁၃ နှစ်အောက် ကလေးများကို ဦးတည်မဆောင်ပေ။ ကျွန်ုပ်တို့သည် အသက် ၁၃ နှစ်အောက် ကလေးများထံမှ ကိုယ်ရေးကိုယ်တာ အချက်အလက် သိသိသာသာ မစုဆောင်းပေ။ ကလေးတစ်ဦးက ကျွန်ုပ်တို့ကို ကိုယ်ရေးကိုယ်တာ ဒေတာ ပေးခဲ့သည်ကို သိပါက ကျွန်ုပ်တို့ကို ဆက်သွယ်ပါ — ထိုအချက်အလက် ဖျက်သိမ်းရန် လုပ်ဆောင်ပေးမည်။',

      s10Title: '၁၀။ ဤ ကိုယ်ရေးကိုယ်တာ မူဝါဒ ပြောင်းလဲမှုများ',
      s10Body: 'ကျွန်ုပ်တို့သည် ဤ ကိုယ်ရေးကိုယ်တာ မူဝါဒကို အခါအားလျော်စွာ ပြင်ဆင်နိုင်သည်။ မည်သည့် ပြောင်းလဲမှုမဆို ဤ စာမျက်နှာတွင် မူဝါဒ အသစ် တင်ပြပြီး "နောက်ဆုံး ပြင်ဆင်သည့် နေ့" ကို ပြောင်းလဲ၍ အကြောင်းကြားပေးမည်။ ဤ ကိုယ်ရေးကိုယ်တာ မူဝါဒကို ကာလအားလျော်စွာ ပြန်လည် ဖတ်ရှုရန် တိုက်တွန်းသည်။ ပြောင်းလဲမှုများ တင်ပြပြီးနောက် ဝန်ဆောင်မှု ဆက်လက် သုံးစွဲသောအခါ ထိုပြောင်းလဲမှုများကို လက်ခံသည်ဟု မှတ်ယူသည်။',

      s11Title: '၁၁။ ဆက်သွယ်ရန်',
      s11Intro: 'ဤ ကိုယ်ရေးကိုယ်တာ မူဝါဒနှင့် ပတ်သက်ပြီး မေးခွန်း၊ စိုးရိမ်ချက် သို့မဟုတ် တောင်းဆိုမှုများ ရှိပါက ကျွန်ုပ်တို့ကို ဆက်သွယ်ပါ:',
      s11EmailLabel: 'အီးမေးလ်:',
    },

    termsOfService: {
      badge: 'ဥပဒေရေးရာ',
      title: 'ဝန်ဆောင်မှု စည်းကမ်းချက်များ',
      lastUpdatedLabel: 'နောက်ဆုံး ပြင်ဆင်သည့် နေ့:',
      lastUpdatedDate: 'ဇူလိုင် ၂၇၊ ၂၀၂၅',
      intro: 'SoftStore ဝဘ်ဆိုဒ် ("ဝန်ဆောင်မှု") ကို အသုံးပြုမတိုင်မှီ ဤ ဝန်ဆောင်မှု စည်းကမ်းချက်များ ("စည်းကမ်းများ") ကို ဂရုတစိုက် ဖတ်ပါ။ ဝန်ဆောင်မှုကို ဝင်ရောက်ခြင်း သို့မဟုတ် အသုံးပြုခြင်းဖြင့် ဤ စည်းကမ်းများကို လိုက်နာရန် သဘောတူသည်ဟု မှတ်ယူသည်။ သဘောမတူပါက ဝန်ဆောင်မှု အသုံးပြုခြင်းကို ရပ်တန့်ပါ။',

      s1Title: '၁။ စည်းကမ်းများ လက်ခံခြင်း',
      s1Body: 'SoftStore ကို ဝင်ရောက်ခြင်း သို့မဟုတ် အသုံးပြုခြင်းဖြင့် သင်သည် အသက် ၁၈ နှစ် ပြည့်ပြီးဖြစ်သည်၊ ဤ စည်းကမ်းများကို ဖတ်ရှုနားလည်ပြီး၊ ၎င်းတို့ကို လိုက်နာရန် သဘောတူသည်ဟု အတည်ပြုသည်။ အဖွဲ့အစည်းတစ်ခုကိုယ်စား ဝန်ဆောင်မှုကို သုံးစွဲပါက ထိုအဖွဲ့အစည်းကို ဤ စည်းကမ်းများနှင့် ချည်နှောင်ရန် အာဏာရှိကြောင်း ကိုယ်စားပြုကြောင်း ဖော်ပြသည်။',

      s2Title: '၂။ ကျွန်ုပ်တို့ ဝန်ဆောင်မှုအကြောင်း',
      s2Body: 'SoftStore သည် Internet Download Manager (IDM) နှင့် WinRAR အပါအဝင် ဆော့ဖ်ဝဲ ထုတ်ကုန်များအတွက် တရားဝင် ဆော့ဖ်ဝဲ လိုင်စင်သော့များ ဝယ်ယူမှုနှင့် ပေးပို့မှုကို ဆောင်ရွက်ပေးသည်။ ကျွန်ုပ်တို့သည် တရားဝင် ပြန်လည်ရောင်းချသူ နှင့် မှာယူမှု ဆောင်ရွက်ပေးသူအဖြစ် ဆောင်ရွက်သည်။ ဆော့ဖ်ဝဲ ထုတ်ကုန်များ အားလုံးသည် မိမိ ဆိုင်ရာ ထုတ်ဝေသူများ၏ မူပိုင်ဆိုင်မှု ဖြစ်သည်။ SoftStore မှ ဝယ်ယူမှု ပြီးစီးသောအခါ တရားဝင် ထုတ်ဝေသူထံမှ လိုင်စင် ရရှိမည် ဖြစ်ပြီး ဆော့ဖ်ဝဲ ပိုင်ဆိုင်မှုကို လွှဲပြောင်းမည် မဟုတ်ပေ။',

      s3Title: '၃။ စျေးနှုန်း နှင့် ငွေပေးချေမှု',
      s3Intro: 'ဝဘ်ဆိုဒ်တွင် ပြသသော စျေးနှုန်းများ အားလုံးသည် အမေရိကန် ဒေါ်လာ (USD) ဖြင့် ဖော်ပြသည် (အခြားနည်း သတ်မှတ်မထားပါက)။ ပြသသော မြန်မာ ကျပ် (MMK) စျေးနှုန်းသည် ကြည့်ရှုရန်သာ ဖြစ်ပြီး ခန့်မှန်းသော နှုန်းကို အသုံးပြုသည်။ မှာယူမှု ပြုလုပ်ခြင်းဖြင့် အောက်ပါ သဘောတူညီချက်များ လက်ခံသည်:',
      s3Items: [
        'စျေးနှုန်းများ ကြိုတင် အကြောင်းကြားမှု မပါဘဲ ပြောင်းလဲနိုင်သည်။',
        'လိုင်စင်သော့ ထုတ်ပေးမတိုင်မှီ ငွေပေးချေမှု အပြည့်အဝ ပြုလုပ်ရမည်။',
        'ဖြည့်ဆည်းနိုင်မည် မဟုတ်သော မည်သည့် မှာယူမှုကိုမဆို ပယ်ဖျက်ပိုင်ခွင့် ကျွန်ုပ်တို့တွင် ရှိသည်။',
        'သင်၏ ဒေသဆိုင်ရာ အာဏာပိုင်များ သတ်မှတ်သော မည်သည့် အခွန် သို့မဟုတ် ကြေးနက်ကိုမဆို သင် ကိုယ်တိုင် တာဝန်ယူရသည်။',
      ],

      s4Title: '၄။ မှာယူမှု လုပ်ငန်းစဉ်',
      s4Intro: 'ကျွန်ုပ်တို့ မှာယူမှု လုပ်ငန်းစဉ် အောက်ပါအတိုင်း ဆောင်ရွက်သည်:',
      s4Steps: [
        'Order License စာမျက်နှာမှ သင့် အီးမေးလ် လိပ်စာ နှင့် Hardware ID (HWID) ဖြင့် မှာယူမှု တင်ပါ။',
        'ကျွန်ုပ်တို့ အဖွဲ့သည် သင့် တောင်းဆိုမှုကို စစ်ဆေးပြီး ရနိုင်မှုကို အတည်ပြုသည်။',
        'ပံ့ပိုးရေး အဖွဲ့နှင့် သဘောတူသည့် နည်းလမ်းဖြင့် ငွေပေးချေမှု ပြုလုပ်သည်။',
        'ငွေပေးချေမှု အတည်ပြုပြီးနောက် မှတ်ပုံတင်ထားသော အီးမေးလ် လိပ်စာသို့ လိုင်စင်သော့ ပေးပို့သည်။',
      ],

      s5Title: '၅။ လိုင်စင်သော့ ပေးပို့မှု',
      s5Body: 'လိုင်စင်သော့များကို ငွေပေးချေမှု အတည်ပြုပြီးနောက် စစ်ဆေးမှု လိုအပ်ချက်ပေါ် မူတည်၍ ပုံမှန်အားဖြင့် မိနစ်ပိုင်းမှ နာရီအနည်းငယ်အတွင်း ပေးပို့သည်။ မှာယူချိန်တွင် ပေးထားသော အီးမေးလ် လိပ်စာသို့ သော့ ပေးပို့သည်။ မျှော်မှန်းသည့် အချိန်အတွင်း မရောက်ပါက spam သို့မဟုတ် junk folder စစ်ဆေးပါ။ ဖောက်သည်က အမှားအယွင်း အီးမေးလ် လိပ်စာ ပေးသောကြောင့် ပေးပို့မှု မအောင်မြင်ပါက SoftStore တာဝန်မယူပေ။',

      s6Title: '၆။ ရောင်းပြီးသော ကုန်ပစ္စည်း ပြန်မလဲပေ',
      s6Body: 'ဆော့ဖ်ဝဲ လိုင်စင်သော့များ၏ ဒစ်ဂျစ်တယ် သဘောသဘာဝ နှင့် ပြန်မပေးနိုင်သည့် သဘောကြောင့် ရောင်းချပြီးသော ကုန်ပစ္စည်းများ ငွေပြန်မအမ်းပေ။ လိုင်စင်သော့ သင့် အီးမေးလ်သို့ ရောက်ပြီးနောက် ငွေပြန်အမ်းမှု သို့မဟုတ် လဲလှယ်မှု မပြုပေ။ သော့ ပြဿနာ ရှိသည်ဟု ယူဆပါက (ဥပမာ — သော့ မအသက်မသွင်းနိုင်ပါက) ပေးပို့ပြီး ၄၈ နာရီအတွင်း ပံ့ပိုးရေး အဖွဲ့ကို ဆက်သွယ်ပါ — ကျွန်ုပ်တို့ စုံစမ်းစစ်ဆေးပြီး ဖြေရှင်းချက် ပေးမည်။',

      s7Title: '၇။ မူပိုင်ဆိုင်မှု',
      s7Body: 'SoftStore မှတဆင့် ရနိုင်သော ဆော့ဖ်ဝဲ ထုတ်ကုန်များ အားလုံးသည် မိမိ ဆိုင်ရာ ထုတ်ဝေသူများ — Tonec Inc. (Internet Download Manager) နှင့် win.rar GmbH (WinRAR) — တို့၏ မူပိုင်ဆိုင်မှု ဖြစ်သည်။ SoftStore အမည်၊ လိုဂို နှင့် ဝဘ်ဆိုဒ် အကြောင်းအရာများသည် SoftStore ပိုင်ဆိုင်သည်။ ကြိုတင် စာဖြင့် ခွင့်ပြုချက်မရဘဲ ဝဘ်ဆိုဒ်ပေါ်မှ မည်သည့် အကြောင်းအရာကိုမဆို ကူးယူ၊ ပြန်လည်ထုတ်ဝေ၊ ဖြန့်ဝေ သို့မဟုတ် ဆင်ပြားဖန်တီးမှုများ ပြုလုပ်ခြင်း မပြုနိုင်ပေ။',

      s8Title: '၈။ ခွင့်ပြုနိုင်သော အသုံးပြုမှု',
      s8Intro: 'ဝန်ဆောင်မှုကို အသုံးပြုသောအခါ အောက်ပါ အရာများ မပြုလုပ်ရန် သဘောတူသည်:',
      s8Items: [
        'SoftStore မှ ဝယ်ယူသော လိုင်စင်သော့ကို တတိယ ပါတီသို့ ပြန်ရောင်းခြင်း၊ ဖြန့်ဝေခြင်း သို့မဟုတ် လွှဲပြောင်းခြင်း။',
        'ခွင့်ပြုသည့် ကိရိယာ အရေအတွက်ထက် ပိုသော ကိရိယာများတွင် လိုင်စင်သော့တစ်ခုတည်း သုံးရန် ကြိုးစားခြင်း။',
        'မှာယူမှု ပြုလုပ်ရာတွင် မှားယွင်းသော သို့မဟုတ် လှည့်ဖြားသော သတင်းအချက်အလက် ပေးခြင်း။',
        'ဥပဒေမဲ့၊ လိမ်လည်မှု ဆိုင်ရာ သို့မဟုတ် အန္တရာယ်ဖြစ်စေသော ရည်ရွယ်ချက်ဖြင့် ဝန်ဆောင်မှု သုံးစွဲခြင်း။',
        'ကျွန်ုပ်တို့ စနစ်သို့ ခွင့်မပြုဘဲ ဝင်ရောက်ရန် ကြိုးစားခြင်း သို့မဟုတ် ဝန်ဆောင်မှုကို နှောင့်ယှက်ခြင်း။',
      ],

      s9Title: '၉။ အာမခံချက် ငြင်းဆန်ခြင်း',
      s9Body: 'ဝန်ဆောင်မှုကို ကုန်သွယ်မှုဆိုင်ရာ အကောင်းဆုံး ကိုယ်ခံပြင်ဆင်မှု၊ သတ်မှတ် ရည်ရွယ်ချက်အတွက် သင့်လျော်မှု နှင့် ချိုးဖောက်မှု ကင်းစင်မှု ကဲ့သို့သော ကြိုတင်ကတိ တိပ်တ ကြောင်ကြောင် ကောင်ကောင် မပေးသော "အရင်းတိုင်းပင်" နှင့် "ရနိုင်သမျှ" အခြေခံဖြင့် ပေးသည်။ ဝန်ဆောင်မှု အနှောင့်အယှက်မရှိ၊ အမှားအယွင်းကင်း သို့မဟုတ် ဗိုင်းရပ်စ် ကင်းမဲ့မည်ဟု SoftStore အာမခံမည် မဟုတ်ပေ။ ဝန်ဆောင်မှု အသုံးပြုမှုသည် သင့် ကိုယ်တိုင် တာဝန် ယူရသည်။',

      s10Title: '၁၀။ တာဝန်ယူမှု ကန့်သတ်ချက်',
      s10Body: 'သက်ဆိုင်ရာ ဥပဒေ ခွင့်ပြုသည့် အများဆုံး အတိုင်းအတာ၊ SoftStore နှင့် ၎င်း၏ လုပ်ကိုင်သူများသည် ဝန်ဆောင်မှု သုံးစွဲမှုမှ ဖြစ်ပေါ်သော မည်သည့် သွယ်ဝိုက်သော၊ ကျပန်းဖြစ်ပေါ်သော၊ အထူး၊ ဆက်နွှယ်သော သို့မဟုတ် ပြစ်ဒဏ်ဆိုင်ရာ ထိခိုက်ဆုံးရှုံးမှုအတွက် တာဝန်မခံပေ။ မည်သည့် ကိစ္စမဆိုတွင် ကျွန်ုပ်တို့ တာဝန်ဆောင်မှုသည် ကိစ္စကို ဖြစ်ပေါ်စေသော မှာယူမှုအတွက် သင် ပေးချေသော ပမာဏကိုသာ မကျော်လွန်ပေ။',

      s11Title: '၁၁။ ဤ စည်းကမ်းများ ပြောင်းလဲမှု',
      s11Body: 'ဤ စည်းကမ်းများကို မည်သည့် အချိန်မဆို ပြင်ဆင်ပိုင်ခွင့် ကျွန်ုပ်တို့တွင် ရှိသည်။ ပြောင်းလဲမှု ပြုလုပ်သောအခါ ဤ စာမျက်နှာ ထိပ်ရှိ "နောက်ဆုံး ပြင်ဆင်သည့် နေ့" ကို ပြင်ဆင်မည်။ ပြောင်းလဲမှုများ တင်ပြပြီးနောက် ဝန်ဆောင်မှု ဆက်လက် သုံးစွဲသောအခါ ပြင်ဆင်ပြောင်းလဲသည့် စည်းကမ်းများကို လက်ခံသည်ဟု မှတ်ယူသည်။ ဤ စည်းကမ်းများကို ကာလအားလျော်စွာ ပြန်လည် ဖတ်ရှုရန် တိုက်တွန်းသည်။',

      s12Title: '၁၂။ အုပ်ချုပ်မှု ဥပဒေ',
      s12Body: 'ဤ စည်းကမ်းများကို သက်ဆိုင်ရာ ဥပဒေများ အရ အုပ်ချုပ်ပြီး ဆောင်ရွက်မည်။ ဤ စည်းကမ်းများ သို့မဟုတ် ဝန်ဆောင်မှုမှ ဖြစ်ပေါ်သော အငြင်းပွားမှုများကို ကောင်းမွန်သော ရည်ရွယ်ချက်ဖြင့် ညှိနှိုင်းဆွေးနွေးခြင်းမှတဆင့် ဖြေရှင်းမည်။ ညှိနှိုင်းဖြေရှင်းနိုင်မပါက သင့်လျော်သည့် တရားစီရင်ပိုင်ခွင့်ရှိသော တရားရုံးသို့ တင်ပြမည်။',

      s13Title: '၁၃။ ဆက်သွယ်ရန်',
      s13Intro: 'ဤ ဝန်ဆောင်မှု စည်းကမ်းချက်များနှင့် ပတ်သက်ပြီး မေးခွန်း သို့မဟုတ် စိုးရိမ်ချက်များ ရှိပါက ကျွန်ုပ်တို့ကို ဆက်သွယ်ပါ:',
      s13EmailLabel: 'အီးမေးလ်:',
    },

    langLabel: 'ဘာသာစကား',
    currencyLabel: 'ငွေကြေး',
  },
} as const;

export type Translations = typeof translations.en;
