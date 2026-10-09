// Mahogany Bay Cruise Terminal — Cloudflare Worker
// 职责：
//  1. 代理 /api/weather 并在边缘缓存短期预报（约 10 分钟），
//     避免每个访问者都回源天气接口，同时让静态站点也能拿到实时数据。
//  2. 代理 /api/tide：抓取罗坦（Roatan）公开潮汐时刻表并合并海洋实况
//     （表层水温 / 浪高），边缘缓存数小时。
//  3. 其余路径由 wrangler.toml 中的 assets 静态托管直接响应。
const WEATHER_ORIGIN = 'https://api.open-meteo.com/v1/forecast';
const WEATHER_PARAMS =
  'latitude=16.3272838&longitude=-86.4974444&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max&forecast_days=7&wind_speed_unit=kmh&timezone=America%2FTegucigalpa';
const CACHE_SECONDS = 600;

// 潮汐：时刻表来自公开潮汐页（站：Roatan），海洋实况来自 Open-Meteo Marine（免密钥）
const TIDE_PAGE_URL = 'https://www.tide-forecast.com/locations/Roatan/tides/latest';
const MARINE_URL =
  'https://marine-api.open-meteo.com/v1/marine?latitude=16.3167&longitude=-86.4974&current=sea_surface_temperature,wave_height,wave_direction,wave_period';
const TIDE_CACHE_SECONDS = 6 * 3600;
const TZ_OFFSET_MS = 6 * 3600 * 1000; // America/Tegucigalpa = UTC-6（洪都拉斯无夏令时）
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function json(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });
}

function islandWall(ms) {
  return new Date(ms + TZ_OFFSET_MS);
}
function islandDayStart(ms) {
  const w = islandWall(ms);
  return Date.UTC(w.getUTCFullYear(), w.getUTCMonth(), w.getUTCDate()) - TZ_OFFSET_MS;
}
function wallToEpoch(y, m, d, h, min) {
  return Date.UTC(y, m - 1, d, h, min) - TZ_OFFSET_MS;
}
function parseTime12(s) {
  const m = String(s).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = +m[1] % 12;
  if (/pm/i.test(m[3])) h += 12;
  return { h, min: +m[2] };
}

// 从潮汐页 HTML 中提取近几天高潮 / 低潮事件（含昨日，便于客户端判断当前涨退状态）
function extractTideEvents(html, nowMs) {
  const events = [];
  const startMs = islandDayStart(nowMs) - 86400000;
  const endMs = islandDayStart(nowMs) + 4 * 86400000;
  const rowRe = /<tr>[\s\S]*?<td>\s*(High|Low)\s+Tide\s*<\/td>[\s\S]*?<td><b>([^<]*?)<\/b>[\s\S]*?<span class="tide-day-tides__secondary">\(([^)]+)\)<\/span>[\s\S]*?<\/tr>/g;
  const heightRe = /<b class="js-two-units-length-value__primary">\s*([\d.]+)\s*(m|ft)<\/b>/;
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const dateM = m[3].match(/^[A-Za-z]{3}\s+(\d{1,2})\s+([A-Za-z]+)$/);
    const tm = parseTime12(m[2]);
    if (!dateM || !tm) continue;
    const month = MONTHS.indexOf(dateM[2]);
    if (month < 0) continue;
    const nowWall = islandWall(nowMs);
    let year = nowWall.getUTCFullYear();
    if (month < nowWall.getUTCMonth() - 6) year += 1;
    const ts = wallToEpoch(year, month + 1, +dateM[1], tm.h, tm.min);
    if (ts < startMs || ts > endMs) continue;
    const key = `${ts}:${m[1].toLowerCase()}`;
    if (events.some((e) => e.key === key)) continue;
    let height = 0;
    const hm = (m[0] || '').match(heightRe);
    if (hm) {
      height = parseFloat(hm[1]);
      if (hm[2] === 'ft') height = Math.round(height * 0.3048 * 100) / 100;
    }
    events.push({ key, type: m[1].toLowerCase(), ts, height });
  }
  events.sort((a, b) => a.ts - b.ts);
  return events;
}

async function handleTide(ctx) {
  const nowMs = Date.now();
  const cacheKey = new Request(`${TIDE_PAGE_URL}#parsed`, { method: 'GET' });

  try {
    const cached = await caches.default.match(cacheKey);
    if (cached) {
      const headers = new Headers(cached.headers);
      headers.set('cache-control', `public, s-maxage=${TIDE_CACHE_SECONDS}`);
      return new Response(cached.body, { status: cached.status, headers });
    }

    const [pageRes, marineRes] = await Promise.allSettled([
      fetch(TIDE_PAGE_URL, {
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; mahoganybay-roatan/1.0)',
          accept: 'text/html,application/xhtml+xml',
          'accept-language': 'en',
        },
      }),
      fetch(MARINE_URL, { headers: { accept: 'application/json' } }),
    ]);

    if (pageRes.status !== 'fulfilled' || !pageRes.value.ok) {
      return json({ ok: false, error: 'tide_upstream' }, 502);
    }
    const html = await pageRes.value.text();
    const events = extractTideEvents(html, nowMs);
    if (events.length === 0) {
      return json({ ok: false, error: 'tide_parse' }, 502);
    }

    let sea = null;
    if (marineRes.status === 'fulfilled' && marineRes.value.ok) {
      try {
        const m = await marineRes.value.json();
        if (m && m.current) {
          sea = {
            time: m.current.time || null,
            sst: m.current.sea_surface_temperature ?? null,
            waveHeight: m.current.wave_height ?? null,
            waveDirection: m.current.wave_direction ?? null,
            wavePeriod: m.current.wave_period ?? null,
          };
        }
      } catch {
        sea = null;
      }
    }

    const body = {
      ok: true,
      fetchedAt: new Date(nowMs).toISOString(),
      station: 'Roatan',
      timezone: 'America/Tegucigalpa',
      events: events.map((e) => ({ type: e.type, ts: e.ts, height: e.height })),
      sea,
    };

    const response = new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
        'cache-control': `public, s-maxage=${TIDE_CACHE_SECONDS}`,
      },
    });
    ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
    return response;
  } catch {
    return json({ ok: false, error: 'tide_error' }, 500);
  }
}

async function handleWeather(ctx) {
  const upstreamUrl = `${WEATHER_ORIGIN}?${WEATHER_PARAMS}`;
  const cacheKey = new Request(upstreamUrl, { method: 'GET', headers: { accept: 'application/json' } });

  try {
    const cached = await caches.default.match(cacheKey);
    if (cached) {
      const headers = new Headers(cached.headers);
      headers.set('cache-control', `public, s-maxage=${CACHE_SECONDS}`);
      return new Response(cached.body, { status: cached.status, headers });
    }

    const upstream = await fetch(cacheKey);
    if (!upstream.ok) {
      return json({ ok: false }, 502);
    }

    const response = new Response(upstream.body, {
      status: upstream.status,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
        'cache-control': `public, s-maxage=${CACHE_SECONDS}`,
      },
    });

    ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    return json({ ok: false }, 500);
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 默认语言：en —— 根路径统一跳转到 /en（英语为首要受众；/es 与 /zh 仍可正常访问，排名不受影响）
    if (url.pathname === '/') {
      return Response.redirect(`${url.origin}/en`, 308);
    }

    // 天气接口：边缘代理 + 缓存
    if (url.pathname === '/api/weather') {
      if (request.method !== 'GET') {
        return json({ ok: false }, 405);
      }
      return handleWeather(ctx);
    }

    // 潮汐接口：边缘抓取 + 海洋实况 + 缓存
    if (url.pathname === '/api/tide') {
      if (request.method !== 'GET') {
        return json({ ok: false }, 405);
      }
      return handleTide(ctx);
    }

    // 其余路径回源静态资产
    if (env.ASSETS) {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status === 404) {
        const notFound = await env.ASSETS.fetch(new Request(`${url.origin}/404.html`));
        return new Response(notFound.body, {
          status: 404,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        });
      }
      return asset;
    }

    return new Response('Not Found', { status: 404 });
  },
};
