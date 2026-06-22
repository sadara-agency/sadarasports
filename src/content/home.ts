import type { Bi } from '@/lib/i18n';

/* ── CAA-style homepage-as-navigation ──────────────────────────────────────
   The home page IS the nav: three pillars (the SBUs) stacked; selecting one
   reveals its child links inline. Also reused by the interior MegaNav overlay.
   Mirrors the IA sitemap's What-We-Do depth. */
export type HomePillarChild = { label: Bi; href: string };
export type HomePillar = { key: string; label: Bi; href: string; children: HomePillarChild[] };

export const homeThesis: Bi = {
  ar: 'نصنع الفرص في كرة القدم.',
  en: 'We create opportunity in football.',
};

export const homePillars: HomePillar[] = [
  {
    key: 'talent',
    label: { ar: 'إدارة المواهب', en: 'Talent Management' },
    href: '/talent',
    children: [
      { label: { ar: 'إيليت 360 — المنصّة', en: 'Elite 360 — the platform' }, href: '/talent/elite-360' },
      { label: { ar: 'الخدمات', en: 'Services' }, href: '/talent/services' },
      { label: { ar: 'للّاعبين والعائلات', en: 'For Athletes & Families' }, href: '/talent/join' },
    ],
  },
  {
    key: 'advisory',
    label: { ar: 'استشارات الأندية والاتحادات', en: 'Club & Federation Advisory' },
    href: '/advisory',
    children: [
      { label: { ar: 'نظام ذكاء الأندية', en: 'Club Intelligence System' }, href: '/advisory/intelligence' },
      { label: { ar: 'تقييم المدربين والإدارة', en: 'Coach & Management Evaluation' }, href: '/advisory/coaching' },
      { label: { ar: 'التوظيف واستراتيجية التشكيلة', en: 'Recruitment & Squad Strategy' }, href: '/advisory/recruitment' },
      { label: { ar: 'التحليل التنافسي والأكاديميات', en: 'Competitive & Academy Advisory' }, href: '/advisory/analysis' },
      { label: { ar: 'للأندية والاتحادات', en: 'For Clubs & Federations' }, href: '/advisory/engage' },
    ],
  },
  {
    key: 'markets',
    label: { ar: 'الأسواق والشراكات', en: 'Markets & Partnerships' },
    href: '/markets',
    children: [
      { label: { ar: 'مكتب صفقات الدوري', en: 'The SPL Deal Desk' }, href: '/markets/deal-desk' },
      { label: { ar: 'الشراكات المؤسسية', en: 'Corporate Partnerships' }, href: '/markets/partnerships' },
      { label: { ar: 'الشبكة العالمية', en: 'The Global Network' }, href: '/markets/network' },
      { label: { ar: 'للشركات والوكلاء', en: 'For Corporates & Agents' }, href: '/markets/connect' },
    ],
  },
];

export const hero = {
  kicker: { ar: 'مؤسسة، لا وكالة', en: 'An institution, not an agency' } as Bi,
  // The thesis line — word-lit on scroll.
  title: {
    ar: 'نكتشف، ونطوّر، ونضخّم قيمة الرياضة السعودية.',
    en: 'We identify, develop, and amplify the value of Saudi sport.',
  } as Bi,
  lead: {
    ar: 'مؤسسة واحدة، ثلاث وحدات استراتيجية وعمود فقري مشترك — نُمثّل المواهب، ونستشير الأندية والاتحادات، ونربط الأسواق. ممثَّلون بالمؤسسة كاملةً.',
    en: 'One institution, three strategic units on a shared spine — we represent talent, advise clubs and federations, and connect markets. Represented by the whole institution.',
  } as Bi,
  represented: { ar: 'ممثَّلون بالمؤسسة كاملةً', en: 'Represented by the whole institution' } as Bi,
};

// Investor proof band.
export const proof = [
  { value: 3, label: { ar: 'وحدات استراتيجية', en: 'Strategic units' }, suffix: '' },
  { value: 4, label: { ar: 'مسارات تطوير', en: 'Development tracks' }, suffix: '' },
  { value: 8, label: { ar: 'ممرات عالمية', en: 'Global corridors' }, suffix: '' },
  { value: 2034, label: { ar: 'كأس العالم في السعودية', en: 'World Cup in KSA' }, suffix: '', grouping: false },
];

// One institution, three units.
export const units = [
  {
    key: 'talent',
    no: '01',
    href: '/talent',
    name: { ar: 'إدارة المواهب', en: 'Talent Management' } as Bi,
    tagline: { ar: 'نُمثّل ونطوّر اللاعبين كأصول طويلة الأمد.', en: 'Represent & develop athletes as long-term assets.' } as Bi,
    desc: {
      ar: 'منصة Elite 360 ونظام الفئات والمسارات الأربعة — تمثيل، وأداء وتطوير، وعلامة تجارية وتجاري، وانتقال مهني.',
      en: 'The Elite 360 platform, the tier system, and four tracks — representation, performance & development, brand & commercial, and career transition.',
    } as Bi,
  },
  {
    key: 'advisory',
    no: '02',
    href: '/advisory',
    name: { ar: 'استشارات الأندية والاتحادات', en: 'Club & Federation Advisory' } as Bi,
    tagline: { ar: 'نستشير المؤسسات — بأصول خفيفة.', en: 'Advise institutions — asset-light.' } as Bi,
    desc: {
      ar: 'نظام ذكاء الأندية، وتقييم المدربين والإدارة، واستراتيجية التوظيف والتشكيلة، والتحليل التنافسي وتصميم الأكاديميات.',
      en: 'The Club Intelligence System, coach & management evaluation, recruitment & squad strategy, and competitive & academy advisory.',
    } as Bi,
  },
  {
    key: 'markets',
    no: '03',
    href: '/markets',
    name: { ar: 'الأسواق والشراكات', en: 'Markets & Partnerships' } as Bi,
    tagline: { ar: 'نتعامل ونربط — محرّك النقد.', en: 'Transact & connect — the cash engine.' } as Bi,
    desc: {
      ar: 'مكتب صفقات الدوري السعودي، والشراكات المؤسسية والرعاية، والشبكة العالمية عبر ثمانية ممرات.',
      en: 'The SPL Deal Desk, corporate partnerships & sponsorship, and the global network across eight corridors.',
    } as Bi,
  },
];

export const unitsHeader = {
  kicker: { ar: 'مؤسسة واحدة، ثلاث وحدات', en: 'One institution, three units' } as Bi,
  title: { ar: 'عمود فقري مشترك. ثلاثة محرّكات للقيمة.', en: 'One shared spine. Three engines of value.' } as Bi,
  lead: {
    ar: 'لا قائمة خدمات، بل بنية مؤسسية: كل وحدة وجهةٌ قائمة بذاتها، تستند جميعها إلى الذكاء والحوكمة والشبكة نفسها.',
    en: 'Not a service list but an institutional structure: each unit is its own destination, all drawing on the same intelligence, governance, and network.',
  } as Bi,
};

export const proofSection = {
  kicker: { ar: 'الإثبات', en: 'Proof' } as Bi,
  title: { ar: 'لاعبونا — الإثبات الحيّ للنظام.', en: 'Our athletes — the living proof of the system.' } as Bi,
  lead: {
    ar: 'من الاكتشاف إلى التمثيل إلى القيمة السوقية. قصة همّام الحمّامي تُظهر النموذج وهو يعمل.',
    en: 'From discovery to representation to market value. The Hammam Al-Hammami story shows the model at work.',
  } as Bi,
  featured: {
    name: { ar: 'همّام الحمّامي', en: 'Hammam Al-Hammami' } as Bi,
    role: { ar: 'وسط ميدان · القضية المميَّزة', en: 'Midfielder · The featured case' } as Bi,
    href: '/athletes/hammam-al-hammami',
    stats: [
      { value: 92, suffix: '', label: { ar: 'مؤشّر الأداء', en: 'Performance index' } as Bi },
      { value: 3.4, decimals: 1, prefix: '', suffix: '×', label: { ar: 'نمو القيمة', en: 'Value growth' } as Bi },
      { value: 18, label: { ar: 'مساهمات تهديفية', en: 'Goal contributions' } as Bi },
    ],
  },
  cta: { ar: 'استعرض القائمة الكاملة', en: 'View the full roster' } as Bi,
};

export const networkStrip = {
  kicker: { ar: 'الشبكة', en: 'The Network' } as Bi,
  title: { ar: 'مدعومون بالمؤسسات التي تبني الرياضة السعودية.', en: 'Backed by the institutions building Saudi sport.' } as Bi,
  partners: [
    { name: 'Ministry of Sport', logo: '/network/GOVERNMENT/Ministry of Sport.png' },
    { name: 'SAFF', logo: '/network/GOVERNMENT/saff.png' },
    { name: 'Derayah', logo: '/network/INSTITUTIONS/Derayah.png' },
    { name: 'Sajaya', logo: '/network/INSTITUTIONS/Sajaya.png' },
    { name: 'Sukuk', logo: '/network/INSTITUTIONS/Sukuk.png' },
    { name: 'ScoutingStats', logo: '/network/SOLUTIONS/ScoutingStats.png' },
    { name: 'Catapult', logo: '/network/SOLUTIONS/Catapult.png' },
    { name: 'Hudl', logo: '/network/SOLUTIONS/Hudl.png' },
    { name: 'FITBIT', logo: '/network/SOLUTIONS/FITBIT.png' },
  ],
};

export const insightsTeaser = {
  kicker: { ar: 'رؤى وأخبار', en: 'Insights & News' } as Bi,
  title: { ar: 'الصوت المؤسسي.', en: 'The institutional voice.' } as Bi,
  cta: { ar: 'كل الرؤى', en: 'All insights' } as Bi,
};

export const ctaBand = {
  kicker: { ar: 'ابدأ من هنا', en: 'Start here' } as Bi,
  title: { ar: 'جمهور واحد. مسار واحد. إجراء واحد.', en: 'One audience. One path. One action.' } as Bi,
  lead: {
    ar: 'لكل زائرٍ طريقُه خلال نقرة واحدة من الصفحة الرئيسية.',
    en: 'Every visitor finds their path within one click of the homepage.',
  } as Bi,
};
