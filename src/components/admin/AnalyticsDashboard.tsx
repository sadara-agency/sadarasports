'use client';

import { useState, useTransition } from 'react';
import { useAdminPrefs } from './AdminPrefsContext';
import { getAnalytics, type AnalyticsRange, type AnalyticsSummary } from '@/app/admin/(dashboard)/analytics/actions';

const T = {
  title: { en: 'Analytics', ar: 'التحليلات' },
  subtitle: { en: 'Public site traffic over the selected period.', ar: 'حركة زوار الموقع خلال الفترة المحددة.' },
  totalViews: { en: 'Total page views', ar: 'إجمالي المشاهدات' },
  uniqueVisitors: { en: 'Unique visitors', ar: 'الزوار الفريدون' },
  topPages: { en: 'Most viewed pages', ar: 'أكثر الصفحات مشاهدة' },
  byCountry: { en: 'Visitors by region', ar: 'الزوار حسب المنطقة' },
  trend: { en: 'Daily views', ar: 'المشاهدات اليومية' },
  empty: { en: 'No data yet for this period.', ar: 'لا توجد بيانات لهذه الفترة بعد.' },
  views: { en: 'views', ar: 'مشاهدة' },
  days: { en: 'days', ar: 'يوم' },
  loadFailed: { en: 'Could not load analytics.', ar: 'تعذر تحميل التحليلات.' },
};

const RANGES: AnalyticsRange[] = [7, 30, 90];

function countryName(code: string, locale: 'en' | 'ar') {
  if (code === 'Unknown' || code.length !== 2) return code;
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

export function AnalyticsDashboard({ initial }: { initial: AnalyticsSummary | null }) {
  const { locale } = useAdminPrefs();
  const ar = locale === 'ar';
  const tr = (k: keyof typeof T) => (ar ? T[k].ar : T[k].en);

  const [range, setRange] = useState<AnalyticsRange>(30);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(initial);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  function selectRange(days: AnalyticsRange) {
    setRange(days);
    startTransition(async () => {
      const res = await getAnalytics(days);
      if (res.ok) {
        setSummary(res.summary);
        setFailed(false);
      } else {
        setFailed(true);
      }
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{tr('title')}</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--adm-text-sm)' }}>{tr('subtitle')}</p>
        </div>
        <div className="flex gap-1 rounded-lg p-1" style={{ background: 'var(--adm-hover)' }}>
          {RANGES.map((d) => (
            <button
              key={d}
              onClick={() => selectRange(d)}
              className="rounded px-3 py-1.5 text-sm font-medium transition-colors"
              style={
                range === d
                  ? { background: 'var(--adm-accent)', color: '#fff' }
                  : { color: 'var(--adm-text-sm)' }
              }
            >
              {d} {tr('days')}
            </button>
          ))}
        </div>
      </div>

      {failed || !summary ? (
        <p className="mt-8 text-sm" style={{ color: 'var(--adm-danger)' }}>{tr('loadFailed')}</p>
      ) : (
        <div className={pending ? 'mt-8 opacity-60 transition-opacity' : 'mt-8 transition-opacity'}>
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label={tr('totalViews')} value={summary.totalViews} />
            <StatCard label={tr('uniqueVisitors')} value={summary.uniqueVisitors} />
          </div>

          <Section title={tr('trend')}>
            <TrendChart data={summary.dailyTrend} emptyLabel={tr('empty')} />
          </Section>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Section title={tr('topPages')}>
              <BarList
                items={summary.topPages.map((p) => ({ label: p.path, value: p.views }))}
                unit={tr('views')}
                emptyLabel={tr('empty')}
              />
            </Section>
            <Section title={tr('byCountry')}>
              <BarList
                items={summary.byCountry.map((c) => ({
                  label: countryName(c.country, ar ? 'ar' : 'en'),
                  value: c.views,
                }))}
                unit={tr('views')}
                emptyLabel={tr('empty')}
              />
            </Section>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-input-bg)' }}
    >
      <div className="text-sm" style={{ color: 'var(--adm-text-sm)' }}>{label}</div>
      <div className="mt-2 text-3xl font-semibold tabular-nums">{value.toLocaleString()}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h2 className="mb-3 text-sm font-medium" style={{ color: 'var(--adm-text-sm)' }}>{title}</h2>
      <div
        className="rounded-xl border p-5"
        style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-input-bg)' }}
      >
        {children}
      </div>
    </div>
  );
}

function BarList({
  items,
  unit,
  emptyLabel,
}: {
  items: { label: string; value: number }[];
  unit: string;
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm" style={{ color: 'var(--adm-text-sm)' }}>{emptyLabel}</p>;
  }
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i.label}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate font-mono">{i.label}</span>
            <span className="shrink-0 tabular-nums" style={{ color: 'var(--adm-text-sm)' }}>
              {i.value.toLocaleString()} {unit}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: 'var(--adm-hover)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${(i.value / max) * 100}%`, background: 'var(--adm-accent)' }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

// Lightweight inline-SVG bar chart — no charting dependency.
function TrendChart({ data, emptyLabel }: { data: { day: string; views: number }[]; emptyLabel: string }) {
  if (data.length === 0) {
    return <p className="text-sm" style={{ color: 'var(--adm-text-sm)' }}>{emptyLabel}</p>;
  }
  const W = 800;
  const H = 160;
  const pad = 4;
  const max = Math.max(...data.map((d) => d.views), 1);
  const barW = (W - pad * 2) / data.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-40 w-full" preserveAspectRatio="none" role="img">
      {data.map((d, idx) => {
        const h = Math.max((d.views / max) * (H - pad * 2), d.views > 0 ? 2 : 0);
        const x = pad + idx * barW;
        const y = H - pad - h;
        return (
          <rect
            key={d.day}
            x={x + barW * 0.15}
            y={y}
            width={barW * 0.7}
            height={h}
            rx={2}
            fill="var(--adm-accent)"
          >
            <title>{`${d.day}: ${d.views}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}
