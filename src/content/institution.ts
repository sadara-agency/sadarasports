import type { Bi } from '@/lib/i18n';
import type { ModuleData } from '@/components/sections/ModuleDetail';

export const institutionHub = {
  kicker: { ar: 'المؤسسة', en: 'The Institution' } as Bi,
  title: { ar: 'مؤسسة، لا وكالة.', en: 'An institution, not an agency.' } as Bi,
  lead: {
    ar: 'من نحن، والنموذج الذي نعمل به، والأشخاص خلفه، والحوكمة التي تحميه، والأثر الذي نصنعه — كلٌّ في مكانه.',
    en: 'Who we are, the model we operate, the people behind it, the governance that protects it, and the impact we make — each in its place.',
  } as Bi,
  sections: [
    { title: { ar: 'من نحن', en: 'Who We Are' }, desc: { ar: 'الأطروحة، القيمة لا الحجم، وقصة التأسيس.', en: 'The thesis, value not volume, and the founding story.' }, href: '/institution/about' },
    { title: { ar: 'نموذج صدارة', en: 'The Sadara Model' }, desc: { ar: 'مؤسسة واحدة، ثلاث وحدات، عمود فقري مشترك.', en: 'One institution, three units, a shared spine.' }, href: '/institution/model' },
    { title: { ar: 'القيادة', en: 'Leadership' }, desc: { ar: 'الفريق التنفيذي الذي يقود المؤسسة.', en: 'The executive team that leads the institution.' }, href: '/institution/leadership' },
    { title: { ar: 'الخبراء والفريق الفني', en: 'Experts & Technical Team' }, desc: { ar: 'منصّة التخصّص خلف التنفيذ.', en: 'The specialist bench behind delivery.' }, href: '/institution/experts' },
    { title: { ar: 'الحوكمة والحماية', en: 'Governance & Safeguarding' }, desc: { ar: 'حوكمة بمعايير اللجان، وحماية القاصرين، والامتثال.', en: 'Committee-grade governance, minor safeguarding, and compliance.' }, href: '/institution/governance' },
    { title: { ar: 'الرؤية والأثر', en: 'Vision & Impact' }, desc: { ar: 'متوائمة مع رؤية 2030 وكأس العالم 2034.', en: 'Aligned to Vision 2030 and the 2034 World Cup.' }, href: '/institution/impact' },
  ],
};

export const about: ModuleData = {
  kicker: { ar: 'المؤسسة · من نحن', en: 'Institution · Who We Are' },
  title: { ar: 'القيمة، لا الحجم.', en: 'Value, not volume.' },
  lead: {
    ar: 'بدأنا بقناعةٍ واحدة: الرياضة السعودية تستحق مؤسسةً تُديرها كأصلٍ استراتيجي، لا وكالةً تبيع خدمات. هذه أطروحتنا، وهذا ما نبنيه.',
    en: 'We began with one conviction: Saudi sport deserves an institution that manages it as a strategic asset, not an agency that sells services. This is our thesis, and this is what we build.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'المؤسسة', en: 'Institution' }, href: '/institution' },
    { label: { ar: 'من نحن', en: 'Who We Are' } },
  ],
  overview: {
    kicker: { ar: 'الأطروحة', en: 'The thesis' },
    title: { ar: 'نكتشف، ونطوّر، ونضخّم.', en: 'We identify, develop, and amplify.' },
    body: [
      {
        ar: 'القيمة الحقيقية لا تأتي من عدد العملاء، بل من عمق الالتزام لكلٍّ منهم. لذلك اخترنا التركيز: كرة قدم، ثلاث وحدات، سوقٌ واحدٌ يتعمّق نحو الخارج.',
        en: 'Real value comes not from the number of clients but from the depth of commitment to each. So we chose focus: football, three units, one market deepening outward.',
      },
      {
        ar: 'نعمل كمؤسسةٍ كاملة خلف كل قرار — تمثيل، استشارة، وسوق — على عمودٍ فقريٍّ واحدٍ من الذكاء والحوكمة.',
        en: 'We work as a whole institution behind every decision — representation, advisory, and markets — on one spine of intelligence and governance.',
      },
    ],
    tone: 'electric',
  },
  detail: {
    kicker: { ar: 'قصة التأسيس', en: 'The founding story' },
    title: { ar: 'من فكرةٍ إلى مؤسسة.', en: 'From an idea to an institution.' },
    body: {
      ar: 'وُلدت صدارة من ملاحظةٍ بسيطة: المواهب تُدار بشكلٍ مُجزّأ، والقرارات تُتَّخذ بلا ذكاءٍ كافٍ، والقيمة تُترك للصدفة. قرّرنا بناء البديل المؤسسي.',
      en: 'Sadara was born from a simple observation: talent is managed in fragments, decisions are made without enough intelligence, and value is left to chance. We decided to build the institutional alternative.',
    },
  },
  cta: {
    title: { ar: 'تعرّف على النموذج.', en: 'Understand the model.' },
    primary: { label: { ar: 'نموذج صدارة', en: 'The Sadara Model' }, href: '/institution/model' },
    secondary: { label: { ar: 'تواصل معنا', en: 'Contact us' }, href: '/contact' },
  },
};

export const model: ModuleData = {
  kicker: { ar: 'المؤسسة · النموذج', en: 'Institution · The Model' },
  title: { ar: 'مؤسسة واحدة، ثلاث وحدات، عمود فقري مشترك.', en: 'One institution, three units, a shared spine.' },
  lead: {
    ar: 'النموذج التشغيلي الذي يجعل المجموع أكبر من أجزائه: كل وحدةٍ مستقلّة في السوق، لكنها تستند إلى الذكاء والحوكمة والشبكة نفسها.',
    en: 'The operating model that makes the whole greater than its parts: each unit is independent in the market, yet draws on the same intelligence, governance, and network.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'المؤسسة', en: 'Institution' }, href: '/institution' },
    { label: { ar: 'النموذج', en: 'The Model' } },
  ],
  overview: {
    kicker: { ar: 'العمود الفقري', en: 'The spine' },
    title: { ar: 'ذكاءٌ وحوكمةٌ وشبكةٌ مشتركة.', en: 'Shared intelligence, governance, and network.' },
    body: {
      ar: 'الوحدات الثلاث — المواهب، الاستشارات، الأسواق — لا تتنافس على الموارد، بل تتشارك العمود الفقري: قاعدة ذكاءٍ واحدة، إطار حوكمةٍ واحد، وشبكة علاقاتٍ واحدة.',
      en: 'The three units — Talent, Advisory, Markets — don’t compete for resources; they share the spine: one intelligence base, one governance framework, one relationship network.',
    },
    tone: 'electric',
  },
  detail: {
    kicker: { ar: 'لماذا يعمل', en: 'Why it works' },
    title: { ar: 'كل وحدةٍ تُقوّي الأخرى.', en: 'Each unit strengthens the others.' },
    body: {
      ar: 'ذكاء الأندية يخدم تمثيل اللاعبين؛ شبكة الأسواق تفتح فرص الاستشارات؛ تطوير المواهب يغذّي مكتب الصفقات. تكاملٌ يصنع ميزةً يصعب تقليدها.',
      en: 'Club intelligence serves athlete representation; the markets network opens advisory opportunities; talent development feeds the deal desk. An integration that creates an advantage hard to copy.',
    },
  },
  cta: {
    title: { ar: 'مؤسسةٌ مصمّمة لتُظهر ذلك.', en: 'An institution architected to show it.' },
    primary: { label: { ar: 'ما نقدمه', en: 'What we do' }, href: '/what-we-do' },
  },
};

// Leadership + experts
export type Person = { name: Bi; role: Bi; bio: Bi; photo?: string };

export const leadership = {
  kicker: { ar: 'المؤسسة · القيادة', en: 'Institution · Leadership' } as Bi,
  title: { ar: 'الفريق الذي يقود المؤسسة.', en: 'The team that leads the institution.' } as Bi,
  lead: {
    ar: 'قيادةٌ تجمع خبرة الرياضة بانضباط المؤسسة — أشخاصٌ يضعون القيمة طويلة الأمد قبل المكسب السريع.',
    en: 'Leadership combining sporting experience with institutional discipline — people who put long-term value before quick gain.',
  } as Bi,
  people: [
    { name: { ar: 'خالد الشهري', en: 'Khalid AlShehri' }, role: { ar: 'الرئيس التنفيذي · القيادة والرؤية', en: 'Chief Executive Officer · Leadership & Vision' }, bio: { ar: 'يقود الرؤية الاستراتيجية والتحوّل من وكالة إلى مؤسسة.', en: 'Leads the strategic vision and the pivot from agency to institution.' }, photo: '/brand/team/khalid-alshehri.jpg' },
    { name: { ar: 'يوسف بن طالب', en: 'Yousof bin Taleb' }, role: { ar: 'الرئيس التنفيذي للعمليات · الأداء والتطوير', en: 'Chief Operating Officer · Performance & Development' }, bio: { ar: 'يشرف على منصة Elite 360 ونظام تطوير اللاعبين.', en: 'Oversees the Elite 360 platform and the athlete development system.' }, photo: '/brand/team/Yousof bin Taleb.png' },
    { name: { ar: 'علي البكري', en: 'Ali AlBakri' }, role: { ar: 'الاستراتيجية وتطوير الأعمال · النمو والشراكات', en: 'Strategy & Business Development · Growth & Partnerships' }, bio: { ar: 'يبني الممرات والشراكات التي تُحوّل الشبكة إلى قيمة.', en: 'Builds the corridors and partnerships that turn network into value.' }, photo: '/brand/team/Ali AlBakri.png' },
  ] as Person[],
};

export const experts = {
  kicker: { ar: 'المؤسسة · الخبراء', en: 'Institution · Experts' } as Bi,
  title: { ar: 'منصّة التخصّص خلف التنفيذ.', en: 'The specialist bench behind delivery.' } as Bi,
  lead: {
    ar: 'تحليلٌ، وطبٌّ رياضي، وقانون، وتجاري، وعلم نفس — فريقٌ فنيٌّ يحوّل الاستراتيجية إلى نتائج.',
    en: 'Analysis, sports medicine, law, commercial, and psychology — a technical team that turns strategy into results.',
  } as Bi,
  people: [
    { name: { ar: 'عبدالله البكري', en: 'Abdullah AlBakri' }, role: { ar: 'خبير القوة والتكييف', en: 'S&C Expert' }, bio: { ar: 'يدير برامج القوة والتكييف البدني للاعبين.', en: 'Manages strength and conditioning programs for athletes.' }, photo: '/brand/team/members/Abdullah AlBakri - S&C EXPERT.png' },
    { name: { ar: 'خالد القروني', en: 'Khalid AlKoroni' }, role: { ar: 'مستشار', en: 'Advisor' }, bio: { ar: 'يقدّم الخبرة الاستشارية الاستراتيجية للمؤسسة.', en: 'Provides strategic advisory expertise to the institution.' }, photo: '/brand/team/members/Khalid AlKoroni - ADVISOR.png' },
    { name: { ar: 'صالح تايش', en: 'Saleh Tayech' }, role: { ar: 'التحليل التكتيكي', en: 'Tactical Analysis' }, bio: { ar: 'يحوّل بيانات المباريات إلى قراراتٍ تكتيكية.', en: 'Turns match data into tactical decisions.' }, photo: '/brand/team/members/Saleh Tayech - TACTICAL ANALYSIS.jfif' },
    { name: { ar: 'خليفة فردي', en: 'Khalifah Ferdi' }, role: { ar: 'المدرب الفني', en: 'Technical Coach' }, bio: { ar: 'يطوّر الجانب الفني والمهاري للاعبين.', en: 'Develops the technical and skill aspects of athletes.' }, photo: '/brand/team/members/Khalifah Ferdi - TECHNICAL COACH.png' },
    { name: { ar: 'محمد م.', en: 'Mohammed M.' }, role: { ar: 'مدرب اللياقة البدنية', en: 'Physical Coach' }, bio: { ar: 'يشرف على الإعداد البدني وإدارة الأحمال التدريبية.', en: 'Oversees physical preparation and training load management.' }, photo: '/brand/team/members/Mohammed M. PHYSICAL COACH.png' },
    { name: { ar: 'أحمد أ.', en: 'Ahmed A.' }, role: { ar: 'تحليل المباريات', en: 'Match Analysis' }, bio: { ar: 'يحلّل أداء المباريات ويُعدّ تقارير الاستخبارات التنافسية.', en: 'Analyses match performance and prepares competitive intelligence reports.' }, photo: '/brand/team/members/Ahmed A. -MATCH ANALYSIS.jfif' },
  ] as Person[],
};

export const governance: ModuleData = {
  kicker: { ar: 'المؤسسة · الحوكمة', en: 'Institution · Governance' },
  title: { ar: 'الحوكمة والحماية.', en: 'Governance & safeguarding.' },
  lead: {
    ar: 'حوكمةٌ بمعايير اللجان، وجدرانٌ ضدّ تضارب المصالح، وامتثالٌ لـ FIFA وSAFF، وحمايةٌ للقاصرين، وحماية بيانات وفق نظام PDPL.',
    en: 'Committee-grade governance, conflict-of-interest walls, FIFA/SAFF compliance, minor safeguarding, and PDPL-compliant data protection.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'المؤسسة', en: 'Institution' }, href: '/institution' },
    { label: { ar: 'الحوكمة', en: 'Governance' } },
  ],
  overview: {
    kicker: { ar: 'المبدأ', en: 'The principle' },
    title: { ar: 'الثقة تُبنى بالانضباط.', en: 'Trust is built through discipline.' },
    body: {
      ar: 'حين تُمثّل لاعبين وتستشير أندية وتربط أسواقاً في آنٍ واحد، تصبح الحوكمة شرطاً لا رفاهية. جدرانٌ واضحة تفصل المصالح، وامتثالٌ موثّقٌ في كل خطوة.',
      en: 'When you represent athletes, advise clubs, and connect markets at once, governance becomes a condition, not a luxury. Clear walls separate interests, and compliance is documented at every step.',
    },
    bullets: [
      { ar: 'جدرانٌ ضدّ تضارب المصالح بين الوحدات.', en: 'Conflict-of-interest walls between units.' },
      { ar: 'امتثالٌ كاملٌ لـ FIFA وSAFF.', en: 'Full FIFA and SAFF compliance.' },
      { ar: 'حماية القاصرين كأولويّةٍ غير قابلة للتفاوض.', en: 'Minor safeguarding as a non-negotiable priority.' },
      { ar: 'حماية البيانات وفق نظام PDPL السعودي.', en: 'Data protection under Saudi PDPL.' },
    ],
    tone: 'electric',
  },
  cta: {
    title: { ar: 'مؤسسةٌ يُمكن الوثوق بها.', en: 'An institution you can trust.' },
    primary: { label: { ar: 'تواصل معنا', en: 'Contact us' }, href: '/contact' },
  },
};

// Legal credentials & licenses — registration numbers that anchor our legal standing.
// Surfaced on the Governance page and in the footer. Values stay LTR even in Arabic.
export const credentials: { label: Bi; value: string }[] = [
  { label: { ar: 'الرقم الموحّد', en: 'Unified Number' }, value: '7052143646' },
  { label: { ar: 'رخصة وكيل FIFA', en: 'FIFA Agent License No.' }, value: '202411-8478' },
];

export const impact: ModuleData = {
  kicker: { ar: 'المؤسسة · الرؤية والأثر', en: 'Institution · Vision & Impact' },
  title: { ar: 'تطوير الموهبة السعودية.', en: 'Developing Saudi talent.' },
  lead: {
    ar: 'أثرٌ متوائمٌ مع رؤية 2030 واستضافة كأس العالم 2034 — نبني القدرات المحليّة ونرفع قيمة الرياضة السعودية على الخارطة العالمية.',
    en: 'Impact aligned to Vision 2030 and hosting the 2034 World Cup — building local capability and raising the value of Saudi sport on the global map.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'المؤسسة', en: 'Institution' }, href: '/institution' },
    { label: { ar: 'الرؤية والأثر', en: 'Vision & Impact' } },
  ],
  overview: {
    kicker: { ar: 'رؤية 2030', en: 'Vision 2030' },
    title: { ar: 'الرياضة كقطاعٍ استراتيجي.', en: 'Sport as a strategic sector.' },
    body: {
      ar: 'نؤمن أن تطوير الموهبة المحليّة ليس مسؤوليّةً اجتماعيّةً فحسب، بل استثمارٌ في قطاعٍ استراتيجي. كل لاعبٍ نطوّره، وكل ناٍد نستشيره، يرفع القيمة الإجماليّة للرياضة السعودية.',
      en: 'We believe developing local talent is not only social responsibility but investment in a strategic sector. Every athlete we develop and every club we advise raises the total value of Saudi sport.',
    },
    tone: 'electric',
  },
  detail: {
    kicker: { ar: '2034', en: '2034' },
    title: { ar: 'جاهزون للحظة العالمية.', en: 'Ready for the global moment.' },
    body: {
      ar: 'استضافة كأس العالم 2034 لحظةٌ مفصليّة. نبني اليوم القدرات والشبكة والذكاء التي ستجعل الرياضة السعودية جاهزةً لتلك اللحظة وما بعدها.',
      en: 'Hosting the 2034 World Cup is a pivotal moment. We are building today the capability, network, and intelligence that will make Saudi sport ready for that moment and beyond.',
    },
  },
  cta: {
    title: { ar: 'كُن جزءاً من المشروع.', en: 'Be part of the project.' },
    primary: { label: { ar: 'اشترك معنا', en: 'Partner with us' }, href: '/markets/connect' },
    secondary: { label: { ar: 'الوظائف', en: 'Careers' }, href: '/careers' },
  },
};
