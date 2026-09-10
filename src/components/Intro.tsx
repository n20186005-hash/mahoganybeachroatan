import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

function renderRichText(text: string): ReactNode {
  // 将 **加粗** 的实体词转换为 <strong>
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Intro() {
  const t = useTranslations('intro');
  const tOff = useTranslations('officialManagement');
  const messages = useMessages() as any;
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];
  const geoItems: string[] = [
    messages?.geo?.fullName,
    messages?.geo?.city,
    messages?.geo?.state,
    messages?.geo?.country,
  ].filter(Boolean);

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* 首段等位声明：域名含义 <-> 官方全称 */}
        {messages?.intro?.overview ? (
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            {renderRichText(messages.intro.overview)}
          </p>
        ) : null}

        <p
          className="text-lg leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        {/* 地理面包屑与归属层级 */}
        {geoItems.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm mb-8"
          >
            {geoItems.map((label, i) => (
              <span key={i} className="flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-1"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {label}
                </span>
                {i < geoItems.length - 1 ? (
                  <span style={{ color: 'var(--accent)' }} aria-hidden="true">
                    →
                  </span>
                ) : null}
              </span>
            ))}
          </nav>
        ) : null}

        {/* 周边语义集群描述 */}
        {messages?.intro?.nearby ? (
          <p
            className="text-base leading-relaxed mb-12 p-4 rounded-xl"
            style={{
              background: 'var(--bg-tertiary)',
              borderLeft: '4px solid var(--accent)',
              color: 'var(--text-secondary)',
            }}
          >
            {renderRichText(messages.intro.nearby)}
          </p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('visitGuide.title')}
            </h3>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-3">
              {alsoKnownAsItems.map((keyword, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {tOff('title')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('text')}
          </div>
        </div>
      </div>
    </section>
  );
}
