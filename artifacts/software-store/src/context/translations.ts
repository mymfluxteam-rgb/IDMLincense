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
      trialUrlIdm: 'https://mega.nz/file/jlxxiKoL#VJpj11uOnzt4VKTLkF6yOAc7_kvix5s_5gLB509cNJY',
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
          title: 'Choose Your Software',
          body: "Browse our catalog and select the software you need — Internet Download Manager (IDM) or WinRAR. Click 'Buy License' to go to the official publisher's secure checkout page.",
        },
        {
          number: '02',
          title: 'Try Before You Buy (Optional)',
          body: 'Both IDM and WinRAR offer free trial versions. Download and test the software before committing to a purchase. Trials are fully functional with minor reminders to register.',
        },
        {
          number: '03',
          title: 'Complete Payment',
          body: 'On the official publisher website, fill in your name, email address, and payment details. Both publishers accept major credit/debit cards and PayPal. Payment is processed securely via SSL.',
        },
        {
          number: '04',
          title: 'Receive Your License Key',
          body: "After payment is confirmed, you'll receive an email with your unique license/serial key. Check your spam folder if it doesn't arrive within 10 minutes.",
        },
        {
          number: '05',
          title: 'Activate Your Software',
          body: "Open the installed software, navigate to Registration (IDM: Help → Register; WinRAR: Help → Enter license key), and enter the key exactly as provided. You're fully licensed!",
        },
      ],
      readyTitle: 'Ready to get started?',
      buyIdm: 'Buy IDM License',
      buyWinrar: 'Buy WinRAR License',
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
        'Refund request',
        'General question',
      ],
    },

    footer: {
      tagline: 'Official software downloads and genuine licensing for IDM and WinRAR. Instant delivery, verified sources.',
      officialOnly: 'Official sources only',
      navTitle: 'Navigation',
      officialTitle: 'Official Publisher Sites',
      legalTitle: 'Legal',
      legal: ['Terms of Service', 'Privacy Policy', 'Refund Policy'],
      copyright: (year: number) => `© ${year} SoftStore. All rights reserved.`,
      trademark: 'All software is property of their respective publishers. IDM & WinRAR are registered trademarks.',
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
      trialUrlIdm: 'https://mega.nz/file/jlxxiKoL#VJpj11uOnzt4VKTLkF6yOAc7_kvix5s_5gLB509cNJY',
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
          title: 'ဆော့ဖ်ဝဲ ရွေးချယ်ပါ',
          body: "ကျွန်ုပ်တို့ ကတ်တလောဂ်တွင် ကြည့်ရှုပြီး လိုအပ်သော ဆော့ဖ်ဝဲ — IDM သို့မဟုတ် WinRAR — ရွေးချယ်ပါ။ 'လိုင်စင် ဝယ်ယူ' ကို နှိပ်ပြီး တရားဝင် ထုတ်ဝေသူ၏ ငွေပေးချေမှု စာမျက်နှာသို့ သွားပါ။",
        },
        {
          number: '၀၂',
          title: 'ဝယ်မနှိပ်ခင် စမ်းကြည့်ပါ (ရွေးချယ်နိုင်)',
          body: 'IDM နှင့် WinRAR နှစ်ခုစလုံး အခမဲ့ စမ်းသုံးဗားရှင်း ပေးသည်။ ဝယ်ယူမတိုင်မီ ဆော့ဖ်ဝဲကို ဒေါင်းလုပ်ဆွဲပြီး စမ်းသုံးကြည့်ပါ။',
        },
        {
          number: '၀၃',
          title: 'ငွေပေးချေမှု ပြီးအောင် လုပ်ပါ',
          body: 'တရားဝင် ထုတ်ဝေသူ ဝဘ်ဆိုဒ်တွင် သင့် နာမည်၊ အီးမေးလ် နှင့် ငွေပေးချေမှု အသေးစိတ် ဖြည့်သွင်းပါ။ ကတ်ဒ် နှင့် PayPal လက်ခံသည်။',
        },
        {
          number: '၀၄',
          title: 'လိုင်စင်သော့ လက်ခံရယူပါ',
          body: 'ငွေပေးချေမှု အတည်ပြုပြီးနောက် သင့် ထူးခြားသော လိုင်စင်/စီရီရယ်သော့ပါ အီးမေးလ် ရပါမည်။ မိနစ် ၁၀ အတွင်း မရောက်လျှင် spam folder စစ်ဆေးပါ။',
        },
        {
          number: '၀၅',
          title: 'ဆော့ဖ်ဝဲ အသက်သွင်းပါ',
          body: 'ထည့်သွင်းထားသော ဆော့ဖ်ဝဲ ဖွင့်ပြီး မှတ်ပုံတင်ခြင်း (IDM: Help → Register; WinRAR: Help → Enter license key) သို့ သွားကာ သော့ ထည့်သွင်းပါ။',
        },
      ],
      readyTitle: 'စတင်ရန် အသင့်ဖြစ်ပြီလား?',
      buyIdm: 'IDM လိုင်စင် ဝယ်ယူ',
      buyWinrar: 'WinRAR လိုင်စင် ဝယ်ယူ',
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
        'ငွေပြန်အမ်းရန် တောင်းဆို',
        'အထွေထွေ မေးခွန်း',
      ],
    },

    footer: {
      tagline: 'IDM နှင့် WinRAR အတွက် တရားဝင် ဆော့ဖ်ဝဲ ဒေါင်းလုပ်နှင့် လိုင်စင်။ ချက်ချင်း ပို့ဆောင်၊ စစ်ဆေးပြီးသော ရင်းမြစ်များ။',
      officialOnly: 'တရားဝင် ရင်းမြစ်များသာ',
      navTitle: 'လမ်းညွှန်',
      officialTitle: 'တရားဝင် ထုတ်ဝေသူ ဆိုဒ်များ',
      legalTitle: 'ဥပဒေရေးရာ',
      legal: ['ဝန်ဆောင်မှု စည်းကမ်းချက်', 'ကိုယ်ရေးကိုယ်တာ မူဝါဒ', 'ငွေပြန်အမ်းမှု မူဝါဒ'],
      copyright: (year: number) => `© ${year} SoftStore။ မူပိုင်ခွင့် အားလုံး ရယူထားသည်။`,
      trademark: 'ဆော့ဖ်ဝဲများအားလုံးသည် မိမိဆိုင်ရာ ထုတ်ဝေသူများ၏ ပစ္စည်းများဖြစ်သည်။ IDM & WinRAR သည် မှတ်ပုံတင်ထားသော ကုန်အမှတ်တံဆိပ်များ ဖြစ်သည်။',
    },

    langLabel: 'ဘာသာစကား',
    currencyLabel: 'ငွေကြေး',
  },
} as const;

export type Translations = typeof translations.en;
