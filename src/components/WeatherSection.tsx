'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

const TZ = 'America/Tegucigalpa';
const COORDS = 'latitude=16.3272838&longitude=-86.4974444';
const FIELDS =
  'current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max&forecast_days=7&wind_speed_unit=kmh&timezone=America%2FTegucigalpa';
const WEATHER_API = `https://api.open-meteo.com/v1/forecast?${COORDS}&${FIELDS}`;

type WeatherPayload = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    is_day: number;
    weather_code: number;
    wind_speed_10m: number;
    uv_index: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    uv_index_max: number[];
  };
};

type WeatherCat = 'clear' | 'partly' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'showers' | 'snow' | 'storm';

function categorize(code: number): WeatherCat {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return 'drizzle';
  if (code === 61 || code === 63 || code === 65 || code === 66 || code === 67) return 'rain';
  if (code === 71 || code === 73 || code === 75 || code === 77) return 'snow';
  if (code === 80 || code === 81 || code === 82) return 'showers';
  if (code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'storm';
  return 'cloudy';
}

function Glyph({ cat, night, size = 22 }: { cat: WeatherCat; night?: boolean; size?: number }) {
  const s = { width: size, height: size, viewBox: '0 0 24 24' } as const;
  const stroke = 1.7;
  if (cat === 'clear') {
    if (night) {
      return (
        <svg {...s} fill="none" stroke="#b9c4d4" strokeWidth={stroke} strokeLinecap="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      );
    }
    return (
      <svg {...s} fill="none" stroke="#f0b429" strokeWidth={stroke} strokeLinecap="round">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
      </svg>
    );
  }
  const cloud = <path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 10.5 3.5 3.5 0 0 0 7 18z" />;
  const rainLines = (
    <>
      <path d="M8.5 19.5v2M12.5 20v2M16.5 19.5v2" />
    </>
  );
  if (cat === 'cloudy') {
    return (
      <svg {...s} fill="none" stroke="#9fb3c8" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        {cloud}
      </svg>
    );
  }
  if (cat === 'partly') {
    return (
      <svg {...s} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="4" fill="#f0b429" stroke="#f0b429" opacity="0.9" />
        <path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 10.5 3.5 3.5 0 0 0 7 18z" stroke="#9fb3c8" />
      </svg>
    );
  }
  if (cat === 'fog') {
    return (
      <svg {...s} fill="none" stroke="#9fb3c8" strokeWidth={stroke} strokeLinecap="round">
        <path d="M4 9h16M5 13h14M6 17h12" />
      </svg>
    );
  }
  if (cat === 'drizzle') {
    return (
      <svg {...s} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 14.5h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 8 3.5 3.5 0 0 0 7 14.5z" stroke="#9fb3c8" />
        <path d="M9.5 17.5l-.8 1.8M14 17.5l-.9 1.9" stroke="#5aa2e8" />
      </svg>
    );
  }
  if (cat === 'rain' || cat === 'snow' || cat === 'storm') {
    return (
      <svg {...s} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 13h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 7 3.5 3.5 0 0 0 7 13z" stroke="#9fb3c8" />
        {cat === 'snow' ? (
          <path d="M9.5 17.5l-.9 1.9M12 17.5v2M14.5 17.5l.9 1.9" stroke="#dfe7f2" />
        ) : cat === 'storm' ? (
          <path d="M13 13.5l-3 4.5h3l-1.5 4 4-6h-3.2" stroke="#f0b429" />
        ) : (
          rainLines
        )}
      </svg>
    );
  }
  // showers
  return (
    <svg {...s} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="6.5" r="3" fill="#f0b429" stroke="#f0b429" opacity="0.9" />
      <path d="M7 15h9a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.5 8.6 3 3 0 0 0 7 15z" stroke="#9fb3c8" />
      {rainLines}
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center px-2 py-3 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
      <p className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
    </div>
  );
}

type AdviceRows = { outfit: string[]; play: string[]; items: string[]; risk: string[] };

function buildAdvice(
  current: WeatherPayload['current'],
  day: {
    maxT: number;
    minT: number;
    rainPct: number | undefined;
    windMax: number | undefined;
    uvMax: number | undefined;
  },
  t: (key: string) => string,
): AdviceRows {
  const outfit: string[] = [];
  const play: string[] = [];
  const items: string[] = [];
  const risk: string[] = [];

  const cat = categorize(current.weather_code);
  const wet =
    cat === 'storm'
      ? 'storm'
      : cat === 'rain' || cat === 'showers' || cat === 'snow'
        ? cat === 'rain' && [61, 62].includes(current.weather_code)
          ? 'light'
          : cat
        : cat === 'drizzle'
          ? 'drizzle'
          : 'none';

  const maxT = day.maxT;
  const wind = Math.max(current.wind_speed_10m, day.windMax ?? 0);
  const rainPct = day.rainPct ?? 0;
  const uv = Math.max(current.uv_index, day.uvMax ?? 0);
  const gap = maxT - day.minT;

  // 游玩安排（按优先级：风险类 > 降水 > 阴晴 > 风 > 高温）
  if (wet === 'storm') {
    play.push(t('advice.playStorm'));
  } else if (wet === 'rain' || wet === 'snow') {
    play.push(t('advice.playRain'));
  } else if (wet === 'showers') {
    play.push(t('advice.playShowers'));
  } else if (wet === 'drizzle' || wet === 'light') {
    play.push(t('advice.playDrizzle'));
  } else if (rainPct >= 60) {
    play.push(t('advice.playRainLikely'));
  } else if (cat === 'clear') {
    play.push(t('advice.playClear'));
  } else if (cat === 'partly') {
    play.push(t('advice.playPartly'));
  } else if (cat === 'cloudy' || cat === 'fog') {
    play.push(t('advice.playCloudy'));
  }

  if (wet !== 'storm' && wet !== 'rain' && wet !== 'snow' && wind >= 29) {
    play.push(t('advice.playWind5'));
  }
  if (uv >= 8) {
    play.push(t('advice.playHot'));
  }

  // 出行穿搭
  if (wet !== 'none') outfit.push(t('advice.outfitWet'));
  if (wind >= 29) outfit.push(t('advice.outfitWind'));
  if (maxT >= 32 || current.temperature_2m >= 32) {
    outfit.push(t('advice.outfitHeat'));
  } else if (gap > 8) {
    outfit.push(t('advice.outfitGap'));
  }

  // 随身物品（只展示真实需要的）
  const needsRain = wet !== 'none' || rainPct >= 60;
  if (wet === 'storm' || wet === 'rain' || wet === 'snow') {
    items.push(t('advice.itemRaincoat'));
  } else if (wet === 'drizzle' || wet === 'light' || wet === 'showers' || rainPct >= 60) {
    items.push(t('advice.itemUmbrella'));
  } else if (needsRain) {
    items.push(t('advice.itemRain'));
  }
  if (uv >= 5 && wet === 'none') {
    items.push(t('advice.itemSun'));
  }
  if (maxT >= 31 || current.temperature_2m >= 31 || uv >= 8) {
    items.push(t('advice.itemWater'));
  }

  // 风险提醒（有风险才出现）
  if (cat === 'fog') risk.push(t('advice.riskFog'));
  if (cat === 'storm') risk.push(t('advice.riskStorm'));
  if ((current.weather_code >= 63 && current.weather_code <= 67) || current.weather_code === 82) {
    risk.push(t('advice.riskRain'));
  }
  if (wind >= 50) risk.push(t('advice.riskWind'));

  return { outfit, play, items, risk };
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const [payload, setPayload] = useState<WeatherPayload | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setError(false);
    setPayload(null);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      let res: Response | undefined;
      try {
        res = await fetch('/api/weather', { signal: controller.signal });
      } catch {
        res = undefined;
      }
      if (!res || !res.ok) {
        res = await fetch(WEATHER_API, { signal: controller.signal });
      }
      if (!res.ok) throw new Error('weather request failed');
      const data = (await res.json()) as WeatherPayload;
      if (!data?.current || !data?.daily || !data.daily.time?.length) throw new Error('bad payload');
      setPayload(data);
    } catch {
      setError(true);
    } finally {
      clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const advice = useMemo<AdviceRows | null>(() => {
    if (!payload) return null;
    const d = payload.daily;
    return buildAdvice(
      payload.current,
      {
        maxT: d.temperature_2m_max?.[0],
        minT: d.temperature_2m_min?.[0],
        rainPct: d.precipitation_probability_max?.[0],
        windMax: d.wind_speed_10m_max?.[0],
        uvMax: d.uv_index_max?.[0],
      },
      t,
    );
  }, [payload, t]);

  const todayRain = payload?.daily?.precipitation_probability_max?.[0];
  const todayIdx = payload?.daily?.time?.length ? 0 : -1;

  return (
    <section id="weather" className="section-padding">
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
              onClick={load}
              className="px-5 py-2 rounded-full text-sm font-medium text-white"
              style={{ background: 'var(--accent)' }}
            >
              {t('retry')}
            </button>
          </div>
        ) : null}

        {payload ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
              {/* 当前天气卡片 */}
              <div
                className="lg:col-span-1 rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {t('now')}
                    </p>
                    <p className="text-5xl font-display font-bold my-1" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(payload.current.temperature_2m)}°
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {t(`codes.${categorize(payload.current.weather_code)}`)}
                    </p>
                    {typeof todayRain === 'number' && todayRain > 0 ? (
                      <p className="text-xs mt-2" style={{ color: 'var(--accent)' }}>
                        {t('precip')} {Math.round(todayRain)}%
                      </p>
                    ) : null}
                  </div>
                  <Glyph
                    cat={categorize(payload.current.weather_code)}
                    night={payload.current.is_day === 0}
                    size={54}
                  />
                </div>
                <div className="mt-5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <Stat label={t('feelsLike')} value={`${Math.round(payload.current.apparent_temperature)}°`} />
                    <Stat label={t('humidity')} value={`${Math.round(payload.current.relative_humidity_2m)}%`} />
                    <Stat label={t('uv')} value={String(Math.round(payload.current.uv_index))} />
                    <Stat
                      label={t('wind')}
                      value={`${Math.round(payload.current.wind_speed_10m)} km/h`}
                    />
                  </div>
                </div>
              </div>

              {/* 7 日预报 */}
              <div
                className="lg:col-span-2 rounded-2xl p-6 sm:p-7"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t('forecastTitle')}
                  </h3>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {t('updated')} {payload.current.time.slice(11, 16)}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                  {payload.daily.time.map((dayIso, i) => {
                    const cat = categorize(payload.daily.weather_code[i]);
                    const d = new Date(`${dayIso}T12:00:00Z`);
                    const label = i === todayIdx ? t('today') : new Intl.DateTimeFormat(undefined, { timeZone: TZ, weekday: 'short' }).format(d);
                    const rain = payload.daily.precipitation_probability_max[i];
                    return (
                      <div
                        key={i}
                        className="rounded-xl px-2 py-3 text-center"
                        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                      >
                        <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                          {label}
                        </p>
                        <div className="flex justify-center mb-2">
                          <Glyph cat={cat} size={30} />
                        </div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {Math.round(payload.daily.temperature_2m_max[i])}°{' '}
                          <span style={{ color: 'var(--text-muted)' }}>
                            {Math.round(payload.daily.temperature_2m_min[i])}°
                          </span>
                        </p>
                        {typeof rain === 'number' ? (
                          <p className="text-[11px] mt-1" style={{ color: 'var(--accent)' }}>
                            {t('precip')} {Math.round(rain)}%
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 今日智能出行建议 */}
            {advice ? (
              <div
                className="mt-5 rounded-2xl p-6 sm:p-7"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
                      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {t('advice.title')}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {Math.round(payload.daily.temperature_2m_max[0])}°–{Math.round(payload.daily.temperature_2m_min[0])}° ·{' '}
                      {t(`codes.${categorize(payload.daily.weather_code[0])}`)}
                    </p>
                  </div>
                </div>

                {/* 风险提醒：仅在有风险时置顶显示 */}
                {advice.risk.length > 0 ? (
                  <div
                    className="rounded-xl px-4 py-3 mb-4"
                    style={{ border: '1px solid rgba(224, 79, 95, 0.55)', background: 'rgba(224, 79, 95, 0.10)' }}
                    role="alert"
                  >
                    <p className="text-sm font-semibold flex items-center gap-2" style={{ color: '#e04f5f' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-7h-2v5h2V9z" />
                      </svg>
                      {t('advice.riskTitle')}
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {advice.risk.map((line, i) => (
                        <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { key: 'outfit', title: t('advice.outfitTitle'), rows: advice.outfit, color: '#3b8fcc' },
                    { key: 'play', title: t('advice.playTitle'), rows: advice.play, color: '#d29b2e' },
                    { key: 'items', title: t('advice.itemTitle'), rows: advice.items, color: '#2f9e6e' },
                  ].map(
                    (group) =>
                      group.rows.length > 0 ? (
                        <div
                          key={group.key}
                          className="rounded-xl p-4"
                          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                        >
                          <p
                            className="text-xs font-semibold uppercase tracking-wide mb-2.5 flex items-center gap-2"
                            style={{ color: group.color }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: group.color }} />
                            {group.title}
                          </p>
                          <ul className="space-y-1.5">
                            {group.rows.map((line, i) => (
                              <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke={group.color}
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  className="flex-shrink-0 mt-0.5"
                                  aria-hidden="true"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                                {line}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null,
                  )}
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
