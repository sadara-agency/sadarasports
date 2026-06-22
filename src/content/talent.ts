import type { DivisionData } from '@/components/sections/DivisionOverview';
import type { ModuleData } from '@/components/sections/ModuleDetail';

export const talentDivision: DivisionData = {
  no: '01',
  slug: '/talent',
  kicker: { ar: 'الوحدة 01 · إدارة المواهب', en: 'Unit 01 · Talent Management' },
  title: { ar: 'نُمثّل ونطوّر اللاعبين كأصول طويلة الأمد.', en: 'We represent and develop athletes as long-term assets.' },
  lead: {
    ar: 'لا نتعامل مع اللاعب كرقم، بل كمشروع متكامل — من الاكتشاف إلى التمثيل إلى القيمة السوقية المستدامة، عبر منصة Elite 360 ونظام الفئات والمسارات الأربعة.',
    en: 'The athlete is not a number but an integrated project — from discovery to representation to sustainable market value, through the Elite 360 platform, the tier system, and four development tracks.',
  },
  proposition: {
    title: { ar: 'القيمة، لا الحجم.', en: 'Value, not volume.' },
    body: {
      ar: 'نختار قائمةً منتقاة من المواهب ونمنح كلاً منها عمق المؤسسة كاملاً: ذكاء أداء، وتطوير، وعلامة تجارية وتجاري، وحوكمة وحماية. عدد أقل من العملاء، التزام أعمق، قيمة أعلى.',
      en: 'We represent a curated roster and give each the full depth of the institution: performance intelligence, development, brand & commercial, governance & safeguarding. Fewer clients, deeper commitment, higher value.',
    },
  },
  modulesHeader: {
    kicker: { ar: 'كيف نعمل', en: 'How we work' },
    title: { ar: 'منصة، ونظام فئات، وأربعة مسارات.', en: 'A platform, a tier system, and four tracks.' },
    lead: {
      ar: 'كل لاعب يدخل نظاماً واضحاً للتطوير والتمثيل — لا خدمات متفرقة، بل نموذج تشغيل متكامل.',
      en: 'Every athlete enters a clear system of development and representation — not scattered services but an integrated operating model.',
    },
  },
  stats: [
    { value: 42, label: { ar: 'استدعاءات للمنتخبات منذ 2023', en: 'National-team call-ups since 2023' } },
    { value: 4, label: { ar: 'مسارات تطوير متزامنة', en: 'Synchronized development tracks' } },
    { value: 3.4, decimals: 1, suffix: '×', label: { ar: 'متوسّط نمو القيمة السوقية', en: 'Avg. market-value growth' } },
    { value: 18, label: { ar: 'لاعباً في القائمة المنتقاة', en: 'Athletes on the curated roster' } },
  ],
  modules: [
    { no: '01', title: { ar: 'Elite 360 — المنصة', en: 'Elite 360 — the platform' }, desc: { ar: 'نظام التطوير والمسارات الأربعة الذي يحوّل البيانات إلى قرارات.', en: 'The development system and four tracks that turn data into decisions.' }, href: '/talent/elite-360' },
    { no: '03', title: { ar: 'الخدمات', en: 'Services' }, desc: { ar: 'تمثيل، وأداء وتطوير، وعلامة تجارية وتجاري، وانتقال مهني.', en: 'Representation; performance & development; brand & commercial; career transition.' }, href: '/talent/services' },
    { no: '04', title: { ar: 'للاعبين والعائلات', en: 'For athletes & families' }, desc: { ar: 'كيف يعمل التمثيل، وكيف تبدأ رحلتك مع صدارة.', en: 'How representation works, and how to begin your journey with Sadara.' }, href: '/talent/join' },
  ],
  cta: {
    title: { ar: 'كُن ممثَّلاً من صدارة.', en: 'Be represented by Sadara.' },
    lead: { ar: 'ابدأ محادثةً سريّةً حول تمثيلك وتطويرك.', en: 'Start a confidential conversation about your representation and development.' },
    primary: { label: { ar: 'قدّم طلب تمثيل', en: 'Enquire about representation' }, href: '/talent/join' },
    secondary: { label: { ar: 'استعرض لاعبينا', en: 'See our athletes' }, href: '/athletes' },
  },
};

export const elite360: ModuleData = {
  kicker: { ar: 'إدارة المواهب · Elite 360', en: 'Talent Management · Elite 360' },
  title: { ar: 'Elite 360 — نظام تطوير اللاعب بالكامل.', en: 'Elite 360 — the whole-athlete development system.' },
  lead: {
    ar: 'منصّة تجمع الأداء والطبّ والعقل والتجاري في عرضٍ واحد للاعب — فيُتَّخذ كل قرار على أساس الصورة الكاملة، لا جزء منها.',
    en: 'A platform that unifies performance, medical, mental, and commercial into a single view of the athlete — so every decision is made on the whole picture, not a fragment.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'إدارة المواهب', en: 'Talent' }, href: '/talent' },
    { label: { ar: 'Elite 360', en: 'Elite 360' } },
  ],
  overview: {
    kicker: { ar: 'المسارات الأربعة', en: 'The four tracks' },
    title: { ar: 'أداء · طبّ · عقل · تجاري.', en: 'Performance · Medical · Mental · Commercial.' },
    body: {
      ar: 'يُدار كل لاعب عبر أربعة مسارات متزامنة، تشترك في عمودٍ فقريٍّ واحد من البيانات والحوكمة. لا تعمل المسارات في عزلة، بل تغذّي بعضها بعضاً لتصنع مساراً واحداً نحو القيمة.',
      en: 'Each athlete is managed across four synchronized tracks that share one spine of data and governance. The tracks do not work in isolation — they feed one another into a single path toward value.',
    },
    bullets: [
      { ar: 'الأداء: بيانات المباريات، التحميل، والتطوّر الفنّي.', en: 'Performance: match data, load, and technical development.' },
      { ar: 'الطبّ: الوقاية، التأهيل، وإدارة الإصابات.', en: 'Medical: prevention, rehab, and injury management.' },
      { ar: 'العقل: الجاهزية الذهنية والرفاهية.', en: 'Mental: psychological readiness and wellbeing.' },
      { ar: 'التجاري: العلامة، الرعاية، والقيمة السوقية.', en: 'Commercial: brand, sponsorship, and market value.' },
    ],
    tone: 'electric',
  },
  detail: {
    kicker: { ar: 'من البيانات إلى القرار', en: 'From data to decision' },
    title: { ar: 'ذكاءٌ يقود التطوير، لا يصفه فقط.', en: 'Intelligence that drives development, not just describes it.' },
    body: {
      ar: 'تتحوّل البيانات إلى توصياتٍ عملية: متى يُحمَّل اللاعب ومتى يُراح، أيّ خطوةٍ تجارية في أيّ مرحلة، وأيّ نادٍ يناسب مرحلة التطوّر. القرار مدعومٌ بالأرقام، لكنه يبقى قراراً بشريّاً.',
      en: 'Data becomes actionable recommendations: when to load and when to rest, which commercial move at which stage, which club fits the development phase. The decision is informed by numbers but remains a human one.',
    },
  },
  cta: {
    title: { ar: 'طوّر كأصلٍ طويل الأمد.', en: 'Develop as a long-term asset.' },
    lead: { ar: 'تعرّف على كيفية دخول لاعبك إلى نظام Elite 360.', en: 'Learn how your athlete enters the Elite 360 system.' },
    primary: { label: { ar: 'تحدّث إلينا', en: 'Talk to us' }, href: '/talent/join' },
    secondary: { label: { ar: 'الخدمات', en: 'Services' }, href: '/talent/services' },
  },
};

export const tiers: ModuleData = {
  kicker: { ar: 'إدارة المواهب · الفئات', en: 'Talent Management · Tiers' },
  title: { ar: 'نظام الفئات — تمثيلٌ متدرّج حسب المرحلة.', en: 'The tier system — representation tiered by stage.' },
  lead: {
    ar: 'A+ / A / B+ / B وحزمة A+ Elite. كل فئة تحدّد عمق الخدمة والاستثمار المناسبين لمرحلة اللاعب — بشفافيةٍ كاملة.',
    en: 'A+ / A / B+ / B and the A+ Elite bundle. Each tier defines the depth of service and investment right for the athlete’s stage — with full transparency.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'إدارة المواهب', en: 'Talent' }, href: '/talent' },
    { label: { ar: 'الفئات', en: 'Tiers' } },
  ],
  overview: {
    kicker: { ar: 'المبدأ', en: 'The principle' },
    title: { ar: 'الخدمة تناسب المرحلة.', en: 'The service fits the stage.' },
    body: {
      ar: 'لا نقدّم نموذجاً واحداً للجميع. الموهبة الصاعدة تحتاج تطويراً وحماية؛ النجم المكتمل يحتاج إدارة قيمةٍ وحضور. الفئات تجعل ذلك صريحاً.',
      en: 'We don’t offer one model for everyone. A rising talent needs development and protection; an established star needs value management and presence. The tiers make that explicit.',
    },
  },
  features: {
    header: {
      kicker: { ar: 'الفئات', en: 'The tiers' },
      title: { ar: 'أربع فئات وحزمة النخبة.', en: 'Four tiers and the elite bundle.' },
    },
    items: [
      { no: 'A+', title: { ar: 'A+ Elite', en: 'A+ Elite' }, desc: { ar: 'الحزمة الكاملة — تمثيل وأداء وتجاري وحضور إعلامي بأعلى أولوية.', en: 'The full bundle — representation, performance, commercial, and media presence at top priority.' } },
      { no: 'A', title: { ar: 'الفئة A', en: 'Tier A' }, desc: { ar: 'تمثيلٌ كامل مع دعم أداءٍ وتجاريٍّ موسّع.', en: 'Full representation with extended performance and commercial support.' } },
      { no: 'B+', title: { ar: 'الفئة B+', en: 'Tier B+' }, desc: { ar: 'تمثيلٌ مع مسار تطويرٍ مُركّز للموهبة الصاعدة.', en: 'Representation with a focused development track for rising talent.' } },
      { no: 'B', title: { ar: 'الفئة B', en: 'Tier B' }, desc: { ar: 'نقطة الدخول — اكتشاف وتطوير وحماية مبكّرة.', en: 'The entry point — discovery, development, and early safeguarding.' } },
    ],
  },
  cta: {
    title: { ar: 'أيّ فئةٍ تناسب مرحلتك؟', en: 'Which tier fits your stage?' },
    primary: { label: { ar: 'تحدّث إلى فريق التمثيل', en: 'Speak to the representation team' }, href: '/talent/join' },
  },
};

export const talentServices: ModuleData = {
  kicker: { ar: 'إدارة المواهب · الخدمات', en: 'Talent Management · Services' },
  title: { ar: 'الخدمات — أربع ركائز لقيمة اللاعب.', en: 'Services — four pillars of athlete value.' },
  lead: {
    ar: 'تمثيل، وأداء وتطوير، وعلامة تجارية وتجاري، وانتقال مهني. ركائز تعمل معاً عبر منصة Elite 360.',
    en: 'Representation; performance & development; brand & commercial; career transition. Pillars that work together across the Elite 360 platform.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'إدارة المواهب', en: 'Talent' }, href: '/talent' },
    { label: { ar: 'الخدمات', en: 'Services' } },
  ],
  overview: {
    kicker: { ar: 'الركائز', en: 'The pillars' },
    title: { ar: 'تمثيلٌ يتجاوز التعاقد.', en: 'Representation beyond the contract.' },
    body: {
      ar: 'العقد نقطة البداية لا النهاية. نُدير الأداء والصحة والصورة والمسار المهني بعد التوقيع، حتى ما بعد الاعتزال.',
      en: 'The contract is the beginning, not the end. We manage performance, health, image, and career path after signing — through to life after the game.',
    },
  },
  features: {
    header: {
      kicker: { ar: 'أربع ركائز', en: 'Four pillars' },
      title: { ar: 'ما نديره نيابةً عن اللاعب.', en: 'What we manage on the athlete’s behalf.' },
    },
    items: [
      { title: { ar: 'التمثيل', en: 'Representation' }, desc: { ar: 'التفاوض، العقود، والانتقالات — بحوكمةٍ وجدارٍ ضدّ تضارب المصالح.', en: 'Negotiation, contracts, and transfers — with governance and conflict walls.' } },
      { title: { ar: 'الأداء والتطوير', en: 'Performance & development' }, desc: { ar: 'بيانات، تأهيل، وخطّة تطويرٍ فرديّة عبر Elite 360.', en: 'Data, rehab, and an individual development plan via Elite 360.' } },
      { title: { ar: 'العلامة والتجاري', en: 'Brand & commercial' }, desc: { ar: 'الرعاية، الصورة، والشراكات التجارية المناسبة للمرحلة.', en: 'Sponsorship, image, and stage-appropriate commercial partnerships.' } },
      { title: { ar: 'الانتقال المهني', en: 'Career transition' }, desc: { ar: 'التخطيط لما بعد اللعب — تعليم، أعمال، وأدوار قياديّة.', en: 'Planning for life after playing — education, business, and leadership roles.' } },
    ],
  },
  cta: {
    title: { ar: 'قيمةٌ تُدار، لا تُترك للصدفة.', en: 'Value managed, not left to chance.' },
    primary: { label: { ar: 'ابدأ المحادثة', en: 'Start the conversation' }, href: '/talent/join' },
  },
};

export const talentJoin: ModuleData = {
  kicker: { ar: 'إدارة المواهب · انضمّ', en: 'Talent Management · Join' },
  title: { ar: 'للاعبين والعائلات — كيف يعمل التمثيل.', en: 'For athletes & families — how representation works.' },
  lead: {
    ar: 'خطواتٌ واضحة، محادثةٌ سريّة، والتزامٌ بحماية القاصرين. هكذا تبدأ رحلتك مع صدارة.',
    en: 'A clear process, a confidential conversation, and a commitment to minor safeguarding. This is how your journey with Sadara begins.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'إدارة المواهب', en: 'Talent' }, href: '/talent' },
    { label: { ar: 'انضمّ', en: 'Join' } },
  ],
  overview: {
    kicker: { ar: 'العملية', en: 'The process' },
    title: { ar: 'من أول محادثةٍ إلى التمثيل.', en: 'From first conversation to representation.' },
    body: {
      ar: 'نبدأ بفهم اللاعب وعائلته وأهدافه. نقيّم الملاءمة بصدق، ونوضّح الفئة والخدمات والتوقعات قبل أيّ التزام. الشفافية شرطٌ لا خيار.',
      en: 'We start by understanding the athlete, the family, and the goals. We assess fit honestly and clarify the tier, services, and expectations before any commitment. Transparency is a condition, not an option.',
    },
    bullets: [
      { ar: 'محادثة استكشافية سريّة.', en: 'A confidential exploratory conversation.' },
      { ar: 'تقييم ملاءمةٍ صريح وتحديد الفئة.', en: 'An honest fit assessment and tier placement.' },
      { ar: 'حماية القاصرين والامتثال لـ FIFA وSAFF.', en: 'Minor safeguarding and FIFA/SAFF compliance.' },
      { ar: 'خطّة تطويرٍ وتمثيلٍ موثّقة.', en: 'A documented development and representation plan.' },
    ],
    tone: 'electric',
  },
  cta: {
    title: { ar: 'ابدأ رحلة الصدارة.', en: 'Begin the journey to Sadara.' },
    lead: { ar: 'املأ نموذج التواصل وسيعود إليك فريق التمثيل.', en: 'Complete the contact form and the representation team will respond.' },
    primary: { label: { ar: 'تواصل معنا', en: 'Contact us' }, href: '/contact' },
  },
};
