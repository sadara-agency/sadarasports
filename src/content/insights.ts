import type { Bi } from '@/lib/i18n';

export type Article = {
  category: Bi;
  title: Bi;
  excerpt: Bi;
  body?: Bi;
  date: string;
  type: 'news' | 'article';
};

export const insightsMeta = {
  kicker: { ar: 'رؤى وأخبار', en: 'Insights & News' } as Bi,
  title: { ar: 'الصوت المؤسسي.', en: 'The institutional voice.' } as Bi,
  lead: {
    ar: 'وجهة نظرٍ في السوق، وأخبارٌ ومحطّات، ومحرّك مصداقيّة يعكس كيف نفكّر — لا فقط ما نفعل.',
    en: 'Market point of view, news and milestones, and a credibility engine that reflects how we think — not just what we do.',
  } as Bi,
};

export const articles: Article[] = [
  {
    category: { ar: 'رؤية السوق', en: 'Market POV' },
    title: { ar: 'لماذا 2034 يعيد تعريف اقتصاد كرة القدم في المنطقة', en: "Why 2034 redefines the region's football economy" },
    excerpt: { ar: 'استضافة كأس العالم ليست حدثاً، بل تحوّلٌ في بنية القيمة الرياضية المحليّة.', en: 'Hosting the World Cup is not an event but a shift in the structure of local sporting value.' },
    body: {
      ar: '',
      en: `<p>There are two ways to read 2034. The first treats it as a tournament — a thing to be staged, with stadiums, logistics, and a closing ceremony, after which life returns to its previous shape. The second treats it as a forcing function: a fixed date that re-rates every asset in the local game and changes, permanently, how value in the regional football economy is structured. The first reading plans an event. The second builds an institution. They are not the same project.</p>

<h2>01 — Event versus structure</h2>
<h3>What actually gets re-rated</h3>

<p>A World Cup hosted at home does not simply raise attention for a month. It pulls forward a decade of decisions and re-prices the assets underneath them.</p>

<ol>
  <li><strong>Domestic talent</strong> — Valuation, and the pathway that produces it, re-rated toward a home tournament.</li>
  <li><strong>Clubs</strong> — Read as institutions — governance, academy, infrastructure — not just results.</li>
  <li><strong>Commercial</strong> — Rights, sponsorship, hospitality, data — re-based to a ceiling that does not fall back.</li>
  <li><strong>Human capital</strong> — Coaches, executives, medics, analysts — the binding constraint capital cannot rush.</li>
</ol>

<h2>02 — The window problem</h2>
<h3>Value accrues before the spotlight</h3>

<p>The defining mistake of host economies is to build toward the date instead of before it. Value does not accrue during the tournament; it accrues to whoever built the institution that the tournament then validates. By the time the spotlight arrives, the re-rating is largely priced. The work that captures it — academies, governance, the executive and coaching base — has to be years old by then.</p>

<blockquote><p>2034 is not a finish line. It is a deadline for institution-building, and it is already running.</p></blockquote>

<h2>03 — The risks worth naming</h2>
<h3>Bubbles, dependency, governance lag</h3>

<p>A structural re-rating carries structural risks. Capital arriving faster than process creates bubble dynamics — assets priced on the date rather than on cash flows. Dependency on a single event is fragile: an economy organised entirely around 2034 has no answer for 2035. And governance tends to lag spending, which is precisely when the absence of conflict walls and decision discipline becomes most expensive. None of these are arguments against the opportunity. They are arguments for building the institution that can hold it.</p>

<h2>04 — What it asks of us</h2>
<h3>Build the durable thing</h3>

<p>For everyone operating in this market, 2034 reframes the question. It is no longer "how do we win the next window." It is "what will still be standing, and trusted, on the other side of the decade." That is a question about structure — units, mandates, governance, talent pathways, a record that compounds. The tournament will be staged regardless. The economy it leaves behind will belong to whoever treated the date as a reason to build, not a reason to spend.</p>

<p><em>Market POV. Forward-looking analysis of structural trends. It is not a forecast of any specific asset value or transaction.</em></p>`,
    },
    date: '2026',
    type: 'article',
  },
  {
    category: { ar: 'أخبار', en: 'News' },
    title: { ar: 'صدارة توسّع مكتب الصفقات نحو ممرات جديدة', en: 'Sadara expands the deal desk into new corridors' },
    excerpt: { ar: 'إضافة ممرّين جديدين تعزّز قدرة المكتب على توطين الأصول.', en: "Two new corridors strengthen the desk's ability to place assets." },
    body: {
      ar: '',
      en: `<p>Sadara Sports has expanded its Deal Desk with two new corridors — a Lusophone corridor connecting the Portuguese-speaking markets, and a Maghreb corridor across North Africa — strengthening the desk's ability to source, structure, and place assets between those markets and the Gulf.</p>

<p>A corridor, in the desk's language, is more than a list of contacts. It is a maintained route between two markets: the clubs and intermediaries that matter, the regulatory and registration realities of moving an asset along it, and a standing read on where value is mispriced in each direction. Opening a corridor means the desk can act on a transaction inside it with knowledge rather than from a cold start.</p>

<h2>01 — What the desk does</h2>
<h3>Placing assets, both directions</h3>

<p>The Deal Desk structures and places assets — players and the rights attached to them — between markets. That runs both ways: sourcing undervalued talent into the Gulf and placing Gulf-based assets where they are most fairly priced. The discipline is matching the right asset to the right market at the right moment, with the deal structured to hold up after it closes.</p>

<blockquote><p>A corridor is institutional memory of a market — so the desk never negotiates from a standing start.</p></blockquote>

<h2>02 — Why these two</h2>
<h3>Depth on one side, mobility on the other</h3>

<ul>
  <li><strong>Lusophone corridor</strong> — Access to one of football's deepest, most liquid talent pools, with established pathways into Europe and the Gulf.</li>
  <li><strong>Maghreb corridor</strong> — Regional depth and mobility close to home — strong development systems, natural proximity to the Saudi game.</li>
</ul>

<p>Both corridors operate under the firm's documented conflict walls, separating the Deal Desk's transaction activity from the Representation and Advisory units. The expansion takes the desk's active corridors to a wider footprint as it builds toward the heightened cross-border activity expected across the regional game in the seasons ahead.</p>

<p><em>News. Deal Desk activity is conducted under documented conflict walls separating it from Representation and Advisory. Corridor names are operational designations within Sadara.</em></p>`,
    },
    date: '2026',
    type: 'news',
  },
  {
    category: { ar: 'الصوت المؤسسي', en: 'Institutional voice' },
    title: { ar: 'من وكالة إلى مؤسسة: منطق التحوّل', en: 'From agency to institution: the logic of the pivot' },
    excerpt: { ar: 'لماذا اخترنا بناء مؤسسةٍ بثلاث وحدات بدل توسيع قائمة الخدمات.', en: 'Why we chose to build a three-unit institution instead of expanding a service list.' },
    body: {
      ar: '',
      en: `<p>There were two ways to grow. We could keep the agency and lengthen the list of things it does — add advisory, add a transactions arm, add a media capability — until the brochure was full. Or we could stop being an agency and build an institution: three units, each with its own mandate, its own discipline, and its own accountability, connected by governance rather than by overlap. We chose the harder one, and the choice was deliberate.</p>

<h2>01 — The service-list trap</h2>
<h3>Why adding more does not compound</h3>

<p>An agency that adds services scales horizontally. Everything still reports to the same relationships, runs on the same goodwill, and lives or dies on the same handful of people. Nothing compounds, because nothing is independent. The list gets longer; the institution does not get deeper. And the moment a key relationship leaves, a large part of the value walks out with it. A service list is a description of activity. It is not a structure.</p>

<h2>02 — Three units, by design</h2>
<h3>Representation, Advisory, Deal Desk</h3>

<ol>
  <li><strong>Representation</strong> — Manages athletes and coaches — careers, contracts, long-horizon planning — as a duty of one party to another.</li>
  <li><strong>Advisory</strong> — Serves clubs with strategy and decision intelligence, owing loyalty to the client and no one across the table.</li>
  <li><strong>Deal Desk</strong> — Structures and places assets across markets, with its own standards and its own record.</li>
</ol>

<p>Each unit has a mandate it does not blur and a P&amp;L it is answerable for. That independence is not bureaucracy. It is what makes the conflict walls between them real rather than rhetorical.</p>

<blockquote><p>An agency is a set of relationships. An institution is a set of disciplines that outlive any one of them.</p></blockquote>

<h2>03 — Why three, and why now</h2>
<h3>Building for a horizon, not a window</h3>

<p>People ask why not one strong unit. The answer is that the walls only work if the units are genuinely separate. A single body cannot advise a club, represent a player, and place the deal without the very conflicts we built the firm to avoid. Three real units make honesty structurally possible. One blended unit makes it a matter of personal restraint — which is no basis for an institution.</p>

<p>And the timing is not incidental. The Saudi game is being re-rated toward 2034. Re-ratings reward durability. A firm that is only a collection of relationships is fragile precisely when the market is most valuable. An institution — units, mandates, governance, a record that survives any single departure — is built to be standing, and trusted, on the far side of the decade. That is what the pivot was for.</p>

<p><em>Institutional Voice. This piece describes Sadara's operating model. Mandates within each unit are governed independently.</em></p>`,
    },
    date: '2026',
    type: 'article',
  },
  {
    category: { ar: 'أخبار', en: 'News' },
    title: { ar: 'همّام الحمّامي ينضمّ إلى فئة A+ Elite', en: 'Hammam Al-Hammami joins the A+ Elite tier' },
    excerpt: { ar: 'محطّةٌ بارزة في مسارٍ يُظهر نموذج Elite 360 وهو يعمل.', en: 'A milestone in a journey that shows the Elite 360 model at work.' },
    body: {
      ar: '',
      en: `<p>Sadara Sports has confirmed the promotion of Hammam Al-Hammami to the A+ Elite tier — the highest band in the firm's Elite 360 representation model, and a placement reserved for athletes whose trajectory and standing warrant the institution's full support.</p>

<p>The move is more than a label. A+ Elite changes what the firm commits to an athlete and how that commitment is governed: a dedicated team across performance, commercial, legal, and media, a multi-season plan reviewed on a fixed cadence, and a single point of accountability inside Representation. It is the tier where management stops being reactive and becomes a long-horizon project.</p>

<h2>01 — What Elite 360 is</h2>
<h3>A model, not a label</h3>

<p>Elite 360 is Sadara's tiered approach to representation. Athletes are supported against a clear development framework, with each tier defining the depth of resource, the planning horizon, and the standard of governance applied. Progression is earned and reviewed — not granted — which is what makes a promotion to A+ Elite a credible signal rather than a marketing line.</p>

<blockquote><p>The tier is the proof the model works — built around the athlete, reviewed against a plan.</p></blockquote>

<h2>02 — What changes from here</h2>
<h3>The institution behind the athlete</h3>

<p>At A+ Elite, the work shifts from managing the next decision to building the next several years: protecting performance windows, shaping a commercial profile that compounds, and ensuring every contract and partnership is consistent with a single long-term plan rather than negotiated in isolation. The objective is durability — value that holds across seasons, clubs, and the wider re-rating of the regional game toward 2034.</p>

<p>"This placement reflects a trajectory, and a standard we intend to keep raising," a Sadara spokesperson said. "Elite 360 exists so that an athlete reaching this tier is supported by an institution, not an individual. That is the difference we are committed to."</p>

<p><em>News. Tier placements within Elite 360 are reviewed by Sadara's Representation unit.</em></p>`,
    },
    date: '2026',
    type: 'news',
  },
  {
    category: { ar: 'رؤية السوق', en: 'Market POV' },
    title: { ar: 'الذكاء كميزةٍ تنافسيّة للأندية السعودية', en: 'Intelligence as a competitive edge for Saudi clubs' },
    excerpt: { ar: 'كيف يحوّل ذكاء القرار التوظيف من تخمينٍ إلى عمليّة.', en: 'How decision intelligence turns recruitment from a guess into a process.' },
    body: {
      ar: '',
      en: `<p>Most recruitment failures are not scouting failures. The player was seen, the talent was real, the highlight reel was accurate. What broke was the decision around the player — the question that was never defined, the disagreement that was never resolved, the cost of being wrong that was never priced. Talent identification is a crowded discipline. Decision-making is not.</p>

<p>Saudi clubs have, in a very short window, gained access to the one resource that used to separate Europe's elite from everyone else: capital. That changes the game, but not in the direction most people assume. Capital does not buy good decisions. It amplifies whatever decision process a club already has. A disciplined process compounds; a guess, repeated at scale, becomes an expensive habit.</p>

<h2>01 — The cost of the guess</h2>
<h3>The hidden line on the balance sheet</h3>

<p>The visible cost of a recruitment miss is the fee. The real cost is everything attached to it: the wages committed for three or four seasons, the squad slot occupied, the player who was not signed instead, the manager destabilised, and the resale value that evaporates the moment the fit is exposed. A club does not write down a bad signing once. It pays for it every month until the contract ends.</p>

<p>Treated as individual gambles, these losses look like bad luck. Viewed across a portfolio of decisions, they reveal something more useful: a pattern. The same role is mis-specified twice. The same bias toward a familiar agent recurs. The same optimism about adaptation goes unchallenged. Luck is not a pattern. Process is.</p>

<blockquote><p>The edge is not the model. It is the discipline of using one when the room would rather trust its instinct.</p></blockquote>

<h2>02 — What decision intelligence means</h2>
<h3>Three layers, not one dashboard</h3>

<p>Decision intelligence is often sold as data, and data is the least interesting part of it. A club drowning in metrics is no closer to a good decision than one with none. What matters is the chain that turns information into a defensible choice. We organise it in three layers.</p>

<ol>
  <li><strong>Signal</strong> — Data, video, physical and medical context, and what only a scout in the stadium can capture.</li>
  <li><strong>Judgment</strong> — Where analytics and the scouting eye reconcile — and disagreement is treated as information.</li>
  <li><strong>Decision</strong> — The governance of the choice: who decides, on what evidence, with what threshold to walk away.</li>
</ol>

<p>The third layer is the one clubs neglect, and the one that determines outcomes. A model and a scout who agree tell you little; the interesting cases are where they don't — and a club needs a rule for what happens then.</p>

<h2>03 — Why this matters more here</h2>
<h3>The 2034 window changes the math</h3>

<p>A market re-rating on the scale Saudi football is undergoing rewards institutions that build their decision machinery before the spotlight arrives, not during it. Between now and 2034, every club will spend. The ones that pull ahead will not be the ones who spent most. They will be the ones who knew, each time, why they were spending — and could prove it to a board, a sponsor, or a future buyer.</p>

<p>That is what decision intelligence delivers: not certainty, which no one can sell honestly, but a record. A repeatable process that turns a recruitment department from a group of talented individuals making isolated bets into an institution that gets measurably better at deciding. The guess does not disappear. It gets smaller, every season, on purpose.</p>

<p><em>Market POV. Sadara publishes market views to inform the ecosystem. They are general analysis, not advice on any specific transaction or club.</em></p>`,
    },
    date: '2026',
    type: 'article',
  },
  {
    category: { ar: 'الصوت المؤسسي', en: 'Institutional voice' },
    title: { ar: 'الحوكمة ليست عبئاً، بل ميزة', en: "Governance is not a burden — it's an advantage" },
    excerpt: { ar: 'لماذا تبني الجدرانُ الواضحة ضدّ تضارب المصالح ثقةً تُترجَم إلى قيمة.', en: 'Why clear conflict walls build trust that translates into value.' },
    body: {
      ar: '',
      en: `<p>In sports management, one firm can advise a club, represent the player it is considering, and structure the deal that moves him. The industry treats that overlap as efficiency. We treat it as the single largest source of mistrust in the market — and therefore the single largest opportunity for an institution willing to do the opposite.</p>

<p>The instinct, when you hold three roles, is to collapse them. Why separate what you could bundle? Because the value is not in the bundle. It is in the visible separation. A counterparty who can see exactly where your interests sit, and where they are walled off from the conversation they are having with you, will move faster and pay more. Trust is not a soft outcome. It is a pricing input.</p>

<h2>01 — The conflicted-by-default market</h2>
<h3>Why everyone assumes the worst</h3>

<p>When roles are blended silently, every recommendation carries a question the client cannot answer: am I being advised, or sold to? Is this the right player, or the available one? A market that cannot answer those questions defends itself by discounting everything — slower decisions, harder negotiations, lawyers in every room. The cost of opacity is paid by everyone, including the firm that created it.</p>

<h2>02 — What a conflict wall is</h2>
<h3>Three separations, documented</h3>

<ol>
  <li><strong>Information</strong> — It does not flow freely between a unit advising a club and one representing a player that club might sign.</li>
  <li><strong>Incentives</strong> — Structured so no individual is paid to push a transaction across that line.</li>
  <li><strong>Decisions</strong> — Held by named people who can be measured against the record.</li>
</ol>

<p>A conflict wall is not a slogan on a website. It is an operating constraint. Where a genuine conflict cannot be walled, we disclose it and step back — including from fees.</p>

<blockquote><p>A wall you can see is worth more than a promise you have to take on faith.</p></blockquote>

<h2>03 — Trust as a pricing input</h2>
<h3>What it buys back</h3>

<p>Clubs and investors are not paying a premium for governance because it is virtuous. They pay because it removes friction that costs them money. A board that trusts the process approves faster. A sponsor that trusts the institution renews longer. A buyer that trusts the desk pays closer to fair value, because they are not pricing in the risk of being on the wrong side of a hidden interest.</p>

<p>This is why we publish our positions, name our units, and disclose where we step back. Governance, done in public, stops being a compliance cost and becomes a commercial asset — the one part of an institution that competitors cannot replicate by spending more. It has to be built, held, and proven, season after season. That is the point. The burden is the moat.</p>

<p><em>Institutional Voice. Positions published under this banner represent the firm. Sadara maintains documented conflict walls between its Representation, Advisory, and Deal Desk units.</em></p>`,
    },
    date: '2026',
    type: 'article',
  },
];

export const pressKit = {
  kicker: { ar: 'رؤى · الحقيبة الإعلامية', en: 'Insights · Press Kit' } as Bi,
  title: { ar: 'الحقيبة الإعلامية.', en: 'Press kit.' } as Bi,
  lead: {
    ar: 'أصول العلامة، وورقة الحقائق، وجهة الاتصال الإعلامي — كل ما يحتاجه الإعلام في مكانٍ واحد.',
    en: 'Brand assets, a fact sheet, and the media contact — everything the press needs in one place.',
  } as Bi,
  facts: [
    { label: { ar: 'التأسيس', en: 'Founded' }, value: { ar: 'الرياض، السعودية', en: 'Riyadh, Saudi Arabia' } },
    { label: { ar: 'النموذج', en: 'Model' }, value: { ar: 'ثلاث وحداتٍ استراتيجية', en: 'Three strategic units' } },
    { label: { ar: 'التركيز', en: 'Focus' }, value: { ar: 'كرة القدم', en: 'Football' } },
    { label: { ar: 'الترخيص', en: 'Licensing' }, value: { ar: 'متوافق مع FIFA وSAFF', en: 'FIFA & SAFF compliant' } },
  ],
};
