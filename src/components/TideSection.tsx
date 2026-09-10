'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const TZ = 'America/Tegucigalpa';
const TZ_OFFSET_MS = 6 * 3600 * 1000; // UTC-6（洪都拉斯无夏令时）

type TideEvent = { type: 'high' | 'low'; ts: number; height: number };
type TidePayload = {
  ok: boolean;
  fetchedAt: string;
  events: TideEvent[];
  sea: {
    sst: number | null;
    waveHeight: number | null;
    waveDirection: number | null;
    wavePeriod: number | null;
  } | null;
};

function islandWall(ms: number) {
  return new Date(ms + TZ_OFFSET_MS);
}

function formatTime(ts: number, locale: string) {
  const parts = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale, {
    timeZone: TZ,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(new Date(ts));
  const h = parts.find((p) => p.type === 'hour')?.value ?? '';
  const m = parts.find((p) => p.type === 'minute')?.value ?? '';
  const day = parts.find((p) => p.type === 'dayPeriod')?.value ?? '';
  return `${h}:${m} ${day}`.trim();
}

function formatDayLabel(ts: number, locale: string) {
  const weekday = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale, {
    timeZone: TZ,
    weekday: 'short',
  }).format(new Date(ts));
  const date = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale, {
    timeZone: TZ,
    month: 'numeric',
    day: 'numeric',
  }).format(new Date(ts));
  return { weekday, date };
}

function islandKey(ms: number) {
  return islandWall(ms).toISOString().slice(0, 10);
}

function tideLevelNote(h: number | null, t: (key: string) => string) {
  if (h === null) return null;
  if (h < 0.5) return t('seaNote0');
  if (h < 1.0) return t('seaNote1');
  if (h < 1.8) return t('seaNote2');
  return t('seaNote3');
}

function Arrow({ up, color, size = 26 }: { up: boolean; color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: up ? 'none' : 'rotate(180deg)' }}
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function countdownText(diffMs: number, t: (key: string, values?: Record<string, number>) => string) {
  const minutes = Math.floor(diffMs / 60000);
  if (minutes <= 0) return t('soon');
  if (minutes < 60) return t('inMin', { m: minutes });
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return t('inTime', { h, m });
}

export default function TideSection() {
  const t = useTranslations('tide');
  const locale = useLocale();
  const [payload, setPayload] = useState<TidePayload | null>(null);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const load = async () => {
    setError(false);
    setPayload(null);
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);
      const res = await fetch('/api/tide', { signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error('tide request failed');
      const data = (await res.json()) as TidePayload;
      if (!data?.events?.length) throw new Error('bad payload');
      setPayload(data);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  // 每分钟刷新一次“当前时间”，让倒计时保持新鲜
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  const state = useMemo(() => {
    if (!payload) return null;
    const events = payload.events;
    const next = events.find((e) => e.ts > now) ?? null;
    const last = [...events].reverse().find((e) => e.ts <= now) ?? null;
    let rising: boolean | null = null;
    if (next) {
      rising = last ? last.type === 'low' : next.type === 'high';
    }
    return { next, last, rising };
  }, [payload, now]);

  // 从今天 00:00（当地）开始的事件，按天分组展示
  const groups = useMemo(() => {
    if (!payload) return [];
    const dayStart = islandKey(now);
    const map = new Map<string, TideEvent[]>();
    for (const e of payload.events) {
      const key = islandKey(e.ts);
      if (key < dayStart) continue;
      const arr = map.get(key) ?? [];
      arr.push(e);
      map.set(key, arr);
    }
    return [...map.entries()].map(([key, list]) => ({ key, list })).slice(0, 3);
  }, [payload, now]);

  const sea = payload?.sea;
  const seaNote = tideLevelNote(sea?.waveHeight ?? null, t);
  const risingColor = '#1f9de0';
  const fallingColor = '#8aa0b0';

  return (
    <section id="tide" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {!payload && !error ? (
          <div
            className="rounded-2xl p-10 text-center text-sm"
            style={{ background: 'var(--bg-tertiary)', border: '1px dashed var(--border-color)' }}
          >
            {t('loading')}
          </div>
        ) : null}

        {error ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('errorTitle')}
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              {t('errorHint')}
            </p>
            <button
              type="button"
              onClick={() => void load()}
              className="px-5 py-2 rounded-full text-sm font-medium text-white"
              style={{ background: 'var(--accent)' }}
            >
              {t('retry')}
            </button>
          </div>
        ) : null}

        {payload && state ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
              {/* 当前潮况卡片 */}
              <div
                className="lg:col-span-2 rounded-2xl p-6 sm:p-7 flex flex-col"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
              >
                <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {t('nowLabel')}
                </p>
                <div className="flex items-center gap-4">
                  <span
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: state.rising === false ? 'rgba(138,160,176,0.14)' : 'rgba(31,157,224,0.12)',
                    }}
                  >
                    <Arrow
                      up={state.rising !== false}
                      color={state.rising === false ? fallingColor : risingColor}
                      size={30}
                    />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {state.rising === null
                        ? t('slack')
                        : state.rising
                          ? t('rising')
                          : t('falling')}
                    </p>
                    {state.next ? (
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {state.next.type === 'high' ? t('nextHigh') : t('nextLow')}
                        {state.rising === null ? ` · ${t('soon')}` : ''}
                      </p>
                    ) : null}
                  </div>
                </div>

                {state.next ? (
                  <div className="mt-6 rounded-xl p-4" style={{ background: 'var(--bg-tertiary)' }}>
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p
                          className="text-4xl font-display font-bold"
                          style={{
                            color: state.next.type === 'high' ? risingColor : 'var(--text-primary)',
                          }}
                        >
                          {formatTime(state.next.ts, locale)}
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          {state.next.type === 'high' ? t('high') : t('low')} · {t('height')} {state.next.height.toFixed(2)} m
                        </p>
                      </div>
                      <span className="text-sm mb-1" style={{ color: 'var(--accent)' }}>
                        {countdownText(state.next.ts - now, t)}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* 未来时刻列表 */}
              <div
                className="lg:col-span-3 rounded-2xl p-6 sm:p-7"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
              >
                <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {t('listTitle')}
                </h3>
                <div>
                  {groups.map((g, gi) => {
                    const label = formatDayLabel(Date.parse(`${g.key}T12:00:00Z`), locale);
                    const isToday = g.key === islandKey(now);
                    const isTomorrow = g.key === islandKey(now + 24 * 3600 * 1000);
                    return (
                      <div key={g.key} className={gi > 0 ? 'mt-4' : ''}>
                        <div className="flex items-center gap-2 mb-2.5">
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {isToday ? t('today') : isTomorrow ? t('tomorrow') : label.weekday}
                          </p>
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {label.date}
                          </span>
                          <span className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {g.list.map((e) => {
                            const past = isToday && e.ts <= now;
                            const isHigh = e.type === 'high';
                            return (
                              <span
                                key={`${e.ts}:${e.type}`}
                                className="inline-flex items-center gap-1.5 rounded-full pl-2 pr-3 py-1 text-sm"
                                style={{
                                  background: isHigh ? 'rgba(31,157,224,0.08)' : 'rgba(138,160,176,0.10)',
                                  border: '1px solid var(--border-color)',
                                  opacity: past ? 0.45 : 1,
                                }}
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke={isHigh ? risingColor : fallingColor}
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                                <b className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                  {formatTime(e.ts, locale)}
                                </b>
                                <span style={{ color: 'var(--text-secondary)' }}>
                                  {isHigh ? t('high') : t('low')} · {e.height.toFixed(2)} m
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 海洋实况 */}
            {sea ? (
              <div
                className="mt-5 rounded-2xl p-6 sm:p-7"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="flex gap-3 flex-wrap shrink-0">
                    <span
                      className="rounded-xl px-4 py-3 text-center min-w-[108px]"
                      style={{ background: 'var(--bg-tertiary)' }}
                    >
                      <span className="block text-[11px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                        {t('sst')}
                      </span>
                      <span className="block text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                        {sea.sst !== null ? `${Math.round(sea.sst)}°C` : '—'}
                      </span>
                    </span>
                    <span
                      className="rounded-xl px-4 py-3 text-center min-w-[108px]"
                      style={{ background: 'var(--bg-tertiary)' }}
                    >
                      <span className="block text-[11px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                        {t('wave')}
                      </span>
                      <span className="block text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                        {sea.waveHeight !== null ? `${sea.waveHeight.toFixed(1)} m` : '—'}
                      </span>
                    </span>
                    <span
                      className="rounded-xl px-4 py-3 text-center min-w-[108px]"
                      style={{ background: 'var(--bg-tertiary)' }}
                    >
                      <span className="block text-[11px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                        {t('wavePeriod')}
                      </span>
                      <span className="block text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                        {sea.wavePeriod !== null ? `${Math.round(sea.wavePeriod)} s` : '—'}
                      </span>
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {t('seaTitle')}
                    </h3>
                    {seaNote ? (
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {seaNote}
                      </p>
                    ) : null}
                    <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {t('footer')}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <p className="text-xs text-center mt-6 max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              {t('disclaimer')}
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
